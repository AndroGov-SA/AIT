/**
 * @file company_policy.js
 * @description The Unified System Configuration & Database for Andromeda IT
 * @architecture Infrastructure as Data (IaD)
 * @version 4.1.0 (Fixed Syntax Errors)
 * @system_driver True
 */

module.exports = {
  // ==========================================
  // 1. البيانات الوصفية للنظام (System Metadata)
  // ==========================================
  system: {
    app_id: "ANDROMEDA_CORE_V4",
    version: "4.1.0",
    last_updated: "2026-01-14",
    environment: "production",
    compliance_standards: ["SA_CL_2024", "ISO_27001"],
    status: "Active"
  },

  // ==========================================
  // 2. محرك الهوية البصرية (Identity Engine)
  // ==========================================
  identity: {
    meta: {
      brand_name: {
        en: "Andromeda IT",
        ar: "اندروميدا لتقنية المعلومات"
      },
      website: "www.ait.sa"
    },
    settings: {
      default_theme: "light",
      supported_themes: ["light", "dark"],
      direction_mapping: { "en": "ltr", "ar": "rtl" }
    },
    tokens: {
      colors: {
        primary: {
          _ref: "Brand Red",
          description: "Andromeda Primary Brand Color",
          value: {
            light: "#FB4747",
            dark: "#FF6B6B"
          }
        },
        secondary: {
          value: {
            light: "#2C3E50",
            dark: "#34495E"
          }
        },
        background: {
          page: {
            value: { light: "#F4F6F8", dark: "#121212" }
          },
          surface: {
            value: { light: "#FFFFFF", dark: "#1E1E1E" }
          },
          border: {
            value: { light: "#E0E0E0", dark: "#333333" }
          }
        },
        text: {
          primary: { value: { light: "#1A1A1A", dark: "#E0E0E0" } },
          secondary: { value: { light: "#637381", dark: "#A0AAB4" } },
          accent: { value: { light: "#FB4747", dark: "#FF6B6B" } }
        },
        status: {
          success: { value: { default: "#22C55E" } },
          warning: { value: { default: "#FFAB00" } },
          error:   { value: { default: "#FF5630" } },
          info:    { value: { default: "#00B8D9" } }
        }
      },
      typography: {
        fontFamily: {
          base: {
            en: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            ar: "'Tajawal', 'Almarai', sans-serif"
          },
          heading: {
            en: "'Public Sans', sans-serif",
            ar: "'Tajawal', sans-serif"
          }
        },
        sizes: {
          h1: "2.5rem", h2: "2rem", h3: "1.75rem", body: "1rem", small: "0.875rem"
        }
      },
      spacing: {
        xs: "0.5rem", sm: "1rem", md: "1.5rem", lg: "2rem", xl: "3rem"
      },
      borderRadius: {
        sm: "4px", md: "8px", lg: "16px", full: "9999px"
      }
    }
  },

  // ==========================================
  // 3. التوطين والترجمة (I18n Database)
  // ==========================================
  i18n: {
    settings: {
      locales: [
        { code: "en", dir: "ltr", name: "English" },
        { code: "ar", dir: "rtl", name: "العربية" }
      ],
      default: "ar"
    },
    translations: {
      global: {
        company_legal_name: {
          en: "Andromeda Information Technology Company (CJSC)",
          ar: "شركة اندروميدا لتقنية المعلومات (مساهمة مقفلة)"
        },
        actions: {
          save: { en: "Save Changes", ar: "حفظ التغييرات" },
          cancel: { en: "Cancel", ar: "إلغاء" },
          approve: { en: "Approve", ar: "اعتماد" },
          reject: { en: "Reject", ar: "رفض" }
        }
      },
      domains: {
        hr: { en: "Human Resources", ar: "الموارد البشرية" },
        finance: { en: "Finance", ar: "المالية" },
        tech: { en: "Technology", ar: "التقنية" },
        sales: { en: "Sales", ar: "المبيعات" }
      }
    }
  },

  // ==========================================
  // 4. الحوكمة وبيانات الشركة (Governance & Data)
  // ==========================================
  governance: {
    profile: {
      cr_number: "1010356267",
      unified_number: "7003339343",
      establishment_date: "2012-11-28",
      capital: {
        amount: 6000000,
        currency: "SAR",
        shares_count: 600000,
        share_value: 10
      }
    },
    // تم تحويل المساهمين إلى هيكل بيانات يمكن البحث فيه
    shareholders: [
      { "id": "SH_001", "name": { ar:"ورثة محمد بن صالح السحيباني", en: "Heirs of Mohammed Al-Suhaibani" }, "percent": 35, type: "Individual", "shares": 210000, "voting": true, "email": "alcaseer@gmail.com" },
      { "id": "SH_002", "name": { ar:"هشام بن محمد السحيباني", en: "Hesham bin Muhammad Al-Sohibani" }, "percent": 10, type: "Individual", "shares": 60000, "voting": true, "email": "Hesham@androomeda.com" },
      { "id": "SH_003", "name": { ar:"وائل بن محمد السحيباني", en: "Wael bin Mohammed Al Suhaibani" }, "percent": 5, type: "Individual", "shares": 30000, "voting": true, "email": "W961@live.com" },
      { "id": "SH_004", "name": { ar:"هيثم بن محمد السحيباني", en: "Haitham bin Mohammed Al Suhaibani" }, "percent": 5, type: "Individual", "shares": 30000, "voting": true, "email": "hmsasis@gmail.com" },
      { "id": "SH_005", "name": { ar:"منصور بن حسن اليامي", en: "Mansour bin Hassan Al-Yami" }, "percent": 5, type: "Individual", "shares": 30000, "voting": true, "email": "myami@androomeda.com" },
      { "id": "SH_006", "name": { ar:"إبراهيم بن حمد السكيتي", en: "Ibrahim bin Hamad Al Skeiti" }, "percent": 5, type: "Individual", "shares": 30000, "voting": true, "email": "ihskaity@gmail.com" },
      { "id": "SH_007", "name": { ar:"صالح بن عبدالله الوهيبي", en: "Saleh bin Abdullah Al-Wahibi" }, "percent": 5, type: "Individual", "shares": 30000, "voting": true, "email": "Saaw4466@yahoo.com" },
      { "id": "SH_008", "name": { ar:"عبدالله بن علي الفريجي", en: "Abdullah bin Ali Al-Fariji" }, "percent": 5, type: "Individual", "shares": 30000, "voting": true, "email": "a_furaiji@hotmail.com" },
      { "id": "SH_009", "name": { ar:"عبدالله بن محمد الحواس", en: "Abdullah bin Mohammed Al-Hawas" }, "percent": 5, type: "Individual", "shares": 30000, "voting": true, "email": "amh400@gmail.com" },
      { "id": "SH_010", "name": { ar:"شركة بيجي المحدودة", en: "BG LTD.Company" }, "percent": 15, type: "Entity", "shares": 90000, "voting": true, "email": "saleh@bgtech.com" },
      { "id": "SH_011", "name": { ar:"احمد بن سليمان الجاسر", en: "Ahmed bin Suleiman Al-Jasser" }, "percent": 5, type: "Individual", "shares": 30000, "voting": true, "email": "ahmed.jasser@gmail.com" }
    ],
    activities_isic: [
      { "code": "432134", "name_ar": "تركيب وصيانة الأجهزة الأمنية", "category": "Security" },
      { "code": "451030", "name_ar": "مزادات السيارات والمعدات", "category": "Auctions" },
      { "code": "464956", "name_ar": "البيع بالجملة للأجهزة والمعدات والمستلزمات الطبية", "category": "Medical" },
      { "code": "465101", "name_ar": "البيع بالجملة للحواسيب ومستلزماتها يشمل بيع الطابعات وأحبارها", "category": "Sales" },
      { "code": "465102", "name_ar": "البيع بالجملة للبرمجيات ويشمل الاستيراد", "category": "Sales" },
      { "code": "465933", "name_ar": "البيع بالجملة للأجهزة الأمنية", "category": "Security" },
      { "code": "465934", "name_ar": "البيع بالجملة للمعدات والتجهيزات الأمنية (للمنافسات الحكومية فقط)", "category": "Security" },
      { "code": "469061", "name_ar": "البيع بالجملة لأجهزة ولوازم الكيماويات والمختبرات", "category": "Medical" },
      { "code": "474110", "name_ar": "البيع بالتجزئة للحواسيب وملحقاتها يشمل الطابعات وأحبارها", "category": "Retail" },
      { "code": "474152", "name_ar": "بيع البرمجيات غير المعدة بناء على الطلب", "category": "IT" },
      { "code": "477336", "name_ar": "البيع بالتجزئة للأجهزة الأمنية", "category": "Security" },
      { "code": "479940", "name_ar": "المزادات في غير المحلات", "category": "Auctions" },
      { "code": "620102", "name_ar": "تصميم وبرمجة البرمجيات الخاصة", "category": "IT" },
      { "code": "682010", "name_ar": "الوساطة العقارية", "category": "RealEstate" },
      { "code": "682044", "name_ar": "المزادات العقارية", "category": "RealEstate" },
      { "code": "731013", "name_ar": "تقديم خدمات تسويقية نيابةً عن الغير", "category": "Marketing" },
      { "code": "749036", "name_ar": "أنشطة خدمات استشارات في مجال تنظيم الأجهزة الطبية", "category": "Medical" },
      { "code": "869027", "name_ar": "مراكز الخدمات الطبية المنزلية", "category": "Medical" },
      { "code": "869037", "name_ar": "مراكز الرعاية عن بعد والطب الإتصالي", "category": "Medical" }
    ],
    config: {
      board_structure: {
        total_seats: 4,
        current_term_start: "2025-01-01",
        current_term_end: "2029-01-01",
        term_duration_years: 4,
        min_meetings_per_year: 4
      },
      quorum_rules: {
        OGA: { "first_meeting": 25, "second_meeting": 0, "decision_threshold": 50 },
        "EGA": { "first_meeting": 50, "second_meeting": 25, "third_meeting": 0, "decision_threshold": 66.6 },
        "Board": { "min_members": 3, "decision_threshold": 51 }
      },
      remuneration_policy: {
        "currency": "SAR",
        "board_meeting_fee": 2000,
        "audit_committee_fee": 1500,
        "secretary_fee": 1000,
        "annual_cap_per_member": 500000,
        "travel_policy": "Business Class for non-residents"
      }
    }
  },

  // ==========================================
  // 5. مصفوفة الصلاحيات (Security Matrix / RBAC)
  // ==========================================
  access_control: {
    // 1. تعريف الأدوار (Roles Definitions)
    roles: {
      sys_admin: {
        label: { en: "System Admin", ar: "مدير النظام" },
        inherits: ["chairman", "ceo"],
        description: { en: "Technical Superuser", ar: "صلاحيات تقنية كاملة" }
      },
      // --- مجلس الإدارة (Governance) ---
      chairman: {
        label: { en: "Chairman", ar: "رئيس مجلس الإدارة" },
        inherits: ["board_member"],
        authority_level: "Sole_Signatory"
      },
      vice_chairman: {
        label: { en: "Vice Chairman", ar: "نائب رئيس مجلس الإدارة" },
        inherits: ["board_member"],
        authority_level: "Sole_Signatory"
      },
      board_member: {
        label: { en: "Board Member", ar: "عضو مجلس إدارة" },
        inherits: ["viewer"],
        access_scope: "Board_Room_Only"
      },
      // --- الملاك / المساهمين (Ownership) ---
      shareholder: {
        label: { en: "Shareholder", ar: "مساهم" },
        inherits: ["viewer"],
        description: { en: "Company Owner/Investor", ar: "مالك أسهم / مستثمر" },
        capabilities: {
          voting: true,
          profile_update: true,
          investor_relations: true,
          request_meeting: "conditional"
        }
      },
      // --- الإدارة التنفيذية (Executive Management) ---
      ceo: {
        label: { en: "CEO", ar: "الرئيس التنفيذي" },
        inherits: ["cfo", "manager"],
        authority_level: "Sole_Signatory"
      },
      cfo: {
        label: { en: "CFO", ar: "المدير المالي" },
        inherits: ["manager"]
      },
      manager: {
        label: { en: "Department Manager", ar: "مدير إدارة" },
        inherits: ["employee"]
      },
      employee: {
        label: { en: "Employee", ar: "موظف" },
        inherits: ["viewer"]
      },
      viewer: {
        label: { en: "Guest/Viewer", ar: "زائر" },
        inherits: []
      }
    },

    // 2. خريطة الصلاحيات الدقيقة (Permissions Map)
    permissions: {
      'shareholder': [
        'general_assembly.view',
        'general_assembly.vote',
        'financials.view_approved',
        'profile.update_iban',
        'profile.update_contact',
        'tickets.create_ir',
        'assembly.request_meeting'
      ],
      "FinancialRequests": {
        "approve_po": {
          "budgeted": [
            { role: "manager", limit: 5000 },
            { role: "cfo", limit: 50000 },
            { role: "ceo", limit: 1000000 }
          ],
          "unbudgeted": [
            { role: "board_member", limit: -1 }
          ]
        },
        "approve_payroll": {
          "verify": ["cfo"],
          "finalize": ["ceo"]
        },
        "petty_cash": {
          "request": ["manager"],
          "approve": ["cfo"]
        }
      },
      "LegalDocuments": {
        "sign_contracts": {
          "operational": [{ role: "ceo", limit: 1000000 }],
          "strategic": [{ role: "chairman", limit: -1 }]
        },
        "government_representation": {
          "granted_to": ["ceo", "chairman", "cao"],
          "actions": ["renew_cr", "labor_visas", "bank_accounts"]
        }
      },
      "SystemContent": {
        "view_confidential": { "granted_to": ["ceo", "cfo", "chairman", "board_member"] },
        "edit_policies": { "granted_to": ["sys_admin"] },
        "publish_policies": { "granted_to": ["ceo", "chairman"] }
      }
    },

    // 3. الصلاحيات المالية والإدارية (Financial & Admin Authority)
    financial_authority: [
      {
        "transaction_type": "PO_Approval",
        "levels": [
          { "role": "Manager", "limit": 5000, "condition": "Budgeted" },
          { "role": "CFO", "limit": 50000, "condition": "Budgeted" },
          { "role": "CEO", "limit": 1000000, "condition": "Budgeted" },
          { "role": "Board", "limit": -1, "condition": "Unbudgeted or > 1M" }
        ]
      },
      {
        "transaction_type": "Payroll_Approval",
        "levels": [
          { "role": "HR_Manager", "action": "Prepare" },
          { "role": "CFO", "action": "Verify" },
          { "role": "CEO", "action": "Final_Approve" }
        ]
      },
      {
        "transaction_type": "Petty_Cash",
        "levels": [
          { "role": "Direct_Manager", "limit": 1000, "action": "Request" },
          { "role": "CFO", "limit": 5000, "action": "Final_Approve" }
        ]
      },
      {
        "transaction_type": "Contract_Signing",
        "levels": [
          { "role": "CEO", "limit": 1000000, "condition": "Operational Expenses" },
          { "role": "Board", "limit": -1, "condition": "Strategic/Capex > 1M" }
        ]
      }
    ],
    legal_and_admin_powers: {
      "note": "Extracted from System of Association (Pages 29-61)",
      "powers": [
        { "code": "LEG_001", "category": "Government", "action_ar": "استخراج السجلات التجارية وتجديدها", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "BNK_001", "category": "Banking", "action_ar": "فتح الحسابات البنكية والإيداع والسحب", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "BNK_002", "category": "Banking", "action_ar": "التوقيع على عقود القروض والتسهيلات", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "HR_001", "category": "Human Resources", "action_ar": "استقدام العمالة ونقل الكفالات", "authorized_roles": ["CEO", "CAO"], "execution_type": "Solo" },
        { "code": "R_EST_001", "category": "Real Estate", "action_ar": "بيع وشراء العقارات والأراضي", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "CORP_001", "category": "Corporate", "action_ar": "تأسيس شركات تابعة وتوقيع عقودها", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "JUD_001", "category": "Judicial", "action_ar": "التمثيل القضائي (المرافعة، المدافعة، الصلح)", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "MAR_001", "category": "Marine", "action_ar": "شراء واستيراد وبيع القوارب", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "MAR_002", "category": "Marine", "action_ar": "استخراج وتجديد رخص القوارب وتصاريح الصيد", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "INV_001", "category": "Investment", "action_ar": "فتح وإدارة المحافظ الاستثمارية وبيع الأسهم", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" }
      ]
    }
  },

  // ==========================================
  // 6. محتوى السياسات (Content Database)
  // ==========================================
  policies: [
    {
      id: "POL_HR_001",
      meta: {
        version: "2.0",
        category: "hr",
        effective_date: "2025-01-01"
      },
      title: {
        en: "Employment & Benefits Policy",
        ar: "سياسة التوظيف والمزايا"
      },
      sections: [
        {
          id: "sec_probation",
          title: { en: "Probation Period", ar: "فترة التجربة" },
          clauses: [
            {
              id: "prob_01",
              content: {
                en: "The standard probation period is 90 days, extendable to 180 days.",
                ar: "فترة التجربة القياسية هي 90 يوماً، قابلة للتمديد حتى 180 يوماً."
              },
              rules: { min_days: 90, max_days: 180 }
            }
          ]
        },
        {
          id: "sec_leaves",
          title: { en: "Leave Entitlements", ar: "استحقاقات الإجازات" },
          clauses: [
            {
              id: "leave_annual",
              content: {
                en: "Junior staff: 21 days. Senior staff (5+ years): 30 days.",
                ar: "الموظفون المبتدئون: 21 يوماً. كبار الموظفين (أكثر من 5 سنوات): 30 يوماً."
              },
              data_mapping: { junior_balance: 21, senior_balance: 30 }
            },
            {
              id: "leave_maternity",
              content: {
                en: "Maternity leave is 12 weeks fully paid.",
                ar: "إجازة الوضع هي 12 أسبوعاً مدفوعة الأجر بالكامل."
              }
            }
          ]
        }
      ]
    },
    {
      id: "POL_PROC_001",
      meta: {
        version: "1.5",
        category: "finance"
      },
      title: {
        en: "Procurement Policy",
        ar: "سياسة المشتريات"
      },
      sections: [
        {
          id: "sec_limits",
          title: { en: "Purchasing Limits", ar: "حدود الشراء" },
          clauses: [
            {
              id: "proc_quotes",
              content: {
                en: "Purchases above 5000 SAR require 3 quotations.",
                ar: "المشتروات التي تزيد عن 5000 ريال تتطلب 3 عروض أسعار."
              },
              rules: { threshold: 5000, min_quotes: 3 }
            }
          ]
        }
      ]
    }
  ],

  // ==========================================
  // 7. الهيكل التنظيمي (Organizational Data)
  // ==========================================
  organization: {
    departments: [
      { id: "DEP_EXEC", name: { en: "Executive Management", ar: "الإدارة التنفيذية" } },
      { id: "DEP_STRAT", name: { en: "Strategy & PMO", ar: "الاستراتيجية ومكتب إدارة المشاريع" } },
      { id: "DEP_INV", name: { en: "Investment", ar: "إدارة الاستثمار" } },
      { id: "DEP_LEGAL", name: { en: "Legal Affairs", ar: "الشؤون القانونية" } },
      { id: "DEP_AUDIT", name: { en: "Internal Audit", ar: "التدقيق الداخلي" } },
      { id: "DEP_COMP", name: { en: "Governance & Compliance", ar: "الحوكمة والالتزام" } },
      { id: "DEP_FIN", name: { en: "Finance", ar: "الإدارة المالية" } },
      { id: "DEP_HR", name: { en: "HR & Admin", ar: "الموارد البشرية والشؤون الإدارية" } },
      { id: "DEP_PROC", name: { en: "Procurement & Supply Chain", ar: "المشتريات وسلاسل الإمداد" } },
      { id: "DEP_TECH", name: { en: "Technology & Development", ar: "التقنية والتطوير" } },
      { id: "DEP_DATA", name: { en: "Data & AI", ar: "البيانات والذكاء الاصطناعي" } },
      { id: "DEP_RND", name: { en: "Research & Development (R&D)", ar: "البحث والابتكار" } },
      { id: "DEP_SEC", name: { en: "Cybersecurity", ar: "الأمن السيبراني" } },
      { id: "DEP_OPS", name: { en: "Operations", ar: "العمليات والتشغيل" } },
      { id: "DEP_SALES", name: { en: "Sales & Business Dev", ar: "المبيعات وتطوير الأعمال" } },
      { id: "DEP_MKT", name: { en: "Marketing & Comms", ar: "التسويق والاتصال المؤسسي" } },
      { id: "DEP_CS", name: { en: "Customer Success", ar: "خدمة ونجاح العملاء" } }
    ],
    // سجل الموظفين
    key_personnel: [
      { 
        id: "USR_000", 
        name: "Abdullah Al-Hawas", 
        role_ref: "chairman", 
        dept: "DEP_EXEC", 
        title: "Chairman of the Board", 
        additional_roles: ["shareholder"] 
      },
      { 
        id: "BRD_003", 
        name: "Ahmed Al-Suhaibani", 
        role_ref: "board_member", 
        dept: "DEP_EXEC", 
        title: "Board & Audit Member", 
        additional_roles: ["shareholder"] 
      },
      { 
        id: "COMM_01", 
        name: "Mohammed Al-Enezi", 
        role_ref: "board_member", 
        dept: "DEP_AUDIT", 
        title: "Audit Committee Chairman",
        access_scope: "Audit_Level"
      },
      { 
        id: "COMM_02", 
        name: "Adel Sasa", 
        role_ref: "viewer",
        dept: "DEP_AUDIT", 
        title: "Audit Committee Member",
        access_scope: "Audit_Files_Only"
      },
      { 
        id: "USR_001", 
        name: "Hesham Al-Sohaibani", 
        role_ref: "ceo", 
        dept: "DEP_EXEC", 
        title: "CEO & Vice Chairman", 
        additional_roles: ["vice_chairman", "shareholder"] 
      },
      { 
        id: "USR_002", 
        name: "Mohammed Al-Bukheiti", 
        role_ref: "cfo", 
        dept: "DEP_FIN", 
        title: "Chief Financial Officer" 
      },
      { 
        id: "USR_005", 
        name: "Mansour Al-Yami", 
        role_ref: "manager",
        dept: "DEP_HR", 
        title: "CAO, Board Member & Shareholder", 
        additional_roles: ["board_member", "shareholder"] 
      },
      { 
        id: "USR_020", 
        name: "Muhammad Akhtar", 
        role_ref: "manager", 
        dept: "DEP_TECH", 
        title: "Director of Development" 
      },
      { 
        id: "USR_004", 
        name: "Ayman Al-Maghrabi", 
        role_ref: "manager", 
        dept: "DEP_COMP",
        title: "GRCO / Board Secretary", 
        additional_roles: ["board_secretary"] 
      },
      { 
        id: "USR_009", 
        name: "Meshail Al-Hadyan", 
        role_ref: "manager", 
        dept: "DEP_SEC",
        title: "NCSO (Cybersecurity)" 
      },
      { 
        id: "USR_007", 
        name: "Nawaf Al-Sahabi", 
        role_ref: "manager", 
        dept: "DEP_CS",
        title: "Customer Accounts Manager" 
      },
      { 
        id: "USR_006", 
        name: "Dr. Waad Hussein", 
        role_ref: "manager", 
        dept: "DEP_TECH",
        title: "Medical Supervisor (SME)" 
      },
      { 
        id: "USR_011", 
        name: "Vacant", 
        role_ref: "manager", 
        dept: "DEP_SALES", 
        title: "Sales Manager (Vacant)", 
        status: "inactive"
      },
      { 
        id: "USR_015", 
        name: "Rand Al-Hourani", 
        role_ref: "employee",
        dept: "DEP_TECH", 
        title: "Technical Team Lead",
        is_team_lead: true
      },
      { 
        id: "USR_023", 
        name: "Software Developers Team", 
        role_ref: "employee", 
        dept: "DEP_TECH", 
        title: "Development Team Group",
        is_group: true
      },
      { 
        id: "USR_008", 
        name: "Al-Hussain Al-Humaidi", 
        role_ref: "employee", 
        dept: "DEP_CS",
        title: "Technical Support Specialist" 
      },
      { 
        id: "USR_010", 
        name: "Maha Al-Hazzan", 
        role_ref: "employee", 
        dept: "DEP_MKT",
        title: "Digital Marketing Specialist" 
      },
      { 
        id: "USR_003", 
        name: "Hadi Ahmed", 
        role_ref: "employee", 
        dept: "DEP_PROC",
        title: "Purchasing Coordinator" 
      },
      { 
        id: "USR_014", 
        name: "Abdullah Al-Jubeir", 
        role_ref: "employee", 
        dept: "DEP_HR",
        title: "Office Support" 
      },
      { 
        id: "AUD_INT", 
        name: "Internal Auditor", 
        role_ref: "manager", 
        dept: "DEP_AUDIT", 
        title: "Internal Auditor" 
      },
      { 
        id: "AUD_EXT", 
        name: "External Auditor", 
        role_ref: "viewer", 
        dept: "DEP_AUDIT", 
        title: "External Auditor (KPMG/EY)", 
        access_scope: "External_Audit_Limited" 
      }
    ]
  },

  // ==========================================
  // 8. المساعدات والوظائف (Logic & Helpers)
  // ==========================================
  helpers: {
    // تم تحويل دالة canRequestAssembly إلى هنا لتصحيح الخطأ البرمجي
    canRequestAssembly: function(user) {
      if (!user.roles.includes('shareholder')) return false;
      const REQUIRED_PERCENTAGE = 0.05; // 5%
      return (user.ownership_percentage >= REQUIRED_PERCENTAGE);
    }
  }
};
