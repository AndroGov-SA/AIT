(function(){
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }

  function isActive(href){
    const p = location.pathname;
    return p === href || p.endsWith(href);
  }

  function renderUserSwitcher(user){
    const options = window.AndroAuth.DEMO_USERS.map(u => {
      const sel = (u.id === user.id) ? "selected" : "";
      return `<option value="${escapeHtml(u.id)}" ${sel}>${escapeHtml(u.name)} (${escapeHtml(u.roles.join(","))})</option>`;
    }).join("");

    return `
      <div class="card" style="margin-top:14px;">
        <div class="small">المستخدم الحالي (Demo)</div>
        <div style="margin-top:10px;">
          <select id="androUserSwitch" class="btn" style="width:100%; justify-content:space-between;">
            ${options}
          </select>
        </div>
        <div class="small" style="margin-top:10px;">
          الأدوار: <b>${escapeHtml(user.roles.join(", "))}</b><br/>
          ${user.roles.includes("SHAREHOLDER") ? `نسبة المساهم: <b>${window.AndroAuth.shareholderPercent(user)}%</b>` : ""}
        </div>
      </div>
    `;
  }

  function renderNav(user){
    const groups = (window.ANDRO_NAV || []).map(g => {
      const items = (g.items || [])
        .filter(it => window.AndroAuth.can(user, "VIEW", it.scope))
        .map(it => {
          const active = isActive(it.href) ? "active" : "";
          return `<a class="nav-link ${active}" href="${it.href}">${escapeHtml(it.label)}</a>`;
        })
        .join("");

      if(!items) return "";
      return `
        <div class="nav-group">
          <h4>${escapeHtml(g.group)}</h4>
          ${items}
        </div>
      `;
    }).join("");

    return groups;
  }

  function mountSidebar(){
    const user = window.AndroAuth.getCurrentUser();
    const el = document.getElementById("sidebar");
    if(!el) return;

    el.innerHTML = `
      <div>
        <div class="nav-title">AndroGov</div>
        <div class="nav-sub">اندروميدا | الحوكمة والتشغيل</div>
      </div>

      <div class="hr"></div>

      ${renderNav(user)}
      ${renderUserSwitcher(user)}
    `;

    const sw = document.getElementById("androUserSwitch");
    if(sw){
      sw.addEventListener("change", () => {
        window.AndroAuth.setCurrentUser(sw.value);
        location.reload();
      });
    }
  }

  window.AndroUI = { mountSidebar };
})();
