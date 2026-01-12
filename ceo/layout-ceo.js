/**
 * AndroGov - CEO Layout Manager
 * يدير القائمة الجانبية، الهيدر، الإشعارات، والتحويل اللغوي لحساب الرئيس التنفيذي
 */

const ceoUser = {
    name: "هشام السحيباني",
    nameEn: "Hisham Al-Suhaibani",
    role: "الرئيس التنفيذي (CEO)",
    roleEn: "Chief Executive Officer",
    avatar: "https://ui-avatars.com/api/?name=Hisham+S&background=0F172A&color=fff&size=128"
};

const ceoSidebarItems = [
    { icon: "fa-solid fa-chart-pie", textAr: "لوحة القيادة", textEn: "Dashboard", link: "ceo_dashboard.html", active: true },
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
    renderCeoLayout();
    updateCeoLanguage();
});

function renderCeoLayout() {
    const lang = localStorage.getItem('lang') || 'ar';
    const isRtl = lang === 'ar';
    const sidebarContainer = document.getElementById('sidebar-container');
    const headerContainer = document.getElementById('header-container');

    // 1. Sidebar HTML (فخامة أكثر - لون داكن)
    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} z-50 w-72 h-screen bg-slate-900 text-white transition-transform duration-300 shadow-2xl flex flex-col">
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
                    <h3 class="font-bold text-lg text-white">${lang === 'ar' ? ceoUser.name : ceoUser.nameEn}</h3>
                    <p class="text-xs text-slate-400 uppercase tracking-wide mt-1">${lang === 'ar' ? ceoUser.role : ceoUser.roleEn}</p>
                </div>

                <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scroll">
                    ${ceoSidebarItems.map(item => {
                        if (item.type === 'divider') return `<hr class="border-slate-800 my-4">`;
                        
                        const isActive = window.location.pathname.includes(item.link) ? 'bg-brandRed text-white shadow-lg shadow-red-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white';
                        const label = lang === 'ar' ? item.textAr : item.textEn;
                        
                        return `
                            <a href="${item.link}" class="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive}">
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
                        <span class="font-medium text-sm">${lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                    </button>
                </div>
            </aside>
        `;
    }

    // 2. Header HTML (بسيط وأنيق)
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 h-20 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-300 ${isRtl ? 'md:mr-72' : 'md:ml-72'}">
                
                <div id="page-header-title" class="hidden md:block">
                    </div>

                <div class="flex items-center gap-4 mr-auto w-full md:w-auto justify-end">
                    
                    <button onclick="toggleCeoLanguage()" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-center font-bold text-xs border border-slate-200 dark:border-slate-700">
                        ${lang === 'ar' ? 'EN' : 'عربي'}
                    </button>

                    <div class="relative">
                        <button onclick="toggleNotifications()" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-center border border-slate-200 dark:border-slate-700 relative">
                            <i class="fa-regular fa-bell text-lg"></i>
                            <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full animate-pulse"></span>
                        </button>
                        
                        <div id="notif-panel" class="hidden absolute top-12 ${isRtl ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 transform origin-top transition-all">
                            <div class="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <h4 class="font-bold text-sm dark:text-white">${lang === 'ar' ? 'الإشعارات' : 'Notifications'}</h4>
                                <button class="text-xs text-brandRed hover:underline">${lang === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all read'}</button>
                            </div>
                            <div class="max-h-64 overflow-y-auto custom-scroll">
                                <div class="p-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer flex gap-3 items-start">
                                    <div class="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center mt-1"><i class="fa-solid fa-triangle-exclamation text-xs"></i></div>
                                    <div>
                                        <p class="text-xs font-bold text-slate-800 dark:text-white">انخفاض في السيولة النقدية</p>
                                        <p class="text-[10px] text-slate-500">تقرير المالية يشير إلى انخفاض 10%...</p>
                                        <span class="text-[9px] text-slate-400 mt-1 block">منذ 2 ساعة</span>
                                    </div>
                                </div>
                                <div class="p-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer flex gap-3 items-start">
                                    <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mt-1"><i class="fa-solid fa-file-signature text-xs"></i></div>
                                    <div>
                                        <p class="text-xs font-bold text-slate-800 dark:text-white">عقد شراكة بانتظار التوقيع</p>
                                        <p class="text-[10px] text-slate-500">شركة الحلول الرقمية - العقد النهائي...</p>
                                        <span class="text-[9px] text-slate-400 mt-1 block">منذ 5 ساعات</span>
                                    </div>
                                </div>
                            </div>
                            <div class="p-2 bg-slate-50 dark:bg-slate-700/30 text-center">
                                <a href="ceo_notifications.html" class="text-xs font-bold text-brandRed hover:underline">${lang === 'ar' ? 'عرض كل الإشعارات' : 'View All'}</a>
                            </div>
                        </div>
                    </div>

                    <button onclick="toggleTheme()" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <i class="fa-regular fa-moon dark:hidden"></i>
                        <i class="fa-regular fa-sun hidden dark:block"></i>
                    </button>

                </div>
            </header>
        `;
    }
    
    // Apply Margins
    const mainContent = document.querySelector('.main-content-wrapper');
    if(mainContent) {
        mainContent.className = `main-content-wrapper transition-all duration-300 flex flex-col min-h-screen pt-0 ${isRtl ? 'md:mr-72' : 'md:ml-72'}`;
    }
}

function updateCeoLanguage() {
    const lang = localStorage.getItem('lang') || 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    renderCeoLayout(); // Re-render to update texts and direction
}

function toggleCeoLanguage() {
    const current = localStorage.getItem('lang') || 'ar';
    localStorage.setItem('lang', current === 'ar' ? 'en' : 'ar');
    location.reload(); 
}

function toggleNotifications() {
    const panel = document.getElementById('notif-panel');
    panel.classList.toggle('hidden');
}

function logout() {
    if(confirm('Log out?')) window.location.href = 'login.html';
}
