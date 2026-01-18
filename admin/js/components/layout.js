/**
 * AndroGov Layout Component v2.0
 * @description Handles Sidebar and Header rendering with Role Switcher integration
 * @version 2.0.0
 * @requires AppConfig, I18n, DataService, RoleSwitcher
 * @file admin/js/components/layout.js
 */

const Layout = (function() {
  // ==========================================
  // STATE
  // ==========================================
  let _state = {
    isSidebarCollapsed: false,
    currentUser: null,
    currentPage: '',
    isInitialized: false
  };

  // ==========================================
  // NAVIGATION MENU DATA
  // ==========================================
  const _menuData = [
    {
      section: { ar: 'الرئيسية', en: 'Main' },
      items: [
        { icon: 'fa-gauge-high', labelKey: 'nav.dashboard', href: 'index.html' }
      ]
    },
    {
      section: { ar: 'التواصل المؤسسي', en: 'Communication' },
      items: [
        { icon: 'fa-comments', labelKey: 'nav.chat', href: 'admin_chat.html' },
        { icon: 'fa-bullhorn', labelKey: 'nav.circulars', href: 'admin_circulars.html' }
      ]
    },
    {
      section: { ar: 'الحوكمة', en: 'Governance' },
      items: [
        { icon: 'fa-users-rectangle', labelKey: 'nav.generalAssembly', href: 'ga.html' },
        { icon: 'fa-building-columns', labelKey: 'nav.board', href: 'board.html' },
        { icon: 'fa-people-group', labelKey: 'nav.committees', href: 'committees.html' },
        { icon: 'fa-id-card', labelKey: 'nav.shareholders', href: 'shareholders.html' }
      ]
    },
    {
      section: { ar: 'التشغيل', en: 'Operations' },
      items: [
        { icon: 'fa-list-check', labelKey: 'nav.tasks', href: 'tasks.html' },
        { icon: 'fa-sitemap', label: { ar: 'مصفوفة الصلاحيات', en: 'DOA Matrix' }, href: 'doa.html' },
        { icon: 'fa-book-open', labelKey: 'nav.policies', href: 'policies.html' },
        { icon: 'fa-scale-balanced', labelKey: 'nav.compliance', href: 'compliance.html' }
      ]
    },
    {
      section: { ar: 'الإدارات', en: 'Departments' },
      items: [
        { icon: 'fa-user-tie', labelKey: 'nav.hr', href: 'hr.html' },
        { icon: 'fa-money-bill-wave', labelKey: 'nav.finance', href: 'finance.html' },
        { icon: 'fa-boxes-packing', labelKey: 'nav.procurement', href: 'procurement.html' },
        { icon: 'fa-shield-cat', labelKey: 'nav.it', href: 'it.html' }
      ]
    },
    {
      section: { ar: 'النظام', en: 'Admin' },
      items: [
        { icon: 'fa-users-gear', labelKey: 'nav.users', href: 'users.html' },
        { icon: 'fa-list-ul', labelKey: 'nav.auditLog', href: 'audit.html' },
        { icon: 'fa-sliders', labelKey: 'nav.settings', href: 'admin_settings.html' }
      ]
    }
  ];

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function init() {
    if (_state.isInitialized) return;

    // Get current user
    _state.currentUser = AppConfig.getCurrentUser();
    
    if (!_state.currentUser) {
      console.warn('⚠️ Layout: No user logged in');
      // Don't return - render anyway but with limited info
    }

    // Detect current page
    _detectCurrentPage();

    // Render components
    _renderSidebar();
    _renderHeader();

    // Setup event listeners
    _setupEventListeners();

    _state.isInitialized = true;
    
    console.log('✅ Layout initialized', {
      user: _state.currentUser?.displayName || 'Guest',
      page: _state.currentPage
    });

    return _state;
  }

  // ==========================================
  // DETECT CURRENT PAGE
  // ==========================================
  function _detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    _state.currentPage = filename || 'index.html';
  }

  // ==========================================
  // RENDER SIDEBAR
  // ==========================================
  function _renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const lang = AppConfig.getLang();
    const isRTL = AppConfig.isRTL();

    let html = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-screen w-72 bg-white dark:bg-slate-800 border-${isRTL ? 'l' : 'r'} border-slate-200 dark:border-slate-700 z-50 flex flex-col transition-all duration-300 no-print">
        
        <!-- Logo -->
        <div class="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-layer-group text-2xl text-brandRed"></i>
            <span class="text-xl font-black text-slate-800 dark:text-white italic">AndroGov</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto custom-scroll py-6 px-4 space-y-1">
    `;

    // Build menu
    _menuData.forEach(section => {
      const sectionLabel = section.section[lang] || section.section.ar;
      
      html += `
        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-6 mb-2">
          ${sectionLabel}
        </div>
      `;

      section.items.forEach(item => {
        const label = item.labelKey ? I18n.t(item.labelKey, lang) : (item.label?.[lang] || item.label?.ar || '');
        const isActive = _state.currentPage === item.href;
        const activeClass = isActive 
          ? 'bg-red-50 dark:bg-red-900/20 border-r-4 border-brandRed text-brandRed' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700';

        html += `
          <a href="${item.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${activeClass} transition-all">
            <i class="fa-solid ${item.icon} w-5 text-center"></i>
            <span>${label}</span>
          </a>
        `;
      });
    });

    html += `
        </nav>

        <!-- User Profile -->
        <div class="p-6 border-t border-slate-100 dark:border-slate-700">
    `;

    if (_state.currentUser) {
      html += `
          <a href="profile.html" class="flex items-center gap-3 group">
            <img src="${_state.currentUser.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}" class="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-600 group-hover:border-brandRed transition-all">
            <div class="overflow-hidden">
              <p class="text-xs font-bold text-slate-800 dark:text-white truncate">${_state.currentUser.displayName || 'User'}</p>
              <p class="text-[9px] text-slate-400 uppercase font-black">${I18n.t('nav.profile')}</p>
            </div>
          </a>
      `;
    } else {
      html += `
          <a href="../login.html" class="flex items-center gap-3 px-4 py-2 bg-brandBlue text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition">
            <i class="fa-solid fa-right-to-bracket"></i>
            <span>${lang === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
          </a>
      `;
    }

    html += `
        </div>
      </aside>
    `;

    container.innerHTML = html;
  }

  // ==========================================
  // RENDER HEADER
  // ==========================================
  function _renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const lang = AppConfig.getLang();
    const isRTL = AppConfig.isRTL();

    // Get page title from current link
    const currentMenuItem = _findCurrentMenuItem();
    const pageTitle = currentMenuItem 
      ? (currentMenuItem.labelKey ? I18n.t(currentMenuItem.labelKey, lang) : (currentMenuItem.label?.[lang] || currentMenuItem.label?.ar))
      : 'AndroGov';

    let html = `
      <header class="h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 sticky top-0 z-40 no-print">
        
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs">
          <span class="font-bold text-slate-400 uppercase tracking-widest">${I18n.t('nav.admin')}</span>
          <i class="fa-solid fa-chevron-${isRTL ? 'left' : 'right'} text-[10px] text-slate-300"></i>
          <span class="font-black text-brandRed uppercase tracking-widest">${pageTitle}</span>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">
    `;

    // Role Switcher (if user has multiple roles)
    if (_state.currentUser && typeof RoleSwitcher !== 'undefined') {
      const contexts = _state.currentUser.contexts || [];
      if (contexts.length > 1) {
        html += RoleSwitcher.renderButton();
      }
    }

    // Language Toggle
    html += `
          <button 
            onclick="Layout.toggleLanguage()" 
            class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            title="${lang === 'ar' ? 'English' : 'العربية'}"
          >
            <span class="font-bold text-sm">${lang === 'ar' ? 'EN' : 'ع'}</span>
          </button>
    `;

    // Theme Toggle
    const isDark = AppConfig.isDarkMode();
    html += `
          <button 
            onclick="Layout.toggleTheme()" 
            class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            title="${isDark ? 'Light Mode' : 'Dark Mode'}"
          >
            <i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
          </button>
    `;

    // Logout
    if (_state.currentUser) {
      html += `
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <button 
            onclick="Layout.logout()" 
            class="flex items-center gap-2 bg-red-50 dark:bg-red-900/10 text-brandRed px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-brandRed hover:text-white transition-all"
          >
            <i class="fa-solid fa-power-off"></i>
            <span>${lang === 'ar' ? 'خروج' : 'Logout'}</span>
          </button>
      `;
    }

    html += `
        </div>
      </header>
    `;

    container.innerHTML = html;
  }

  // ==========================================
  // FIND CURRENT MENU ITEM
  // ==========================================
  function _findCurrentMenuItem() {
    for (const section of _menuData) {
      for (const item of section.items) {
        if (item.href === _state.currentPage) {
          return item;
        }
      }
    }
    return null;
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================
  function _setupEventListeners() {
    // Listen for language/theme changes
    window.addEventListener('langChanged', () => {
      _renderSidebar();
      _renderHeader();
    });

    window.addEventListener('themeChanged', () => {
      // Theme handled by Tailwind classes automatically
      _renderHeader(); // Update icon
    });

    window.addEventListener('userChanged', () => {
      _state.currentUser = AppConfig.getCurrentUser();
      _renderSidebar();
      _renderHeader();
    });

    window.addEventListener('roleChanged', () => {
      _renderHeader(); // Update role switcher
    });
  }

  // ==========================================
  // PUBLIC METHODS - ACTIONS
  // ==========================================
  function toggleLanguage() {
    AppConfig.toggleLang();
    location.reload(); // Reload to apply language changes
  }

  function toggleTheme() {
    AppConfig.toggleTheme();
  }

  function logout() {
    const lang = AppConfig.getLang();
    const confirmMsg = lang === 'ar' 
      ? 'هل أنت متأكد من تسجيل الخروج؟' 
      : 'Are you sure you want to logout?';
    
    if (confirm(confirmMsg)) {
      AppConfig.logout();
    }
  }

  function refresh() {
    _renderSidebar();
    _renderHeader();
  }

  // ==========================================
  // RETURN PUBLIC API
  // ==========================================
  return {
    init,
    toggleLanguage,
    toggleTheme,
    logout,
    refresh,
    get state() { return { ..._state }; }
  };
})();

// ==========================================
// GLOBAL EXPORT
// ==========================================
if (typeof window !== 'undefined') {
  window.Layout = Layout;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Layout;
}
