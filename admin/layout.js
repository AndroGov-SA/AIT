/**
 * AndroGov Layout Engine v2.5
 * - Fixes: User Name translation logic
 * - Fixes: Sidebar Colors
 */

// 1. استرجاع الإعدادات
// نستخدم البيانات المخزنة التي تحتوي الآن على nameAr و nameEn
const storedUser = JSON.parse(localStorage.getItem('currentUser'));

// بيانات افتراضية في حال لم يتم تسجيل الدخول (للمعاينة فقط)
const defaultUser = {
    nameAr: "أيمن المغربي",
    nameEn: "Ayman Almaghrabi",
    titleAr: "مدير الحوكمة",
    titleEn: "Governance Manager",
    avatar: "https://ui-avatars.com/api/?name=Ayman+Almaghrabi&background=FB4747&color=fff"
};

// دمج المستخدم الحالي مع الافتراضي لتجنب الأخطاء
const currentUser = storedUser || defaultUser;

const config = {
    lang: localStorage.getItem('lang') || 'ar',
    theme: localStorage.getItem('theme') || 'light'
};

// 2. قاموس النصوص للقوائم
const layoutDict = {
    ar: {
        sysName: "AndroGov",
        logout: "خروج",
        menu: {
            dash: "نظرة عامة",
            audit: "سجل التدقيق",
            users: "المستخدمين",
            gov: "الحوكمة",
            ops: "التشغيل",
            policies: "السياسات",
            cyber: "الأمن السيبراني",
            it: "البنية التحتية"
        }
    },
    en: {
        sysName: "AndroGov",
        logout: "Logout",
        menu: {
            dash: "Dashboard",
            audit: "Audit Log",
            users: "Users",
            gov: "Governance",
            ops: "Operations",
            policies: "Policies",
            cyber: "Cybersecurity",
            it: "Infrastructure"
        }
    }
};

// 3. التشغيل
document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
    renderSidebar();
    renderHeader();
});

function applyConfig() {
    const html = document.documentElement;
    html.lang = config.lang;
    html.dir = config.lang === 'ar' ? 'rtl' : 'ltr';
    
    if (config.theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    const main = document.querySelector('.main-content');
    if (main) {
        if (config.lang === 'ar') {
            main.classList.remove('md:ml-72');
            main.classList.add('md:mr-72');
        } else {
            main.classList.remove('md:mr-72');
            main.classList.add('md:ml-72');
        }
    }
}

function renderSidebar() {
    const el = document.getElementById('sidebar-container');
    if (!el) return;

    const t = layoutDict[config.lang];
    const isRtl = config.lang === 'ar';
    const path = window.location.pathname;
    
    // منطق اختيار الاسم والمنصب حسب اللغة
    const displayName = isRtl ? (currentUser.nameAr || currentUser.name) : (currentUser.nameEn || currentUser.name);
    const displayTitle = isRtl ? (currentUser.titleAr || currentUser.title) : (currentUser.titleEn || currentUser.title);

    const isActive = (p) => path.includes(p) ? 'bg-brandRed text-white shadow-lg shadow-red-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';

    el.innerHTML = `
    <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} z-50 h-screen w-72 flex-col hidden md:flex transition-colors duration-300 bg-white dark:bg-[#0F172A] border-${isRtl ? 'l' : 'r'} border-slate-200 dark:border-slate-800 shadow-xl">
        
        <!-- Logo -->
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-50 p-1 flex items-center justify-center border border-slate-100 dark:border-transparent">
                    <img src="https://ait.sa/wp-content/uploads/2024/03/cropped-Square-Logo.png" class="w-full h-full object-contain">
                </div>
                <div>
                    <h1 class="font-bold text-lg text-slate-800 dark:text-white font-sans">${t.sysName}</h1>
                    <p class="text-[10px] text-slate-500 uppercase tracking-widest">Portal v2.5</p>
                </div>
            </div>
        </div>

        <!-- User Profile (Dynamic Name) -->
        <div class="p-4">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600">
                <div class="overflow-hidden">
                    <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${displayName}</p>
                    <p class="text-[10px] text-brandRed font-medium truncate">${displayTitle}</p>
                </div>
            </div>
        </div>

        <!-- Nav Links -->
        <nav class="flex-1 overflow-y-auto px-3 space-y-1 py-2">
            ${navItem(t.menu.dash, 'fa-gauge-high', 'admin.html', isActive('admin.html'))}
            ${navItem(t.menu.audit, 'fa-list-ul', 'audit.html', isActive('audit.html'))}
            ${navItem(t.menu.users, 'fa-users', 'users.html', isActive('users.html'))}
            
            <div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.menu.gov}</div>
            ${navItem(t.menu.gov, 'fa-gavel', 'governance.html', isActive('governance.html'))}
            ${navItem(t.menu.policies, 'fa-book-open', 'policies.html', isActive('policies.html'))}
            
            <div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.menu.tech}</div>
            ${navItem(t.menu.cyber, 'fa-shield-cat', 'cybersecurity.html', isActive('cyber.html'))}
        </nav>

        <div class="p-4 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
            &copy; 2026 Andromeda IT
        </div>
    </aside>`;
}

function navItem(label, icon, url, classes) {
    return `<a href="${url}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${classes}">
        <i class="fa-solid ${icon} w-5 text-center"></i>
        <span>${label}</span>
    </a>`;
}

function renderHeader() {
    const el = document.getElementById('header-container');
    if (!el) return;
    const t = layoutDict[config.lang];

    el.innerHTML = `
    <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 transition-colors duration-300 backdrop-blur-md bg-white/90 dark:bg-[#0B1120]/90 border-b border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-4">
            <button class="md:hidden text-slate-500 dark:text-slate-200"><i class="fa-solid fa-bars text-xl"></i></button>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white hidden sm:block">${t.menu.dash}</h2>
        </div>

        <div class="flex items-center gap-3">
            <button onclick="changeLang()" class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-white font-bold text-xs transition">
                ${config.lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button onclick="changeTheme()" class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition">
                <i class="fa-solid ${config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
            </button>
            <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <button onclick="doLogout()" class="bg-brandRed hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 transition flex items-center gap-2">
                <i class="fa-solid fa-power-off text-xs"></i>
                <span class="hidden sm:inline">${t.logout}</span>
            </button>
        </div>
    </header>`;
}

// الوظائف العامة
window.changeTheme = () => {
    const newTheme = config.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    location.reload(); 
};

window.changeLang = () => {
    const newLang = config.lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', newLang);
    location.reload();
};

window.doLogout = () => {
    if(confirm('تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html'; 
    }
};
