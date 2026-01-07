// AndroGov Permissions Engine (RBAC + ABAC)
(function(){
  const DEFAULT_USER = {
    id: "U_ADMIN",
    name: "Admin",
    roles: ["ADMIN"],
    scopes: ["*"], // * = كل شيء
    attributes: {
      shareholderPercent: 0,
      committeeKey: null,
      departmentKey: null,
      conflicts: [] // agendaIds
    }
  };

  // Demo Users (تبدلهم لاحقًا من data/users.json)
  const DEMO_USERS = [
    DEFAULT_USER,
    { id:"U_SEC", name:"أمين سر المجلس", roles:["SECRETARY"], scopes:["GOV_GA","GOV_BOARD","GOV_COMMITTEES","ADMIN_AUDIT","BYLAWS_VIEW"], attributes:{} },
    { id:"U_BM", name:"عضو مجلس", roles:["BOARD"], scopes:["GOV_BOARD","GOV_GA","BYLAWS_VIEW"], attributes:{ conflicts:["AG_CONFLICT_1"] } },
    { id:"U_AC", name:"عضو لجنة المراجعة", roles:["COMMITTEE"], scopes:["GOV_COMMITTEES","OP_COMPLIANCE","BYLAWS_VIEW"], attributes:{ committeeKey:"audit" } },
    { id:"U_SH5", name:"مساهم 5%", roles:["SHAREHOLDER"], scopes:["GOV_GA"], attributes:{ shareholderPercent:5 } },
    { id:"U_SH10", name:"مساهم 10%", roles:["SHAREHOLDER"], scopes:["GOV_GA"], attributes:{ shareholderPercent:10 } },
    { id:"U_HR", name:"مدير الموارد البشرية", roles:["DEPT"], scopes:["DEP_HR","OP_POLICIES"], attributes:{ departmentKey:"hr" } },
    { id:"U_FIN", name:"مدير المالية", roles:["DEPT"], scopes:["DEP_FINANCE","OP_DOA"], attributes:{ departmentKey:"finance" } },
  ];

  function getCurrentUser(){
    const saved = localStorage.getItem("ANDRO_USER_ID");
    const u = DEMO_USERS.find(x => x.id === saved);
    return u || DEFAULT_USER;
  }

  function setCurrentUser(userId){
    localStorage.setItem("ANDRO_USER_ID", userId);
  }

  function hasRole(user, role){
    return (user.roles || []).includes(role);
  }

  function hasScope(user, scope){
    return (user.scopes || []).includes("*") || (user.scopes || []).includes(scope);
  }

  // ABAC helpers
  function shareholderPercent(user){
    return Number(user?.attributes?.shareholderPercent || 0);
  }

  function isConflicted(user, agendaId){
    return (user?.attributes?.conflicts || []).includes(agendaId);
  }

  // Core check
  function can(user, action, scope, ctx={}){
    // Admin bypass
    if(hasRole(user, "ADMIN")) return true;

    // Scope gate
    if(scope && !hasScope(user, scope)) return false;

    // Generic permissions by role
    if(hasRole(user,"SECRETARY")){
      // أمانة السر: تشغيل/إدارة في نطاق الحوكمة
      if(["CREATE","EDIT","SEND","LOCK","EXPORT","VIEW","FOLLOWUP","ASSIGN","REVIEW"].includes(action)) return true;
    }

    if(hasRole(user,"BOARD")){
      if(["VIEW","VOTE","SIGN"].includes(action)) return true;
      // منع التصويت إذا تعارض
      if(action === "VOTE" && ctx.agendaId && isConflicted(user, ctx.agendaId)) return false;
    }

    if(hasRole(user,"COMMITTEE")){
      if(["VIEW","REVIEW","EXPORT"].includes(action)) return true;
      // صلاحيات استثنائية: تصعيد (بناءً على قواعد النظام لاحقًا)
      if(action === "ESCALATE") return true;
    }

    if(hasRole(user,"SHAREHOLDER")){
      if(["VIEW","VOTE","PROXY"].includes(action)) return true;

      // طلب اجتماع / طلب إدراج بند
      if(action === "REQUEST_MEETING"){
        // 10% حسب النظام الأساس — و5% حسب السياسة الداخلية (Demo)
        return shareholderPercent(user) >= 5;
      }
      if(action === "REQUEST_CALL_GA"){
        return shareholderPercent(user) >= 10;
      }
      if(action === "PROPOSE_AGENDA"){
        return shareholderPercent(user) >= 5;
      }
    }

    if(hasRole(user,"DEPT")){
      // إدارات: تشغيل داخلي
      if(["VIEW","CREATE","EDIT","SUBMIT","FOLLOWUP"].includes(action)) return true;
      if(action === "APPROVE") return false; // approvals تربطها بالـ DOA لاحقًا
    }

    return false;
  }

  // Expose
  window.AndroAuth = {
    DEMO_USERS,
    getCurrentUser,
    setCurrentUser,
    hasRole,
    hasScope,
    shareholderPercent,
    isConflicted,
    can,
  };
})();
