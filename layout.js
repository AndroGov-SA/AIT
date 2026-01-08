/**
 * AndroGov Layout & Data Store
 * هذا الملف مسؤول عن توليد القوائم الثابتة وإدارة البيانات المشتركة
 */

// 1. مخزن البيانات (Data Store)
const AppStore = {
    currentUser: {
        name: "أيمن المغربي",
        role: "Super Admin",
        title: "مدير الحوكمة وأمين السر",
        avatar: "https://ui-avatars.com/api/?name=Ayman+Almaghrabi&background=334155&color=fff"
    },
    systemInfo: {
        version: "v2.1.0",
        lastUpdate: "2026-01-08",
        status: "Online"
    },
    // تعريف الروابط هنا لتسهيل التعديل لاحقاً
    routes: [
        { id: 'dashboard', label: 'نظرة عامة', icon: 'fa-gauge-high', url: 'index.html', section: 'system' },
        { id: 'audit', label: 'سجل التدقيق', icon: 'fa-list-ul', url: 'audit.html', section: 'system' },
        { id: 'users', label: 'المستخدمين & RBAC', icon: 'fa-users-gear', url: 'users.html', section: 'system' },
        
        { id: 'governance', label: 'الحوكمة (Governance)', icon: 'fa-gavel', url: 'governance.html', section: 'modules' },
        { id: 'operations', label: 'التشغيل (Operations)', icon: 'fa-briefcase', url: 'operations.html', section: 'modules' },
        { id: 'policies', label: 'السياسات واللوائح', icon: 'fa-book-open', url: 'policies.html', section: 'modules', badge: 'مسودة' },
        
        { id: 'cyber', label: 'الأمن السيبراني', icon: 'fa-shield-cat', url: 'cybersecurity.html', section: 'tech' },
        { id: 'it', label: 'البنية التحتية (IT)', icon: 'fa-server', url: 'it-infrastructure.html', section: 'tech' }
    ]
};

// 2. وظائف تهيئة الصفحة (Render Functions)
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderSidebar();
    renderHeader();
    setupMobileMenu();
});

function renderSidebar() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    // تحديد الصفحة الحالية لتلوين الزر
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';

    sidebarContainer.innerHTML = `
        <aside class="w-72 bg-[#0F172A] text-slate-300 flex flex-col shadow-xl z-50 h-screen fixed top-0 right-0 hidden md:flex border-l border-slate-700">
            <!-- Logo -->
            <div class="h-16 flex items-center px-6 border-b border-slate-800 bg-[#0B1120]">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded bg-[#FB4747] flex items-center justify-center text-white font-bold shadow-lg shadow-red-500/20">
                        <i class="fa-solid fa-shield-halved text-sm"></i>
                    </div>
                    <div>
                        <h1 class="font-bold text-white tracking-wide text-base font-en">AndroGov</h1>
                        <p class="text-[10px] text-slate-400 uppercase">System Admin</p>
                    </div>
                </div>
            </div>

            <!-- Profile -->
            <div class="p-4 border-b border-slate-800 bg-[#1E293B]/50">
                <div class="flex items-center gap-3">
                    <img src="${AppStore.currentUser.avatar}" class="w-10 h-10 rounded-full border border-slate-600">
                    <div>
                        <p class="text-sm font-bold text-white">${AppStore.currentUser.name}</p>
                        <p class="text-[10px] text-[#FB4747] font-medium">${AppStore.currentUser.title}</p>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1 text-sm scrollbar-hide">
                ${generateNavSection('النظام', 'system', currentPage)}
                ${generateNavSection('إدارة الوحدات', 'modules', currentPage)}
                ${generateNavSection('التقنية والأمن', 'tech', currentPage)}
            </nav>

            <!-- Footer -->
            <div class="p-4 bg-[#0B1120] text-xs border-t border-slate-800">
                <div class="flex justify-between mb-1">
                    <span class="text-slate-500">System Load</span>
                    <span class="text-green-400">Normal</span>
                </div>
                <p class="text-slate-600 mt-2 text-[10px] font-mono">AndroGov ${AppStore.systemInfo.version}</p>
            </div>
        </aside>
    `;
}

function generateNavSection(title, sectionName, currentPage) {
    const items = AppStore.routes.filter(r => r.section === sectionName);
    let html = `<div class="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 mt-4 first:mt-0">${title}</div>`;
    
    items.forEach(item => {
        const isActive = currentPage === item.url;
        const activeClass = isActive 
            ? 'bg-[#FB4747] text-white shadow-md shadow-red-900/20' 
            : 'hover:bg-slate-800 text-slate-300';
            
        html += `
            <a href="${item.url}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 ${activeClass}">
                <i class="fa-solid ${item.icon} w-5 text-center ${isActive ? 'text-white' : 'text-slate-400'}"></i>
                <span class="flex-1">${item.label}</span>
                ${item.badge ? `<span class="bg-orange-500/20 text-orange-400 text-[10px] px-1.5 rounded border border-orange-500/30">${item.badge}</span>` : ''}
            </a>
        `;
    });
    return html;
}

function renderHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    // الحصول على عنوان الصفحة بناءً على الملف
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const currentRoute = AppStore.routes.find(r => r.url === currentPage) || { label: 'لوحة التحكم' };

    headerContainer.innerHTML = `
        <header class="h-16 bg-white dark:bg-[#1E293B] border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-40 transition-colors duration-300">
            <div class="flex items-center gap-4">
                <button onclick="toggleSidebar()" class="md:hidden text-slate-500 dark:text-slate-200"><i class="fa-solid fa-bars text-xl"></i></button>
                <h2 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <span class="text-[#FB4747]">|</span>
                    ${currentRoute.label}
                </h2>
            </div>

            <div class="flex items-center gap-3">
                <!-- Lang Toggle -->
                <button onclick="toggleLang()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition font-bold text-xs font-en">
                    ${document.documentElement.lang === 'ar' ? 'EN' : 'عربي'}
                </button>

                <!-- Theme Toggle -->
                <button onclick="toggleTheme()" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                    <i class="fa-solid ${document.documentElement.classList.contains('dark') ? 'fa-sun' : 'fa-moon'}"></i>
                </button>
                
                <div class="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>

                <button class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-500/20 transition flex items-center gap-2">
                    <i class="fa-solid fa-power-off text-xs"></i>
                    <span class="hidden sm:inline">خروج</span>
                </button>
            </div>
        </header>
    `;
}

// 3. أدوات التحكم (Utils)
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    renderHeader(); // إعادة رسم الهيدر لتحديث الأيقونة
}

function toggleLang() {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    renderHeader(); // تحديث النص
    
    // هنا يمكن إضافة منطق ترجمة النصوص إذا لزم الأمر
    // لكن حالياً نركز على الهيكل
}

function toggleSidebar() {
    // وظيفة للجوال لفتح القائمة
    alert('سيتم تفعيل قائمة الجوال في التحديث القادم');
}
