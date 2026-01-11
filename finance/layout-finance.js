/**
 * AndroGov CFO Layout Engine v4.0 (Final Release)
 * - Full Menu Structure (GL, AP, AR, Inv, Rep, Config)
 * - Interactive Notification Center
 * - Clickable User Profile
 * - Red Brand Identity
 */

(function() {
    // --- 1. بيانات المستخدم (CFO) ---
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

    // --- 2. بيانات الإشعارات (محاكاة) ---
    const notifications = [
        { 
            id: 1, type: 'alert', icon: 'fa-triangle-exclamation', color: 'text-red-500 bg-red-50',
            msgAr: 'تجاوز ميزانية التسويق بـ 5% (طلب مناقلة)', 
            msgEn: 'Marketing budget exceeded by 5% (Transfer Req)', 
            time: '2m', read: false 
        },
        { 
            id: 2, type: 'info', icon: 'fa-file-invoice-dollar', color: 'text-blue-500 bg-blue-50',
            msgAr: 'وردت فاتورة جديدة من STC للاعتماد', 
            msgEn: 'New Invoice from STC pending approval', 
            time: '1h', read: false 
        },
        { 
            id: 3, type: 'success', icon: 'fa-sack-dollar', color: 'text-green-500 bg-green-50',
            msgAr: 'تم إيداع دفعة العميل (وزارة الصحة)', 
            msgEn: 'Client Payment Received (MOH)', 
            time: '3h', read: true 
        }
    ];

    // --- 3. هيكلة القائمة الجانبية ---
    const menuStructure = [
        {
            section: 'main',
            items: [
                { key: 'dash', icon: 'fa-chart-pie', link: 'cfo_dashboard.html' },
                { key: 'approvals', icon: 'fa-stamp', link: 'approvals.html' }
            ]
        },
        {
            section: 'gl', // الأستاذ العام
            items: [
                { key: 'journal', icon: 'fa-book', link: 'gl_journal.html' },
                { key: 'coa', icon: 'fa-sitemap', link: 'gl_coa.html' },
                { key: 'costCenters', icon: 'fa-layer-group', link: 'gl_cost_centers.html' }
            ]
        },
        {
            section: 'ap', // المشتريات
            items: [
                { key: 'vendors', icon: 'fa-store', link: 'ap_vendors.html' },
                { key: 'bills', icon: 'fa-file-invoice-dollar', link: 'ap_bills.html' },
                { key: 'payments', icon: 'fa-money-bill-transfer', link: 'ap_payments.html' }
            ]
        },
        {
            section: 'ar', // المبيعات
            items: [
                { key: 'salesInv', icon: 'fa-file-invoice', link: 'ar_invoices.html' },
                { key: 'receipts', icon: 'fa-hand-holding-dollar', link: 'ar_receipts.html' }
            ]
        },
        {
            section: 'inventory', // المخزون
            items: [
                { key: 'stock', icon: 'fa-boxes-stacked', link: 'inv_dashboard.html' },
                { key: 'assets', icon: 'fa-laptop-code', link: 'inv_assets.html' }
            ]
        },
        {
            section: 'reporting', // التقارير
            items: [
                { key: 'statements', icon: 'fa-file-pdf', link: 'rep_statements.html' },
                { key: 'budget', icon: 'fa-scale-balanced', link: 'rep_budget.html' },
                { key: 'tax', icon: 'fa-building-columns', link: 'rep_tax.html' }
            ]
        },
        {
            section: 'config', // الإعدادات
            items: [
                { key: 'settings', icon: 'fa-gears', link: 'fin_settings.html' }
            ]
        }
    ];

    // --- 4. قاموس الترجمة ---
    const t = {
        ar: {
            sysName: "AndroGov",
            deptName: "الإدارة المالية",
            logout: "خروج آمن",
            notifTitle: "الإشعارات",
            markRead: "تحديد الكل كمقروء",
            emptyNotif: "لا توجد إشعارات جديدة",
            sections: { 
                main: "الرئيسية", 
                gl: "الأستاذ العام", 
                ap: "الموردين والمشتريات", 
                ar: "العملاء والمبيعات", 
                inventory: "المخزون والأصول", 
                reporting: "التقارير والزكاة",
                config: "الإعدادات"
            },
            menu: {
                dash: "لوحة القيادة", approvals: "الموافقات",
                journal: "قيود اليومية", coa: "دليل الحسابات", costCenters: "مراكز التكلفة",
                vendors: "سجل الموردين", bills: "فواتير الشراء", payments: "سندات الصرف",
                salesInv: "فواتير المبيعات", receipts: "سندات القبض",
                stock: "مراقبة المخزون", assets: "سجل الأصول والعهد",
                statements: "القوائم المالية", budget: "الموازنة", tax: "الإقرار الضريبي",
                settings: "إعدادات النظام"
            }
        },
        en: {
            sysName: "AndroGov",
            deptName: "Finance Dept",
            logout: "Logout",
            notifTitle: "Notifications",
            markRead: "Mark all as read",
            emptyNotif: "No new notifications",
            sections: { 
                main: "Main", 
                gl: "General Ledger", 
                ap: "Accounts Payable", 
                ar: "Accounts Receivable", 
                inventory: "Assets & Inv", 
                reporting: "Reports & Tax",
                config: "Configuration"
            },
            menu: {
                dash: "Dashboard", approvals: "Approvals",
                journal: "Journal Entries", coa: "Chart of Accounts", costCenters: "Cost Centers",
                vendors: "Vendors", bills: "Vendor Bills", payments: "Payments",
                salesInv: "Sales Invoices", receipts: "Receipts",
                stock: "Inventory", assets: "Fixed Assets",
                statements: "Financial Stmts", budget: "Budgeting", tax: "Tax & Zakat",
                settings: "Financial Settings"
            }
        }
    };

    // --- 5. دوال البناء والتهيئة ---
    function init() {
        applySettings();
        renderSidebar();
        renderHeader();
        document.body.style.opacity = '1';
        
        // إغلاق قائمة الإشعارات عند النقر خارجها
        document.addEventListener('click', function(event) {
            const notifMenu = document.getElementById('notifDropdown');
            const notifBtn = document.getElementById('notifBtn');
            if (notifMenu && !notifMenu.contains(event.target) && !notifBtn.contains(event.target)) {
                notifMenu.classList.add('hidden');
            }
        });
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
                // BRAND RED: Active State
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
                <a href="my_profile.html" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group">
                    <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border border-white shadow-sm">
                    <div class="overflow-hidden">
                        <p class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-brandRed transition">${config.lang === 'ar' ? currentUser.nameAr : currentUser.nameEn}</p>
                        <p class="text-[10px] text-brandRed font-bold truncate">${config.lang === 'ar' ? currentUser.titleAr : currentUser.titleEn}</p>
                    </div>
                    <i class="fa-solid fa-chevron-left text-[10px] text-slate-300 group-hover:text-brandRed mr-auto"></i>
                </a>
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
        const isRtl = config.lang === 'ar';
        
        // Notification Badge Logic
        const unreadCount = notifications.filter(n => !n.read).length;
        const notifBadge = unreadCount > 0 
            ? `<span id="notifBadge" class="absolute top-1.5 right-2 w-2.5 h-2.5 bg-brandRed rounded-full border-2 border-white dark:border-slate-800"></span>` 
            : '';

        // Build Notification Items
        let notifItemsHTML = '';
        if (notifications.length > 0) {
            notifications.forEach(n => {
                notifItemsHTML += `
                <div class="p-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer flex gap-3 ${n.read ? 'opacity-60' : ''}">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}">
                        <i class="fa-solid ${n.icon} text-xs"></i>
                    </div>
                    <div>
                        <p class="text-xs font-bold text-slate-800 dark:text-white leading-snug">${isRtl ? n.msgAr : n.msgEn}</p>
                        <p class="text-[10px] text-slate-400 mt-1">${n.time}</p>
                    </div>
                </div>`;
            });
        } else {
            notifItemsHTML = `<div class="p-6 text-center text-slate-400 text-xs">${dict.emptyNotif}</div>`;
        }
        
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
                
                <div class="relative">
                    <button id="notifBtn" onclick="window.toggleNotif()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative">
                        <i class="fa-regular fa-bell"></i>
                        ${notifBadge}
                    </button>
                    
                    <div id="notifDropdown" class="hidden absolute top-12 ${isRtl ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                        <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                            <span class="text-xs font-bold dark:text-white">${dict.notifTitle}</span>
                            <button onclick="window.markRead()" class="text-[10px] text-brandRed hover:underline">${dict.markRead}</button>
                        </div>
                        <div class="max-h-64 overflow-y-auto custom-scroll">
                            ${notifItemsHTML}
                        </div>
                    </div>
                </div>

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

    // --- 6. الوظائف العامة (Global Functions) ---
    window.changeTheme = () => { localStorage.setItem('theme', config.theme === 'dark' ? 'light' : 'dark'); location.reload(); };
    window.changeLang = () => { localStorage.setItem('lang', config.lang === 'ar' ? 'en' : 'ar'); location.reload(); };
    window.doLogout = () => { if(confirm('Log out?')) window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };
    
    // وظائف الإشعارات
    window.toggleNotif = () => {
        const dropdown = document.getElementById('notifDropdown');
        dropdown.classList.toggle('hidden');
    };
    
    window.markRead = () => {
        const badge = document.getElementById('notifBadge');
        if(badge) badge.remove();
        // Here you would normally send a request to mark all as read
    };

    // تشغيل النظام
    init();
})();
