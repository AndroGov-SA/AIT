/**
 * Unified Executive Layout v5.0 (Full Features)
 * يجمع كافة قوائم المدراء (CEO, CFO, HR, CTO) في ملف واحد ذكي.
 */
(function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) window.location.href = 'https://androgov-sa.github.io/AIT/login.html';

    const config = { theme: localStorage.getItem('theme') || 'light' };

    function init() {
        if(config.theme === 'dark') document.documentElement.classList.add('dark');
        renderSidebar();
        renderHeader();
        highlightCurrentPage();
    }

    function renderSidebar() {
        const isRtl = document.documentElement.dir === 'rtl';
        const role = (currentUser.role || '').toLowerCase();
        const title = (currentUser.title || '').toLowerCase();
        const type = currentUser.type || '';

        // 1. تجميع كافة القوائم التي صممناها سابقاً
        const menus = {
            dashboard: { link: "dashboard.html", icon: "fa-chart-pie", text: "لوحة القيادة" },
            
            // قائمة المدير المالي (CFO)
            finance: [
                { header: "الإدارة المالية" },
                { link: "../finance/gl_dashboard.html", icon: "fa-book", text: "الأستاذ العام (GL)" },
                { link: "../finance/ap_dashboard.html", icon: "fa-file-invoice-dollar", text: "الذمم الدائنة (AP)" },
                { link: "../finance/ar_dashboard.html", icon: "fa-hand-holding-dollar", text: "الذمم المدينة (AR)" },
                { link: "../finance/budgeting.html", icon: "fa-scale-balanced", text: "الموازنة والتخطيط" },
                { link: "../finance/payroll_review.html", icon: "fa-money-check", text: "مراجعة الرواتب" },
                { link: "../finance/reports.html", icon: "fa-file-contract", text: "القوائم المالية" }
            ],

            // قائمة الموارد البشرية (HR/CAO)
            hr: [
                { header: "الموارد البشرية" },
                { link: "../hr/employees.html", icon: "fa-users", text: "سجل الموظفين" },
                { link: "../hr/attendance.html", icon: "fa-fingerprint", text: "الحضور والانصراف" },
                { link: "../hr/leaves.html", icon: "fa-plane-departure", text: "إدارة الإجازات" },
                { link: "../hr/payroll_process.html", icon: "fa-coins", text: "مسيرات الرواتب" },
                { link: "../hr/recruitment.html", icon: "fa-user-plus", text: "التوظيف والتعيين" },
                { link: "../hr/performance.html", icon: "fa-star", text: "تقييم الأداء" }
            ],

            // قائمة المدير التقني (CTO)
            tech: [
                { header: "إدارة التقنية" },
                { link: "../cto/servers.html", icon: "fa-server", text: "الخوادم والبنية" },
                { link: "../cto/projects.html", icon: "fa-code-branch", text: "المشاريع البرمجية" },
                { link: "../cto/tickets.html", icon: "fa-ticket", text: "تذاكر الدعم" },
                { link: "../cto/security.html", icon: "fa-shield-halved", text: "الأمن السيبراني" },
                { link: "../cto/assets.html", icon: "fa-laptop-code", text: "الأصول التقنية" }
            ],

            // قائمة الرئيس التنفيذي (CEO)
            ceo: [
                { header: "الإدارة العليا" },
                { link: "../ceo/strategy.html", icon: "fa-chess-queen", text: "الاستراتيجية والأهداف" },
                { link: "../ceo/reports_consolidated.html", icon: "fa-chart-area", text: "التقارير الموحدة" },
                { link: "../ceo/risks.html", icon: "fa-triangle-exclamation", text: "إدارة المخاطر" },
                { link: "../ceo/decisions.html", icon: "fa-gavel", text: "القرارات والتعاميم" }
            ]
        };

        // 2. بناء القائمة المخصصة بناءً على الصلاحيات المتعددة
        let myMenu = [menus.dashboard]; // الجميع لديه داشبورد

        // كشف الصلاحيات وإضافة القوائم
        if (role.includes('ceo') || role.includes('exec')) myMenu = [...myMenu, ...menus.ceo];
        if (role.includes('cfo') || role.includes('finance') || title.includes('financial')) myMenu = [...myMenu, ...menus.finance];
        if (role.includes('hr') || role.includes('cao') || title.includes('human')) myMenu = [...myMenu, ...menus.hr];
        if (role.includes('cto') || role.includes('tech') || title.includes('technical')) myMenu = [...myMenu, ...menus.tech];

        // 3. تحويل القائمة لـ HTML
        let linksHTML = myMenu.map(m => {
            if(m.header) return `<p class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">${m.header}</p>`;
            return `
            <a href="${m.link}" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all mb-1 group" id="link-${m.link.split('/').pop().replace('.html','')}">
                <i class="fa-solid ${m.icon} w-6 text-center group-hover:text-brandRed transition-colors"></i> 
                <span class="font-bold text-sm">${m.text}</span>
            </a>`;
        }).join('');

        // 4. رسم القائمة الجانبية
        document.getElementById('sidebar-container').innerHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-screen w-72 bg-slate-900 text-white flex flex-col z-50 transition-all duration-300 hidden md:flex shadow-2xl">
            <div class="h-24 flex items-center px-8 border-b border-slate-800 bg-slate-900/50">
                <h1 class="text-xl font-extrabold tracking-tight">Andro<span class="text-brandRed">Gov</span> <span class="text-[10px] bg-brandRed text-white px-2 py-0.5 rounded-full align-middle">PRO</span></h1>
            </div>
            
            <div class="p-6">
                <div class="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-2xl p-4 border border-slate-700/50 flex items-center gap-4 shadow-lg">
                    <div class="relative">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=${currentUser.avatarColor ? currentUser.avatarColor.replace('#','') : 'random'}&color=fff" class="w-12 h-12 rounded-full border-2 border-slate-600">
                        <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></span>
                    </div>
                    <div class="overflow-hidden">
                        <p class="font-bold text-sm truncate w-32 text-white">${currentUser.name}</p>
                        <p class="text-[10px] text-slate-400 mt-0.5 truncate w-32 font-mono">${currentUser.title}</p>
                    </div>
                </div>
            </div>

            <nav class="flex-1 px-4 overflow-y-auto space-y-1 custom-scroll pb-10">
                ${linksHTML}
            </nav>

            <div class="p-4 border-t border-slate-800 bg-slate-900">
                <button onclick="logout()" class="w-full py-3 bg-slate-800 hover:bg-red-500/10 hover:text-red-500 text-slate-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all group">
                    <i class="fa-solid fa-power-off group-hover:rotate-90 transition-transform"></i> تسجيل خروج
                </button>
            </div>
        </aside>`;
    }

    function renderHeader() {
        // نفس الهيدر مع زر التبديل
        const user = JSON.parse(localStorage.getItem('currentUser'));
        let switcher = '';
        if(user.accessLevels && user.accessLevels.length > 1) {
            switcher = `<button class="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition mx-4" onclick="toggleSwitcher()"><i class="fa-solid fa-repeat text-brandRed"></i> تبديل البوابة</button>`;
        }

        document.getElementById('header-container').innerHTML = `
        <header class="h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
            <div class="flex items-center">
                <button onclick="document.querySelector('aside').classList.toggle('hidden');" class="md:hidden text-slate-500 mr-4"><i class="fa-solid fa-bars text-xl"></i></button>
                <h2 class="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2">
                    <i class="fa-solid fa-layer-group text-brandRed"></i> لوحة القيادة التنفيذية
                </h2>
                ${switcher}
            </div>
            <div class="flex items-center gap-4">
                 <button class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-brandRed transition relative">
                    <i class="fa-regular fa-bell"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                 </button>
            </div>
        </header>`;
    }

    function highlightCurrentPage() {
        const page = window.location.pathname.split('/').pop().replace('.html','');
        const el = document.getElementById('link-'+page);
        if(el) {
            el.classList.add('bg-brandRed', 'text-white', 'shadow-lg', 'shadow-brandRed/30');
            el.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-white/10');
            el.querySelector('i').classList.remove('group-hover:text-brandRed');
        }
    }

    window.logout = () => { localStorage.removeItem('currentUser'); window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };
    init();
})();
