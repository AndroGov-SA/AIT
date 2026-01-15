/**
 * AndroGov Layout Engine v6.0 (Refactored)
 * @description Modular layout system with DataService integration
 * @requires DataService
 */

const Layout = (function() {
    // ==========================================
    // STATE & CONFIG
    // ==========================================
    const _config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    let _currentUser = {
        id: "USR_004",
        nameAr: "مستخدم النظام",
        nameEn: "System User",
        titleAr: "زائر",
        titleEn: "Guest",
        role: "viewer",
        avatar: ""
    };

    // ==========================================
    // MENU STRUCTURE
    // ==========================================
    const _menuStructure = [
        { section: 'main', items: [
            { key: 'dash', icon: 'fa-gauge-high', link: 'admin.html' }
        ]},
        { section: 'comm', items: [
            { key: 'chat', icon: 'fa-comments', link: 'admin_chat.html' },
            { key: 'circulars', icon: 'fa-bullhorn', link: 'admin_circulars.html' }
        ]},
        { section: 'gov', items: [
            { key: 'ga', icon: 'fa-users-rectangle', link: 'ga.html' },
            { key: 'board', icon: 'fa-building-columns', link: 'board.html' },
            { key: 'committees', icon: 'fa-people-group', link: 'committees.html' },
            { key: 'shareholders', icon: 'fa-id-card', link: 'shareholders.html' }
        ]},
        { section: 'ops', items: [
            { key: 'tasks', icon: 'fa-list-check', link: 'tasks.html' },
            { key: 'doa', icon: 'fa-sitemap', link: 'doa.html' },
            { key: 'policies', icon: 'fa-book-open', link: 'policies.html' },
            { key: 'compliance', icon: 'fa-scale-balanced', link: 'compliance.html' }
        ]},
        { section: 'dept', items: [
            { key: 'hr', icon: 'fa-user-tie', link: 'hr.html' },
            { key: 'finance', icon: 'fa-money-bill-wave', link: 'finance.html' },
            { key: 'procurement', icon: 'fa-boxes-packing', link: 'procurement.html' },
            { key: 'it', icon: 'fa-shield-cat', link: 'it.html' }
        ]},
        { section: 'admin', items: [
            { key: 'users', icon: 'fa-users-gear', link: 'users.html' },
            { key: 'audit', icon: 'fa-list-ul', link: 'audit.html' },
            { key: 'settings', icon: 'fa-sliders', link: 'admin_settings.html' }
        ]}
    ];

    // ==========================================
    // TRANSLATIONS
    // ==========================================
    const _t = {
        ar: {
            sysName: "AndroGov",
            sysVer: "Enterprise v6.0",
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
                tasks: "إدارة المهام",
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
            sysVer: "Enterprise v6.0",
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
                tasks: "Tasks",
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

    // ==========================================
    // NOTIFICATIONS (Sample Data)
    // ==========================================
    const _notifications = [
        { id: 1, type: 'critical', icon: 'fa-shield-virus', color: 'text-red-500 bg-red-50', titleAr: 'تنبيه أمني', titleEn: 'Security Alert', msgAr: 'محاولة دخول غير مصرح بها.', msgEn: 'Unauthorized login attempt.', time: '2m' },
        { id: 2, type: 'info', icon: 'fa-file-contract', color: 'text-blue-500 bg-blue-50', titleAr: 'عقد جديد', titleEn: 'New Contract', msgAr: 'عقد توريد بانتظار الاعتماد.', msgEn: 'Supply contract pending approval.', time: '1h' }
    ];

    // ==========================================
    // INITIALIZATION
    // ==========================================
    async function init() {
        await loadUserProfile();
        applySettings();
        renderSidebar();
        renderHeader();
        document.body.style.opacity = '1';
        setupEventListeners();
        console.log('✅ Layout Engine initialized');
    }

    async function loadUserProfile() {
        try {
            // Load from localStorage first
            const stored = localStorage.getItem('currentUser');
            if (stored) {
                const parsed = JSON.parse(stored);
                _currentUser = { ..._currentUser, ...parsed };
            }

            // Fetch users from DataService if available
            if (typeof DataService !== 'undefined') {
                const users = await DataService.getUsers();
                const foundUser = users.find(u => u.id === _currentUser.id);
                
                if (foundUser) {
                    const name = foundUser.name || {};
                    const title = foundUser.title || {};
                    
                    _currentUser = {
                        ..._currentUser,
                        id: foundUser.id,
                        nameAr: name.ar || name.en || _currentUser.nameAr,
                        nameEn: name.en || name.ar || _currentUser.nameEn,
                        titleAr: title.ar || title.en || _currentUser.titleAr,
                        titleEn: title.en || title.ar || _currentUser.titleEn,
                        role: foundUser.role_ref || foundUser.role || _currentUser.role,
                        email: foundUser.email
                    };
                }
            }

            // Set avatar
            if (_currentUser.id === 'USR_004') {
                _currentUser.avatar = 'https://androgov-sa.github.io/AIT/photo/grc.png';
            } else {
                const name = _currentUser.nameEn || 'User';
                _currentUser.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FB4747&color=fff&bold=true`;
            }

            localStorage.setItem('currentUser', JSON.stringify(_currentUser));
        } catch (e) {
            console.warn('⚠️ Could not load user profile:', e);
        }
    }

    // ==========================================
    // SETTINGS
    // ==========================================
    function applySettings() {
        const html = document.documentElement;
        html.lang = _config.lang;
        html.dir = _config.lang === 'ar' ? 'rtl' : 'ltr';

        if (_config.theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        const main = document.querySelector('.main-content-wrapper');
        if (main) {
            main.classList.remove('md:mr-72', 'md:ml-72');
            main.classList.add(_config.lang === 'ar' ? 'md:mr-72' : 'md:ml-72');
        }
    }

    // ==========================================
    // RENDER SIDEBAR
    // ==========================================
    function renderSidebar() {
        const container = document.getElementById('sidebar-container');
        if (!container) return;

        const dict = _t[_config.lang];
        const isRtl = _config.lang === 'ar';
        const currentPath = window.location.pathname.split('/').pop() || 'admin.html';

        const userDisplayName = isRtl ? _currentUser.nameAr : _currentUser.nameEn;
        const userDisplayTitle = isRtl ? _currentUser.titleAr : _currentUser.titleEn;

        const getLinkClass = (link) => {
            const isActive = currentPath === link;
            const base = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200";
            const active = "bg-brandRed text-white shadow-md shadow-red-500/20";
            const inactive = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";
            return `${base} ${isActive ? active : inactive}`;
        };

        let menuHTML = '';
        _menuStructure.forEach(group => {
            menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${dict.sections[group.section]}</div>`;
            group.items.forEach(item => {
                menuHTML += `
                <a href="${item.link}" class="${getLinkClass(item.link)}">
                    <div class="w-6 text-center"><i class="fa-solid ${item.icon}"></i></div>
                    <span class="flex-1 truncate">${dict.menu[item.key]}</span>
                </a>`;
            });
        });

        container.innerHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3 w-full">
                    <img src="https://ait.sa/wp-content/uploads/2024/03/cropped-Square-Logo.png" class="w-10 h-10 rounded-xl bg-white object-contain shrink-0 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div class="overflow-hidden">
                        <h1 class="font-bold text-sm text-slate-800 dark:text-white font-sans truncate">${dict.sysName} <span class="font-light">System</span></h1>
                        <p class="text-[10px] text-slate-500 uppercase tracking-widest truncate">${dict.sysVer}</p>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <a href="my_profile.html" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-brandRed transition group cursor-pointer">
                    <img src="${_currentUser.avatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 object-cover shrink-0">
                    <div class="overflow-hidden flex-1 min-w-0">
                        <p class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-brandRed transition">${userDisplayName}</p>
                        <p class="text-[10px] text-brandRed font-medium truncate">${userDisplayTitle}</p>
                    </div>
                </a>
            </div>
            <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 custom-scroll space-y-0.5">${menuHTML}</nav>
            <div class="p-4 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">&copy; 2026 Andromeda IT</div>
        </aside>`;

        // Restore scroll position
        const nav = document.getElementById('sidebar-nav');
        if (nav) {
            const savedScroll = sessionStorage.getItem('sidebarScroll');
            if (savedScroll) nav.scrollTop = parseInt(savedScroll, 10);
            window.addEventListener('beforeunload', () => {
                sessionStorage.setItem('sidebarScroll', nav.scrollTop);
            });
        }
    }

    // ==========================================
    // RENDER HEADER
    // ==========================================
    function renderHeader() {
        const container = document.getElementById('header-container');
        if (!container) return;

        const dict = _t[_config.lang];
        const isRtl = _config.lang === 'ar';

        let notifListHTML = '';
        if (_notifications.length > 0) {
            _notifications.forEach(n => {
                notifListHTML += `
                <div class="p-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer flex gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}">
                        <i class="fa-solid ${n.icon} text-xs"></i>
                    </div>
                    <div>
                        <p class="text-xs font-bold text-slate-800 dark:text-white">${isRtl ? n.titleAr : n.titleEn}</p>
                        <p class="text-[10px] text-slate-500 mt-0.5">${isRtl ? n.msgAr : n.msgEn}</p>
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
                <button onclick="Layout.toggleMobileSidebar()" class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>
            </div>
            <div class="flex items-center gap-3">
                <div class="relative">
                    <button id="notifBtn" onclick="Layout.toggleNotif()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-white transition relative flex items-center justify-center">
                        <i class="fa-regular fa-bell"></i>
                        <span class="absolute top-2 right-2.5 w-2 h-2 bg-brandRed rounded-full border border-white dark:border-slate-800 animate-pulse"></span>
                    </button>
                    <div id="notifDropdown" class="hidden absolute top-12 ${isRtl ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                        <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                            <span class="text-xs font-bold dark:text-white">${dict.notifTitle}</span>
                            <button class="text-[10px] text-brandRed hover:underline">${dict.markRead}</button>
                        </div>
                        <div class="max-h-64 overflow-y-auto custom-scroll">${notifListHTML}</div>
                    </div>
                </div>
                <button onclick="Layout.changeLang()" class="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-white transition">${_config.lang === 'ar' ? 'English' : 'عربي'}</button>
                <button onclick="Layout.changeTheme()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition">
                    <i class="fa-solid ${_config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                </button>
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button onclick="Layout.doLogout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2">
                    <i class="fa-solid fa-power-off"></i> <span class="hidden sm:inline">${dict.logout}</span>
                </button>
            </div>
        </header>`;
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    function setupEventListeners() {
        document.addEventListener('click', function(e) {
            const notifMenu = document.getElementById('notifDropdown');
            const notifBtn = document.getElementById('notifBtn');
            if (notifMenu && !notifMenu.contains(e.target) && !notifBtn?.contains(e.target)) {
                notifMenu.classList.add('hidden');
            }
        });
    }

    // ==========================================
    // PUBLIC API
    // ==========================================
    return {
        init,
        
        toggleNotif() {
            const d = document.getElementById('notifDropdown');
            if (d) d.classList.toggle('hidden');
        },

        toggleMobileSidebar() {
            const aside = document.querySelector('aside');
            if (aside) {
                aside.classList.toggle('hidden');
                aside.classList.toggle('flex');
            }
        },

        changeTheme() {
            const newTheme = _config.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            location.reload();
        },

        changeLang() {
            const newLang = _config.lang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('lang', newLang);
            location.reload();
        },

        doLogout() {
            const msg = _config.lang === 'ar' ? 'هل أنت متأكد من تسجيل الخروج؟' : 'Are you sure you want to logout?';
            if (confirm(msg)) {
                localStorage.removeItem('currentUser');
                window.location.href = 'https://androgov-sa.github.io/AIT/login.html';
            }
        },

        getConfig: () => ({ ..._config }),
        getCurrentUser: () => ({ ..._currentUser })
    };
})();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Layout.init();
});

// Make available globally (for backward compatibility)
window.Layout = Layout;
window.changeTheme = Layout.changeTheme;
window.changeLang = Layout.changeLang;
window.doLogout = Layout.doLogout;
window.toggleNotif = Layout.toggleNotif;
