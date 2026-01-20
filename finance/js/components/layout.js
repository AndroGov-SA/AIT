/**
 * AndroGov Layout Engine v10.5 (Finance Full Edition)
 * @file finance/js/components/layout.js
 * FIXED: Full Features (Bot + Notifications) + All 18 Pages Navigation
 */

const Layout = (function() {
  
  let _state = {
    currentUser: null,
    activeRole: 'CFO', 
    isInitialized: false,
    notifications: [],
    unreadCount: 0
  };

  // مصفوفة الـ 18 صفحة مالية (تم ضبط الروابط لتكون مباشرة)
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
      financial_control: 'الرقابة المالية', general_ledger: 'الأستاذ العام', accounts_payable: 'الحسابات الدائنة', 
      accounts_receivable: 'الحسابات المدينة', inventory_assets: 'المخزون والأصول', reports_tax: 'التقارير والضرائب',
      settings_personal: 'الإعدادات والحساب', dashboard: 'لوحة القيادة', approvals: 'الاعتمادات',
      internal_chat: 'المحادثات', gl_journal: 'قيود اليومية', gl_coa: 'دليل الحسابات', gl_cost_centers: 'مراكز التكلفة',
      ap_bills: 'الفواتير الواردة', ap_payments: 'أوامر الصرف', ap_vendors: 'الموردين', ar_invoices: 'فواتير المبيعات',
      ar_receipts: 'سندات القبض', inv_dashboard: 'لوحة المخزون', inv_assets: 'سجل الأصول',
      rep_statements: 'القوائم المالية', rep_budget: 'الموازنة التقديرية', rep_tax: 'الإقرارات الضريبية',
      fin_settings: 'الإعدادات المالية', my_profile: 'الملف الشخصي', notifications: 'الإشعارات',
      markAllRead: 'تعليم الكل كمقروء', logout: 'خروج', logoutConfirm: 'هل تريد الخروج؟', poweredBy: 'تطوير', aymanDev: 'أيمن المغربي'
    },
    en: {
        financial_control: 'Control', general_ledger: 'Ledger', dashboard: 'Dashboard', approvals: 'Approvals',
        notifications: 'Notifications', markAllRead: 'Mark all as read', logout: 'Logout', logoutConfirm: 'Exit?'
    }
  };

  function getCurrentLang() { return localStorage.getItem('lang') || 'ar'; }
  function t(key) { return _translations[getCurrentLang()]?.[key] || key; }

  // إعادة ميزة الإشعارات الأصلية
  function loadNotifications() {
    const stored = localStorage.getItem('notifications');
    _state.notifications = stored ? JSON.parse(stored) : [
      { id: 'F1', icon: 'fa-file-invoice-dollar', color: 'orange', title: { ar: 'اعتماد مالي مطلوب', en: 'Approval Needed' }, body: { ar: 'فاتورة مورد بانتظار موافقتك', en: 'Invoice awaiting your sign' }, time: new Date(), read: false, link: 'approvals.html' }
    ];
    _state.unreadCount = _state.notifications.filter(n => !n.read).length;
  }

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
          <a href="${item.link}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group mb-1 ${isActive ? 'bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed'}">
            <div class="w-5 text-center transition-transform group-hover:scale-110"><i class="fa-solid ${item.icon}"></i></div>
            <span class="flex-1 truncate">${t(item.key)}</span>
            ${item.badge ? `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500 text-white uppercase">${item.badge}</span>` : ''}
          </a>`;
      });
    });

    container.innerHTML = `
      <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl shadow-lg"><i class="fa-solid fa-calculator"></i></div>
            <h1 class="font-bold text-base text-slate-800 dark:text-white truncate">AndroGov <span class="block text-[10px] text-brandRed font-bold uppercase tracking-widest">Finance Portal</span></h1>
          </div>
        </div>
        <div class="p-4 shrink-0">
          <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border dark:border-slate-700">
            <img src="${_state.currentUser?.avatar || 'https://ui-avatars.com/api/?name=CFO'}" class="w-11 h-11 rounded-full border-2 border-white object-cover shadow-sm">
            <div class="min-w-0 flex-1"><p class="text-xs font-bold dark:text-white truncate">${_state.currentUser?.displayName || 'المدير المالي'}</p><p class="text-[9px] text-brandRed font-bold uppercase truncate">CFO / IT Manager</p></div>
          </div>
        </div>
        <nav class="flex-1 overflow-y-auto px-3 py-2 custom-scroll">${menuHTML}</nav>
        <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800 bg-slate-50/50"><p class="text-[10px] text-slate-400 font-medium">© 2026 ERP Finance System</p></div>
      </aside>`;
  }

  function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;
    const lang = getCurrentLang();
    const isDark = document.documentElement.classList.contains('dark');
    const isRTL = lang === 'ar';

    container.innerHTML = `
      <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex items-center gap-4">
          <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500"><i class="fa-solid fa-bars text-xl"></i></button>
          <div class="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300"><i class="fa-solid fa-lock text-brandRed mr-2"></i> FINANCE_SECURE_v10.5</div>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative group">
            <button class="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-brandRed flex items-center justify-center">
              <i class="fa-solid fa-bell text-slate-600 dark:text-slate-300"></i>
              ${_state.unreadCount > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 bg-brandRed text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">${_state.unreadCount}</span>` : ''}
            </button>
            <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-3 w-80 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                <div class="p-4 border-b border-slate-100 dark:border-slate-700 bg-brandRed text-white flex justify-between">
                    <span class="text-sm font-bold">${t('notifications')}</span>
                    <button onclick="Layout.markAllRead()" class="text-xs underline">${t('markAllRead')}</button>
                </div>
                <div class="max-h-64 overflow-y-auto">
                    ${_state.notifications.map(n => `
                    <a href="${n.link}" onclick="Layout.markNotificationRead('${n.id}')" class="flex gap-3 p-4 border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50">
                        <div class="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center"><i class="fa-solid ${n.icon}"></i></div>
                        <div class="flex-1 min-w-0"><p class="text-xs font-bold text-slate-800 dark:text-white">${n.title[lang]}</p><p class="text-[10px] text-slate-500 truncate">${n.body[lang]}</p></div>
                    </a>`).join('')}
                </div>
            </div>
          </div>

          <button onclick="Layout.toggleLanguage()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-xs">${lang === 'ar' ? 'EN' : 'ع'}</button>
          <button onclick="if(window.AndroBot) AndroBot.toggle()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-brandBlue flex items-center justify-center group"><i class="fa-solid fa-robot group-hover:animate-bounce"></i></button>
          <button onclick="Layout.toggleTheme()" class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400 flex items-center justify-center"><i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i></button>
          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button onclick="Layout.logout()" class="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"><i class="fa-solid fa-power-off"></i> <span>${t('logout')}</span></button>
        </div>
      </header>`;
  }

  async function init() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) _state.currentUser = JSON.parse(storedUser);
    
    loadNotifications();
    renderSidebar();
    renderHeader();
    
    document.body.classList.remove('opacity-0');
    document.body.style.opacity = '1';
    _state.isInitialized = true;
    console.log("✅ Finance Engine Ready: All Features Active.");
  }

  function toggleLanguage() { localStorage.setItem('lang', getCurrentLang() === 'ar' ? 'en' : 'ar'); location.reload(); }
  function toggleTheme() { document.documentElement.classList.toggle('dark'); localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); renderHeader(); }
  function logout() { if (confirm(t('logoutConfirm'))) { localStorage.clear(); window.location.href = '../login.html'; } }
  function toggleMobileSidebar() { document.getElementById('main-sidebar')?.classList.toggle('-translate-x-full'); }
  function markAllRead() { _state.unreadCount = 0; renderHeader(); }

  return { init, toggleTheme, toggleLanguage, logout, toggleMobileSidebar, markAllRead };
})();

// التشغيل الفوري
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', Layout.init);
} else {
    Layout.init();
}

window.Layout = Layout;
