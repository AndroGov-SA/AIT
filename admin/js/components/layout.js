/**
 * AndroGov Layout Engine v7.5 (Final Corrected Version)
 * @file admin/js/components/layout.js
 */

const Layout = (function() {
  
  // ==========================================
  // 1. STATE & CONFIG
  // ==========================================ب
  let _state = {
    currentUser: null,
    isInitialized: false,
    sidebarOpen: false
  };

  // ==========================================
  // 2. MENU DEFINITIONS (القوائم الصحيحة والمسارات النسبية)
  // ==========================================
  const _menuDefinitions = {
    
    // --- 1. Admin ---
    'Admin': [
    { section: 'main', items: [
      { key: 'dashboard', icon: 'fa-gauge-high', link: '../admin/index.html' }
    ]},
    { section: 'communication', items: [
      { key: 'chat', icon: 'fa-comments', link: '../admin/admin_chat.html' },
      { key: 'circulars', icon: 'fa-bullhorn', link: '../admin/admin_circulars.html' }
    ]},
    { section: 'governance', items: [
      { key: 'generalAssembly', icon: 'fa-users-rectangle', link: '../admin/ga.html' },
      { key: 'board', icon: 'fa-building-columns', link: '../admin/board.html' },
      { key: 'committees', icon: 'fa-people-group', link: '../admin/committees.html' },
      { key: 'shareholders', icon: 'fa-id-card', link: '../admin/shareholders.html' }
    ]},
    { section: 'operations', items: [
      { key: 'tasks', icon: 'fa-list-check', link: '../admin/tasks.html' },
      { key: 'doa', icon: 'fa-sitemap', link: '../admin/doa.html' },
      { key: 'policies', icon: 'fa-book-open', link: '../admin/policies.html' },
      { key: 'compliance', icon: 'fa-scale-balanced', link: '../admin/compliance.html' }
    ]},
    { section: 'departments', items: [
      { key: 'hr', icon: 'fa-user-tie', link: '../admin/hr.html' },
      { key: 'finance', icon: 'fa-money-bill-wave', link: '../admin/finance.html' },
      { key: 'procurement', icon: 'fa-boxes-packing', link: '../admin/procurement.html' },
      { key: 'it', icon: 'fa-shield-cat', link: '../admin/it.html' }
    ]},
    { section: 'admin', items: [
      { key: 'users', icon: 'fa-users-gear', link: '../admin/users.html' },
      { key: 'auditLog', icon: 'fa-list-ul', link: '../admin/audit.html' },
      { key: 'settings', icon: 'fa-sliders', link: '../admin/admin_settings.html' }
    ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../admin/profile.html' }
      ]}
  ],
    
    // 2. قائمة الموارد البشرية
    'CAO': [
        { section: 'main', items: [
          { key: 'dash', icon: 'fa-chart-pie', link: '../hr/index.html' },
          { key: 'approvals', icon: 'fa-inbox', link: '../hr/hr_approvals.html' },
          { key: 'chat', icon: 'fa-comments', link: '../hr/internal_chat.html' }
        ]},
        { section: 'workforce', items: [
          { key: 'employees', icon: 'fa-users', link: '../hr/hr_employees.html' },
          { key: 'contracts', icon: 'fa-file-contract', link: '../hr/hr_contracts.html' },
          { key: 'org', icon: 'fa-sitemap', link: '../hr/hr_org.html' }
        ]},
        { section: 'ops', items: [
          { key: 'attendance', icon: 'fa-fingerprint', link: '../hr/hr_attendance.html' },
          { key: 'leaves', icon: 'fa-calendar-days', link: '../hr/hr_leaves.html' },
          { key: 'payroll', icon: 'fa-money-bill-wave', link: '../hr/hr_payroll.html' },
          { key: 'trips', icon: 'fa-plane-departure', link: '../hr/hr_trips.html' }
        ]},
        { section: 'admin', items: [
          { key: 'assets', icon: 'fa-boxes-packing', link: '../hr/hr_assets.html' },
          { key: 'logistics', icon: 'fa-building-user', link: '../hr/hr_logistics.html' },
          { key: 'purchases', icon: 'fa-cart-shopping', link: '../hr/hr_purchases.html' },
          { key: 'partners', icon: 'fa-handshake', link: '../hr/hr_partners.html' }
        ]},
        { section: 'govt', items: [
          { key: 'govt', icon: 'fa-passport', link: '../hr/hr_govt.html' },
          { key: 'recruitment', icon: 'fa-user-plus', link: '../hr/hr_recruitment.html' }
    ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../hr/profile.html' }
      ]}
  ],
    
    // 3. قائمة الرئيس التنفيذي (CEO)
    'CEO': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../ceo/index.html' },
        { key: 'board', icon: 'fa-gavel', link: '../ceo/ceo_board.html' },
        { key: 'strategy', icon: 'fa-chess', link: '../ceo/ceo_strategy.html' }
      ]},
      { section: 'finance', items: [
          { key: 'finance', icon: 'fa-chart-line', link: '../ceo/ceo_finance.html' },
          { key: 'reports', icon: 'fa-file-invoice-dollar', link: '../ceo/ceo_reports.html' }
      ]},
      { section: 'governance', items: [
        { key: 'gov', icon: 'fa-scale-balanced', link: '../ceo/ceo_governance.html' },
        { key: 'risks', icon: 'fa-triangle-exclamation', link: '../ceo/ceo_risks.html' }
      ]},
      { section: 'comm', items: [
        { key: 'broadcast', icon: 'fa-bullhorn', link: '../ceo/ceo_broadcast.html' },
        { key: 'chat', icon: 'fa-comments', link: '../ceo/ceo_communication.html' },
        { key: 'feedback', icon: 'fa-inbox', link: '../ceo/ceo_feedback.html' }
      ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../ceo/profile.html' }
      ]}
  ],
    
    // 4. قائمة المدير المالي (CFO)
    'CFO': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../finance/index.html' },
        { key: 'approvals', icon: 'fa-stamp', link: '../finance/approvals.html' },
        { key: 'chat', icon: 'fa-comments', link: '../finance/internal_chat.html' }
      ]},
      { section: 'gl', items: [
        { key: 'journal', icon: 'fa-book', link: '../finance/gl_journal.html' },
        { key: 'coa', icon: 'fa-sitemap', link: '../finance/gl_coa.html' },
        { key: 'costCenters', icon: 'fa-layer-group', link: '../finance/gl_cost_centers.html' }
        ]},
      { section: 'ap', items: [
        { key: 'vendors', icon: 'fa-store', link: '../finance/ap_vendors.html' },
        { key: 'bills', icon: 'fa-file-invoice-dollar', link: '../finance/ap_bills.html' },
        { key: 'payments', icon: 'fa-money-bill-transfer', link: '../finance/ap_payments.html' }
        ]},
      { section: 'ar', items: [ 
        { key: 'salesInv', icon: 'fa-file-invoice', link: '../finance/ar_invoices.html' },
        { key: 'receipts', icon: 'fa-hand-holding-dollar', link: '../finance/ar_receipts.html' }
        ]},
      { section: 'inventory', items: [
        { key: 'stock', icon: 'fa-boxes-stacked', link: '../finance/inv_dashboard.html' },
        { key: 'assets', icon: 'fa-laptop-code', link: '../finance/inv_assets.html' }
       ]},
      { section:'reporting', items: [
        { key: 'statements', icon: 'fa-file-pdf', link: '../finance/rep_statements.html' },
        { key: 'budget', icon: 'fa-scale-balanced', link: '../finance/rep_budget.html' },
        { key: 'tax', icon: 'fa-building-columns', link: '../finance/rep_tax.html' }
        ]},
      { section: 'config', items: [
        { key: 'settings', icon: 'fa-gears', link: '../finance/fin_settings.html' }
       ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../finance/profile.html' }
      ]}
  ],
    
    // 5. قائمة المدير التقني (CTO) 
    'CTO': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../cto/index.html' },
        { key: 'monitor', icon: 'fa-desktop', link: '../cto/cto_monitoring.html' }
      ]},
      { section: 'telecom', items: [
        { key: 'pbx', icon: 'fa-phone-volume', link: '../cto/cto_pbx.html' },
        { key: 'extensions', icon: 'fa-users-viewfinder', link: '../cto/cto_extensions.html' },
        { key: 'call_logs', icon: 'fa-list-ol', link: '../cto/cto_call_logs.html' }
      ]},
      { section: 'infrastructure', items: [
        { key: 'servers', icon: 'fa-server', link: '../cto/cto_servers.html' },
        { key: 'assets', icon: 'fa-laptop-code', link: '../cto/cto_assets.html' }
       ]},
      { section: 'security', items: [
        { key: 'soc', icon: 'fa-shield-virus', link: '../cto/cto_soc.html' },
        { key: 'access', icon: 'fa-id-badge', link: '../cto/cto_iam.html' }
      ]},
      { section: 'dev', items: [ 
        { key: 'projects', icon: 'fa-code-branch', link: '../cto/cto_projects.html' },
        { key: 'support', icon: 'fa-headset', link: '../cto/cto_support.html' }
      ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../cto/profile.html' }
      ]}
  ],
    
    // 6. قائمة المساهمين (shareholder) 
    'shareholder': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../shareholder/index.html' },
        { key: 'requests', icon: 'fa-headset', link: '../shareholder/requests.html' },
        { key: 'certificates', icon: 'fa-file-contract', link: '../shareholder/certificates.html' },
        { key: 'dividends', icon: 'fa-hand-holding-dollar', link: '../shareholder/dividends.html' },
        { key: 'voting', icon: 'fa-check-to-slot', link: '../shareholder/voting.html' },
      ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../shareholder/profile.html' }
      ]}
  ],
    
    // 7. قائمة المجلس (Board) 
    'Board': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../board/index.html' }
      ]},
      { section: 'governance', items: [
        { key: 'meetings', icon: 'fa-calendar-days', link: '../board/meetings.html' },
        { key: 'resolutions', icon: 'fa-file-signature', link: '../board/communication.html' },
        { key: 'finance', icon: 'fa-chart-line', link: '../board/finance.html' }
      ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../board/profile.html' }
      ]}
  ],
    
    // 8. قائمة اللجان (Committees) 
    'Committees': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../Committees/index.html' }
      ]},
      { section: 'governance', items: [
        { key: 'meetings', icon: 'fa-calendar-days', link: '../Committees/meetings.html' },
        { key: 'resolutions', icon: 'fa-file-signature', link: '../Committees/communication.html' },
        { key: 'finance', icon: 'fa-chart-line', link: '../Committees/finance.html' }
      ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../Committees/profile.html' }
      ]}
  ],
    
    // 9. قائمة المبيعات (Sales) 
    'Sales': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../Sales/index.html' },
        { key: 'profile', icon: 'fa-id-card', link: '../Sales/profile.html' },
        { key: 'requests', icon: 'fa-headset', link: '../Sales/requests.html' },
        ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../Sales/profile.html' }
      ]}
  ],
    
    // --- 10. Internal Audit (Updated Path) ---
    'InternalAudit': [
      { section: 'main', items: [
        { key: 'overview', icon: 'fa-gauge-high', link: '../audit/index.html#dashboard' }
      ]},
      { section: 'operations', items: [
        { key: 'missions', icon: 'fa-list-check', link: '../audit/index.html#missions' },
        { key: 'findings', icon: 'fa-bug', link: '../audit/index.html#findings' },
        { key: 'reports', icon: 'fa-file-contract', link: '../audit/index.html#reports' }
      ]},
      { section: 'personal', items: [
        { key: 'profile', icon: 'fa-user-tie', link: '../audit/profile.html' }
      ]}
  ],
    };
    
  const _notifications = [
    { id: 1, type: 'critical', icon: 'fa-shield-virus', color: 'text-red-500 bg-red-50', titleKey: 'notifications.securityAlert', msgAr: 'محاولة دخول غير مصرح بها.', msgEn: 'Unauthorized login attempt.', time: '2m' },
    { id: 2, type: 'info', icon: 'fa-file-contract', color: 'text-blue-500 bg-blue-50', titleKey: 'notifications.newContract', msgAr: 'عقد توريد بانتظار الاعتماد.', msgEn: 'Supply contract pending approval.', time: '1h' }
  ];

 // ==========================================
  // 3. INITIALIZATION
  // ==========================================
  async function init() {
    if (_state.isInitialized) return;

    if (typeof AppConfig !== 'undefined') AppConfig.init();

    await _loadUserProfile();

    if (_state.currentUser?.id && typeof RoleSwitcher !== 'undefined') {
      RoleSwitcher.init(_state.currentUser.id);
    }

    renderSidebar();
    renderHeader();

    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
    
    // إخفاء الـ Loading Overlay يدوياً للتأكد
    const overlay = document.getElementById('loadingOverlay');
    if(overlay) overlay.classList.add('hidden');

    _setupEventListeners();

    _state.isInitialized = true;
    console.log('✅ Layout Engine v7.6 initialized');
  }

  // ==========================================
  // 4. USER PROFILE (Moved Inside Scope)
  // ==========================================
  async function _loadUserProfile() {
    try {
      let user = AppConfig.getCurrentUser();

      if (!user && typeof DataService !== 'undefined') {
        const userId = localStorage.getItem('currentUserId') || 'USR_004';
        user = DataService.getUserById(userId);
      }

      if (user) {
        _state.currentUser = user;
        AppConfig.setCurrentUser(user);
      } else {
        _state.currentUser = {
          id: 'USR_004',
          role: 'Admin',
          displayName: AppConfig.getLang() === 'ar' ? 'أيمن المغربي' : 'Ayman Al-Maghrabi',
          displayTitle: AppConfig.getLang() === 'ar' ? 'مسؤول الحوكمة' : 'GRC Officer',
          email: 'amaghrabi@androomeda.com',
          avatar: '../photo/grc.png'
        };
      }
    } catch (e) {
      console.warn('⚠️ Could not load user profile:', e);
    }
  }

  // ==========================================
  // 5. RENDER FUNCTIONS (Fixed for New Auth Roles)
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const lang = AppConfig.getLang();
    const isRTL = AppConfig.isRTL();
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const systemInfo = AppConfig.getSystemInfo();
    
    // التأكد من جلب المستخدم سواء من الحالة أو التخزين المحلي
    const user = _state.currentUser || JSON.parse(localStorage.getItem('currentUser'));

    // ----------------------------------------------------
    // 🛠️ التعديل الجوهري: ربط أنواع المستخدمين بالقوائم
    // ----------------------------------------------------
    const roleMap = {
        'admin': 'Admin',
        'ceo': 'Admin',       // الرئيس التنفيذي يرى قائمة الأدمن (أو يمكنك عمل قائمة خاصة Exec)
        'cfo': 'Admin',       // المدير المالي يرى قائمة الأدمن مؤقتاً
        'cto': 'Admin',       // المدير التقني
        'hr_exec': 'Admin',   // مدير الموارد
        'board': 'Board',     // أعضاء المجلس
        'audit': 'Audit',     // التدقيق
        'shareholder': 'Shareholder', // المساهمين
        'staff': 'Employee',  // الموظفين
        'employee': 'Employee'
    };

    // نستخدم user.type الذي انشأناه في auth.js، إذا لم يوجد نستخدم role
    const userType = user?.type || user?.role || 'staff';
    
    // تحديد مفتاح القائمة بناءً على الخريطة، والافتراضي هو Employee
    const menuKey = roleMap[userType] || 'Employee';
    
    // جلب القائمة المناسبة
    const activeMenu = _menuDefinitions[menuKey] || _menuDefinitions['Employee'];

    let menuHTML = '';
    
    if (activeMenu) {
        activeMenu.forEach(group => {
          const sectionLabel = (typeof I18n !== 'undefined') ? (I18n.t(`nav.${group.section}`) || group.section) : group.section;
          menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${sectionLabel}</div>`;
          
          group.items.forEach(item => {
            // معالجة الروابط لتتوافق مع المجلدات المختلفة
            const linkPage = item.link.split('/').pop(); 
            const isActive = currentPath === linkPage || window.location.href.includes(item.link);
            
            const label = (typeof I18n !== 'undefined') ? (I18n.t(`nav.${item.key}`) || item.key) : item.key;
            const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group";
            const activeClass = "bg-brandRed text-white shadow-md shadow-red-500/20";
            const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";

            menuHTML += `
              <a href="${item.link}" class="${baseClass} ${isActive ? activeClass : inactiveClass}">
                <div class="w-6 text-center transition-transform group-hover:scale-110"><i class="fa-solid ${item.icon}"></i></div>
                <span class="flex-1 truncate">${label}</span>
              </a>
            `;
          });
        });
    }

    const roleBadges = (typeof RoleSwitcher !== 'undefined' && RoleSwitcher.hasMultipleRoles()) 
      ? `<div class="mt-3 flex flex-wrap gap-1">${RoleSwitcher.renderBadges()}</div>` 
      : '';

    // تحديد اسم العرض (يدعم اللغتين)
    const displayName = typeof user.name === 'object' ? (lang === 'ar' ? user.name.ar : user.name.en) : user.name;
    const displayTitle = user.title || user.role;

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-3 w-full">
            <div class="w-10 h-10 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brandRed/20">
                <i class="fa-solid fa-layer-group"></i>
            </div>
            <div class="overflow-hidden">
              <h1 class="font-bold text-sm text-slate-800 dark:text-white truncate">${systemInfo.name}</h1>
              <p class="text-[10px] text-slate-500 uppercase tracking-widest truncate">v${systemInfo.version}</p>
            </div>
          </div>
        </div>
        
        <div class="p-4">
          <a href="profile.html" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group cursor-pointer">
            <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold shrink-0">
                ${displayName.charAt(0).toUpperCase()}
            </div>
            <div class="overflow-hidden flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-brandRed transition">${displayName}</p>
              <p class="text-[10px] text-brandRed font-medium truncate">${displayTitle}</p>
            </div>
          </a>
          ${roleBadges}
        </div>

        <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 custom-scroll space-y-0.5">
          ${menuHTML}
        </nav>
        
        <div class="p-4 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
          ${systemInfo.copyright}
        </div>
      </aside>
    `;
  }
  // ==========================================
  // 6. HELPER FUNCTIONS & EXPORTS
  // ==========================================
  function _setupEventListeners() {
    document.addEventListener('click', (e) => {
      const notifMenu = document.getElementById('notifDropdown');
      const notifBtn = document.getElementById('notifBtn');
      if (notifMenu && !notifMenu.contains(e.target) && !notifBtn?.contains(e.target)) {
        notifMenu.classList.add('hidden');
      }
    });

    window.addEventListener('langChanged', () => { renderSidebar(); renderHeader(); if(typeof I18n !== 'undefined') I18n.applyToDOM(); });
    window.addEventListener('themeChanged', () => renderHeader());
  }

  function toggleNotif() { document.getElementById('notifDropdown')?.classList.toggle('hidden'); }
  
  function toggleMobileSidebar() { 
    const s = document.getElementById('main-sidebar'); 
    if(s) { _state.sidebarOpen = !_state.sidebarOpen; s.classList.toggle('hidden', !_state.sidebarOpen); s.classList.toggle('flex', _state.sidebarOpen); } 
  }
  
  function toggleTheme() { AppConfig.toggleTheme(); }
  
  function toggleLang() { AppConfig.toggleLang(); location.reload(); }
  
  function logout() { 
      const msg = (typeof I18n !== 'undefined') ? I18n.t('auth.logoutConfirm') : 'Logout?';
      if(confirm(msg)) window.location.href = '../login.html'; 
  }
  
  function getCurrentUser() { return _state.currentUser; }

  // Return Public API
  return { init, renderSidebar, renderHeader, toggleNotif, toggleMobileSidebar, toggleTheme, toggleLang, logout, getCurrentUser };

})();

// Auto-Initialize
document.addEventListener('DOMContentLoaded', Layout.init);

// Global Exposure (Optional for legacy calls)
if (typeof window !== 'undefined') window.Layout = Layout;
