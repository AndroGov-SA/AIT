/**
 * AndroGov Layout Engine v10.5 (Employee Edition)
 * @file employee/js/components/layout.js
 * @description Full-featured layout for Employees (Self-Service & Support)
 */

const Layout = (function() {
  
  let _state = {
    currentUser: null,
    activeRole: 'employee', 
    isInitialized: false,
    sidebarOpen: false,
    notifications: [],
    unreadCount: 0
  };

  // 2. القوائم المخصصة للموظف فقط
  const _menuDefinitions = {
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
  };

  const _roleLabels = {
    'employee': { 
      ar: 'بوابة الموظف', 
      en: 'Employee Portal',
      desc: { ar: 'الخدمات الذاتية والدعم', en: 'Self-Service & Support' }
    }
  };

  const _translations = {
    ar: {
      self_service: 'الخدمات الذاتية',
      support_docs: 'الدعم والمعرفة',
      personal: 'الحساب',
      dashboard: 'الرئيسية',
      my_requests: 'طلباتي',
      salary_slips: 'مسير الرواتب',
      it_support: 'الدعم الفني',
      company_policies: 'السياسات واللوائح',
      my_profile: 'الملف الشخصي',
      notifications: 'التنبيهات',
      noNotifications: 'لا توجد تنبيهات',
      markAllRead: 'تحديد الكل كمقروء',
      logout: 'تسجيل الخروج',
      logoutConfirm: 'هل أنت متأكد من الخروج؟',
      poweredBy: 'تطوير',
      aymanDev: 'أيمن المغربي'
    },
    en: {
      self_service: 'Self Service',
      support_docs: 'Support & Docs',
      personal: 'Personal',
      dashboard: 'Main',
      my_requests: 'My Requests',
      salary_slips: 'Pay Slips',
      it_support: 'IT Support',
      company_policies: 'Policies',
      my_profile: 'My Profile',
      notifications: 'Notifications',
      noNotifications: 'No alerts',
      markAllRead: 'Mark read',
      logout: 'Logout',
      logoutConfirm: 'Confirm logout?',
      poweredBy: 'Developed by',
      aymanDev: 'Ayman Almaghrabi'
    }
  };

  function getCurrentLang() { return localStorage.getItem('lang') || 'ar'; }

  function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const mainContent = document.querySelector('.main-content-wrapper');
    if (mainContent) {
      lang === 'ar' ? mainContent.classList.replace('md:ml-72', 'md:mr-72') : mainContent.classList.replace('md:mr-72', 'md:ml-72');
    }
    renderSidebar(); renderHeader();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function t(key) { return _translations[getCurrentLang()]?.[key] || key; }

  function loadNotifications() {
    _state.notifications = [
      { id: 'E1', type: 'salary', icon: 'fa-comment-dollar', color: 'green', title: { ar: 'تم إيداع الراتب', en: 'Salary Deposited' }, body: { ar: 'تم تحويل راتب شهر يناير', en: 'Jan salary has been transferred' }, time: new Date(), read: false, link: 'finance.html' }
    ];
    _state.unreadCount = _state.notifications.filter(n => !n.read).length;
  }

  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;
    const lang = getCurrentLang();
    const isRTL = lang === 'ar';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    let menuHTML = '';
    _menuDefinitions.employee.forEach(group => {
      menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t(group.section)}</div>`;
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        menuHTML += `
          <a href="${item.link}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${isActive ? 'bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 hover:text-brandRed'}">
            <div class="w-5 text-center"><i class="fa-solid ${item.icon}"></i></div>
            <span class="flex-1 truncate">${t(item.key)}</span>
            ${item.badge ? `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase">${item.badge}</span>` : ''}
          </a>`;
      });
    });

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl"><i class="fa-solid fa-user-tie"></i></div>
            <div>
              <h1 class="font-bold text-base text-slate-800 dark:text-white">AndroGov</h1>
              <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest">Self-Service</p>
            </div>
          </div>
        </div>
        <div class="p-4 shrink-0">
          <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border dark:border-slate-700">
            <img src="${_state.currentUser?.avatar}" class="w-11 h-11 rounded-full border-2 border-white object-cover">
            <div class="overflow-hidden flex-1">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${_state.currentUser?.displayName}</p>
              <p class="text-[10px] text-brandRed font-bold truncate uppercase">${_roleLabels.employee[lang]}</p>
            </div>
          </div>
        </div>
        <nav class="flex-1 overflow-y-auto px-3 py-2 custom-scroll">${menuHTML}</nav>
        <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800">
          <p class="text-[10px] text-slate-400 font-medium">© 2026 Andromeda IT</p>
        </div>
      </aside>`;
  }

  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;
    const lang = getCurrentLang();
    const isDark = document.documentElement.classList.contains('dark');

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500"><i class="fa-solid fa-bars text-xl"></i></button>
          <div class="hidden sm:block text-xs font-bold text-slate-500 uppercase tracking-widest border-r pr-4 border-slate-200">System_v10.5</div>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative group">
            <button class="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <i class="fa-solid fa-bell text-slate-600 dark:text-slate-300"></i>
              ${_state.unreadCount > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 bg-brandRed text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">${_state.unreadCount}</span>` : ''}
            </button>
          </div>

          <button onclick="Layout.toggleLanguage()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-xs">${lang === 'ar' ? 'EN' : 'ع'}</button>
          <button onclick="if(window.AndroBot) AndroBot.toggle()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-brandBlue flex items-center justify-center"><i class="fa-solid fa-robot"></i></button>
          <button onclick="Layout.toggleTheme()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400 flex items-center justify-center"><i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i></button>
          
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          
          <button onclick="Layout.logout()" class="text-red-500 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <i class="fa-solid fa-power-off"></i> <span class="hidden sm:inline">${t('logout')}</span>
          </button>
        </div>
      </header>`;
  }

  function toggleLanguage() { setLanguage(getCurrentLang() === 'ar' ? 'en' : 'ar'); }
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    renderHeader();
  }
  function logout() { if (confirm(t('logoutConfirm'))) { localStorage.clear(); window.location.href = '../login.html'; } }
  function toggleMobileSidebar() { const sb = document.getElementById('main-sidebar'); if(sb) sb.classList.toggle('-translate-x-full'); }

  async function init() {
    if (_state.isInitialized) return;
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) { _state.currentUser = JSON.parse(storedUser); }
    loadNotifications();
    renderSidebar();
    renderHeader();
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) setTimeout(() => overlay.classList.add('hidden'), 300);
    _state.isInitialized = true;
  }

  return { init, renderSidebar, renderHeader, toggleTheme, toggleLanguage, setLanguage, logout, toggleMobileSidebar, getCurrentLang, t };

})();

document.addEventListener('DOMContentLoaded', () => Layout.init());
window.Layout = Layout;
