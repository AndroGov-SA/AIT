/**
 * AndroGov Layout Engine v5.3 (Logo & Avatar Update)
 * - Added Official Company Logo
 * - Custom Avatar for Admin/GRC User
 * - Fixed: Strict Active State matching
 * - Fixed: Sidebar Scroll Preservation
 */

(function() {
    // --- 1. State & Globals ---
    let policyData = null; 
    
    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        id: "USR_004",
        nameAr: "مستخدم النظام",
        nameEn: "System User",
        role: "Guest",
        avatar: "grc.png"
    };

    // --- DASHBOARD DATA (Added to support the dashboard view) ---
    const DASHBOARD_DATA = {
        shareholders: [
            { id: "SH_001", name: { ar: "ورثة محمد بن صالح السحيباني", en: "Heirs of Mohammed Al-Suhaibani" }, percent: 35 },
            { id: "SH_002", name: { ar: "هشام بن محمد السحيباني", en: "Hesham bin Muhammad Al-Sohibani" }, percent: 10 },
            { id: "SH_010", name: { ar: "شركة بيجي المحدودة", en: "BG LTD.Company" }, percent: 15 },
            { id: "SH_OTH", name: { ar: "آخرون", en: "Others" }, percent: 40 }
        ]
    };

    // --- 2. Data Fetching ---
    async function loadCompanyData() {
        try {
            if (typeof POLICY_DATA !== 'undefined') {
                policyData = POLICY_DATA;
                console.log("✅ Company Policy Loaded from Memory:", policyData.system.version);
                
                updateCurrentUserProfile();

                if (policyData.identity && policyData.identity.tokens) {
                    const brandColor = policyData.identity.tokens.colors.primary.value.light;
                    document.documentElement.style.setProperty('--brand-color', brandColor);
                }
            } else {
                console.error("⚠️ POLICY_DATA is not defined.");
            }
        } catch (error) {
            console.error("⚠️ Error processing company policy:", error);
        }
    }

    function updateCurrentUserProfile() {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        const targetId = storedUser ? storedUser.id : "USR_004"; 

        let directory = [];
        if (policyData && policyData.organization && policyData.organization.key_personnel) {
            directory = policyData.organization.key_personnel;
        } else if (policyData && policyData.organizational_chart) {
            directory = policyData.organizational_chart.users_directory;
        }

        const foundUser = directory.find(u => u.id === targetId || u.email === (storedUser ? storedUser.email : ''));

        if (foundUser) {
            const nameVal = foundUser.name;
            const nameAr = (typeof nameVal === 'object') ? nameVal.ar : nameVal;
            const nameEn = (typeof nameVal === 'object') ? nameVal.en : nameVal;
            const brandColorHex = (policyData.identity?.tokens?.colors?.primary?.value?.light || "FB4747").replace('#', '');

            // تحديد رابط الصورة
            let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nameEn)}&background=${brandColorHex}&color=fff&bold=true`;
            
            if (foundUser.id === 'USR_004') {
                avatarUrl = 'grc.png';
            }

            currentUser = {
                ...currentUser,
                id: foundUser.id,
                nameAr: nameAr,
                nameEn: nameEn,
                titleAr: foundUser.title,
                titleEn: foundUser.title,
                role: foundUser.role_ref || foundUser.role,
                department: foundUser.dept || foundUser.department_id,
                email: foundUser.email,
                avatar: avatarUrl
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }

    // --- 3. Menu Structure ---
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
                { key: 'tasks', icon: 'fa-list-check', link: 'tasks.html' },
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
            sysName: "AndroGov", sysVer: "Enterprise v5.3", logout: "تسجيل خروج",
            notifTitle: "الإشعارات", markRead: "تحديد كمقروء", emptyNotif: "لا توجد إشعارات جديدة",
            sections: { main: "الرئيسية", comm: "التواصل المؤسسي", gov: "الحوكمة", ops: "التشغيل", dept: "الإدارات", admin: "النظام" },
            menu: { dash: "لوحة القيادة", tasks:"إدارة المهام", chat: "الدردشة", circulars: "التعاميم", ga: "الجمعيات العمومية", board: "مجلس الإدارة", committees: "اللجان", shareholders: "المساهمين", doa: "الصلاحيات (DOA)", policies: "السياسات", compliance: "الامتثال", hr: "الموارد البشرية", finance: "المالية", procurement: "المشتريات", it: "التقنية", users: "المستخدمين", audit: "سجل التدقيق", settings: "الإعدادات" },
            // Dashboard Specific
            chartTitle: "هيكل الملكية", chartHeirs: "ورثة السحيباني", chartHesham: "هشام السحيباني", chartBG: "شركة بيجي", chartOthers: "آخرون",
            logBackup: "تم إكمال النسخ الاحتياطي بنجاح", logPolicy: "قام هشام باستعراض سياسة المكافآت", logUpload: "قام أيمن برفع مسودة الدليل الداخلي", logFirewall: "تم حظر محاولة دخول مشبوهة"
        },
        en: {
            sysName: "AndroGov", sysVer: "Enterprise v5.3", logout: "Logout",
            notifTitle: "Notifications", markRead: "Mark Read", emptyNotif: "No notifications",
            sections: { main: "Main", comm: "Communication", gov: "Governance", ops: "Operations", dept: "Departments", admin: "Admin" },
            menu: { dash: "Dashboard", tasks:"Tasks Management", chat: "Chat", circulars: "Circulars", ga: "General Assembly", board: "Board", committees: "Committees", shareholders: "Shareholders", doa: "DOA Matrix", policies: "Policies", compliance: "Compliance", hr: "HR", finance: "Finance", procurement: "Procurement", it: "IT", users: "Users", audit: "Audit Log", settings: "Settings" },
            // Dashboard Specific
            chartTitle: "Ownership Structure", chartHeirs: "Heirs of Al-Suhaibani", chartHesham: "Hesham Al-Suhaibani", chartBG: "BG LTD", chartOthers: "Others",
            logBackup: "Backup completed successfully", logPolicy: "Hesham viewed Bonus Policy", logUpload: "Ayman uploaded Internal Manual draft", logFirewall: "Suspicious login attempt blocked"
        }
    };

    // --- 5. Notifications Data ---
    const notifications = [
        { id: 1, type: 'critical', icon: 'fa-shield-virus', color: 'text-red-500 bg-red-50', titleAr: 'تنبيه أمني', titleEn: 'Security Alert', msgAr: 'محاولة دخول غير مصرح بها.', msgEn: 'Unauthorized login attempt.', time: '2m' },
        { id: 2, type: 'info', icon: 'fa-file-contract', color: 'text-blue-500 bg-blue-50', titleAr: 'عقد جديد', titleEn: 'New Contract', msgAr: 'عقد توريد بانتظار الاعتماد.', msgEn: 'Supply contract pending approval.', time: '1h' }
    ];

    // --- 6. Render Logic ---
    async function init() {
        await loadCompanyData();
        applySettings();
        renderSidebar();
        renderHeader();
        initDashboardWidgets(); // Initialize Charts if on dashboard
        document.body.style.opacity = '1';
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
        
        const userDisplayName = isRtl ? currentUser.nameAr : currentUser.nameEn;
        const userDisplayTitle = (isRtl ? currentUser.titleAr : currentUser.titleEn) || currentUser.role;
        
        const companyName = (policyData && policyData.identity) 
            ? policyData.identity.meta.brand_name[config.lang]
            : dict.sysName;

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
                    <span class="flex-1 truncate">${dict.menu[item.key]}</span>
                </a>`;
            });
        });

        const sidebarHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3 w-full">
                    <img src="https://ait.sa/wp-content/uploads/2024/03/cropped-Square-Logo.png" class="w-10 h-10 rounded-xl bg-white object-contain shrink-0 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div class="overflow-hidden">
                        <h1 class="font-bold text-sm text-slate-800 dark:text-white font-sans truncate" title="${companyName}">
                            ${companyName.split(' ')[0]} <span class="font-light">${companyName.split(' ')[1] || ''}</span>
                        </h1>
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

            <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 custom-scroll space-y-0.5">
                ${menuHTML}
            </nav>

            <div class="p-4 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
                &copy; 2026 Andromeda IT
            </div>
        </aside>`;

        container.innerHTML = sidebarHTML;

        const nav = document.getElementById('sidebar-nav');
        if (nav) {
            const savedScroll = sessionStorage.getItem('sidebarScroll');
            if (savedScroll) {
                nav.scrollTop = parseInt(savedScroll, 10);
            }
            window.addEventListener('beforeunload', () => {
                sessionStorage.setItem('sidebarScroll', nav.scrollTop);
            });
        }
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

    // --- 7. Dashboard Logic (Charts & Logs) ---
    function initDashboardWidgets() {
        const ctx = document.getElementById('ownershipChart');
        if(!ctx) return; // Not on dashboard

        const dict = t[config.lang];
        const data = {
            labels: [dict.chartHeirs, dict.chartHesham, dict.chartBG, dict.chartOthers],
            datasets: [{
                data: [35, 10, 15, 40],
                backgroundColor: ['#FB4747', '#4267B2', '#10B981', '#CBD5E1'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        };

        if(window.myChart) window.myChart.destroy();
        window.myChart = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                cutout: '75%'
            }
        });

        // Fill Legend
        const legendContainer = document.getElementById('chartLegend');
        if(legendContainer) {
            legendContainer.innerHTML = `
                <div class="flex justify-between items-center text-xs"><span class="flex items-center gap-2 text-slate-600 dark:text-slate-300"><span class="w-2 h-2 rounded-full bg-brandRed"></span> ${dict.chartHeirs}</span><span class="font-bold font-en">35%</span></div>
                <div class="flex justify-between items-center text-xs"><span class="flex items-center gap-2 text-slate-600 dark:text-slate-300"><span class="w-2 h-2 rounded-full bg-blue-500"></span> ${dict.chartHesham}</span><span class="font-bold font-en">10%</span></div>
                <div class="flex justify-between items-center text-xs"><span class="flex items-center gap-2 text-slate-600 dark:text-slate-300"><span class="w-2 h-2 rounded-full bg-green-500"></span> ${dict.chartBG}</span><span class="font-bold font-en">15%</span></div>
                <div class="flex justify-between items-center text-xs"><span class="flex items-center gap-2 text-slate-600 dark:text-slate-300"><span class="w-2 h-2 rounded-full bg-slate-300"></span> ${dict.chartOthers}</span><span class="font-bold font-en">40%</span></div>
            `;
        }

        // Fill Logs
        const logContainer = document.getElementById('audit-log-container');
        if(logContainer) {
            const logs = [
                { t: "10:45:22", type: "INFO", u: "System", msg: dict.logBackup, c: "text-green-400" },
                { t: "10:42:15", type: "WARN", u: "Hesham", msg: dict.logPolicy, c: "text-yellow-400" },
                { t: "10:30:01", type: "INFO", u: "Ayman", msg: dict.logUpload, c: "text-blue-400" },
                { t: "09:15:00", type: "CRIT", u: "Firewall", msg: dict.logFirewall, c: "text-red-400" }
            ];
            logContainer.innerHTML = '';
            logs.forEach(log => {
                logContainer.innerHTML += `
                    <div class="flex gap-3 hover:bg-slate-800/50 p-1 rounded transition cursor-default">
                        <span class="text-slate-500 w-16 shrink-0">[${log.t}]</span>
                        <span class="${log.c} font-bold w-10 shrink-0">${log.type}</span>
                        <span class="text-white w-16 shrink-0 font-bold">${log.u}</span>
                        <span class="text-slate-400 truncate">${log.msg}</span>
                    </div>
                `;
            });
        }

        // Fill Stats
        const sc = document.getElementById('shareholder-count');
        if(sc) sc.innerHTML = DASHBOARD_DATA.shareholders.length + ` <span class="text-xs font-sans text-slate-400">${config.lang === 'ar' ? 'عضو' : 'Members'}</span>`;
        
        const stc = document.getElementById('staff-count');
        if(stc) stc.innerText = "24";
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

    // --- 8. Global API (Window) ---
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
            window.location.href = 'https://androgov-sa.github.io/AIT/login.html';
        }
    };

    // Global Review Modal (Used in Dashboard)
    window.openReviewModal = function() {
        if(typeof Swal === 'undefined') return;
        
        const isAr = config.lang === 'ar';
        Swal.fire({
            title: isAr ? '<strong>مراجعة: الدليل الداخلي</strong>' : '<strong>Review: Internal Manual</strong>',
            html: isAr ? `
                <div class="text-right text-sm">
                    <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg mb-4 text-slate-600 dark:text-slate-300">
                        <p class="mb-2"><strong class="text-brandBlue">رقم النسخة:</strong> v3.2</p>
                        <p class="mb-2"><strong class="text-brandBlue">الرافع:</strong> أيمن المغربي</p>
                        <p class="mb-2"><strong class="text-brandBlue">تاريخ الرفع:</strong> 2025-07-27</p>
                        <p><strong class="text-brandBlue">التغييرات الرئيسية:</strong> تحديث سياسات الإجازات.</p>
                    </div>
                    <div class="flex gap-2 justify-center mb-2">
                        <button class="px-3 py-1 bg-slate-200 rounded text-xs hover:bg-slate-300"><i class="fa-solid fa-eye"></i> معاينة الملف</button>
                    </div>
                </div>
            ` : '<div>Review Content</div>',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: isAr ? '<i class="fa-solid fa-check"></i> اعتماد' : 'Approve',
            denyButtonText: isAr ? '<i class="fa-solid fa-rotate-left"></i> طلب تعديل' : 'Request Changes',
            cancelButtonText: isAr ? 'إلغاء' : 'Cancel',
            confirmButtonColor: '#10B981',
            denyButtonColor: '#F59E0B',
            customClass: { popup: 'dark:bg-slate-800 dark:text-white' }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ 
                    title: isAr ? 'تم الاعتماد!' : 'Approved', 
                    text: isAr ? 'تم توثيق الدليل وإرسال إشعار للموظفين.' : 'Policy approved.', 
                    icon: 'success', 
                    confirmButtonColor: '#4267B2' 
                });
                // Update UI if present
                const alertBox = document.getElementById('urgent-alert-box');
                if(alertBox) {
                    alertBox.classList.add('opacity-50', 'pointer-events-none');
                    const title = alertBox.querySelector('h3');
                    if(title) title.innerText = isAr ? 'تم الاعتماد بنجاح ✅' : 'Approved ✅';
                    const btn = alertBox.querySelector('button');
                    if(btn) btn.style.display = 'none';
                }
            } else if (result.isDenied) {
                Swal.fire(isAr ? 'تم إرسال طلب التعديل' : 'Change request sent', '', 'info');
            }
        });
    };

    // Initialize System
    init();
})();
