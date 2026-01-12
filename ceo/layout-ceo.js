/**
 * AndroGov - CEO Layout Manager (Fixed & Stable)
 * نسخة محسنة لضمان تطابق التصميم مع باقي النظام
 */

const ceoUser = {
    name: "هشام السحيباني",
    nameEn: "Hisham Al-Suhaibani",
    role: "الرئيس التنفيذي (CEO)",
    roleEn: "Chief Executive Officer",
    avatar: "https://ui-avatars.com/api/?name=Hisham+S&background=0F172A&color=fff&size=128"
};

const ceoSidebarItems = [
    { icon: "fa-solid fa-chart-pie", textAr: "لوحة القيادة", textEn: "Dashboard", link: "ceo_dashboard.html" },
    { icon: "fa-solid fa-chess", textAr: "الاستراتيجية والأهداف", textEn: "Strategy & OKRs", link: "ceo_strategy.html" },
    { icon: "fa-solid fa-chart-line", textAr: "المالية والاستثمار", textEn: "Finance & Invest", link: "ceo_finance.html" },
    { icon: "fa-solid fa-scale-balanced", textAr: "الحوكمة والمخاطر", textEn: "GRC & Board", link: "ceo_governance.html" },
    { type: "divider" },
    { icon: "fa-solid fa-bullhorn", textAr: "التعاميم والتوجيهات", textEn: "Announcements", link: "ceo_broadcast.html" },
    { icon: "fa-solid fa-comments", textAr: "التواصل الداخلي", textEn: "Internal Chat", link: "ceo_communication.html" },
    { icon: "fa-solid fa-inbox", textAr: "صندوق الشكاوي", textEn: "Complaints Box", link: "ceo_feedback.html", badge: "2" },
    { type: "divider" },
    { icon: "fa-solid fa-user-tie", textAr: "ملفي الشخصي", textEn: "My Profile", link: "ceo_profile.html" },
];

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'ar';
    const isRtl = lang === 'ar';
    
    // 1. ضبط إعدادات الصفحة الأساسية
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.body.classList.add('bg-slate-50', 'dark:bg-slate-900', 'text-slate-800', 'dark:text-slate-100', 'transition-opacity', 'duration-500'); // Smooth fade-in

    // 2. تحديد العناصر
    const sidebarContainer = document.getElementById('sidebar-container');
    const headerContainer = document.getElementById('header-container');
    const mainWrapper = document.querySelector('.main-content-wrapper');

    // 3. ضبط الهوامش (الحل الجذري للخلل)
    // في الشاشات الكبيرة: ابعد المحتوى بمقدار عرض السايدبار (18rem = 72 tailwind unit)
    if (mainWrapper) {
        if (isRtl) {
            mainWrapper.classList.add('md:mr-72');
            mainWrapper.classList.remove('md:ml-72');
        } else {
            mainWrapper.classList.add('md:ml-72');
            mainWrapper.classList.remove('md:mr-72');
        }
        mainWrapper.classList.add('transition-all', 'duration-300', 'min-h-screen', 'flex', 'flex-col');
    }

    // 4. بناء السايدبار (Sidebar)
    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} z-50 w-72 h-screen bg-slate-900 text-white shadow-2xl flex flex-col transition-transform duration-300">
                <div class="h-20 flex items-center justify-center border-b border-slate-800 bg-slate-950/30">
                    <h1 class="text-2xl font-bold tracking-wider flex items-center gap-2">
                        <i class="fa-solid fa-layer-group text-brandRed"></i> 
                        <span>Andro<span class="text-brandRed">Gov</span></span>
                    </h1>
                </div>

                <div class="p-6 text-center border-b border-slate-800 bg-slate-800/20">
                    <div class="relative w-20 h-20 mx-auto mb-3">
                        <img src="${ceoUser.avatar}" class="w-full h-full rounded-full border-4 border-slate-700 shadow-md object-cover">
                        <span class="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></span>
                    </div>
                    <h3 class="font-bold text-lg text-white truncate px-2">${isRtl ? ceoUser.name : ceoUser.nameEn}</h3>
                    <p class="text-xs text-slate-400 uppercase tracking-widest mt-1">${isRtl ? ceoUser.role : ceoUser.roleEn}</p>
                </div>

                <nav class="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scroll">
                    ${ceoSidebarItems.map(item => {
                        if (item.type === 'divider') return `<hr class="border-slate-800 my-4 mx-4 opacity-50">`;
                        
                        const isActive = window.location.pathname.includes(item.link);
                        // تصميم الزر: نشط vs غير نشط
                        const activeClasses = isActive 
                            ? 'bg-gradient-to-r from-brandRed to-red-700 text-white shadow-lg shadow-red-900/40 translate-x-1' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1';

                        const label = isRtl ? item.textAr : item.textEn;
                        
                        return `
                            <a href="${item.link}" class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group mb-1 ${activeClasses}">
                                <div class="w-6 flex justify-center"><i class="${item.icon} text-lg transition-transform group-hover:scale-110"></i></div>
                                <span class="font-medium text-sm flex-1">${label}</span>
                                ${item.badge ? `<span class="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">${item.badge}</span>` : ''}
                            </a>
                        `;
                    }).join('')}
                </nav>

                <div class="p-4 border-t border-slate-800 bg-slate-950/30">
                    <button onclick="logout()" class="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-red-900/20 hover:text-red-400 rounded-xl transition-colors duration-200 group">
                        <i class="fa-solid fa-power-off group-hover:rotate-90 transition-transform"></i>
                        <span class="font-medium text-sm">${isRtl ? 'تسجيل الخروج' : 'Logout'}</span>
                    </button>
                </div>
            </aside>
        `;
    }

    // 5. بناء الهيدر (Header)
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-20 flex items-center justify-between px-8 sticky top-0 z-40">
                
                <div class="hidden md:block">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800">
                        ${isRtl ? 'بوابة الإدارة التنفيذية' : 'Executive Portal'}
                    </span>
                </div>

                <div class="flex items-center gap-3 w-full md:w-auto justify-end">
                    
                    <button onclick="toggleCeoLanguage()" class="h-10 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition font-bold text-xs flex items-center gap-2">
                        <i class="fa-solid fa-globe"></i> ${isRtl ? 'English' : 'عربي'}
                    </button>

                    <div class="relative group">
                        <button class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center relative">
                            <i class="fa-regular fa-bell text-lg"></i>
                            <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full animate-pulse"></span>
                        </button>
                    </div>

                    <button onclick="toggleTheme()" class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center">
                        <i class="fa-regular fa-moon dark:hidden"></i>
                        <i class="fa-regular fa-sun hidden dark:block"></i>
                    </button>

                </div>
            </header>
        `;
    }

    // 6. إظهار الصفحة بعد اكتمال البناء (حل مشكلة الشاشة البيضاء)
    setTimeout(() => {
        document.body.classList.remove('opacity-0');
    }, 50);
}

// --- Helper Functions ---

function toggleCeoLanguage() {
    const current = localStorage.getItem('lang') || 'ar';
    localStorage.setItem('lang', current === 'ar' ? 'en' : 'ar');
    location.reload(); 
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
}

function logout() {
    if(confirm('هل أنت متأكد من تسجيل الخروج؟')) window.location.href = 'login.html';
}
