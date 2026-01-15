// ==========================================
// 1. إعدادات Tailwind (لتوحيد الألوان)
// ==========================================
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: { brandRed: '#FB4747', brandBlue: '#4267B2', brandDark: '#1E293B', brandGray: '#F8FAFC' },
                fontFamily: { sans: ['Tajawal', 'Inter', 'sans-serif'], en: ['Inter', 'sans-serif'] }
            }
        }
    }
}

// ==========================================
// 2. مستودع البيانات المركزي (Data Store)
// ==========================================
const SYSTEM_DATA = {
    // المستخدم الحالي (يتم فرضه كـ أيمن)
    currentUser: {
        id: "USR_004", 
        name: { ar: "أيمن المغربي", en: "Ayman Al-Maghrabi" }, 
        role: "GRCO", // Governance Officer
        avatar: "https://ui-avatars.com/api/?name=Ayman+AlMaghrabi&background=FB4747&color=fff&bold=true"
    },
    // بيانات الإشعارات
    notifications: [
        { id: 1, type: 'critical', icon: 'fa-shield-virus', color: 'text-red-500 bg-red-50', titleAr: 'تنبيه أمني', msgAr: 'محاولة دخول غير مصرح بها من IP غريب.', time: 'منذ دقيقتين' },
        { id: 2, type: 'info', icon: 'fa-file-contract', color: 'text-blue-500 bg-blue-50', titleAr: 'عقد جديد', msgAr: 'عقد توريد أجهزة بانتظار الاعتماد.', time: 'منذ ساعة' }
    ]
};

// ==========================================
// 3. محرك الواجهة (UI Engine)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initLayout();
});

function initLayout() {
    // 1. Apply Theme & Direction
    const theme = localStorage.getItem('theme') || 'light';
    const lang = localStorage.getItem('lang') || 'ar';
    
    if (theme === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // 2. Render Components
    renderSidebar();
    renderHeader();
    
    // 3. Show Body (Prevent FOUC)
    document.body.style.opacity = '1';
}

function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    // Determine Active Link
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'admin.html';

    const menuItems = [
        { title: 'الرئيسية', links: [ { name: 'لوحة القيادة', icon: 'fa-gauge-high', href: 'admin.html' } ] },
        { title: 'الحوكمة', links: [ { name: 'المجلس', icon: 'fa-building-columns', href: '#' }, { name: 'الجمعيات', icon: 'fa-users-rectangle', href: '#' } ] },
        { title: 'التشغيل', links: [ { name: 'إدارة المهام', icon: 'fa-list-check', href: 'tasks.html' }, { name: 'السياسات', icon: 'fa-book-open', href: '#' } ] }
    ];

    let navHTML = '';
    menuItems.forEach(section => {
        navHTML += `<div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${section.title}</div>`;
        section.links.forEach(link => {
            const active = page === link.href ? 'bg-brandRed text-white shadow-md shadow-red-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';
            navHTML += `
            <a href="${link.href}" class="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl text-sm font-medium transition-all ${active}">
                <div class="w-6 text-center"><i class="fa-solid ${link.icon}"></i></div>
                <span>${link.name}</span>
            </a>`;
        });
    });

    container.innerHTML = `
    <aside class="fixed top-0 right-0 z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-l border-slate-200 dark:border-slate-800 transition-all">
        <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl shadow-lg">A</div>
                <div>
                    <h1 class="font-bold text-sm text-slate-800 dark:text-white font-sans">AndroGov</h1>
                    <p class="text-[10px] text-slate-500">v4.5 Enterprise</p>
                </div>
            </div>
        </div>
        
        <!-- User Profile -->
        <div class="p-4">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <img src="${SYSTEM_DATA.currentUser.avatar}" class="w-10 h-10 rounded-full object-cover">
                <div class="overflow-hidden">
                    <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${SYSTEM_DATA.currentUser.name.ar}</p>
                    <p class="text-[10px] text-brandRed font-medium truncate">${SYSTEM_DATA.currentUser.role}</p>
                </div>
            </div>
        </div>

        <nav class="flex-1 overflow-y-auto custom-scroll">${navHTML}</nav>
    </aside>`;
}

function renderHeader() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const notifCount = SYSTEM_DATA.notifications.length;

    container.innerHTML = `
    <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <button onclick="document.querySelector('aside').classList.toggle('hidden'); document.querySelector('aside').classList.toggle('flex');" class="md:hidden text-slate-500 hover:text-brandRed"><i class="fa-solid fa-bars text-xl"></i></button>
        
        <div class="flex-1"></div> <!-- Spacer -->

        <div class="flex items-center gap-3">
            <!-- Notifications -->
            <div class="relative">
                <button onclick="document.getElementById('notif-dropdown').classList.toggle('hidden')" class="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition relative">
                    <i class="fa-regular fa-bell text-lg"></i>
                    ${notifCount > 0 ? `<span class="absolute top-2 right-2 w-2 h-2 bg-brandRed rounded-full animate-pulse"></span>` : ''}
                </button>
                <!-- Dropdown -->
                <div id="notif-dropdown" class="hidden absolute top-12 left-0 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden">
                    <div class="p-3 border-b border-slate-100 dark:border-slate-700 font-bold text-sm dark:text-white">الإشعارات</div>
                    <div class="max-h-64 overflow-y-auto custom-scroll p-2 space-y-2">
                        ${SYSTEM_DATA.notifications.map(n => `
                            <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 flex gap-3">
                                <div class="w-8 h-8 rounded-full flex items-center justify-center ${n.color}"><i class="fa-solid ${n.icon}"></i></div>
                                <div>
                                    <p class="text-xs font-bold text-slate-800 dark:text-white">${n.titleAr}</p>
                                    <p class="text-[10px] text-slate-500 dark:text-slate-400">${n.msgAr}</p>
                                    <p class="text-[9px] text-slate-400 mt-1">${n.time}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Theme Toggle -->
            <button onclick="toggleTheme()" class="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition">
                <i class="fa-solid fa-moon dark:hidden"></i>
                <i class="fa-solid fa-sun hidden dark:block"></i>
            </button>

            <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            
            <button onclick="logout()" class="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2">
                <i class="fa-solid fa-power-off"></i>
            </button>
        </div>
    </header>`;
}

// Global Functions
window.toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

window.logout = () => {
    Swal.fire({
        title: 'تسجيل الخروج؟',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'نعم',
        cancelButtonText: 'لا',
        confirmButtonColor: '#FB4747'
    }).then(res => {
        if(res.isConfirmed) location.reload();
    });
};
