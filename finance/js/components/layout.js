/**
 * AndroGov Layout Engine v10.5 (Finance/ERP Edition)
 * @file finance/js/components/layout.js
 * @description FINAL STABLE VERSION: Forced rendering for CFO Role.
 */

const Layout = (function() {
  
  let _state = {
    currentUser: null,
    activeRole: 'CFO', 
    isInitialized: false,
    notifications: [],
    unreadCount: 0
  };

  const _menuDefinitions = {
    'CFO': [
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

  const _translations = {
    ar: {
      financial_control: 'الرقابة المالية', general_ledger: 'الأستاذ العام', accounts_payable: 'الحسابات الدائنة', accounts_receivable: 'الحسابات المدينة', inventory_assets: 'المخزون والأصول', reports_tax: 'التقارير والضرائب', settings_personal: 'الإعدادات', dashboard: 'نظرة عامة', approvals: 'الاعتمادات', internal_chat: 'المحادثات', gl_journal: 'قيود اليومية', gl_coa: 'دليل الحسابات', gl_cost_centers: 'مراكز التكلفة', ap_bills: 'الفواتير الواردة', ap_payments: 'أوامر الصرف', ap_vendors: 'الموردين', ar_invoices: 'فواتير المبيعات', ar_receipts: 'سندات القبض', inv_dashboard: 'لوحة المخزون', inv_assets: 'سجل الأصول', rep_statements: 'القوائم المالية', rep_budget: 'الموازنة', rep_tax: 'الضرائب', fin_settings: 'إعدادات المالية', my_profile: 'الملف الشخصي', notifications: 'التنبيهات', logout: 'خروج', logoutConfirm: 'هل تريد الخروج؟', poweredBy: 'تطوير', aymanDev: 'أيمن المغربي'
    },
    en: {
      financial_control: 'Finance Control', general_ledger: 'Ledger', accounts_payable: 'Payables', accounts_receivable: 'Receivables', inventory_assets: 'Inventory', reports_tax: 'Reports', settings_personal: 'Account', dashboard: 'Dashboard', approvals: 'Approvals', internal_chat: 'Chat', gl_journal: 'Journal', gl_coa: 'COA', gl_cost_centers: 'Cost Centers', ap_bills: 'Bills', ap_payments: 'Payments', ap_vendors: 'Vendors', ar_invoices: 'Invoices', ar_receipts: 'Receipts', inv_dashboard: 'Stock Dash', inv_assets: 'Assets', rep_statements: 'Statements', rep_budget: 'Budget', rep_tax: 'Tax', fin_settings: 'Settings', my_profile: 'Profile', notifications: 'Alerts', logout: 'Logout', logoutConfirm: 'Exit?', poweredBy: 'Dev', aymanDev: 'Ayman'
    }
  };

  function getCurrentLang() { return localStorage.getItem('lang') || 'ar'; }
  function t(key) { return _translations[getCurrentLang()]?.[key] || key; }

  // دالة بناء الـ Sidebar
  function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const lang = getCurrentLang();
    const isRTL = lang === 'ar';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const activeMenu = _menuDefinitions['CFO'];

    let menuHTML = '';
    activeMenu.forEach(group => {
      menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t(group.section)}</div>`;
      group.items.forEach(item => {
        const isActive = currentPath === item.link;
        menuHTML += `
          <a href="${item.link}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${isActive ? 'bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed'}">
            <div class="w-5 text-center"><i class="fa-solid ${item.icon}"></i></div>
            <span class="flex-1 truncate">${t(item.key)}</span>
            ${item.badge ? `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500 text-white uppercase">${item.badge}</span>` : ''}
          </a>`;
      });
    });

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl"><i class="fa-solid fa-calculator"></i></div>
            <h1 class="font-bold text-base text-slate-800 dark:text-white">AndroGov <span class="block text-[10px] text-brandRed font-bold uppercase tracking-widest">Finance Portal</span></h1>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border dark:border-slate-700">
            <img src="${_state.currentUser?.avatar || 'https://ui-avatars.com/api/?name=CFO'}" class="w-11 h-11 rounded-full border-2 border-white shadow-sm">
            <div class="min-w-0"><p class="text-xs font-bold dark:text-white truncate">${_state.currentUser?.displayName || 'المدير المالي'}</p><p class="text-[9px] text-brandRed font-bold uppercase">CFO / IT Manager</p></div>
          </div>
        </div>
        <nav class="flex-1 overflow-y-auto px-3 py-2 custom-scroll">${menuHTML}</nav>
        <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800"><p class="text-[10px] text-slate-400 font-medium">© 2026 ERP Finance System</p></div>
      </aside>`;
  }

  // دالة بناء الـ Header
  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;
    const lang = getCurrentLang();
    const isDark = document.documentElement.classList.contains('dark');

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500"><i class="fa-solid fa-bars text-xl"></i></button>
          <div class="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300"><i class="fa-solid fa-lock text-brandRed mr-2"></i> FINANCE_SECURE_v10.5</div>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="Layout.toggleLanguage()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-xs">${lang === 'ar' ? 'EN' : 'ع'}</button>
          <button onclick="Layout.toggleTheme()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400"><i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i></button>
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button onclick="Layout.logout()" class="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"><i class="fa-solid fa-power-off"></i> <span>${t('logout')}</span></button>
        </div>
      </header>`;
  }

  // دالة التشغيل الرئيسية
  async function init() {
    if (_state.isInitialized) return;
    
    // سحب البيانات من localStorage فوراً
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      _state.currentUser = JSON.parse(storedUser);
    }
    
    _state.activeRole = 'CFO'; // إجبار الدور على CFO

    renderSidebar();
    renderHeader();
    
    // إخفاء الـ Loading وإظهار الصفحة
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.add('hidden');
    document.body.classList.remove('opacity-0');
    document.body.style.opacity = '1';
    
    _state.isInitialized = true;
    console.log("✅ Finance Layout Engine Initialized Successfully");
  }

  // الوظائف العامة
  function toggleLanguage() {
    const newLang = getCurrentLang() === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', newLang);
    location.reload(); // إعادة التحميل لضمان تغيير الاتجاهات
  }

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    renderHeader();
  }

  function logout() { if (confirm(t('logoutConfirm'))) { localStorage.clear(); window.location.href = '../login.html'; } }
  function toggleMobileSidebar() { const sb = document.getElementById('main-sidebar'); if(sb) sb.classList.toggle('-translate-x-full'); }

  return { init, toggleTheme, toggleLanguage, logout, toggleMobileSidebar };

})();

// التشغيل الآلي
document.addEventListener('DOMContentLoaded', () => Layout.init());
window.Layout = Layout;
