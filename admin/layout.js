/**
 * AndroGov Layout Engine
 * متوافق تماماً مع login.html الخاص بك
 */

// استرجاع الإعدادات المحفوظة من صفحة الدخول
const savedUser = JSON.parse(localStorage.getItem('currentUser')) || {
    name: "أيمن المغربي",
    role: "System Admin",
    title: "مدير الحوكمة",
    avatar: "https://ui-avatars.com/api/?name=Ayman+Almaghrabi&background=FB4747&color=fff"
};

const savedLang = localStorage.getItem('lang') || 'ar';
const savedTheme = localStorage.getItem('theme') || 'light';

// قاموس ترجمة القوائم (Sidebar & Header)
const layoutTranslations = {
    ar: {
        sysName: "AndroGov",
        sysVer: "Portal v2.2",
        logout: "تسجيل الخروج",
        menu: {
            system: "النظام",
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
            system: "System",
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

// تهيئة الصفحة فور التحميل
document.addEventListener('DOMContentLoaded', () => {
    applySettings();
    renderLayout();
    document.body.classList.remove('opacity-0'); // إظهار الصفحة بعد التحميل
});

function applySettings() {
    const html = document.documentElement;
    
    // تطبيق الثيم
    if (savedTheme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');

    // تطبيق اللغة والاتجاه
    html.setAttribute('lang', savedLang);
    html.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
}

function renderLayout() {
    const t = layoutTranslations[savedLang];
    
    // 1. بناء القائمة الجانبية (Sidebar)
    const sidebar = document.getElementById('sidebar-container');
    if (sidebar) {
        sidebar.innerHTML = `
        <aside class="w-72 bg-slate-900 text-white flex flex-col h-screen fixed top-0 ${savedLang === 'ar' ? 'right-0' : 'left-0'} z-50 transition-all duration-300 border-${savedLang === 'ar' ? 'l' : 'r'} border-slate-800 hidden md:flex">
            <!-- الشعار -->
            <div class="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-950">
                <div class="flex items-center gap-3">
                    <img src="https://ait.sa/wp-content/uploads/2024/03/cropped-Square-Logo.png" class="w-10 h-10 rounded-xl bg-white p-1 object-contain">
                    <div>
                        <h1 class="font-bold tracking-wide text-lg font-sans">${t.sysName}</h1>
                        <p class="text-[10px] text-slate-400 uppercase tracking-widest font-sans">${t.sysVer}</p>
                    </div>
                </div>
            </div>

            <!-- بطاقة المستخدم -->
            <div class="p-4">
                <div class="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3 border border-slate-700">
                    <img src="${savedUser.avatar}" class="w-10 h-10 rounded-full border-2 border-slate-600">
                    <div class="overflow-hidden">
                        <p class="text-sm font-bold truncate">${savedUser.name}</p>
                        <p class="text-[10px] text-brandRed font-medium truncate">${savedUser.title}</p>
                    </div>
                </div>
            </div>

            <!-- الروابط -->
            <nav class="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                ${renderMenuItem(t.menu.dashboard, 'fa-gauge-high', 'admin.html', true)}
                ${renderMenuItem(t.menu.audit, 'fa-list-ul', 'audit.html')}
                ${renderMenuItem(t.menu.users, 'fa-users-gear', 'users.html')}
                
                <div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">${t.menu.modules}</div>
                ${renderMenuItem(t.menu.governance, 'fa-gavel', 'governance.html')}
                ${renderMenuItem(t.menu.policies, 'fa-book-open', 'policies.html', false, 'Draft')}
                
                <div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">${t.menu.tech}</div>
                ${renderMenuItem(t.menu.cyber, 'fa-shield-cat', 'cybersecurity.html')}
            </nav>
        </aside>`;
    }

    // 2. بناء الهيدر (Header)
    const header = document.getElementById('header-container');
    if (header) {
        header.innerHTML = `
        <header class="h-20 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-40 transition-colors duration-300">
            <div class="flex items-center gap-4">
                <button class="md:hidden text-slate-500 dark:text-slate-200"><i class="fa-solid fa-bars text-xl"></i></button>
                <h2 class="text-xl font-bold text-slate-800 dark:text-white">${t.menu.dashboard}</h2>
            </div>

            <div class="flex items-center gap-3">
                <button onclick="toggleGlobalLang()" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition font-bold text-xs">
                    ${savedLang === 'ar' ? 'EN' : 'عربي'}
                </button>
                <button onclick="toggleGlobalTheme()" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                    <i class="fa-solid ${savedTheme === 'dark' ? 'fa-sun' : 'fa-moon'} text-slate-600 dark:text-yellow-400"></i>
                </button>
                <div class="h-8 w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>
                <button onclick="globalLogout()" class="bg-brandRed hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 transition flex items-center gap-2">
                    <i class="fa-solid fa-power-off text-xs"></i>
                    <span class="hidden sm:inline">${t.logout}</span>
                </button>
            </div>
        </header>`;
    }
    
    // ضبط الهوامش للمحتوى الرئيسي
    const mainContent = document.querySelector('.main-content-wrapper');
    if (mainContent) {
        if (savedLang === 'ar') mainContent.classList.replace('md:ml-72', 'md:mr-72');
        else mainContent.classList.replace('md:mr-72', 'md:ml-72');
    }
}

function renderMenuItem(label, icon, url, isActive = false, badge = null) {
    // تحديد الصفحة النشطة بناءً على الرابط الحالي
    const currentFile = window.location.pathname.split('/').pop() || 'admin.html';
    const active = currentFile === url;
    
    const baseClass = "flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl text-sm transition-colors mb-1";
    const activeClass = active ? "bg-brandRed text-white shadow-lg shadow-red-900/20 font-bold" : "text-slate-400 hover:bg-slate-800 hover:text-white";

    return `
    <a href="${url}" class="${baseClass} ${activeClass} group">
        <i class="fa-solid ${icon} w-5 text-center group-hover:scale-110 transition-transform"></i>
        <span class="flex-1">${label}</span>
        ${badge ? `<span class="bg-orange-500/20 text-orange-400 text-[10px] px-2 py-0.5 rounded border border-orange-500/20">${badge}</span>` : ''}
    </a>`;
}

// Global Actions
window.toggleGlobalTheme = function() {
    const newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    location.reload(); // إعادة تحميل بسيطة لضمان تطبيق كل شيء
};

window.toggleGlobalLang = function() {
    const newLang = localStorage.getItem('lang') === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', newLang);
    location.reload();
};

window.globalLogout = function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html'; // توجيه لصفحة الدخول المعتمدة
};
