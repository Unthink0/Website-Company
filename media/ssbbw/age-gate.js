(() => {
  const KEY = "age_verified_18plus_v1";

  // If already verified, do nothing
  try {
    if (localStorage.getItem(KEY) === "true") return;
  } catch (e) {
    // If storage blocked, gate will show each visit
  }

  const style = document.createElement("style");
  style.textContent = `
    .age-gate-overlay{
      position:fixed; inset:0;
      background:rgba(0,0,0,.92);
      backdrop-filter: blur(6px);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:999999;
      padding:16px;
    }
    .age-gate-panel{
      width:min(720px, 100%);
      background:#111;
      border:1px solid rgba(255,255,255,.12);
      border-radius:16px;
      padding:20px;
      box-shadow:0 20px 60px rgba(0,0,0,.65);
      color:#eaeaea;
      font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
    }
    .age-gate-title{
      margin:0 0 8px;
      font-size:1.25rem;
      letter-spacing:.2px;
      color:#fff;
    }
    .age-gate-text{
      margin:0 0 14px;
      color:rgba(255,255,255,.78);
      line-height:1.45;
      font-size:.95rem;
    }
    .age-gate-actions{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      margin-top:14px;
    }
    .age-gate-btn{
      appearance:none;
      border:0;
      border-radius:999px;
      padding:12px 16px;
      font-weight:800;
      cursor:pointer;
      font-size:1rem;
      transition:transform .15s ease, opacity .15s ease;
    }
    .age-gate-btn:hover{ transform: translateY(-1px); }
    .age-gate-enter{ background:#007aff; color:#fff; }
    .age-gate-exit{ background:rgba(255,255,255,.10); color:#fff; }
    .age-gate-foot{
      margin-top:12px;
      font-size:.85rem;
      color:rgba(255,255,255,.55);
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.className = "age-gate-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  overlay.innerHTML = `
    <div class="age-gate-panel">
      <h2 class="age-gate-title">Adults Only (18+)</h2>
      <p class="age-gate-text">
        This website contains adult-oriented material intended for viewers who are at least 18 years old.
        By clicking <b>“I’m 18+ — Enter”</b>, you confirm you are 18 or older.
      </p>
      <div class="age-gate-actions">
        <button class="age-gate-btn age-gate-enter" type="button">I’m 18+ — Enter</button>
        <button class="age-gate-btn age-gate-exit" type="button">I’m under 18 — Leave</button>
      </div>
      <div class="age-gate-foot">
        Your choice is stored in your browser on this device. Clearing site data will reset it.
      </div>
    </div>
  `;

  // Lock scroll behind overlay
  const prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";

  overlay.querySelector(".age-gate-enter").addEventListener("click", () => {
    try { localStorage.setItem(KEY, "true"); } catch (e) {}
    document.documentElement.style.overflow = prevOverflow;
    overlay.remove();
  });

  overlay.querySelector(".age-gate-exit").addEventListener("click", () => {
    // Change this if you want a different exit destination
    window.location.href = "https://www.google.com";
  });

  document.body.appendChild(overlay);
})();
