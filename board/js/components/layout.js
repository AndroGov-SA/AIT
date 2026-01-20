/**
 * AndroGov Layout Engine v10.5 (Board of Directors Edition)
 * @file admin/js/components/layout.js
 * @description Specialized layout for Board of Directors only
 */

const Layout = (function() {
  
  // ==========================================
  // 1. STATE & CONFIG
  // ==========================================
  let _state = {
    currentUser: null,
    activeRole: 'board_member', // الدور الافتراضي الوحيد
    isInitialized: false,
    sidebarOpen: false,
    notifications: [],
    unreadCount: 0
  };

  // ==========================================
  // 2. BOARD MENU DEFINITIONS (المجلدات المطلوبة فقط)
  // ==========================================
  const _menuDefinitions = {
    'board_member': [
      { section: 'board_operations', items: [
        { key: 'dashboard', icon: 'fa-gauge-high', link: 'index.html', badge: null },
        { key: 'board_meetings', icon: 'fa-calendar-check', link: 'meetings.html', badge: 'active' },
        { key: 'board_governance', icon: 'fa-scale-balanced', link: 'governance.html', badge: null }
      ]},
      { section: 'financial_oversight', items: [
        { key: 'financial_reports', icon: 'fa-chart-line', link: 'finance.html', badge: 'Q4' }
      ]},
      { section: 'communication_hub', items: [
        { key: 'board_comm', icon: 'fa-comments', link: 'communication.html', badge: 'new' },
        { key: 'my_profile', icon: 'fa-user-tie', link: 'profile.html', badge: null }
      ]}
    ]
  };

  // Role Labels
  const _roleLabels = {
    'board_member': { 
      ar: 'عضو مجلس الإدارة', 
      en: 'Board Member',
      desc: { ar: 'الوصول لصلاحيات المجلس والتقارير المالية', en: 'Board access & financial reports' }
    }
  };

  // Translation Keys
  const _translations = {
    ar: {
      board_operations: 'أعمال المجلس',
      financial_oversight: 'الرقابة المالية',
      communication_hub: 'مركز التواصل',
      dashboard: 'لوحة التحكم',
      board_meetings: 'الاجتماعات',
      board_governance: 'الحوكمة',
      financial_reports: 'التقارير المالية',
      board_comm: 'المراسلات',
      my_profile: 'الملف الشخصي',
      switchWorkspace: 'بيئة العمل',
      selectRole: 'صلاحيات مجلس الإدارة',
      notifications: 'الإشعارات',
      noNotifications: 'لا توجد إشعارات',
      markAllRead: 'تحديد الكل كمقروء',
      logout: 'تسجيل الخروج',
      poweredBy: 'تطوير',
      aymanDev: 'أيمن المغربي'
    },
    en: {
      board_operations: 'Board Operations',
      financial_oversight: 'Financial Oversight',
      communication_hub: 'Communication Hub',
      dashboard: 'Dashboard',
      board_meetings: 'Meetings',
      board_governance: 'Governance',
      financial_reports: 'Financial Reports',
      board_comm: 'Communications',
      my_profile: 'My Profile',
      switchWorkspace: 'Workspace',
      selectRole: 'Board of Directors Access',
      notifications: 'Notifications',
      noNotifications: 'No Notifications',
      markAllRead: 'Mark all as read',
      logout: 'Logout',
      poweredBy: 'Developed by',
      aymanDev: 'Ayman Almaghrabi'
    }
  };

  // ==========================================
  // 3. INITIALIZATION
  // ==========================================
  async function init() {
    if (_state.isInitialized) return;

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      _state.currentUser = JSON.parse(storedUser);
    }
    
    // Force board role
    _state.activeRole = 'board_member';
    localStorage.setItem('activeRole', 'board_member');

    loadNotifications();
    renderSidebar();
    renderHeader();
    hideLoadingOverlay();

    _state.isInitialized = true;
  }

  function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) setTimeout(() => overlay.classList.add('hidden'), 300);
  }

  // ==========================================
  // 4. LANGUAGE SYSTEM
  // ==========================================
  function getCurrentLang() { return localStorage.getItem('lang') || 'ar'; }

  function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    const mainContent = document.querySelector('.main-content-wrapper');
    if (mainContent) {
      if (lang === 'ar') {
        mainContent.classList.replace('md:ml-72', 'md:mr-72');
      } else {
        mainContent.classList.replace('md:mr-72', 'md:ml-72');
      }
    }
    
    renderSidebar();
    renderHeader();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function t(key) {
    const lang = getCurrentLang();
    return _translations[lang]?.[key] || key;
  }

  // ==========================================
  // 5. NOTIFICATIONS
  // ==========================================
  function loadNotifications() {
    _state.notifications = [
      {
        id: 'B001',
        icon: 'fa-file-invoice-dollar',
        color: 'green',
        title: { ar: 'تقرير مالي جديد', en: 'New Financial Report' },
        body: { ar: 'تقرير الربع الرابع متاح للمراجعة', en: 'Q4 report ready for review' },
        time: new Date(),
        read: false,
        link: 'finance.html'
      }
    ];
    _state.unreadCount = _state.notifications.filter(n => !n.read).length;
  }

  // ==========================================
  // 6. RENDER SIDEBAR
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const lang = getCurrentLang();
    const isRTL = lang === 'ar';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const activeMenu = _menuDefinitions['board_member'];

    let menuHTML = '';
    activeMenu.forEach(group => {
      menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t(group.section)}</div>`;
      
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 group";
        const activeClass = "bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30";
        const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";

        menuHTML += `
          <a href="${item.link}" class="${baseClass} ${isActive ? activeClass : inactiveClass}">
            <div class="w-5 text-center"><i class="fa-solid ${item.icon}"></i></div>
            <span class="flex-1 truncate">${t(item.key)}</span>
            ${item.badge ? `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500 text-white">${item.badge}</span>` : ''}
          </a>
        `;
      });
    });

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 shadow-2xl">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-transparent">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-red-500/30">
              <i class="fa-solid fa-crown"></i>
            </div>
            <div>
              <h1 class="font-bold text-base text-slate-800 dark:text-white">AndroGov</h1>
              <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest">Board Portal</p>
            </div>
          </div>
        </div>
        
        <nav class="flex-1 overflow-y-auto px-3 py-4 custom-scroll">${menuHTML}</nav>

        <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800">
          <p class="text-[10px] text-slate-400 font-medium">© 2026 Board of Directors</p>
        </div>
      </aside>
    `;
  }

  // ==========================================
  // 7. RENDER HEADER
  // ==========================================
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const lang = getCurrentLang();
    const isDark = document.documentElement.classList.contains('dark');

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500"><i class="fa-solid fa-bars text-xl"></i></button>
          <div class="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
             <i class="fa-solid fa-shield-check text-brandRed"></i>
             <span class="text-xs font-bold text-slate-700 dark:text-slate-200">${_roleLabels.board_member[lang]}</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="Layout.toggleLanguage()" class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs">
            ${lang === 'ar' ? 'EN' : 'ع'}
          </button>
          <button onclick="Layout.toggleTheme()" class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400">
            <i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
          </button>
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <button onclick="Layout.logout()" class="text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-50 transition-all">
            <i class="fa-solid fa-power-off mr-2"></i> ${t('logout')}
          </button>
        </div>
      </header>
    `;
  }

  // ==========================================
  // 8. UTILITIES
  // ==========================================
  function toggleLanguage() { setLanguage(getCurrentLang() === 'ar' ? 'en' : 'ar'); }
  
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    renderHeader();
  }

  function logout() {
    if (confirm(t('logout'))) window.location.href = '../login.html';
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar) sidebar.classList.toggle('-translate-x-full');
  }

  return {
    init,
    renderSidebar,
    renderHeader,
    toggleTheme,
    toggleLanguage,
    logout,
    toggleMobileSidebar,
    getCurrentLang,
    t
  };

})();

document.addEventListener('DOMContentLoaded', () => Layout.init());
window.Layout = Layout;
