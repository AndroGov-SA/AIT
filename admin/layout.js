/**
 * AndroGov Layout Engine - Final Fix
 * - Fixes White Page issue
 * - Fixes Dark/Light mode blending in Sidebar
 * - Updates Logout Link
 */

// استرجاع الإعدادات
const savedUser = JSON.parse(localStorage.getItem('currentUser')) || {
    name: "أيمن المغربي",
    role: "System Admin",
    title: "مدير الحوكمة",
    avatar: "https://ui-avatars.com/api/?name=Ayman+Almaghrabi&background=FB4747&color=fff"
};

const savedLang = localStorage.getItem('lang') || 'ar';
const savedTheme = localStorage.getItem('theme') || 'light';

// قاموس القوائم
const layoutTranslations = {
    ar: {
        sysName: "AndroGov",
        sysVer: "Portal v2.2",
        logout: "تسجيل الخروج",
        menu: {
            dashboard: "نظرة عامة",
            audit: "سجل التدقيق",
            users: "إدارة المستخدمين",
            modules: "إدارة الوحدات",
            governance: "الحوكمة",
            operations: "التشغيل",
            policies: "مكتبة السياسات",
            tech: "التقنية والأمن",
            cyber: "الأمن السيبراني",
            it: "البنية التحتية"
        }
    },
    en: {
        sysName: "AndroGov",
        sysVer: "Portal v2.2",
        logout: "Logout",
        menu: {
            dashboard: "Dashboard",
            audit: "Audit Log",
            users: "User Management",
            modules: "Modules",
            governance: "Governance",
            operations: "Operations",
            policies: "Policy Library",
            tech: "Tech & Security",
            cyber: "Cybersecurity",
            it: "Infrastructure"
        }
    }
};

// التهيئة الفورية
document.addEventListener('DOMContentLoaded', () => {
    applySettings();
    renderLayout();
});

function applySettings() {
    const html = document.documentElement;
    
    // تطبيق الثيم
    if (savedTheme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');

    // تطبيق اللغة
    html.setAttribute('lang', savedLang);
    html.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
}

function renderLayout() {
    const t = layoutTranslations[savedLang];
    
    // 1. القائمة الجانبية (تم إصلاح الألوان هنا)
    const sidebar = document.getElementById('sidebar-container');
    if (sidebar) {
        // تم تغيير bg-slate-900 إلى bg-white dark:bg-slate-900 للفصل بين الوضعين
        sidebar.innerHTML = `
        <aside class="w-72 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 border-${savedLang === 'ar' ? 'l' : 'r'} flex flex-col h-screen fixed top-0 ${savedLang === 'ar' ? 'right-0' : 'left-0'} z-50 transition-colors duration-300 hidden md:flex shadow-xl">
            <!-- الشعار -->
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
                <div class="flex items-center gap-3">
                    <img src="https://ait.sa/wp-content/uploads/2024/03/cropped-Square-Logo.png" class="w-10 h-10 rounded-xl bg-slate-50 p-1 object-contain border border-slate-200 dark:border-transparent">
                    <div>
                        <h1 class="font-bold tracking-wide text-lg font-sans text-slate-800 dark:text-white">${t.sysName}</h1>
                        <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-sans">${t.sysVer}</p>
                    </div>
                </div>
            </div>

            <!-- المستخدم -->
            <div class="p-4">
                <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 flex items-center gap-3 border border-slate-200 dark:border-slate-700">
                    <img src="${savedUser.avatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600">
                    <div class="overflow-hidden">
                        <p class="text-sm font-bold truncate text-slate-800 dark:text-white">${savedUser.name}</p>
                        <p class="text-[10px] text-brandRed font-medium truncate">${savedUser.title}</p>
                    </div>
                </div>
            </div>

            <!-- الروابط -->
            <nav class="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                ${renderMenuItem(t.menu.dashboard, 'fa-gauge-high', 'admin.html', true)}
                ${renderMenuItem(t.menu.audit, 'fa-list-ul', 'audit.html')}
                ${renderMenuItem(t.menu.users, 'fa-users-gear', 'users.html')}
                
                <div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.menu.modules}</div>
                ${renderMenuItem(t.menu.governance, 'fa-gavel', 'governance.html')}
                ${renderMenuItem(t.menu.policies, 'fa-book-open', 'policies.html', false, 'Draft')}
                
                <div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.menu.tech}</div>
                ${renderMenuItem(t.menu.cyber, 'fa-shield-cat', 'cybersecurity.html')}
            </nav>
        </aside>`;
    }

    // 2. الهيدر
    const header = document.getElementById('header-container');
    if (header) {
        header.innerHTML = `
        <header class="h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-40 transition-colors duration-300">
            <div class="flex items-center gap-4">
                <button class="md:hidden text-slate-500 dark:text-slate-200"><i class="fa-solid fa-bars text-xl"></i></button>
                <h2 class="text-xl font-bold text-slate-800 dark:text-white">${t.menu.dashboard}</h2>
            </div>

            <div class="flex items-center gap-3">
                <button onclick="toggleGlobalLang()" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-white transition font-bold text-xs">
                    ${savedLang === 'ar' ? 'EN' : 'عربي'}
                </button>
                <button onclick="toggleGlobalTheme()" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                    <i class="fa-solid ${savedTheme === 'dark' ? 'fa-sun' : 'fa-moon'} text-slate-600 dark:text-yellow-400"></i>
                </button>
                <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button onclick="globalLogout()" class="bg-brandRed hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 transition flex items-center gap-2">
                    <i class="fa-solid fa-power-off text-xs"></i>
                    <span class="hidden sm:inline">${t.logout}</span>
                </button>
            </div>
        </header>`;
    }
    
    // ضبط الهوامش (Margins)
    const mainContent = document.querySelector('.main-content-wrapper');
    if (mainContent) {
        if (savedLang === 'ar') {
            mainContent.classList.remove('md:ml-72');
            mainContent.classList.add('md:mr-72');
        } else {
            mainContent.classList.remove('md:mr-72');
            mainContent.classList.add('md:ml-72');
        }
    }
}

function renderMenuItem(label, icon, url, isActive = false, badge = null) {
    const currentFile = window.location.pathname.split('/').pop() || 'admin.html';
    // تحقق بسيط لتفعيل الزر
    const active = (url === 'admin.html' && (currentFile === '' || currentFile === 'index.html' || currentFile === 'admin.html')) || (url === currentFile);
    
    const baseClass = "flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl text-sm transition-colors mb-1";
    // ألوان النصوص تم ضبطها للداكن والفاتح
    const activeClass = active 
        ? "bg-brandRed text-white shadow-lg shadow-red-500/20 font-bold" 
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white";

    return `
    <a href="${url}" class="${baseClass} ${activeClass} group">
        <i class="fa-solid ${icon} w-5 text-center group-hover:scale-110 transition-transform"></i>
        <span class="flex-1">${label}</span>
        ${badge ? `<span class="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 text-[10px] px-2 py-0.5 rounded border border-orange-200 dark:border-orange-500/20">${badge}</span>` : ''}
    </a>`;
}

// الوظائف العامة
window.toggleGlobalTheme = function() {
    const newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    location.reload();
};

window.toggleGlobalLang = function() {
    const newLang = localStorage.getItem('lang') === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', newLang);
    location.reload();
};

window.globalLogout = function() {
    localStorage.removeItem('currentUser');
    // الرابط الخارجي كما طلبت
    window.location.href = 'https://androgov-sa.github.io/AIT/login.html';
};
