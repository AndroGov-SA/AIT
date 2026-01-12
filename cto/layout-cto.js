/**
 * AndroGov CTO Layout Engine v1.0
 * - Includes PBX/VoIP Management.
 * - Infrastructure & Cyber Security.
 */

(function() {
    // --- 1. Configuration & User Data ---
    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    const currentUser = {
        nameAr: "فيصل التقني",
        nameEn: "Faisal Al-Tech",
        titleAr: "الرئيس التقني (CTO)",
        titleEn: "Chief Technology Officer",
        avatar: "https://ui-avatars.com/api/?name=Faisal+Tech&background=0F172A&color=fff&size=128"
    };

    // --- 2. CTO Notifications (Tech Focused) ---
    const notifications = [
        {
            id: 1, type: 'critical', icon: 'fa-server', color: 'text-red-500 bg-red-50',
            titleAr: 'تنبيه السيرفر الرئيسي', titleEn: 'Main Server Alert',
            msgAr: 'ارتفاع حرارة المعالج CPU في السيرفر رقم #SRV-01.', msgEn: 'High CPU temperature on #SRV-01.',
            time: '2m'
        },
        {
            id: 2, type: 'warning', icon: 'fa-phone-slash', color: 'text-orange-500 bg-orange-50',
            titleAr: 'انقطاع في السنترال', titleEn: 'PBX Trunk Down',
            msgAr: 'انقطاع خدمة الاتصال في فرع الشمال (SIP Trunk).', msgEn: 'SIP Trunk down in North Branch.',
            time: '15m'
        },
        {
            id: 3, type: 'info', icon: 'fa-ticket', color: 'text-blue-500 bg-blue-50',
            titleAr: 'تذكرة دعم جديدة', titleEn: 'New Support Ticket',
            msgAr: 'طلب صلاحيات دخول للنظام المالي (CFO).', msgEn: 'Access request for Finance System.',
            time: '1h'
        }
    ];

    // --- 3. Menu Structure (CTO Specific) ---
    const menuStructure = [
        {
            section: 'main',
            items: [
                { key: 'dash', icon: 'fa-chart-pie', link: 'cto_dashboard.html' },
                { key: 'monitor', icon: 'fa-desktop', link: 'cto_monitoring.html' }
            ]
        },
        {
            section: 'telecom', // <--- قسم السنترال والاتصالات
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
                { key: 'cloud', icon: 'fa-cloud', link: 'cto_cloud.html' },
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

    // --- 4. Translations ---
    const t = {
        ar: {
            sysName: "AndroGov",
            sysVer: "Tech Admin v4.2",
            logout: "تسجيل خروج",
            notifTitle: "التنبيهات التقنية",
            markRead: "تحديد الكل كمقروء",
            emptyNotif: "النظام مستقر، لا توجد تنبيهات",
            sections: {
                main: "الرئيسية",
                telecom: "السنترال والاتصالات",
                infrastructure: "البنية التحتية",
                security: "الأمن السيبراني (SOC)",
                dev: "التطوير والدعم"
            },
            menu: {
                dash: "لوحة القيادة",
                monitor: "مراقبة الأنظمة (Live)",
                pbx: "لوحة السنترال (PBX)",
                extensions: "إدارة التحويلات",
                call_logs: "سجل المكالمات",
                servers: "السيرفرات والشبكات",
                cloud: "الخدمات السحابية",
                assets: "الأصول التقنية",
                soc: "مركز العمليات الأمنية",
                access: "إدارة الصلاحيات (IAM)",
                projects: "المشاريع البرمجية",
                support: "الدعم الفني (Helpdesk)"
            }
        },
        en: {
            sysName: "AndroGov",
            sysVer: "Tech Admin v4.2",
            logout: "Logout",
            notifTitle: "System Alerts",
            markRead: "Mark all as read",
            emptyNotif: "System stable, no alerts",
            sections: {
                main: "Main",
                telecom: "Telecom & PBX",
                infrastructure: "Infrastructure",
                security: "Cyber Security (SOC)",
                dev: "Dev & Support"
            },
            menu: {
                dash: "Dashboard",
                monitor: "Live Monitoring",
                pbx: "PBX Dashboard",
                extensions: "Extensions Mgmt",
                call_logs: "Call Logs",
                servers: "Servers & Network",
                cloud: "Cloud Services",
                assets: "IT Assets",
                soc: "SOC Dashboard",
                access: "IAM Access",
                projects: "Software Projects",
                support: "Helpdesk"
            }
        }
    };

    // --- 5. Core Logic ---

    function init() {
        applySettings();
        renderSidebar();
        renderHeader();
        
        setTimeout(() => {
            document.body.classList.remove('opacity-0');
            document.body.style.opacity = '1';
        }, 50);
        
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
        const currentPath = window.location.pathname.split('/').pop() || 'cto_dashboard.html';
        
        const userDisplayName = isRtl ? currentUser.nameAr : currentUser.nameEn;
        const userDisplayTitle = isRtl ? currentUser.titleAr : currentUser.titleEn;

        const getLinkClass = (link) => {
            const isActive = currentPath === link;
            const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200";
            // استخدمنا الأزرق (Blue) للتقنية بدلاً من الأحمر لتمييز القسم، أو يمكن إبقاؤه أحمر للهوية
            const activeClass = "bg-blue-600 text-white shadow-md shadow-blue-500/20"; 
            const inactiveClass = "text-slate-400 hover:bg-slate-800 hover:text-white";
            return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
        };

        let menuHTML = '';
        menuStructure.forEach(group => {
            menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">${dict.sections[group.section]}</div>`;
            group.items.forEach(item => {
                menuHTML += `
                <a href="${item.link}" class="${getLinkClass(item.link)}">
                    <div class="w-6 text-center"><i class="fa-solid ${item.icon}"></i></div>
                    <span class="flex-1">${dict.menu[item.key]}</span>
                </a>`;
            });
        });

        const sidebarHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} z-50 h-screen w-72 flex-col hidden md:flex bg-[#0F172A] text-white transition-all duration-300 shadow-2xl">
            <div class="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
                        <i class="fa-solid fa-microchip"></i>
                    </div>
                    <div>
                        <h1 class="font-bold text-lg font-sans tracking-wide">Andro<span class="text-blue-500">Tech</span></h1>
                        <p class="text-[10px] text-slate-400 uppercase tracking-widest">IT Operations</p>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-900/30 border-b border-slate-800">
                <a href="#" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition group cursor-pointer">
                    <div class="relative">
                        <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border-2 border-slate-600 object-cover">
                        <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0F172A] rounded-full"></span>
                    </div>
                    <div class="overflow-hidden flex-1">
                        <p class="text-sm font-bold text-white truncate">${userDisplayName}</p>
                        <p class="text-[10px] text-blue-400 font-medium truncate">${userDisplayTitle}</p>
                    </div>
                </a>
            </div>

            <nav class="flex-1 overflow-y-auto px-3 py-4 custom-scroll space-y-1">
                ${menuHTML}
            </nav>

            <div class="p-4 text-center text-[10px] text-slate-500 border-t border-slate-800 bg-slate-900/50">
                System Status: <span class="text-green-500 font-bold">Operational</span>
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
        <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all shadow-sm">
            <div class="flex items-center gap-4">
                <button class="md:hidden text-slate-500 dark:text-slate-200 hover:text-blue-600"><i class="fa-solid fa-bars text-xl"></i></button>
                
                <div class="hidden lg:flex gap-4 px-4 border-l border-r border-slate-200 dark:border-slate-700 h-10 items-center">
                    <div class="flex items-center gap-2 text-xs font-mono">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="text-slate-600 dark:text-slate-300">System: 99.9%</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-mono">
                        <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span class="text-slate-600 dark:text-slate-300">PBX: Active</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-3">
                
                <div class="relative">
                    <button id="notifBtn" onclick="window.toggleNotif()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative flex items-center justify-center">
                        <i class="fa-regular fa-bell"></i>
                        <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800 animate-bounce"></span>
                    </button>
                    
                    <div id="notifDropdown" class="hidden absolute top-12 ${isRtl ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                        <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                            <span class="text-xs font-bold dark:text-white">${dict.notifTitle}</span>
                            <button class="text-[10px] text-blue-600 hover:underline">${dict.markRead}</button>
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

    // --- 6. Global Functions ---
    window.toggleNotif = function() { document.getElementById('notifDropdown').classList.toggle('hidden'); };
    window.changeTheme = () => { localStorage.setItem('theme', config.theme === 'dark' ? 'light' : 'dark'); location.reload(); };
    window.changeLang = () => { localStorage.setItem('lang', config.lang === 'ar' ? 'en' : 'ar'); location.reload(); };
    window.doLogout = () => { if(confirm('Logout?')) window.location.href = 'login.html'; };

    init();
})();
