/**
 * AndroGov Layout Engine v5.0 (Centralized Data Repository Integrated)
 * - Fetches configuration from '../data/company_policy.json'
 * - Dynamic User Profile Binding
 * - Smart Notifications & Roles
 */

(function() {
    // --- 1. State & Globals ---
    let policyData = null; // سيتم تعبئته من الملف المركزي
    
    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    // سنبدأ بمستخدم افتراضي لحين تحميل البيانات الحقيقية
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        id: "USR_004", // افتراضي: أيمن المغربي (GRC)
        nameAr: "مستخدم النظام",
        nameEn: "System User",
        role: "Guest"
    };

    // --- 2. Data Fetching (The Smart Part) ---
    async function loadCompanyData() {
        try {
            const response = await fetch('../data/company_policy.json');
            if (!response.ok) throw new Error('Failed to load policy file');
            
            policyData = await response.json();
            console.log("✅ Company Policy Loaded:", policyData.metadata.version);

            // 1. تحديث بيانات المستخدم الحالي من الدليل المركزي
            updateCurrentUserProfile();

            // 2. تحديث إعدادات النظام العامة
            if (policyData.system_settings) {
                // تطبيق لون الهوية إذا وجد
                document.documentElement.style.setProperty('--brand-color', policyData.system_settings.theme_color);
            }

        } catch (error) {
            console.error("⚠️ Error loading company policy:", error);
            // Fallback: Use hardcoded defaults if file fails
        }
    }

    function updateCurrentUserProfile() {
        // البحث عن المستخدم في الدليل المركزي بناءً على ID المخزن
        // في تطبيق حقيقي، هذا الـ ID يأتي من عملية تسجيل الدخول
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        const targetId = storedUser ? storedUser.id : "USR_004"; // Default to GRCO for demo

        const directory = policyData.organizational_chart.users_directory;
        const foundUser = directory.find(u => u.id === targetId);

        if (foundUser) {
            currentUser = {
                ...currentUser,
                id: foundUser.id,
                nameAr: foundUser.name || foundUser.name_ar, // دعم الصيغتين
                nameEn: foundUser.name, // في الملف الحالي الاسم موحد، يمكن فصله لاحقاً
                titleAr: foundUser.title, // المسمى الوظيفي من الملف
                titleEn: foundUser.title,
                role: foundUser.role,
                department: foundUser.department_id,
                email: foundUser.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(foundUser.name)}&background=FB4747&color=fff`
            };
            // تحديث التخزين المحلي لضمان استمرار البيانات
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }

    // --- 3. Menu Structure (Static for now, but role-ready) ---
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
                { key: 'settings', icon: 'fa-sliders', link: 'admin_settings.html' }
            ]
        }
    ];

    // --- 4. Translations ---
    const t = {
        ar: {
            sysName: "AndroGov",
            sysVer: "Enterprise v3.3",
            logout: "تسجيل خروج",
            notifTitle: "الإشعارات",
            markRead: "تحديد كمقروء",
            emptyNotif: "لا توجد إشعارات جديدة",
            sections: {
                main: "الرئيسية",
                comm: "التواصل المؤسسي",
                gov: "الحوكمة",
                ops: "التشغيل",
                dept: "الإدارات",
                admin: "النظام"
            },
            menu: {
                dash: "لوحة القيادة",
                chat: "الدردشة",
                circulars: "التعاميم",
                ga: "الجمعيات العمومية",
                board: "مجلس الإدارة",
                committees: "اللجان",
                shareholders: "المساهمين",
                doa: "الصلاحيات (DOA)",
                policies: "السياسات",
                compliance: "الامتثال",
                hr: "الموارد البشرية",
                finance: "المالية",
                procurement: "المشتريات",
                it: "التقنية",
                users: "المستخدمين",
                audit: "سجل التدقيق",
                settings: "الإعدادات"
            }
        },
        en: {
            sysName: "AndroGov",
            sysVer: "Enterprise v3.3",
            logout: "Logout",
            notifTitle: "Notifications",
            markRead: "Mark Read",
            emptyNotif: "No notifications",
            sections: {
                main: "Main",
                comm: "Communication",
                gov: "Governance",
                ops: "Operations",
                dept: "Departments",
                admin: "Admin"
            },
            menu: {
                dash: "Dashboard",
                chat: "Chat",
                circulars: "Circulars",
                ga: "General Assembly",
                board: "Board",
                committees: "Committees",
                shareholders: "Shareholders",
                doa: "DOA Matrix",
                policies: "Policies",
                compliance: "Compliance",
                hr: "HR",
                finance: "Finance",
                procurement: "Procurement",
                it: "IT",
                users: "Users",
                audit: "Audit Log",
                settings: "Settings"
            }
        }
    };

    // --- 5. Notifications (Mocked for Demo) ---
    const notifications = [
        {
            id: 1, type: 'critical', icon: 'fa-shield-virus', color: 'text-red-500 bg-red-50',
            titleAr: 'تنبيه أمني', titleEn: 'Security Alert',
            msgAr: 'محاولة دخول غير مصرح بها.', msgEn: 'Unauthorized login attempt.',
            time: '2m'
        },
        {
            id: 2, type: 'info', icon: 'fa-file-contract', color: 'text-blue-500 bg-blue-50',
            titleAr: 'عقد جديد', titleEn: 'New Contract',
            msgAr: 'عقد توريد بانتظار الاعتماد.', msgEn: 'Supply contract pending approval.',
            time: '1h'
        }
    ];

    // --- 6. Render Logic ---

    async function init() {
        // 1. Load Data First
        await loadCompanyData();
        
        // 2. Apply UI
        applySettings();
        renderSidebar();
        renderHeader();
        
        document.body.style.opacity = '1';
        
        // Listeners
        setupEventListeners();
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
        const currentPath = window.location.pathname.split('/').pop() || 'admin.html';
        
        // استخدام البيانات المحدثة من الملف المركزي
        const userDisplayName = isRtl ? currentUser.nameAr : currentUser.nameEn;
        const userDisplayTitle = isRtl ? currentUser.titleAr : currentUser.titleEn;
        
        // استخدام اسم الشركة من الملف المركزي إذا توفر
        const companyName = (policyData && policyData.corporate_profile) 
            ? (isRtl ? policyData.corporate_profile.identity.name_ar : policyData.corporate_profile.identity.name_en)
            : dict.sysName;

        const getLinkClass = (link) => {
            // Simple active check
            const isActive = currentPath.includes(link.split('.')[0]); 
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
                    <span class="flex-1 truncate">${dict.menu[item.key]}</span>
                </a>`;
            });
        });

        // Sidebar HTML Construction
        const sidebarHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3 w-full">
                    <div class="w-10 h-10 rounded-xl bg-red-50 text-brandRed flex items-center justify-center text-xl shrink-0">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                    <div class="overflow-hidden">
                        <h1 class="font-bold text-sm text-slate-800 dark:text-white font-sans truncate" title="${companyName}">
                            ${companyName.split(' ')[0]} </h1>
                        <p class="text-[10px] text-slate-500 uppercase tracking-widest truncate">${dict.sysVer}</p>
                    </div>
                </div>
            </div>

            <div class="p-4">
                <a href="my_profile.html" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group cursor-pointer">
                    <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 object-cover shrink-0">
                    <div class="overflow-hidden flex-1 min-w-0">
                        <p class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-brandRed transition" title="${userDisplayName}">
                            ${userDisplayName}
                        </p>
                        <p class="text-[10px] text-brandRed font-medium truncate" title="${userDisplayTitle}">
                            ${userDisplayTitle}
                        </p>
                    </div>
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

        // Notifications List
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
                <button onclick="document.querySelector('aside').classList.toggle('hidden'); document.querySelector('aside').classList.toggle('flex');" class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>
            </div>

            <div class="flex items-center gap-3">
                
                <div class="relative">
                    <button id="notifBtn" onclick="window.toggleNotif()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative flex items-center justify-center">
                        <i class="fa-regular fa-bell"></i>
                        <span class="absolute top-2 right-2.5 w-2 h-2 bg-brandRed rounded-full border border-white dark:border-slate-800 animate-pulse"></span>
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
                    <i class="fa-solid fa-power-off"></i> <span class="hidden sm:inline">${dict.logout}</span>
                </button>
            </div>
        </header>`;
    }

    function setupEventListeners() {
        document.addEventListener('click', function(event) {
            const notifMenu = document.getElementById('notifDropdown');
            const notifBtn = document.getElementById('notifBtn');
            if (notifMenu && !notifMenu.contains(event.target) && !notifBtn.contains(event.target)) {
                notifMenu.classList.add('hidden');
            }
        });
    }

    // --- 7. Global API (Window) ---
    
    window.toggleNotif = function() {
        const d = document.getElementById('notifDropdown');
        if(d) d.classList.toggle('hidden');
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
            localStorage.removeItem('currentUser');
            window.location.href = '../login.html'; // Assuming layout is in a subfolder
        }
    };

    // Initialize System
    init();
})();
