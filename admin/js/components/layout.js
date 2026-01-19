/**
 * AndroGov Layout Engine v10.0 (Complete Edition - 19 Pages)
 * @file admin/js/components/layout.js
 * @author Ayman Al-Maghrabi
 * @description Comprehensive role-based navigation covering all admin pages
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
  // 2. COMPLETE MENU DEFINITIONS (19 Pages Distributed)
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
    // 3️⃣ أمين سر لجنة المراجعة (Audit Committee Secretary) - 5 صفحات
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
    // 5️⃣ مسؤول الحوكمة والمخاطر والالتزام (GRC Officer) - 6 صفحات
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

  // Labels for Role Switcher
  const _roleLabels = {
    'admin': { 
      ar: 'مدير النظام', 
      en: 'System Admin',
      desc: 'الإدارة التقنية والرقابة الشاملة'
    },
    'board_secretary': { 
      ar: 'أمين سر مجلس الإدارة', 
      en: 'Board Secretary',
      desc: 'إدارة المجلس واللجان والجمعيات'
    },
    'audit_secretary': { 
      ar: 'أمين سر لجنة المراجعة', 
      en: 'Audit Committee Secretary',
      desc: 'الرقابة المالية والتدقيق الداخلي'
    },
    'investor_relations': { 
      ar: 'علاقات المساهمين', 
      en: 'Investor Relations',
      desc: 'إدارة بيانات المستثمرين والملاك'
    },
    'grc_officer': { 
      ar: 'مسؤول GRC والامتثال', 
      en: 'GRC Officer',
      desc: 'الحوكمة والمخاطر والالتزام'
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
      
      // ✅ التحقق من صحة الدور المحفوظ
      let savedRole = localStorage.getItem('activeRole');
      if (savedRole && _menuDefinitions[savedRole]) {
        _state.activeRole = savedRole;
      } else {
        _state.activeRole = 'admin';
        localStorage.setItem('activeRole', 'admin');
      }
    }

    renderSidebar();
    renderHeader();
    hideLoadingOverlay();

    _state.isInitialized = true;
    console.log(`✅ AndroGov Layout Ready | Active Role: ${_state.activeRole}`);
  }

  function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      setTimeout(() => overlay.classList.add('hidden'), 300);
    }
  }

  // ==========================================
  // 4. RENDER SIDEBAR (Enhanced with Badges)
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const isRTL = document.documentElement.dir === 'rtl';
    const lang = isRTL ? 'ar' : 'en';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const activeMenu = _menuDefinitions[_state.activeRole] || _menuDefinitions['admin'];

    let menuHTML = '';
    activeMenu.forEach(group => {
      const sectionLabel = window.I18n ? 
        (I18n.t(`nav.${group.section}`) || group.section) : 
        group.section;
      
      menuHTML += `
        <div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          ${sectionLabel}
        </div>
      `;
      
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        const label = window.I18n ? 
          (I18n.t(`nav.${item.key}`) || item.key) : 
          item.key;
        
        const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group mb-1";
        const activeClass = "bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30";
        const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed dark:hover:text-red-400";

        // Badge Rendering
        let badgeHTML = '';
        if (item.badge) {
          const badgeStyles = {
            'core': 'bg-blue-500 text-white',
            'new': 'bg-green-500 text-white animate-pulse',
            'tech': 'bg-purple-500 text-white',
            'primary': 'bg-amber-500 text-white',
            'assembly': 'bg-indigo-500 text-white',
            'audit': 'bg-red-500 text-white',
            'orders': 'bg-orange-500 text-white',
            'active': 'bg-teal-500 text-white',
            'investors': 'bg-pink-500 text-white',
            'grc': 'bg-cyan-500 text-white',
            'authority': 'bg-violet-500 text-white',
            'hr': 'bg-emerald-500 text-white'
          };
          const badgeClass = badgeStyles[item.badge] || 'bg-slate-400 text-white';
          badgeHTML = `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded ${badgeClass} uppercase tracking-wider">${item.badge}</span>`;
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
    const displayName = user?.displayName || user?.name || 'أيمن المغربي';
    const roleLabel = _roleLabels[_state.activeRole][lang];
    const roleDesc = _roleLabels[_state.activeRole].desc;

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-2xl">
        
        <!-- Logo Section -->
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900/50">
          <div class="flex items-center gap-3 w-full">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brandRed to-red-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brandRed/30">
              <i class="fa-solid fa-layer-group"></i>
            </div>
            <div class="overflow-hidden">
              <h1 class="font-bold text-base text-slate-800 dark:text-white truncate">AndroGov</h1>
              <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest truncate">Enterprise Edition</p>
            </div>
          </div>
        </div>
        
        <!-- User Profile Card -->
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
            <!-- Quick Actions Tooltip -->
            <div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <a href="profile.html" class="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <i class="fa-solid fa-user-circle text-brandRed"></i>
                <span class="text-xs font-medium">الملف الشخصي</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 custom-scroll">
          ${menuHTML}
        </nav>
        
        <!-- Footer -->
        <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <p class="text-[10px] text-slate-400 font-medium">© 2026 Andromeda IT Company</p>
          <p class="text-[9px] text-slate-300 dark:text-slate-600 mt-1">Developed by Ayman Al-Maghrabi</p>
        </div>
      </aside>
    `;
  }

  // ==========================================
  // 5. RENDER HEADER (Enhanced Role Switcher)
  // ==========================================
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const isDark = document.documentElement.classList.contains('dark');
    const isRTL = document.documentElement.dir === 'rtl';
    const lang = isRTL ? 'ar' : 'en';

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        
        <div class="flex items-center gap-4">
          <!-- Mobile Menu Toggle -->
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed transition-colors">
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
          
          <!-- Advanced Role Switcher -->
          <div class="relative group">
            <button class="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:border-brandRed dark:hover:border-red-500 transition-all shadow-sm hover:shadow-md">
              <i class="fa-solid fa-repeat text-brandRed animate-pulse"></i>
              <span class="hidden sm:inline text-slate-700 dark:text-slate-200">${_roleLabels[_state.activeRole][lang]}</span>
              <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 transition-transform group-hover:rotate-180"></i>
            </button>
            
            <!-- Dropdown Menu -->
            <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-3 w-80 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              
              <div class="p-4 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-brandRed to-red-600">
                <p class="text-xs font-bold text-white/90 uppercase tracking-widest">تبديل بيئة العمل</p>
                <p class="text-[10px] text-white/70 mt-1">اختر الدور المناسب لمهامك الحالية</p>
              </div>
              
              <div class="p-2 max-h-96 overflow-y-auto custom-scroll">
                ${Object.entries(_roleLabels).map(([roleKey, labels]) => `
                  <button onclick="Layout.switchRole('${roleKey}')" 
                          class="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all ${roleKey === _state.activeRole ? 'bg-red-50 dark:bg-red-900/20 border-2 border-brandRed/30' : 'border-2 border-transparent'} mb-2">
                    <div class="w-10 h-10 rounded-lg ${roleKey === _state.activeRole ? 'bg-brandRed text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'} flex items-center justify-center shrink-0">
                      <i class="fa-solid ${_getRoleIcon(roleKey)} text-sm"></i>
                    </div>
                    <div class="flex-1 text-right">
                      <p class="text-xs font-bold ${roleKey === _state.activeRole ? 'text-brandRed' : 'text-slate-700 dark:text-slate-200'}">${labels[lang]}</p>
                      <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">${labels.desc}</p>
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
          <!-- AI Assistant -->
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
            <span class="hidden sm:inline">تسجيل الخروج</span>
          </button>
        </div>
      </header>
    `;
  }

  // ==========================================
  // 6. UTILITY FUNCTIONS
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
    
    // Dynamic UI Update (No Page Reload)
    renderSidebar();
    renderHeader();
    
    // Visual Feedback
    const Toast = window.Toast;
    if (Toast) {
      Toast.success(`تم التبديل إلى: ${_roleLabels[roleKey].ar}`);
    }
    
    console.log(`🔄 Role switched to: ${roleKey}`);
  }

  function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    renderHeader();
    
    if (window.Toast) {
      Toast.info(isDark ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري');
    }
  }

  function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('activeRole');
      window.location.href = '../login.html';
    }
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  }

  // ==========================================
  // 7. PUBLIC API
  // ==========================================
  return {
    init,
    renderSidebar,
    renderHeader,
    toggleTheme,
    logout,
    toggleMobileSidebar,
    switchRole,
    getActiveRole: () => _state.activeRole,
    getAllRoles: () => Object.keys(_menuDefinitions)
  };

})();

// Auto-Initialize
document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
});

// Global Exposure
window.Layout = Layout;
