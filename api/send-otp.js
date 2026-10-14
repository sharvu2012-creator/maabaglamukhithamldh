/* POST /api/send-otp  { email, sessionLabel }
 * Generates a 6-digit code, emails it via Brevo, and returns an opaque signed
 * ticket. The code itself never reaches the browser — only a keyed proof that
 * a code was issued does. */
const crypto = require('crypto');
const L = require('../lib/otp-lib');

const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const SEND_LIMIT = 5;               // per email, per hour
const IP_LIMIT = 20;                // per IP, per hour

/** Keyed digest of email+code. Not invertible, not brute-forceable without the secret. */
function codeDigest(secret, email, code) {
  return crypto.createHmac('sha256', secret).update(email + '|' + code).digest('base64url');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return L.json(res, 405, { error: 'Use POST' });

  // same-origin guard
  const origin = req.headers.origin || '';
  const host = (req.headers.host || '').split(':')[0];
  if (origin && host && !origin.includes(host)) {
    return L.json(res, 403, { error: 'Forbidden' });
  }

  const secret = process.env.OTP_SECRET;
  const brevoKey = process.env.BREVO_API_KEY;
  if (!secret || !brevoKey) {
    return L.json(res, 500, { error: 'Email verification is not configured yet.' });
  }

  const ip = L.clientIp(req);
  if (!L.rateLimit('otp-ip:' + ip, IP_LIMIT, 60 * 60 * 1000)) {
    return L.json(res, 429, { error: 'Too many requests. Please try again in a while.' });
  }

  let body;
  try { body = await L.readJson(req); } catch (e) {
    return L.json(res, 400, { error: 'Invalid request.' });
  }

  const email = L.normalizeEmail(body.email);
  if (!L.isEmail(email)) return L.json(res, 400, { error: 'Enter a valid email address.' });

  if (!L.rateLimit('otp-email:' + email, SEND_LIMIT, 60 * 60 * 1000)) {
    return L.json(res, 429, { error: 'We already sent several codes to this address. Please check your inbox, or try again later.' });
  }

  const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
  const expiresAt = Date.now() + CODE_TTL_MS;

  const sessionLabel = (typeof body.sessionLabel === 'string' && body.sessionLabel.trim())
    ? body.sessionLabel.trim().slice(0, 80) : '';

  const senderEmail = process.env.OTP_SENDER_EMAIL || 'sharvu2012@gmail.com';
  const senderName = process.env.OTP_SENDER_NAME || 'Maa Baglamukhi Dham';

  let sent = false;
  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': brevoKey, 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: email }],
        subject: code + ' — your verification code for Beej Mala booking',
        htmlContent: L.otpEmailHtml(code, 10, sessionLabel),
        textContent:
          'Your verification code for the Thursday Beej Mala booking is: ' + code + '\n\n' +
          'It is valid for 10 minutes. If you did not request this, you can ignore this email.\n\n' +
          'Jai Maa Baglamukhi 🙏'
      })
    });
    if (r.ok) {
      sent = true;
    } else {
      const detail = await r.text().catch(() => '');
      console.error('Brevo send failed', r.status, detail.slice(0, 300));
    }
  } catch (e) {
    console.error('Brevo send threw', e);
  }

  if (!sent) {
    return L.json(res, 502, { error: 'We could not send the email right now. Please try again in a minute.' });
  }

  // opaque ticket: binds email + expiry + a keyed code digest, plus a live attempt counter
  const ticket = L.signTicket({
    e: email,
    x: expiresAt,
    h: codeDigest(secret, email, code),
    a: 0
  }, secret);

  return L.json(res, 200, { ok: true, ticket: ticket, expiresInSeconds: CODE_TTL_MS / 1000 });
};
