/**
 * AndroGov Layout Engine & Store (Updated)
 * - يدعم الترجمة الفورية للنصوص (Ar/En)
 * - إصلاح تداخل الألوان في الوضع الداكن/الفاتح
 * - ربط زر الخروج بالرابط الخارجي
 */

// 1. استرجاع بيانات المستخدم (أو استخدام افتراضي)
const storedUser = JSON.parse(localStorage.getItem('currentUser'));

const AppConfig = {
    // نستخدم البيانات المخزنة إذا وجدت، وإلا نستخدم "أيمن" كافتراضي
    currentUser: storedUser || {
        name: "أيمن المغربي",
        role: "Super Admin",
        title: "مدير الحوكمة وأمين السر",
        avatar: "https://ui-avatars.com/api/?name=Ayman+Almaghrabi&background=FB4747&color=fff&bold=true"
    },
    
    system: {
        version: "2.2.0",
        lastUpdate: "2026-01-08",
        status: "Online"
    },

    // قاموس الترجمة للقوائم
    routes: [
        { section: 'system', labelAr: 'النظام', labelEn: 'System' },
        
        { id: 'dashboard', labelAr: 'نظرة عامة', labelEn: 'Dashboard', icon: 'fa-gauge-high', url: 'admin.html', isActive: (path) => path.includes('admin.html') || path === '' || path === '/' },
        { id: 'audit', labelAr: 'سجل التدقيق', labelEn: 'Audit Log', icon: 'fa-list-ul', url: 'audit.html' },
        { id: 'users', labelAr: 'إدارة المستخدمين', labelEn: 'User Management', icon: 'fa-users-gear', url: 'users.html' },

        { section: 'modules', labelAr: 'إدارة الوحدات', labelEn: 'Modules' },
        
        { id: 'governance', labelAr: 'الحوكمة', labelEn: 'Governance', icon: 'fa-gavel', url: 'governance.html' },
        { id: 'operations', labelAr: 'التشغيل', labelEn: 'Operations', icon: 'fa-briefcase', url: 'operations.html' },
        { id: 'policies', labelAr: 'مكتبة السياسات', labelEn: 'Policy Library', icon: 'fa-book-open', url: 'policies.html', badge: 'Draft' },

        { section: 'tech', labelAr: 'التقنية والأمن', labelEn: 'Tech & Security' },
        
        { id: 'cyber', labelAr: 'الأمن السيبراني', labelEn: 'Cybersecurity', icon: 'fa-shield-cat', url: 'cybersecurity.html' },
        { id: 'it', labelAr: 'البنية التحتية', labelEn: 'IT Infrastructure', icon: 'fa-server', url: 'it.html' }
    ]
};

// --- التهيئة عند التحميل ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderLayout(); // دالة تجمع بناء الهيدر والسايدبار
    
    // منع الوميض الأبيض
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.classList.remove('opacity-0');
    }, 50);
});

// دالة مركزية لإعادة الرسم عند تغيير اللغة
function renderLayout() {
    renderSidebar();
    renderHeader();
}

// 1. بناء القائمة الجانبية (مع إصلاح الألوان واللغة)
function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const currentPath = window.location.pathname.split('/').pop() || 'admin.html';
    const lang = document.documentElement.lang || 'ar'; // تحديد اللغة الحالية
    const isAr = lang === 'ar';

    let navHTML = '';
    
    AppConfig.routes.forEach(item => {
        // اختيار النص حسب اللغة
        const label = isAr ? (item.labelAr || item.label) : (item.labelEn || item.label);

        if (item.section) {
            navHTML += `
                <div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    ${label}
                </div>`;
        } else {
            const isActive = item.isActive ? item.isActive(currentPath) : (currentPath === item.url);
            
            // إصلاح الألوان: تحديد ألوان واضحة للحالة النشطة وغير النشطة
            const activeClass = isActive 
                ? 'bg-brandRed text-white shadow-lg shadow-red-500/20 font-bold' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors';
            
            navHTML += `
                <a href="${item.url}" class="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl text-sm mb-1 ${activeClass} group">
                    <i class="fa-solid ${item.icon} w-5 text-center transition-transform group-hover:scale-110"></i>
                    <span class="flex-1">${label}</span>
                    ${item.badge ? `<span class="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 text-[10px] px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-500/20">${item.badge}</span>` : ''}
                </a>
            `;
        }
    });

    // الستايل الأساسي للسايدبار: أبيض في الفاتح، كحلي غامق في الداكن (لمنع الدمج)
    container.innerHTML = `
        <aside class="w-72 bg-white dark:bg-[#0F172A] border-l dark:border-slate-800 border-slate-200 shadow-2xl hidden md:flex flex-col h-screen fixed top-0 ${isAr ? 'right-0' : 'left-0'} z-50 transition-colors duration-300">
            
            <!-- الشعار -->
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md border border-slate-100 dark:border-none">
                         <img src="https://ait.sa/wp-content/uploads/2024/03/cropped-Square-Logo.png" class="w-full h-full object-contain">
                    </div>
                    <div>
                        <h1 class="font-bold text-slate-800 dark:text-white tracking-wide text-lg font-en">AndroGov</h1>
                        <div class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-en">Portal v2.2</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- بطاقة المستخدم -->
            <div class="p-4 mx-2 mt-2">
                <div class="rounded-xl bg-slate-50 dark:bg-[#1E293B]/50 border border-slate-200 dark:border-slate-700 p-3 flex items-center gap-3">
                    <img src="${AppConfig.currentUser.avatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 shadow-sm object-cover">
                    <div class="overflow-hidden">
                        <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${AppConfig.currentUser.name}</p>
                        <p class="text-[10px] text-brandRed font-medium truncate">${AppConfig.currentUser.title}</p>
                    </div>
                </div>
            </div>

            <!-- الروابط -->
            <nav class="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                ${navHTML}
            </nav>
            
            <div class="p-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 text-center font-mono dir-ltr">
                © 2026 Andromeda IT
            </div>
        </aside>
    `;
}

// 2. بناء الهيدر (مع إصلاح اللغة والألوان)
function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const currentPath = window.location.pathname.split('/').pop() || 'admin.html';
    const lang = document.documentElement.lang || 'ar';
    const isAr = lang === 'ar';

    // البحث عن العنوان المناسب
    const routeObj = AppConfig.routes.find(r => r.url === currentPath);
    const pageTitle = routeObj ? (isAr ? (routeObj.labelAr || routeObj.label) : (routeObj.labelEn || routeObj.label)) : (isAr ? 'لوحة التحكم' : 'Dashboard');

    // ألوان خلفية صريحة للهيدر
    container.innerHTML = `
        <header class="h-20 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-40 transition-colors duration-300 shadow-sm">
            
            <div class="flex items-center gap-4">
                <button onclick="toggleMobileMenu()" class="md:hidden text-slate-500 dark:text-slate-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>
                <div>
                    <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        ${pageTitle}
                    </h2>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <!-- زر اللغة: يغير النص والاتجاه -->
                <button onclick="toggleLang()" class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition font-bold text-xs border border-slate-200 dark:border-slate-700 font-en">
                    ${isAr ? 'EN' : 'عربي'}
                </button>

                <!-- زر الثيم -->
                <button onclick="toggleTheme()" class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700">
                    <i class="fa-solid fa-moon" id="theme-icon"></i>
                </button>
                
                <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                <!-- زر الخروج -->
                <button onclick="logout()" class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-500/20 transition flex items-center gap-2 group">
                    <i class="fa-solid fa-power-off text-xs group-hover:scale-110 transition-transform"></i>
                    <span class="hidden sm:inline">${isAr ? 'خروج' : 'Logout'}</span>
                </button>
            </div>
        </header>
    `;
    updateThemeIcon();
}

// --- الوظائف المساعدة ---

function initTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
    updateThemeIcon();
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = document.documentElement.classList.contains('dark') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function toggleLang() {
    const html = document.documentElement;
    const currentLang = html.lang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    // تغيير الاتجاه واللغة
    html.lang = newLang;
    html.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', newLang);

    // تغيير مكان السايدبار (يمين/يسار)
    const sidebar = document.querySelector('aside');
    if(sidebar) {
        if(newLang === 'ar') {
            sidebar.classList.remove('left-0');
            sidebar.classList.add('right-0');
            // تعديل الهامش للمحتوى الرئيسي
            const mainContent = document.querySelector('body > div.flex-col'); // المحتوى
            if(mainContent) mainContent.className = "md:mr-72 transition-all duration-300 flex flex-col min-h-screen";
        } else {
            sidebar.classList.remove('right-0');
            sidebar.classList.add('left-0');
             // تعديل الهامش للمحتوى الرئيسي
            const mainContent = document.querySelector('body > div.flex-col');
            if(mainContent) mainContent.className = "md:ml-72 transition-all duration-300 flex flex-col min-h-screen";
        }
    }

    // إعادة رسم النصوص
    renderLayout();
}

function logout() {
    // التوجيه للرابط الخارجي كما طلبت
    if(confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'https://androgov-sa.github.io/AIT/login.html';
    }
}

function toggleMobileMenu() {
    alert('Mobile menu coming soon');
}
