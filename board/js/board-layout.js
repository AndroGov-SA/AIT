/**
 * AndroGov Board Portal Layout Engine v7.0
 * @description specialized layout engine for Board Members & Committees
 * @version 7.0.0
 * @requires AppConfig, I18n, DataService, Chart.js
 */

const BoardLayout = (function() {
    // ==========================================
    // STATE
    // ==========================================
    let _state = {
        currentUser: null,
        isInitialized: false,
        sidebarOpen: false,
        activeTab: 'dashboard',
        chartInstance: null
    };

    // ==========================================
    // MENU STRUCTURE (Board Specific)
    // ==========================================
    const _menuStructure = [
        { section: 'main', items: [
            { key: 'dashboard', icon: 'fa-chart-pie', link: 'index.html' }
        ]},
        { section: 'governance', items: [
            { key: 'meetings', icon: 'fa-calendar-days', link: 'meetings.html' },
            { key: 'resolutions', icon: 'fa-file-signature', link: 'communication.html' }, // Shared view for comms & voting
            { key: 'library', icon: 'fa-box-archive', link: 'library.html' } // Assuming a library page exists or will exist
        ]},
        { section: 'reports', items: [
            { key: 'finance', icon: 'fa-chart-line', link: 'finance.html' }
        ]},
        // Secretary Tools (Conditional)
        { section: 'secretary', role: 'Secretary', items: [
            { key: 'manage', icon: 'fa-briefcase', link: 'secretary.html' }
        ]}
    ];

    // ==========================================
    // INITIALIZATION
    // ==========================================
    async function init() {
        if (_state.isInitialized) return;

        console.log('🚀 Initializing Board Portal Engine...');

        // 1. Core Dependencies Check
        if (typeof AppConfig === 'undefined' || typeof DataService === 'undefined') {
            console.error('❌ Critical: Core dependencies missing.');
            return;
        }

        // 2. Initialize Config
        AppConfig.init();

        // 3. Load User Context
        await _loadUserContext();

        // 4. Render Layout Components
        renderSidebar();
        renderHeader();

        // 5. Apply Translations
        if (typeof I18n !== 'undefined') I18n.applyToDOM();

        // 6. Remove Loader & Show Content
        _revealUI();

        _state.isInitialized = true;
    }

    // ==========================================
    // CORE LOGIC
    // ==========================================
    async function _loadUserContext() {
        // Try getting user from shared AppConfig (Session)
        let user = AppConfig.getCurrentUser();

        // Fallback for independent Board Portal testing
        if (!user) {
            const allUsers = DataService.getUsers();
            // Default to Secretary for full demo access
            user = allUsers.find(u => u.role === 'Secretary') || allUsers[0];
            AppConfig.setCurrentUser(user);
        }

        _state.currentUser = user;
    }

    function _revealUI() {
        const loader = document.getElementById('loadingOverlay');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
        document.body.classList.add('loaded');
    }

    // ==========================================
    // RENDERERS
    // ==========================================
    function renderSidebar() {
        const container = document.getElementById('sidebar-container');
        if (!container) return;

        const lang = AppConfig.getLang();
        const user = _state.currentUser;
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // User Data
        const name = lang === 'ar' ? user.name.ar : user.name.en;
        const role = user.role; // Helper needed for translation in real app
        const avatar = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

        // Build Menu HTML
        let menuHTML = '';
        
        _menuStructure.forEach(group => {
            // RBAC: Check if group requires specific role
            if (group.role && group.role !== user.role) return;

            // Section Label (Optional styling preference)
            const sectionLabel = group.section === 'secretary' 
                ? (lang === 'ar' ? 'أمانة السر' : 'Secretary Office') 
                : (lang === 'ar' ? 'القائمة' : 'Menu'); // Simplified for board

            if (group.items.length > 0) {
                // Add separator/label for specific sections if needed
                if (group.section === 'secretary') {
                    menuHTML += `<div class="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 dark:border-slate-700 pt-4">${sectionLabel}</div>`;
                }

                group.items.forEach(item => {
                    const isActive = currentPath === item.link;
                    // Labels (Mocking I18n keys for now)
                    const labels = {
                        'dashboard': { ar: 'الرئيسية', en: 'Dashboard' },
                        'meetings': { ar: 'الاجتماعات', en: 'Meetings' },
                        'resolutions': { ar: 'القرارات', en: 'Resolutions' },
                        'library': { ar: 'المكتبة', en: 'Library' },
                        'finance': { ar: 'التقارير المالية', en: 'Financial Reports' },
                        'manage': { ar: 'إدارة المجلس', en: 'Board Management' }
                    };
                    const label = labels[item.key] ? labels[item.key][lang] : item.key;

                    const activeClass = "bg-brandRed text-white shadow-md shadow-red-500/20";
                    const inactiveClass = "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800";
                    const specialClass = group.section === 'secretary' ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/10' : '';

                    // If active, override special class
                    const finalClass = isActive ? activeClass : (specialClass || inactiveClass);

                    menuHTML += `
                        <a href="${item.link}" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all mb-1 ${finalClass}">
                            <i class="fa-solid ${item.icon} w-5 text-center"></i>
                            <span>${label}</span>
                        </a>
                    `;
                });
            }
        });

        // Full Sidebar HTML Injection
        container.innerHTML = `
            <aside class="fixed top-0 ${lang === 'ar' ? 'right-0 border-l' : 'left-0 border-r'} h-full w-72 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 z-30 flex flex-col hidden md:flex transition-all">
                <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-700 gap-3">
                    <div class="w-10 h-10 bg-brandRed rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">A</div>
                    <div>
                        <h1 class="font-bold text-lg text-slate-800 dark:text-white">AndroGov</h1>
                        <p class="text-[10px] text-slate-400 uppercase tracking-widest">Board Portal</p>
                    </div>
                </div>

                <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                    <img src="${avatar}" class="w-12 h-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-600">
                    <div>
                        <h4 class="text-sm font-bold text-slate-800 dark:text-white">${name}</h4>
                        <p class="text-[10px] text-slate-500 uppercase font-bold">${role}</p>
                    </div>
                </div>

                <nav class="flex-1 overflow-y-auto p-4 custom-scroll">
                    ${menuHTML}
                </nav>

                <div class="p-4 border-t border-slate-100 dark:border-slate-700">
                    <button onclick="BoardLayout.logout()" class="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
                        <i class="fa-solid fa-right-from-bracket w-5"></i>
                        <span>${lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                    </button>
                </div>
            </aside>
        `;
    }

    function renderHeader() {
        const container = document.getElementById('header-container');
        if (!container) return;

        const lang = AppConfig.getLang();
        const pageTitle = document.title.split('|')[0].trim();

        container.innerHTML = `
            <header class="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-700 flex justify-between items-center px-8 sticky top-0 z-20 transition-all">
                <div class="flex items-center gap-4">
                    <button class="md:hidden text-slate-500"><i class="fa-solid fa-bars text-xl"></i></button>
                    
                    <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                        <i class="fa-solid fa-chess-king text-brandRed"></i> <span>${pageTitle}</span>
                    </h2>
                </div>

                <div class="flex items-center gap-4">
                    <div class="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <button class="px-4 py-1.5 text-xs font-bold bg-white dark:bg-slate-700 shadow-sm rounded-md text-brandBlue">المجلس</button>
                        <button class="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">المراجعة</button>
                    </div>

                    <button onclick="BoardLayout.toggleLang()" class="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                        ${lang === 'ar' ? 'EN' : 'عربي'}
                    </button>
                    
                    <button class="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition relative">
                        <i class="fa-regular fa-bell"></i>
                        <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                    </button>
                </div>
            </header>
        `;
    }

    // ==========================================
    // PUBLIC ACTIONS
    // ==========================================
    function logout() {
        if(confirm(AppConfig.getLang() === 'ar' ? 'تسجيل الخروج؟' : 'Logout?')) {
            window.location.href = '../index.html';
        }
    }

    function toggleLang() {
        AppConfig.toggleLang();
        location.reload();
    }

    // Exposed API
    return {
        init,
        logout,
        toggleLang
    };

})();

// ==========================================
// AUTO-START
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    BoardLayout.init();
});
