/**
 * AndroGov Layout Engine v10.5 (Finance/ERP Edition)
 * @file finance/js/components/layout.js
 * @author Ayman Al-Maghrabi
 * @description Full-featured layout for Finance Dept with 18 Accounting Modules.
 */

const Layout = (function() {
  
  // ==========================================
  // 1. STATE & CONFIG
  // ==========================================
  let _state = {
    currentUser: null,
    activeRole: 'CFO', 
    isInitialized: false,
    sidebarOpen: false,
    notifications: [],
    unreadCount: 0
  };

  // ==========================================
  // 2. FINANCE MENU DEFINITIONS (18 Pages)
  // ==========================================
  const _menuDefinitions = {
    'finance': [
      { section: 'financial_control', items: [
        { key: 'dashboard', icon: 'fa-chart-pie', link: 'index.html', badge: 'live' },
        { key: 'approvals', icon: 'fa-file-signature', link: 'approvals.html', badge: 'urgent' },
        { key: 'internal_chat', icon: 'fa-comments', link: 'internal_chat.html', badge: null }
      ]},
      { section: 'general_ledger', items: [
        { key: 'gl_journal', icon: 'fa-book', link: 'gl_journal.html', badge: null },
        { key: 'gl_coa', icon: 'fa-list-ol', link: 'gl_coa.html', badge: null },
        { key: 'gl_cost_centers', icon: 'fa-sitemap', link: 'gl_cost_centers.html', badge: null }
      ]},
      { section: 'accounts_payable', items: [
        { key: 'ap_bills', icon: 'fa-file-invoice', link: 'ap_bills.html', badge: null },
        { key: 'ap_payments', icon: 'fa-money-bill-transfer', link: 'ap_payments.html', badge: null },
        { key: 'ap_vendors', icon: 'fa-address-book', link: 'ap_vendors.html', badge: null }
      ]},
      { section: 'accounts_receivable', items: [
        { key: 'ar_invoices', icon: 'fa-file-invoice-dollar', link: 'ar_invoices.html', badge: null },
        { key: 'ar_receipts', icon: 'fa-receipt', link: 'ar_receipts.html', badge: null }
      ]},
      { section: 'inventory_assets', items: [
        { key: 'inv_dashboard', icon: 'fa-boxes-stacked', link: 'inv_dashboard.html', badge: null },
        { key: 'inv_assets', icon: 'fa-couch', link: 'inv_assets.html', badge: null }
      ]},
      { section: 'reports_tax', items: [
        { key: 'rep_statements', icon: 'fa-file-medical', link: 'rep_statements.html', badge: null },
        { key: 'rep_budget', icon: 'fa-scale-balanced', link: 'rep_budget.html', badge: null },
        { key: 'rep_tax', icon: 'fa-calculator', link: 'rep_tax.html', badge: 'VAT' }
      ]},
      { section: 'settings_personal', items: [
        { key: 'fin_settings', icon: 'fa-gears', link: 'fin_settings.html', badge: null },
        { key: 'my_profile', icon: 'fa-user-tie', link: 'profile.html', badge: null }
      ]}
    ]
  };

  // ==========================================
  // 3. TRANSLATIONS (Accounting Specialized)
  // ==========================================
  const _translations = {
    ar: {
      financial_control: 'الرقابة المالية',
      general_ledger: 'الأستاذ العام',
      accounts_payable: 'الحسابات الدائنة (AP)',
      accounts_receivable: 'الحسابات المدينة (AR)',
      inventory_assets: 'المخزون والأصول',
      reports_tax: 'التقارير والضرائب',
      settings_personal: 'الإعدادات والحساب',
      dashboard: 'نظرة عامة',
      approvals: 'الاعتمادات',
      internal_chat: 'المراسلات الداخلية',
      gl_journal: 'قيود اليومية',
      gl_coa: 'دليل الحسابات',
      gl_cost_centers: 'مراكز التكلفة',
      ap_bills: 'الفواتير الواردة',
      ap_payments: 'أوامر الصرف',
      ap_vendors: 'الموردين',
      ar_invoices: 'فواتير المبيعات',
      ar_receipts: 'سندات القبض',
      inv_dashboard: 'لوحة المخزون',
      inv_assets: 'سجل الأصول الثابتة',
      rep_statements: 'القوائم المالية',
      rep_budget: 'الموازنة التقديرية',
      rep_tax: 'الإقرارات الضريبية',
      fin_settings: 'الإعدادات المالية',
      my_profile: 'الملف الشخصي',
      notifications: 'التنبيهات المالية',
      logout: 'تسجيل الخروج',
      poweredBy: 'تطوير',
      aymanDev: 'أيمن المغربي'
    },
    en: {
      financial_control: 'Financial Control',
      general_ledger: 'General Ledger',
      accounts_payable: 'Accounts Payable',
      accounts_receivable: 'Accounts Receivable',
      inventory_assets: 'Inventory & Assets',
      reports_tax: 'Reports & Tax',
      settings_personal: 'Settings',
      dashboard: 'Finance Overview',
      approvals: 'Approvals',
      internal_chat: 'Internal Chat',
      gl_journal: 'Journal Entries',
      gl_coa: 'Chart of Accounts',
      gl_cost_centers: 'Cost Centers',
      ap_bills: 'Vendor Bills',
      ap_payments: 'Payments',
      ap_vendors: 'Vendors',
      ar_invoices: 'Sales Invoices',
      ar_receipts: 'Receipts',
      inv_dashboard: 'Inventory Dash',
      inv_assets: 'Fixed Assets',
      rep_statements: 'Financial Statements',
      rep_budget: 'Budgeting',
      rep_tax: 'Tax Reports',
      fin_settings: 'Finance Settings',
      my_profile: 'My Profile',
      notifications: 'Finance Alerts',
      logout: 'Logout',
      poweredBy: 'Developed by',
      aymanDev: 'Ayman Almaghrabi'
    }
  };

  // ==========================================
  // 4. LOGIC (Language, Themes, Notifications) - الحفاظ على ميزاتك الأصلية
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
    renderSidebar(); renderHeader();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function t(key) { return _translations[getCurrentLang()]?.[key] || key; }

  function loadNotifications() {
    _state.notifications = [
      { id: 'F1', icon: 'fa-file-circle-exclamation', color: 'red', title: { ar: 'فاتورة معلقة', en: 'Pending Bill' }, body: { ar: 'مورد "أرامكو" بانتظار الاعتماد', en: 'Aramco bill needs approval' }, time: new Date(), read: false, link: 'approvals.html' }
    ];
    _state.unreadCount = _state.notifications.filter(n => !n.read).length;
  }

  // ==========================================
  // 5. RENDERING SIDEBAR
  // ==========================================
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const lang = getCurrentLang();
    const isRTL = lang === 'ar';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // الخطأ كان هنا: الكود القديم يبحث عن finance_admin
    // الصحيح هو البحث عن activeRole المخزن (CFO) أو المصفوفة التي عرفناها
    const activeMenu = _menuDefinitions['CFO']; 

    if (!activeMenu) {
        console.error("❌ المصفوفة CFO غير معرفة في _menuDefinitions");
        return;
    }

    let menuHTML = '';
    activeMenu.forEach(group => {
        menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t(group.section)}</div>`;
        group.items.forEach(item => {
            const isActive = currentPath === item.link;
            
            // الألوان والستايلات الخاصة بك
            const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group mb-1";
            const activeClass = "bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30";
            const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed dark:hover:text-red-400";

            menuHTML += `
                <a href="${item.link}" class="${baseClass} ${isActive ? activeClass : inactiveClass}">
                    <div class="w-5 text-center transition-transform group-hover:scale-110">
                        <i class="fa-solid ${item.icon}"></i>
                    </div>
                    <span class="flex-1 truncate">${t(item.key)}</span>
                    ${item.badge ? `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500 text-white uppercase">${item.badge}</span>` : ''}
                    ${isActive ? '<div class="w-1.5 h-1.5 rounded-full bg-white"></div>' : ''}
                </a>`;
        });
    });

    // رسم الهيكل الكامل للشريط الجانبي
    container.innerHTML = `
        <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div class="flex items-center gap-3 w-full">
                    <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brandRed to-red-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                        <i class="fa-solid fa-calculator"></i>
                    </div>
                    <div class="overflow-hidden">
                        <h1 class="font-bold text-base text-slate-800 dark:text-white truncate">AndroGov</h1>
                        <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest truncate">Finance Portal</p>
                    </div>
                </div>
            </div>
            
            <div class="p-4 shrink-0">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border dark:border-slate-700">
                    <img src="${_state.currentUser?.avatar || 'https://ui-avatars.com/api/?name=CFO'}" class="w-11 h-11 rounded-full border-2 border-white dark:border-slate-600 object-cover shadow-md">
                    <div class="overflow-hidden flex-1">
                        <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${_state.currentUser?.displayName || 'المدير المالي'}</p>
                        <p class="text-[10px] text-brandRed font-bold truncate uppercase">CFO / IT Finance</p>
                    </div>
                </div>
            </div>

            <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 custom-scroll">
                ${menuHTML}
            </nav>

            <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <p class="text-[10px] text-slate-400 font-medium">© 2026 ERP Finance System</p>
                <p class="text-[9px] text-slate-300 dark:text-slate-600 mt-1">${t('poweredBy')} ${t('aymanDev')}</p>
            </div>
        </aside>
    `;
}

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${lang === 'ar' ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brandRed to-red-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brandRed/30"><i class="fa-solid fa-calculator"></i></div>
            <div>
              <h1 class="font-bold text-base text-slate-800 dark:text-white">AndroGov</h1>
              <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest">Finance Portal</p>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700">
            <img src="${_state.currentUser?.avatar || '../photo/admin.jpg'}" class="w-11 h-11 rounded-full border-2 border-white object-cover shadow-sm">
            <div class="min-w-0">
              <p class="text-xs font-bold dark:text-white truncate">${_state.currentUser?.displayName || 'المدير المالي'}</p>
              <p class="text-[9px] text-brandRed font-bold uppercase">CFO / Finance Admin</p>
            </div>
          </div>
        </div>
        <nav class="flex-1 overflow-y-auto px-3 py-2 custom-scroll">${menuHTML}</nav>
        <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800">
          <p class="text-[10px] text-slate-400 font-medium">© 2026 ERP Finance System</p>
          <p class="text-[9px] text-slate-300 mt-1">${t('poweredBy')} ${t('aymanDev')}</p>
        </div>
      </aside>`;
  }

  // ==========================================
  // 6. RENDER HEADER (Bot & Notifications Back!)
  // ==========================================
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;
    const lang = getCurrentLang();
    const isDark = document.documentElement.classList.contains('dark');

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500"><i class="fa-solid fa-bars text-xl"></i></button>
          <div class="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300">
             <i class="fa-solid fa-lock text-brandRed mr-2"></i> SECURE_FINANCE_ACCESS
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative group">
            <button class="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-brandRed flex items-center justify-center">
              <i class="fa-solid fa-bell text-slate-600 dark:text-slate-300"></i>
              ${_state.unreadCount > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 bg-brandRed text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">${_state.unreadCount}</span>` : ''}
            </button>
            </div>

          <button onclick="Layout.toggleLanguage()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-xs">${lang === 'ar' ? 'EN' : 'ع'}</button>
          <button onclick="if(window.AndroBot) AndroBot.toggle()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-brandBlue flex items-center justify-center group"><i class="fa-solid fa-robot group-hover:animate-bounce"></i></button>
          <button onclick="Layout.toggleTheme()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400 flex items-center justify-center"><i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i></button>
          
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          
          <button onclick="Layout.logout()" class="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <i class="fa-solid fa-power-off"></i> <span>${t('logout')}</span>
          </button>
        </div>
      </header>`;
  }

  // ==========================================
  // 7. INITIALIZATION
  // ==========================================
  function toggleLanguage() { setLanguage(getCurrentLang() === 'ar' ? 'en' : 'ar'); }
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    renderHeader();
  }
  function logout() { if (confirm(t('logout'))) { localStorage.clear(); window.location.href = '../login.html'; } }
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
    console.log("✅ ERP Finance Layout Ready");
  }

  return { init, renderSidebar, renderHeader, toggleTheme, toggleLanguage, setLanguage, logout, toggleMobileSidebar, getCurrentLang, t };

})();

document.addEventListener('DOMContentLoaded', () => Layout.init());
window.Layout = Layout;
