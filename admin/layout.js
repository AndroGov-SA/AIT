/**
 * AndroGov Layout Engine v4.3 (Added System Settings)
 * - Added 'admin_settings.html' to Admin Menu.
 */

(function() {
    // --- 1. Configuration & State ---
    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        nameAr: "أيمن المغربي",
        nameEn: "Ayman Almaghrabi",
        titleAr: "مدير الحوكمة",
        titleEn: "Governance Manager",
        avatar: "https://ui-avatars.com/api/?name=Ayman+Almaghrabi&background=FB4747&color=fff"
    };

    // --- 2. Menu Structure Data ---
    const menuStructure = [
        {
            section: 'main',
            items: [
                { key: 'dash', icon: 'fa-gauge-high', link: 'admin.html' }
            ]
        },
        {
            section: 'comm',
            items: [
                { key: 'chat', icon: 'fa-comments', link: 'admin_chat.html' },
                { key: 'circulars', icon: 'fa-bullhorn', link: 'admin_circulars.html' }
            ]
        },
        {
            section: 'gov',
            items: [
                { key: 'ga', icon: 'fa-users-rectangle', link: 'ga.html' },
                { key: 'board', icon: 'fa-building-columns', link: 'board.html' },
                { key: 'committees', icon: 'fa-people-group', link: 'committees.html' },
                { key: 'shareholders', icon: 'fa-id-card', link: 'shareholders.html' }
            ]
        },
        {
            section: 'ops',
            items: [
                { key: 'doa', icon: 'fa-sitemap', link: 'doa.html' },
                { key: 'policies', icon: 'fa-book-open', link: 'policies.html' },
                { key: 'compliance', icon: 'fa-scale-balanced', link: 'compliance.html' }
            ]
        },
        {
            section: 'dept',
            items: [
                { key: 'hr', icon: 'fa-user-tie', link: 'hr.html' },
                { key: 'finance', icon: 'fa-money-bill-wave', link: 'finance.html' },
                { key: 'procurement', icon: 'fa-boxes-packing', link: 'procurement.html' },
                { key: 'it', icon: 'fa-shield-cat', link: 'it.html' }
            ]
        },
        {
            section: 'admin',
            items: [
                { key: 'users', icon: 'fa-users-gear', link: 'users.html' },
                { key: 'audit', icon: 'fa-list-ul', link: 'audit.html' },
                { key: 'settings', icon: 'fa-sliders', link: 'admin_settings.html' } // ✅ تمت الإضافة هنا
            ]
        }
    ];

    // --- 3. Translations Dictionary ---
    const t = {
        ar: {
            sysName: "AndroGov",
            sysVer: "Enterprise v4.0",
            logout: "تسجيل خروج",
            sections: {
                main: "الرئيسية",
                comm: "التواصل المؤسسي",
                gov: "الحوكمة المؤسسية",
                ops: "الحوكمة التشغيلية",
                dept: "الإدارات والخدمات",
                admin: "إدارة النظام"
            },
            menu: {
                dash: "لوحة القيادة",
                chat: "الدردشة الداخلية",
                circulars: "إدارة التعاميم",
                ga: "الجمعيات العمومية",
                board: "مجلس الإدارة",
                committees: "اللجان المنبثقة",
                shareholders: "سجل المساهمين",
                doa: "مصفوفة الصلاحيات",
                policies: "السياسات واللوائح",
                compliance: "الامتثال والمخاطر",
                hr: "الموارد البشرية",
                finance: "الشؤون المالية",
                procurement: "المشتريات والعقود",
                it: "التقنية والأمن",
                users: "المستخدمين والصلاحيات",
                audit: "سجل التدقيق",
                settings: "إعدادات النظام" // ✅ الترجمة العربية
            }
        },
        en: {
            sysName: "AndroGov",
            sysVer: "Enterprise v4.0",
            logout: "Logout",
            sections: {
                main: "Main",
                comm: "Communication",
                gov: "Corporate Governance",
                ops: "Operating Governance",
                dept: "Departments",
                admin: "System Admin"
            },
            menu: {
                dash: "Dashboard",
                chat: "Internal Chat",
                circulars: "Circulars Mgmt",
                ga: "General Assembly",
                board: "Board of Directors",
                committees: "Committees",
                shareholders: "Shareholders",
                doa: "DOA Matrix",
                policies: "Policies Center",
                compliance: "Compliance & Risk",
                hr: "Human Resources",
                finance: "Finance",
                procurement: "Procurement",
                it: "IT & Security",
                users: "Users & Roles",
                audit: "Audit Logs",
                settings: "System Settings" // ✅ English Translation
            }
        }
    };

    // --- 4. Core Logic ---

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
        else html.classList.remove('dark');

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
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        const userDisplayName = isRtl ? currentUser.nameAr : currentUser.nameEn;
        const userDisplayTitle = isRtl ? currentUser.titleAr : currentUser.titleEn;

        const getLinkClass = (link) => {
            const isActive = currentPath === link;
            const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200";
            const activeClass = "bg-brandRed text-white shadow-md shadow-red-500/20";
            const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";
            return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
        };

        let menuHTML = '';
        
        menuStructure.forEach(group => {
            menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${dict.sections[group.section]}</div>`;
            group.items.forEach(item => {
                menuHTML += `
                <a href="${item.link}" class="${getLinkClass(item.link)}">
                    <div class="w-6 text-center"><i class="fa-solid ${item.icon}"></i></div>
                    <span class="flex-1">${dict.menu[item.key]}</span>
                </a>`;
            });
        });

        const sidebarHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 text-brandRed flex items-center justify-center text-xl">
                        <i class="fa-solid fa-coins"></i>
                    </div>
                    <div>
                        <h1 class="font-bold text-lg text-slate-800 dark:text-white font-sans">${dict.sysName}</h1>
                        <p class="text-[10px] text-slate-500 uppercase tracking-widest">${dict.sysVer}</p>
                    </div>
                </div>
            </div>

            <div class="p-4">
                <a href="my_profile.html" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group cursor-pointer">
                    <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 object-cover">
                    <div class="overflow-hidden flex-1">
                        <p class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-brandRed transition">${userDisplayName}</p>
                        <p class="text-[10px] text-brandRed font-medium truncate">${userDisplayTitle}</p>
                    </div>
                    <i class="fa-solid fa-chevron-left text-[10px] text-slate-300 group-hover:text-brandRed mr-auto"></i>
                </a>
            </div>

            <nav class="flex-1 overflow-y-auto px-3 py-2 custom-scroll space-y-0.5">
                ${menuHTML}
            </nav>

            <div class="p-4 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
                &copy; 2026 Andromeda IT
            </div>
        </aside>`;

        container.innerHTML = sidebarHTML;
    }

    function renderHeader() {
        const container = document.getElementById('header-container');
        if (!container) return;
        
        const dict = t[config.lang];
        
        container.innerHTML = `
        <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all">
            <div class="flex items-center gap-4">
                <button class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed"><i class="fa-solid fa-bars text-xl"></i></button>
            </div>

            <div class="flex items-center gap-3">
                <button onclick="window.changeLang()" class="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-white transition">
                    ${config.lang === 'ar' ? 'English' : 'عربي'}
                </button>
                <button onclick="window.changeTheme()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition">
                    <i class="fa-solid ${config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                </button>
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button onclick="window.doLogout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2">
                    <i class="fa-solid fa-power-off"></i> ${dict.logout}
                </button>
            </div>
        </header>`;
    }

    window.changeTheme = function() {
        const newTheme = config.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        location.reload();
    };

    window.changeLang = function() {
        const newLang = config.lang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('lang', newLang);
        location.reload();
    };

    window.doLogout = function() {
        if (confirm(config.lang === 'ar' ? 'هل أنت متأكد من تسجيل الخروج؟' : 'Are you sure you want to logout?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; 
        }
    };

    init();
})();
