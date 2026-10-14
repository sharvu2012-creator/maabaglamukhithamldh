/* Shared helpers for the OTP endpoints. */

const crypto = require('crypto');

/** Read and parse a JSON request body. */
async function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 1e6) { // 1MB cap
        reject(new Error('Body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch (e) { reject(new Error('Invalid JSON body')); }
    });
    req.on('error', reject);
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  // keep the API private to the site itself
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(body);
}

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase().slice(0, 254);
}

function isEmail(v) {
  return EMAIL_RE.test(normalizeEmail(v));
}

/**
 * Stateless OTP ticket. The 6-digit code never touches the browser —
 * only this signed token does, and the secret stays on the server.
 *   token = base64url(payload) . base64url(HMAC-SHA256(secret, payload))
 */
function signTicket(payload, secret) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return body + '.' + sig;
}

function verifyTicket(token, secret) {
  if (typeof token !== 'string') return null;
  const dot = token.lastIndexOf('.');
  if (dot < 1) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch (e) {
    return null;
  }
}

/** Best-effort per-instance throttle (slows brute force; not a hard limit). */
const buckets = new Map();
function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  let arr = buckets.get(key) || [];
  arr = arr.filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    buckets.set(key, arr);
    return false;
  }
  arr.push(now);
  buckets.set(key, arr);
  if (buckets.size > 5000) buckets.clear(); // keep memory bounded
  return true;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
}

/** The OTP email, in the temple's maroon-and-gold palette. */
function otpEmailHtml(code, minutes, sessionLabel) {
  const rows = String(code).split('').map((d) =>
    `<td style="padding:0 5px;"><div style="width:44px;height:54px;line-height:54px;text-align:center;` +
    `background:#FFFFFF;border:1.5px solid #E8D9B5;border-radius:12px;` +
    `font-family:Georgia,serif;font-size:28px;font-weight:700;color:#5A1E1E;">${d}</div></td>`
  ).join('');

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#FBF6EA;">
  <div style="display:none;font-size:1px;color:#FBF6EA;">Your verification code is ${code}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FBF6EA;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:460px;background:#FFFFFF;border-radius:20px;border:1px solid #EAD9B8;overflow:hidden;">
        <tr><td style="background:linear-gradient(135deg,#5A1E1E,#3E1414);padding:26px 28px;text-align:center;">
          <div style="font-family:Georgia,serif;font-size:20px;color:#D4AF37;letter-spacing:0.04em;">🕉 Maa Baglamukhi Dham</div>
          <div style="font-size:12px;color:rgba(255,253,248,0.75);margin-top:4px;letter-spacing:0.08em;text-transform:uppercase;">Thursday Beej Mala Booking</div>
        </td></tr>
        <tr><td style="padding:30px 28px 26px;text-align:center;">
          <h1 style="font-family:Georgia,serif;font-size:21px;color:#5A1E1E;margin:0 0 8px;">Verify your email</h1>
          <p style="font-size:14px;color:#6b6258;line-height:1.6;margin:0 0 22px;">
            Enter this code on the booking page to confirm your seat${sessionLabel ? ' for <b>' + sessionLabel + '</b>' : ''}.
            It is valid for ${minutes} minutes.
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 20px;"><tr>${rows}</tr></table>
          <p style="font-size:12.5px;color:#8a8278;line-height:1.6;margin:0;">
            Didn't request this? You can safely ignore this email —<br>no seat has been reserved yet.
          </p>
        </td></tr>
        <tr><td style="background:#FBF6EA;padding:16px 28px;text-align:center;border-top:1px solid #EAD9B8;">
          <div style="font-size:11.5px;color:#8a8278;">Jai Maa Baglamukhi 🙏 · Baglamukhi Marg, Ludhiana, Punjab</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

module.exports = {
  readJson, json, normalizeEmail, isEmail,
  signTicket, verifyTicket, rateLimit, clientIp, otpEmailHtml
};
