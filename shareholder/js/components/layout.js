/**
 * ============================================================================
 * AndroGov Unified Layout Engine v11.0 - COMPLETE EDITION
 * ============================================================================
 * @description Unified layout system for all portals with full feature parity
 * @author Ayman Al-Maghrabi
 * @features 
 * - ✅ Multi-role support with role switching
 * - ✅ RTL/LTR language switching (Arabic/English)
 * - ✅ Dark/Light theme toggle
 * - ✅ Notifications system with real-time updates
 * - ✅ AI Bot integration ready
 * - ✅ Mobile responsive sidebar
 * - ✅ Consistent UX across all portals
 */

// ============================================================================
// CONFIGURATION OBJECT - يتم تخصيصه لكل بوابة
// ============================================================================
const PORTAL_CONFIG = {
  // 🔴 ADMIN PORTAL
  admin: {
    defaultRole: 'admin',
    storageKey: 'activeRole',
    notificationKey: 'notifications',
    brandIcon: 'fa-layer-group',
    brandName: 'Enterprise',
    brandColor: 'brandRed',
    
    roles: {
      'admin': { 
        ar: 'مدير النظام', 
        en: 'System Admin',
        desc: { ar: 'الإدارة التقنية والرقابة الشاملة', en: 'Technical & System Management' },
        icon: 'fa-user-shield'
      },
      'board_secretary': { 
        ar: 'أمين سر مجلس الإدارة', 
        en: 'Board Secretary',
        desc: { ar: 'إدارة المجلس واللجان والجمعيات', en: 'Board & Committee Management' },
        icon: 'fa-pen-to-square'
      },
      'audit_secretary': { 
        ar: 'أمين سر لجنة المراجعة', 
        en: 'Audit Committee Secretary',
        desc: { ar: 'الرقابة المالية والتدقيق الداخلي', en: 'Financial Audit & Control' },
        icon: 'fa-clipboard-list'
      },
      'investor_relations': { 
        ar: 'علاقات المساهمين', 
        en: 'Investor Relations',
        desc: { ar: 'إدارة بيانات المستثمرين والملاك', en: 'Shareholder Data Management' },
        icon: 'fa-id-card-clip'
      },
      'grc_officer': { 
        ar: 'مسؤول GRC والامتثال', 
        en: 'GRC Officer',
        desc: { ar: 'الحوكمة والمخاطر والالتزام', en: 'Governance, Risk & Compliance' },
        icon: 'fa-shield-halved'
      }
    },

    menus: {
      'admin': [
        { section: 'core_system', items: [
          { key: 'dashboard', icon: 'fa-gauge-high', link: 'index.html', badge: null },
          { key: 'users_mgmt', icon: 'fa-users-gear', link: 'users.html', badge: 'core' },
          { key: 'admin_settings', icon: 'fa-sliders', link: 'admin_settings.html', badge: null }
        ]},
        { section: 'infrastructure', items: [
          { key: 'it_systems', icon: 'fa-microchip', link: 'it.html', badge: 'tech' },
          { key: 'system_audit', icon: 'fa-terminal', link: 'audit.html', badge: null }
        ]},
        { section: 'communication', items: [
          { key: 'internal_chat', icon: 'fa-comments', link: 'admin_chat.html', badge: 'new' },
          { key: 'circulars_admin', icon: 'fa-bullhorn', link: 'admin_circulars.html', badge: null }
        ]}
      ],
      'board_secretary': [
        { section: 'board_operations', items: [
          { key: 'board_portal', icon: 'fa-building-columns', link: 'board.html', badge: 'primary' },
          { key: 'committees_mgmt', icon: 'fa-people-group', link: 'committees.html', badge: null },
          { key: 'general_assembly', icon: 'fa-users-rectangle', link: 'ga.html', badge: 'assembly' }
        ]},
        { section: 'governance_docs', items: [
          { key: 'policies_library', icon: 'fa-book-open', link: 'policies.html', badge: null },
          { key: 'board_circulars', icon: 'fa-scroll', link: 'admin_circulars.html', badge: null }
        ]}
      ],
      'audit_secretary': [
        { section: 'audit_oversight', items: [
          { key: 'audit_dashboard', icon: 'fa-magnifying-glass-chart', link: 'audit.html', badge: 'audit' },
          { key: 'financial_review', icon: 'fa-money-bill-trend-up', link: 'finance.html', badge: null },
          { key: 'procurement_control', icon: 'fa-boxes-packing', link: 'procurement.html', badge: 'orders' }
        ]},
        { section: 'compliance_tasks', items: [
          { key: 'compliance_check', icon: 'fa-scale-balanced', link: 'compliance.html', badge: null },
          { key: 'task_tracker', icon: 'fa-list-check', link: 'tasks.html', badge: 'active' }
        ]}
      ],
      'investor_relations': [
        { section: 'shareholders', items: [
          { key: 'shareholders_db', icon: 'fa-id-card', link: 'shareholders.html', badge: 'investors' },
          { key: 'ga_access', icon: 'fa-landmark', link: 'ga.html', badge: null }
        ]},
        { section: 'personal', items: [
          { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null },
          { key: 'ir_circulars', icon: 'fa-envelope-open-text', link: 'admin_circulars.html', badge: null }
        ]}
      ],
      'grc_officer': [
        { section: 'grc_compliance', items: [
          { key: 'compliance_dashboard', icon: 'fa-scale-balanced', link: 'compliance.html', badge: 'grc' },
          { key: 'doa_authority', icon: 'fa-sitemap', link: 'doa.html', badge: 'authority' },
          { key: 'policies_control', icon: 'fa-book-open', link: 'policies.html', badge: null }
        ]},
        { section: 'hr_governance', items: [
          { key: 'hr_compliance', icon: 'fa-user-shield', link: 'hr.html', badge: 'hr' },
          { key: 'audit_reports', icon: 'fa-file-contract', link: 'audit.html', badge: null }
        ]},
        { section: 'workflow', items: [
          { key: 'grc_tasks', icon: 'fa-clipboard-check', link: 'tasks.html', badge: null }
        ]}
      ]
    }
  },

  // 🟣 AUDIT PORTAL
  audit: {
    defaultRole: 'internal_auditor',
    storageKey: 'audit_activeRole',
    notificationKey: 'audit_notifications',
    brandIcon: 'fa-shield-halved',
    brandName: 'Audit',
    brandColor: 'purple-600',
    
    roles: {
      'internal_auditor': { 
        ar: 'المدقق الداخلي', 
        en: 'Internal Auditor',
        desc: { ar: 'إجراء عمليات التدقيق والمراجعة الداخلية', en: 'Conduct internal audit and review operations' },
        icon: 'fa-shield-halved'
      },
      'audit_committee': { 
        ar: 'لجنة المراجعة', 
        en: 'Audit Committee',
        desc: { ar: 'الإشراف على التدقيق والامتثال', en: 'Oversight of audit and compliance' },
        icon: 'fa-building-columns'
      }
    },

    menus: {
      'internal_auditor': [
        { section: 'audit_overview', items: [
          { key: 'audit_dashboard', icon: 'fa-shield-halved', link: 'index.html', badge: 'live' },
          { key: 'annual_audit_plan', icon: 'fa-calendar-check', link: 'audit_plan.html', badge: null }
        ]},
        { section: 'audit_execution', items: [
          { key: 'observations_log', icon: 'fa-clipboard-list', link: 'observations.html', badge: 'important' },
          { key: 'risk_assessment', icon: 'fa-triangle-exclamation', link: 'risk_reports.html', badge: 'risks' },
          { key: 'compliance_monitoring', icon: 'fa-list-check', link: 'compliance.html', badge: null }
        ]},
        { section: 'reporting', items: [
          { key: 'quarterly_reports', icon: 'fa-file-chart-column', link: 'reports.html', badge: null },
          { key: 'findings_database', icon: 'fa-database', link: 'findings.html', badge: null }
        ]},
        { section: 'personal', items: [
          { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null }
        ]}
      ],
      'audit_committee': [
        { section: 'committee_overview', items: [
          { key: 'committee_dashboard', icon: 'fa-building-columns', link: 'index.html', badge: 'live' },
          { key: 'audit_plan_review', icon: 'fa-calendar-check', link: 'audit_plan.html', badge: null }
        ]},
        { section: 'oversight', items: [
          { key: 'critical_observations', icon: 'fa-exclamation-triangle', link: 'observations.html', badge: 'critical' },
          { key: 'risk_reports', icon: 'fa-chart-line', link: 'risk_reports.html', badge: null },
          { key: 'compliance_status', icon: 'fa-shield-check', link: 'compliance.html', badge: null }
        ]},
        { section: 'reports_review', items: [
          { key: 'audit_reports', icon: 'fa-file-lines', link: 'reports.html', badge: null },
          { key: 'external_audit', icon: 'fa-building', link: 'external_audit.html', badge: null }
        ]},
        { section: 'communication', items: [
          { key: 'committee_communication', icon: 'fa-comments', link: 'communication.html', badge: null }
        ]}
      ]
    }
  },

  // 🔵 BOARD PORTAL
  board: {
    defaultRole: 'board_secretary',
    storageKey: 'board_activeRole',
    notificationKey: 'board_notifications',
    brandIcon: 'fa-building-columns',
    brandName: 'Board',
    brandColor: 'brandRed',
    
    roles: {
      'board_secretary': { 
        ar: 'مجلس الإدارة', 
        en: 'Board of Directors',
        desc: { ar: 'إدارة المجلس واللجان والجمعيات', en: 'Board & Committee Management' },
        icon: 'fa-building-columns'
      }
    },

    menus: {
      'board_secretary': [
        { section: 'board_operations', items: [
          { key: 'dashboard', icon: 'fa-gauge-high', link: 'index.html', badge: 'live' },
          { key: 'meetings', icon: 'fa-calendar-days', link: 'meetings.html', badge: null },
          { key: 'communication', icon: 'fa-comments', link: 'communication.html', badge: 'new' }
        ]},
        { section: 'governance_docs', items: [
          { key: 'financial_review', icon: 'fa-chart-pie', link: 'finance.html', badge: null },
          { key: 'policies_library', icon: 'fa-book-open', link: 'governance.html', badge: null }
        ]},
        { section: 'personal', items: [
          { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null }
        ]}
      ]
    }
  },

  // 🟠 CEO PORTAL
  ceo: {
    defaultRole: 'ceo',
    storageKey: 'ceo_activeRole',
    notificationKey: 'ceo_notifications',
    brandIcon: 'fa-crown',
    brandName: 'Executive',
    brandColor: 'brandRed',
    
    roles: {
      'ceo': { 
        ar: 'الرئيس التنفيذي', 
        en: 'Chief Executive Officer',
        desc: { ar: 'القيادة التنفيذية والإدارة الاستراتيجية', en: 'Executive Leadership & Strategic Management' },
        icon: 'fa-crown'
      },
      'board_vp': { 
        ar: 'نائب رئيس المجلس', 
        en: 'Board Vice President',
        desc: { ar: 'الإشراف على أعمال المجلس والحوكمة', en: 'Board Oversight & Governance' },
        icon: 'fa-user-tie'
      },
      'shareholder': { 
        ar: 'مساهم', 
        en: 'Shareholder',
        desc: { ar: 'الوصول للتقارير والبيانات المالية', en: 'Access to Reports & Financial Data' },
        icon: 'fa-chart-pie'
      }
    },

    menus: {
      'ceo': [
        { section: 'executive_dashboard', items: [
          { key: 'executive_overview', icon: 'fa-gauge-high', link: 'index.html', badge: 'live' },
          { key: 'strategic_planning', icon: 'fa-chess-board', link: 'ceo_strategy.html', badge: 'strategic' }
        ]},
        { section: 'financial_oversight', items: [
          { key: 'financial_performance', icon: 'fa-chart-line', link: 'ceo_finance.html', badge: 'financial' },
          { key: 'executive_reports', icon: 'fa-file-chart-column', link: 'ceo_reports.html', badge: null }
        ]},
        { section: 'governance_compliance', items: [
          { key: 'governance_framework', icon: 'fa-scale-balanced', link: 'ceo_governance.html', badge: 'compliance' },
          { key: 'risk_management', icon: 'fa-shield-halved', link: 'ceo_risks.html', badge: 'risks' }
        ]},
        { section: 'communication', items: [
          { key: 'company_broadcast', icon: 'fa-tower-broadcast', link: 'ceo_broadcast.html', badge: 'broadcast' },
          { key: 'internal_communication', icon: 'fa-comments', link: 'ceo_communication.html', badge: null },
          { key: 'feedback_center', icon: 'fa-message-dots', link: 'ceo_feedback.html', badge: 'active' }
        ]},
        { section: 'personal', items: [
          { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null }
        ]}
      ],
      'board_vp': [
        { section: 'board_activities', items: [
          { key: 'board_portal', icon: 'fa-building-columns', link: 'ceo_board.html', badge: 'board' },
          { key: 'governance_oversight', icon: 'fa-gavel', link: 'ceo_governance.html', badge: null }
        ]},
        { section: 'strategic_oversight', items: [
          { key: 'strategic_initiatives', icon: 'fa-lightbulb', link: 'ceo_strategy.html', badge: 'initiatives' },
          { key: 'risk_oversight', icon: 'fa-triangle-exclamation', link: 'ceo_risks.html', badge: null }
        ]},
        { section: 'reporting', items: [
          { key: 'board_reports', icon: 'fa-file-lines', link: 'ceo_reports.html', badge: null },
          { key: 'financial_review', icon: 'fa-money-bill-trend-up', link: 'ceo_finance.html', badge: null }
        ]},
        { section: 'communication', items: [
          { key: 'board_communication', icon: 'fa-envelope', link: 'ceo_communication.html', badge: null }
        ]}
      ],
      'shareholder': [
        { section: 'shareholder_services', items: [
          { key: 'my_portfolio', icon: 'fa-briefcase', link: 'index.html', badge: 'portfolio' },
          { key: 'financial_statements', icon: 'fa-file-invoice-dollar', link: 'ceo_finance.html', badge: null }
        ]},
        { section: 'governance_access', items: [
          { key: 'governance_documents', icon: 'fa-folder-open', link: 'ceo_governance.html', badge: null },
          { key: 'board_meetings', icon: 'fa-calendar-days', link: 'ceo_board.html', badge: null }
        ]},
        { section: 'reports_disclosures', items: [
          { key: 'annual_reports', icon: 'fa-book', link: 'ceo_reports.html', badge: null },
          { key: 'announcements', icon: 'fa-bullhorn', link: 'ceo_broadcast.html', badge: null }
        ]},
        { section: 'personal', items: [
          { key: 'my_profile', icon: 'fa-id-card', link: 'profile.html', badge: null }
        ]}
      ]
    }
  },

  // 🔧 CTO PORTAL
  cto: {
    defaultRole: 'cto',
    storageKey: 'cto_activeRole',
    notificationKey: 'cto_notifications',
    brandIcon: 'fa-microchip',
    brandName: 'CTO Control',
    brandColor: 'brandRed',
    
    roles: {
      'cto': { 
        ar: 'المدير التقني التنفيذي', 
        en: 'Chief Technology Officer',
        desc: { ar: 'الإشراف على البنية التحتية والأنظمة', en: 'IT Infrastructure & Systems Oversight' },
        icon: 'fa-microchip'
      }
    },

    menus: {
      'cto': [
        { section: 'it_infrastructure', items: [
          { key: 'dashboard', icon: 'fa-chart-network', link: 'index.html', badge: 'live' },
          { key: 'servers', icon: 'fa-server', link: 'cto_servers.html', badge: 'cloud' },
          { key: 'monitoring', icon: 'fa-microchip', link: 'cto_monitoring.html', badge: null },
          { key: 'soc_ops', icon: 'fa-shield-halved', link: 'cto_soc.html', badge: 'security' }
        ]},
        { section: 'telecom_systems', items: [
          { key: 'pbx_mgmt', icon: 'fa-phone-volume', link: 'cto_pbx.html', badge: null },
          { key: 'extensions', icon: 'fa-tty', link: 'cto_extensions.html', badge: null },
          { key: 'call_logs', icon: 'fa-list-ol', link: 'cto_call_logs.html', badge: null }
        ]},
        { section: 'ops_governance', items: [
          { key: 'iam_access', icon: 'fa-user-lock', link: 'cto_iam.html', badge: 'iam' },
          { key: 'projects', icon: 'fa-diagram-project', link: 'cto_projects.html', badge: 'active' },
          { key: 'it_assets', icon: 'fa-boxes-stacked', link: 'cto_assets.html', badge: null }
        ]},
        { section: 'support_personal', items: [
          { key: 'it_support', icon: 'fa-headset', link: 'cto_support.html', badge: 'tickets' },
          { key: 'my_profile', icon: 'fa-user-gear', link: 'profile.html', badge: null }
        ]}
      ]
    }
  },

  // 👤 EMPLOYEE PORTAL
  employee: {
    defaultRole: 'employee',
    storageKey: 'employee_activeRole',
    notificationKey: 'employee_notifications',
    brandIcon: 'fa-user-tie',
    brandName: 'Self-Service',
    brandColor: 'brandRed',
    
    roles: {
      'employee': { 
        ar: 'بوابة الموظف', 
        en: 'Employee Portal',
        desc: { ar: 'الخدمات الذاتية والدعم', en: 'Self-Service & Support' },
        icon: 'fa-user-tie'
      }
    },

    menus: {
      'employee': [
        { section: 'self_service', items: [
          { key: 'dashboard', icon: 'fa-house-user', link: 'index.html', badge: 'home' },
          { key: 'my_requests', icon: 'fa-code-pull-request', link: 'requests.html', badge: '2' },
          { key: 'salary_slips', icon: 'fa-money-check-dollar', link: 'finance.html', badge: null }
        ]},
        { section: 'support_docs', items: [
          { key: 'it_support', icon: 'fa-headset', link: 'support.html', badge: 'tech' },
          { key: 'company_policies', icon: 'fa-book-open-reader', link: 'policies.html', badge: null }
        ]},
        { section: 'personal', items: [
          { key: 'my_profile', icon: 'fa-user-gear', link: 'profile.html', badge: null }
        ]}
      ]
    }
  },

  // 💼 SALES PORTAL
  sales: {
    defaultRole: 'sales_manager',
    storageKey: 'sales_activeRole',
    notificationKey: 'sales_notifications',
    brandIcon: 'fa-chart-line',
    brandName: 'Sales',
    brandColor: 'brandRed',
    
    roles: {
      'sales_manager': { 
        ar: 'مدير المبيعات', 
        en: 'Sales Manager',
        desc: { ar: 'إدارة المبيعات والعملاء', en: 'Sales & Client Management' },
        icon: 'fa-chart-line'
      }
    },

    menus: {
      'sales_manager': [
        { section: 'sales_overview', items: [
          { key: 'dashboard', icon: 'fa-gauge-high', link: 'index.html', badge: 'live' }
        ]},
        { section: 'sales_operations', items: [
          { key: 'sales_pipeline', icon: 'fa-filter', link: 'sales_pipeline.html', badge: 'active' },
          { key: 'sales_quotes', icon: 'fa-file-invoice-dollar', link: 'sales_quotes.html', badge: null },
          { key: 'sales_activities', icon: 'fa-calendar-days', link: 'sales_activities.html', badge: null }
        ]},
        { section: 'client_management', items: [
          { key: 'sales_clients', icon: 'fa-users', link: 'sales_clients.html', badge: 'clients' }
        ]},
        { section: 'personal', items: [
          { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null }
        ]}
      ]
    }
  },

  // 📊 SHAREHOLDER PORTAL
  shareholder: {
    defaultRole: 'shareholder',
    storageKey: 'shareholder_activeRole',
    notificationKey: 'shareholder_notifications',
    brandIcon: 'fa-building-columns',
    brandName: 'Shareholder',
    brandColor: 'brandRed',
    
    roles: {
      'shareholder': { 
        ar: 'مساهم', 
        en: 'Shareholder',
        desc: { ar: 'بوابة المساهمين', en: 'Shareholder Portal' },
        icon: 'fa-user-tie'
      }
    },

    menus: {
      'shareholder': [
        { section: 'shareholder_overview', items: [
          { key: 'dashboard', icon: 'fa-gauge-high', link: 'index.html', badge: 'live' }
        ]},
        { section: 'shareholder_services', items: [
          { key: 'certificates', icon: 'fa-certificate', link: 'certificates.html', badge: null },
          { key: 'dividends', icon: 'fa-money-bill-trend-up', link: 'dividends.html', badge: null },
          { key: 'voting', icon: 'fa-check-to-slot', link: 'voting.html', badge: 'vote' }
        ]},
        { section: 'shareholder_requests', items: [
          { key: 'requests', icon: 'fa-inbox', link: 'requests.html', badge: null }
        ]},
        { section: 'personal', items: [
          { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null }
        ]}
      ]
    }
  },

  // 👥 HR PORTAL
  hr: {
    defaultRole: 'hr_manager',
    storageKey: 'hr_activeRole',
    notificationKey: 'hr_notifications',
    brandIcon: 'fa-users',
    brandName: 'HR',
    brandColor: 'brandRed',
    
    roles: {
      'hr_manager': {
        ar: 'مسؤول الموارد البشرية', 
        en: 'HR Manager',
        desc: { ar: 'الإشراف الإداري وشؤون الموظفين', en: 'Administrative supervision and personnel affairs' },
        icon: 'fa-user-tie'
      }
    },

    menus: {
      'hr_manager': [
        { section: 'hr_control', items: [
          { key: 'dashboard', icon: 'fa-chart-pie', link: 'index.html', badge: 'live' },
          { key: 'approvals', icon: 'fa-file-signature', link: 'hr_approvals.html', badge: 'urgent' },
          { key: 'internal_chat', icon: 'fa-comments', link: 'internal_chat.html', badge: null }
        ]},
        { section: 'hr_operations', items: [
          { key: 'employees', icon: 'fa-users', link: 'hr_employees.html', badge: null },
          { key: 'attendance', icon: 'fa-calendar-check', link: 'hr_attendance.html', badge: null },
          { key: 'leaves', icon: 'fa-umbrella-beach', link: 'hr_leaves.html', badge: null },
          { key: 'payroll', icon: 'fa-money-bill-wave', link: 'hr_payroll.html', badge: null }
        ]},
        { section: 'hr_management', items: [
          { key: 'recruitment', icon: 'fa-user-plus', link: 'hr_recruitment.html', badge: null },
          { key: 'contracts', icon: 'fa-file-contract', link: 'hr_contracts.html', badge: null },
          { key: 'org_structure', icon: 'fa-sitemap', link: 'hr_org.html', badge: null }
        ]},
        { section: 'hr_services', items: [
          { key: 'assets', icon: 'fa-box', link: 'hr_assets.html', badge: null },
          { key: 'logistics', icon: 'fa-truck', link: 'hr_logistics.html', badge: null },
          { key: 'trips', icon: 'fa-plane', link: 'hr_trips.html', badge: null },
          { key: 'purchases', icon: 'fa-shopping-cart', link: 'hr_purchases.html', badge: null }
        ]},
        { section: 'hr_compliance', items: [
          { key: 'govt_affairs', icon: 'fa-landmark', link: 'hr_govt.html', badge: null },
          { key: 'partners', icon: 'fa-handshake', link: 'hr_partners.html', badge: null }
        ]},
        { section: 'personal', items: [
          { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null }
        ]}
      ]
    }
  },

  // 💰 FINANCE PORTAL
  finance: {
    defaultRole: 'CFO',
    storageKey: 'finance_activeRole',
    notificationKey: 'finance_notifications',
    brandIcon: 'fa-calculator',
    brandName: 'Finance',
    brandColor: 'brandRed',
    
    roles: {
      'CFO': { 
        ar: 'المدير المالي', 
        en: 'Chief Financial Officer',
        desc: { ar: 'الإشراف المالي والرقابة', en: 'Financial Oversight & Control' },
        icon: 'fa-calculator'
      }
    },

    menus: {
      'CFO': [
        { section: 'financial_control', items: [
          { key: 'dashboard', icon: 'fa-chart-pie', link: 'index.html', badge: 'live' },
          { key: 'approvals', icon: 'fa-file-signature', link: 'approvals.html', badge: 'urgent' },
          { key: 'internal_chat', icon: 'fa-comments', link: 'internal_chat.html', badge: null }
        ]},
        { section: 'general_ledger', items: [
          { key: 'gl_journal', icon: 'fa-book', link: 'gl_journal.html', badge: null },
          { key: 'gl_coa', icon: 'fa-list-ol', link: 'gl_coa.html', badge: null },
          { key: 'gl_cost_centers', icon: 'fa-sitemap', link: 'gl_cost_centers.html', badge: null }
        ]},
        { section: 'accounts_payable', items: [
          { key: 'ap_bills', icon: 'fa-file-invoice', link: 'ap_bills.html', badge: null },
          { key: 'ap_payments', icon: 'fa-money-bill-transfer', link: 'ap_payments.html', badge: null },
          { key: 'ap_vendors', icon: 'fa-address-book', link: 'ap_vendors.html', badge: null }
        ]},
        { section: 'accounts_receivable', items: [
          { key: 'ar_invoices', icon: 'fa-file-invoice-dollar', link: 'ar_invoices.html', badge: null },
          { key: 'ar_receipts', icon: 'fa-receipt', link: 'ar_receipts.html', badge: null }
        ]},
        { section: 'inventory_assets', items: [
          { key: 'inv_dashboard', icon: 'fa-boxes-stacked', link: 'inv_dashboard.html', badge: null },
          { key: 'inv_assets', icon: 'fa-couch', link: 'inv_assets.html', badge: null }
        ]},
        { section: 'reports_tax', items: [
          { key: 'rep_statements', icon: 'fa-file-medical', link: 'rep_statements.html', badge: null },
          { key: 'rep_budget', icon: 'fa-scale-balanced', link: 'rep_budget.html', badge: null },
          { key: 'rep_tax', icon: 'fa-calculator', link: 'rep_tax.html', badge: 'VAT' }
        ]},
        { section: 'settings_personal', items: [
          { key: 'fin_settings', icon: 'fa-gears', link: 'fin_settings.html', badge: null },
          { key: 'my_profile', icon: 'fa-user-tie', link: 'profile.html', badge: null }
        ]}
      ]
    }
  }
};

// ============================================================================
// UNIVERSAL TRANSLATIONS - تطبق على جميع البوابات
// ============================================================================
const UNIVERSAL_TRANSLATIONS = {
  ar: {
    // Sections - Common
    core_system: 'النظام الأساسي',
    infrastructure: 'البنية التحتية',
    communication: 'الاتصالات',
    board_operations: 'عمليات المجلس',
    governance_docs: 'وثائق الحوكمة',
    audit_oversight: 'الرقابة والتدقيق',
    compliance_tasks: 'مهام الامتثال',
    shareholders: 'المساهمين',
    personal: 'الحساب الشخصي',
    grc_compliance: 'الحوكمة والامتثال',
    hr_governance: 'حوكمة الموارد البشرية',
    workflow: 'سير العمل',
    executive_dashboard: 'لوحة القيادة التنفيذية',
    financial_oversight: 'الرقابة المالية',
    governance_compliance: 'الحوكمة والامتثال',
    board_activities: 'أنشطة المجلس',
    strategic_oversight: 'الإشراف الاستراتيجي',
    reporting: 'التقارير',
    shareholder_services: 'خدمات المساهمين',
    governance_access: 'الوصول للحوكمة',
    reports_disclosures: 'التقارير والإفصاحات',
    it_infrastructure: 'البنية التحتية التقنية',
    telecom_systems: 'أنظمة الاتصالات',
    ops_governance: 'العمليات والحوكمة',
    support_personal: 'الدعم والحساب',
    self_service: 'الخدمات الذاتية',
    support_docs: 'الدعم والمعرفة',
    financial_control: 'الرقابة المالية',
    general_ledger: 'الأستاذ العام',
    accounts_payable: 'الحسابات الدائنة',
    accounts_receivable: 'الحسابات المدينة',
    inventory_assets: 'المخزون والأصول',
    reports_tax: 'التقارير والضرائب',
    settings_personal: 'الإعدادات والحساب',
    audit_overview: 'نظرة عامة',
    audit_execution: 'تنفيذ التدقيق',
    committee_overview: 'نظرة عامة للجنة',
    oversight: 'الإشراف والرقابة',
    reports_review: 'مراجعة التقارير',
    sales_overview: 'نظرة عامة',
    sales_operations: 'عمليات المبيعات',
    client_management: 'إدارة العملاء',
    shareholder_overview: 'نظرة عامة',
    shareholder_services: 'خدمات المساهمين',
    shareholder_requests: 'الطلبات',
    hr_control: 'الرقابة الإدارية',
    hr_operations: 'العمليات اليومية',
    hr_management: 'إدارة الموارد البشرية',
    hr_services: 'الخدمات الإدارية',
    hr_compliance: 'الامتثال والشراكات',
    
    // Menu Items - Common
    dashboard: 'لوحة القيادة',
    users_mgmt: 'إدارة المستخدمين',
    admin_settings: 'إعدادات النظام',
    it_systems: 'الأنظمة التقنية',
    system_audit: 'سجل التدقيق',
    internal_chat: 'المحادثات الداخلية',
    circulars_admin: 'التعاميم الإدارية',
    board_portal: 'بوابة المجلس',
    committees_mgmt: 'إدارة اللجان',
    general_assembly: 'الجمعية العمومية',
    policies_library: 'مكتبة السياسات',
    board_circulars: 'تعاميم المجلس',
    audit_dashboard: 'لوحة التدقيق',
    financial_review: 'المراجعة المالية',
    procurement_control: 'إدارة المشتريات',
    compliance_check: 'فحص الامتثال',
    task_tracker: 'متابعة المهام',
    shareholders_db: 'قاعدة المساهمين',
    ga_access: 'الجمعية العمومية',
    my_profile: 'الملف الشخصي',
    ir_circulars: 'التعاميم',
    compliance_dashboard: 'لوحة الامتثال',
    doa_authority: 'مصفوفة الصلاحيات',
    policies_control: 'ضبط السياسات',
    hr_compliance: 'امتثال الموارد البشرية',
    audit_reports: 'تقارير التدقيق',
    grc_tasks: 'مهام GRC',
    executive_overview: 'نظرة تنفيذية شاملة',
    strategic_planning: 'التخطيط الاستراتيجي',
    financial_performance: 'الأداء المالي',
    executive_reports: 'التقارير التنفيذية',
    governance_framework: 'إطار الحوكمة',
    risk_management: 'إدارة المخاطر',
    company_broadcast: 'البث المؤسسي',
    internal_communication: 'التواصل الداخلي',
    feedback_center: 'مركز التغذية الراجعة',
    governance_oversight: 'الإشراف على الحوكمة',
    strategic_initiatives: 'المبادرات الاستراتيجية',
    risk_oversight: 'الإشراف على المخاطر',
    board_reports: 'تقارير المجلس',
    board_communication: 'تواصل المجلس',
    my_portfolio: 'محفظتي الاستثمارية',
    financial_statements: 'القوائم المالية',
    governance_documents: 'وثائق الحوكمة',
    board_meetings: 'اجتماعات المجلس',
    annual_reports: 'التقارير السنوية',
    announcements: 'الإعلانات',
    servers: 'إدارة السيرفرات',
    monitoring: 'مراقبة الأنظمة',
    soc_ops: 'مركز العمليات الأمنية',
    pbx_mgmt: 'إدارة السنترال',
    extensions: 'التحويلات الداخلية',
    call_logs: 'سجلات المكالمات',
    iam_access: 'إدارة الهوية والوصول',
    projects: 'المشاريع التقنية',
    it_assets: 'الأصول التقنية',
    it_support: 'الدعم الفني',
    my_requests: 'طلباتي',
    salary_slips: 'مسير الرواتب',
    company_policies: 'السياسات واللوائح',
    approvals: 'الاعتمادات',
    gl_journal: 'قيود اليومية',
    gl_coa: 'دليل الحسابات',
    gl_cost_centers: 'مراكز التكلفة',
    ap_bills: 'الفواتير الواردة',
    ap_payments: 'أوامر الصرف',
    ap_vendors: 'الموردين',
    ar_invoices: 'فواتير المبيعات',
    ar_receipts: 'سندات القبض',
    inv_dashboard: 'لوحة المخزون',
    inv_assets: 'سجل الأصول',
    rep_statements: 'القوائم المالية',
    rep_budget: 'الموازنة التقديرية',
    rep_tax: 'الإقرارات الضريبية',
    fin_settings: 'الإعدادات المالية',
    annual_audit_plan: 'خطة التدقيق السنوية',
    observations_log: 'سجل الملاحظات',
    risk_assessment: 'تقييم المخاطر',
    compliance_monitoring: 'مراقبة الامتثال',
    quarterly_reports: 'التقارير الربع سنوية',
    findings_database: 'قاعدة بيانات النتائج',
    committee_dashboard: 'لوحة اللجنة',
    audit_plan_review: 'مراجعة خطة التدقيق',
    critical_observations: 'الملاحظات الحرجة',
    risk_reports: 'تقارير المخاطر',
    compliance_status: 'حالة الامتثال',
    external_audit: 'التدقيق الخارجي',
    committee_communication: 'تواصل اللجنة',
    meetings: 'الاجتماعات',
    sales_pipeline: 'خط المبيعات',
    sales_quotes: 'عروض الأسعار',
    sales_activities: 'أنشطة المبيعات',
    sales_clients: 'العملاء',
    certificates: 'الشهادات',
    dividends: 'الأرباح الموزعة',
    voting: 'التصويت',
    requests: 'الطلبات',
    employees: 'الموظفين',
    attendance: 'الحضور والانصراف',
    leaves: 'الإجازات',
    payroll: 'الرواتب',
    recruitment: 'التوظيف',
    contracts: 'العقود',
    org_structure: 'الهيكل التنظيمي',
    assets: 'الأصول',
    logistics: 'اللوجستيات',
    trips: 'الرحلات',
    purchases: 'المشتريات',
    govt_affairs: 'الشؤون الحكومية',
    partners: 'الشراكات',
    
    // UI Elements
    switchWorkspace: 'تبديل بيئة العمل',
    selectRole: 'اختر الدور المناسب لمهامك الحالية',
    notifications: 'الإشعارات',
    noNotifications: 'لا توجد إشعارات جديدة',
    markAllRead: 'تعليم الكل كمقروء',
    viewAll: 'عرض الكل',
    logout: 'تسجيل الخروج',
    logoutConfirm: 'هل أنت متأكد من تسجيل الخروج؟',
    poweredBy: 'تطوير',
    aymanDev: 'أيمن المغربي'
  },
  en: {
    // Sections - Common (English translations)
    core_system: 'Core System',
    infrastructure: 'Infrastructure',
    communication: 'Communications',
    board_operations: 'Board Operations',
    governance_docs: 'Governance Documents',
    audit_oversight: 'Audit & Oversight',
    compliance_tasks: 'Compliance Tasks',
    shareholders: 'Shareholders',
    personal: 'Personal',
    grc_compliance: 'GRC & Compliance',
    hr_governance: 'HR Governance',
    workflow: 'Workflow',
    executive_dashboard: 'Executive Dashboard',
    financial_oversight: 'Financial Oversight',
    governance_compliance: 'Governance & Compliance',
    board_activities: 'Board Activities',
    strategic_oversight: 'Strategic Oversight',
    reporting: 'Reporting',
    shareholder_services: 'Shareholder Services',
    governance_access: 'Governance Access',
    reports_disclosures: 'Reports & Disclosures',
    it_infrastructure: 'IT Infrastructure',
    telecom_systems: 'Telecom Systems',
    ops_governance: 'Ops & Governance',
    support_personal: 'Support & Personal',
    self_service: 'Self Service',
    support_docs: 'Support & Docs',
    financial_control: 'Financial Control',
    general_ledger: 'Ledger',
    accounts_payable: 'Accounts Payable',
    accounts_receivable: 'Accounts Receivable',
    inventory_assets: 'Inventory & Assets',
    reports_tax: 'Reports & Tax',
    settings_personal: 'Settings & Personal',
    audit_overview: 'Overview',
    audit_execution: 'Audit Execution',
    committee_overview: 'Committee Overview',
    oversight: 'Oversight & Control',
    reports_review: 'Reports Review',
    sales_overview: 'Overview',
    sales_operations: 'Sales Operations',
    client_management: 'Client Management',
    shareholder_overview: 'Overview',
    shareholder_services: 'Shareholder Services',
    shareholder_requests: 'Requests',
    hr_control: 'HR Control',
    hr_operations: 'Daily Operations',
    hr_management: 'HR Management',
    hr_services: 'Administrative Services',
    hr_compliance: 'Compliance & Partnerships',
    
    // Menu Items - Common (English translations)
    dashboard: 'Dashboard',
    users_mgmt: 'User Management',
    admin_settings: 'System Settings',
    it_systems: 'IT Systems',
    system_audit: 'Audit Log',
    internal_chat: 'Internal Chat',
    circulars_admin: 'Admin Circulars',
    board_portal: 'Board Portal',
    committees_mgmt: 'Committees',
    general_assembly: 'General Assembly',
    policies_library: 'Policy Library',
    board_circulars: 'Board Circulars',
    audit_dashboard: 'Audit Dashboard',
    financial_review: 'Financial Review',
    procurement_control: 'Procurement',
    compliance_check: 'Compliance Check',
    task_tracker: 'Task Tracker',
    shareholders_db: 'Shareholders DB',
    ga_access: 'General Assembly',
    my_profile: 'My Profile',
    ir_circulars: 'Circulars',
    compliance_dashboard: 'Compliance Dashboard',
    doa_authority: 'DOA Matrix',
    policies_control: 'Policy Control',
    hr_compliance: 'HR Compliance',
    audit_reports: 'Audit Reports',
    grc_tasks: 'GRC Tasks',
    executive_overview: 'Executive Overview',
    strategic_planning: 'Strategic Planning',
    financial_performance: 'Financial Performance',
    executive_reports: 'Executive Reports',
    governance_framework: 'Governance Framework',
    risk_management: 'Risk Management',
    company_broadcast: 'Company Broadcast',
    internal_communication: 'Internal Communication',
    feedback_center: 'Feedback Center',
    governance_oversight: 'Governance Oversight',
    strategic_initiatives: 'Strategic Initiatives',
    risk_oversight: 'Risk Oversight',
    board_reports: 'Board Reports',
    board_communication: 'Board Communication',
    my_portfolio: 'My Portfolio',
    financial_statements: 'Financial Statements',
    governance_documents: 'Governance Documents',
    board_meetings: 'Board Meetings',
    annual_reports: 'Annual Reports',
    announcements: 'Announcements',
    servers: 'Servers Mgmt',
    monitoring: 'System Monitoring',
    soc_ops: 'SOC Operations',
    pbx_mgmt: 'PBX Management',
    extensions: 'Extensions',
    call_logs: 'Call Logs',
    iam_access: 'IAM Access',
    projects: 'IT Projects',
    it_assets: 'IT Assets',
    it_support: 'IT Support',
    my_requests: 'My Requests',
    salary_slips: 'Pay Slips',
    company_policies: 'Policies',
    approvals: 'Approvals',
    gl_journal: 'GL Journal',
    gl_coa: 'Chart of Accounts',
    gl_cost_centers: 'Cost Centers',
    ap_bills: 'Bills',
    ap_payments: 'Payments',
    ap_vendors: 'Vendors',
    ar_invoices: 'Invoices',
    ar_receipts: 'Receipts',
    inv_dashboard: 'Inventory Dashboard',
    inv_assets: 'Assets',
    rep_statements: 'Financial Statements',
    rep_budget: 'Budget',
    rep_tax: 'Tax Reports',
    fin_settings: 'Finance Settings',
    annual_audit_plan: 'Annual Audit Plan',
    observations_log: 'Observations Log',
    risk_assessment: 'Risk Assessment',
    compliance_monitoring: 'Compliance Monitoring',
    quarterly_reports: 'Quarterly Reports',
    findings_database: 'Findings Database',
    committee_dashboard: 'Committee Dashboard',
    audit_plan_review: 'Audit Plan Review',
    critical_observations: 'Critical Observations',
    risk_reports: 'Risk Reports',
    compliance_status: 'Compliance Status',
    external_audit: 'External Audit',
    committee_communication: 'Committee Communication',
    meetings: 'Meetings',
    sales_pipeline: 'Sales Pipeline',
    sales_quotes: 'Quotes',
    sales_activities: 'Activities',
    sales_clients: 'Clients',
    certificates: 'Certificates',
    dividends: 'Dividends',
    voting: 'Voting',
    requests: 'Requests',
    employees: 'Employees',
    attendance: 'Attendance',
    leaves: 'Leaves',
    payroll: 'Payroll',
    recruitment: 'Recruitment',
    contracts: 'Contracts',
    org_structure: 'Organization Structure',
    assets: 'Assets',
    logistics: 'Logistics',
    trips: 'Trips',
    purchases: 'Purchases',
    govt_affairs: 'Government Affairs',
    partners: 'Partners',
    
    // UI Elements
    switchWorkspace: 'Switch Workspace',
    selectRole: 'Select the appropriate role for your current tasks',
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    markAllRead: 'Mark all as read',
    viewAll: 'View All',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to logout?',
    poweredBy: 'Developed by',
    aymanDev: 'Ayman Almaghrabi'
  }
};

// ============================================================================
// MAIN LAYOUT ENGINE
// ============================================================================
const Layout = (function() {
  
  // Detect portal type from URL (admin, audit, board, ceo, cto, employee, finance, hr, sales, shareholder)
  const PORTAL_TYPE = (function() {
    const path = window.location.pathname;
    if (path.includes('/admin/')) return 'admin';
    if (path.includes('/audit/')) return 'audit';
    if (path.includes('/board/')) return 'board';
    if (path.includes('/ceo/')) return 'ceo';
    if (path.includes('/cto/')) return 'cto';
    if (path.includes('/employee/')) return 'employee';
    if (path.includes('/finance/')) return 'finance';
    if (path.includes('/hr/')) return 'hr';
    if (path.includes('/sales/')) return 'sales';
    if (path.includes('/shareholder/')) return 'shareholder';
    return 'admin'; // Default fallback
  })();

  const CONFIG = PORTAL_CONFIG[PORTAL_TYPE];
  
  let _state = {
    currentUser: null,
    activeRole: CONFIG.defaultRole,
    isInitialized: false,
    sidebarOpen: false,
    notifications: [],
    unreadCount: 0
  };

  // ==========================================
  // LANGUAGE SYSTEM
  // ==========================================
  function getCurrentLang() {
    return localStorage.getItem('lang') || 'ar';
  }

  function setLanguage(lang) {
    if (!['ar', 'en'].includes(lang)) return;
    
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    const mainContent = document.querySelector('.main-content-wrapper');
    if (mainContent) {
      if (lang === 'ar') {
        mainContent.classList.remove('md:ml-72');
        mainContent.classList.add('md:mr-72');
      } else {
        mainContent.classList.remove('md:mr-72');
        mainContent.classList.add('md:ml-72');
      }
    }
    
    renderSidebar();
    renderHeader();
    
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    
    if (typeof window.updateContent === 'function') {
      setTimeout(() => window.updateContent(), 100);
    }
    
    if (window.I18n && typeof I18n.setLanguage === 'function') {
      I18n.setLanguage(lang);
    }
    
    if (window.Toast) {
      const msg = lang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English';
      Toast.success(msg);
    }
    
    console.log(`🌐 Language changed to: ${lang}`);
  }

  function t(key) {
    const lang = getCurrentLang();
    return UNIVERSAL_TRANSLATIONS[lang]?.[key] || key;
  }

  // ==========================================
  // NOTIFICATIONS SYSTEM
  // ==========================================
  function loadNotifications() {
    const stored = localStorage.getItem(CONFIG.notificationKey);
    if (stored) {
      _state.notifications = JSON.parse(stored);
    } else {
      _state.notifications = [
        {
          id: 'N001',
          type: 'approval',
          icon: 'fa-file-signature',
          color: 'orange',
          title: { ar: 'اعتماد مطلوب', en: 'Approval Required' },
          body: { ar: 'مسودة بانتظار الموافقة النهائية', en: 'Draft awaiting final approval' },
          time: new Date(Date.now() - 1000 * 60 * 15),
          read: false,
          link: 'policies.html'
        }
      ];
    }
    
    _state.unreadCount = _state.notifications.filter(n => !n.read).length;
  }

  function markNotificationRead(id) {
    const notif = _state.notifications.find(n => n.id === id);
    if (notif && !notif.read) {
      notif.read = true;
      _state.unreadCount--;
      saveNotifications();
      renderHeader();
    }
  }

  function markAllRead() {
    _state.notifications.forEach(n => n.read = true);
    _state.unreadCount = 0;
    saveNotifications();
    renderHeader();
    
    if (window.Toast) {
      Toast.success(t('markAllRead'));
    }
  }

  function saveNotifications() {
    localStorage.setItem(CONFIG.notificationKey, JSON.stringify(_state.notifications));
  }

  function getTimeAgo(date) {
    const lang = getCurrentLang();
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return lang === 'ar' ? 'الآن' : 'Now';
    if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      return lang === 'ar' ? `منذ ${mins} دقيقة` : `${mins}m ago`;
    }
    if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return lang === 'ar' ? `منذ ${hours} ساعة` : `${hours}h ago`;
    }
    const days = Math.floor(seconds / 86400);
    return lang === 'ar' ? `منذ ${days} يوم` : `${days}d ago`;
  }

  // ==========================================
  // RENDER SIDEBAR
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const lang = getCurrentLang();
    const isRTL = lang === 'ar';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const activeMenu = CONFIG.menus[_state.activeRole] || CONFIG.menus[CONFIG.defaultRole];

    let menuHTML = '';
    activeMenu.forEach(group => {
      const sectionLabel = t(group.section);
      
      menuHTML += `
        <div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          ${sectionLabel}
        </div>
      `;
      
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        const label = t(item.key);
        
        const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group mb-1";
        const activeClass = "bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30";
        const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed dark:hover:text-red-400";

        let badgeHTML = '';
        if (item.badge) {
          const badgeStyles = {
            'core': 'bg-blue-500', 'new': 'bg-green-500 animate-pulse', 
            'tech': 'bg-purple-500', 'primary': 'bg-amber-500', 
            'assembly': 'bg-indigo-500', 'audit': 'bg-red-500',
            'orders': 'bg-orange-500', 'active': 'bg-teal-500',
            'investors': 'bg-pink-500', 'grc': 'bg-cyan-500',
            'authority': 'bg-violet-500', 'hr': 'bg-emerald-500',
            'live': 'bg-red-500 animate-pulse', 'strategic': 'bg-purple-500',
            'financial': 'bg-green-500', 'compliance': 'bg-blue-500',
            'risks': 'bg-orange-500', 'broadcast': 'bg-indigo-500',
            'board': 'bg-amber-500', 'initiatives': 'bg-violet-500',
            'portfolio': 'bg-emerald-500', 'cloud': 'bg-sky-500',
            'security': 'bg-red-600', 'iam': 'bg-purple-600',
            'tickets': 'bg-orange-600', 'home': 'bg-blue-400',
            'urgent': 'bg-red-600 animate-pulse', 'important': 'bg-orange-600',
            'critical': 'bg-red-700'
          };
          const badgeClass = badgeStyles[item.badge] || 'bg-slate-400';
          badgeHTML = `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded ${badgeClass} text-white uppercase tracking-wider">${item.badge}</span>`;
        }

        menuHTML += `
          <a href="${item.link}" class="${baseClass} ${isActive ? activeClass : inactiveClass}">
            <div class="w-5 text-center transition-transform group-hover:scale-110">
              <i class="fa-solid ${item.icon}"></i>
            </div>
            <span class="flex-1 truncate">${label}</span>
            ${badgeHTML}
            ${isActive ? '<div class="w-1.5 h-1.5 rounded-full bg-white"></div>' : ''}
          </a>
        `;
      });
    });

    const user = _state.currentUser;
    const displayName = user?.displayName || user?.name || (lang === 'ar' ? 'أيمن المغربي' : 'Ayman Almaghrabi');
    const roleLabel = CONFIG.roles[_state.activeRole][lang];

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-2xl">
        
        <!-- Logo -->
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-gradient-to-${isRTL ? 'l' : 'r'} from-slate-50 to-transparent dark:from-slate-900/50">
          <div class="flex items-center gap-3 w-full">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-${CONFIG.brandColor} to-red-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-${CONFIG.brandColor}/30">
              <i class="fa-solid ${CONFIG.brandIcon}"></i>
            </div>
            <div class="overflow-hidden">
              <h1 class="font-bold text-base text-slate-800 dark:text-white truncate">AndroGov</h1>
              <p class="text-[10px] text-${CONFIG.brandColor} font-bold uppercase tracking-widest truncate">${CONFIG.brandName}</p>
            </div>
          </div>
        </div>
        
        <!-- User Card -->
        <div class="p-4 shrink-0">
          <div class="relative group cursor-pointer">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
              <img src="${user?.avatar || '../photo/admin.jpg'}" 
                   class="w-11 h-11 rounded-full border-2 border-white dark:border-slate-600 object-cover shadow-md" 
                   onerror="this.src='https://ui-avatars.com/api/?name=User&background=DC2626&color=fff&bold=true'">
              <div class="overflow-hidden flex-1 min-w-0">
                <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${displayName}</p>
                <p class="text-[10px] text-${CONFIG.brandColor} font-bold truncate uppercase tracking-tight">${roleLabel}</p>
              </div>
              <i class="fa-solid fa-chevron-down text-slate-400 text-xs"></i>
            </div>
            <div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <a href="profile.html" class="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <i class="fa-solid fa-user-circle text-${CONFIG.brandColor}"></i>
                <span class="text-xs font-medium">${t('my_profile')}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 custom-scroll">
          ${menuHTML}
        </nav>
        
        <!-- Footer -->
        <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <p class="text-[10px] text-slate-400 font-medium">© 2026 Andromeda IT</p>
          <p class="text-[9px] text-slate-300 dark:text-slate-600 mt-1">${t('poweredBy')} ${t('aymanDev')}</p>
        </div>
      </aside>
    `;
  }

  // ==========================================
  // RENDER HEADER
  // ==========================================
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const lang = getCurrentLang();
    const isRTL = lang === 'ar';
    const isDark = document.documentElement.classList.contains('dark');

    // Only show role switcher if multiple roles exist
    const hasMultipleRoles = Object.keys(CONFIG.roles).length > 1;

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        
        <div class="flex items-center gap-4">
          <!-- Mobile Menu -->
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500 dark:text-slate-200 hover:text-${CONFIG.brandColor} transition-colors">
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
          
          ${hasMultipleRoles ? `
          <!-- Role Switcher -->
          <div class="relative group">
            <button class="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:border-${CONFIG.brandColor} dark:hover:border-red-500 transition-all shadow-sm hover:shadow-md">
              <i class="fa-solid fa-repeat text-${CONFIG.brandColor} animate-pulse"></i>
              <span class="hidden sm:inline text-slate-700 dark:text-slate-200">${CONFIG.roles[_state.activeRole][lang]}</span>
              <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 transition-transform group-hover:rotate-180"></i>
            </button>
            
            <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-3 w-80 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div class="p-4 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-${CONFIG.brandColor} to-red-600">
                <p class="text-xs font-bold text-white/90 uppercase tracking-widest">${t('switchWorkspace')}</p>
                <p class="text-[10px] text-white/70 mt-1">${t('selectRole')}</p>
              </div>
              <div class="p-2 max-h-96 overflow-y-auto custom-scroll">
                ${Object.entries(CONFIG.roles).map(([roleKey, labels]) => `
                  <button onclick="Layout.switchRole('${roleKey}')" 
                          class="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all ${roleKey === _state.activeRole ? 'bg-red-50 dark:bg-red-900/20 border-2 border-brandRed/30' : 'border-2 border-transparent'} mb-2">
                    <div class="w-10 h-10 rounded-lg ${roleKey === _state.activeRole ? 'bg-brandRed text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'} flex items-center justify-center shrink-0">
                      <i class="fa-solid ${labels.icon} text-sm"></i>
                    </div>
                    <div class="flex-1 text-${isRTL ? 'right' : 'left'}">
                      <p class="text-xs font-bold ${roleKey === _state.activeRole ? 'text-brandRed' : 'text-slate-700 dark:text-slate-200'}">${labels[lang]}</p>
                      <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">${labels.desc[lang]}</p>
                    </div>
                    ${roleKey === _state.activeRole ? '<i class="fa-solid fa-check text-brandRed text-sm"></i>' : ''}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
          ` : ''}
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          
          <!-- Notifications -->
          <div class="relative group">
            <button class="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-slate-600 dark:text-slate-300 hover:border-orange-400 transition-all flex items-center justify-center">
              <i class="fa-solid fa-bell"></i>
              ${_state.unreadCount > 0 ? `
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-brandRed text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  ${_state.unreadCount}
                </span>
              ` : ''}
            </button>
            
            <!-- Notifications Dropdown -->
            <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-3 w-96 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div class="p-4 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-orange-500 to-amber-500 flex justify-between items-center">
                <div>
                  <p class="text-sm font-bold text-white">${t('notifications')}</p>
                  <p class="text-[10px] text-white/80">${_state.unreadCount} ${lang === 'ar' ? 'غير مقروءة' : 'unread'}</p>
                </div>
                ${_state.unreadCount > 0 ? `
                  <button onclick="Layout.markAllRead()" class="text-xs text-white/90 hover:text-white underline">
                    ${t('markAllRead')}
                  </button>
                ` : ''}
              </div>
              
              <div class="max-h-96 overflow-y-auto custom-scroll">
                ${_state.notifications.length === 0 ? `
                  <div class="p-8 text-center text-slate-400">
                    <i class="fa-solid fa-bell-slash text-4xl mb-3"></i>
                    <p class="text-sm">${t('noNotifications')}</p>
                  </div>
                ` : _state.notifications.map(notif => {
                  const colorStyles = {
                    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30',
                    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
                    green: 'bg-green-100 text-green-600 dark:bg-green-900/30',
                    red: 'bg-red-100 text-red-600 dark:bg-red-900/30',
                    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
                  };
                  const colorClass = colorStyles[notif.color] || colorStyles.blue;
                  
                  return `
                    <a href="${notif.link}" onclick="Layout.markNotificationRead('${notif.id}')" 
                       class="flex gap-3 p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${!notif.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}">
                      <div class="w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center shrink-0">
                        <i class="fa-solid ${notif.icon}"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs font-bold text-slate-800 dark:text-white truncate">${notif.title[lang]}</p>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${notif.body[lang]}</p>
                        <p class="text-[10px] text-slate-400 mt-1">${getTimeAgo(new Date(notif.time))}</p>
                      </div>
                      ${!notif.read ? '<div class="w-2 h-2 rounded-full bg-brandRed animate-pulse"></div>' : ''}
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Language Switcher -->
          <button onclick="Layout.toggleLanguage()" 
                  class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 hover:border-blue-400 transition-all flex items-center justify-center font-bold text-xs">
            ${lang === 'ar' ? 'EN' : 'ع'}
          </button>
          
          <!-- AI Bot -->
          <button onclick="if(window.AndroBot) AndroBot.toggle()" 
                  class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-brandBlue hover:border-blue-400 transition-all flex items-center justify-center group">
            <i class="fa-solid fa-robot group-hover:animate-bounce"></i>
          </button>
          
          <!-- Theme Toggle -->
          <button onclick="Layout.toggleTheme()" 
                  class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-900/20 text-slate-600 dark:text-yellow-400 hover:border-amber-400 transition-all">
            <i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
          </button>
          
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
          
          <!-- Logout -->
          <button onclick="Layout.logout()" 
                  class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border-2 border-transparent hover:border-red-200">
            <i class="fa-solid fa-power-off"></i> 
            <span class="hidden sm:inline">${t('logout')}</span>
          </button>
        </div>
      </header>
    `;
  }

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
  
  function switchRole(roleKey) {
    if (!CONFIG.roles[roleKey]) {
      console.warn(`⚠️ Invalid role: ${roleKey}`);
      return;
    }
    
    _state.activeRole = roleKey;
    localStorage.setItem(CONFIG.storageKey, roleKey);
    
    renderSidebar();
    renderHeader();
    
    if (window.Toast) {
      const lang = getCurrentLang();
      Toast.success(lang === 'ar' ? 
        `تم التبديل إلى: ${CONFIG.roles[roleKey].ar}` :
        `Switched to: ${CONFIG.roles[roleKey].en}`
      );
    }
    
    console.log(`🔄 Role switched to: ${roleKey}`);
  }

  function toggleLanguage() {
    const currentLang = getCurrentLang();
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  }

  function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    renderHeader();
    
    if (window.Toast) {
      const lang = getCurrentLang();
      const msg = lang === 'ar' ?
        (isDark ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري') :
        (isDark ? 'Dark mode enabled' : 'Light mode enabled');
      Toast.info(msg);
    }
  }

  function logout() {
    const lang = getCurrentLang();
    const confirmMsg = lang === 'ar' ? 
      'هل أنت متأكد من تسجيل الخروج؟' :
      'Are you sure you want to logout?';
      
    if (confirm(confirmMsg)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem(CONFIG.storageKey);
      window.location.href = '../login.html';
    }
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
      sidebar.classList.toggle('translate-x-0');
    }
  }

  function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      setTimeout(() => overlay.classList.add('hidden'), 300);
    }
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  async function init() {
    if (_state.isInitialized) return;

    // Load User Data
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      _state.currentUser = JSON.parse(storedUser);
      
      // Validate Saved Role
      let savedRole = localStorage.getItem(CONFIG.storageKey);
      if (savedRole && CONFIG.roles[savedRole]) {
        _state.activeRole = savedRole;
      } else {
        _state.activeRole = CONFIG.defaultRole;
        localStorage.setItem(CONFIG.storageKey, CONFIG.defaultRole);
      }
    } else {
      // Set default user if not logged in
      _state.currentUser = {
        id: 'USR_001',
        type: PORTAL_TYPE,
        displayName: getCurrentLang() === 'ar' ? 'أيمن المغربي' : 'Ayman Almaghrabi',
        avatar: 'https://ui-avatars.com/api/?name=User&background=DC2626&color=fff&bold=true'
      };
      localStorage.setItem('currentUser', JSON.stringify(_state.currentUser));
    }

    // Load Notifications
    loadNotifications();

    // Render UI
    renderSidebar();
    renderHeader();
    hideLoadingOverlay();

    _state.isInitialized = true;
    console.log(`✅ AndroGov ${PORTAL_TYPE.toUpperCase()} Layout Ready | Role: ${_state.activeRole} | Lang: ${getCurrentLang()}`);
  }

  // ==========================================
  // PUBLIC API
  // ==========================================
  return {
    init,
    renderSidebar,
    renderHeader,
    toggleTheme,
    toggleLanguage,
    setLanguage,
    logout,
    toggleMobileSidebar,
    switchRole,
    markNotificationRead,
    markAllRead,
    getActiveRole: () => _state.activeRole,
    getCurrentLang,
    t
  };

})();

// Auto-Initialize
document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
});

// Global Exposure
window.Layout = Layout;
