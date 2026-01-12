/**
 * AndroGov - CEO Layout Manager
 * يدير القائمة الجانبية، الهيدر، الإشعارات، ويحل مشكلة الشاشة البيضاء
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
    // 1. تشغيل التخطيط
    renderCeoLayout();
    
    // 2. حل مشكلة الشاشة البيضاء (إظهار الصفحة)
    setTimeout(() => {
        document.body.classList.remove('opacity-0');
        document.body.classList.add('opacity-100');
    }, 100); // تأخير بسيط جداً لضمان تحميل العناصر
});

function renderCeoLayout() {
    const lang = localStorage.getItem('lang') || 'ar';
    const isRtl = lang === 'ar';
    
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    const sidebarContainer = document.getElementById('sidebar-container');
    const headerContainer = document.getElementById('header-container');
    const mainContent = document.querySelector('.main-content-wrapper');

    // بناء القائمة الجانبية
    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} z-50 w-72 h-screen bg-slate-900 text-white transition-all duration-300 shadow-2xl flex flex-col">
                <div class="h-20 flex items-center justify-center border-b border-slate-800">
                    <h1 class="text-2xl font-bold tracking-wider flex items-center gap-2">
                        <i class="fa-solid fa-layer-group text-brandRed"></i> 
                        <span>Andro<span class="text-brandRed">Gov</span></span>
                    </h1>
                </div>
                <div class="p-6 text-center border-b border-slate-800 bg-slate-800/50">
                    <div class="relative w-20 h-20 mx-auto mb-3">
                        <img src="${ceoUser.avatar}" class="w-full h-full rounded-full border-4 border-slate-700 shadow-lg">
                        <span class="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full" title="Online"></span>
                    </div>
                    <h3 class="font-bold text-lg text-white">${isRtl ? ceoUser.name : ceoUser.nameEn}</h3>
                    <p class="text-xs text-slate-400 uppercase tracking-wide mt-1">${isRtl ? ceoUser.role : ceoUser.roleEn}</p>
                </div>
                <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scroll">
                    ${ceoSidebarItems.map(item => {
                        if (item.type === 'divider') return `<hr class="border-slate-800 my-4">`;
                        const isActive = window.location.pathname.includes(item.link);
                        const activeClass = isActive ? 'bg-brandRed text-white shadow-lg shadow-red-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white';
                        const label = isRtl ? item.textAr : item.textEn;
                        return `
                            <a href="${item.link}" class="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeClass}">
                                <i class="${item.icon} w-6 text-center text-lg group-hover:scale-110 transition-transform"></i>
                                <span class="font-medium text-sm flex-1">${label}</span>
                                ${item.badge ? `<span class="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">${item.badge}</span>` : ''}
                            </a>
                        `;
                    }).join('')}
                </nav>
                <div class="p-4 border-t border-slate-800">
                    <button onclick="logout()" class="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-slate-800 hover:text-red-400 rounded-xl transition">
                        <i class="fa-solid fa-power-off"></i>
                        <span class="font-medium text-sm">${isRtl ? 'تسجيل الخروج' : 'Logout'}</span>
                    </button>
                </div>
            </aside>
        `;
    }

    // بناء الهيدر
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 h-20 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-300 ${isRtl ? 'md:mr-72' : 'md:ml-72'}">
                <div class="hidden md:block">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">${isRtl ? 'بوابة الإدارة التنفيذية' : 'EXECUTIVE PORTAL'}</span>
                </div>
                <div class="flex items-center gap-4 mr-auto w-full md:w-auto justify-end">
                    <button onclick="toggleCeoLanguage()" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-center font-bold text-xs border border-slate-200 dark:border-slate-700">
                        ${isRtl ? 'EN' : 'عربي'}
                    </button>
                    <button class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-center border border-slate-200 dark:border-slate-700 relative">
                        <i class="fa-regular fa-bell text-lg"></i>
                        <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full animate-pulse"></span>
                    </button>
                    <button onclick="document.documentElement.classList.toggle('dark')" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <i class="fa-regular fa-moon dark:hidden"></i>
                        <i class="fa-regular fa-sun hidden dark:block"></i>
                    </button>
                </div>
            </header>
        `;
    }

    // ضبط الهوامش
    if (mainContent) {
        mainContent.className = `main-content-wrapper transition-all duration-300 flex flex-col min-h-screen pt-0 ${isRtl ? 'md:mr-72' : 'md:ml-72'}`;
    }
}

function toggleCeoLanguage() {
    const current = localStorage.getItem('lang') || 'ar';
    localStorage.setItem('lang', current === 'ar' ? 'en' : 'ar');
    location.reload(); 
}

function logout() {
    if(confirm('Log out?')) window.location.href = 'login.html';
}
