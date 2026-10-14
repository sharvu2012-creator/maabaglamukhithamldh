/* POST /api/verify-otp  { email, code, ticket }
 * Checks the submitted code against the signed ticket. Issues a fresh ticket
 * with an incremented attempt counter on failure, so guessing is capped
 * server-side even though the state travels with the client. */
const crypto = require('crypto');
const L = require('../lib/otp-lib');

const MAX_ATTEMPTS = 5;
const IP_LIMIT = 30; // per IP, per hour

function codeDigest(secret, email, code) {
  return crypto.createHmac('sha256', secret).update(email + '|' + code).digest('base64url');
}

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return L.json(res, 405, { error: 'Use POST' });

  const origin = req.headers.origin || '';
  const host = (req.headers.host || '').split(':')[0];
  if (origin && host && !origin.includes(host)) {
    return L.json(res, 403, { error: 'Forbidden' });
  }

  const secret = process.env.OTP_SECRET;
  if (!secret) return L.json(res, 500, { error: 'Email verification is not configured yet.' });

  const ip = L.clientIp(req);
  if (!L.rateLimit('verify-ip:' + ip, IP_LIMIT, 60 * 60 * 1000)) {
    return L.json(res, 429, { error: 'Too many attempts. Please wait a little and try again.' });
  }

  let body;
  try { body = await L.readJson(req); } catch (e) {
    return L.json(res, 400, { error: 'Invalid request.' });
  }

  const email = L.normalizeEmail(body.email);
  const code = String(body.code || '').replace(/\D/g, '');
  if (!L.isEmail(email)) return L.json(res, 400, { error: 'Enter a valid email address.' });
  if (code.length !== 6) return L.json(res, 400, { error: 'Enter the 6-digit code from the email.' });

  const t = L.verifyTicket(body.ticket, secret);
  if (!t || typeof t.h !== 'string') {
    return L.json(res, 400, { error: 'Your code session expired. Please request a new code.' });
  }
  if (t.e !== email) {
    return L.json(res, 400, { error: 'This code was sent to a different email address.' });
  }
  if (Date.now() > Number(t.x || 0)) {
    return L.json(res, 400, { error: 'That code has expired. Please request a new one.' });
  }
  if (Number(t.a || 0) >= MAX_ATTEMPTS) {
    return L.json(res, 429, { error: 'Too many incorrect attempts. Please request a new code.' });
  }

  const matches = safeEqual(t.h, codeDigest(secret, email, code));
  if (!matches) {
    const attempts = Number(t.a || 0) + 1;
    const left = MAX_ATTEMPTS - attempts;
    // hand back a fresh ticket carrying the incremented counter
    const ticket = L.signTicket({ e: email, x: t.x, h: t.h, a: attempts }, secret);
    return L.json(res, 400, {
      error: left > 0
        ? 'That code is incorrect. ' + left + ' attempt' + (left === 1 ? '' : 's') + ' left.'
        : 'Too many incorrect attempts. Please request a new code.',
      ticket: ticket
    });
  }

  return L.json(res, 200, { ok: true, verified: true });
};
