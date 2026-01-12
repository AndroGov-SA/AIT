/**
 * AndroGov CFO Layout Engine v5.2 (Fixes Notification Bell)
 * - Added 'toggleNotif' function.
 * - Added dropdown HTML structure in renderHeader.
 * - Included dummy notification data.
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

    // --- 2. بيانات الإشعارات (للتجربة) ---
    const notifications = [
        {
            titleAr: "طلب موافقة جديد", titleEn: "New Approval Request",
            msgAr: "يرجى اعتماد فاتورة المشتريات رقم #PO-992", msgEn: "Please approve PO #PO-992",
            time: "2m", color: "bg-blue-50 text-blue-600", icon: "fa-file-signature"
        },
        {
            titleAr: "تنبيه النظام", titleEn: "System Alert",
            msgAr: "تم تسجيل دخول جديد من جهاز غير معروف", msgEn: "New login from unknown device",
            time: "1h", color: "bg-red-50 text-red-600", icon: "fa-shield-halved"
        },
        {
            titleAr: "إيداع راتب", titleEn: "Salary Deposit",
            msgAr: "تم تحويل راتب شهر يناير", msgEn: "January salary transferred",
            time: "1d", color: "bg-green-50 text-green-600", icon: "fa-money-bill-wave"
        }
    ];

    // --- 3. التعميم الإلزامي ---
    const pendingCircular = {
        id: "CIR-URGENT-999", 
        titleAr: "تعميم هام: سياسة الحضور والانصراف الجديدة",
        titleEn: "Urgent: New Attendance Policy",
        contentAr: `
            <div class="space-y-3">
                <p><b>السادة مدراء الإدارات،</b></p>
                <p>نود إفادتكم بأنه تم تفعيل نظام البصمة الجديد ابتداءً من يوم الأحد القادم.</p>
                <div class="p-3 bg-red-50 text-red-700 rounded border border-red-100 font-bold text-xs">
                    <i class="fa-solid fa-circle-exclamation"></i> لن يتم قبول تسجيل الحضور اليدوي بعد هذا التاريخ.
                </div>
            </div>
        `,
        contentEn: `
            <div class="space-y-3">
                <p><b>Dear Managers,</b></p>
                <p>The new biometric attendance system goes live next Sunday.</p>
                <div class="p-3 bg-red-50 text-red-700 rounded border border-red-100 font-bold text-xs">
                    <i class="fa-solid fa-circle-exclamation"></i> Manual attendance will not be accepted.
                </div>
            </div>
        `
    };

    // --- 4. هيكلة القائمة ---
    const menuStructure = [
        {
            section: 'main',
            items: [
                { key: 'dash', icon: 'fa-chart-pie', link: 'cfo_dashboard.html' },
                { key: 'approvals', icon: 'fa-stamp', link: 'approvals.html' },
                { key: 'chat', icon: 'fa-comments', link: 'internal_chat.html' }
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

    // --- 5. القاموس ---
    const t = {
        ar: {
            sysName: "AndroGov", deptName: "الإدارة المالية", logout: "خروج آمن",
            notifTitle: "الإشعارات", markRead: "تحديد الكل كمقروء", emptyNotif: "لا توجد إشعارات جديدة",
            sections: { 
                main: "الرئيسية", gl: "الأستاذ العام", ap: "الموردين", ar: "العملاء", 
                inventory: "المخزون والأصول", reporting: "التقارير", config: "الإعدادات" 
            },
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
            notifTitle: "Notifications", markRead: "Mark Read", emptyNotif: "No notifications",
            sections: { main: "Main", gl: "GL", ap: "AP", ar: "AR", inventory: "Inv", reporting: "Reports", config: "Config" },
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

    // --- 6. التشغيل ---
    function init() {
        applySettings();
        renderSidebar();
        renderHeader();
        setTimeout(checkMandatoryCirculars, 500); 
        document.body.style.opacity = '1';

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('notifDropdown');
            const btn = document.getElementById('notifBtn');
            if (dropdown && !dropdown.classList.contains('hidden') && !dropdown.contains(event.target) && !btn.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        });
    }

    // --- 7. دوال العرض ---
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
        const dict = t[config.lang];
        const isRtl = config.lang === 'ar';

        // --- بناء قائمة الإشعارات (HTML) ---
        let notifItems = notifications.map(n => `
            <div class="p-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer flex gap-3 items-start">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}">
                    <i class="fa-solid ${n.icon} text-xs"></i>
                </div>
                <div>
                    <p class="text-xs font-bold text-slate-800 dark:text-white">${config.lang === 'ar' ? n.titleAr : n.titleEn}</p>
                    <p class="text-[10px] text-slate-500 mt-0.5 leading-snug">${config.lang === 'ar' ? n.msgAr : n.msgEn}</p>
                    <p class="text-[9px] text-slate-400 mt-1">${n.time}</p>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
        <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all">
            <div class="flex items-center gap-4">
                <button class="md:hidden text-slate-500 hover:text-brandRed"><i class="fa-solid fa-bars text-xl"></i></button>
                <div class="hidden md:flex relative w-64">
                    <input type="text" placeholder="${config.lang === 'ar' ? 'بحث...' : 'Search...'}" class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-brandRed/20 outline-none dark:text-white">
                    <i class="fa-solid fa-search absolute top-2.5 left-3 text-slate-400"></i>
                </div>
            </div>
            
            <div class="flex items-center gap-3">
                
                <div class="relative">
                    <button id="notifBtn" onclick="window.toggleNotif()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative flex items-center justify-center focus:outline-none">
                        <i class="fa-regular fa-bell"></i>
                        <span class="absolute top-2 right-2.5 w-2 h-2 bg-brandRed rounded-full border border-white dark:border-slate-800 animate-pulse"></span>
                    </button>
                    
                    <div id="notifDropdown" class="hidden absolute top-12 ${isRtl ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 transform origin-top transition-all duration-200">
                        <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                            <span class="text-xs font-bold text-slate-800 dark:text-white">${dict.notifTitle}</span>
                            <button class="text-[10px] text-brandRed hover:underline font-bold">${dict.markRead}</button>
                        </div>
                        <div class="max-h-64 overflow-y-auto custom-scroll">
                            ${notifItems || `<div class="p-6 text-center text-slate-400 text-xs">${dict.emptyNotif}</div>`}
                        </div>
                        <div class="p-2 text-center border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                            <a href="#" class="text-[10px] text-slate-500 hover:text-brandRed">عرض كل الإشعارات</a>
                        </div>
                    </div>
                </div>

                <button onclick="window.changeLang()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-white transition">${config.lang === 'ar' ? 'EN' : 'عربي'}</button>
                <button onclick="window.changeTheme()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition"><i class="fa-solid ${config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i></button>
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button onclick="window.doLogout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2"><i class="fa-solid fa-power-off"></i> <span>${dict.logout}</span></button>
            </div>
        </header>`;
    }

    // --- 8. الوظائف العامة ---
    window.toggleNotif = function() {
        const dropdown = document.getElementById('notifDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    };

    window.changeTheme = () => { localStorage.setItem('theme', config.theme === 'dark' ? 'light' : 'dark'); location.reload(); };
    window.changeLang = () => { localStorage.setItem('lang', config.lang === 'ar' ? 'en' : 'ar'); location.reload(); };
    window.doLogout = () => { if(confirm('Log out?')) window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };

    window.checkMandatoryCirculars = function() {
        const ackKey = `ack_${pendingCircular.id}`;
        if (localStorage.getItem(ackKey)) return;

        const dict = t[config.lang];
        const modalHTML = `
        <div id="circularModal" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300">
            <div class="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border-t-8 border-brandRed animate-bounce-slow">
                <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-red-50 text-brandRed flex items-center justify-center text-2xl animate-pulse">
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white">${config.lang === 'ar' ? pendingCircular.titleAr : pendingCircular.titleEn}</h2>
                        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">${dict.circ.title}</p>
                    </div>
                </div>
                <div class="p-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50">
                    ${config.lang === 'ar' ? pendingCircular.contentAr : pendingCircular.contentEn}
                </div>
                <div class="p-6 bg-white dark:bg-slate-800 flex justify-end">
                    <button onclick="acknowledgeCircular('${pendingCircular.id}')" class="w-full bg-brandRed hover:bg-red-700 text-white py-3 rounded-xl font-bold shadow-lg transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-check"></i> <span>${dict.circ.btn}</span>
                    </button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';
    }

    window.acknowledgeCircular = function(id) {
        localStorage.setItem(`ack_${id}`, 'true');
        const modal = document.getElementById('circularModal');
        if(modal) {
            modal.style.transition = "opacity 0.3s";
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = ''; 
            }, 300);
        }
    };

    init();
})();
