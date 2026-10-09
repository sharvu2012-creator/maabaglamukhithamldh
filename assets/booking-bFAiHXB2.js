import{t as e}from"./supabaseClient-PRvX8QuD.js";var t={temple:{name:`Maa Baglamukhi Dham`,phone:`+91 98000 00000`,whatsapp:`919800000000`,email:`seva@baglamukhidham.org`,address:`Baglamukhi Marg, Ludhiana, Punjab`},policies:{terms:`Booking a seat reserves your place for the Thursday Beej Mala subject to availability at the time payment is confirmed. Seats are allotted strictly in the order payments are verified. Each booking covers up to the number of participants allowed per booking as shown at the time of reservation. Devotees must report at the temple by the reporting time shown on their confirmation. The Dham reserves the right to refuse entry in cases of misconduct or violation of temple rules.`,refund:`The participation contribution (donation) is a voluntary offering to the Dham. Once a payment is verified and a seat is confirmed, the contribution is generally non-refundable. If you have paid but your booking could not be confirmed due to seat unavailability, please contact the Dham on WhatsApp with your booking code and UTR number and the committee will arrange a refund or carry your seat to the next available Thursday, at your preference.`,privacy:`Details collected during booking (name, contact number, city, state) are used only to confirm your seat, verify your payment, and share reminders about the session. Payment screenshots are used solely for manual verification of your contribution. Your details are never sold or shared with third parties. For any data-related request, contact the Dham on WhatsApp.`}},n=null,r=null,i=null,a={maxParticipantsPerBooking:4};async function o(){let{data:t,error:n}=await e.from(`booking_settings`).select(`max_participants_per_booking`).eq(`id`,!0).maybeSingle();!n&&t&&(a.maxParticipantsPerBooking=t.max_participants_per_booking)}var _cw=false;async function s(){i=null;_cw=false;let _nw=new Date(),_dw=_nw.getDay(),_open=_dw===3||(_dw===4&&_nw.getHours()<21);if(!_open){n=null;_cw=true;i=`Seat reservations for the Thursday Beej Mala open every Wednesday at midnight, and stay open until all seats are filled or the session begins on Thursday evening. Please visit again on Wednesday. 🙏`;return}let t=new Date().toISOString().slice(0,10);try{let _ss=await e.from(`sessions`).select(`id,session_date`).gte(`session_date`,t).order(`session_date`,{ascending:!0}).limit(1).maybeSingle();if(!_ss.error&&_ss.data){let _r=await e.rpc(`get_session_status`,{p_session_id:_ss.data.id});if(_r.error||!_r.data||_r.data.length===0||_r.data[0].available_seats<=0){let _d=new Date(_ss.data.session_date+`T00:00:00`);_d.setDate(_d.getDate()+7);await e.from(`sessions`).insert({session_date:_d.toISOString().slice(0,10),mantra_time:`21:00:00`,reporting_time:`20:00:00`,venue:`Maa Baglamukhi Dham, Ludhiana`,fee_per_participant:2100,capacity:15,manual_status:`open`})}}else if(!_ss.error){let _d=new Date(),_dd=_d.getDay(),_df=(4-_dd+7)%7;_d.setDate(_d.getDate()+_df);_d.setHours(21,0,0,0);if(_d<=new Date())_d.setDate(_d.getDate()+7);await e.from(`sessions`).insert({session_date:_d.toISOString().slice(0,10),mantra_time:`21:00:00`,reporting_time:`20:00:00`,venue:`Maa Baglamukhi Dham, Ludhiana`,fee_per_participant:2100,capacity:15,manual_status:`open`})}}catch(_){}{data:a,error:o}=await e.from(`sessions`).select(`id, session_date, mantra_time, reporting_time, venue, fee_per_participant, capacity, manual_status, next_opening_note`).gte(`session_date`,t).order(`session_date`,{ascending:!0}).limit(1).maybeSingle();if(o||!a){console.error(`[loadSessionStatus] sessions query failed:`,o),n=null,i=`No upcoming Thursday Beej Mala session is currently scheduled. Please check back soon.`;return}let{data:s,error:c}=await e.rpc(`get_session_status`,{p_session_id:a.id});if(c||!s||!s.length){n=null,i=`We couldn't load live seat availability right now. Please try again shortly.`;return}let l=s[0];n={id:a.id,sessionDate:l.session_date,dateLabel:d(l.session_date),mantraTime:l.mantra_time,reportingTime:l.reporting_time,venue:l.venue,fee:l.fee_per_participant,capacity:l.capacity,confirmedSeats:l.confirmed_seats,heldSeats:l.held_seats,availableSeats:l.available_seats,manualStatus:l.manual_status,statusLabel:l.status_label,nextOpeningNote:a.next_opening_note},r=new Date}function c(){return n?n.availableSeats:0}function l(){return n?n.statusLabel:`closed`}var u={open:`Open`,filling:`Filling Fast`,almost:`Almost Full`,full:`Full`,closed:`Closed`};function d(e){if(!e)return``;let t=new Date(e+`T00:00:00`);return`${t.toLocaleDateString(`en-IN`,{day:`numeric`,month:`long`,year:`numeric`})} (${t.toLocaleDateString(`en-IN`,{weekday:`long`})})`}function f(e){return e?`Live · updated `+e.toLocaleTimeString(`en-IN`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}):`Loading…`}var p=`bmd_booking_draft`;function m(){return{participantCount:1,primary:{name:``,mobile:``,sameAsWhatsapp:!0,whatsapp:``,email:``,city:``,state:``},additional:[],consent:{correct:!1,paymentUnderstood:!1,guidelines:!1},hold:null,booking:null,payment:{state:`idle`},confirmation:null}}function h(){try{let e=sessionStorage.getItem(p);if(!e)return m();let t=JSON.parse(e);return{...m(),...t}}catch{return m()}}function g(){try{sessionStorage.setItem(p,JSON.stringify(_))}catch{}}var _=h();function v(e){let t=document.getElementById(`sr-status`);t&&(t.textContent=e)}function y(e){let t=[`Participants`,`Details`,`Review`,`Payment`,`Confirmed`];return`<div class="progress-wrap"><div class="container"><div class="progress">
    ${t.map((n,r)=>{let i=r+1,a=i<e?`done`:i===e?`active`:``,o=i<e?`done`:``;return`<div class="p-step ${a}">
                <div class="p-dot">${i<e?`✓`:i}</div>
                <span class="p-label">${n}</span>
              </div>${i<t.length?`<div class="p-line ${o}"></div>`:``}`}).join(``)}
  </div></div></div>`}function ee(){let e=c(),t=l(),i=n?n.capacity:0,a=n?n.confirmedSeats:0,o=n?n.heldSeats:0,s=i?Math.round(e/i*100):0;return`<div class="seat-avail">
    <div class="seat-avail-top">
      <span class="count">${e} of ${i} seats available</span>
      <span class="status-tag ${t}"><span class="dot"></span>${u[t]}</span>
    </div>
    <div class="bar-track" role="progressbar" aria-valuenow="${e}" aria-valuemin="0" aria-valuemax="${i}" aria-label="Seats available">
      <div class="bar-fill" style="width:${s}%"></div>
    </div>
    <div class="seat-breakdown">${a} confirmed · ${o} temporarily held</div>
    <div class="seat-updated">${f(r)}</div>
  </div>`}function b(){let e=n;return e?`<div class="snap-grid">
    <div class="snap-item"><div class="l">Date</div><div class="v">${e.dateLabel}</div></div>
    <div class="snap-item"><div class="l">Beej Mala</div><div class="v">${e.mantraTime}</div></div>
    <div class="snap-item"><div class="l">Reporting Time</div><div class="v">${e.reportingTime}</div></div>
    <div class="snap-item"><div class="l">Donation / Participant</div><div class="v">₹${e.fee}</div></div>
  </div>`:``}function x(){let e=_.participantCount,t=n?n.fee:0,r=e*t;return`<div class="card summary-card summary-card-desktop">
    <h2 style="font-size:1.2rem;">Booking Summary</h2>
    <div class="sub">Updates as you go</div>
    <div class="summary-row"><span class="k">Session</span><span class="v">${n?n.dateLabel:`—`}</span></div>
    <div class="summary-row"><span class="k">Time</span><span class="v">${n?n.mantraTime:`—`}</span></div>
    <div class="summary-row"><span class="k">Participants</span><span class="v" id="sb-count">${e}</span></div>
    <div class="summary-row"><span class="k">Donation / Participant</span><span class="v">₹${t}</span></div>
    <div class="summary-total"><span class="k">Total</span><span class="v" id="sb-total">₹${r}</span></div>
  </div>`}function S(e){return!e||e.length<4?e||``:e.slice(0,2)+`•••••`+e.slice(-2)}var C=[`participants`,`details`,`review`,`payment`,`confirmation`,`policies`,`status`];function w(){let e=(location.hash||``).replace(/^#\/?/,``);return C.includes(e)?e:`participants`}function T(e){location.hash=`#/`+e}async function E(){_.hold&&_.hold.holdId&&(await e.rpc(`release_hold`,{p_hold_id:_.hold.holdId}),_.hold=null,g()),T(`participants`)}window.addEventListener(`hashchange`,A),window.addEventListener(`DOMContentLoaded`,D);async function D(){document.getElementById(`app`).innerHTML=O(),await Promise.all([s(),o()]),A()}function O(){return`<main class="flow-main container">
    <div class="card processing-wrap" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <h2>Loading Session Details</h2>
      <p>Fetching live seat availability from the temple's booking system.</p>
    </div>
  </main>`}function k(){return`<main class="flow-main container">
    <div class="card state-wrap">
      <div class="glyph">${_cw?`🪔`:`🕉️`}</div>
      <h1>${_cw?`Bookings Are Closed`:`Session Details Unavailable`}</h1>
      <p>${i||`We couldn't load the upcoming session right now. Please try again shortly.`}</p>
      <a class="btn btn-outline" href="/">Return to Home</a>
    </div>
  </main>`}async function A(){let e=document.getElementById(`app`),t=w();if(t===`policies`){e.innerHTML=ne();return}if(([`participants`,`payment`].includes(t)||!n)&&(e.innerHTML=O(),await Promise.all([s(),o()])),!n){e.innerHTML=k();return}let r=l();if(!(t===`confirmation`&&_.confirmation)){if(r===`closed`){e.innerHTML=Z();return}if(r===`full`&&t!==`confirmation`){e.innerHTML=Y(),X();return}}switch(t){case`participants`:e.innerHTML=j(),M();break;case`details`:e.innerHTML=N(),R();break;case`review`:e.innerHTML=z(),B();break;case`payment`:e.innerHTML=V(),U();break;case`confirmation`:if(!_.confirmation){T(`participants`);return}e.innerHTML=G(),K();break;default:T(`participants`)}window.scrollTo({top:0,behavior:`instant`})}function j(){let e=c(),t=Math.min(a.maxParticipantsPerBooking,Math.max(e,1));_.participantCount>t&&(_.participantCount=t);let r=n.fee,i=_.participantCount*r;return`
  ${y(1)}
  <main class="flow-main container">
    <div class="grid-2">
      <div>
        <div class="card">
          <span class="eyebrow">Step 1 of 5</span>
          <h2 style="margin-top:10px;">Select Participants</h2>
          <div class="sub">Choose how many people this booking covers.</div>
          ${b()}
          ${ee()}

          <div class="qty-row">
            <div>
              <div class="qty-label">Number of Participants</div>
              <div class="qty-hint">Up to ${t} per booking right now</div>
            </div>
            <div class="stepper">
              <button type="button" id="qty-minus" aria-label="Decrease participants" ${_.participantCount<=1?`disabled`:``}>−</button>
              <span class="qty-value" id="qty-value" aria-live="polite">${_.participantCount}</span>
              <button type="button" id="qty-plus" aria-label="Increase participants" ${_.participantCount>=t?`disabled`:``}>+</button>
            </div>
          </div>

          <div class="notice"><span class="ic">ℹ️</span><span>Seats are confirmed only after successful payment. Beginning the booking process does not permanently confirm a seat.</span></div>

          <div class="notice error" id="participants-error" style="display:none;"></div>

          <button class="btn btn-primary btn-block" id="continue-1">Continue</button>
        </div>
      </div>
      ${x()}
    </div>
  </main>
  <div class="sticky-bar">
    <div class="amt"><div class="l">Total Amount</div><div class="v" id="mobile-total">₹${i}</div></div>
    <button class="btn btn-primary" id="continue-1-mobile">Continue</button>
  </div>`}function M(){let t=Math.min(a.maxParticipantsPerBooking,Math.max(c(),1)),r=n.fee,i=e=>{_.participantCount=Math.min(t,Math.max(1,e)),g(),document.getElementById(`qty-value`).textContent=_.participantCount,document.getElementById(`qty-minus`).disabled=_.participantCount<=1,document.getElementById(`qty-plus`).disabled=_.participantCount>=t;let n=_.participantCount*r;document.getElementById(`sb-count`).textContent=_.participantCount,document.getElementById(`sb-total`).textContent=`₹`+n,document.getElementById(`mobile-total`).textContent=`₹`+n,v(`${_.participantCount} participant${_.participantCount>1?`s`:``} selected. Total ₹${n}.`)};document.getElementById(`qty-minus`).addEventListener(`click`,()=>i(_.participantCount-1)),document.getElementById(`qty-plus`).addEventListener(`click`,()=>i(_.participantCount+1));function o(e){let t=document.getElementById(`participants-error`);t.innerHTML=`<span class="ic">⚠️</span><span>${e}</span>`,t.style.display=`flex`,v(e)}function l(){document.getElementById(`participants-error`).style.display=`none`}let u=async()=>{l();let t=document.getElementById(`continue-1`),r=document.getElementById(`continue-1-mobile`);[t,r].forEach(e=>{e.disabled=!0,e.textContent=`Checking availability…`});let{data:i,error:a}=await e.rpc(`create_seat_hold`,{p_session_id:n.id,p_participant_count:_.participantCount});if(a){o(a.message||`We couldn't reserve those seats. Please try again.`),[t,r].forEach(e=>{e.disabled=!1,e.textContent=`Continue`}),await s(),A();return}let c=i[0];_.hold={holdId:c.hold_id,expiresAt:new Date(c.expires_at).getTime()};let u=_.participantCount-1;for(;_.additional.length<u;)_.additional.push({name:``,mobile:``});for(;_.additional.length>u;)_.additional.pop();g(),T(`details`)};document.getElementById(`continue-1`).addEventListener(`click`,u),document.getElementById(`continue-1-mobile`).addEventListener(`click`,u)}function N(){let e=_.primary;return`
  ${y(2)}
  <main class="flow-main container">
    <div class="grid-2">
      <div>
        <div class="card">
          <span class="eyebrow">Step 2 of 5</span>
          <h2 style="margin-top:10px;">Participant Details</h2>
          <div class="sub">Details for the primary devotee making this booking.</div>

          <div class="field" id="f-name-wrap">
            <label for="f-name">Full Name</label>
            <input id="f-name" type="text" value="${$(e.name)}" autocomplete="name">
            <div class="err" id="err-name">Please enter your full name.</div>
          </div>

          <div class="form-row-2">
            <div class="field" id="f-mobile-wrap">
              <label for="f-mobile">Mobile Number</label>
              <input id="f-mobile" type="tel" inputmode="numeric" maxlength="10" value="${$(e.mobile)}" autocomplete="tel">
              <div class="err" id="err-mobile">Please enter a valid 10-digit mobile number.</div>
            </div>
            <div class="field">
              <label for="f-email">Email Address <span style="font-weight:400; text-transform:none;">(optional)</span></label>
              <input id="f-email" type="email" value="${$(e.email)}" autocomplete="email">
              <div class="err" id="err-email">Please enter a valid email address.</div>
            </div>
          </div>

          <label class="checkbox-row">
            <input type="checkbox" id="f-same-wa" ${e.sameAsWhatsapp?`checked`:``}>
            <span>This is also my WhatsApp number</span>
          </label>
          <div class="field" id="f-wa-wrap" style="${e.sameAsWhatsapp?`display:none;`:``}">
            <label for="f-whatsapp">WhatsApp Number</label>
            <input id="f-whatsapp" type="tel" inputmode="numeric" maxlength="10" value="${$(e.whatsapp)}">
            <div class="err" id="err-whatsapp">Please enter a valid 10-digit WhatsApp number.</div>
          </div>

          <div class="form-row-2">
            <div class="field" id="f-city-wrap">
              <label for="f-city">City</label>
              <input id="f-city" type="text" value="${$(e.city)}" autocomplete="address-level2">
              <div class="err" id="err-city">Please enter your city.</div>
            </div>
            <div class="field" id="f-state-wrap">
              <label for="f-state">State</label>
              <input id="f-state" type="text" value="${$(e.state)}" autocomplete="address-level1">
              <div class="err" id="err-state">Please enter your state.</div>
            </div>
          </div>

          ${_.additional.length?`<h3 style="font-size:1.05rem; margin:26px 0 14px; color:var(--maroon); font-family:var(--serif);">Additional Participants</h3>`:``}
          <div id="additional-wrap">
            ${_.additional.map((e,t)=>P(e,t)).join(``)}
          </div>
          <div class="dup-warning" id="dup-warning" style="display:none;">⚠ Two participants have the same name. That's fine if intentional — please double-check for typos.</div>

          <h3 style="font-size:1.05rem; margin:26px 0 14px; color:var(--maroon); font-family:var(--serif);">Please confirm</h3>
          <label class="checkbox-row">
            <input type="checkbox" id="c-correct" ${_.consent.correct?`checked`:``}>
            <span>I confirm that the information entered above is correct.</span>
          </label>
          <label class="checkbox-row">
            <input type="checkbox" id="c-payment" ${_.consent.paymentUnderstood?`checked`:``}>
            <span>I understand that my booking will be confirmed only after successful payment.</span>
          </label>
          <label class="checkbox-row">
            <input type="checkbox" id="c-guidelines" ${_.consent.guidelines?`checked`:``}>
            <span>I agree to follow the instructions and guidelines provided by Maa Baglamukhi Dham.</span>
          </label>
          <div class="consent-links">
            <button type="button" data-policy="terms">Booking Terms</button>
            <button type="button" data-policy="refund">Cancellation &amp; Refund Policy</button>
            <button type="button" data-policy="privacy">Privacy Policy</button>
          </div>

          <div style="display:flex; gap:12px; margin-top:10px;">
            <button class="btn btn-outline" id="back-2">Back</button>
            <button class="btn btn-primary" id="continue-2" style="flex:1;" disabled>Continue to Review</button>
          </div>
        </div>
      </div>
      ${x()}
    </div>
  </main>
  <div id="policy-modal-slot"></div>`}function P(e,t){return`<div class="participant-block" data-idx="${t}">
    <h3>Participant ${t+2}</h3>
    <div class="field">
      <label for="add-name-${t}">Full Name</label>
      <input id="add-name-${t}" type="text" value="${$(e.name)}" data-field="name" data-idx="${t}">
      <div class="err" id="err-add-name-${t}">Please enter this participant's name.</div>
    </div>
    <div class="field">
      <label for="add-mobile-${t}">Mobile Number <span style="font-weight:400; text-transform:none;">(optional)</span></label>
      <input id="add-mobile-${t}" type="tel" inputmode="numeric" maxlength="10" value="${$(e.mobile)}" data-field="mobile" data-idx="${t}">
      <div class="err" id="err-add-mobile-${t}">Please enter a valid 10-digit mobile number.</div>
    </div>
  </div>`}function F(e){return e.trim().length>=2}function I(e){let t=e.trim();return!(!/^[0-9]{10}$/.test(t)||/^([0-9])\1{9}$/.test(t))}function L(e){return!e.trim()||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())}function R(){let e=_.primary,t=(e,t)=>document.getElementById(e).classList.toggle(`has-error`,t);function n(){let n=!0,r=F(e.name);t(`f-name-wrap`,!r),n&&=r;let i=I(e.mobile);if(t(`f-mobile-wrap`,!i),n&&=i,L(e.email)?document.getElementById(`f-email`).closest(`.field`).classList.remove(`has-error`):(document.getElementById(`f-email`).closest(`.field`).classList.add(`has-error`),n=!1),!e.sameAsWhatsapp){let r=I(e.whatsapp);t(`f-wa-wrap`,!r),n&&=r}let a=e.city.trim().length>0;t(`f-city-wrap`,!a),n&&=a;let o=e.state.trim().length>0;t(`f-state-wrap`,!o),n&&=o,_.additional.forEach((e,t)=>{let r=F(e.name),i=document.getElementById(`add-name-${t}`)?.closest(`.field`);if(i&&i.classList.toggle(`has-error`,!r),n&&=r,e.mobile){let r=I(e.mobile),i=document.getElementById(`add-mobile-${t}`)?.closest(`.field`);i&&i.classList.toggle(`has-error`,!r),n&&=r}});let s=[e.name.trim().toLowerCase(),..._.additional.map(e=>e.name.trim().toLowerCase())].filter(Boolean),c=new Set(s).size!==s.length;document.getElementById(`dup-warning`).style.display=c?`block`:`none`;let l=_.consent.correct&&_.consent.paymentUnderstood&&_.consent.guidelines;return document.getElementById(`continue-2`).disabled=!(n&&l),n&&l}document.getElementById(`f-name`).addEventListener(`input`,t=>{e.name=t.target.value,g(),n()}),document.getElementById(`f-mobile`).addEventListener(`input`,t=>{t.target.value=t.target.value.replace(/\D/g,``).slice(0,10),e.mobile=t.target.value,g(),n()}),document.getElementById(`f-email`).addEventListener(`input`,t=>{e.email=t.target.value,g(),n()}),document.getElementById(`f-city`).addEventListener(`input`,t=>{e.city=t.target.value,g(),n()}),document.getElementById(`f-state`).addEventListener(`input`,t=>{e.state=t.target.value,g(),n()}),document.getElementById(`f-same-wa`).addEventListener(`change`,t=>{e.sameAsWhatsapp=t.target.checked,document.getElementById(`f-wa-wrap`).style.display=e.sameAsWhatsapp?`none`:`block`,g(),n()});let r=document.getElementById(`f-whatsapp`);r&&r.addEventListener(`input`,t=>{t.target.value=t.target.value.replace(/\D/g,``).slice(0,10),e.whatsapp=t.target.value,g(),n()}),_.additional.forEach((e,t)=>{document.getElementById(`add-name-${t}`).addEventListener(`input`,t=>{e.name=t.target.value,g(),n()}),document.getElementById(`add-mobile-${t}`).addEventListener(`input`,t=>{t.target.value=t.target.value.replace(/\D/g,``).slice(0,10),e.mobile=t.target.value,g(),n()})}),[`correct`,`payment`,`guidelines`].forEach(e=>{let t={correct:`correct`,payment:`paymentUnderstood`,guidelines:`guidelines`};document.getElementById(`c-`+e).addEventListener(`change`,r=>{_.consent[t[e]]=r.target.checked,g(),n()})}),document.querySelectorAll(`[data-policy]`).forEach(e=>{e.addEventListener(`click`,()=>te(e.dataset.policy))}),document.getElementById(`back-2`).addEventListener(`click`,E),document.getElementById(`continue-2`).addEventListener(`click`,()=>{e.name=e.name.trim(),e.city=e.city.trim(),e.state=e.state.trim(),_.additional.forEach(e=>e.name=e.name.trim()),g(),T(`review`)}),n()}function z(){let e=_.primary,t=n.fee,r=_.participantCount*t;return`
  ${y(3)}
  <main class="flow-main container">
    <div class="grid-2">
      <div>
        <div class="card">
          <span class="eyebrow">Step 3 of 5</span>
          <h2 style="margin-top:10px;">Review Your Booking</h2>
          <div class="sub">Please check every detail before proceeding to payment.</div>

          <div class="review-section">
            <div class="review-head"><h3>Session</h3><button class="btn-text" data-edit="participants">Edit</button></div>
            <div class="review-grid">
              <div><div class="k">Date</div><div class="v">${n.dateLabel}</div></div>
              <div><div class="k">Beej Mala Time</div><div class="v">${n.mantraTime}</div></div>
              <div><div class="k">Reporting Time</div><div class="v">${n.reportingTime}</div></div>
              <div><div class="k">Venue</div><div class="v">${n.venue}</div></div>
            </div>
          </div>

          <div class="review-section">
            <div class="review-head"><h3>Primary Devotee</h3><button class="btn-text" data-edit="details">Edit</button></div>
            <div class="review-grid">
              <div><div class="k">Name</div><div class="v">${e.name}</div></div>
              <div><div class="k">Mobile</div><div class="v">${S(e.mobile)}</div></div>
              <div><div class="k">WhatsApp</div><div class="v">${S(e.sameAsWhatsapp?e.mobile:e.whatsapp)}</div></div>
              <div><div class="k">Email</div><div class="v">${e.email||`—`}</div></div>
              <div><div class="k">City</div><div class="v">${e.city}</div></div>
              <div><div class="k">State</div><div class="v">${e.state}</div></div>
            </div>
          </div>

          ${_.additional.length?`<div class="review-section">
            <div class="review-head"><h3>Additional Participants</h3><button class="btn-text" data-edit="details">Edit</button></div>
            <div class="review-grid">
              ${_.additional.map((e,t)=>`<div><div class="k">Participant ${t+2}</div><div class="v">${e.name}${e.mobile?` · `+S(e.mobile):``}</div></div>`).join(``)}
            </div>
          </div>`:``}

          <div class="review-section">
            <div class="review-head"><h3>Amount</h3><button class="btn-text" data-edit="participants">Edit</button></div>
            <div class="review-grid">
              <div><div class="k">Seats</div><div class="v">${_.participantCount}</div></div>
              <div><div class="k">Donation / Participant</div><div class="v">₹${t}</div></div>
              <div><div class="k">Total Amount</div><div class="v" style="font-weight:700;">₹${r}</div></div>
            </div>
          </div>

          <div class="notice warn" style="margin-top:22px;"><span class="ic">⚠️</span><span>Please review all details carefully. Your seats will be confirmed only after payment is successfully completed and verified.</span></div>

          <div class="notice error" id="review-error" style="display:none; margin-top:16px;"></div>

          <div style="display:flex; gap:12px;">
            <button class="btn btn-outline" id="back-3">Back</button>
            <button class="btn btn-primary" id="continue-3" style="flex:1;">Proceed to Secure Payment</button>
          </div>
        </div>
      </div>
      ${x()}
    </div>
  </main>`}function B(){document.querySelectorAll(`[data-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{e.dataset.edit===`participants`?E():T(e.dataset.edit)})}),document.getElementById(`back-3`).addEventListener(`click`,()=>T(`details`)),document.getElementById(`continue-3`).addEventListener(`click`,async()=>{let t=document.getElementById(`continue-3`),n=document.getElementById(`review-error`);n.style.display=`none`,t.disabled=!0,t.textContent=`Processing…`;let r=_.primary,i={full_name:r.name,mobile:r.mobile,whatsapp_number:r.sameAsWhatsapp?r.mobile:r.whatsapp,email:r.email,city:r.city,state:r.state},a=_.additional.map(e=>({full_name:e.name,mobile:e.mobile||``})),{data:o,error:s}=await e.rpc(`submit_booking`,{p_hold_id:_.hold?_.hold.holdId:null,p_primary:i,p_participants:a});if(s){n.innerHTML=`<span class="ic">⚠️</span><span>${s.message||`We couldn't confirm your seat hold. Please start again.`}</span>`,n.style.display=`flex`,t.disabled=!1,t.textContent=`Proceed to Secure Payment`;return}let c=o[0];_.booking={bookingId:c.booking_id,bookingCode:c.booking_code,totalAmount:c.total_amount},g(),T(`payment`)})}function V(){let e=_.booking?_.booking.totalAmount:_.participantCount*n.fee;return`
  ${y(4)}
  <main class="flow-main container">
    <div class="grid-2">
      <div>
        <div class="card">
          <span class="eyebrow">Step 4 of 5</span>
          <h2 style="margin-top:10px;">Complete Your Payment</h2>
          <div class="sub">${t.temple.name} · ${n.dateLabel}</div>

          <div class="hold-banner">
            <div class="txt">Your selected seats are temporarily held while you complete payment.</div>
            <div class="hold-timer" id="hold-timer">--:--</div>
          </div>

          <div class="review-grid" style="margin-bottom:8px;">
            <div><div class="k">Participants</div><div class="v">${_.participantCount}</div></div>
            <div><div class="k">Selected Date</div><div class="v" style="font-family:var(--sans); font-size:1rem; font-weight:600;">${n.dateLabel}</div></div>
            <div><div class="k">Total Donation</div><div class="v" style="font-weight:700;">₹${e}</div></div>
          </div>

          <div class="qr-wrap">
            <div class="qr-frame">
              <img src="images/QR.jpeg" alt="Maa Baglamukhi Dham official UPI payment QR code" loading="lazy" decoding="async">
            </div>
            <p class="qr-caption">Scan the QR code using any UPI payment app</p>
          </div>

          <ol class="pay-instructions">
            <li>Scan the QR code using Google Pay, PhonePe, Paytm or another UPI app.</li>
            <li>Pay the exact amount shown above — ₹${e}.</li>
            <li>Copy the UPI Transaction ID / UTR number after payment.</li>
            <li>Enter the Transaction ID below.</li>
            <li>Upload a screenshot of the successful payment.</li>
            <li>Submit the booking for verification.</li>
          </ol>

          <div class="notice warn"><span class="ic">⚠️</span><span>Please do not close or refresh this page until you have submitted your payment details below.</span></div>

          <div class="field" id="f-utr-wrap" style="margin-top:22px;">
            <label for="f-utr">UPI Transaction ID / UTR Number</label>
            <input id="f-utr" type="text" placeholder="e.g. 123456789012" autocomplete="off">
            <div class="err" id="err-utr">Please enter the UTR / Transaction ID from your payment app.</div>
          </div>

          <div class="file-field" id="f-screenshot-wrap">
            <label for="f-screenshot">Payment Screenshot</label>
            <input id="f-screenshot" type="file" accept="image/*">
            <div class="file-name-preview" id="file-name-preview"></div>
            <div class="err" id="err-screenshot">Please upload a screenshot of your payment.</div>
          </div>

          <label class="checkbox-row">
            <input type="checkbox" id="c-paid-confirm">
            <span>I confirm that I have paid the exact amount shown above.</span>
          </label>

          <div id="payment-submit-error"></div>

          <button class="btn btn-primary btn-block" id="submit-payment" disabled style="margin-top:10px;">Submit Payment for Verification</button>

          <button class="btn btn-outline" id="back-4" style="margin-top:22px;">Back to Review</button>
        </div>
      </div>
      ${x()}
    </div>
  </main>`}var H=null;function U(){clearInterval(H);function e(){if(!_.hold)return;let e=_.hold.expiresAt-Date.now(),t=document.getElementById(`hold-timer`);if(!t)return;if(e<=0){clearInterval(H),_.hold=null,g(),v(`Your seat hold has expired. Please review seat availability again.`),alert(`Your temporary hold has expired. Availability will be rechecked.`),T(`participants`);return}let n=Math.floor(e/6e4),r=Math.floor(e%6e4/1e3);t.textContent=`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`}e(),H=setInterval(e,1e3),document.getElementById(`back-4`).addEventListener(`click`,()=>T(`review`));let t=null;function n(){let e=document.getElementById(`f-utr`).value.trim().length>=4,n=document.getElementById(`c-paid-confirm`).checked;document.getElementById(`submit-payment`).disabled=!(e&&t&&n)}document.getElementById(`f-utr`).addEventListener(`input`,n),document.getElementById(`c-paid-confirm`).addEventListener(`change`,n),document.getElementById(`f-screenshot`).addEventListener(`change`,e=>{let r=e.target.files&&e.target.files[0],i=document.getElementById(`file-name-preview`);t=null,r?r.type.startsWith(`image/`)?r.size>8*1024*1024?i.textContent=`That image is larger than 8MB — please choose a smaller screenshot.`:(t=r,i.textContent=`Selected: ${r.name}`):i.textContent=`Please choose an image file (screenshot).`:i.textContent=``,n()}),document.getElementById(`submit-payment`).addEventListener(`click`,()=>W(t))}var _submitTimes=[];function _checkRateLimit(){var now=Date.now();_submitTimes=_submitTimes.filter(function(t){return now-t<600000;});if(_submitTimes.length>=3)return false;_submitTimes.push(now);return true;}
async function W(t){if(!_checkRateLimit()){document.getElementById(`payment-submit-error`).innerHTML=`<div class="notice error"><span class="ic">⚠️</span><span>Too many submissions. Please wait a few minutes and try again.</span></div>`;return}let n=document.getElementById(`submit-payment`),r=document.getElementById(`payment-submit-error`);r.innerHTML=``;let i=document.getElementById(`f-utr`).value.trim();if(!t){r.innerHTML=`<div class="notice error"><span class="ic">⚠️</span><span>Please upload a screenshot of your payment before submitting.</span></div>`;return}if(!_.booking||!_.booking.bookingId){r.innerHTML=`<div class="notice error"><span class="ic">⚠️</span><span>We couldn't find your booking details. Please go back to Review and try again.</span></div>`;return}n.disabled=!0,n.textContent=`Uploading screenshot…`;let a=(t.name.split(`.`).pop()||`jpg`).toLowerCase().replace(/[^a-z0-9]/g,``)||`jpg`,o=`${_.booking.bookingId}/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${a}`,{error:s}=await e.storage.from(`payment-screenshots`).upload(o,t,{upsert:!1,contentType:t.type||`image/jpeg`});if(s){r.innerHTML=`<div class="notice error"><span class="ic">⚠️</span><span>We couldn't upload your screenshot. Please check your connection and try again.</span></div>`,n.disabled=!1,n.textContent=`Submit Payment for Verification`;return}n.textContent=`Submitting for verification…`;let{error:c}=await e.rpc(`submit_payment_proof`,{p_booking_id:_.booking.bookingId,p_utr_number:i,p_screenshot_path:o});if(c){r.innerHTML=`<div class="notice error"><span class="ic">⚠️</span><span>${c.message||`We couldn't submit your payment details. Please try again.`}</span></div>`,n.disabled=!1,n.textContent=`Submit Payment for Verification`;return}clearInterval(H),_.confirmation={bookingCode:_.booking.bookingCode,amount:_.booking.totalAmount,utr:i},g(),T(`confirmation`)}function G(){let e=_.confirmation,t=[_.primary.name,..._.additional.map(e=>e.name)].filter(Boolean),r=encodeURIComponent(`Jai Maa Baglamukhi 🙏 I have submitted my Thursday Beej Mala booking request at Maa Baglamukhi Dham for ${n.dateLabel}. Booking ID: ${e.bookingCode}. Awaiting the temple team's payment verification.`);return`<main class="flow-main container">
    <div class="card" id="confirmation-print">
      <div class="confirm-hero">
        <div class="mark">🙏</div>
        <h1>Jai Maa Baglamukhi</h1>
        <p>Your booking request has been submitted successfully. The temple team will verify your payment and confirm your Beej Mala booking.</p>
        <span class="mock-tag">Status: Pending Payment Verification</span>
      </div>

      <div class="review-section">
        <div class="review-head"><h3>Booking Details</h3></div>
        <div class="review-grid">
          <div><div class="k">Booking ID</div><div class="v">${e.bookingCode}</div></div>
          <div><div class="k">Payment Status</div><div class="v" style="color:var(--amber); font-weight:700;">Pending Payment Verification</div></div>
          <div><div class="k">Participants</div><div class="v">${t.join(`, `)}</div></div>
          <div><div class="k">Seats</div><div class="v">${_.participantCount}</div></div>
          <div><div class="k">Session Date</div><div class="v">${n.dateLabel}</div></div>
          <div><div class="k">Beej Mala Time</div><div class="v">${n.mantraTime}</div></div>
          <div><div class="k">Reporting Time</div><div class="v">${n.reportingTime}</div></div>
          <div><div class="k">Venue</div><div class="v">${n.venue}</div></div>
          <div><div class="k">Amount Submitted</div><div class="v">₹${e.amount}</div></div>
          <div><div class="k">UPI Transaction ID / UTR</div><div class="v">${e.utr}</div></div>
        </div>
      </div>

      <div class="notice warn" style="margin-top:20px;"><span class="ic">⏳</span><span>Your seat is not yet confirmed. The temple team will check your payment and UTR, then confirm your booking.</span></div>

      <div class="confirm-actions">
        <button class="btn btn-primary" id="btn-download">Download Receipt</button>
        <button class="btn btn-outline" id="btn-print">Print Receipt</button>
        <a class="btn btn-outline" id="btn-whatsapp" href="https://wa.me/?text=${r}" target="_blank" rel="noopener">Share on WhatsApp</a>
        <a class="btn btn-outline" href="/">Return to Home</a>
      </div>
    </div>
  </main>`}function K(){q(),document.getElementById(`btn-print`).addEventListener(`click`,()=>window.print()),document.getElementById(`btn-download`).addEventListener(`click`,J)}function q(){let e=_.confirmation,t={...m(),confirmation:e,participantCount:_.participantCount,primary:_.primary,additional:_.additional};try{sessionStorage.removeItem(p)}catch{}_=t}function J(){let e=_.confirmation,t=[_.primary.name,..._.additional.map(e=>e.name)].filter(Boolean),r=`MAA BAGLAMUKHI DHAM — Thursday Beej Mala
Booking Request Receipt

Booking ID: ${e.bookingCode}
Payment Status: Pending Payment Verification
Participants: ${t.join(`, `)}
Seats: ${_.participantCount}
Session Date: ${n.dateLabel}
Beej Mala Time: ${n.mantraTime}
Reporting Time: ${n.reportingTime}
Venue: ${n.venue}
Amount Submitted: ₹${e.amount}
UPI Transaction ID / UTR: ${e.utr}

Your booking request has been submitted successfully. The temple team
will verify your payment and confirm your Beej Mala booking.

Jai Maa Baglamukhi 🙏
`,i=new Blob([r],{type:`text/plain`}),a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a,o.download=`${e.bookingCode}.txt`,document.body.appendChild(o),o.click(),o.remove(),URL.revokeObjectURL(a)}function Y(){return`<main class="flow-main container">
    <div class="card state-wrap">
      <div class="glyph">🪔</div>
      <h1>Bookings Full for This Thursday</h1>
      <p>All ${n.capacity} seats for the upcoming Thursday Beej Mala have been reserved.</p>
      ${n.nextOpeningNote?`<p style="font-size:0.85rem;">${n.nextOpeningNote}</p>`:`<p style="font-size:0.85rem;">Bookings reopen every Wednesday at midnight for the next Thursday session.</p>`}
      <button class="btn btn-outline" id="notify-btn">Notify Me About the Next Session</button>
      <div id="notify-slot"></div>
    </div>
  </main>`}function X(){document.getElementById(`notify-btn`).addEventListener(`click`,Q)}function Z(){return`<main class="flow-main container">
    <div class="card state-wrap">
      <div class="glyph">🔒</div>
      <h1>Bookings Are Currently Closed</h1>
      <p>Online booking for this session is not available at the moment. Please contact Maa Baglamukhi Dham for assistance.</p>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <a class="btn btn-primary" href="tel:${t.temple.phone.replace(/\s/g,``)}">Call ${t.temple.phone}</a>
        <a class="btn btn-outline" href="https://wa.me/${t.temple.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </main>`}function Q(){let t=document.getElementById(`notify-slot`);t.innerHTML=`<div class="modal-overlay" id="notify-overlay">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="notify-title">
      <button class="modal-close" id="notify-close" aria-label="Close">×</button>
      <h2 id="notify-title" style="font-size:1.3rem;">Notify Me About the Next Session</h2>
      <p style="font-size:0.85rem; color:var(--charcoal-soft); margin:8px 0 18px;">Your request is saved now. Actual notification delivery (SMS/email/WhatsApp) will be connected in a later stage.</p>
      <div class="field"><label for="nm-name">Name</label><input id="nm-name" type="text"></div>
      <div class="field"><label for="nm-mobile">Mobile Number</label><input id="nm-mobile" type="tel" inputmode="numeric" maxlength="10"></div>
      <div class="field"><label for="nm-email">Email <span style="font-weight:400;">(optional)</span></label><input id="nm-email" type="email"></div>
      <button class="btn btn-primary btn-block" id="nm-submit">Notify Me</button>
      <div id="nm-result" style="margin-top:14px;"></div>
    </div>
  </div>`,document.getElementById(`notify-close`).addEventListener(`click`,()=>t.innerHTML=``),document.getElementById(`notify-overlay`).addEventListener(`click`,e=>{e.target.id===`notify-overlay`&&(t.innerHTML=``)}),document.getElementById(`nm-submit`).addEventListener(`click`,async()=>{let t=document.getElementById(`nm-result`),r=document.getElementById(`nm-submit`),i=document.getElementById(`nm-name`).value,a=document.getElementById(`nm-mobile`).value,o=document.getElementById(`nm-email`).value;r.disabled=!0,r.textContent=`Saving…`;let{error:s}=await e.rpc(`submit_notify_request`,{p_full_name:i,p_mobile:a,p_email:o||null,p_session_id:n?n.id:null});if(r.disabled=!1,r.textContent=`Notify Me`,s){t.innerHTML=`<div class="notice error"><span class="ic">⚠️</span><span>${s.message||`Please check your details and try again.`}</span></div>`;return}t.innerHTML=`<div class="notice success"><span class="ic">✓</span><span>You're on the notify list for the next session opening.</span></div>`})}function te(e){let n=document.getElementById(`policy-modal-slot`)||(()=>{let e=document.createElement(`div`);return e.id=`policy-modal-slot`,document.body.appendChild(e),e})(),r=e=>`<div class="modal-overlay" id="policy-overlay">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="policy-title">
      <button class="modal-close" id="policy-close" aria-label="Close">×</button>
      <h2 id="policy-title" style="font-size:1.3rem;">Booking Policies</h2>
      <div class="modal-tabs">
        <button data-tab="terms" class="${e===`terms`?`active`:``}">Booking Terms</button>
        <button data-tab="refund" class="${e===`refund`?`active`:``}">Cancellation &amp; Refund</button>
        <button data-tab="privacy" class="${e===`privacy`?`active`:``}">Privacy</button>
      </div>
      <p>${t.policies[e]}</p>
    </div>
  </div>`;n.innerHTML=r(e);let i=()=>{document.getElementById(`policy-close`).addEventListener(`click`,()=>n.innerHTML=``),document.getElementById(`policy-overlay`).addEventListener(`click`,e=>{e.target.id===`policy-overlay`&&(n.innerHTML=``)}),document.querySelectorAll(`[data-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{n.innerHTML=r(e.dataset.tab),i()})})};i()}function ne(){return`<main class="flow-main container">
    <div class="card">
      <span class="eyebrow">Reference</span>
      <h2 style="margin-top:10px;">Policies</h2>
      <div class="review-section"><h3 style="margin-bottom:8px;">Booking Terms</h3><p style="color:var(--charcoal-soft); font-size:0.92rem;">${t.policies.terms}</p></div>
      <div class="review-section"><h3 style="margin-bottom:8px;">Cancellation &amp; Refund Policy</h3><p style="color:var(--charcoal-soft); font-size:0.92rem;">${t.policies.refund}</p></div>
      <div class="review-section"><h3 style="margin-bottom:8px;">Privacy Policy</h3><p style="color:var(--charcoal-soft); font-size:0.92rem;">${t.policies.privacy}</p></div>
      <a class="btn btn-outline" href="/" style="margin-top:10px;">Back to Home</a>
    </div>
  </main>`}function $(e){return String(e||``).replace(/"/g,`&quot;`)}