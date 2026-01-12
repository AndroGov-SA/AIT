/**
 * AndroGov CTO Layout Engine v3.0 (Fixed Sidebar Color)
 * - Sidebar is now WHITE in light mode (matching Admin/HR).
 * - Dark mode compliant.
 * - Brand Red identity enforced.
 */

(function() {
    // --- 1. بيانات المستخدم ---
    const currentUser = {
        nameAr: "مشاعل الهذيان",
        nameEn: "Mashael Alhadyan",
        titleAr: "الرئيس التقني (CTO)",
        titleEn: "Chief Technology Officer",
        avatar: "https://ui-avatars.com/api/?name=Mashael+Alhadyan&background=FB4747&color=fff&size=128"
    };

    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    // --- 2. التنبيهات التقنية ---
    const notifications = [
        {
            titleAr: "تنبيه حرارة السيرفر", titleEn: "Server Heat Alert",
            msgAr: "ارتفاع حرارة CPU في السيرفر الرئيسي #SRV-01.", msgEn: "High CPU temp on #SRV-01.",
            time: "2m", color: "bg-red-50 text-red-600", icon: "fa-temperature-arrow-up"
        },
        {
            titleAr: "انقطاع الخدمة", titleEn: "Service Outage",
            msgAr: "بلاغ انقطاع الإنترنت في فرع الدمام.", msgEn: "Internet down in Dammam Branch.",
            time: "15m", color: "bg-orange-50 text-orange-600", icon: "fa-wifi"
        },
        {
            titleAr: "نسخ احتياطي", titleEn: "Backup Status",
            msgAr: "تم اكتمال النسخ الاحتياطي اليومي بنجاح.", msgEn: "Daily backup completed successfully.",
            time: "4h", color: "bg-green-50 text-green-600", icon: "fa-database"
        }
    ];

    // --- 3. هيكلة القائمة (CTO Menu) ---
    const menuStructure = [
        {
            section: 'main',
            items: [
                { key: 'dash', icon: 'fa-chart-pie', link: 'cto_dashboard.html' },
                { key: 'monitor', icon: 'fa-desktop', link: 'cto_monitoring.html' }
            ]
        },
        {
            section: 'telecom',
            items: [
                { key: 'pbx', icon: 'fa-phone-volume', link: 'cto_pbx.html' },
                { key: 'extensions', icon: 'fa-users-viewfinder', link: 'cto_extensions.html' },
                { key: 'call_logs', icon: 'fa-list-ol', link: 'cto_call_logs.html' }
            ]
        },
        {
            section: 'infrastructure',
            items: [
                { key: 'servers', icon: 'fa-server', link: 'cto_servers.html' },
                { key: 'assets', icon: 'fa-laptop-code', link: 'cto_assets.html' }
            ]
        },
        {
            section: 'security',
            items: [
                { key: 'soc', icon: 'fa-shield-virus', link: 'cto_soc.html' },
                { key: 'access', icon: 'fa-id-badge', link: 'cto_iam.html' }
            ]
        },
        {
            section: 'dev',
            items: [
                { key: 'projects', icon: 'fa-code-branch', link: 'cto_projects.html' },
                { key: 'support', icon: 'fa-headset', link: 'cto_support.html' }
            ]
        }
    ];

    // --- 4. القاموس ---
    const t = {
        ar: {
            sysName: "AndroGov", deptName: "الإدارة التقنية", logout: "خروج آمن",
            notifTitle: "التنبيهات", markRead: "تحديد الكل كمقروء", emptyNotif: "الأنظمة مستقرة",
            sections: { 
                main: "الرئيسية", telecom: "السنترال والاتصالات", 
                infrastructure: "البنية التحتية", security: "الأمن السيبراني", dev: "التطوير والدعم" 
            },
            menu: {
                dash: "لوحة القيادة", monitor: "مراقبة الأنظمة",
                pbx: "لوحة السنترال", extensions: "إدارة التحويلات", call_logs: "سجل المكالمات",
                servers: "السيرفرات", assets: "الأصول التقنية",
                soc: "مركز العمليات الأمنية", access: "إدارة الصلاحيات",
                projects: "المشاريع", support: "الدعم الفني"
            }
        },
        en: {
            sysName: "AndroGov", deptName: "IT Department", logout: "Logout",
            notifTitle: "Notifications", markRead: "Mark Read", emptyNotif: "Systems Stable",
            sections: { main: "Main", telecom: "Telecom & PBX", infrastructure: "Infrastructure", security: "Cyber Security", dev: "Dev & Support" },
            menu: {
                dash: "Dashboard", monitor: "Live Monitor",
                pbx: "PBX Panel", extensions: "Extensions", call_logs: "Call Logs",
                servers: "Servers", assets: "IT Assets",
                soc: "SOC", access: "Access Control",
                projects: "Projects", support: "Helpdesk"
            }
        }
    };

    // --- 5. التشغيل ---
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

    // --- 6. دوال العرض ---
    function applySettings() {
        const html = document.documentElement;
        html.lang = config.lang;
        html.dir = config.lang === 'ar' ? 'rtl' : 'ltr';
        if (config.theme === 'dark') html.classList.add('dark');
        
        const main = document.querySelector('.main-content-wrapper');
        if (main) {
            main.classList.remove('md:mr-72', 'md:ml-72');
            if (config.lang === 'ar') {
                main.classList.add('md:mr-72');
            } else {
                main.classList.add('md:ml-72');
            }
        }
    }

    function renderSidebar() {
        const container = document.getElementById('sidebar-container');
        if (!container) return;
        const dict = t[config.lang];
        const isRtl = config.lang === 'ar';
        const currentPath = window.location.pathname.split('/').pop() || 'cto_dashboard.html';

        let menuHTML = '';
        menuStructure.forEach(group => {
            menuHTML += `<div class="px-4 mt-6 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider opacity-80">${dict.sections[group.section]}</div>`;
            group.items.forEach(item => {
                const isActive = currentPath === item.link;
                // تصحيح: استخدام ألوان النص الرمادية (slate-600) للخلفية البيضاء، وليس الأبيض
                const activeClass = isActive ? "bg-brandRed/10 text-brandRed border-r-4 border-brandRed" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";
                menuHTML += `<a href="${item.link}" class="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${activeClass}"><div class="w-5 text-center"><i class="fa-solid ${item.icon}"></i></div><span class="flex-1">${dict.menu[item.key]}</span></a>`;
            });
        });

        const sidePos = isRtl ? 'right-0 border-l' : 'left-0 border-r';

        // تصحيح: الخلفية الآن bg-white بشكل افتراضي، وتتحول لداكنة فقط في الـ dark mode
        container.innerHTML = `
        <aside class="fixed top-0 ${sidePos} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 text-brandRed flex items-center justify-center text-xl shadow-sm"><i class="fa-solid fa-microchip"></i></div>
                    <div><h1 class="font-bold text-lg text-slate-800 dark:text-white font-sans tracking-tight">${dict.sysName}</h1><p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">${dict.deptName}</p></div>
                </div>
            </div>
            
            <div class="p-6 pb-2">
                <a href="cto_profile.html" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group">
                    <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border border-white shadow-sm">
                    <div class="overflow-hidden"><p class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-brandRed transition">${config.lang === 'ar' ? currentUser.nameAr : currentUser.nameEn}</p><p class="text-[10px] text-brandRed font-bold truncate">${config.lang === 'ar' ? currentUser.titleAr : currentUser.titleEn}</p></div>
                    <i class="fa-solid fa-chevron-left text-[10px] text-slate-300 group-hover:text-brandRed mr-auto"></i>
                </a>
            </div>

            <nav class="flex-1 overflow-y-auto custom-scroll pb-10">${menuHTML}</nav>

            <div class="p-4 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
                &copy; 2026 Andromeda IT
            </div>
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

    // --- 6. Global Functions ---
    window.toggleNotif = function() { document.getElementById('notifDropdown').classList.toggle('hidden'); };
    window.changeTheme = () => { localStorage.setItem('theme', config.theme === 'dark' ? 'light' : 'dark'); location.reload(); };
    window.changeLang = () => { localStorage.setItem('lang', config.lang === 'ar' ? 'en' : 'ar'); location.reload(); };
    window.doLogout = () => { if(confirm('Logout?')) window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };

    init();
})();
