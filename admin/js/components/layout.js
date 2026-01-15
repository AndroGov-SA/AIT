/**
 * AndroGov Layout Engine v7.0 (Refactored)
 * @description Modular layout system with full integration
 * @version 7.0.0
 * @requires AppConfig, I18n, DataService, PolicyHelpers, RoleSwitcher
 */

const Layout = (function() {
  // ==========================================
  // STATE
  // ==========================================
  let _state = {
    currentUser: null,
    isInitialized: false,
    sidebarOpen: false
  };

  // ==========================================
  // MENU STRUCTURE
  // ==========================================
  const _menuStructure = [
    { section: 'main', items: [
      { key: 'dashboard', icon: 'fa-gauge-high', link: 'admin.html' }
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
  ];

  // ==========================================
  // NOTIFICATIONS (Sample Data)
  // ==========================================
  const _notifications = [
    { id: 1, type: 'critical', icon: 'fa-shield-virus', color: 'text-red-500 bg-red-50', titleKey: 'notifications.securityAlert', msgAr: 'محاولة دخول غير مصرح بها.', msgEn: 'Unauthorized login attempt.', time: '2m' },
    { id: 2, type: 'info', icon: 'fa-file-contract', color: 'text-blue-500 bg-blue-50', titleKey: 'notifications.newContract', msgAr: 'عقد توريد بانتظار الاعتماد.', msgEn: 'Supply contract pending approval.', time: '1h' }
  ];

  // ==========================================
  // INITIALIZATION
  // ==========================================
  async function init() {
    if (_state.isInitialized) return;

    // Initialize AppConfig first
    AppConfig.init();

    // Load user profile
    await _loadUserProfile();

    // Initialize RoleSwitcher if user has multiple roles
    if (_state.currentUser?.id) {
      RoleSwitcher.init(_state.currentUser.id);
    }

    // Render components
    renderSidebar();
    renderHeader();

    // Apply translations
    I18n.applyToDOM();

    // Show body
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';

    // Setup event listeners
    _setupEventListeners();

    _state.isInitialized = true;
    console.log('✅ Layout Engine v7.0 initialized');

    return _state;
  }

  // ==========================================
  // USER PROFILE
  // ==========================================
  async function _loadUserProfile() {
    try {
      // Try to get from AppConfig first
      let user = AppConfig.getCurrentUser();

      // If not found, try DataService
      if (!user && typeof DataService !== 'undefined') {
        // Default user for demo (Ayman)
        const userId = localStorage.getItem('currentUserId') || 'USR_004';
        user = DataService.getUserById(userId);
      }

      if (user) {
        _state.currentUser = user;
        AppConfig.setCurrentUser(user);
      } else {
        // Fallback user
        _state.currentUser = {
          id: 'USR_004',
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
  // RENDER SIDEBAR
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const lang = AppConfig.getLang();
    const isRTL = AppConfig.isRTL();
    const currentPath = window.location.pathname.split('/').pop() || 'admin.html';
    const systemInfo = AppConfig.getSystemInfo();

    // User display
    const userName = _state.currentUser?.displayName || '';
    const userTitle = _state.currentUser?.displayTitle || '';
    const userAvatar = _state.currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=FB4747&color=fff`;

    // Build menu HTML
    let menuHTML = '';
    _menuStructure.forEach(group => {
      const sectionLabel = I18n.t(`nav.${group.section}`);
      menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${sectionLabel}</div>`;
      
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        const label = I18n.t(`nav.${item.key}`);
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

    // Role badges for sidebar
    const roleBadges = RoleSwitcher.hasMultipleRoles() ? `
      <div class="mt-3 flex flex-wrap gap-1">
        ${RoleSwitcher.renderBadges()}
      </div>
    ` : '';

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
        
        <!-- Logo -->
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-3 w-full">
            <img src="https://ait.sa/wp-content/uploads/2024/03/cropped-Square-Logo.png" class="w-10 h-10 rounded-xl bg-white object-contain shrink-0 shadow-sm border border-slate-100 dark:border-slate-700" alt="Logo">
            <div class="overflow-hidden">
              <h1 class="font-bold text-sm text-slate-800 dark:text-white truncate">${systemInfo.name} <span class="font-light">System</span></h1>
              <p class="text-[10px] text-slate-500 uppercase tracking-widest truncate">v${systemInfo.version}</p>
            </div>
          </div>
        </div>

        <!-- User Card -->
        <div class="p-4">
          <a href="${AppConfig.getRoute('profile')}" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group cursor-pointer">
            <img src="${userAvatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 object-cover shrink-0" alt="${userName}">
            <div class="overflow-hidden flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-brandRed transition">${userName}</p>
              <p class="text-[10px] text-brandRed font-medium truncate">${userTitle}</p>
            </div>
          </a>
          ${roleBadges}
        </div>

        <!-- Navigation -->
        <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 custom-scroll space-y-0.5">
          ${menuHTML}
        </nav>

        <!-- Footer -->
        <div class="p-4 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
          ${systemInfo.copyright}
        </div>
      </aside>
    `;

    // Restore scroll position
    _restoreSidebarScroll();
  }

  // ==========================================
  // RENDER HEADER
  // ==========================================
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const lang = AppConfig.getLang();
    const isRTL = AppConfig.isRTL();
    const isDark = AppConfig.isDarkMode();

    // Notifications HTML
    let notifListHTML = '';
    if (_notifications.length > 0) {
      _notifications.forEach(n => {
        const title = I18n.t(n.titleKey);
        const msg = lang === 'ar' ? n.msgAr : n.msgEn;
        notifListHTML += `
          <div class="p-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer flex gap-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}">
              <i class="fa-solid ${n.icon} text-xs"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-slate-800 dark:text-white">${title}</p>
              <p class="text-[10px] text-slate-500 mt-0.5 truncate">${msg}</p>
              <p class="text-[9px] text-slate-400 mt-1">${n.time}</p>
            </div>
          </div>
        `;
      });
    } else {
      notifListHTML = `<div class="p-6 text-center text-slate-400 text-xs">${I18n.t('notifications.empty')}</div>`;
    }

    // Role Switcher button (if user has multiple roles)
    const roleSwitcherHTML = RoleSwitcher.hasMultipleRoles() ? RoleSwitcher.renderButton() : '';

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all">
        
        <!-- Left Side -->
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed transition">
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
        </div>

        <!-- Right Side -->
        <div class="flex items-center gap-3">
          
          <!-- Role Switcher -->
          ${roleSwitcherHTML}

          <!-- Notifications -->
          <div class="relative">
            <button id="notifBtn" onclick="Layout.toggleNotif()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative flex items-center justify-center" title="${I18n.t('nav.notifications')}">
              <i class="fa-regular fa-bell"></i>
              ${_notifications.length > 0 ? '<span class="absolute top-2 right-2.5 w-2 h-2 bg-brandRed rounded-full border border-white dark:border-slate-800 animate-pulse"></span>' : ''}
            </button>
            <div id="notifDropdown" class="hidden absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
              <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <span class="text-xs font-bold dark:text-white">${I18n.t('notifications.title')}</span>
                <button class="text-[10px] text-brandRed hover:underline">${I18n.t('notifications.markRead')}</button>
              </div>
              <div class="max-h-64 overflow-y-auto custom-scroll">${notifListHTML}</div>
            </div>
          </div>

          <!-- Language Toggle -->
          <button onclick="Layout.toggleLang()" class="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-white transition" title="${lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}">
            ${lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          <!-- Theme Toggle -->
          <button onclick="Layout.toggleTheme()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition" title="${isDark ? 'Light Mode' : 'Dark Mode'}">
            <i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
          </button>

          <!-- Divider -->
          <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

          <!-- Logout -->
          <button onclick="Layout.logout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2" title="${I18n.t('auth.logout')}">
            <i class="fa-solid fa-power-off"></i>
            <span class="hidden sm:inline">${I18n.t('auth.logout')}</span>
          </button>
        </div>
      </header>
    `;
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================
  function _setupEventListeners() {
    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      // Notifications dropdown
      const notifMenu = document.getElementById('notifDropdown');
      const notifBtn = document.getElementById('notifBtn');
      if (notifMenu && !notifMenu.contains(e.target) && !notifBtn?.contains(e.target)) {
        notifMenu.classList.add('hidden');
      }
    });

    // Listen for language change
    window.addEventListener('langChanged', () => {
      renderSidebar();
      renderHeader();
      I18n.applyToDOM();
    });

    // Listen for theme change
    window.addEventListener('themeChanged', () => {
      renderHeader();
    });

    // Listen for role change
    window.addEventListener('roleChanged', (e) => {
      console.log('🔄 Role changed:', e.detail);
      // You can add custom logic here based on role change
    });

    // Save sidebar scroll on page unload
    window.addEventListener('beforeunload', () => {
      const nav = document.getElementById('sidebar-nav');
      if (nav) {
        sessionStorage.setItem('sidebarScroll', nav.scrollTop);
      }
    });
  }

  function _restoreSidebarScroll() {
    const nav = document.getElementById('sidebar-nav');
    if (nav) {
      const savedScroll = sessionStorage.getItem('sidebarScroll');
      if (savedScroll) {
        nav.scrollTop = parseInt(savedScroll, 10);
      }
    }
  }

  // ==========================================
  // PUBLIC METHODS
  // ==========================================

  function toggleNotif() {
    const dropdown = document.getElementById('notifDropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar) {
      _state.sidebarOpen = !_state.sidebarOpen;
      sidebar.classList.toggle('hidden', !_state.sidebarOpen);
      sidebar.classList.toggle('flex', _state.sidebarOpen);
    }
  }

  function toggleTheme() {
    AppConfig.toggleTheme();
    // Re-render to update icons
    renderHeader();
  }

  function toggleLang() {
    AppConfig.toggleLang();
    // Full page reload to apply all translations
    location.reload();
  }

  function logout() {
    const msg = I18n.t('auth.logoutConfirm');
    if (confirm(msg)) {
      AppConfig.logout();
    }
  }

  function getCurrentUser() {
    return _state.currentUser ? { ..._state.currentUser } : null;
  }

  function refresh() {
    renderSidebar();
    renderHeader();
    I18n.applyToDOM();
  }

  // ==========================================
  // RETURN PUBLIC API
  // ==========================================
  return {
    init,
    renderSidebar,
    renderHeader,
    toggleNotif,
    toggleMobileSidebar,
    toggleTheme,
    toggleLang,
    logout,
    getCurrentUser,
    refresh
  };
})();

// ==========================================
// AUTO INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
});

// ==========================================
// GLOBAL EXPORTS (Backward Compatibility)
// ==========================================
if (typeof window !== 'undefined') {
  window.Layout = Layout;
  // Legacy function names
  window.changeTheme = Layout.toggleTheme;
  window.changeLang = Layout.toggleLang;
  window.doLogout = Layout.logout;
  window.toggleNotif = Layout.toggleNotif;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Layout;
}
