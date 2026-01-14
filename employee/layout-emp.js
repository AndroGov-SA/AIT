/**
 * Employee Portal Layout (Simplified)
 * - Shows only relevant links for staff (Leaves, Salary, Requests)
 */

(function() {
    // جلب بيانات المستخدم
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        name: "Mazaher Al-Saleh",
        title: "Software Engineer"
    };

    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    const t = {
        ar: {
            sysName: "AndroGov",
            dashboard: "لوحة القيادة",
            requests: "طلباتي",
            attendance: "الحضور والانصراف",
            payroll: "الرواتب والمستحقات",
            policies: "السياسات والتعاميم",
            support: "الدعم الفني",
            logout: "تسجيل خروج",
            welcome: "مرحباً بك",
            role: "بوابة الموظف"
        },
        en: {
            sysName: "AndroGov",
            dashboard: "Dashboard",
            requests: "My Requests",
            attendance: "Attendance",
            payroll: "Payroll & Slips",
            policies: "Policies",
            support: "IT Support",
            logout: "Logout",
            welcome: "Welcome",
            role: "Employee Portal"
        }
    };

    function init() {
        renderSidebar();
        renderHeader();
        applyTheme();
    }

    function renderSidebar() {
        const dict = t[config.lang];
        const isRtl = config.lang === 'ar';
        const currentPath = window.location.pathname.split('/').pop();

        const menuItems = [
            { link: "dashboard.html", icon: "fa-gauge-high", text: dict.dashboard },
            { link: "my_requests.html", icon: "fa-file-signature", text: dict.requests },
            { link: "attendance.html", icon: "fa-fingerprint", text: dict.attendance },
            { link: "payroll.html", icon: "fa-money-check-dollar", text: dict.payroll },
            { link: "policies.html", icon: "fa-book-open", text: dict.policies },
            { link: "support.html", icon: "fa-headset", text: dict.support }
        ];

        let linksHtml = menuItems.map(item => {
            const active = currentPath === item.link ? 'bg-brandRed text-white shadow-lg shadow-brandRed/30' : 'text-slate-500 hover:bg-slate-50 hover:text-brandRed';
            return `
            <a href="${item.link}" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${active}">
                <i class="fa-solid ${item.icon} w-6 text-center"></i>
                <span class="font-bold text-sm">${item.text}</span>
            </a>`;
        }).join('');

        document.getElementById('sidebar-container').innerHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-screen w-72 bg-white border-${isRtl ? 'l' : 'r'} border-slate-100 flex flex-col z-50 hidden lg:flex">
            <div class="h-20 flex items-center px-8 border-b border-slate-50">
                <h1 class="text-2xl font-extrabold text-slate-800 tracking-tight">Andro<span class="text-brandRed">Gov</span></h1>
            </div>
            
            <div class="p-6">
                <div class="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=random" class="w-10 h-10 rounded-full">
                    <div>
                        <p class="text-xs font-bold text-slate-700 line-clamp-1">${currentUser.name}</p>
                        <p class="text-[10px] text-slate-400">${dict.role}</p>
                    </div>
                </div>
            </div>

            <nav class="flex-1 px-4 overflow-y-auto">
                ${linksHtml}
            </nav>

            <div class="p-4 border-t border-slate-50">
                <button onclick="logout()" class="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition">
                    <i class="fa-solid fa-power-off"></i> ${dict.logout}
                </button>
            </div>
        </aside>`;
    }

    function renderHeader() {
        const dict = t[config.lang];
        document.getElementById('header-container').innerHTML = `
        <header class="h-20 bg-white/80 backdrop-blur border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
            <h2 class="text-lg font-extrabold text-slate-800">${dict.welcome}, ${currentUser.name.split(' ')[0]} 👋</h2>
            <div class="flex gap-3">
                <button class="w-10 h-10 rounded-full bg-slate-50 text-slate-500 hover:text-brandRed transition flex items-center justify-center relative">
                    <i class="fa-regular fa-bell"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
            </div>
        </header>`;
    }

    function applyTheme() {
        if(config.theme === 'dark') document.documentElement.classList.add('dark');
    }

    window.logout = function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'https://androgov-sa.github.io/AIT/login.html';
    };

    init();
})();
