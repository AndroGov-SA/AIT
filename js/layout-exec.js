/**
 * AndroGov Master Layout v8.0 (The Final Polish)
 * - Design: Clean White (Light Mode) / Slate Dark (Dark Mode).
 * - Features: Full Rich Menus, Bilingual (AR/EN), Multi-Role Switcher.
 */

(function() {
    // 1. التحقق من هوية المستخدم
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'https://androgov-sa.github.io/AIT/login.html';
        return;
    }

    // 2. إعدادات النظام (اللغة والثيم)
    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    const isRtl = config.lang === 'ar';

    // 3. قاموس النصوص العامة
    const i18n = {
        ar: {
            logout: "تسجيل خروج",
            welcome: "مرحباً",
            switch: "تبديل البوابة",
            search: "بحث في النظام...",
            titles: { admin: "مدير النظام", ceo: "الرئيس التنفيذي", cfo: "المدير المالي", hr: "مدير الموارد البشرية", cto: "المدير التقني", emp: "بوابة الموظف" }
        },
        en: {
            logout: "Logout",
            welcome: "Welcome",
            switch: "Switch Portal",
            search: "Search...",
            titles: { admin: "System Admin", ceo: "CEO", cfo: "CFO", hr: "HR Manager", cto: "CTO", emp: "Employee Portal" }
        }
    };
    const t = i18n[config.lang];

    // 4. هيكلية القوائم الكاملة (Rich Menu Structure)
    const MENUS = {
        // --- HR Menu (نسخة طبق الأصل لما طلبته) ---
        hr: [
            {
                label: { ar: 'الرئيسية', en: 'Main' },
                items: [
                    { icon: 'fa-chart-pie', link: '../hr/hr_dashboard.html', ar: 'لوحة القيادة', en: 'Dashboard' },
                    { icon: 'fa-inbox', link: '../hr/hr_approvals.html', ar: 'الموافقات والطلبات', en: 'Approvals' },
                    { icon: 'fa-comments', link: '../hr/internal_chat.html', ar: 'المحادثات الداخلية', en: 'Internal Chat' }
                ]
            },
            {
                label: { ar: 'القوى العاملة', en: 'Workforce' },
                items: [
                    { icon: 'fa-users', link: '../hr/hr_employees.html', ar: 'سجل الموظفين', en: 'Employees' },
                    { icon: 'fa-file-contract', link: '../hr/hr_contracts.html', ar: 'إدارة العقود', en: 'Contracts' },
                    { icon: 'fa-sitemap', link: '../hr/hr_org.html', ar: 'الهيكل التنظيمي', en: 'Org Chart' }
                ]
            },
            {
                label: { ar: 'العمليات والرواتب', en: 'Operations' },
                items: [
                    { icon: 'fa-fingerprint', link: '../hr/hr_attendance.html', ar: 'الحضور والانصراف', en: 'Attendance' },
                    { icon: 'fa-calendar-days', link: '../hr/hr_leaves.html', ar: 'الإجازات والمغادرات', en: 'Leaves' },
                    { icon: 'fa-money-bill-wave', link: '../hr/hr_payroll.html', ar: 'مسيرات الرواتب', en: 'Payroll' },
                    { icon: 'fa-plane-departure', link: '../hr/hr_trips.html', ar: 'الانتدابات والسفر', en: 'Business Trips' }
                ]
            },
            {
                label: { ar: 'الشؤون الإدارية', en: 'Admin Affairs' },
                items: [
                    { icon: 'fa-boxes-packing', link: '../hr/hr_assets.html', ar: 'العهد والأصول', en: 'Custody & Assets' },
                    { icon: 'fa-building-user', link: '../hr/hr_logistics.html', ar: 'الخدمات اللوجستية', en: 'Logistics' },
                    { icon: 'fa-cart-shopping', link: '../hr/hr_purchases.html', ar: 'المشتريات الإدارية', en: 'Admin Purchases' },
                    { icon: 'fa-handshake', link: '../hr/hr_partners.html', ar: 'الشركاء والموردين', en: 'Partners' }
                ]
            },
            {
                label: { ar: 'العلاقات الحكومية', en: 'Govt Relations' },
                items: [
                    { icon: 'fa-passport', link: '../hr/hr_govt.html', ar: 'الوثائق الحكومية', en: 'Govt Documents' },
                    { icon: 'fa-user-plus', link: '../hr/hr_recruitment.html', ar: 'التوظيف والاستقدام', en: 'Recruitment' }
                ]
            }
        ],

        // --- Finance Menu (كاملة) ---
        finance: [
            {
                label: { ar: 'الرئيسية', en: 'Main' },
                items: [
                    { icon: 'fa-chart-line', link: '../finance/cfo_dashboard.html', ar: 'المركز المالي', en: 'Financial Position' },
                    { icon: 'fa-check-double', link: '../finance/approvals.html', ar: 'الاعتمادات', en: 'Approvals' },
                    { icon: 'fa-comments', link: '../finance/internal_chat.html', ar: 'المحادثات', en: 'Chat' }
                ]
            },
            {
                label: { ar: 'المحاسبة العامة', en: 'Accounting (GL)' },
                items: [
                    { icon: 'fa-book', link: '../finance/gl_journal.html', ar: 'قيود اليومية', en: 'Journal Entries' },
                    { icon: 'fa-list-ol', link: '../finance/gl_coa.html', ar: 'دليل الحسابات', en: 'Chart of Accounts' },
                    { icon: 'fa-tags', link: '../finance/gl_cost_centers.html', ar: 'مراكز التكلفة', en: 'Cost Centers' }
                ]
            },
            {
                label: { ar: 'العمليات المالية', en: 'Operations' },
                items: [
                    { icon: 'fa-file-invoice-dollar', link: '../finance/ap_bills.html', ar: 'الموردين (AP)', en: 'Accounts Payable' },
                    { icon: 'fa-hand-holding-dollar', link: '../finance/ar_invoices.html', ar: 'العملاء (AR)', en: 'Accounts Receivable' },
                    { icon: 'fa-boxes-stacked', link: '../finance/inv_assets.html', ar: 'الأصول والمخزون', en: 'Assets & Inventory' }
                ]
            },
            {
                label: { ar: 'التقارير', en: 'Reporting' },
                items: [
                    { icon: 'fa-file-contract', link: '../finance/rep_statements.html', ar: 'القوائم المالية', en: 'Statements' },
                    { icon: 'fa-scale-balanced', link: '../finance/rep_budget.html', ar: 'الموازنة التقديرية', en: 'Budgeting' },
                    { icon: 'fa-percent', link: '../finance/rep_tax.html', ar: 'الإقرارات الضريبية', en: 'Tax Reports' }
                ]
            }
        ],

        // --- CTO Menu ---
        tech: [
            {
                label: { ar: 'العمليات', en: 'Operations' },
                items: [
                    { icon: 'fa-server', link: '../cto/cto_dashboard.html', ar: 'حالة النظام', en: 'System Status' },
                    { icon: 'fa-headset', link: '../cto/cto_support.html', ar: 'الدعم الفني', en: 'Support' },
                    { icon: 'fa-code-branch', link: '../cto/cto_projects.html', ar: 'المشاريع', en: 'Projects' }
                ]
            },
            {
                label: { ar: 'البنية التحتية', en: 'Infrastructure' },
                items: [
                    { icon: 'fa-hard-drive', link: '../cto/cto_servers.html', ar: 'الخوادم', en: 'Servers' },
                    { icon: 'fa-phone-volume', link: '../cto/cto_pbx.html', ar: 'السنترال', en: 'PBX' },
                    { icon: 'fa-laptop-code', link: '../cto/cto_assets.html', ar: 'الأصول التقنية', en: 'IT Assets' }
                ]
            },
            {
                label: { ar: 'الأمن السيبراني', en: 'Security' },
                items: [
                    { icon: 'fa-shield-halved', link: '../cto/cto_soc.html', ar: 'مركز الأمن (SOC)', en: 'SOC' },
                    { icon: 'fa-key', link: '../cto/cto_iam.html', ar: 'إدارة الهويات', en: 'IAM' }
                ]
            }
        ],

        // --- CEO Menu ---
        ceo: [
            {
                label: { ar: 'الإدارة العليا', en: 'Top Management' },
                items: [
                    { icon: 'fa-chart-pie', link: '../ceo/ceo_dashboard.html', ar: 'نظرة شاملة', en: 'Overview' },
                    { icon: 'fa-chess-queen', link: '../ceo/ceo_strategy.html', ar: 'الاستراتيجية', en: 'Strategy' },
                    { icon: 'fa-file-contract', link: '../ceo/ceo_reports.html', ar: 'التقارير الموحدة', en: 'Unified Reports' }
                ]
            },
            {
                label: { ar: 'الحوكمة والمجلس', en: 'Governance' },
                items: [
                    { icon: 'fa-gavel', link: '../ceo/ceo_governance.html', ar: 'الحوكمة والالتزام', en: 'Compliance' },
                    { icon: 'fa-triangle-exclamation', link: '../ceo/ceo_risks.html', ar: 'إدارة المخاطر', en: 'Risk Mgmt' },
                    { icon: 'fa-users-rectangle', link: '../ceo/ceo_board.html', ar: 'شؤون المجلس', en: 'Board Affairs' }
                ]
            }
        ],

        // --- Admin Menu ---
        admin: [
            {
                label: { ar: 'إدارة النظام', en: 'System Admin' },
                items: [
                    { icon: 'fa-gauge-high', link: '../admin/admin.html', ar: 'لوحة التحكم', en: 'Control Panel' },
                    { icon: 'fa-users-gear', link: '../admin/users.html', ar: 'إدارة المستخدمين', en: 'Users' },
                    { icon: 'fa-sliders', link: '../admin/admin_settings.html', ar: 'الإعدادات العامة', en: 'Settings' }
                ]
            },
            {
                label: { ar: 'الحوكمة', en: 'Governance' },
                items: [
                    { icon: 'fa-chart-pie', link: '../admin/shareholders.html', ar: 'سجل المساهمين', en: 'Shareholders' },
                    { icon: 'fa-gavel', link: '../admin/board.html', ar: 'مجلس الإدارة', en: 'Board' },
                    { icon: 'fa-magnifying-glass', link: '../admin/audit.html', ar: 'لجنة المراجعة', en: 'Audit' }
                ]
            }
        ],

        // --- Staff Menu ---
        staff: [
            {
                label: { ar: 'بوابة الموظف', en: 'Employee Portal' },
                items: [
                    { icon: 'fa-chart-pie', link: '../employee/dashboard.html', ar: 'لوحة القيادة', en: 'Dashboard' },
                    { icon: 'fa-file-signature', link: '../employee/my_requests.html', ar: 'طلباتي', en: 'My Requests' }
                ]
            }
        ]
    };

    // 5. التشغيل
    function init() {
        if (config.theme === 'dark') document.documentElement.classList.add('dark');
        renderSidebar();
        renderHeader();
        highlightActiveLink();
    }

    // 6. رسم السايدبار (مع مراعاة التصميم الأبيض)
    function renderSidebar() {
        const role = (currentUser.role || '').toLowerCase();
        const access = currentUser.accessLevels || [];
        
        // اختيار القائمة
        let selectedMenu = MENUS.staff;
        let roleBadge = t.titles.emp;

        if (role.includes('admin') || access.includes('admin')) { selectedMenu = MENUS.admin; roleBadge = t.titles.admin; }
        else if (role.includes('ceo') || access.includes('ceo')) { selectedMenu = MENUS.ceo; roleBadge = t.titles.ceo; }
        else if (role.includes('cfo') || role.includes('finance') || access.includes('finance')) { selectedMenu = MENUS.finance; roleBadge = t.titles.cfo; }
        else if (role.includes('cao') || role.includes('hr') || access.includes('hr')) { selectedMenu = MENUS.hr; roleBadge = t.titles.hr; }
        else if (role.includes('cto') || role.includes('tech') || access.includes('cto')) { selectedMenu = MENUS.tech; roleBadge = t.titles.cto; }

        let linksHTML = '';
        selectedMenu.forEach(section => {
            const sectionTitle = config.lang === 'ar' ? section.label.ar : section.label.en;
            linksHTML += `<p class="px-6 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">${sectionTitle}</p>`;
            
            section.items.forEach(item => {
                const text = config.lang === 'ar' ? item.ar : item.en;
                // تصميم الروابط (نظيف وواضح)
                linksHTML += `
                <a href="${item.link}" class="flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all mb-1 group text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white" id="link-${item.link.split('/').pop().replace('.html','')}">
                    <div class="w-6 text-center"><i class="fa-solid ${item.icon}"></i></div>
                    <span class="font-bold text-xs ${config.lang === 'en' ? 'font-sans' : ''}">${text}</span>
                </a>`;
            });
        });

        // الهيكل الرئيسي للسايدبار (أبيض في الفاتح، داكن في الليلي)
        document.getElementById('sidebar-container').innerHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-screen w-72 bg-white dark:bg-slate-900 border-${isRtl ? 'l' : 'r'} border-slate-100 dark:border-slate-800 flex flex-col z-50 shadow-xl hidden md:flex transition-colors duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <h1 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Andro<span class="text-brandRed">Gov</span></h1>
                <span class="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded mx-2">${roleBadge}</span>
            </div>
            
            <div class="p-6">
                <div class="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=${currentUser.avatarColor ? currentUser.avatarColor.replace('#','') : 'random'}&color=fff" class="w-10 h-10 rounded-full shadow-sm">
                    <div class="overflow-hidden">
                        <p class="font-bold text-xs text-slate-800 dark:text-white truncate w-32">${currentUser.name}</p>
                        <p class="text-[10px] text-slate-400 mt-0.5 truncate w-32">${currentUser.title}</p>
                    </div>
                </div>
            </div>

            <nav class="flex-1 overflow-y-auto custom-scroll pb-10">
                ${linksHTML}
            </nav>

            <div class="p-4 border-t border-slate-100 dark:border-slate-800">
                <button onclick="logout()" class="w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all">
                    <i class="fa-solid fa-power-off"></i> ${t.logout}
                </button>
            </div>
        </aside>`;
    }

    // 7. رسم الهيدر (مع زر التبديل والبحث)
    function renderHeader() {
        const levels = currentUser.accessLevels || [];
        
        let switcherHtml = '';
        if (levels.length > 1) {
            let options = `<option value="#" selected disabled>${t.switch}</option>`;
            if (levels.includes('admin')) options += `<option value="../admin/admin.html">${i18n[config.lang].titles.admin}</option>`;
            if (levels.includes('board')) options += `<option value="../admin/board.html">${config.lang==='ar'?'بوابة المجلس':'Board Portal'}</option>`;
            if (levels.includes('ceo')) options += `<option value="../ceo/ceo_dashboard.html">${i18n[config.lang].titles.ceo}</option>`;
            if (levels.includes('finance')) options += `<option value="../finance/cfo_dashboard.html">${i18n[config.lang].titles.cfo}</option>`;
            if (levels.includes('hr')) options += `<option value="../hr/hr_dashboard.html">${i18n[config.lang].titles.hr}</option>`;
            if (levels.includes('audit')) options += `<option value="../admin/audit.html">${config.lang==='ar'?'لجنة المراجعة':'Audit Committee'}</option>`;
            if (levels.includes('shareholder')) options += `<option value="../shareholder/dashboard.html">${config.lang==='ar'?'بوابة المساهم':'Shareholder Portal'}</option>`;

            switcherHtml = `
            <div class="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg mx-4">
                <i class="fa-solid fa-repeat text-brandRed text-xs"></i>
                <select onchange="if(this.value) window.location.href=this.value" class="bg-transparent text-xs font-bold outline-none cursor-pointer text-slate-600 dark:text-slate-300 w-28">
                    ${options}
                </select>
            </div>`;
        }

        document.getElementById('header-container').innerHTML = `
        <header class="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors duration-300">
            <div class="flex items-center">
                <button onclick="document.querySelector('aside').classList.toggle('hidden');" class="md:hidden text-slate-500 mr-4"><i class="fa-solid fa-bars text-xl"></i></button>
                
                <div class="relative hidden lg:block w-64 mr-4">
                    <i class="fa-solid fa-magnifying-glass absolute top-3 ${isRtl ? 'right-3' : 'left-3'} text-slate-400 text-xs"></i>
                    <input type="text" placeholder="${t.search}" class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2.5 ${isRtl ? 'pr-9' : 'pl-9'} text-xs focus:ring-2 focus:ring-brandRed/20 transition-all dark:text-white">
                </div>

                ${switcherHtml}
            </div>
            
            <div class="flex items-center gap-2">
                <button onclick="toggleLang()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition">
                    ${config.lang === 'ar' ? 'EN' : 'عربي'}
                </button>
                <button onclick="toggleTheme()" class="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-yellow-500 transition">
                    <i class="fa-solid ${config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                </button>
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                <button class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-brandRed transition relative">
                    <i class="fa-regular fa-bell"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
            </div>
        </header>`;
    }

    function highlightActiveLink() {
        try {
            const page = window.location.pathname.split('/').pop().replace('.html','');
            const el = document.getElementById('link-' + page);
            if (el) {
                el.classList.add('bg-brandRed', 'text-white', 'shadow-lg', 'shadow-brandRed/30');
                el.classList.remove('text-slate-500', 'hover:bg-slate-100', 'hover:text-slate-900', 'dark:text-slate-400');
            }
        } catch (e) {}
    }

    window.logout = () => { localStorage.removeItem('currentUser'); window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };
    window.toggleTheme = () => {
        const newTheme = config.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        location.reload();
    };
    window.toggleLang = () => {
        const newLang = config.lang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('lang', newLang);
        location.reload();
    };

    init();
})();
