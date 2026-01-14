/**
 * AndroGov Ultimate Unified Layout v7.0
 * ملف واحد يحتوي على كافة تفاصيل القوائم (HR, Finance, CTO, CEO, Admin).
 * يقوم بتبديل المحتوى بالكامل بناءً على دور المستخدم.
 */

(function() {
    // 1. التحقق من المستخدم
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = '../login.html';
        return;
    }

    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    // 2. تعريف القوائم التفصيلية (Rich Menus) - هنا وضعت كل التفاصيل
    const ALL_MENUS = {
        
        // --- أ. قائمة الموارد البشرية (بنفس الهيكلية التي طلبتها) ---
        hr: [
            {
                section: 'main', label: 'الرئيسية',
                items: [
                    { icon: 'fa-chart-pie', link: '../hr/hr_dashboard.html', text: 'لوحة القيادة' },
                    { icon: 'fa-inbox', link: '../hr/hr_approvals.html', text: 'الموافقات والطلبات' },
                    { icon: 'fa-comments', link: '../hr/internal_chat.html', text: 'المحادثات الداخلية' }
                ]
            },
            {
                section: 'workforce', label: 'القوى العاملة',
                items: [
                    { icon: 'fa-users', link: '../hr/hr_employees.html', text: 'سجل الموظفين' },
                    { icon: 'fa-file-contract', link: '../hr/hr_contracts.html', text: 'إدارة العقود' },
                    { icon: 'fa-sitemap', link: '../hr/hr_org.html', text: 'الهيكل التنظيمي' }
                ]
            },
            {
                section: 'ops', label: 'العمليات والرواتب',
                items: [
                    { icon: 'fa-fingerprint', link: '../hr/hr_attendance.html', text: 'الحضور والانصراف' },
                    { icon: 'fa-calendar-days', link: '../hr/hr_leaves.html', text: 'الإجازات والمغادرات' },
                    { icon: 'fa-money-bill-wave', link: '../hr/hr_payroll.html', text: 'مسيرات الرواتب' },
                    { icon: 'fa-plane-departure', link: '../hr/hr_trips.html', text: 'الانتدابات والسفر' }
                ]
            },
            {
                section: 'admin', label: 'الشؤون الإدارية',
                items: [
                    { icon: 'fa-boxes-packing', link: '../hr/hr_assets.html', text: 'العهد والأصول' },
                    { icon: 'fa-building-user', link: '../hr/hr_logistics.html', text: 'الخدمات اللوجستية' },
                    { icon: 'fa-cart-shopping', link: '../hr/hr_purchases.html', text: 'المشتريات الإدارية' },
                    { icon: 'fa-handshake', link: '../hr/hr_partners.html', text: 'الشركاء والموردين' }
                ]
            },
            {
                section: 'govt', label: 'العلاقات الحكومية',
                items: [
                    { icon: 'fa-passport', link: '../hr/hr_govt.html', text: 'الوثائق الحكومية' },
                    { icon: 'fa-user-plus', link: '../hr/hr_recruitment.html', text: 'التوظيف والاستقدام' }
                ]
            }
        ],

        // --- ب. قائمة الإدارة المالية (بكامل التفاصيل) ---
        finance: [
            {
                section: 'main', label: 'الرئيسية',
                items: [
                    { icon: 'fa-chart-line', link: '../finance/cfo_dashboard.html', text: 'المركز المالي' },
                    { icon: 'fa-check-double', link: '../finance/approvals.html', text: 'الاعتمادات المالية' },
                    { icon: 'fa-comments', link: '../finance/internal_chat.html', text: 'المحادثات' }
                ]
            },
            {
                section: 'accounting', label: 'المحاسبة العامة (GL)',
                items: [
                    { icon: 'fa-book', link: '../finance/gl_journal.html', text: 'قيود اليومية' },
                    { icon: 'fa-list-ol', link: '../finance/gl_coa.html', text: 'دليل الحسابات' },
                    { icon: 'fa-tags', link: '../finance/gl_cost_centers.html', text: 'مراكز التكلفة' }
                ]
            },
            {
                section: 'ap', label: 'المدفوعات والموردين (AP)',
                items: [
                    { icon: 'fa-file-invoice-dollar', link: '../finance/ap_bills.html', text: 'فواتير الموردين' },
                    { icon: 'fa-money-bill-transfer', link: '../finance/ap_payments.html', text: 'أوامر الدفع' },
                    { icon: 'fa-users-gear', link: '../finance/ap_vendors.html', text: 'إدارة الموردين' }
                ]
            },
            {
                section: 'ar', label: 'المقبوضات والعملاء (AR)',
                items: [
                    { icon: 'fa-hand-holding-dollar', link: '../finance/ar_invoices.html', text: 'فواتير المبيعات' },
                    { icon: 'fa-receipt', link: '../finance/ar_receipts.html', text: 'سندات القبض' }
                ]
            },
            {
                section: 'reporting', label: 'التقارير والمخزون',
                items: [
                    { icon: 'fa-file-contract', link: '../finance/rep_statements.html', text: 'القوائم المالية' },
                    { icon: 'fa-scale-balanced', link: '../finance/rep_budget.html', text: 'الموازنة التقديرية' },
                    { icon: 'fa-percent', link: '../finance/rep_tax.html', text: 'الإقرارات الضريبية' },
                    { icon: 'fa-boxes-stacked', link: '../finance/inv_assets.html', text: 'الأصول الثابتة' }
                ]
            }
        ],

        // --- ج. قائمة المدير التقني (بكامل التفاصيل) ---
        tech: [
            {
                section: 'main', label: 'العمليات',
                items: [
                    { icon: 'fa-server', link: '../cto/cto_dashboard.html', text: 'حالة النظام' },
                    { icon: 'fa-headset', link: '../cto/cto_support.html', text: 'الدعم الفني' },
                    { icon: 'fa-code-branch', link: '../cto/cto_projects.html', text: 'المشاريع البرمجية' }
                ]
            },
            {
                section: 'infra', label: 'البنية التحتية',
                items: [
                    { icon: 'fa-hard-drive', link: '../cto/cto_servers.html', text: 'الخوادم (Servers)' },
                    { icon: 'fa-heart-pulse', link: '../cto/cto_monitoring.html', text: 'المراقبة الحية' },
                    { icon: 'fa-laptop-code', link: '../cto/cto_assets.html', text: 'الأصول التقنية' }
                ]
            },
            {
                section: 'comms', label: 'الاتصالات (VoIP)',
                items: [
                    { icon: 'fa-phone-volume', link: '../cto/cto_pbx.html', text: 'السنترال (PBX)' },
                    { icon: 'fa-users-rectangle', link: '../cto/cto_extensions.html', text: 'التحويلات' },
                    { icon: 'fa-list-ol', link: '../cto/cto_call_logs.html', text: 'سجل المكالمات' }
                ]
            },
            {
                section: 'sec', label: 'الأمن والحماية',
                items: [
                    { icon: 'fa-shield-halved', link: '../cto/cto_soc.html', text: 'مركز الأمن (SOC)' },
                    { icon: 'fa-key', link: '../cto/cto_iam.html', text: 'إدارة الهويات (IAM)' }
                ]
            }
        ],

        // --- د. قائمة الرئيس التنفيذي (CEO) ---
        ceo: [
            {
                section: 'main', label: 'الإدارة العليا',
                items: [
                    { icon: 'fa-chart-pie', link: '../ceo/ceo_dashboard.html', text: 'نظرة شاملة' },
                    { icon: 'fa-chess-queen', link: '../ceo/ceo_strategy.html', text: 'الاستراتيجية' },
                    { icon: 'fa-file-contract', link: '../ceo/ceo_reports.html', text: 'التقارير الموحدة' }
                ]
            },
            {
                section: 'gov', label: 'الحوكمة والمجلس',
                items: [
                    { icon: 'fa-gavel', link: '../ceo/ceo_governance.html', text: 'الحوكمة والالتزام' },
                    { icon: 'fa-triangle-exclamation', link: '../ceo/ceo_risks.html', text: 'إدارة المخاطر' },
                    { icon: 'fa-users-rectangle', link: '../ceo/ceo_board.html', text: 'شؤون المجلس' }
                ]
            },
            {
                section: 'comms', label: 'التواصل',
                items: [
                    { icon: 'fa-bullhorn', link: '../ceo/ceo_broadcast.html', text: 'التعاميم' },
                    { icon: 'fa-comments', link: '../ceo/ceo_communication.html', text: 'التواصل المباشر' },
                    { icon: 'fa-star', link: '../ceo/ceo_feedback.html', text: 'الشكاوى والمقترحات' }
                ]
            }
        ],

        // --- هـ. قائمة مدير النظام (Admin) ---
        admin: [
            {
                section: 'main', label: 'إدارة النظام',
                items: [
                    { icon: 'fa-gauge-high', link: '../admin/admin.html', text: 'لوحة التحكم' },
                    { icon: 'fa-users-gear', link: '../admin/users.html', text: 'إدارة المستخدمين' },
                    { icon: 'fa-sliders', link: '../admin/admin_settings.html', text: 'الإعدادات العامة' }
                ]
            },
            {
                section: 'gov', label: 'الحوكمة',
                items: [
                    { icon: 'fa-chart-pie', link: '../admin/shareholders.html', text: 'سجل المساهمين' },
                    { icon: 'fa-book-open', link: '../admin/policies.html', text: 'السياسات واللوائح' },
                    { icon: 'fa-gavel', link: '../admin/board.html', text: 'مجلس الإدارة' },
                    { icon: 'fa-magnifying-glass', link: '../admin/audit.html', text: 'لجنة المراجعة' },
                    { icon: 'fa-users', link: '../admin/committees.html', text: 'اللجان المنبثقة' }
                ]
            },
            {
                section: 'ops', label: 'العمليات المساندة',
                items: [
                    { icon: 'fa-cart-shopping', link: '../admin/procurement.html', text: 'المشتريات' },
                    { icon: 'fa-scale-balanced', link: '../admin/compliance.html', text: 'الالتزام' },
                    { icon: 'fa-bullhorn', link: '../admin/admin_circulars.html', text: 'التعاميم' }
                ]
            }
        ],

        // --- و. القائمة الافتراضية للموظفين (Common) ---
        staff: [
            {
                section: 'main', label: 'بوابة الموظف',
                items: [
                    { icon: 'fa-chart-pie', link: '../employee/dashboard.html', text: 'لوحة القيادة' },
                    { icon: 'fa-file-signature', link: '../employee/my_requests.html', text: 'طلباتي' }
                ]
            }
        ]
    };

    // --- 3. دالة التشغيل ---
    function init() {
        if(config.theme === 'dark') document.documentElement.classList.add('dark');
        renderSidebar();
        renderHeader();
        highlightActiveLink();
    }

    // --- 4. بناء القائمة الجانبية (Logic) ---
    function renderSidebar() {
        const isRtl = config.lang === 'ar';
        const role = (currentUser.role || '').toLowerCase();
        const access = currentUser.accessLevels || [];
        const title = (currentUser.title || '').toLowerCase();

        // اختيار القائمة المناسبة بناءً على الصلاحية
        let selectedMenuStructure = ALL_MENUS.staff; // الافتراضي

        // الفحص بالترتيب
        if (role.includes('admin') || role.includes('grc') || access.includes('admin')) {
            selectedMenuStructure = ALL_MENUS.admin;
        } 
        else if (role.includes('ceo') || access.includes('ceo')) {
            selectedMenuStructure = ALL_MENUS.ceo;
        } 
        else if (role.includes('cfo') || role.includes('finance') || access.includes('finance')) {
            selectedMenuStructure = ALL_MENUS.finance;
        } 
        else if (role.includes('cao') || role.includes('hr') || access.includes('hr')) {
            selectedMenuStructure = ALL_MENUS.hr;
        } 
        else if (role.includes('cto') || role.includes('tech') || access.includes('cto')) {
            selectedMenuStructure = ALL_MENUS.tech;
        }

        // تحويل الهيكل إلى HTML
        let linksHTML = '';
        selectedMenuStructure.forEach(section => {
            // عنوان القسم
            if (section.label) {
                linksHTML += `<p class="px-6 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-4 first:border-0">${section.label}</p>`;
            }
            // العناصر
            section.items.forEach(item => {
                linksHTML += `
                <a href="${item.link}" class="flex items-center gap-3 px-4 py-3 mx-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all mb-1 group" id="link-${item.link.split('/').pop().replace('.html','')}">
                    <div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-brandRed transition-colors shrink-0">
                        <i class="fa-solid ${item.icon} text-sm"></i> 
                    </div>
                    <span class="font-bold text-xs truncate">${item.text}</span>
                </a>`;
            });
        });

        // رسم السايدبار
        const sidebar = `
        <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-screen w-72 bg-[#0F172A] text-white flex flex-col z-50 shadow-2xl hidden md:flex border-${isRtl ? 'l' : 'r'} border-slate-800">
            <div class="h-20 flex items-center px-6 border-b border-slate-800/50">
                <h1 class="text-xl font-extrabold tracking-tight">Andro<span class="text-brandRed">Gov</span></h1>
            </div>
            
            <div class="p-6">
                <div class="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/50 flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=${currentUser.avatarColor ? currentUser.avatarColor.replace('#','') : 'random'}&color=fff" class="w-10 h-10 rounded-full border border-slate-600">
                    <div class="overflow-hidden">
                        <p class="font-bold text-xs text-white truncate w-32">${currentUser.name}</p>
                        <p class="text-[10px] text-slate-400 mt-0.5 truncate w-32">${currentUser.title}</p>
                    </div>
                </div>
            </div>

            <nav class="flex-1 overflow-y-auto custom-scroll pb-10">
                ${linksHTML}
            </nav>

            <div class="p-4 border-t border-slate-800/50 bg-[#0F172A]">
                <button onclick="logout()" class="w-full py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all">
                    <i class="fa-solid fa-power-off"></i> تسجيل خروج
                </button>
            </div>
        </aside>`;

        document.getElementById('sidebar-container').innerHTML = sidebar;
    }

    // --- 5. بناء الهيدر مع زر التبديل (Switcher) ---
    function renderHeader() {
        const levels = currentUser.accessLevels || [];
        
        // زر التبديل يظهر فقط إذا كان لديه أكثر من صلاحية
        let switcherHtml = '';
        if (levels.length > 1) {
            let options = `<option value="#" selected disabled>تبديل البوابة</option>`;
            if (levels.includes('admin')) options += `<option value="../admin/admin.html">🔐 إدارة النظام</option>`;
            if (levels.includes('board')) options += `<option value="../admin/board.html">⚖️ بوابة المجلس</option>`;
            if (levels.includes('ceo')) options += `<option value="../ceo/ceo_dashboard.html">👑 الرئيس التنفيذي</option>`;
            if (levels.includes('finance')) options += `<option value="../finance/cfo_dashboard.html">💰 الإدارة المالية</option>`;
            if (levels.includes('hr')) options += `<option value="../hr/hr_dashboard.html">👥 الموارد البشرية</option>`;
            if (levels.includes('audit')) options += `<option value="../admin/audit.html">🔍 لجنة المراجعة</option>`;
            if (levels.includes('shareholder')) options += `<option value="../shareholder/dashboard.html">📈 بوابة المساهم</option>`;

            switcherHtml = `
            <div class="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 mx-4 shadow-sm">
                <i class="fa-solid fa-repeat text-brandRed text-xs"></i>
                <select onchange="if(this.value) window.location.href=this.value" class="bg-transparent text-xs font-bold outline-none cursor-pointer text-slate-600 dark:text-slate-300 w-32">
                    ${options}
                </select>
            </div>`;
        }

        document.getElementById('header-container').innerHTML = `
        <header class="h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 transition-all">
            <div class="flex items-center">
                <button onclick="document.querySelector('aside').classList.toggle('hidden');" class="md:hidden text-slate-500 mr-4"><i class="fa-solid fa-bars text-xl"></i></button>
                <h2 class="font-bold text-slate-800 dark:text-white text-lg">
                    ${document.title.split('|')[0]}
                </h2>
                ${switcherHtml}
            </div>
            
            <div class="flex items-center gap-3">
                <button onclick="toggleTheme()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition text-yellow-500">
                    <i class="fa-solid ${config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                </button>
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-brandRed transition relative">
                    <i class="fa-regular fa-bell"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
            </div>
        </header>`;
    }

    // --- 6. دوال مساعدة ---
    function highlightActiveLink() {
        try {
            const page = window.location.pathname.split('/').pop().replace('.html','');
            const el = document.getElementById('link-' + page);
            if (el) {
                el.classList.add('bg-brandRed', 'text-white', 'shadow-lg', 'shadow-brandRed/20');
                el.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-white/5');
                el.querySelector('div').classList.replace('bg-slate-800', 'bg-white/20');
            }
        } catch (e) {}
    }

    window.logout = () => { localStorage.removeItem('currentUser'); window.location.href = '../login.html'; };
    window.toggleTheme = () => {
        const newTheme = config.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        location.reload();
    };

    init();
})();
