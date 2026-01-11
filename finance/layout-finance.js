/**
 * AndroGov CFO Layout Engine (Red Brand Edition)
 * مخصص لبيئة المدير المالي - محمد البخيتي
 */

(function() {
    const currentUser = {
        nameAr: "محمد البخيتي",
        nameEn: "Mohammed Al-Bukhaiti",
        titleAr: "المدير المالي (CFO)",
        titleEn: "Chief Financial Officer",
        avatar: "https://ui-avatars.com/api/?name=Mohammed+B&background=FB4747&color=fff" // Brand Red
    };

    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    const menuStructure = [
        {
            section: 'main',
            items: [
                { key: 'dash', icon: 'fa-chart-pie', link: 'cfo_dashboard.html' },
                { key: 'approvals', icon: 'fa-stamp', link: 'approvals.html' }
            ]
        },
        {
            section: 'gl',
            items: [
                { key: 'journal', icon: 'fa-book', link: 'gl_journal.html' },
                { key: 'coa', icon: 'fa-sitemap', link: 'gl_coa.html' }
            ]
        },
        {
            section: 'ap',
            items: [
                { key: 'vendors', icon: 'fa-truck-fast', link: 'ap_vendors.html' },
                { key: 'bills', icon: 'fa-file-invoice-dollar', link: 'ap_bills.html' }
            ]
        },
        {
            section: 'reporting',
            items: [
                { key: 'statements', icon: 'fa-file-pdf', link: 'rep_statements.html' },
                { key: 'budget', icon: 'fa-scale-balanced', link: 'rep_budget.html' }
            ]
        }
    ];

    const t = {
        ar: {
            sysName: "AndroGov",
            deptName: "الإدارة المالية",
            logout: "خروج آمن",
            sections: { main: "الرئيسية", gl: "الأستاذ العام", ap: "الموردين", reporting: "التقارير" },
            menu: {
                dash: "لوحة القيادة", approvals: "الموافقات",
                journal: "قيود اليومية", coa: "دليل الحسابات",
                vendors: "الموردين", bills: "فواتير الشراء",
                statements: "القوائم المالية", budget: "الموازنة"
            }
        },
        en: {
            sysName: "AndroGov",
            deptName: "Finance Dept",
            logout: "Logout",
            sections: { main: "Main", gl: "General Ledger", ap: "Payables", reporting: "Reports" },
            menu: {
                dash: "Dashboard", approvals: "Approvals",
                journal: "Journal Entries", coa: "Chart of Accounts",
                vendors: "Vendors", bills: "Vendor Bills",
                statements: "Financial Stmts", budget: "Budgeting"
            }
        }
    };

    function init() {
        applySettings();
        renderSidebar();
        renderHeader();
        document.body.style.opacity = '1';
    }

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
                // Brand Red Active State
                const activeClass = isActive ? "bg-brandRed/10 text-brandRed border-r-4 border-brandRed" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";
                
                menuHTML += `
                <a href="${item.link}" class="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${activeClass} ${isActive ? '' : 'border-r-4 border-transparent'}">
                    <div class="w-5 text-center"><i class="fa-solid ${item.icon}"></i></div>
                    <span class="flex-1">${dict.menu[item.key]}</span>
                </a>`;
            });
        });

        container.innerHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 text-brandRed flex items-center justify-center text-xl shadow-sm">
                        <i class="fa-solid fa-coins"></i>
                    </div>
                    <div>
                        <h1 class="font-bold text-lg text-slate-800 dark:text-white font-sans tracking-tight">${dict.sysName}</h1>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">${dict.deptName}</p>
                    </div>
                </div>
            </div>
            <div class="p-6 pb-2">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                    <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border border-white shadow-sm">
                    <div class="overflow-hidden">
                        <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${config.lang === 'ar' ? currentUser.nameAr : currentUser.nameEn}</p>
                        <p class="text-[10px] text-brandRed font-bold truncate">${config.lang === 'ar' ? currentUser.titleAr : currentUser.titleEn}</p>
                    </div>
                </div>
            </div>
            <nav class="flex-1 overflow-y-auto custom-scroll pb-10">
                ${menuHTML}
            </nav>
        </aside>`;
    }

    function renderHeader() {
        const container = document.getElementById('header-container');
        if (!container) return;
        const dict = t[config.lang];
        
        container.innerHTML = `
        <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-4">
                <button class="md:hidden text-slate-500 hover:text-brandRed"><i class="fa-solid fa-bars text-xl"></i></button>
                <div class="hidden md:flex relative w-64">
                    <input type="text" placeholder="${config.lang === 'ar' ? 'بحث...' : 'Search...'}" class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-brandRed/20 outline-none dark:text-white">
                    <i class="fa-solid fa-search absolute top-2.5 left-3 text-slate-400"></i>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="window.changeLang()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-white transition">
                    ${config.lang === 'ar' ? 'EN' : 'عربي'}
                </button>
                <button onclick="window.changeTheme()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition">
                    <i class="fa-solid ${config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                </button>
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button onclick="window.doLogout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2">
                    <i class="fa-solid fa-power-off"></i> <span>${dict.logout}</span>
                </button>
            </div>
        </header>`;
    }

    window.changeTheme = () => { localStorage.setItem('theme', config.theme === 'dark' ? 'light' : 'dark'); location.reload(); };
    window.changeLang = () => { localStorage.setItem('lang', config.lang === 'ar' ? 'en' : 'ar'); location.reload(); };
    window.doLogout = () => { if(confirm('Log out?')) window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };

    init();
})();
