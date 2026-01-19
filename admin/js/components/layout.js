/**
 * AndroGov Layout Engine v10.5 (Complete Edition with Lang + Notifications)
 * @file admin/js/components/layout.js
 * @author Ayman Al-Maghrabi
 * @description Full-featured layout with language switching and notification center
 */

const Layout = (function() {
  
  // ==========================================
  // 1. STATE & CONFIG
  // ==========================================
  let _state = {
    currentUser: null,
    activeRole: 'admin', 
    isInitialized: false,
    sidebarOpen: false,
    notifications: [],
    unreadCount: 0
  };

  // ==========================================
  // 2. COMPLETE MENU DEFINITIONS (19 Pages)
  // ==========================================
  const _menuDefinitions = {
    
    // ═══════════════════════════════════════
    // 1️⃣ مدير النظام (System Admin) - 7 صفحات
    // ═══════════════════════════════════════
    'admin': [
      { section: 'core_system', items: [
        { key: 'dashboard', icon: 'fa-gauge-high', link: 'index.html', badge: null },
        { key: 'users_mgmt', icon: 'fa-users-gear', link: 'users.html', badge: 'core' },
        { key: 'admin_settings', icon: 'fa-sliders', link: 'admin_settings.html', badge: null }
      ]},
      { section: 'infrastructure', items: [
        { key: 'it_systems', icon: 'fa-microchip', link: 'it.html', badge: 'tech' },
        { key: 'system_audit', icon: 'fa-terminal', link: 'audit.html', badge: null }
      ]},
      { section: 'communication', items: [
        { key: 'internal_chat', icon: 'fa-comments', link: 'admin_chat.html', badge: 'new' },
        { key: 'circulars_admin', icon: 'fa-bullhorn', link: 'admin_circulars.html', badge: null }
      ]}
    ],

    // ═══════════════════════════════════════
    // 2️⃣ أمين سر مجلس الإدارة (Board Secretary) - 5 صفحات
    // ═══════════════════════════════════════
    'board_secretary': [
      { section: 'board_operations', items: [
        { key: 'board_portal', icon: 'fa-building-columns', link: 'board.html', badge: 'primary' },
        { key: 'committees_mgmt', icon: 'fa-people-group', link: 'committees.html', badge: null },
        { key: 'general_assembly', icon: 'fa-users-rectangle', link: 'ga.html', badge: 'assembly' }
      ]},
      { section: 'governance_docs', items: [
        { key: 'policies_library', icon: 'fa-book-open', link: 'policies.html', badge: null },
        { key: 'board_circulars', icon: 'fa-scroll', link: 'admin_circulars.html', badge: null }
      ]}
    ],

    // ═══════════════════════════════════════
    // 3️⃣ أمين سر لجنة المراجعة (Audit Committee) - 5 صفحات
    // ═══════════════════════════════════════
    'audit_secretary': [
      { section: 'audit_oversight', items: [
        { key: 'audit_dashboard', icon: 'fa-magnifying-glass-chart', link: 'audit.html', badge: 'audit' },
        { key: 'financial_review', icon: 'fa-money-bill-trend-up', link: 'finance.html', badge: null },
        { key: 'procurement_control', icon: 'fa-boxes-packing', link: 'procurement.html', badge: 'orders' }
      ]},
      { section: 'compliance_tasks', items: [
        { key: 'compliance_check', icon: 'fa-scale-balanced', link: 'compliance.html', badge: null },
        { key: 'task_tracker', icon: 'fa-list-check', link: 'tasks.html', badge: 'active' }
      ]}
    ],

    // ═══════════════════════════════════════
    // 4️⃣ مسؤول علاقات المساهمين (Investor Relations) - 4 صفحات
    // ═══════════════════════════════════════
    'investor_relations': [
      { section: 'shareholders', items: [
        { key: 'shareholders_db', icon: 'fa-id-card', link: 'shareholders.html', badge: 'investors' },
        { key: 'ga_access', icon: 'fa-landmark', link: 'ga.html', badge: null }
      ]},
      { section: 'personal', items: [
        { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null },
        { key: 'ir_circulars', icon: 'fa-envelope-open-text', link: 'admin_circulars.html', badge: null }
      ]}
    ],

    // ═══════════════════════════════════════
    // 5️⃣ مسؤول الحوكمة والمخاطر (GRC Officer) - 6 صفحات
    // ═══════════════════════════════════════
    'grc_officer': [
      { section: 'grc_compliance', items: [
        { key: 'compliance_dashboard', icon: 'fa-scale-balanced', link: 'compliance.html', badge: 'grc' },
        { key: 'doa_authority', icon: 'fa-sitemap', link: 'doa.html', badge: 'authority' },
        { key: 'policies_control', icon: 'fa-book-open', link: 'policies.html', badge: null }
      ]},
      { section: 'hr_governance', items: [
        { key: 'hr_compliance', icon: 'fa-user-shield', link: 'hr.html', badge: 'hr' },
        { key: 'audit_reports', icon: 'fa-file-contract', link: 'audit.html', badge: null }
      ]},
      { section: 'workflow', items: [
        { key: 'grc_tasks', icon: 'fa-clipboard-check', link: 'tasks.html', badge: null }
      ]}
    ]
  };

  // Role Labels (Bilingual)
  const _roleLabels = {
    'admin': { 
      ar: 'مدير النظام', 
      en: 'System Admin',
      desc: { ar: 'الإدارة التقنية والرقابة الشاملة', en: 'Technical & System Management' }
    },
    'board_secretary': { 
      ar: 'أمين سر مجلس الإدارة', 
      en: 'Board Secretary',
      desc: { ar: 'إدارة المجلس واللجان والجمعيات', en: 'Board & Committee Management' }
    },
    'audit_secretary': { 
      ar: 'أمين سر لجنة المراجعة', 
      en: 'Audit Committee Secretary',
      desc: { ar: 'الرقابة المالية والتدقيق الداخلي', en: 'Financial Audit & Control' }
    },
    'investor_relations': { 
      ar: 'علاقات المساهمين', 
      en: 'Investor Relations',
      desc: { ar: 'إدارة بيانات المستثمرين والملاك', en: 'Shareholder Data Management' }
    },
    'grc_officer': { 
      ar: 'مسؤول GRC والامتثال', 
      en: 'GRC Officer',
      desc: { ar: 'الحوكمة والمخاطر والالتزام', en: 'Governance, Risk & Compliance' }
    }
  };

  // Translation Keys (Fallback)
  const _translations = {
    ar: {
      // Sections
      core_system: 'النظام الأساسي',
      infrastructure: 'البنية التحتية',
      communication: 'الاتصالات',
      board_operations: 'عمليات المجلس',
      governance_docs: 'وثائق الحوكمة',
      audit_oversight: 'الرقابة والتدقيق',
      compliance_tasks: 'مهام الامتثال',
      shareholders: 'المساهمين',
      personal: 'الحساب الشخصي',
      grc_compliance: 'الحوكمة والامتثال',
      hr_governance: 'حوكمة الموارد البشرية',
      workflow: 'سير العمل',
      
      // Menu Items
      dashboard: 'لوحة القيادة',
      users_mgmt: 'إدارة المستخدمين',
      admin_settings: 'إعدادات النظام',
      it_systems: 'الأنظمة التقنية',
      system_audit: 'سجل التدقيق',
      internal_chat: 'المحادثات الداخلية',
      circulars_admin: 'التعاميم الإدارية',
      board_portal: 'بوابة المجلس',
      committees_mgmt: 'إدارة اللجان',
      general_assembly: 'الجمعية العمومية',
      policies_library: 'مكتبة السياسات',
      board_circulars: 'تعاميم المجلس',
      audit_dashboard: 'لوحة التدقيق',
      financial_review: 'المراجعة المالية',
      procurement_control: 'إدارة المشتريات',
      compliance_check: 'فحص الامتثال',
      task_tracker: 'متابعة المهام',
      shareholders_db: 'قاعدة المساهمين',
      ga_access: 'الجمعية العمومية',
      my_profile: 'الملف الشخصي',
      ir_circulars: 'التعاميم',
      compliance_dashboard: 'لوحة الامتثال',
      doa_authority: 'مصفوفة الصلاحيات',
      policies_control: 'ضبط السياسات',
      hr_compliance: 'امتثال الموارد البشرية',
      audit_reports: 'تقارير التدقيق',
      grc_tasks: 'مهام GRC',
      
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
      core_system: 'Core System',
      infrastructure: 'Infrastructure',
      communication: 'Communications',
      board_operations: 'Board Operations',
      governance_docs: 'Governance Documents',
      audit_oversight: 'Audit & Oversight',
      compliance_tasks: 'Compliance Tasks',
      shareholders: 'Shareholders',
      personal: 'Personal',
      grc_compliance: 'GRC & Compliance',
      hr_governance: 'HR Governance',
      workflow: 'Workflow',
      
      // Menu Items
      dashboard: 'Dashboard',
      users_mgmt: 'User Management',
      admin_settings: 'System Settings',
      it_systems: 'IT Systems',
      system_audit: 'Audit Log',
      internal_chat: 'Internal Chat',
      circulars_admin: 'Admin Circulars',
      board_portal: 'Board Portal',
      committees_mgmt: 'Committees',
      general_assembly: 'General Assembly',
      policies_library: 'Policy Library',
      board_circulars: 'Board Circulars',
      audit_dashboard: 'Audit Dashboard',
      financial_review: 'Financial Review',
      procurement_control: 'Procurement',
      compliance_check: 'Compliance Check',
      task_tracker: 'Task Tracker',
      shareholders_db: 'Shareholders DB',
      ga_access: 'General Assembly',
      my_profile: 'My Profile',
      ir_circulars: 'Circulars',
      compliance_dashboard: 'Compliance Dashboard',
      doa_authority: 'DOA Matrix',
      policies_control: 'Policy Control',
      hr_compliance: 'HR Compliance',
      audit_reports: 'Audit Reports',
      grc_tasks: 'GRC Tasks',
      
      // UI Elements
      switchWorkspace: 'Switch Workspace',
      selectRole: 'Select the appropriate role for your current tasks',
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
      
      // Validate Saved Role
      let savedRole = localStorage.getItem('activeRole');
      if (savedRole && _menuDefinitions[savedRole]) {
        _state.activeRole = savedRole;
      } else {
        _state.activeRole = 'admin';
        localStorage.setItem('activeRole', 'admin');
      }
    }

    // Load Notifications
    loadNotifications();

    // Render UI
    renderSidebar();
    renderHeader();
    hideLoadingOverlay();

    _state.isInitialized = true;
    console.log(`✅ AndroGov Layout Ready | Role: ${_state.activeRole} | Lang: ${getCurrentLang()}`);
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
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // ✅ Fix main content wrapper margins for RTL/LTR
    const mainContent = document.querySelector('.main-content-wrapper');
    if (mainContent) {
      if (lang === 'ar') {
        mainContent.classList.remove('md:ml-72');
        mainContent.classList.add('md:mr-72');
      } else {
        mainContent.classList.remove('md:mr-72');
        mainContent.classList.add('md:ml-72');
      }
    }
    
    // Re-render UI
    renderSidebar();
    renderHeader();
    
    // ✅ Trigger event BEFORE updating page content
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    
    // ✅ Update current page content if updateContent function exists
    if (typeof window.updateContent === 'function') {
      setTimeout(() => window.updateContent(), 100);
    }
    
    // ✅ Update I18n if available
    if (window.I18n && typeof I18n.setLanguage === 'function') {
      I18n.setLanguage(lang);
    }
    
    // Show feedback
    if (window.Toast) {
      const msg = lang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English';
      Toast.success(msg);
    }
    
    console.log(`🌐 Language changed to: ${lang}`);
  }

  function t(key) {
    const lang = getCurrentLang();
    return _translations[lang]?.[key] || key;
  }

  // ==========================================
  // 5. NOTIFICATIONS SYSTEM
  // ==========================================
  function loadNotifications() {
    // Load from localStorage or generate demo data
    const stored = localStorage.getItem('notifications');
    if (stored) {
      _state.notifications = JSON.parse(stored);
    } else {
      // Demo Notifications
      _state.notifications = [
        {
          id: 'N001',
          type: 'approval',
          icon: 'fa-file-signature',
          color: 'orange',
          title: { ar: 'اعتماد مطلوب: الدليل الداخلي', en: 'Approval Required: Internal Manual' },
          body: { ar: 'مسودة بانتظار الموافقة النهائية', en: 'Draft awaiting final approval' },
          time: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
          read: false,
          link: 'policies.html'
        },
        {
          id: 'N002',
          type: 'meeting',
          icon: 'fa-calendar-check',
          color: 'blue',
          title: { ar: 'اجتماع لجنة المراجعة', en: 'Audit Committee Meeting' },
          body: { ar: 'غداً الساعة 10:00 صباحاً', en: 'Tomorrow at 10:00 AM' },
          time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: false,
          link: 'committees.html'
        },
        {
          id: 'N003',
          type: 'task',
          icon: 'fa-list-check',
          color: 'green',
          title: { ar: 'مهمة جديدة: تحديث السجل التجاري', en: 'New Task: Update Commercial Registry' },
          body: { ar: 'تم تعيينك من قبل منصور اليامي', en: 'Assigned by Mansour Alyami' },
          time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
          read: true,
          link: 'tasks.html'
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
      saveNotifications();
      renderHeader(); // Update badge
    }
  }

  function markAllRead() {
    _state.notifications.forEach(n => n.read = true);
    _state.unreadCount = 0;
    saveNotifications();
    renderHeader();
    
    if (window.Toast) {
      Toast.success(t('markAllRead'));
    }
  }

  function saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(_state.notifications));
  }

  function getTimeAgo(date) {
    const lang = getCurrentLang();
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return lang === 'ar' ? 'الآن' : 'Now';
    if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      return lang === 'ar' ? `منذ ${mins} دقيقة` : `${mins}m ago`;
    }
    if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return lang === 'ar' ? `منذ ${hours} ساعة` : `${hours}h ago`;
    }
    const days = Math.floor(seconds / 86400);
    return lang === 'ar' ? `منذ ${days} يوم` : `${days}d ago`;
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

    const activeMenu = _menuDefinitions[_state.activeRole] || _menuDefinitions['admin'];

    let menuHTML = '';
    activeMenu.forEach(group => {
      const sectionLabel = t(group.section);
      
      menuHTML += `
        <div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          ${sectionLabel}
        </div>
      `;
      
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        const label = t(item.key);
        
        const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group mb-1";
        const activeClass = "bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30";
        const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed dark:hover:text-red-400";

        let badgeHTML = '';
        if (item.badge) {
          const badgeStyles = {
            'core': 'bg-blue-500', 'new': 'bg-green-500 animate-pulse', 
            'tech': 'bg-purple-500', 'primary': 'bg-amber-500', 
            'assembly': 'bg-indigo-500', 'audit': 'bg-red-500',
            'orders': 'bg-orange-500', 'active': 'bg-teal-500',
            'investors': 'bg-pink-500', 'grc': 'bg-cyan-500',
            'authority': 'bg-violet-500', 'hr': 'bg-emerald-500'
          };
          const badgeClass = badgeStyles[item.badge] || 'bg-slate-400';
          badgeHTML = `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded ${badgeClass} text-white uppercase tracking-wider">${item.badge}</span>`;
        }

        menuHTML += `
          <a href="${item.link}" class="${baseClass} ${isActive ? activeClass : inactiveClass}">
            <div class="w-5 text-center transition-transform group-hover:scale-110">
              <i class="fa-solid ${item.icon}"></i>
            </div>
            <span class="flex-1 truncate">${label}</span>
            ${badgeHTML}
            ${isActive ? '<div class="w-1.5 h-1.5 rounded-full bg-white"></div>' : ''}
          </a>
        `;
      });
    });

    const user = _state.currentUser;
    const displayName = user?.displayName || user?.name || (lang === 'ar' ? 'أيمن المغربي' : 'Ayman Almaghrabi');
    const roleLabel = _roleLabels[_state.activeRole][lang];

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-2xl">
        
        <!-- Logo -->
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-gradient-to-${isRTL ? 'l' : 'r'} from-slate-50 to-transparent dark:from-slate-900/50">
          <div class="flex items-center gap-3 w-full">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brandRed to-red-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brandRed/30">
              <i class="fa-solid fa-layer-group"></i>
            </div>
            <div class="overflow-hidden">
              <h1 class="font-bold text-base text-slate-800 dark:text-white truncate">AndroGov</h1>
              <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest truncate">Enterprise</p>
            </div>
          </div>
        </div>
        
        <!-- User Card -->
        <div class="p-4 shrink-0">
          <div class="relative group cursor-pointer">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
              <img src="${user?.avatar || '../photo/admin.jpg'}" 
                   class="w-11 h-11 rounded-full border-2 border-white dark:border-slate-600 object-cover shadow-md" 
                   onerror="this.src='https://ui-avatars.com/api/?name=Ayman&background=DC2626&color=fff&bold=true'">
              <div class="overflow-hidden flex-1 min-w-0">
                <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${displayName}</p>
                <p class="text-[10px] text-brandRed font-bold truncate uppercase tracking-tight">${roleLabel}</p>
              </div>
              <i class="fa-solid fa-chevron-down text-slate-400 text-xs"></i>
            </div>
            <div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <a href="profile.html" class="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <i class="fa-solid fa-user-circle text-brandRed"></i>
                <span class="text-xs font-medium">${t('my_profile')}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 custom-scroll">
          ${menuHTML}
        </nav>
        
        <!-- Footer -->
        <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <p class="text-[10px] text-slate-400 font-medium">© 2026 Andromeda IT</p>
          <p class="text-[9px] text-slate-300 dark:text-slate-600 mt-1">${t('poweredBy')} ${t('aymanDev')}</p>
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
    const isRTL = lang === 'ar';
    const isDark = document.documentElement.classList.contains('dark');

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        
        <div class="flex items-center gap-4">
          <!-- Mobile Menu -->
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed transition-colors">
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
          
          <!-- Role Switcher -->
          <div class="relative group">
            <button class="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:border-brandRed dark:hover:border-red-500 transition-all shadow-sm hover:shadow-md">
              <i class="fa-solid fa-repeat text-brandRed animate-pulse"></i>
              <span class="hidden sm:inline text-slate-700 dark:text-slate-200">${_roleLabels[_state.activeRole][lang]}</span>
              <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 transition-transform group-hover:rotate-180"></i>
            </button>
            
            <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-3 w-80 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div class="p-4 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-brandRed to-red-600">
                <p class="text-xs font-bold text-white/90 uppercase tracking-widest">${t('switchWorkspace')}</p>
                <p class="text-[10px] text-white/70 mt-1">${t('selectRole')}</p>
              </div>
              <div class="p-2 max-h-96 overflow-y-auto custom-scroll">
                ${Object.entries(_roleLabels).map(([roleKey, labels]) => `
                  <button onclick="Layout.switchRole('${roleKey}')" 
                          class="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all ${roleKey === _state.activeRole ? 'bg-red-50 dark:bg-red-900/20 border-2 border-brandRed/30' : 'border-2 border-transparent'} mb-2">
                    <div class="w-10 h-10 rounded-lg ${roleKey === _state.activeRole ? 'bg-brandRed text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'} flex items-center justify-center shrink-0">
                      <i class="fa-solid ${_getRoleIcon(roleKey)} text-sm"></i>
                    </div>
                    <div class="flex-1 text-${isRTL ? 'right' : 'left'}">
                      <p class="text-xs font-bold ${roleKey === _state.activeRole ? 'text-brandRed' : 'text-slate-700 dark:text-slate-200'}">${labels[lang]}</p>
                      <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">${labels.desc[lang]}</p>
                    </div>
                    ${roleKey === _state.activeRole ? '<i class="fa-solid fa-check text-brandRed text-sm"></i>' : ''}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          
          <!-- Notifications -->
          <div class="relative group">
            <button class="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-slate-600 dark:text-slate-300 hover:border-orange-400 transition-all flex items-center justify-center">
              <i class="fa-solid fa-bell"></i>
              ${_state.unreadCount > 0 ? `
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-brandRed text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  ${_state.unreadCount}
                </span>
              ` : ''}
            </button>
            
            <!-- Notifications Dropdown -->
            <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-3 w-96 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div class="p-4 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-orange-500 to-amber-500 flex justify-between items-center">
                <div>
                  <p class="text-sm font-bold text-white">${t('notifications')}</p>
                  <p class="text-[10px] text-white/80">${_state.unreadCount} ${lang === 'ar' ? 'غير مقروءة' : 'unread'}</p>
                </div>
                ${_state.unreadCount > 0 ? `
                  <button onclick="Layout.markAllRead()" class="text-xs text-white/90 hover:text-white underline">
                    ${t('markAllRead')}
                  </button>
                ` : ''}
              </div>
              
              <div class="max-h-96 overflow-y-auto custom-scroll">
                ${_state.notifications.length === 0 ? `
                  <div class="p-8 text-center text-slate-400">
                    <i class="fa-solid fa-bell-slash text-4xl mb-3"></i>
                    <p class="text-sm">${t('noNotifications')}</p>
                  </div>
                ` : _state.notifications.map(notif => {
                  const colorStyles = {
                    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30',
                    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
                    green: 'bg-green-100 text-green-600 dark:bg-green-900/30',
                    red: 'bg-red-100 text-red-600 dark:bg-red-900/30'
                  };
                  const colorClass = colorStyles[notif.color] || colorStyles.blue;
                  
                  return `
                    <a href="${notif.link}" onclick="Layout.markNotificationRead('${notif.id}')" 
                       class="flex gap-3 p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${!notif.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}">
                      <div class="w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center shrink-0">
                        <i class="fa-solid ${notif.icon}"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs font-bold text-slate-800 dark:text-white truncate">${notif.title[lang]}</p>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${notif.body[lang]}</p>
                        <p class="text-[10px] text-slate-400 mt-1">${getTimeAgo(new Date(notif.time))}</p>
                      </div>
                      ${!notif.read ? '<div class="w-2 h-2 rounded-full bg-brandRed animate-pulse"></div>' : ''}
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Language Switcher -->
          <button onclick="Layout.toggleLanguage()" 
                  class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 hover:border-blue-400 transition-all flex items-center justify-center font-bold text-xs">
            ${lang === 'ar' ? 'EN' : 'ع'}
          </button>
          
          <!-- AI Bot -->
          <button onclick="if(window.AndroBot) AndroBot.toggle()" 
                  class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-brandBlue hover:border-blue-400 transition-all flex items-center justify-center group">
            <i class="fa-solid fa-robot group-hover:animate-bounce"></i>
          </button>
          
          <!-- Theme Toggle -->
          <button onclick="Layout.toggleTheme()" 
                  class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-900/20 text-slate-600 dark:text-yellow-400 hover:border-amber-400 transition-all">
            <i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
          </button>
          
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
          
          <!-- Logout -->
          <button onclick="Layout.logout()" 
                  class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border-2 border-transparent hover:border-red-200">
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
  
  function _getRoleIcon(roleKey) {
    const icons = {
      'admin': 'fa-user-shield',
      'board_secretary': 'fa-pen-to-square',
      'audit_secretary': 'fa-clipboard-list',
      'investor_relations': 'fa-id-card-clip',
      'grc_officer': 'fa-shield-halved'
    };
    return icons[roleKey] || 'fa-user';
  }

  function switchRole(roleKey) {
    if (!_menuDefinitions[roleKey]) {
      console.warn(`⚠️ Invalid role: ${roleKey}`);
      return;
    }
    
    _state.activeRole = roleKey;
    localStorage.setItem('activeRole', roleKey);
    
    renderSidebar();
    renderHeader();
    
    if (window.Toast) {
      const lang = getCurrentLang();
      Toast.success(lang === 'ar' ? 
        `تم التبديل إلى: ${_roleLabels[roleKey].ar}` :
        `Switched to: ${_roleLabels[roleKey].en}`
      );
    }
    
    console.log(`🔄 Role switched to: ${roleKey}`);
  }

  function toggleLanguage() {
    const currentLang = getCurrentLang();
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  }

  function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    renderHeader();
    
    if (window.Toast) {
      const lang = getCurrentLang();
      const msg = lang === 'ar' ?
        (isDark ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري') :
        (isDark ? 'Dark mode enabled' : 'Light mode enabled');
      Toast.info(msg);
    }
  }

  function logout() {
    const lang = getCurrentLang();
    const confirmMsg = lang === 'ar' ? 
      'هل أنت متأكد من تسجيل الخروج؟' :
      'Are you sure you want to logout?';
      
    if (confirm(confirmMsg)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('activeRole');
      window.location.href = '../login.html';
    }
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
      sidebar.classList.toggle('translate-x-0');
    }
  }

  // ==========================================
  // 9. PUBLIC API
  // ==========================================
  return {
    init,
    renderSidebar,
    renderHeader,
    toggleTheme,
    toggleLanguage,
    setLanguage,
    logout,
    toggleMobileSidebar,
    switchRole,
    markNotificationRead,
    markAllRead,
    getActiveRole: () => _state.activeRole,
    getCurrentLang,
    t
  };

})();

// Auto-Initialize
document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
});

// Global Exposure
window.Layout = Layout;
