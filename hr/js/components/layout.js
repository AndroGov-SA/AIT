
/**
 * AndroGov HR Layout Engine v2.1 (Perfect Layout Fix)
 * - Fixes the margin gap issue when switching languages.
 */

(function() {
    // --- 1. بيانات المستخدم ---
    const currentUser = {
        nameAr: "منصور اليامي",
        nameEn: "Mansour Al-Yami",
        titleAr: "مدير الشؤون الإدارية والموارد البشرية",
        titleEn: "CAO (HR & Admin Manager)",
        avatar: "https://ui-avatars.com/api/?name=Mansour+Y&background=FB4747&color=fff"
    };

    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    // --- 2. التنبيهات ---
    const notifications = [
        {
            titleAr: "تنبيه مقيم", titleEn: "Muqeem Alert",
            msgAr: "إقامة (محمد خان) تنتهي خلال 3 أيام.", msgEn: "Residency expiring for Mohammed Khan.",
            time: "2h", color: "bg-red-50 text-red-600", icon: "fa-passport"
        },
        {
            titleAr: "رخصة البلدية", titleEn: "Municipality License",
            msgAr: "رخصة فرع الشمال تحتاج تجديد (باقي 15 يوم).", msgEn: "North Branch license expiring soon.",
            time: "5h", color: "bg-orange-50 text-orange-600", icon: "fa-building"
        },
        {
            titleAr: "طلب إجازة", titleEn: "Leave Request",
            msgAr: "طلب جديد من (خالد العتيبي).", msgEn: "New request from Khaled.",
            time: "1d", color: "bg-blue-50 text-blue-600", icon: "fa-plane-departure"
        }
    ];

    // --- 3. هيكلة القائمة ---
    const menuStructure = [
        {
            section: 'main',
            items: [
                { key: 'dash', icon: 'fa-chart-pie', link: 'hr_dashboard.html' },
                { key: 'approvals', icon: 'fa-inbox', link: 'hr_approvals.html' },
                { key: 'chat', icon: 'fa-comments', link: 'internal_chat.html' }
            ]
        },
        {
            section: 'workforce',
            items: [
                { key: 'employees', icon: 'fa-users', link: 'hr_employees.html' },
                { key: 'contracts', icon: 'fa-file-contract', link: 'hr_contracts.html' },
                { key: 'org', icon: 'fa-sitemap', link: 'hr_org.html' }
            ]
        },
        {
            section: 'ops',
            items: [
                { key: 'attendance', icon: 'fa-fingerprint', link: 'hr_attendance.html' },
                { key: 'leaves', icon: 'fa-calendar-days', link: 'hr_leaves.html' },
                { key: 'payroll', icon: 'fa-money-bill-wave', link: 'hr_payroll.html' },
                { key: 'trips', icon: 'fa-plane-departure', link: 'hr_trips.html' }
            ]
        },
        {
            section: 'admin',
            items: [
                { key: 'assets', icon: 'fa-boxes-packing', link: 'hr_assets.html' },
                { key: 'logistics', icon: 'fa-building-user', link: 'hr_logistics.html' },
                { key: 'purchases', icon: 'fa-cart-shopping', link: 'hr_purchases.html' },
                { key: 'partners', icon: 'fa-handshake', link: 'hr_partners.html' }
            ]
        },
        {
            section: 'govt',
            items: [
                { key: 'govt', icon: 'fa-passport', link: 'hr_govt.html' },
                { key: 'recruitment', icon: 'fa-user-plus', link: 'hr_recruitment.html' }
            ]
        }
    ];

    const t = {
        ar: {
            sysName: "AndroGov", deptName: "الموارد البشرية والإدارية", logout: "خروج",
            notifTitle: "التنبيهات والمهام", markRead: "تحديد الكل كمقروء", emptyNotif: "لا توجد تنبيهات",
            sections: { 
                main: "الرئيسية", workforce: "القوى العاملة", ops: "العمليات والرواتب", 
                admin: "الشؤون الإدارية", govt: "العلاقات الحكومية" 
            },
            menu: {
                dash: "لوحة القيادة", approvals: "الاعتمادات", chat: "التواصل الداخلي",
                employees: "سجل الموظفين", contracts: "العقود والتأمينات", org: "الهيكل التنظيمي",
                attendance: "الحضور والجزاءات", leaves: "الإجازات", payroll: "مسير الرواتب", trips: "الانتدابات",
                assets: "سجل العهد", logistics: "الخدمات والصيانة", purchases: "المشتريات التشغيلية", partners: "الشركاء والعلاقات",
                govt: "المنصة الحكومية", recruitment: "التوظيف"
            }
        },
        en: {
            sysName: "AndroGov", deptName: "HR & Admin Dept", logout: "Logout",
            notifTitle: "Notifications", markRead: "Mark Read", emptyNotif: "No notifications",
            sections: { main: "Main", workforce: "Workforce", ops: "Operations", admin: "Admin Affairs", govt: "Govt Relations" },
            menu: {
                dash: "Dashboard", approvals: "Approvals", chat: "Internal Chat",
                employees: "Employees", contracts: "Contracts", org: "Org Chart",
                attendance: "Attendance", leaves: "Leaves", payroll: "Payroll", trips: "Business Trips",
                assets: "Assets", logistics: "Logistics", purchases: "Purchases", partners: "Partnerships",
                govt: "Govt Portal", recruitment: "Recruitment"
            }
        }
    };

    function init() {
        applySettings();
        renderSidebar();
        renderHeader();
        document.body.style.opacity = '1';
        
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('notifDropdown');
            const btn = document.getElementById('notifBtn');
            if (dropdown && !dropdown.classList.contains('hidden') && !dropdown.contains(event.target) && !btn.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        });
    }

    // --- الوظيفة المصححة لإصلاح الهوامش ---
    function applySettings() {
        const html = document.documentElement;
        html.lang = config.lang;
        html.dir = config.lang === 'ar' ? 'rtl' : 'ltr';
        if (config.theme === 'dark') html.classList.add('dark');
        
        // هنا التصحيح: إزالة الهوامش القديمة تماماً وإضافة الجديد بناءً على اللغة
        const main = document.querySelector('.main-content-wrapper');
        if (main) {
            main.classList.remove('md:mr-72', 'md:ml-72'); // تنظيف
            if (config.lang === 'ar') {
                main.classList.add('md:mr-72'); // هامش يمين للعربي
            } else {
                main.classList.add('md:ml-72'); // هامش يسار للإنجليزي
            }
        }
    }

    function renderSidebar() {
        const container = document.getElementById('sidebar-container');
        if (!container) return;
        const dict = t[config.lang];
        const isRtl = config.lang === 'ar';
        const currentPath = window.location.pathname.split('/').pop() || 'hr_dashboard.html';

        let menuHTML = '';
        menuStructure.forEach(group => {
            menuHTML += `<div class="px-4 mt-6 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider opacity-80">${dict.sections[group.section]}</div>`;
            group.items.forEach(item => {
                const isActive = currentPath === item.link;
                const activeClass = isActive ? "bg-brandRed/10 text-brandRed border-r-4 border-brandRed" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";
                menuHTML += `<a href="${item.link}" class="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${activeClass}"><div class="w-5 text-center"><i class="fa-solid ${item.icon}"></i></div><span class="flex-1">${dict.menu[item.key]}</span></a>`;
            });
        });

        // تصحيح مكان القائمة بناءً على اللغة
        const sidePos = isRtl ? 'right-0 border-l' : 'left-0 border-r';

        container.innerHTML = `
        <aside class="fixed top-0 ${sidePos} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 text-brandRed flex items-center justify-center text-xl shadow-sm"><i class="fa-solid fa-user-tie"></i></div>
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

        let notifItems = notifications.map(n => `
            <div class="p-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer flex gap-3 items-start">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}"><i class="fa-solid ${n.icon} text-xs"></i></div>
                <div><p class="text-xs font-bold text-slate-800 dark:text-white">${config.lang === 'ar' ? n.titleAr : n.titleEn}</p><p class="text-[10px] text-slate-500 mt-0.5 leading-snug">${config.lang === 'ar' ? n.msgAr : n.msgEn}</p><p class="text-[9px] text-slate-400 mt-1">${n.time}</p></div>
            </div>`).join('');

        container.innerHTML = `
        <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all">
            <div class="flex items-center gap-4"><button class="md:hidden text-slate-500 hover:text-brandRed"><i class="fa-solid fa-bars text-xl"></i></button></div>
            <div class="flex items-center gap-3">
                <div class="relative">
                    <button id="notifBtn" onclick="window.toggleNotif()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative flex items-center justify-center focus:outline-none">
                        <i class="fa-regular fa-bell"></i><span class="absolute top-2 right-2.5 w-2 h-2 bg-brandRed rounded-full border border-white dark:border-slate-800 animate-pulse"></span>
                    </button>
                    <div id="notifDropdown" class="hidden absolute top-12 ${isRtl ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 transform origin-top transition-all duration-200">
                        <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50"><span class="text-xs font-bold text-slate-800 dark:text-white">${dict.notifTitle}</span><button class="text-[10px] text-brandRed hover:underline font-bold">${dict.markRead}</button></div>
                        <div class="max-h-64 overflow-y-auto custom-scroll">${notifItems}</div>
                    </div>
                </div>
                <button onclick="window.changeLang()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-white transition">${config.lang === 'ar' ? 'EN' : 'عربي'}</button>
                <button onclick="window.changeTheme()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition"><i class="fa-solid ${config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i></button>
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button onclick="window.doLogout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2"><i class="fa-solid fa-power-off"></i> <span>${dict.logout}</span></button>
            </div>
        </header>`;
    }

    window.toggleNotif = function() { document.getElementById('notifDropdown').classList.toggle('hidden'); };
    window.changeTheme = () => { localStorage.setItem('theme', config.theme === 'dark' ? 'light' : 'dark'); location.reload(); };
    window.changeLang = () => { localStorage.setItem('lang', config.lang === 'ar' ? 'en' : 'ar'); location.reload(); };
    window.doLogout = () => { if(confirm('Log out?')) window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };

    init();
})();
