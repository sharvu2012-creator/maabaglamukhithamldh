/* ==========================================================================
   Email OTP verification — talks to /api/send-otp and /api/verify-otp
   (Vercel serverless functions, which hold the email API key server-side).
   State lives in the booking draft, so it survives step navigation.
   ========================================================================== */
(function () {
  'use strict';
  if (window.PK_OTP) return;

  var OTP_TTL_SECONDS = 600; // 10 minutes
  var resendCooldown = 0;
  var cooldownTimer = null;

  function statusEl() { return document.getElementById('otp-status'); }
  function setStatus(msg, kind) {
    var el = statusEl();
    if (!el) return;
    el.textContent = msg || '';
    el.className = 'otp-status' + (kind ? ' ' + kind : '');
  }
  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());
  }
  function startCooldown(seconds) {
    var btn = document.getElementById('otp-send');
    if (!btn) return;
    resendCooldown = seconds;
    btn.disabled = true;
    btn.textContent = resendCooldown + 's';
    if (cooldownTimer) clearInterval(cooldownTimer);
    cooldownTimer = setInterval(function () {
      resendCooldown--;
      if (resendCooldown <= 0) {
        clearInterval(cooldownTimer);
        btn.disabled = false;
        btn.textContent = 'Resend code';
      } else {
        btn.textContent = resendCooldown + 's';
      }
    }, 1000);
  }

  /** Called from the booking flow when the Details step renders. */
  function wire(getPrimary, onChange) {
    var sendBtn = document.getElementById('otp-send');
    var checkBtn = document.getElementById('otp-check');
    var emailInput = document.getElementById('f-email');
    var otpInput = document.getElementById('f-otp');
    var verifyBox = document.getElementById('otp-verify');
    if (!sendBtn || !emailInput) return;

    var primary = getPrimary();

    // restoring an already-verified email
    if (primary && primary.emailVerified && primary.email) {
      emailInput.value = primary.email;
      emailInput.classList.add('verified');
      if (verifyBox) verifyBox.hidden = true;
      setStatus('✓ Email verified', 'ok');
      return;
    }

    // typing a different address resets verification
    emailInput.addEventListener('input', function () {
      if (primary) { primary.email = emailInput.value.trim(); primary.emailVerified = false; primary.otpTicket = null; }
      emailInput.classList.remove('verified');
      if (verifyBox) verifyBox.hidden = true;
      setStatus('');
      if (onChange) onChange();
    });

    sendBtn.addEventListener('click', async function () {
      var email = emailInput.value.trim();
      if (!validEmail(email)) {
        setStatus('Enter a valid email address first.', 'err');
        emailInput.closest('.field').classList.add('has-error');
        return;
      }
      emailInput.closest('.field').classList.remove('has-error');
      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending…';
      setStatus('Sending your code…', 'wait');
      try {
        var sessionLabel = document.getElementById('sb-date');
        var res = await fetch('/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            sessionLabel: sessionLabel ? sessionLabel.textContent : ''
          })
        });
        var data = await res.json().catch(function () { return {}; });
        if (!res.ok || !data.ok) throw new Error(data.error || ('Request failed (' + res.status + ')'));
        if (primary) { primary.email = email; primary.emailVerified = false; primary.otpTicket = data.ticket; }
        if (verifyBox) verifyBox.hidden = false;
        if (otpInput) { otpInput.value = ''; otpInput.focus(); }
        setStatus('Code sent to ' + email + '. Check your spam folder too.', 'ok');
        startCooldown(60);
        if (onChange) onChange();
      } catch (err) {
        setStatus(err.message || 'Could not send the code. Please try again.', 'err');
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send code';
      }
    });

    checkBtn.addEventListener('click', async function () {
      var email = emailInput.value.trim();
      var code = (otpInput.value || '').replace(/\D/g, '');
      var ticket = primary && primary.otpTicket;
      if (code.length !== 6) { setStatus('Enter the 6-digit code from the email.', 'err'); return; }
      if (!ticket) { setStatus('Please request a new code first.', 'err'); return; }
      checkBtn.disabled = true;
      checkBtn.textContent = 'Checking…';
      setStatus('Verifying…', 'wait');
      try {
        var res = await fetch('/api/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, code: code, ticket: ticket })
        });
        var data = await res.json().catch(function () { return {}; });
        // a failed attempt returns a fresh ticket with the counter bumped
        if (data.ticket && primary) primary.otpTicket = data.ticket;
        if (!res.ok || !data.ok) throw new Error(data.error || 'Verification failed.');
        if (primary) primary.emailVerified = true;
        emailInput.classList.add('verified');
        if (verifyBox) verifyBox.hidden = true;
        setStatus('✓ Email verified', 'ok');
        if (onChange) onChange();
      } catch (err) {
        setStatus(err.message || 'Verification failed.', 'err');
      } finally {
        checkBtn.disabled = false;
        checkBtn.textContent = 'Verify';
      }
    });

    if (otpInput) {
      otpInput.addEventListener('input', function () {
        otpInput.value = otpInput.value.replace(/\D/g, '').slice(0, 6);
      });
      otpInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); checkBtn.click(); }
      });
    }
  }

  window.PK_OTP = { wire: wire, ttl: OTP_TTL_SECONDS, validEmail: validEmail };
})();
