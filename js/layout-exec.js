/**
 * Unified Executive Layout Manager
 * تخطيط موحد لجميع المدراء التنفيذيين (CEO, CFO, HR, CTO)
 * يظهر القوائم بناءً على الصلاحية فقط.
 */
(function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // حماية: إذا لم يكن المستخدم تنفيذياً، طرده للخارج
    if (!currentUser || !currentUser.accessLevels.includes('exec')) {
        window.location.href = 'https://androgov-sa.github.io/AIT/login.html';
        return;
    }

    const config = { theme: localStorage.getItem('theme') || 'light' };

    function init() {
        if(config.theme === 'dark') document.documentElement.classList.add('dark');
        renderSidebar();
        renderHeader();
        highlightCurrentPage();
    }

    function renderSidebar() {
        const isRtl = document.documentElement.dir === 'rtl';
        const role = currentUser.role.toLowerCase(); // Role الأصلي (cfo, hr manager...)
        const title = currentUser.title.toLowerCase();

        // 1. تعريف كل القوائم الممكنة في النظام
        const allMenus = {
            // القائمة المشتركة للجميع (الرئيسية)
            common: [
                { link: "dashboard.html", icon: "fa-chart-pie", text: "لوحة القيادة" },
                { link: "my_requests.html", icon: "fa-file-signature", text: "طلباتي" }
            ],
            
            // قائمة الرئيس التنفيذي (CEO)
            ceo: [
                { link: "ceo_strategy.html", icon: "fa-chess", text: "الاستراتيجية" },
                { link: "ceo_reports.html", icon: "fa-file-contract", text: "التقارير" },
                { link: "ceo_finance.html", icon: "fa-coins", text: "المالية" },
                { link: "ceo_governance.html", icon: "fa-scale-balanced", text: "الحوكمة" }
            ],

            // قائمة المدير المالي (CFO)
            finance: [
                { link: "finance_budget.html", icon: "fa-wallet", text: "الموازنة" },
                { link: "finance_reports.html", icon: "fa-chart-line", text: "القوائم المالية" },
                { link: "finance_payroll.html", icon: "fa-money-check-dollar", text: "الرواتب" },
                { link: "finance_expenses.html", icon: "fa-receipt", text: "المصروفات" }
            ],

            // قائمة الموارد البشرية (HR/CAO)
            hr: [
                { link: "hr_employees.html", icon: "fa-users", text: "الموظفين" },
                { link: "hr_payroll.html", icon: "fa-money-bill", text: "مسيرات الرواتب" },
                { link: "hr_vacations.html", icon: "fa-plane", text: "الإجازات" },
                { link: "hr_recruitment.html", icon: "fa-user-plus", text: "التوظيف" }
            ],

            // قائمة المدير التقني (CTO)
            tech: [
                { link: "cto_projects.html", icon: "fa-code", text: "المشاريع التقنية" },
                { link: "cto_servers.html", icon: "fa-server", text: "الخوادم والبنية" },
                { link: "cto_security.html", icon: "fa-shield-halved", text: "الأمن السيبراني" },
                { link: "cto_support.html", icon: "fa-headset", text: "الدعم الفني" }
            ]
        };

        // 2. بناء القائمة المخصصة للمستخدم الحالي
        let userMenu = [...allMenus.common]; // الجميع يبدأ بالقائمة المشتركة

        // إضافة صلاحيات CEO
        if (role.includes('ceo')) {
            userMenu = [...userMenu, ...allMenus.ceo];
        }

        // إضافة صلاحيات المالية (CFO أو مدير مالي)
        if (role.includes('cfo') || role.includes('finance') || title.includes('financial')) {
            userMenu = [...userMenu, ...allMenus.finance];
        }

        // إضافة صلاحيات الموارد البشرية (CAO أو HR Manager)
        if (role.includes('cao') || role.includes('hr') || title.includes('human')) {
            userMenu = [...userMenu, ...allMenus.hr];
        }

        // إضافة صلاحيات التقنية (CTO أو Tech Lead)
        if (role.includes('cto') || role.includes('tech') || title.includes('technical')) {
            userMenu = [...userMenu, ...allMenus.tech];
        }

        // 3. تحويل القائمة إلى HTML
        let linksHTML = userMenu.map(m => `
            <a href="${m.link}" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all mb-1 group" id="link-${m.link.replace('.html','')}">
                <i class="fa-solid ${m.icon} w-6 text-center group-hover:text-brandRed transition-colors"></i> 
                <span class="font-bold text-sm">${m.text}</span>
            </a>
        `).join('');

        // 4. رسم الـ Sidebar
        document.getElementById('sidebar-container').innerHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-screen w-72 bg-slate-900 text-white flex flex-col z-50 transition-all duration-300 hidden md:flex">
            <div class="h-20 flex items-center px-8 border-b border-slate-800">
                <h1 class="text-xl font-extrabold tracking-tight">Andro<span class="text-brandRed">Gov</span></h1>
                <span class="mx-2 text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 uppercase tracking-widest">EXEC</span>
            </div>
            
            <div class="p-6">
                <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=${currentUser.avatarColor ? currentUser.avatarColor.replace('#','') : 'random'}&color=fff" class="w-10 h-10 rounded-full">
                    <div class="overflow-hidden">
                        <p class="font-bold text-sm truncate w-32">${currentUser.name}</p>
                        <p class="text-[10px] text-brandRed mt-0.5 truncate w-32">${currentUser.title}</p>
                    </div>
                </div>
            </div>

            <nav class="flex-1 px-4 overflow-y-auto space-y-1 custom-scroll">
                ${linksHTML}
            </nav>

            <div class="p-4 border-t border-slate-800">
                <button onclick="logout()" class="w-full py-3 text-red-400 hover:bg-white/5 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                    <i class="fa-solid fa-power-off"></i> تسجيل خروج
                </button>
            </div>
        </aside>`;
    }

    function highlightCurrentPage() {
        // تمييز الرابط النشط تلقائياً
        const currentPage = window.location.pathname.split('/').pop();
        const activeLink = document.getElementById(`link-${currentPage.replace('.html','')}`);
        if(activeLink) {
            activeLink.classList.add('bg-brandRed', 'text-white');
            activeLink.classList.remove('text-slate-400', 'hover:text-white');
            activeLink.querySelector('i').classList.remove('group-hover:text-brandRed'); // إزالة تأثير الهوفر للأيقونة
        }
    }

    function renderHeader() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // زر التبديل (يظهر فقط لمن لديه أدوار متعددة)
        let switcherHtml = '';
        if (currentUser.accessLevels && currentUser.accessLevels.length > 1) {
            switcherHtml = `
                <div class="relative group mx-4">
                    <button class="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition text-slate-600 dark:text-slate-200">
                        <i class="fa-solid fa-repeat text-brandRed"></i> تبديل البوابة
                    </button>
                    <div class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 hidden group-hover:block z-50">
                        ${currentUser.accessLevels.includes('board') ? '<a href="../admin/board.html" class="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold">بوابة المجلس</a>' : ''}
                        ${currentUser.accessLevels.includes('admin') ? '<a href="../admin/admin.html" class="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold">لوحة الأدمن</a>' : ''}
                        ${currentUser.accessLevels.includes('shareholder') ? '<a href="../shareholder/dashboard.html" class="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold">بوابة المساهم</a>' : ''}
                    </div>
                </div>
            `;
        }

        document.getElementById('header-container').innerHTML = `
        <header class="h-20 bg-white/80 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
            <div class="flex items-center">
                <button onclick="document.querySelector('aside').classList.toggle('hidden');" class="md:hidden text-slate-500 mr-4"><i class="fa-solid fa-bars text-xl"></i></button>
                <h2 class="font-bold text-slate-800 dark:text-white text-lg">بوابة الإدارة التنفيذية</h2>
                ${switcherHtml}
            </div>
            
            <div class="flex items-center gap-4">
                 <button class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-brandRed transition relative">
                    <i class="fa-regular fa-bell"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                 </button>
            </div>
        </header>`;
    }

    window.logout = () => { localStorage.removeItem('currentUser'); window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };
    init();
})();
