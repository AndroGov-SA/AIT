/**
 * AndroGov CFO Layout Engine v5.0 (With Chat & Mandatory Circulars)
 */

(function() {
    // --- 1. بيانات المستخدم ---
    const currentUser = {
        nameAr: "محمد البخيتي",
        nameEn: "Mohammed Al-Bukhaiti",
        titleAr: "المدير المالي (CFO)",
        titleEn: "Chief Financial Officer",
        avatar: "https://ui-avatars.com/api/?name=Mohammed+B&background=FB4747&color=fff"
    };

    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    // --- 2. محاكاة التعميم الإلزامي (Governance) ---
    // في الواقع، هذا يأتي من قاعدة البيانات
    const pendingCircular = {
        id: "CIR-2026-001",
        titleAr: "تعميم إداري هام: تحديث سياسة الصرف النقدي",
        titleEn: "Urgent Circular: Update to Petty Cash Policy",
        contentAr: `
            <p class="mb-2">السادة مدراء الإدارات،</p>
            <p class="mb-2">بناءً على توجيهات مجلس الإدارة، تم إيقاف الصرف النقدي المباشر من الصندوق للمبالغ التي تزيد عن <b>500 ريال</b>.</p>
            <p class="mb-4">يجب استخدام التحويل البنكي أو بطاقات المشتريات لجميع العمليات التي تتجاوز هذا الحد.</p>
            <p class="text-red-600 font-bold text-sm">يسري هذا القرار اعتباراً من صباح يوم الأحد 15 يناير 2026.</p>
        `,
        contentEn: `
            <p class="mb-2">Dear Dept Managers,</p>
            <p class="mb-2">Per Board directives, direct cash disbursement for amounts exceeding <b>500 SAR</b> is suspended.</p>
            <p class="mb-4">Please use bank transfers or corporate cards for transactions above this limit.</p>
            <p class="text-red-600 font-bold text-sm">Effective from Sunday, Jan 15, 2026.</p>
        `,
        required: true // هل القراءة إلزامية لمنع العمل؟
    };

    // --- 3. هيكلة القائمة (تمت إضافة التواصل) ---
    const menuStructure = [
        {
            section: 'main',
            items: [
                { key: 'dash', icon: 'fa-chart-pie', link: 'cfo_dashboard.html' },
                { key: 'approvals', icon: 'fa-stamp', link: 'approvals.html' },
                { key: 'chat', icon: 'fa-comments', link: 'internal_chat.html' } // جديد
            ]
        },
        {
            section: 'gl',
            items: [
                { key: 'journal', icon: 'fa-book', link: 'gl_journal.html' },
                { key: 'coa', icon: 'fa-sitemap', link: 'gl_coa.html' },
                { key: 'costCenters', icon: 'fa-layer-group', link: 'gl_cost_centers.html' }
            ]
        },
        {
            section: 'ap',
            items: [
                { key: 'vendors', icon: 'fa-store', link: 'ap_vendors.html' },
                { key: 'bills', icon: 'fa-file-invoice-dollar', link: 'ap_bills.html' },
                { key: 'payments', icon: 'fa-money-bill-transfer', link: 'ap_payments.html' }
            ]
        },
        {
            section: 'ar',
            items: [
                { key: 'salesInv', icon: 'fa-file-invoice', link: 'ar_invoices.html' },
                { key: 'receipts', icon: 'fa-hand-holding-dollar', link: 'ar_receipts.html' }
            ]
        },
        {
            section: 'inventory',
            items: [
                { key: 'stock', icon: 'fa-boxes-stacked', link: 'inv_dashboard.html' },
                { key: 'assets', icon: 'fa-laptop-code', link: 'inv_assets.html' }
            ]
        },
        {
            section: 'reporting',
            items: [
                { key: 'statements', icon: 'fa-file-pdf', link: 'rep_statements.html' },
                { key: 'budget', icon: 'fa-scale-balanced', link: 'rep_budget.html' },
                { key: 'tax', icon: 'fa-building-columns', link: 'rep_tax.html' }
            ]
        },
        {
            section: 'config',
            items: [
                { key: 'settings', icon: 'fa-gears', link: 'fin_settings.html' }
            ]
        }
    ];

    // --- 4. القاموس ---
    const t = {
        ar: {
            sysName: "AndroGov", deptName: "الإدارة المالية", logout: "خروج آمن",
            sections: { main: "الرئيسية", gl: "الأستاذ العام", ap: "الموردين", ar: "العملاء", inventory: "الأصول", reporting: "التقارير", config: "الإعدادات" },
            menu: {
                dash: "لوحة القيادة", approvals: "الموافقات", chat: "التواصل الداخلي",
                journal: "قيود اليومية", coa: "دليل الحسابات", costCenters: "مراكز التكلفة",
                vendors: "سجل الموردين", bills: "فواتير الشراء", payments: "سندات الصرف",
                salesInv: "فواتير المبيعات", receipts: "سندات القبض",
                stock: "مراقبة المخزون", assets: "سجل الأصول والعهد",
                statements: "القوائم المالية", budget: "الموازنة", tax: "الإقرار الضريبي",
                settings: "إعدادات النظام"
            },
            circ: { title: "تعميم إداري إلزامي", btn: "قرأت وأوافق على الالتزام" }
        },
        en: {
            sysName: "AndroGov", deptName: "Finance Dept", logout: "Logout",
            sections: { main: "Main", gl: "GL", ap: "AP", ar: "AR", inventory: "Inventory", reporting: "Reports", config: "Config" },
            menu: {
                dash: "Dashboard", approvals: "Approvals", chat: "Internal Chat",
                journal: "Journal Entries", coa: "Chart of Accounts", costCenters: "Cost Centers",
                vendors: "Vendors", bills: "Vendor Bills", payments: "Payments",
                salesInv: "Sales Invoices", receipts: "Receipts",
                stock: "Inventory", assets: "Fixed Assets",
                statements: "Financial Stmts", budget: "Budgeting", tax: "Tax Returns",
                settings: "Settings"
            },
            circ: { title: "Mandatory Circular", btn: "I Have Read & Agree" }
        }
    };

    function init() {
        applySettings();
        renderSidebar();
        renderHeader();
        checkMandatoryCirculars(); // فحص التعاميم
        document.body.style.opacity = '1';
    }

    // --- Logic for Mandatory Circulars ---
    function checkMandatoryCirculars() {
        // Check if user already acknowledged this specific circular ID
        const ackKey = `ack_${pendingCircular.id}`;
        if (localStorage.getItem(ackKey)) return; // Already read

        const dict = t[config.lang];
        const isRtl = config.lang === 'ar';

        // Create Modal HTML
        const modalHTML = `
        <div id="circularModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300">
            <div class="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform scale-100 animate-fade-in-up border-t-8 border-brandRed">
                
                <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-red-50 text-brandRed flex items-center justify-center text-2xl animate-pulse">
                        <i class="fa-solid fa-bullhorn"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white">${config.lang === 'ar' ? pendingCircular.titleAr : pendingCircular.titleEn}</h2>
                        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">${dict.circ.title}</p>
                    </div>
                </div>

                <div class="p-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-700 max-h-[60vh] overflow-y-auto">
                    ${config.lang === 'ar' ? pendingCircular.contentAr : pendingCircular.contentEn}
                </div>

                <div class="p-6 bg-white dark:bg-slate-800 flex justify-end">
                    <button onclick="acknowledgeCircular('${pendingCircular.id}')" class="w-full sm:w-auto px-8 py-3 bg-brandRed hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-500/30 transition flex items-center justify-center gap-2">
                        <i class="fa-regular fa-circle-check"></i>
                        <span>${dict.circ.btn}</span>
                    </button>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Disable scrolling on body
        document.body.style.overflow = 'hidden';
    }

    // Exposed function to acknowledge
    window.acknowledgeCircular = function(id) {
        localStorage.setItem(`ack_${id}`, 'true'); // Save to local storage
        const modal = document.getElementById('circularModal');
        if(modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = ''; // Re-enable scrolling
            }, 300);
        }
    };

    // ... (بقية دوال applySettings, renderSidebar, renderHeader كما هي في النسخة السابقة تماماً) ...
    
    function applySettings() {
        const html = document.documentElement;
        html.lang = config.lang;
        html.dir = config.lang === 'ar' ? 'rtl' : 'ltr';
        if (config.theme === 'dark') html.classList.add('dark');
        const main = document.querySelector('.main-content-wrapper');
        if (main) {
            main.classList.remove('md:mr-72', 'md:ml-72');
            main.classList.add(config.lang === 'ar' ? 'md:mr-72' : 'md:ml-72');
        }
    }

    function renderSidebar() {
        const container = document.getElementById('sidebar-container');
        if (!container) return;
        const dict = t[config.lang];
        const isRtl = config.lang === 'ar';
        const currentPath = window.location.pathname.split('/').pop() || 'cfo_dashboard.html';

        let menuHTML = '';
        menuStructure.forEach(group => {
            menuHTML += `<div class="px-4 mt-6 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider opacity-80">${dict.sections[group.section]}</div>`;
            group.items.forEach(item => {
                const isActive = currentPath === item.link;
                const activeClass = isActive ? "bg-brandRed/10 text-brandRed border-r-4 border-brandRed" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";
                menuHTML += `<a href="${item.link}" class="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${activeClass}"><div class="w-5 text-center"><i class="fa-solid ${item.icon}"></i></div><span class="flex-1">${dict.menu[item.key]}</span></a>`;
            });
        });

        container.innerHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 text-brandRed flex items-center justify-center text-xl shadow-sm"><i class="fa-solid fa-coins"></i></div>
                    <div><h1 class="font-bold text-lg text-slate-800 dark:text-white font-sans tracking-tight">${dict.sysName}</h1><p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">${dict.deptName}</p></div>
                </div>
            </div>
            <div class="p-6 pb-2">
                <a href="my_profile.html" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group">
                    <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border border-white shadow-sm">
                    <div class="overflow-hidden"><p class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-brandRed transition">${config.lang === 'ar' ? currentUser.nameAr : currentUser.nameEn}</p><p class="text-[10px] text-brandRed font-bold truncate">${config.lang === 'ar' ? currentUser.titleAr : currentUser.titleEn}</p></div>
                    <i class="fa-solid fa-chevron-left text-[10px] text-slate-300 group-hover:text-brandRed mr-auto"></i>
                </a>
            </div>
            <nav class="flex-1 overflow-y-auto custom-scroll pb-10">${menuHTML}</nav>
        </aside>`;
    }

    function renderHeader() {
        const container = document.getElementById('header-container');
        if (!container) return;
        container.innerHTML = `<header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-4">
                <button class="md:hidden text-slate-500 hover:text-brandRed"><i class="fa-solid fa-bars text-xl"></i></button>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="window.changeLang()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-white transition">${config.lang === 'ar' ? 'EN' : 'عربي'}</button>
                <button onclick="window.changeTheme()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition"><i class="fa-solid ${config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i></button>
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button onclick="window.doLogout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2"><i class="fa-solid fa-power-off"></i> <span>${t[config.lang].logout}</span></button>
            </div>
        </header>`;
    }

    window.changeTheme = () => { localStorage.setItem('theme', config.theme === 'dark' ? 'light' : 'dark'); location.reload(); };
    window.changeLang = () => { localStorage.setItem('lang', config.lang === 'ar' ? 'en' : 'ar'); location.reload(); };
    window.doLogout = () => { if(confirm('Log out?')) window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };

    init();
})();
