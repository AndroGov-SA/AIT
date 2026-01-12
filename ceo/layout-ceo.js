/**
 * AndroGov CEO Layout Engine v6.0 (Matches Original System)
 * - Based strictly on layout (1).js structure.
 * - CEO Specific Content.
 */

(function() {
    // --- 1. Configuration & User Data ---
    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    const currentUser = {
        nameAr: "هشام السحيباني",
        nameEn: "Hisham Al-Suhaibani",
        titleAr: "الرئيس التنفيذي (CEO)",
        titleEn: "Chief Executive Officer",
        avatar: "https://ui-avatars.com/api/?name=Hisham+S&background=0F172A&color=fff&size=128"
    };

    // --- 2. CEO Notifications ---
    const notifications = [
        {
            id: 1, type: 'critical', icon: 'fa-triangle-exclamation', color: 'text-red-500 bg-red-50',
            titleAr: 'انخفاض السيولة', titleEn: 'Cash Flow Alert',
            msgAr: 'تقرير المالية يشير لانخفاض 10% عن المتوقع.', msgEn: 'Finance report shows 10% drop.',
            time: '2h'
        },
        {
            id: 2, type: 'info', icon: 'fa-file-signature', color: 'text-blue-500 bg-blue-50',
            titleAr: 'عقد جديد', titleEn: 'New Contract',
            msgAr: 'عقد شراكة Microsoft بانتظار التوقيع.', msgEn: 'Microsoft partnership contract pending.',
            time: '5h'
        }
    ];

    // --- 3. Menu Structure (CEO Specific) ---
    const menuStructure = [
        {
            section: 'main',
            items: [
                { key: 'dash', icon: 'fa-chart-pie', link: 'ceo_dashboard.html' },
                { key: 'strategy', icon: 'fa-chess', link: 'ceo_strategy.html' }
            ]
        },
        {
            section: 'finance',
            items: [
                { key: 'finance', icon: 'fa-chart-line', link: 'ceo_finance.html' },
                { key: 'reports', icon: 'fa-file-invoice-dollar', link: 'ceo_reports.html' } // صفحة مستقبلية
            ]
        },
        {
            section: 'governance',
            items: [
                { key: 'gov', icon: 'fa-scale-balanced', link: 'ceo_governance.html' },
                { key: 'risks', icon: 'fa-triangle-exclamation', link: 'ceo_risks.html' } // صفحة مستقبلية
            ]
        },
        {
            section: 'comm',
            items: [
                { key: 'broadcast', icon: 'fa-bullhorn', link: 'ceo_broadcast.html' },
                { key: 'chat', icon: 'fa-comments', link: 'ceo_communication.html' },
                { key: 'feedback', icon: 'fa-inbox', link: 'ceo_feedback.html' }
            ]
        },
        {
            section: 'personal',
            items: [
                { key: 'profile', icon: 'fa-user-tie', link: 'ceo_profile.html' }
            ]
        }
    ];

    // --- 4. Translations ---
    const t = {
        ar: {
            sysName: "AndroGov",
            sysVer: "Executive Portal",
            logout: "تسجيل خروج",
            notifTitle: "التنبيهات الهامة",
            markRead: "تحديد الكل كمقروء",
            emptyNotif: "لا توجد تنبيهات جديدة",
            sections: {
                main: "الرئيسية",
                finance: "المالية والاستثمار",
                governance: "الحوكمة والمخاطر",
                comm: "التواصل الداخلي",
                personal: "الملف الشخصي"
            },
            menu: {
                dash: "لوحة القيادة",
                strategy: "الاستراتيجية والأهداف",
                finance: "المؤشرات المالية",
                reports: "التقارير التنفيذية",
                gov: "حوكمة المجلس",
                risks: "سجل المخاطر",
                broadcast: "التعاميم والتوجيهات",
                chat: "المحادثات",
                feedback: "صندوق الشكاوي",
                profile: "ملفي الشخصي"
            }
        },
        en: {
            sysName: "AndroGov",
            sysVer: "Executive Portal",
            logout: "Logout",
            notifTitle: "Critical Alerts",
            markRead: "Mark all as read",
            emptyNotif: "No new alerts",
            sections: {
                main: "Main",
                finance: "Finance & Invest",
                governance: "GRC & Board",
                comm: "Communication",
                personal: "Personal"
            },
            menu: {
                dash: "Dashboard",
                strategy: "Strategy & OKRs",
                finance: "Financial KPIs",
                reports: "Executive Reports",
                gov: "Board Governance",
                risks: "Risk Register",
                broadcast: "Announcements",
                chat: "Internal Chat",
                feedback: "Complaints Box",
                profile: "My Profile"
            }
        }
    };

    // --- 5. Core Logic (Matches Original System) ---

    function init() {
        applySettings();
        renderSidebar();
        renderHeader();
        
        // Fix Opacity Flash
        setTimeout(() => {
            document.body.classList.remove('opacity-0');
            document.body.style.opacity = '1';
        }, 50);
        
        // Close dropdown listeners
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
        const currentPath = window.location.pathname.split('/').pop() || 'ceo_dashboard.html';
        
        const userDisplayName = isRtl ? currentUser.nameAr : currentUser.nameEn;
        const userDisplayTitle = isRtl ? currentUser.titleAr : currentUser.titleEn;

        // Same link class logic as original
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
                    ${item.key === 'feedback' ? '<span class="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>' : ''}
                </a>`;
            });
        });

        // Sidebar HTML Structure (Identical to Admin/HR)
        const sidebarHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 text-brandRed flex items-center justify-center text-xl">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                    <div>
                        <h1 class="font-bold text-lg text-slate-800 dark:text-white font-sans">${dict.sysName}</h1>
                        <p class="text-[10px] text-slate-500 uppercase tracking-widest">${dict.sysVer}</p>
                    </div>
                </div>
            </div>

            <div class="p-4">
                <a href="ceo_profile.html" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group cursor-pointer">
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
        const isRtl = config.lang === 'ar';

        let notifListHTML = '';
        if(notifications.length > 0) {
            notifications.forEach(n => {
                notifListHTML += `
                <div class="p-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer flex gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}">
                        <i class="fa-solid ${n.icon} text-xs"></i>
                    </div>
                    <div>
                        <p class="text-xs font-bold text-slate-800 dark:text-white">${isRtl ? n.titleAr : n.titleEn}</p>
                        <p class="text-[10px] text-slate-500 mt-0.5 leading-snug">${isRtl ? n.msgAr : n.msgEn}</p>
                        <p class="text-[9px] text-slate-400 mt-1">${n.time}</p>
                    </div>
                </div>`;
            });
        } else {
            notifListHTML = `<div class="p-6 text-center text-slate-400 text-xs">${dict.emptyNotif}</div>`;
        }
        
        container.innerHTML = `
        <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all">
            <div class="flex items-center gap-4">
                <button class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed"><i class="fa-solid fa-bars text-xl"></i></button>
            </div>

            <div class="flex items-center gap-3">
                
                <div class="relative">
                    <button id="notifBtn" onclick="window.toggleNotif()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative flex items-center justify-center">
                        <i class="fa-regular fa-bell"></i>
                        <span class="absolute top-2 right-2.5 w-2 h-2 bg-brandRed rounded-full border border-white dark:border-slate-800"></span>
                    </button>
                    
                    <div id="notifDropdown" class="hidden absolute top-12 ${isRtl ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                        <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                            <span class="text-xs font-bold dark:text-white">${dict.notifTitle}</span>
                            <button class="text-[10px] text-brandRed hover:underline">${dict.markRead}</button>
                        </div>
                        <div class="max-h-64 overflow-y-auto custom-scroll">
                            ${notifListHTML}
                        </div>
                    </div>
                </div>

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

    // --- 6. Global Functions (Exposed) ---
    
    window.toggleNotif = function() {
        const d = document.getElementById('notifDropdown');
        d.classList.toggle('hidden');
    };

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
            window.location.href = 'login.html'; 
        }
    };

    init();
})();
