/**
 * AndroGov Layout Engine v9.1 (Ayman's Professional Multi-Role Edition)
 * @file admin/js/components/layout.js
 * @description specialized for Ayman Al-Maghrabi with robust role-switching logic.
 */

const Layout = (function() {
  
  // ==========================================
  // 1. STATE & CONFIG
  // ==========================================
  let _state = {
    currentUser: null,
    activeRole: 'admin', 
    isInitialized: false,
    sidebarOpen: false
  };

  // ==========================================
  // 2. MENU DEFINITIONS (Distributed across Ayman's 5 Roles)
  // ==========================================
  const _menuDefinitions = {
    
    // --- 1. مدير النظام (Admin) ---
    // مسؤول عن إدارة الحسابات، الإعدادات التقنية، والرقابة الشاملة
    'admin': [
      { section: 'system_management', items: [
        { key: 'dashboard', icon: 'fa-gauge-high', link: 'index.html' },
        { key: 'users', icon: 'fa-users-gear', link: 'users.html' },
        { key: 'it_infrastructure', icon: 'fa-microchip', link: 'it.html' },
        { key: 'settings', icon: 'fa-sliders', link: 'admin_settings.html' }
      ]},
      { section: 'system_logs', items: [
        { key: 'audit_log', icon: 'fa-terminal', link: 'audit.html' },
        { key: 'chat_internal', icon: 'fa-comments', link: 'admin_chat.html' }
      ]}
    ],

    // --- 2. أمين سر مجلس الإدارة (Board Secretary) ---
    // مسؤول عن اجتماعات المجلس، الجمعية العمومية، والتعاميم الرسمية
    'board_secretary': [
      { section: 'board_affairs', items: [
        { key: 'board_dashboard', icon: 'fa-building-columns', link: 'board.html' },
        { key: 'committees', icon: 'fa-people-group', link: 'committees.html' },
        { key: 'general_assembly', icon: 'fa-users-rectangle', link: 'ga.html' }
      ]},
      { section: 'official_comms', items: [
        { key: 'circulars', icon: 'fa-bullhorn', link: 'admin_circulars.html' },
        { key: 'policies_lib', icon: 'fa-book-open', link: 'policies.html' }
      ]}
    ],

    // --- 3. أمين سر لجنة المراجعة (Audit Secretary) ---
    // مسؤول عن التدقيق، الرقابة المالية، والمهام المرتبطة باللجنة
    'audit_secretary': [
      { section: 'audit_control', items: [
        { key: 'audit_dashboard', icon: 'fa-magnifying-glass-chart', link: 'audit.html' },
        { key: 'finance_audit', icon: 'fa-money-bill-trend-up', link: 'finance.html' },
        { key: 'procurement', icon: 'fa-boxes-packing', link: 'procurement.html' }
      ]},
      { section: 'task_mgmt', items: [
        { key: 'tasks_list', icon: 'fa-list-check', link: 'tasks.html' }
      ]}
    ],

    // --- 4. مسؤول علاقات المساهمين (Investor Relations) ---
    // إدارة بيانات المساهمين والملفات الشخصية المرتبطة بهم
    'investor_relations': [
      { section: 'shareholders_mgmt', items: [
        { key: 'shareholders_list', icon: 'fa-id-card', link: 'shareholders.html' },
        { key: 'ga_portal', icon: 'fa-landmark', link: 'ga.html' }
      ]},
      { section: 'profiles', items: [
        { key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html' }
      ]}
    ],

    // --- 5. مسؤول الحوكمة والمخاطر والالتزام (GRC Officer) ---
    // مراقبة الامتثال، مصفوفة الصلاحيات، واللوائح الإدارية
    'grc_officer': [
      { section: 'compliance_grc', items: [
        { key: 'compliance_dash', icon: 'fa-scale-balanced', link: 'compliance.html' },
        { key: 'doa_matrix', icon: 'fa-sitemap', link: 'doa.html' },
        { key: 'hr_governance', icon: 'fa-user-shield', link: 'hr.html' }
      ]},
      { section: 'official_docs', items: [
        { key: 'policies_mgmt', icon: 'fa-book-open', link: 'policies.html' }
      ]}
    ]
  };

  // مسميات الأدوار لعرضها في زر التبديل (Header Switcher)
  const _roleLabels = {
    'admin': { ar: 'مدير النظام', en: 'System Admin' },
    'board_secretary': { ar: 'أمين سر مجلس الإدارة', en: 'Board Secretary' },
    'audit_secretary': { ar: 'أمين سر لجنة المراجعة', en: 'Audit Secretary' },
    'investor_relations': { ar: 'علاقات المساهمين', en: 'Investor Relations' },
    'grc_officer': { ar: 'مسؤول GRC والامتثال', en: 'GRC Officer' }
  };
    
  // ==========================================
  // 3. INITIALIZATION
  // ==========================================
  async function init() {
    if (_state.isInitialized) return;

    // Load User from LocalStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      _state.currentUser = JSON.parse(storedUser);
      
      // ✅ حل مشكلة "عدم الفتح": التحقق من أن الدور المخزن موجود فعلياً في القوائم
      let savedRole = localStorage.getItem('activeRole');
      if (savedRole && _menuDefinitions[savedRole]) {
          _state.activeRole = savedRole;
      } else {
          _state.activeRole = 'admin'; // العودة للأدمن كخيار آمن
          localStorage.setItem('activeRole', 'admin');
      }
    }

    renderSidebar();
    renderHeader();

    // إخفاء شاشة التحميل (Failsafe)
    const overlay = document.getElementById('loadingOverlay');
    if(overlay) overlay.classList.add('hidden');

    _state.isInitialized = true;
    console.log(`✅ Admin Layout Ready - Context: ${_state.activeRole}`);
  }

  // ==========================================
  // 4. RENDER SIDEBAR
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const isRTL = document.documentElement.dir === 'rtl';
    const lang = isRTL ? 'ar' : 'en';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // الحصول على القائمة بناءً على الدور النشط حالياً
    const activeMenu = _menuDefinitions[_state.activeRole] || _menuDefinitions['admin'];

    let menuHTML = '';
    activeMenu.forEach(group => {
      // محاولة الترجمة عبر I18n أو استخدام اسم القسم الخام
      const sectionLabel = (window.I18n) ? (I18n.t(`nav.${group.section}`) || group.section) : group.section;
      
      menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${sectionLabel}</div>`;
      
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        const label = (window.I18n) ? (I18n.t(`nav.${item.key}`) || item.key) : item.key;
        
        const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group mb-1";
        const activeClass = "bg-brandRed text-white shadow-md shadow-red-500/20";
        const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";

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

    const user = _state.currentUser;
    const displayName = user?.displayName || user?.name || 'أيمن المغربي';
    const roleLabel = _roleLabels[_state.activeRole][lang];

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
        
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div class="flex items-center gap-3 w-full">
            <div class="w-10 h-10 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brandRed/20">
                <i class="fa-solid fa-layer-group"></i>
            </div>
            <div class="overflow-hidden">
              <h1 class="font-bold text-sm text-slate-800 dark:text-white truncate">AndroGov</h1>
              <p class="text-[10px] text-slate-500 uppercase tracking-widest truncate">Ayman's Workspace</p>
            </div>
          </div>
        </div>
        
        <div class="p-4 shrink-0">
          <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
             <img src="${user?.avatar || '../photo/admin.jpg'}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 object-cover" onerror="this.src='https://ui-avatars.com/api/?name=Ayman'">
            <div class="overflow-hidden flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${displayName}</p>
              <p class="text-[10px] text-brandRed font-bold truncate uppercase tracking-tighter">${roleLabel}</p>
            </div>
          </div>
        </div>

        <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 custom-scroll">
          ${menuHTML}
        </nav>
        
        <div class="p-4 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
          © 2026 Andromeda IT
        </div>
      </aside>
    `;
  }

  // ==========================================
  // 5. RENDER HEADER (With Role Switcher)
  // ==========================================
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const isDark = document.documentElement.classList.contains('dark');
    const isRTL = document.documentElement.dir === 'rtl';
    const lang = isRTL ? 'ar' : 'en';

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all">
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed transition">
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
          
          <!-- Role Switcher Tool -->
          <div class="relative group">
            <button class="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:border-brandRed transition-all">
                <i class="fa-solid fa-shuffle text-brandRed"></i>
                <span class="hidden sm:inline">${_roleLabels[_state.activeRole][lang]}</span>
                <i class="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
            </button>
            <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                <div class="p-3 border-b border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-widest">تبديل بيئة العمل</div>
                <div class="p-1">
                    ${Object.entries(_roleLabels).map(([roleKey, labels]) => `
                        <button onclick="Layout.switchRole('${roleKey}')" class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${roleKey === _state.activeRole ? 'text-brandRed font-bold bg-red-50/50 dark:bg-red-900/10' : 'text-slate-600 dark:text-slate-300'}">
                            <i class="fa-solid ${_getRoleIcon(roleKey)} ${roleKey === _state.activeRole ? 'text-brandRed' : 'text-slate-400'}"></i>
                            <span class="text-xs">${labels[lang]}</span>
                            ${roleKey === _state.activeRole ? '<i class="fa-solid fa-check ms-auto text-[10px]"></i>' : ''}
                        </button>
                    `).join('')}
                </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="if(window.AndroBot) AndroBot.toggle()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-brandBlue transition flex items-center justify-center">
             <i class="fa-solid fa-robot"></i>
          </button>
          <button onclick="Layout.toggleTheme()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition">
            <i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
          </button>
          <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button onclick="Layout.logout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2">
            <i class="fa-solid fa-power-off"></i> 
            <span class="hidden sm:inline">خروج</span>
          </button>
        </div>
      </header>
    `;
  }

  // ==========================================
  // 6. UTILS & ACTIONS
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
    if (!_menuDefinitions[roleKey]) return;
    
    _state.activeRole = roleKey;
    localStorage.setItem('activeRole', roleKey);
    
    // إعادة بناء الواجهة ديناميكياً بدون تحديث الصفحة
    renderSidebar();
    renderHeader();
    
    console.log(`🔄 Switched workspace to: ${roleKey}`);
  }

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    renderHeader(); 
  }

  function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('activeRole');
    window.location.href = '../login.html';
  }

  function toggleMobileSidebar() {
      const s = document.getElementById('main-sidebar');
      if(s) {
          s.classList.toggle('hidden');
          s.classList.toggle('flex');
      }
  }

  return { init, renderSidebar, renderHeader, toggleTheme, logout, toggleMobileSidebar, switchRole };

})();

// Auto-init
document.addEventListener('DOMContentLoaded', Layout.init);
window.Layout = Layout;
