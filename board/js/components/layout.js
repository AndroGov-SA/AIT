/**
 * AndroGov Layout Engine v10.5 (Board of Directors Edition)
 * @description Full-featured layout with Bot, Notifications, and Board-specific Menu
 */

const Layout = (function() {
  
  // ==========================================
  // 1. STATE & CONFIG
  // ==========================================
  let _state = {
    currentUser: null,
    activeRole: 'board_member', 
    isInitialized: false,
    sidebarOpen: false,
    notifications: [],
    unreadCount: 0
  };

  // ==========================================
  // 2. BOARD MENU DEFINITION (The only change)
  // ==========================================
  const _menuDefinitions = {
    'board_member': [
      { section: 'board_overview', items: [
        { key: 'dashboard', icon: 'fa-gauge-high', link: 'index.html', badge: 'live' },
        { key: 'meetings', icon: 'fa-calendar-days', link: 'meetings.html', badge: null },
        { key: 'communication', icon: 'fa-comments', link: 'communication.html', badge: 'new' }
      ]},
      { section: 'reports_finance', items: [
        { key: 'financial_reports', icon: 'fa-chart-pie', link: 'finance.html', badge: null },
        { key: 'governance_docs', icon: 'fa-folder-open', link: 'governance.html', badge: null }
      ]},
      { section: 'personal', items: [
        { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null }
      ]}
    ]
  };

  const _roleLabels = {
    'board_member': { 
      ar: 'عضو مجلس الإدارة', 
      en: 'Board Member',
      desc: { ar: 'بوابة قرارات واجتماعات المجلس', en: 'Board Decisions & Meetings Portal' }
    }
  };

  const _translations = {
    ar: {
      board_overview: 'بيئة المجلس',
      reports_finance: 'التقارير والحوكمة',
      personal: 'الحساب الشخصي',
      dashboard: 'الرئيسية',
      meetings: 'الاجتماعات',
      communication: 'التواصل والقرارات',
      financial_reports: 'التقارير المالية',
      governance_docs: 'وثائق الحوكمة',
      my_profile: 'الملف الشخصي',
      switchWorkspace: 'تبديل الدور',
      selectRole: 'اختر الصلاحية المطلوبة',
      notifications: 'الإشعارات',
      noNotifications: 'لا توجد إشعارات جديدة',
      markAllRead: 'تعليم الكل كمقروء',
      logout: 'تسجيل الخروج',
      logoutConfirm: 'هل أنت متأكد من تسجيل الخروج؟',
      poweredBy: 'تطوير',
      aymanDev: 'أيمن المغربي'
    },
    en: {
      board_overview: 'Board Hub',
      reports_finance: 'Reports & GRC',
      personal: 'Personal',
      dashboard: 'Dashboard',
      meetings: 'Meetings',
      communication: 'Comm. & Decisions',
      financial_reports: 'Financial Reports',
      governance_docs: 'Governance Docs',
      my_profile: 'My Profile',
      switchWorkspace: 'Switch Role',
      selectRole: 'Select required authority',
      notifications: 'Notifications',
      noNotifications: 'No new notifications',
      markAllRead: 'Mark all as read',
      logout: 'Logout',
      logoutConfirm: 'Are you sure you want to logout?',
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
      _state.activeRole = 'board_member'; // Force Board Role
    }

    loadNotifications();
    renderSidebar();
    renderHeader();
    hideLoadingOverlay();

    _state.isInitialized = true;
    console.log(`✅ Board Engine Ready | Bot & Notifications Active`);
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
      lang === 'ar' ? mainContent.classList.replace('md:ml-72', 'md:mr-72') : mainContent.classList.replace('md:mr-72', 'md:ml-72');
    }
    
    renderSidebar();
    renderHeader();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function t(key) { return _translations[getCurrentLang()]?.[key] || key; }

  // ==========================================
  // 5. NOTIFICATIONS SYSTEM (Back in!)
  // ==========================================
  function loadNotifications() {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      _state.notifications = JSON.parse(stored);
    } else {
      _state.notifications = [
        {
          id: 'N1', type: 'meeting', icon: 'fa-calendar-check', color: 'blue',
          title: { ar: 'اجتماع مجلس الإدارة', en: 'Board Meeting' },
          body: { ar: 'غداً الساعة 10:00 صباحاً', en: 'Tomorrow at 10:00 AM' },
          time: new Date(), read: false, link: 'meetings.html'
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
      localStorage.setItem('notifications', JSON.stringify(_state.notifications));
      renderHeader();
    }
  }

  function markAllRead() {
    _state.notifications.forEach(n => n.read = true);
    _state.unreadCount = 0;
    localStorage.setItem('notifications', JSON.stringify(_state.notifications));
    renderHeader();
  }

  function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    return getCurrentLang() === 'ar' ? `منذ فترة بسيطة` : `Just now`;
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
    const activeMenu = _menuDefinitions[_state.activeRole];

    let menuHTML = '';
    activeMenu.forEach(group => {
      menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">${t(group.section)}</div>`;
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        menuHTML += `
          <a href="${item.link}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group mb-1 ${isActive ? 'bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed'}">
            <div class="w-5 text-center transition-transform group-hover:scale-110"><i class="fa-solid ${item.icon}"></i></div>
            <span class="flex-1 truncate">${t(item.key)}</span>
            ${item.badge ? `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded ${item.badge === 'live' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'} text-white uppercase">${item.badge}</span>` : ''}
          </a>`;
      });
    });

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brandRed/30"><i class="fa-solid fa-crown"></i></div>
            <div>
              <h1 class="font-bold text-base text-slate-800 dark:text-white truncate">AndroGov</h1>
              <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest truncate">Board Portal</p>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border dark:border-slate-700">
            <img src="${_state.currentUser?.avatar || '../photo/admin.jpg'}" class="w-11 h-11 rounded-full border-2 border-white dark:border-slate-600 object-cover shadow-sm">
            <div class="overflow-hidden flex-1">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${_state.currentUser?.displayName || 'عضو المجلس'}</p>
              <p class="text-[10px] text-brandRed font-bold truncate uppercase tracking-tight">${_roleLabels[_state.activeRole][lang]}</p>
            </div>
          </div>
        </div>
        <nav class="flex-1 overflow-y-auto px-3 py-2 custom-scroll">${menuHTML}</nav>
        <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800 bg-slate-50/50">
          <p class="text-[10px] text-slate-400 font-medium">© 2026 Andromeda IT</p>
        </div>
      </aside>`;
  }

  // ==========================================
  // 7. RENDER HEADER (All Actions Back!)
  // ==========================================
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;
    const lang = getCurrentLang();
    const isRTL = lang === 'ar';

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500"><i class="fa-solid fa-bars text-xl"></i></button>
          <div class="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-brandRed">
            <i class="fa-solid fa-repeat mr-2"></i> ${_roleLabels[_state.activeRole][lang]}
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative group">
            <button class="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-orange-400 flex items-center justify-center">
              <i class="fa-solid fa-bell text-slate-600 dark:text-slate-300"></i>
              ${_state.unreadCount > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 bg-brandRed text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">${_state.unreadCount}</span>` : ''}
            </button>
            <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-3 w-80 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <div class="p-4 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-orange-500 to-amber-500 flex justify-between">
                <span class="text-sm font-bold text-white">${t('notifications')}</span>
                <button onclick="Layout.markAllRead()" class="text-xs text-white/90 underline">${t('markAllRead')}</button>
              </div>
              <div class="max-h-64 overflow-y-auto">
                ${_state.notifications.map(n => `
                  <a href="${n.link}" onclick="Layout.markNotificationRead('${n.id}')" class="flex gap-3 p-4 border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 ${!n.read ? 'bg-blue-50/20' : ''}">
                    <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><i class="fa-solid ${n.icon}"></i></div>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-bold text-slate-800 dark:text-white">${n.title[lang]}</p>
                      <p class="text-[10px] text-slate-500 truncate">${n.body[lang]}</p>
                    </div>
                  </a>`).join('')}
              </div>
            </div>
          </div>

          <button onclick="Layout.toggleLanguage()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-xs">${lang === 'ar' ? 'EN' : 'ع'}</button>
          <button onclick="if(window.AndroBot) AndroBot.toggle()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-brandBlue flex items-center justify-center"><i class="fa-solid fa-robot"></i></button>
          <button onclick="Layout.toggleTheme()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400 flex items-center justify-center"><i class="fa-solid ${document.documentElement.classList.contains('dark') ? 'fa-sun' : 'fa-moon'}"></i></button>
          
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button onclick="Layout.logout()" class="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
            <i class="fa-solid fa-power-off"></i> <span class="hidden sm:inline">${t('logout')}</span>
          </button>
        </div>
      </header>`;
  }

  // ==========================================
  // 8. HELPERS & EXPORTS
  // ==========================================
  function toggleLanguage() { setLanguage(getCurrentLang() === 'ar' ? 'en' : 'ar'); }
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    renderHeader();
  }
  function logout() { if (confirm(t('logoutConfirm'))) { localStorage.clear(); window.location.href = '../login.html'; } }
  function toggleMobileSidebar() { const sb = document.getElementById('main-sidebar'); if(sb) sb.classList.toggle('-translate-x-full'); }

  return { init, renderSidebar, renderHeader, toggleTheme, toggleLanguage, setLanguage, logout, toggleMobileSidebar, markNotificationRead, markAllRead, getCurrentLang, t };

})();

document.addEventListener('DOMContentLoaded', () => Layout.init());
window.Layout = Layout;
