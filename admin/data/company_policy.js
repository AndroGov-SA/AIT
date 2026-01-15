/**
 * @file company_policy.js
 * @description Unified System Configuration & Database for Andromeda IT
 * @version 5.0.0
 * @lastUpdated 2026-01-15
 */

const CompanyPolicy = {
  system: {
    appId: "ANDROMEDA_CORE_V5",
    version: "5.0.0",
    lastUpdated: "2026-01-15",
    environment: "production",
    status: "Active"
  },

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

  capital: {
    amount: 6000000,
    currency: "SAR",
    sharesCount: 600000,
    shareValue: 10,
    status: "fully_paid"
  },

  shareholders: [
    { id: "SH_001", name: { ar: "ورثة محمد السحيباني", en: "Heirs of Mohammed Al-Suhaibani" }, percent: 35, shares: 210000, email: "alcaseer@gmail.com" },
    { id: "SH_002", name: { ar: "هشام السحيباني", en: "Hesham Al-Sohaibani" }, percent: 10, shares: 60000, email: "hesham@androomeda.com" },
    { id: "SH_009", name: { ar: "عبدالله الحواس", en: "Abdullah Al-Hawas" }, percent: 5, shares: 30000, email: "amh400@gmail.com" }
  ],

  departments: [
    { id: "DEP_EXEC", name: { en: "Executive", ar: "التنفيذية" } },
    { id: "DEP_FIN", name: { en: "Finance", ar: "المالية" } },
    { id: "DEP_HR", name: { en: "HR", ar: "الموارد البشرية" } },
    { id: "DEP_TECH", name: { en: "Technology", ar: "التقنية" } },
    { id: "DEP_COMP", name: { en: "Compliance", ar: "الحوكمة" } },
    { id: "DEP_AUDIT", name: { en: "Audit", ar: "التدقيق" } }
  ],

  roles: {
    sys_admin: { label: { en: "System Admin", ar: "مدير النظام" }, desc: { en: "Full access", ar: "صلاحيات كاملة" }, inherits: "chairman", level: 100 },
    chairman: { label: { en: "Chairman", ar: "رئيس المجلس" }, desc: { en: "Board chair", ar: "رئيس مجلس الإدارة" }, inherits: "board_member", level: 90 },
    vice_chairman: { label: { en: "Vice Chairman", ar: "نائب الرئيس" }, desc: { en: "Vice chair", ar: "نائب رئيس المجلس" }, inherits: "board_member", level: 85 },
    board_member: { label: { en: "Board Member", ar: "عضو مجلس" }, desc: { en: "Board access", ar: "عضو مجلس الإدارة" }, inherits: "viewer", level: 80 },
    ceo: { label: { en: "CEO", ar: "الرئيس التنفيذي" }, desc: { en: "Chief Executive", ar: "الرئيس التنفيذي" }, inherits: "cfo", level: 75 },
    cfo: { label: { en: "CFO", ar: "المدير المالي" }, desc: { en: "Finance head", ar: "المدير المالي" }, inherits: "manager", level: 70 },
    manager: { label: { en: "Manager", ar: "مدير" }, desc: { en: "Department head", ar: "مدير قسم" }, inherits: "employee", level: 50 },
    employee: { label: { en: "Employee", ar: "موظف" }, desc: { en: "Staff member", ar: "موظف" }, inherits: "viewer", level: 20 },
    shareholder: { label: { en: "Shareholder", ar: "مساهم" }, desc: { en: "Owner", ar: "مساهم" }, inherits: "viewer", level: 30 },
    viewer: { label: { en: "Viewer", ar: "زائر" }, desc: { en: "Read only", ar: "قراءة فقط" }, inherits: null, level: 10 },
    grc_officer: { label: { en: "GRC Officer", ar: "مسؤول الحوكمة" }, desc: { en: "Compliance officer", ar: "مسؤول الحوكمة" }, inherits: "manager", level: 55 },
    audit_committee_chair: { label: { en: "Audit Chair", ar: "رئيس لجنة المراجعة" }, desc: { en: "Audit lead", ar: "رئيس لجنة المراجعة" }, inherits: "viewer", level: 65 },
    audit_committee_member: { label: { en: "Audit Member", ar: "عضو لجنة المراجعة" }, desc: { en: "Audit member", ar: "عضو لجنة المراجعة" }, inherits: "viewer", level: 60 }
  },

  permissions: {
    financial: {
      title: { ar: "المالية", en: "Financial" },
      items: [
        { key: "approve_po", label: { ar: "اعتماد أوامر الشراء", en: "Approve PO" }, roles: ["ceo", "cfo", "manager"] },
        { key: "view_financials", label: { ar: "الاطلاع على القوائم المالية", en: "View Financials" }, roles: ["chairman", "board_member", "ceo", "cfo"] }
      ]
    },
    system: {
      title: { ar: "النظام", en: "System" },
      items: [
        { key: "manage_users", label: { ar: "إدارة المستخدمين", en: "Manage Users" }, roles: ["sys_admin"] },
        { key: "edit_policies", label: { ar: "تعديل السياسات", en: "Edit Policies" }, roles: ["sys_admin", "ceo"] }
      ]
    }
  },

  users: [
    { id: "USR_000", name: { ar: "عبدالله الحواس", en: "Abdullah Al-Hawas" }, title: { ar: "رئيس المجلس", en: "Chairman" }, dept: "DEP_EXEC", role: "chairman", email: "amh400@gmail.com", isExecutive: false },
    { id: "USR_001", name: { ar: "هشام السحيباني", en: "Hesham Al-Sohaibani" }, title: { ar: "الرئيس التنفيذي", en: "CEO" }, dept: "DEP_EXEC", role: "ceo", email: "hesham@androomeda.com", isExecutive: true },
    { id: "USR_002", name: { ar: "محمد البخيتي", en: "Mohammed Al-Bukheiti" }, title: { ar: "المدير المالي", en: "CFO" }, dept: "DEP_FIN", role: "cfo", email: "mtahir@androomeda.com", isExecutive: true },
    { id: "USR_004", name: { ar: "أيمن المغربي", en: "Ayman Al-Maghrabi" }, title: { ar: "مسؤول الحوكمة", en: "GRC Officer" }, dept: "DEP_COMP", role: "grc_officer", email: "amaghrabi@androomeda.com", avatar: "https://androgov-sa.github.io/AIT/photo/grc.png" },
    { id: "USR_009", name: { ar: "مشاعل الهديان", en: "Meshail Al-Hadyan" }, title: { ar: "مسؤول الأمن السيبراني", en: "NCSO" }, dept: "DEP_TECH", role: "manager", email: "malhadyan@androomeda.com" },
    { id: "COMM_01", name: { ar: "محمد العنزي", en: "Mohammed Al-Enezi" }, title: { ar: "رئيس لجنة المراجعة", en: "Audit Chair" }, dept: "DEP_AUDIT", role: "audit_committee_chair", email: "mohammedmansour.socpa@gmail.com", isExternal: true }
  ],

  userRolesMap: [
    { userId: "USR_004", contexts: [
      { context: "system", role: "sys_admin", label: { ar: "إدارة النظام", en: "System" }, isPrimary: true },
      { context: "governance", role: "grc_officer", label: { ar: "الحوكمة", en: "GRC" } }
    ]},
    { userId: "USR_001", contexts: [
      { context: "executive", role: "ceo", label: { ar: "التنفيذية", en: "Executive" }, isPrimary: true },
      { context: "board", role: "vice_chairman", label: { ar: "المجلس", en: "Board" } }
    ]},
    { userId: "USR_000", contexts: [
      { context: "board", role: "chairman", label: { ar: "المجلس", en: "Board" }, isPrimary: true }
    ]}
  ],

  governance: {
    board: { totalSeats: 4, termYears: 4 },
    quorum: { Board: { minMembers: 3 } }
  },

  hrPolicies: {
    probation: { minDays: 90, maxDays: 180 },
    leaves: { annual: { junior: 21, senior: 30 } }
  },

  financialAuthority: {
    poApproval: [
      { role: "manager", limit: 5000 },
      { role: "cfo", limit: 50000 },
      { role: "ceo", limit: 1000000 }
    ]
  },

  activities: [
    { code: "620102", name: { ar: "تصميم البرمجيات", en: "Software Development" }, category: "IT" },
    { code: "465101", name: { ar: "بيع الحواسيب", en: "Computer Sales" }, category: "Sales" }
  ]
};

// ==========================================
// BROWSER EXPORT
// ==========================================
if (typeof window !== 'undefined') {
  window.CompanyPolicy = CompanyPolicy;
  console.log('✅ CompanyPolicy loaded successfully');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CompanyPolicy;
}
