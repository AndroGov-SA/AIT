/**
 * AndroGov Layout Engine v7.5 (Final Corrected Version)
 * @file admin/js/components/layout.js
 */

const Layout = (function() {
  
  // ==========================================
  // 1. STATE & CONFIG
  // ==========================================
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
      { key: 'dashboard', icon: 'fa-gauge-high', link: 'index.html' }
    ]},
    { section: 'communication', items: [
      { key: 'chat', icon: 'fa-comments', link: 'admin_chat.html' },
      { key: 'circulars', icon: 'fa-bullhorn', link: 'admin_circulars.html' }
    ]},
    { section: 'governance', items: [
      { key: 'generalAssembly', icon: 'fa-users-rectangle', link: 'ga.html' },
      { key: 'board', icon: 'fa-building-columns', link: 'board.html' },
      { key: 'committees', icon: 'fa-people-group', link: 'committees.html' },
      { key: 'shareholders', icon: 'fa-id-card', link: 'shareholders.html' }
    ]},
    { section: 'operations', items: [
      { key: 'tasks', icon: 'fa-list-check', link: 'tasks.html' },
      { key: 'doa', icon: 'fa-sitemap', link: 'doa.html' },
      { key: 'policies', icon: 'fa-book-open', link: 'policies.html' },
      { key: 'compliance', icon: 'fa-scale-balanced', link: 'compliance.html' }
    ]},
    { section: 'departments', items: [
      { key: 'hr', icon: 'fa-user-tie', link: 'hr.html' },
      { key: 'finance', icon: 'fa-money-bill-wave', link: 'finance.html' },
      { key: 'procurement', icon: 'fa-boxes-packing', link: 'procurement.html' },
      { key: 'it', icon: 'fa-shield-cat', link: 'it.html' }
    ]},
    { section: 'admin', items: [
      { key: 'users', icon: 'fa-users-gear', link: 'users.html' },
      { key: 'auditLog', icon: 'fa-list-ul', link: 'audit.html' },
      { key: 'settings', icon: 'fa-sliders', link: 'admin_settings.html' }
    ]}
  ],
    
    // 2. قائمة الموارد البشرية
    'HR': [
        { section: 'main', items: [
          { key: 'dash', icon: 'fa-chart-pie', link: '../hr/hr_dashboard.html' },
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
    ]}
  ],
    
    // 3. قائمة الرئيس التنفيذي (CEO)
    'CEO': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../ceo/ceo_dashboard.html' },
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
        { key: 'profile', icon: 'fa-user-tie', link: '../ceo/ceo_profile.html' }
      ]}
  ],
    
    // 4. قائمة المدير المالي (CFO)
    'CFO': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../finance/cfo_dashboard.html' },
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
       ]}
  ],
    
    // 5. قائمة المدير التقني (CTO) 
    'CTO': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../cto/cto_dashboard.html' },
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
         ]}
  ],
    
    // 6. قائمة المساهمين (shareholder) 
    'shareholder': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../shareholder/dashboard.html' },
        { key: 'profile', icon: 'fa-id-card', link: '../shareholder/profile.html' },
        { key: 'requests', icon: 'fa-headset', link: '../shareholder/requests.html' },
        { key: 'certificates', icon: 'fa-file-contract', link: '../shareholder/certificates.html' },
        { key: 'dividends', icon: 'fa-hand-holding-dollar', link: '../shareholder/dividends.html' },
        { key: 'voting', icon: 'fa-check-to-slot', link: '../shareholder/voting.html' },
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
      ]}
    ],
    
    // 9. قائمة المبيعات (Sales) 
    'Sales': [
      { section: 'main', items: [
        { key: 'dash', icon: 'fa-chart-pie', link: '../Sales/dashboard.html' },
        { key: 'profile', icon: 'fa-id-card', link: '../Sales/profile.html' },
        { key: 'requests', icon: 'fa-headset', link: '../Sales/requests.html' },
        ]}
    ]
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
          avatar: 'https://androgov-sa.github.io/AIT/photo/grc.png'
        };
      }
    } catch (e) {
      console.warn('⚠️ Could not load user profile:', e);
    }
  }

  // ==========================================
  // 5. RENDER FUNCTIONS
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const lang = AppConfig.getLang();
    const isRTL = AppConfig.isRTL();
    const currentPath = window.location.pathname.split('/').pop() || 'admin.html';
    const systemInfo = AppConfig.getSystemInfo();
    const user = _state.currentUser;

    const userRole = user?.role || 'Admin';
    const activeMenu = _menuDefinitions[userRole] || _menuDefinitions['Admin'];

    let menuHTML = '';
    
    if (activeMenu) {
        activeMenu.forEach(group => {
          const sectionLabel = (typeof I18n !== 'undefined') ? (I18n.t(`nav.${group.section}`) || group.section) : group.section;
          menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${sectionLabel}</div>`;
          
          group.items.forEach(item => {
            const linkPage = item.link.split('/').pop(); 
            const isActive = currentPath === linkPage;
            
            const label = (typeof I18n !== 'undefined') ? (I18n.t(`nav.${item.key}`) || item.key) : item.key;
            const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200";
            const activeClass = "bg-brandRed text-white shadow-md shadow-red-500/20";
            const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";

            menuHTML += `
              <a href="${item.link}" class="${baseClass} ${isActive ? activeClass : inactiveClass}">
                <div class="w-6 text-center"><i class="fa-solid ${item.icon}"></i></div>
                <span class="flex-1 truncate">${label}</span>
              </a>
            `;
          });
        });
    }

    const roleBadges = (typeof RoleSwitcher !== 'undefined' && RoleSwitcher.hasMultipleRoles()) 
      ? `<div class="mt-3 flex flex-wrap gap-1">${RoleSwitcher.renderBadges()}</div>` 
      : '';

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-3 w-full">
            <div class="w-10 h-10 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl">A</div>
            <div class="overflow-hidden">
              <h1 class="font-bold text-sm text-slate-800 dark:text-white truncate">${systemInfo.name}</h1>
              <p class="text-[10px] text-slate-500 uppercase tracking-widest truncate">v${systemInfo.version}</p>
            </div>
          </div>
        </div>
        <div class="p-4">
          <a href="#" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group cursor-pointer">
            <img src="${user.avatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 object-cover shrink-0">
            <div class="overflow-hidden flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-brandRed transition">${user.displayName}</p>
              <p class="text-[10px] text-brandRed font-medium truncate">${user.displayTitle}</p>
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

  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const lang = AppConfig.getLang();
    const isRTL = AppConfig.isRTL();
    const isDark = AppConfig.isDarkMode();

    let notifListHTML = _notifications.length > 0 ? _notifications.map(n => `
      <div class="p-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer flex gap-3">
        <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}"><i class="fa-solid ${n.icon} text-xs"></i></div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-slate-800 dark:text-white">${(typeof I18n !== 'undefined') ? I18n.t(n.titleKey) : n.titleKey}</p>
          <p class="text-[10px] text-slate-500 mt-0.5 truncate">${lang==='ar'?n.msgAr:n.msgEn}</p>
          <p class="text-[9px] text-slate-400 mt-1">${n.time}</p>
        </div>
      </div>
    `).join('') : `<div class="p-6 text-center text-slate-400 text-xs">${(typeof I18n !== 'undefined') ? I18n.t('notifications.empty') : 'No Notifications'}</div>`;

    const roleSwitcherHTML = (typeof RoleSwitcher !== 'undefined' && RoleSwitcher.hasMultipleRoles()) ? RoleSwitcher.renderButton() : '';

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all">
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed transition"><i class="fa-solid fa-bars text-xl"></i></button>
        </div>
        <div class="flex items-center gap-3">
          ${roleSwitcherHTML}
          
          <button onclick="if(typeof AndroBot !== 'undefined') AndroBot.toggle()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-brandBlue transition flex items-center justify-center" title="${lang==='ar'?'المساعد الذكي':'AI Assistant'}">
             <i class="fa-solid fa-robot"></i>
          </button>

          <div class="relative">
            <button id="notifBtn" onclick="Layout.toggleNotif()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative flex items-center justify-center">
              <i class="fa-regular fa-bell"></i>
              ${_notifications.length > 0 ? '<span class="absolute top-2 right-2.5 w-2 h-2 bg-brandRed rounded-full border border-white dark:border-slate-800 animate-pulse"></span>' : ''}
            </button>
            <div id="notifDropdown" class="hidden absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
              <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <span class="text-xs font-bold dark:text-white">${(typeof I18n !== 'undefined') ? I18n.t('notifications.title') : 'Notifications'}</span>
              </div>
              <div class="max-h-64 overflow-y-auto custom-scroll">${notifListHTML}</div>
            </div>
          </div>

          <button onclick="Layout.toggleLang()" class="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-white transition">${lang === 'ar' ? 'EN' : 'عربي'}</button>
          <button onclick="Layout.toggleTheme()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition"><i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i></button>
          <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button onclick="Layout.logout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2"><i class="fa-solid fa-power-off"></i> <span class="hidden sm:inline">${(typeof I18n !== 'undefined') ? I18n.t('auth.logout') : 'Logout'}</span></button>
        </div>
      </header>
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
