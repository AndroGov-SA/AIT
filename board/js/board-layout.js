/**
 * Board Portal Engine v3.0 (Multi-Page Support)
 * المسار: board/js/board-layout.js
 */
const BoardLayout = (function() {
    
    let state = {
        user: null
    };

    function init() {
        // 1. Load User
        if (typeof AppConfig !== 'undefined' && AppConfig.getCurrentUser()) {
            state.user = AppConfig.getCurrentUser();
        } else {
            // Mock User
            state.user = {
                name: { ar: "م. هشام السحيباني", en: "Eng. Hesham" },
                role: "Secretary", 
                avatar: "../photo/ceo.jpeg"
            };
        }

        // 2. Render Shared Layout (Sidebar & Header)
        renderSidebar();
        renderHeader();

        // 3. Remove Loader
        setTimeout(() => {
            const loader = document.getElementById('loadingOverlay');
            if(loader) loader.classList.add('hidden');
        }, 500);
    }

    function renderSidebar() {
        const container = document.getElementById('sidebar-container');
        if(!container) return;

        // Determine active page based on filename
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

        const user = state.user;
        const name = user.name.ar; // Force Arabic for layout
        
        // القائمة الجانبية
        container.innerHTML = `
        <aside class="fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-800 border-l border-slate-100 dark:border-slate-700 z-30 flex flex-col hidden md:flex">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-700 gap-3">
                <div class="w-10 h-10 bg-brandRed rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">A</div>
                <div>
                    <h1 class="font-bold text-lg text-slate-800 dark:text-white">AndroGov</h1>
                    <p class="text-[10px] text-slate-400 uppercase tracking-widest">Board Portal</p>
                </div>
            </div>

            <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <img src="${user.avatar}" class="w-12 h-12 rounded-full object-cover border-2 border-slate-100">
                <div>
                    <h4 class="text-sm font-bold dark:text-white">${name}</h4>
                    <p class="text-[10px] text-slate-500 uppercase font-bold">${user.role === 'Secretary' ? 'أمين السر' : 'عضو مجلس'}</p>
                </div>
            </div>

            <nav class="flex-1 overflow-y-auto p-4 space-y-1">
                <p class="px-4 text-[10px] font-bold text-slate-400 uppercase mb-2">القائمة الرئيسية</p>
                
                <a href="index.html" class="nav-link ${page === 'index.html' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all">
                    <i class="fa-solid fa-chart-pie w-5 text-center"></i> <span>الرئيسية</span>
                </a>
                <a href="communication.html" class="nav-link ${page === 'communication.html' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 transition-all">
                    <i class="fa-solid fa-comments w-5 text-center"></i> <span>التواصل والقرارات</span>
                </a>
                <a href="meetings.html" class="nav-link ${page === 'meetings.html' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 transition-all">
                    <i class="fa-solid fa-calendar-days w-5 text-center"></i> <span>الاجتماعات</span>
                </a>
                <a href="finance.html" class="nav-link ${page === 'finance.html' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 transition-all">
                    <i class="fa-solid fa-chart-line w-5 text-center"></i> <span>التقارير المالية</span>
                </a>

                ${user.role === 'Secretary' ? `
                <div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <p class="px-4 text-[10px] font-bold text-slate-400 uppercase mb-2">أدوات خاصة</p>
                    <a href="secretary.html" class="nav-link ${page === 'secretary.html' ? 'active' : ''} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/20 transition-all">
                        <i class="fa-solid fa-briefcase w-5 text-center"></i> <span>أمانة السر</span>
                    </a>
                </div>` : ''}
            </nav>

            <div class="p-4 border-t border-slate-100 dark:border-slate-700">
                <button onclick="BoardLayout.logout()" class="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                    <i class="fa-solid fa-right-from-bracket w-5"></i> <span>تسجيل الخروج</span>
                </button>
            </div>
        </aside>`;
    }

    function renderHeader() {
        const container = document.getElementById('header-container');
        if(!container) return;
        
        // Get Page Title from HTML title tag
        const pageTitle = document.title.split('|')[0].trim();

        container.innerHTML = `
        <header class="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-700 flex justify-between items-center px-8 sticky top-0 z-20">
            <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                <i class="fa-solid fa-chess-king text-brandRed"></i> <span>${pageTitle}</span>
            </h2>
            <div class="flex items-center gap-4">
                <div class="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button class="px-4 py-1 text-xs font-bold bg-white dark:bg-slate-700 shadow-sm rounded-md text-brandBlue">المجلس</button>
                    <button class="px-4 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700">المراجعة</button>
                </div>
                <button class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition relative">
                    <i class="fa-regular fa-bell"></i>
                    <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
            </div>
        </header>`;
    }

    function logout() {
        if(confirm('تسجيل الخروج؟')) window.location.href = '../index.html';
    }

    return { init, logout };
})();

document.addEventListener('DOMContentLoaded', () => { BoardLayout.init(); });
