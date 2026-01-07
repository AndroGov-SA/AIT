// AndroGov Navigation Config (Andromeda)
window.ANDRO_NAV = [
  {
    group: "الرئيسية",
    items: [
      { key:"dashboard", label:"لوحة التحكم", href:"/admin/dashboard/index.html", scope:"ADMIN" },
    ]
  },

  {
    group: "الحوكمة العليا",
    items: [
      { key:"ga", label:"حوكمة الجمعيات", href:"/admin/governance/general-assembly/index.html", scope:"GOV_GA" },
      { key:"board", label:"مجلس الإدارة", href:"/admin/governance/board/index.html", scope:"GOV_BOARD" },
      { key:"committees", label:"اللجان", href:"/admin/governance/committees/index.html", scope:"GOV_COMMITTEES" },
    ]
  },

  {
    group: "الحوكمة التشغيلية",
    items: [
      { key:"doa", label:"مصفوفة الصلاحيات (DOA)", href:"/admin/operating-governance/doa/index.html", scope:"OP_DOA" },
      { key:"policies", label:"السياسات واللوائح", href:"/admin/operating-governance/policies/index.html", scope:"OP_POLICIES" },
      { key:"compliance", label:"الامتثال والتدقيق", href:"/admin/operating-governance/compliance/index.html", scope:"OP_COMPLIANCE" },
      { key:"risk", label:"إدارة المخاطر", href:"/admin/operating-governance/risk/index.html", scope:"OP_RISK" },
    ]
  },

  {
    group: "الإدارات",
    items: [
      { key:"hr", label:"الموارد البشرية", href:"/admin/departments/hr/index.html", scope:"DEP_HR" },
      { key:"finance", label:"المالية", href:"/admin/departments/finance/index.html", scope:"DEP_FINANCE" },
      { key:"proc", label:"المشتريات", href:"/admin/departments/procurement/index.html", scope:"DEP_PROC" },
      { key:"cyber", label:"الأمن السيبراني", href:"/admin/departments/cybersecurity/index.html", scope:"DEP_CYBER" },
      { key:"it", label:"تقنية المعلومات", href:"/admin/departments/it/index.html", scope:"DEP_IT" },
      { key:"sales", label:"المبيعات", href:"/admin/departments/sales/index.html", scope:"DEP_SALES" },
      { key:"ops", label:"العمليات", href:"/admin/departments/operations/index.html", scope:"DEP_OPS" },
    ]
  },

  {
    group: "السجلات",
    items: [
      { key:"users", label:"المستخدمين والصلاحيات", href:"/admin/users/index.html", scope:"ADMIN_USERS" },
      { key:"logs", label:"سجل التدقيق (Audit Log)", href:"/admin/logs/audit.html", scope:"ADMIN_AUDIT" },
      { key:"bylaws", label:"النظام الأساس", href:"/admin/bylaws/index.html", scope:"BYLAWS_VIEW" },
    ]
  },
];
