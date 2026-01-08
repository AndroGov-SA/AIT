/**
 * AndroGov Layout Engine & Store
 * ملف التخطيط الأساسي - يربط بين تسجيل الدخول والواجهة
 */

// محاولة استرجاع بيانات المستخدم المسجل من LocalStorage
// إذا لم يوجد، نستخدم البيانات الافتراضية (أيمن المغربي)
const storedUser = JSON.parse(localStorage.getItem('currentUser'));

const AppConfig = {
    currentUser: storedUser || {
        name: "أيمن المغربي",
        role: "Super Admin",
        title: "مدير الحوكمة وأمين السر",
        avatar: "https://ui-avatars.com/api/?name=Ayman+Almaghrabi&background=FB4747&color=fff&bold=true"
    },
    
    system: {
        version: "2.1.0",
        lastUpdate: "2026-01-08",
        status: "Online"
    },

    // الروابط والقوائم
    routes: [
        { section: 'system', label: 'النظام' },
        { id: 'dashboard', label: 'نظرة عامة (Overview)', icon: 'fa-gauge-high', url: 'admin.html', isActive: (path) => path.includes('admin.html') || path === '' || path === '/' },
        { id: 'audit', label: 'سجل التدقيق (Audit Log)', icon: 'fa-list-ul', url: 'audit.html' },
        { id: 'users', label: 'المستخدمين & RBAC', icon: 'fa-users-gear', url: 'users.html' },

        { section: 'modules', label: 'إدارة الوحدات' },
        { 
            id: 'governance', 
            label: 'الحوكمة (Governance)', 
            icon: 'fa-gavel', 
            url: 'governance.html'
        },
        { id: 'operations', label: 'التشغيل (Operations)', icon: 'fa-briefcase', url: 'operations.html' },
        { id: 'policies', label: 'مكتبة السياسات', icon: 'fa-book-open', url: 'policies.html', badge: 'مسودة' },

        { section: 'tech', label: 'التقنية والأمن' },
        { id: 'cyber', label: 'الأمن السيبراني', icon: 'fa-shield-cat', url: 'cybersecurity.html' },
        { id: 'it', label: 'البنية التحتية (IT)', icon: 'fa-server', url: 'it.html' }
    ]
};

// --- التنفيذ عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('Layout Engine Started...');
    
    // 1. تهيئة المظهر (ليلي/نهاري)
    initTheme();
    
    // 2. بناء الواجهة
    renderSidebar();
    renderHeader();

    // 3. ✅ إصلاح هام: إظهار الصفحة بعد التحميل
    // هذا يمنع مشكلة الصفحة البيضاء
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.classList.remove('opacity-0');
    }, 100);
});

// 1. بناء القائمة الجانبية
function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return; // لا نفعل شيئاً إذا لم نكن في صفحة داخلية

    const currentPath = window.location.pathname.split('/').pop() || 'admin.html';
    let navHTML = '';
    
    AppConfig.routes.forEach(item => {
        if (item.section) {
            navHTML += `<div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${item.label}</div>`;
        } else {
            // التحقق من الرابط النشط
            const isActive = item.isActive ? item.isActive(currentPath) : (currentPath === item.url);
            const activeClass = isActive 
                ? 'bg-brandRed text-white shadow-lg shadow-red-500/20 font-bold' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white transition-colors';
            
            navHTML += `
                <a href="${item.url}" class="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl text-sm mb-1 ${activeClass} group">
                    <i class="fa-solid ${item.icon} w-5 text-center transition-transform group-hover:scale-110"></i>
                    <span class="flex-1">${item.label}</span>
                    ${item.badge ? `<span class="bg-orange-500/20 text-orange-400 text-[10px] px-2 py-0.5 rounded-md border border-orange-500/20">${item.badge}</span>` : ''}
                </a>
            `;
        }
    });

    container.innerHTML = `
        <aside class="w-72 bg-[#0F172A] text-slate-300 flex flex-col h-screen fixed top-0 right-0 z-50 border-l border-slate-800 shadow-2xl hidden md:flex font-en">
            <!-- الشعار -->
            <div class="h-20 flex items-center px-6 border-b border-slate-800 bg-[#0B1120]">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg shadow-red-900/20">
                         <img src="https://ait.sa/wp-content/uploads/2024/03/cropped-Square-Logo.png" class="w-full h-full object-contain">
                    </div>
                    <div>
                        <h1 class="font-bold text-white tracking-wide text-lg">AndroGov</h1>
                        <div class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <p class="text-[10px] text-slate-400 uppercase tracking-widest">Admin Portal</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- المستخدم -->
            <div class="p-4 mx-2 mt-2 rounded-xl bg-[#1E293B]/50 border border-slate-800 flex items-center gap-3">
                <img src="${AppConfig.currentUser.avatar}" class="w-10 h-10 rounded-full border-2 border-slate-700 bg-slate-800 object-cover">
                <div class="overflow-hidden">
                    <p class="text-sm font-bold text-white truncate font-sans">${AppConfig.currentUser.name}</p>
                    <p class="text-[10px] text-brandRed font-medium truncate font-sans">${AppConfig.currentUser.title}</p>
                </div>
            </div>

            <!-- القوائم -->
            <nav class="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-slate-700">
                ${navHTML}
            </nav>
            
            <div class="p-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
                v${AppConfig.system.version} © 2026
            </div>
        </aside>
    `;
}

// 2. بناء الهيدر العلوي
function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const currentPath = window.location.pathname.split('/').pop() || 'admin.html';
    const activeRoute = AppConfig.routes.find(r => r.url === currentPath) || { label: 'لوحة التحكم' };

    container.innerHTML = `
        <header class="h-20 bg-white/80 dark:bg-[#1E293B]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-40 transition-colors duration-300">
            <div class="flex items-center gap-4">
                <button onclick="toggleMobileMenu()" class="md:hidden text-slate-500 dark:text-slate-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"><i class="fa-solid fa-bars text-xl"></i></button>
                <div>
                    <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2 font-sans">
                        ${activeRoute.label}
                    </h2>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button onclick="toggleLang()" class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition font-bold text-xs border border-slate-200 dark:border-slate-700">EN</button>
                <button onclick="toggleTheme()" class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700">
                    <i class="fa-solid fa-moon" id="theme-icon"></i>
                </button>
                <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button onclick="logout()" class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-500/20 transition flex items-center gap-2">
                    <i class="fa-solid fa-power-off text-xs"></i>
                    <span class="hidden sm:inline">خروج</span>
                </button>
            </div>
        </header>
    `;
    updateThemeIcon();
}

// 3. أدوات التحكم
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
    html.dir = html.dir === 'rtl' ? 'ltr' : 'rtl';
    html.lang = html.lang === 'ar' ? 'en' : 'ar';
}

function logout() {
    if(confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

function toggleMobileMenu() {
    alert('سيتم تفعيل قائمة الجوال الكاملة في التحديث القادم.');
}
