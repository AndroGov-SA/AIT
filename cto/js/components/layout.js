/**
 * AndroGov Layout Engine v10.5 (CTO Edition)
 * @file admin/js/components/layout.js
 * @author Ayman Al-Maghrabi
 * @description Full-featured layout for Chief Technology Officer (CTO) with 12 technical modules.
 */

const Layout = (function() {
  
  // ==========================================
  // 1. STATE & CONFIG
  // ==========================================
  let _state = {
    currentUser: null,
    activeRole: 'cto', 
    isInitialized: false,
    sidebarOpen: false,
    notifications: [],
    unreadCount: 0
  };

  // ==========================================
  // 2. CTO MENU DEFINITION (12 Pages)
  // ==========================================
  const _menuDefinitions = {
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
  };

  // ==========================================
  // 3. TRANSLATIONS (Updated for CTO modules)
  // ==========================================
  const _translations = {
    ar: {
      it_infrastructure: 'البنية التحتية التقنية',
      telecom_systems: 'أنظمة الاتصالات',
      ops_governance: 'العمليات والحوكمة',
      support_personal: 'الدعم والحساب',
      dashboard: 'لوحة التحكم الرقمية',
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
      my_profile: 'الملف الشخصي',
      notifications: 'الإشعارات التكنولوجية',
      noNotifications: 'لا توجد تنبيهات تقنية',
      markAllRead: 'تعليم الكل كمقروء',
      logout: 'تسجيل الخروج',
      logoutConfirm: 'هل أنت متأكد من تسجيل الخروج من بيئة CTO؟',
      poweredBy: 'تطوير',
      aymanDev: 'أيمن المغربي'
    },
    en: {
      it_infrastructure: 'IT Infrastructure',
      telecom_systems: 'Telecom Systems',
      ops_governance: 'Ops & Governance',
      support_personal: 'Support & Personal',
      dashboard: 'Tech Dashboard',
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
      my_profile: 'My Profile',
      notifications: 'Tech Notifications',
      noNotifications: 'No alerts',
      markAllRead: 'Mark all as read',
      logout: 'Logout',
      logoutConfirm: 'Confirm logout from CTO environment?',
      poweredBy: 'Developed by',
      aymanDev: 'Ayman Almaghrabi'
    }
  };

  // ==========================================
  // 4. LANGUAGE SYSTEM (Logic Preserved)
  // ==========================================
  function getCurrentLang() { return localStorage.getItem('lang') || 'ar'; }

  function setLanguage(lang) {
    if (!['ar', 'en'].includes(lang)) return;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const mainContent = document.querySelector('.main-content-wrapper');
    if (mainContent) {
      lang === 'ar' ? (mainContent.classList.remove('md:ml-72'), mainContent.classList.add('md:mr-72')) : (mainContent.classList.remove('md:mr-72'), mainContent.classList.add('md:ml-72'));
    }
    renderSidebar(); renderHeader();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function t(key) { return _translations[getCurrentLang()]?.[key] || key; }

  // ==========================================
  // 5. NOTIFICATIONS SYSTEM (Logic Preserved)
  // ==========================================
  function loadNotifications() {
    const stored = localStorage.getItem('notifications');
    _state.notifications = stored ? JSON.parse(stored) : [
      { id: 'CTO001', type: 'alert', icon: 'fa-triangle-exclamation', color: 'red', title: { ar: 'تنبيه أمني: SOC', en: 'SOC Security Alert' }, body: { ar: 'محاولة وصول غير مصرح بها للسيرفر الرئيسي', en: 'Unauthorized access attempt' }, time: new Date(), read: false, link: 'cto_soc.html' }
    ];
    _state.unreadCount = _state.notifications.filter(n => !n.read).length;
  }

  function markNotificationRead(id) {
    const notif = _state.notifications.find(n => n.id === id);
    if (notif && !notif.read) {
      notif.read = true; _state.unreadCount--;
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

  // ==========================================
  // 6. RENDER SIDEBAR (CTO Style)
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;
    const lang = getCurrentLang();
    const isRTL = lang === 'ar';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    let menuHTML = '';
    _menuDefinitions.cto.forEach(group => {
      menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">${t(group.section)}</div>`;
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        menuHTML += `
          <a href="${item.link}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group mb-1 ${isActive ? 'bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed'}">
            <div class="w-5 text-center transition-transform group-hover:scale-110"><i class="fa-solid ${item.icon}"></i></div>
            <span class="flex-1 truncate">${t(item.key)}</span>
            ${item.badge ? `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-slate-500/50 text-white uppercase">${item.badge}</span>` : ''}
          </a>`;
      });
    });

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-2xl">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brandRed to-red-600 text-white flex items-center justify-center font-bold text-xl shadow-lg"><i class="fa-solid fa-microchip"></i></div>
            <div>
              <h1 class="font-bold text-base text-slate-800 dark:text-white">AndroGov</h1>
              <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest">CTO Control</p>
            </div>
          </div>
        </div>
        <div class="p-4 shrink-0">
          <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
            <img src="${_state.currentUser?.avatar || '../photo/admin.jpg'}" class="w-11 h-11 rounded-full border-2 border-white dark:border-slate-600 object-cover">
            <div class="min-w-0 flex-1">
              <p class="text-xs font-bold text-slate-800 dark:text-white truncate">${_state.currentUser?.displayName || 'Chief Tech Officer'}</p>
              <p class="text-[9px] text-brandRed font-bold uppercase truncate">CTO / IT Director</p>
            </div>
          </div>
        </div>
        <nav class="flex-1 overflow-y-auto px-3 py-2 custom-scroll">${menuHTML}</nav>
        <div class="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p class="text-[10px] text-slate-400">© 2026 Tech Operations</p>
        </div>
      </aside>`;
  }

  // ==========================================
  // 7. RENDER HEADER (Bot, Notifications, etc. Preserved)
  // ==========================================
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;
    const lang = getCurrentLang();
    const isRTL = lang === 'ar';

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500"><i class="fa-solid fa-bars text-xl"></i></button>
          <div class="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300">
             <i class="fa-solid fa-terminal mr-2 text-brandRed"></i> CTO_ENVIRONMENT_v10.5
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative group">
            <button class="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-brandRed flex items-center justify-center">
              <i class="fa-solid fa-bell"></i>
              ${_state.unreadCount > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 bg-brandRed text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">${_state.unreadCount}</span>` : ''}
            </button>
            <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-3 w-96 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
               <div class="p-4 border-b border-slate-100 dark:border-slate-700 bg-brandRed flex justify-between items-center text-white">
                <p class="text-sm font-bold">${t('notifications')}</p>
                <button onclick="Layout.markAllRead()" class="text-xs underline">${t('markAllRead')}</button>
              </div>
              <div class="max-h-80 overflow-y-auto">
                ${_state.notifications.map(n => `
                  <a href="${n.link}" onclick="Layout.markNotificationRead('${n.id}')" class="flex gap-3 p-4 border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 ${!n.read ? 'bg-red-50/10' : ''}">
                    <div class="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0"><i class="fa-solid ${n.icon}"></i></div>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-bold text-slate-800 dark:text-white truncate">${n.title[lang]}</p>
                      <p class="text-[11px] text-slate-500 mt-0.5">${n.body[lang]}</p>
                    </div>
                  </a>`).join('')}
              </div>
            </div>
          </div>

          <button onclick="Layout.toggleLanguage()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-xs">${lang === 'ar' ? 'EN' : 'ع'}</button>
          <button onclick="if(window.AndroBot) AndroBot.toggle()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-brandBlue flex items-center justify-center group"><i class="fa-solid fa-robot group-hover:animate-bounce"></i></button>
          <button onclick="Layout.toggleTheme()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400 flex items-center justify-center"><i class="fa-solid ${document.documentElement.classList.contains('dark') ? 'fa-sun' : 'fa-moon'}"></i></button>
          
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          
          <button onclick="Layout.logout()" class="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
            <i class="fa-solid fa-power-off"></i> <span class="hidden sm:inline">${t('logout')}</span>
          </button>
        </div>
      </header>`;
  }

  // ==========================================
  // 8. LOGIC HELPERS & INITIALIZATION
  // ==========================================
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
    console.log("✅ CTO Environment Ready with all original features.");
  }

  return { init, renderSidebar, renderHeader, toggleTheme, toggleLanguage, setLanguage, logout, toggleMobileSidebar, markNotificationRead, markAllRead, getCurrentLang, t };

})();

document.addEventListener('DOMContentLoaded', () => Layout.init());
window.Layout = Layout;
