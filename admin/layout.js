/**
 * AndroGov Layout Engine v3.1 (Fix Layout Overlap)
 * - Fixes: Sidebar overlap in English mode by forcing Tailwind classes generation.
 * - Fixes: Content margins swapping logic.
 */

// 1. استرجاع الإعدادات
const storedUser = JSON.parse(localStorage.getItem('currentUser'));

const defaultUser = {
    nameAr: "أيمن المغربي",
    nameEn: "Ayman Almaghrabi",
    titleAr: "مدير الحوكمة",
    titleEn: "Governance Manager",
    avatar: "https://ui-avatars.com/api/?name=Ayman+Almaghrabi&background=FB4747&color=fff"
};

const currentUser = storedUser || defaultUser;

const config = {
    lang: localStorage.getItem('lang') || 'ar',
    theme: localStorage.getItem('theme') || 'light'
};

// 2. قاموس النصوص
const layoutDict = {
    ar: {
        sysName: "AndroGov",
        sysVer: "Enterprise v3.0",
        logout: "تسجيل خروج",
        sections: {
            main: "الرئيسية",
            gov: "الحوكمة المؤسسية",
            ops: "الحوكمة التشغيلية",
            dept: "الإدارات والخدمات",
            admin: "إدارة النظام"
        },
        menu: {
            dash: "لوحة القيادة",
            ga: "الجمعيات العمومية",
            board: "مجلس الإدارة",
            committees: "اللجان المنبثقة",
            shareholders: "سجل المساهمين",
            doa: "مصفوفة الصلاحيات (DOA)",
            policies: "مركز السياسات واللوائح",
            compliance: "الامتثال والمخاطر",
            hr: "الموارد البشرية",
            finance: "الشؤون المالية",
            procurement: "المشتريات والعقود",
            it: "التقنية والأمن السيبراني",
            users: "المستخدمين والصلاحيات",
            audit: "سجل التدقيق والرقابة"
        }
    },
    en: {
        sysName: "AndroGov",
        sysVer: "Enterprise v3.0",
        logout: "Logout",
        sections: {
            main: "Main",
            gov: "Corporate Governance",
            ops: "Operating Governance",
            dept: "Departments",
            admin: "System Administration"
        },
        menu: {
            dash: "Dashboard",
            ga: "General Assembly",
            board: "Board of Directors",
            committees: "Committees",
            shareholders: "Shareholders Registry",
            doa: "Authority Matrix (DOA)",
            policies: "Policy Center",
            compliance: "Compliance & Risk",
            hr: "Human Resources",
            finance: "Finance",
            procurement: "Procurement",
            it: "IT & Cybersecurity",
            users: "Users & Roles",
            audit: "Audit Log"
        }
    }
};

// 3. التشغيل
document.addEventListener('DOMContentLoaded', () => {
    try {
        applyConfig();
        renderSidebar();
        renderHeader();
        document.body.style.opacity = '1';
    } catch (e) {
        console.error(e);
        document.body.style.opacity = '1';
    }
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

    // --- FIX: Force Tailwind to generate margin classes ---
    // هذا الكود يضمن وجود الكلاسات في الصفحة حتى لو لم تكن في HTML الأصلي
    if (!document.getElementById('tailwind-margin-fix')) {
        const fixDiv = document.createElement('div');
        fixDiv.id = 'tailwind-margin-fix';
        fixDiv.className = 'hidden md:ml-72 md:mr-72';
        document.body.appendChild(fixDiv);
    }

    // ضبط هوامش المحتوى لمنع التداخل
    const main = document.querySelector('.main-content') || document.querySelector('.main-content-wrapper');
    if (main) {
        // إزالة الكلاسات القديمة أولاً
        main.classList.remove('md:ml-72', 'md:mr-72');
        
        // إضافة الكلاس الصحيح بناءً على اللغة
        if (config.lang === 'ar') {
            main.classList.add('md:mr-72'); // هامش يمين للعربي
        } else {
            main.classList.add('md:ml-72'); // هامش يسار للإنجليزي
        }
    }
}

function renderSidebar() {
    const el = document.getElementById('sidebar-container');
    if (!el) return;

    const t = layoutDict[config.lang];
    const isRtl = config.lang === 'ar';
    const path = window.location.pathname;
    
    const displayName = isRtl ? (currentUser.nameAr || currentUser.name) : (currentUser.nameEn || currentUser.name);
    const displayTitle = isRtl ? (currentUser.titleAr || currentUser.title) : (currentUser.titleEn || currentUser.title);

    const isActive = (p) => path.includes(p) ? 'bg-brandRed text-white shadow-lg shadow-red-500/30 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';

    el.innerHTML = `
    <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} z-50 h-screen w-72 flex-col hidden md:flex transition-all duration-300 bg-white dark:bg-[#0F172A] border-${isRtl ? 'l' : 'r'} border-slate-200 dark:border-slate-800 shadow-xl">
        
        <!-- Logo Area -->
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-50 p-1 flex items-center justify-center border border-slate-100 dark:border-transparent">
                    <img src="https://ait.sa/wp-content/uploads/2024/03/cropped-Square-Logo.png" class="w-full h-full object-contain">
                </div>
                <div>
                    <h1 class="font-bold text-lg text-slate-800 dark:text-white font-sans">${t.sysName}</h1>
                    <p class="text-[10px] text-slate-500 uppercase tracking-widest">${t.sysVer}</p>
                </div>
            </div>
        </div>

        <!-- User Profile -->
        <div class="p-4">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 object-cover">
                <div class="overflow-hidden">
                    <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${displayName}</p>
                    <p class="text-[10px] text-brandRed font-medium truncate">${displayTitle}</p>
                </div>
            </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex-1 overflow-y-auto px-3 space-y-1 py-2 custom-scroll">
            
            <!-- Dashboard -->
            <div class="px-3 mt-2 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.sections.main}</div>
            ${navItem(t.menu.dash, 'fa-gauge-high', 'admin.html', isActive('admin.html'))}

            <!-- Governance Module -->
            <div class="px-3 mt-6 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.sections.gov}</div>
            ${navItem(t.menu.ga, 'fa-users-rectangle', 'ga.html', isActive('ga.html'))}
            ${navItem(t.menu.board, 'fa-building-columns', 'board.html', isActive('board.html'))}
            ${navItem(t.menu.committees, 'fa-people-group', 'committees.html', isActive('committees.html'))}
            ${navItem(t.menu.shareholders, 'fa-id-card', 'shareholders.html', isActive('shareholders.html'))}

            <!-- Operating Governance -->
            <div class="px-3 mt-6 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.sections.ops}</div>
            ${navItem(t.menu.doa, 'fa-sitemap', 'doa.html', isActive('doa.html'))}
            ${navItem(t.menu.policies, 'fa-book-open', 'policies.html', isActive('policies.html'), 'Draft')}
            ${navItem(t.menu.compliance, 'fa-scale-balanced', 'compliance.html', isActive('compliance.html'))}

            <!-- Departments -->
            <div class="px-3 mt-6 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.sections.dept}</div>
            ${navItem(t.menu.hr, 'fa-user-tie', 'hr.html', isActive('hr.html'))}
            ${navItem(t.menu.finance, 'fa-money-bill-wave', 'finance.html', isActive('finance.html'))}
            ${navItem(t.menu.procurement, 'fa-boxes-packing', 'procurement.html', isActive('procurement.html'))}
            ${navItem(t.menu.it, 'fa-shield-cat', 'it.html', isActive('it.html'))}

            <!-- Admin -->
            <div class="px-3 mt-6 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${t.sections.admin}</div>
            ${navItem(t.menu.users, 'fa-users-gear', 'users.html', isActive('users.html'))}
            ${navItem(t.menu.audit, 'fa-list-ul', 'audit.html', isActive('audit.html'))}

        </nav>

        <div class="p-4 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
            &copy; 2026 Andromeda IT
        </div>
    </aside>`;
}

function navItem(label, icon, url, classes, badge = null) {
    return `<a href="${url}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${classes}">
        <i class="fa-solid ${icon} w-5 text-center"></i>
        <span class="flex-1">${label}</span>
        ${badge ? `<span class="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded border border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800">${badge}</span>` : ''}
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

// Global Functions
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
    if(confirm('هل تريد تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; 
    }
};
