/**
 * AndroGov Sales Layout Engine v1.0 (Fixed)
 * @file sales/js/components/layout.js
 * @author Ayman Al-Maghrabi
 * @description Executive layout with multi-role support
 */

const Layout = (function() {
  
  // ==========================================
  // 1. STATE & CONFIG
  // ==========================================
  let _state = {
    currentUser: null,
    activeRole: 'sales', 
    isInitialized: false,
    sidebarOpen: false,
    notifications: [],
    unreadCount: 0
  };

  // ==========================================
  // 2. DATA DEFINITIONS 
  // ==========================================
  
  // تعريف الأدوار (مهم جداً للهيدر)
  const _roleLabels = {
    sales: {
        ar: 'مدير المبيعات',
        en: 'Sales Manager',
        desc: { ar: 'إدارة المبيعات والعملاء', en: 'Sales & Client Management' }
    }
  };

  const _menuDefinitions = {
    // 💼 SALES PORTAL
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

  // Translation Keys (تم تغيير الاسم ليطابق المستخدم في الدوال)
  const _translations = {
    ar: {
      // Sections
      sales_overview: 'نظرة عامة',
      sales_operations: 'عمليات المبيعات',
      client_management: 'إدارة العملاء',
      personal: 'الحساب الشخصي',
      
      // Menu Items
      dashboard: 'لوحة القيادة',
      sales_pipeline: 'خط المبيعات',
      sales_quotes: 'عروض الأسعار',
      sales_activities: 'الأنشطة',
      sales_clients: 'قائمة العملاء',
      my_profile: 'الملف الشخصي',
      
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
      // Sections
      sales_overview: 'Overview',
      sales_operations: 'Sales Operations',
      client_management: 'Client Management',
      personal: 'Personal',
      
      // Menu Items
      dashboard: 'Dashboard',
      sales_pipeline: 'Pipeline',
      sales_quotes: 'Quotes',
      sales_activities: 'Activities',
      sales_clients: 'Clients',
      my_profile: 'My Profile',
      
      // UI Elements
      switchWorkspace: 'Switch Workspace',
      selectRole: 'Select role',
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

  // ==========================================
  // 3. INITIALIZATION
  // ==========================================
  async function init() {
    if (_state.isInitialized) return;

    // Load User Data
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      _state.currentUser = JSON.parse(storedUser);
      
      let savedRole = localStorage.getItem('activeRole'); 
      // التأكد من أن الدور المحفوظ موجود في التعريفات، وإلا نعود للافتراضي
      if (savedRole && _menuDefinitions[savedRole]) {
        _state.activeRole = savedRole;
      } else {
        _state.activeRole = 'sales';
      }
    } else {
      _state.activeRole = 'sales';
    }

    // Load Notifications
    loadNotifications();

    // Render UI
    renderSidebar();
    renderHeader();
    
    // الأهم: إظهار الصفحة
    document.body.style.opacity = '1';
    hideLoadingOverlay();

    _state.isInitialized = true;
    console.log(`✅ AndroGov Sales Layout Ready | Role: ${_state.activeRole}`);
  }

  function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      setTimeout(() => overlay.classList.add('hidden'), 300);
    }
  }

  // ==========================================
  // 4. LANGUAGE SYSTEM
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
        mainContent.classList.remove('lg:ml-64');
        mainContent.classList.add('lg:mr-64');
      } else {
        mainContent.classList.remove('lg:mr-64');
        mainContent.classList.add('lg:ml-64');
      }
    }
    
    renderSidebar();
    renderHeader();
    location.reload(); 
  }

  function t(key) {
    const lang = getCurrentLang();
    return _translations[lang]?.[key] || key;
  }

  // ==========================================
  // 5. NOTIFICATIONS SYSTEM
  // ==========================================
  function loadNotifications() {
    // Demo Data
    _state.notifications = [
        {
          id: 'N1',
          icon: 'fa-sack-dollar',
          color: 'bg-green-100 text-green-600',
          title: { ar: 'صفقة جديدة مغلقة', en: 'New Deal Closed' },
          body: { ar: 'تم إغلاق صفقة شركة اليمامة بنجاح', en: 'Yamama Co deal closed successfully' },
          time: new Date(),
          read: false
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

    // استخدام القائمة الصحيحة بناءً على الدور
    const activeMenu = _menuDefinitions[_state.activeRole] || _menuDefinitions['sales'];

    let menuHTML = '';
    activeMenu.forEach(group => {
      const sectionLabel = t(group.section);
      
      menuHTML += `
        <div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          ${sectionLabel}
        </div>
      `;
      
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        const label = t(item.key);
        
        const baseClass = "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium transition-all duration-200 group mb-1";
        const activeClass = "bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30";
        const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed dark:hover:text-red-400";

        menuHTML += `
          <a href="${item.link}" class="${baseClass} ${isActive ? activeClass : inactiveClass}">
            <div class="w-5 text-center transition-transform group-hover:scale-110">
              <i class="fa-solid ${item.icon}"></i>
            </div>
            <span class="flex-1 truncate">${label}</span>
          </a>
        `;
      });
    });

    const user = _state.currentUser || {};
    const displayName = user.displayName || 'User';
    const roleTitle = _roleLabels[_state.activeRole]?.[lang] || 'Sales';

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-64 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-2xl hidden lg:flex">
        
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div class="flex items-center gap-3 w-full">
            <div class="w-10 h-10 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-brandRed/30">
              <i class="fa-solid fa-chart-pie"></i>
            </div>
            <div>
              <h1 class="font-bold text-base text-slate-800 dark:text-white">AndroGov</h1>
              <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest">Sales</p>
            </div>
          </div>
        </div>
        
        <div class="p-4 shrink-0">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <img src="${user.avatar || 'https://ui-avatars.com/api/?name=User'}" class="w-10 h-10 rounded-full">
              <div class="overflow-hidden flex-1">
                <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${displayName}</p>
                <p class="text-[10px] text-slate-500 font-bold truncate">${roleTitle}</p>
              </div>
            </div>
        </div>

        <nav class="flex-1 overflow-y-auto custom-scroll pb-4">
          ${menuHTML}
        </nav>
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
    const roleLabel = _roleLabels[_state.activeRole]?.[lang] || 'Sales';

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="lg:hidden text-slate-500 hover:text-brandRed">
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
          
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <i class="fa-solid fa-shield-halved text-brandRed"></i>
            <span class="text-xs font-bold text-slate-600 dark:text-slate-300">${roleLabel}</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="Layout.toggleLanguage()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-white text-xs font-bold transition">
            ${lang === 'ar' ? 'EN' : 'ع'}
          </button>
          
          <button onclick="Layout.toggleTheme()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition">
            <i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
          </button>
          
          <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          
          <button onclick="Layout.logout()" class="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
            <i class="fa-solid fa-power-off"></i> 
            <span class="hidden sm:inline">${t('logout')}</span>
          </button>
        </div>
      </header>
    `;
  }

  // ==========================================
  // 8. UTILITY FUNCTIONS
  // ==========================================
  function toggleLanguage() {
    setLanguage(getCurrentLang() === 'ar' ? 'en' : 'ar');
  }

  function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    renderHeader();
  }

  function logout() {
    if (confirm(t('logoutConfirm'))) {
      localStorage.removeItem('currentUser');
      window.location.href = '../login.html';
    }
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('hidden');
      sidebar.classList.toggle('flex');
      sidebar.classList.toggle('fixed');
      sidebar.classList.toggle('inset-0');
      sidebar.classList.toggle('z-50');
      sidebar.classList.toggle('w-full');
    }
  }

  return {
    init,
    renderSidebar,
    renderHeader,
    toggleTheme,
    toggleLanguage,
    logout,
    toggleMobileSidebar,
    t
  };

})();

// تشغيل المحرك عند جاهزية الصفحة
document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
});

// إتاحة الوصول للمحرك من الخارج
window.Layout = Layout;
