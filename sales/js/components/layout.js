/**
 * AndroGov Sales Layout Engine v1.1 (Complete)
 * @file sales/js/components/layout.js
 */

const Layout = (function() {
  
  // ==========================================
  // 1. الإعدادات والحالة
  // ==========================================
  let _state = {
    currentUser: null,
    activeRole: 'sales', 
    isInitialized: false,
    sidebarOpen: false,
    notifications: [],
    unreadCount: 0
  };

  const _roleLabels = {
    sales: {
        ar: 'مدير المبيعات',
        en: 'Sales Manager',
        desc: { ar: 'إدارة المبيعات والعملاء', en: 'Sales & Client Management' }
    }
  };

  // ==========================================
  // 2. تعريف القوائم
  // ==========================================
  const _menuDefinitions = {
    sales: [
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
  };

  const _translations = {
    ar: {
      sales_overview: 'نظرة عامة',
      sales_operations: 'عمليات المبيعات',
      client_management: 'إدارة العملاء',
      personal: 'الحساب الشخصي',
      dashboard: 'لوحة القيادة',
      sales_pipeline: 'خط المبيعات',
      sales_quotes: 'عروض الأسعار',
      sales_activities: 'الأنشطة',
      sales_clients: 'العملاء',
      my_profile: 'الملف الشخصي',
      switchWorkspace: 'تبديل بيئة العمل',
      selectRole: 'اختر الدور',
      notifications: 'الإشعارات',
      noNotifications: 'لا توجد إشعارات',
      markAllRead: 'قراءة الكل',
      logout: 'تسجيل الخروج',
      logoutConfirm: 'هل أنت متأكد؟',
      poweredBy: 'تطوير',
      aymanDev: 'أيمن المغربي',
      notifTitle: 'التنبيهات'
    },
    en: {
      sales_overview: 'Overview',
      sales_operations: 'Sales Ops',
      client_management: 'Client Mgmt',
      personal: 'Personal',
      dashboard: 'Dashboard',
      sales_pipeline: 'Pipeline',
      sales_quotes: 'Quotes',
      sales_activities: 'Activities',
      sales_clients: 'Clients',
      my_profile: 'Profile',
      switchWorkspace: 'Switch Workspace',
      selectRole: 'Select Role',
      notifications: 'Notifications',
      noNotifications: 'No notifications',
      markAllRead: 'Mark all read',
      logout: 'Logout',
      logoutConfirm: 'Are you sure?',
      poweredBy: 'Developed by',
      aymanDev: 'Ayman Almaghrabi',
      notifTitle: 'Notifications'
    }
  };

  // ==========================================
  // 3. التهيئة والتشغيل
  // ==========================================
  function init() {
    if (_state.isInitialized) return;

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      _state.currentUser = JSON.parse(storedUser);
    } else {
      _state.currentUser = {
        displayName: 'مدير المبيعات',
        avatar: 'https://ui-avatars.com/api/?name=Sales+Manager&background=FB4747&color=fff'
      };
    }
    
    _state.activeRole = 'sales';

    loadNotifications();
    applyLanguageSettings();
    renderSidebar();
    renderHeader();
    
    document.body.style.opacity = '1';
    
    // إغلاق قائمة التنبيهات عند النقر خارجها
    document.addEventListener('click', function(e) {
        const drop = document.getElementById('notifDropdown');
        const btn = document.getElementById('notifBtn');
        if(drop && !drop.classList.contains('hidden') && !drop.contains(e.target) && !btn.contains(e.target)) {
            drop.classList.add('hidden');
        }
    });

    _state.isInitialized = true;
    console.log("✅ Sales Layout Initialized Successfully");
  }

  // ==========================================
  // 4. اللغة والثيم
  // ==========================================
  function getCurrentLang() {
    return localStorage.getItem('lang') || 'ar';
  }

  function applyLanguageSettings() {
    const lang = getCurrentLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    const mainContent = document.querySelector('.main-content-wrapper');
    if (mainContent) {
        mainContent.classList.remove('ltr:lg:ml-64', 'rtl:lg:mr-64', 'lg:ml-64', 'lg:mr-64'); 
        if (lang === 'ar') {
            mainContent.classList.add('rtl:lg:mr-64');
        } else {
            mainContent.classList.add('ltr:lg:ml-64');
        }
    }
  }

  function t(key) {
    const lang = getCurrentLang();
    return _translations[lang]?.[key] || key;
  }

  // ==========================================
  // 5. التنبيهات
  // ==========================================
  function loadNotifications() {
    _state.notifications = [
        {
            id: 'n1',
            icon: 'fa-handshake',
            color: 'bg-green-100 text-green-600',
            title: { ar: 'تم إغلاق صفقة جديدة', en: 'Deal Won' },
            body: { ar: 'مشروع وزارة الشؤون البلدية', en: 'MOMRA Project approved' },
            time: '2m'
        },
        {
            id: 'n2',
            icon: 'fa-file-invoice',
            color: 'bg-blue-100 text-blue-600',
            title: { ar: 'عرض سعر بانتظار الاعتماد', en: 'Quote Pending' },
            body: { ar: 'شركة اليمامة - توريد أجهزة', en: 'Yamama Co - Hardware supply' },
            time: '1h'
        }
    ];
    _state.unreadCount = _state.notifications.length;
  }

  // ==========================================
  // 6. رسم القائمة الجانبية
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const lang = getCurrentLang();
    const isRTL = lang === 'ar';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = _menuDefinitions['sales'];

    let menuHTML = '';
    
    menuItems.forEach(group => {
      menuHTML += `<div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t(group.section)}</div>`;
      
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        const activeClass = isActive 
            ? "bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30" 
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";
        
        menuHTML += `
          <a href="${item.link}" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium transition-all duration-200 group mb-1 ${activeClass}">
            <div class="w-5 text-center"><i class="fa-solid ${item.icon}"></i></div>
            <span class="flex-1">${t(item.key)}</span>
          </a>
        `;
      });
    });

    const user = _state.currentUser;
    const sidePos = isRTL ? 'right-0 border-l' : 'left-0 border-r';
    const roleTitle = _roleLabels.sales[lang];

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${sidePos} z-50 h-screen w-64 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-2xl hidden lg:flex">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-chart-simple"></i></div>
            <div>
              <h1 class="font-bold text-base text-slate-800 dark:text-white">AndroGov</h1>
              <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest">Sales</p>
            </div>
          </div>
        </div>
        
        <div class="p-4 shrink-0">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <img src="${user.avatar}" class="w-10 h-10 rounded-full" onerror="this.src='https://ui-avatars.com/api/?name=Sales'">
                <div class="overflow-hidden flex-1">
                    <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${user.displayName}</p>
                    <p class="text-[10px] text-brandRed font-bold truncate">${roleTitle}</p>
                </div>
            </div>
        </div>

        <nav class="flex-1 overflow-y-auto custom-scroll pb-4">${menuHTML}</nav>
      </aside>
    `;
  }

  // ==========================================
  // 7. رسم الهيدر (تمت إضافة التنبيهات والبوت)
  // ==========================================
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;
    
    const lang = getCurrentLang();
    const isDark = document.documentElement.classList.contains('dark');
    const isRTL = lang === 'ar';

    // بناء قائمة التنبيهات
    const notifHTML = _state.notifications.map(n => `
        <div class="p-3 border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer flex gap-3 items-start">
            <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}">
                <i class="fa-solid ${n.icon} text-xs"></i>
            </div>
            <div>
                <p class="text-xs font-bold text-slate-800 dark:text-white">${n.title[lang]}</p>
                <p class="text-[10px] text-slate-500 mt-1">${n.body[lang]}</p>
                <p class="text-[9px] text-slate-400 mt-1">${n.time}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-4">
            <button onclick="Layout.toggleMobileSidebar()" class="lg:hidden text-slate-500"><i class="fa-solid fa-bars text-xl"></i></button>
        </div>
        
        <div class="flex items-center gap-3">
            
            <div class="relative">
                <button id="notifBtn" onclick="Layout.toggleNotif()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative flex items-center justify-center">
                    <i class="fa-regular fa-bell"></i>
                    ${_state.unreadCount > 0 ? `<span class="absolute top-2 right-2.5 w-2 h-2 bg-brandRed rounded-full border border-white dark:border-slate-800 animate-pulse"></span>` : ''}
                </button>
                
                <div id="notifDropdown" class="hidden absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                    <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                        <span class="text-xs font-bold text-slate-800 dark:text-white">${t('notifTitle')}</span>
                        <button class="text-[10px] text-brandRed hover:underline font-bold">${t('markAllRead')}</button>
                    </div>
                    <div class="max-h-64 overflow-y-auto custom-scroll">
                        ${notifHTML || `<div class="p-4 text-center text-xs text-slate-400">${t('noNotifications')}</div>`}
                    </div>
                </div>
            </div>

            <button onclick="Layout.toggleLang()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition">${lang === 'ar' ? 'EN' : 'ع'}</button>
            
            <button onclick="Layout.toggleTheme()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i></button>
            
            <button onclick="if(window.AndroBot) AndroBot.toggle()" class="w-9 h-9 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-brandRed hover:text-blue-600 transition group">
                <i class="fa-solid fa-robot group-hover:animate-bounce"></i>
            </button>

            <div class="h-6 w-px bg-slate-200 mx-1"></div>
            
            <button onclick="Layout.logout()" class="text-red-500 text-xs font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition"><i class="fa-solid fa-power-off"></i></button>
        </div>
      </header>
    `;
  }

  // ==========================================
  // 8. وظائف عامة
  // ==========================================
  function toggleNotif() {
    const drop = document.getElementById('notifDropdown');
    if(drop) drop.classList.toggle('hidden');
  }

  function toggleLang() {
    const newLang = getCurrentLang() === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', newLang);
    location.reload();
  }

  function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    renderHeader();
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    if(sidebar) {
        sidebar.classList.toggle('hidden');
        sidebar.classList.toggle('flex');
        sidebar.classList.toggle('fixed');
        sidebar.classList.toggle('inset-0');
        sidebar.classList.toggle('w-full');
        sidebar.classList.toggle('z-50');
    }
  }

  function logout() {
    if(confirm(t('logoutConfirm'))) {
        localStorage.removeItem('currentUser');
        window.location.href = '../login.html';
    }
  }

  return {
    init,
    toggleNotif,
    toggleLang,
    toggleTheme,
    toggleMobileSidebar,
    logout,
    t
  };
})();

// تشغيل المحرك تلقائياً
document.addEventListener('DOMContentLoaded', Layout.init);
window.Layout = Layout;
