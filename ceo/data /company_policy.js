/**
 * @file company_policy.js
 * @description Unified System Configuration & Database for Andromeda IT
 * @version 5.0.0 (Refactored)
 * @lastUpdated 2026-01-15
 */

const CompanyPolicy = {
  // ==========================================
  // 1. SYSTEM METADATA
  // ==========================================
  system: {
    appId: "ANDROMEDA_CORE_V5",
    version: "5.0.0",
    lastUpdated: "2026-01-15",
    environment: "production",
    complianceStandards: ["SA_CL_2024", "ISO_27001"],
    status: "Active"
  },

  // ==========================================
  // 2. COMPANY IDENTITY
  // ==========================================
  identity: {
    name: { en: "Andromeda IT", ar: "اندروميدا لتقنية المعلومات" },
    legalName: {
      en: "Andromeda Information Technology Company (CJSC)",
      ar: "شركة اندروميدا لتقنية المعلومات (مساهمة مقفلة)"
    },
    website: "www.ait.sa",
    crNumber: "1010356267",
    unifiedNumber: "7003339343",
    establishmentDate: "2012-11-28"
  },

  // ==========================================
  // 3. DESIGN TOKENS (Branding)
  // ==========================================
  tokens: {
    colors: {
      primary: { light: "#FB4747", dark: "#FF6B6B" },
      secondary: { light: "#4267B2", dark: "#5A7FC4" },
      background: { light: "#F4F6F8", dark: "#121212" },
      surface: { light: "#FFFFFF", dark: "#1E1E1E" },
      text: { light: "#1A1A1A", dark: "#E0E0E0" },
      status: {
        success: "#22C55E",
        warning: "#FFAB00",
        error: "#FF5630",
        info: "#00B8D9"
      }
    },
    typography: {
      fontFamily: {
        ar: "'Tajawal', 'Almarai', sans-serif",
        en: "'Inter', -apple-system, sans-serif"
      }
    },
    settings: {
      defaultTheme: "light",
      defaultLang: "ar",
      supportedThemes: ["light", "dark"],
      supportedLangs: ["ar", "en"]
    }
  },

  // ==========================================
  // 4. CAPITAL & SHARES
  // ==========================================
  capital: {
    amount: 6000000,
    currency: "SAR",
    sharesCount: 600000,
    shareValue: 10,
    status: "fully_paid"
  },

  // ==========================================
  // 5. SHAREHOLDERS
  // ==========================================
  shareholders: [
    { id: "SH_001", name: { ar: "ورثة محمد بن صالح السحيباني", en: "Heirs of Mohammed Al-Suhaibani" }, percent: 35, shares: 210000, type: "Individual", voting: true, email: "alcaseer@gmail.com", proxy: { ar: "وائل السحيباني", en: "Wael Al-Suhaibani" } },
    { id: "SH_002", name: { ar: "هشام بن محمد السحيباني", en: "Hesham Al-Sohaibani" }, percent: 10, shares: 60000, type: "Individual", voting: true, email: "hesham@androomeda.com", proxy: null },
    { id: "SH_003", name: { ar: "وائل بن محمد السحيباني", en: "Wael Al-Suhaibani" }, percent: 5, shares: 30000, type: "Individual", voting: true, email: "w961@live.com", proxy: null },
    { id: "SH_004", name: { ar: "هيثم بن محمد السحيباني", en: "Haitham Al-Suhaibani" }, percent: 5, shares: 30000, type: "Individual", voting: true, email: "hmsasis@gmail.com", proxy: null },
    { id: "SH_005", name: { ar: "منصور بن حسن اليامي", en: "Mansour Al-Yami" }, percent: 5, shares: 30000, type: "Individual", voting: true, email: "myami@androomeda.com", proxy: null },
    { id: "SH_006", name: { ar: "إبراهيم بن حمد السكيتي", en: "Ibrahim Al-Skeiti" }, percent: 5, shares: 30000, type: "Individual", voting: true, email: "ihskaity@gmail.com", proxy: null },
    { id: "SH_007", name: { ar: "صالح بن عبدالله الوهيبي", en: "Saleh Al-Wahibi" }, percent: 5, shares: 30000, type: "Individual", voting: true, email: "saaw4466@yahoo.com", proxy: null },
    { id: "SH_008", name: { ar: "عبدالله بن علي الفريجي", en: "Abdullah Al-Fariji" }, percent: 5, shares: 30000, type: "Individual", voting: true, email: "a_furaiji@hotmail.com", proxy: null },
    { id: "SH_009", name: { ar: "عبدالله بن محمد الحواس", en: "Abdullah Al-Hawas" }, percent: 5, shares: 30000, type: "Individual", voting: true, email: "amh400@gmail.com", proxy: null },
    { id: "SH_010", name: { ar: "شركة بيجي المحدودة", en: "BG LTD Company" }, percent: 15, shares: 90000, type: "Entity", voting: true, email: "saleh@bgtech.com", proxy: { ar: "صالح السحيباني", en: "Saleh Al-Suhaibani" } },
    { id: "SH_011", name: { ar: "أحمد بن سليمان الجاسر", en: "Ahmed Al-Jasser" }, percent: 5, shares: 30000, type: "Individual", voting: true, email: "ahmed.jasser@gmail.com", proxy: null }
  ],

  // ==========================================
  // 6. DEPARTMENTS
  // ==========================================
  departments: [
    { id: "DEP_EXEC", name: { en: "Executive Management", ar: "الإدارة التنفيذية" }, icon: "fa-building" },
    { id: "DEP_FIN", name: { en: "Finance", ar: "الإدارة المالية" }, icon: "fa-coins" },
    { id: "DEP_HR", name: { en: "HR & Admin", ar: "الموارد البشرية والشؤون الإدارية" }, icon: "fa-users" },
    { id: "DEP_TECH", name: { en: "Technology & Development", ar: "التقنية والتطوير" }, icon: "fa-code" },
    { id: "DEP_SALES", name: { en: "Sales & Business Dev", ar: "المبيعات وتطوير الأعمال" }, icon: "fa-chart-line" },
    { id: "DEP_MKT", name: { en: "Marketing & Comms", ar: "التسويق والاتصال المؤسسي" }, icon: "fa-bullhorn" },
    { id: "DEP_CS", name: { en: "Customer Success", ar: "خدمة ونجاح العملاء" }, icon: "fa-headset" },
    { id: "DEP_COMP", name: { en: "Governance & Compliance", ar: "الحوكمة والالتزام" }, icon: "fa-shield-halved" },
    { id: "DEP_SEC", name: { en: "Cybersecurity", ar: "الأمن السيبراني" }, icon: "fa-lock" },
    { id: "DEP_AUDIT", name: { en: "Internal Audit", ar: "التدقيق الداخلي" }, icon: "fa-clipboard-check" },
    { id: "DEP_LEGAL", name: { en: "Legal Affairs", ar: "الشؤون القانونية" }, icon: "fa-gavel" },
    { id: "DEP_PROC", name: { en: "Procurement", ar: "المشتريات وسلاسل الإمداد" }, icon: "fa-boxes-stacked" },
    { id: "DEP_MED", name: { en: "Medical Services", ar: "الخدمات الطبية" }, icon: "fa-stethoscope" },
    { id: "DEP_SUPPORT", name: { en: "Technical Support", ar: "الدعم الفني" }, icon: "fa-headset" },
    { id: "DEP_GRC", name: { en: "GRC", ar: "الحوكمة والمخاطر والالتزام" }, icon: "fa-shield-check" }
  ],

  // ==========================================
  // 7. ROLES (RBAC)
  // ==========================================
  roles: {
    sys_admin: {
      label: { en: "System Admin", ar: "مدير النظام" },
      desc: { en: "Full technical privileges", ar: "صلاحيات تقنية كاملة" },
      inherits: "chairman",
      level: 100
    },
    chairman: {
      label: { en: "Chairman", ar: "رئيس مجلس الإدارة" },
      desc: { en: "Sole signatory authority", ar: "صلاحيات التوقيع المنفرد" },
      inherits: "board_member",
      level: 90,
      authorityType: "sole_signatory"
    },
    vice_chairman: {
      label: { en: "Vice Chairman", ar: "نائب رئيس مجلس الإدارة" },
      desc: { en: "Sole signatory authority", ar: "صلاحيات التوقيع المنفرد" },
      inherits: "board_member",
      level: 85,
      authorityType: "sole_signatory"
    },
    board_member: {
      label: { en: "Board Member", ar: "عضو مجلس إدارة" },
      desc: { en: "Board room access", ar: "صلاحيات غرفة المجلس" },
      inherits: "viewer",
      level: 80
    },
    ceo: {
      label: { en: "CEO", ar: "الرئيس التنفيذي" },
      desc: { en: "Executive management", ar: "إدارة تنفيذية كاملة" },
      inherits: "cfo",
      level: 75,
      authorityType: "sole_signatory"
    },
    cfo: {
      label: { en: "CFO", ar: "المدير المالي" },
      desc: { en: "Financial authority", ar: "صلاحيات مالية" },
      inherits: "manager",
      level: 70
    },
    cao: {
      label: { en: "CAO", ar: "المدير الإداري" },
      desc: { en: "Chief Administrative Officer", ar: "مسؤول الشؤون الإدارية" },
      inherits: "manager",
      level: 70
    },
    manager: {
      label: { en: "Department Manager", ar: "مدير إدارة" },
      desc: { en: "Team management", ar: "إدارة الفريق والقسم" },
      inherits: "employee",
      level: 50
    },
    director: {
      label: { en: "Director", ar: "مدير" },
      desc: { en: "Senior management", ar: "إدارة عليا" },
      inherits: "manager",
      level: 55
    },
    coordinator: {
      label: { en: "Coordinator", ar: "منسق" },
      desc: { en: "Operations coordination", ar: "تنسيق العمليات" },
      inherits: "employee",
      level: 25
    },
    specialist: {
      label: { en: "Specialist", ar: "أخصائي" },
      desc: { en: "Technical specialist", ar: "متخصص تقني" },
      inherits: "employee",
      level: 25
    },
    team_lead: {
      label: { en: "Team Lead", ar: "قائد فريق" },
      desc: { en: "Team leadership", ar: "قيادة الفريق" },
      inherits: "employee",
      level: 30
    },
    support: {
      label: { en: "Support Staff", ar: "دعم إداري" },
      desc: { en: "Administrative support", ar: "دعم إداري" },
      inherits: "employee",
      level: 15
    },
    employee: {
      label: { en: "Employee", ar: "موظف" },
      desc: { en: "Self-service access", ar: "خدمة ذاتية" },
      inherits: "viewer",
      level: 20
    },
    shareholder: {
      label: { en: "Shareholder", ar: "مساهم" },
      desc: { en: "View & vote rights", ar: "حق الاطلاع والتصويت" },
      inherits: "viewer",
      level: 30,
      capabilities: ["voting", "profile_update", "investor_relations"]
    },
    viewer: {
      label: { en: "Guest/Viewer", ar: "زائر" },
      desc: { en: "Read-only access", ar: "قراءة فقط" },
      inherits: null,
      level: 10
    },
    // Committee Roles
    audit_committee_chair: {
      label: { en: "Audit Committee Chairman", ar: "رئيس لجنة المراجعة" },
      desc: { en: "Leads audit committee", ar: "يرأس لجنة المراجعة" },
      inherits: "audit_committee_member",
      level: 65,
      context: "audit_committee"
    },
    audit_committee_member: {
      label: { en: "Audit Committee Member", ar: "عضو لجنة المراجعة" },
      desc: { en: "Audit oversight", ar: "الرقابة والتدقيق" },
      inherits: "viewer",
      level: 60,
      context: "audit_committee"
    },
    // Secretary Roles
    board_secretary: {
      label: { en: "Board Secretary", ar: "أمين سر مجلس الإدارة" },
      desc: { en: "Board meeting coordination & minutes", ar: "تنسيق اجتماعات المجلس والمحاضر" },
      inherits: "manager",
      level: 55,
      context: "board"
    },
    audit_committee_secretary: {
      label: { en: "Audit Committee Secretary", ar: "أمين سر لجنة المراجعة" },
      desc: { en: "Committee meeting coordination", ar: "تنسيق اجتماعات اللجنة" },
      inherits: "viewer",
      level: 50,
      context: "audit_committee"
    },
    // GRC & IR Roles
    grc_officer: {
      label: { en: "GRC Officer", ar: "مسؤول الحوكمة والمخاطر والالتزام" },
      desc: { en: "Governance, Risk & Compliance", ar: "الحوكمة والمخاطر والالتزام" },
      inherits: "manager",
      level: 55,
      context: "governance"
    },
    investor_relations: {
      label: { en: "Investor Relations Officer", ar: "مسؤول علاقات المساهمين" },
      desc: { en: "Shareholder communications", ar: "التواصل مع المساهمين" },
      inherits: "viewer",
      level: 45,
      context: "shareholders"
    },
    ncso: {
      label: { en: "NCSO", ar: "مسؤول الأمن السيبراني الوطني" },
      desc: { en: "National Cybersecurity Officer", ar: "مسؤول الأمن السيبراني الوطني" },
      inherits: "manager",
      level: 60,
      context: "security"
    },
    auditor: {
      label: { en: "Auditor", ar: "مدقق" },
      desc: { en: "Internal/External Auditor", ar: "مدقق داخلي/خارجي" },
      inherits: "viewer",
      level: 55,
      context: "audit"
    }
  },

  // ==========================================
  // 8. PERMISSIONS MATRIX
  // ==========================================
  permissions: {
    financial: {
      title: { ar: "الصلاحيات المالية", en: "Financial Permissions" },
      items: [
        { key: "approve_po", label: { ar: "اعتماد أوامر الشراء", en: "Approve Purchase Orders" }, roles: ["ceo", "cfo", "manager"] },
        { key: "approve_payroll", label: { ar: "اعتماد الرواتب", en: "Approve Payroll" }, roles: ["ceo", "cfo"] },
        { key: "view_financials", label: { ar: "الاطلاع على القوائم المالية", en: "View Financial Statements" }, roles: ["chairman", "board_member", "shareholder", "ceo", "cfo"] },
        { key: "petty_cash", label: { ar: "السلفة النثرية", en: "Petty Cash" }, roles: ["cfo", "manager"] }
      ]
    },
    legal: {
      title: { ar: "الشؤون القانونية", en: "Legal Affairs" },
      items: [
        { key: "sign_contracts", label: { ar: "توقيع العقود", en: "Sign Contracts" }, roles: ["chairman", "ceo"] },
        { key: "govt_rep", label: { ar: "التمثيل الحكومي", en: "Government Representation" }, roles: ["ceo", "chairman", "cao"] },
        { key: "banking", label: { ar: "العمليات البنكية", en: "Banking Operations" }, roles: ["ceo", "chairman"] }
      ]
    },
    hr: {
      title: { ar: "الموارد البشرية", en: "Human Resources" },
      items: [
        { key: "hire_employee", label: { ar: "توظيف موظف", en: "Hire Employee" }, roles: ["ceo", "cao", "manager"] },
        { key: "terminate_employee", label: { ar: "إنهاء خدمات", en: "Terminate Employee" }, roles: ["ceo", "cao"] },
        { key: "approve_leave", label: { ar: "اعتماد الإجازات", en: "Approve Leave" }, roles: ["manager", "ceo", "cao"] }
      ]
    },
    system: {
      title: { ar: "إدارة النظام", en: "System Administration" },
      items: [
        { key: "manage_users", label: { ar: "إدارة المستخدمين", en: "Manage Users" }, roles: ["sys_admin"] },
        { key: "edit_policies", label: { ar: "تعديل السياسات", en: "Edit Policies" }, roles: ["sys_admin", "ceo"] },
        { key: "view_audit_log", label: { ar: "عرض سجل التدقيق", en: "View Audit Log" }, roles: ["sys_admin", "chairman", "ceo", "auditor"] }
      ]
    }
  },

  // ==========================================
  // 9. USERS DIRECTORY
  // ==========================================
  users: [
    // Board & Executives
    { id: "USR_000", name: { ar: "عبدالله الحواس", en: "Abdullah Al-Hawas" }, title: { ar: "رئيس مجلس الإدارة", en: "Chairman of the Board" }, dept: "DEP_EXEC", role: "chairman", email: "amh400@gmail.com", isExecutive: false, isShareholder: true },
    { id: "USR_001", name: { ar: "هشام السحيباني", en: "Hesham Al-Sohaibani" }, title: { ar: "الرئيس التنفيذي ونائب رئيس المجلس", en: "CEO & Board Vice Chairman" }, dept: "DEP_EXEC", role: "ceo", additionalRoles: ["vice_chairman"], email: "hesham@androomeda.com", isExecutive: true, isShareholder: true },
    { id: "USR_002", name: { ar: "محمد البخيتي", en: "Mohammed Al-Bukheiti" }, title: { ar: "المدير المالي", en: "Chief Financial Officer (CFO)" }, dept: "DEP_FIN", role: "cfo", email: "mtahir@androomeda.com", isExecutive: true },
    { id: "BRD_003", name: { ar: "أحمد السحيباني", en: "Ahmed Al-Suhaibani" }, title: { ar: "عضو مجلس الإدارة وعضو لجنة المراجعة", en: "Board & Audit Member" }, dept: "DEP_EXEC", role: "board_member", additionalRoles: ["audit_committee_member"], email: "a.s.alsuhaibani@microtec.com.sa", isExecutive: false, isShareholder: true },
    { id: "USR_005", name: { ar: "منصور اليامي", en: "Mansour Al-Yami" }, title: { ar: "المدير الإداري وعضو المجلس", en: "CAO / Board Member" }, dept: "DEP_HR", role: "cao", additionalRoles: ["board_member"], email: "myami@androomeda.com", isExecutive: true, isShareholder: true },
    
    // Managers & Directors
    { id: "USR_004", name: { ar: "أيمن المغربي", en: "Ayman Al-Maghrabi" }, title: { ar: "مسؤول الحوكمة والمخاطر والالتزام / أمين سر المجلس", en: "GRCO / Board Secretary" }, dept: "DEP_GRC", role: "grc_officer", email: "amaghrabi@androomeda.com", isExecutive: false, avatar: "../photo/grc.png" },
    { id: "USR_020", name: { ar: "محمد أختر", en: "Muhammad Akhtar" }, title: { ar: "مدير التطوير", en: "Director of Development" }, dept: "DEP_TECH", role: "director", email: "makhtar@androomeda.com" },
    { id: "USR_009", name: { ar: "مشاعل الهديان", en: "Meshail Al-Hadyan" }, title: { ar: "مسؤول الأمن السيبراني الوطني", en: "NCSO" }, dept: "DEP_TECH", role: "ncso", email: "malhadyan@androomeda.com" },
    { id: "USR_007", name: { ar: "نواف الصحابي", en: "Nawaf Al-Sahabi" }, title: { ar: "مدير حسابات العملاء", en: "Customer Accounts Manager" }, dept: "DEP_SUPPORT", role: "manager", email: "nalsahabi@androomeda.com" },
    { id: "USR_006", name: { ar: "د. وعد حسين", en: "Dr. Waad Hussein" }, title: { ar: "المشرف الطبي", en: "Medical Supervisor" }, dept: "DEP_MED", role: "manager", email: "whussain@androomeda.com" },
    
    // Team Leads & Coordinators
    { id: "USR_015", name: { ar: "رند الحوراني", en: "Rand Al-Hourani" }, title: { ar: "قائد الفريق التقني", en: "Technical Team Lead" }, dept: "DEP_TECH", role: "team_lead", email: "rhourani@androomeda.com", isTeamLead: true },
    { id: "USR_003", name: { ar: "هادي أحمد", en: "Hadi Ahmed" }, title: { ar: "منسق المشتريات والدعم الإداري", en: "Purchasing & Admin Support Coordinator" }, dept: "DEP_HR", role: "coordinator", email: "hadi@androomeda.com" },
    
    // Specialists & Support
    { id: "USR_008", name: { ar: "الحسين الحميدي", en: "Al-Hussain Al-Humaidi" }, title: { ar: "أخصائي دعم تقني", en: "Technical Support Specialist" }, dept: "DEP_SUPPORT", role: "specialist", email: "alhussien@androomeda.com" },
    { id: "USR_010", name: { ar: "مها الحزان", en: "Maha Al-Hazzan" }, title: { ar: "أخصائية تسويق رقمي", en: "Digital Marketing Specialist" }, dept: "DEP_SALES", role: "specialist", email: "mhizan@androomeda.com" },
    { id: "USR_014", name: { ar: "عبدالله الجبير", en: "Abdullah Al-Jubeir" }, title: { ar: "دعم مكتبي", en: "Office Support" }, dept: "DEP_HR", role: "support", email: "ajubeir@androomeda.com" },
    
    // Teams & Vacant Positions
    { id: "USR_023", name: { ar: "فريق المطورين", en: "Software Developers Team" }, title: { ar: "فريق المطورين", en: "Software Developers Team" }, dept: "DEP_TECH", role: "employee", email: "SDT@androomeda.com", isGroup: true },
    { id: "USR_011", name: { ar: "شاغر", en: "Vacant" }, title: { ar: "مدير المبيعات", en: "Sales Manager" }, dept: "DEP_SALES", role: "manager", email: "SalesManager@androomeda.com", status: "inactive" },
    
    // Committee Members (External)
    { id: "COMM_01", name: { ar: "محمد العنزي", en: "Mohammed Al-Enezi" }, title: { ar: "رئيس لجنة المراجعة", en: "Audit Committee Chairman" }, dept: "DEP_AUDIT", role: "audit_committee_chair", email: "mohammedmansour.socpa@gmail.com", isExternal: true },
    { id: "COMM_02", name: { ar: "عادل سعسع", en: "Adel Sasa" }, title: { ar: "عضو لجنة المراجعة", en: "Audit Committee Member" }, dept: "DEP_AUDIT", role: "audit_committee_member", email: "adel.sasa1@gmail.com", isExternal: true },
    
    // Auditors
    { id: "AUD_INT", name: { ar: "المدقق الداخلي", en: "Internal Auditor" }, title: { ar: "المدقق الداخلي", en: "Internal Auditor" }, dept: "DEP_AUDIT", role: "auditor", email: "InternalAudit@androomeda.com", isExternal: false },
    { id: "AUD_EXT", name: { ar: "المدقق الخارجي", en: "External Auditor" }, title: { ar: "المدقق الخارجي (KPMG/EY)", en: "External Auditor (KPMG/EY)" }, dept: "DEP_AUDIT", role: "auditor", email: "ExternalAudit@androomeda.com", isExternal: true },

    // Shareholders
    { id: "SH_USER_001", name: { ar: "ورثة محمد بن صالح السحيباني", en: "Heirs of Mohammed Al-Suhaibani" }, title: { ar: "مساهم رئيسي", en: "Major Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "alcaseer@gmail.com", isShareholder: true },
    { id: "SH_USER_003", name: { ar: "وائل بن محمد السحيباني", en: "Wael Al-Suhaibani" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "w961@live.com", isShareholder: true },
    { id: "SH_USER_004", name: { ar: "هيثم بن محمد السحيباني", en: "Haitham Al-Suhaibani" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "hmsasis@gmail.com", isShareholder: true },
    { id: "SH_USER_006", name: { ar: "إبراهيم بن حمد السكيتي", en: "Ibrahim Al-Skeiti" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "ihskaity@gmail.com", isShareholder: true },
    { id: "SH_USER_007", name: { ar: "صالح بن عبدالله الوهيبي", en: "Saleh Al-Wahibi" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "saaw4466@yahoo.com", isShareholder: true },
    { id: "SH_USER_008", name: { ar: "عبدالله بن علي الفريجي", en: "Abdullah Al-Fariji" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "a_furaiji@hotmail.com", isShareholder: true },
    { id: "SH_USER_010", name: { ar: "شركة بيجي المحدودة", en: "BG LTD Company" }, title: { ar: "مساهم (شركة)", en: "Shareholder (Entity)" }, dept: "DEP_EXEC", role: "shareholder", email: "saleh@bgtech.com", isShareholder: true },
    { id: "SH_USER_011", name: { ar: "أحمد بن سليمان الجاسر", en: "Ahmed Al-Jasser" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "ahmed.jasser@gmail.com", isShareholder: true }
  ],

  // ==========================================
  // 9.1 USER ROLES MAPPING (Multi-Role Support)
  // ==========================================
  userRolesMap: [
    // أيمن المغربي - 5 أدوار
    { userId: "USR_004", contexts: [
      { context: "system", role: "sys_admin", label: { ar: "إدارة النظام", en: "System Administration" }, isPrimary: true },
      { context: "board", role: "board_secretary", label: { ar: "مجلس الإدارة", en: "Board of Directors" } },
      { context: "audit_committee", role: "audit_committee_secretary", label: { ar: "لجنة المراجعة", en: "Audit Committee" } },
      { context: "shareholders", role: "investor_relations", label: { ar: "علاقات المساهمين", en: "Investor Relations" } },
      { context: "governance", role: "grc_officer", label: { ar: "الحوكمة والالتزام", en: "GRC" } }
    ]},
    // هشام السحيباني
    { userId: "USR_001", contexts: [
      { context: "executive", role: "ceo", label: { ar: "الإدارة التنفيذية", en: "Executive Management" }, isPrimary: true },
      { context: "board", role: "vice_chairman", label: { ar: "مجلس الإدارة", en: "Board of Directors" } },
      { context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_002" }
    ]},
    // عبدالله الحواس
    { userId: "USR_000", contexts: [
      { context: "board", role: "chairman", label: { ar: "مجلس الإدارة", en: "Board of Directors" }, isPrimary: true },
      { context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_009" }
    ]},
    // منصور اليامي
    { userId: "USR_005", contexts: [
      { context: "executive", role: "cao", label: { ar: "الإدارة التنفيذية", en: "Executive Management" }, isPrimary: true },
      { context: "board", role: "board_member", label: { ar: "مجلس الإدارة", en: "Board of Directors" } },
      { context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_005" }
    ]},
    // أحمد السحيباني
    { userId: "BRD_003", contexts: [
      { context: "board", role: "board_member", label: { ar: "مجلس الإدارة", en: "Board of Directors" }, isPrimary: true },
      { context: "audit_committee", role: "audit_committee_member", label: { ar: "لجنة المراجعة", en: "Audit Committee" } },
      { context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_011" }
    ]},
    // محمد العنزي
    { userId: "COMM_01", contexts: [
      { context: "audit_committee", role: "audit_committee_chair", label: { ar: "لجنة المراجعة", en: "Audit Committee" }, isPrimary: true }
    ]},
    // عادل سعسع
    { userId: "COMM_02", contexts: [
      { context: "audit_committee", role: "audit_committee_member", label: { ar: "لجنة المراجعة", en: "Audit Committee" }, isPrimary: true }
    ]},
    // New Shareholders Mapping
    { userId: "SH_USER_001", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_001", isPrimary: true }] },
    { userId: "SH_USER_003", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_003", isPrimary: true }] },
    { userId: "SH_USER_004", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_004", isPrimary: true }] },
    { userId: "SH_USER_006", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_006", isPrimary: true }] },
    { userId: "SH_USER_007", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_007", isPrimary: true }] },
    { userId: "SH_USER_008", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_008", isPrimary: true }] },
    { userId: "SH_USER_010", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_010", isPrimary: true }] },
    { userId: "SH_USER_011", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_011", isPrimary: true }] }
  ],

  // ==========================================
  // 10. GOVERNANCE CONFIG
  // ==========================================
  governance: {
    board: {
      totalSeats: 4,
      termYears: 4,
      currentTermStart: "2025-01-01",
      currentTermEnd: "2029-01-01",
      minMeetingsPerYear: 4
    },
    quorum: {
      OGA: { firstMeeting: 25, secondMeeting: 0, decisionThreshold: 50 },
      EGA: { firstMeeting: 50, secondMeeting: 25, thirdMeeting: 0, decisionThreshold: 66.6 },
      Board: { minMembers: 3, decisionThreshold: 51 }
    },
    remuneration: {
      currency: "SAR",
      boardMeetingFee: 2000,
      auditCommitteeFee: 1500,
      secretaryFee: 1000,
      annualCapPerMember: 500000,
      travelPolicy: "Business Class for non-residents"
    },
    committees: [
      { id: "COMM_AUDIT", name: { ar: "لجنة المراجعة", en: "Audit Committee" }, required: true, minMembers: 3 }
    ]
  },

  // ==========================================
  // 11. HR POLICIES
  // ==========================================
  hrPolicies: {
    probation: { minDays: 90, maxDays: 180 },
    leaves: {
      annual: { junior: 21, senior: 30 },
      maternity: { weeks: 12 },
      paternity: { days: 3 },
      bereavement: { days: 3 }
    },
    workingHours: {
      start: "08:00",
      end: "16:00",
      weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    }
  },

  // ==========================================
  // 12. FINANCIAL AUTHORITY LIMITS
  // ==========================================
  financialAuthority: {
    poApproval: [
      { role: "manager", limit: 5000, condition: "budgeted" },
      { role: "cfo", limit: 50000, condition: "budgeted" },
      { role: "ceo", limit: 1000000, condition: "budgeted" },
      { role: "board", limit: -1, condition: "unbudgeted_or_above_1m" }
    ],
    pettyCash: { managerLimit: 1000, cfoLimit: 5000 },
    contractSigning: [
      { role: "ceo", limit: 1000000, type: "operational" },
      { role: "chairman", limit: -1, type: "strategic" }
    ]
  },

  // ==========================================
  // 13. BUSINESS ACTIVITIES (ISIC) - COMPLETE LIST
  // ==========================================
  activities: [
    { code: "432134", name: { ar: "تركيب وصيانة الأجهزة الأمنية", en: "Security Systems Installation & Maintenance" }, category: "Security" },
    { code: "451030", name: { ar: "مزادات السيارات والمعدات", en: "Vehicle & Equipment Auctions" }, category: "Auctions" },
    { code: "464956", name: { ar: "البيع بالجملة للأجهزة والمعدات والمستلزمات الطبية", en: "Wholesale of Medical Equipment & Supplies" }, category: "Medical" },
    { code: "465101", name: { ar: "البيع بالجملة للحواسيب ومستلزماتها يشمل بيع الطابعات وأحبارها", en: "Wholesale of Computers & Accessories" }, category: "Sales" },
    { code: "465102", name: { ar: "البيع بالجملة للبرمجيات ويشمل الاستيراد", en: "Wholesale of Software (Including Import)" }, category: "Sales" },
    { code: "465933", name: { ar: "البيع بالجملة للأجهزة الأمنية", en: "Wholesale of Security Devices" }, category: "Security" },
    { code: "465934", name: { ar: "البيع بالجملة للمعدات والتجهيزات الأمنية (للمنافسات الحكومية فقط)", en: "Wholesale of Security Equipment (Government Tenders Only)" }, category: "Security" },
    { code: "469061", name: { ar: "البيع بالجملة لأجهزة ولوازم الكيماويات والمختبرات", en: "Wholesale of Lab Chemicals & Equipment" }, category: "Medical" },
    { code: "474110", name: { ar: "البيع بالتجزئة للحواسيب وملحقاتها يشمل الطابعات وأحبارها", en: "Retail of Computers & Accessories" }, category: "Retail" },
    { code: "474152", name: { ar: "بيع البرمجيات غير المعدة بناء على الطلب", en: "Retail of Off-the-Shelf Software" }, category: "IT" },
    { code: "477336", name: { ar: "البيع بالتجزئة للأجهزة الأمنية", en: "Retail of Security Devices" }, category: "Security" },
    { code: "479940", name: { ar: "المزادات في غير المحلات", en: "Non-Store Auctions" }, category: "Auctions" },
    { code: "620102", name: { ar: "تصميم وبرمجة البرمجيات الخاصة", en: "Custom Software Development" }, category: "IT" },
    { code: "682010", name: { ar: "الوساطة العقارية", en: "Real Estate Brokerage" }, category: "RealEstate" },
    { code: "682044", name: { ar: "المزادات العقارية", en: "Real Estate Auctions" }, category: "RealEstate" },
    { code: "731013", name: { ar: "تقديم خدمات تسويقية نيابةً عن الغير", en: "Marketing Services on Behalf of Others" }, category: "Marketing" },
    { code: "749036", name: { ar: "أنشطة خدمات استشارات في مجال تنظيم الأجهزة الطبية", en: "Consulting for Medical Device Regulation" }, category: "Medical" },
    { code: "869027", name: { ar: "مراكز الخدمات الطبية المنزلية", en: "Home Healthcare Centers" }, category: "Medical" },
    { code: "869037", name: { ar: "مراكز الرعاية عن بعد والطب الإتصالي", en: "Telehealth Centers" }, category: "Medical" }
  ]
};

// ==========================================
// EXPORTS (Browser + Node.js)
// ==========================================
if (typeof window !== 'undefined') {
  window.CompanyPolicy = CompanyPolicy;
  console.log('✅ CompanyPolicy loaded in browser');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CompanyPolicy;
}
