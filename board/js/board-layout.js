/**
 * AndroGov Board Portal Engine v7.0
 * @description Enterprise-grade layout and logic for Board/Committee members
 * @version 7.0.0
 * @requires AppConfig, I18n, DataService, Chart.js
 */

const BoardLayout = (function() {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    let _state = {
        currentUser: null,
        currentView: 'dashboard',
        isInitialized: false,
        chartInstance: null,
        activeContext: 'board' // 'board' or 'committee_id'
    };

    // ==========================================
    // MENU CONFIGURATION
    // ==========================================
    const _menuStructure = [
        { 
            id: 'main', 
            items: [
                { key: 'dashboard', icon: 'fa-chart-pie', labelKey: 'nav.dashboard', view: 'dashboard' },
                { key: 'meetings', icon: 'fa-calendar-days', labelKey: 'nav.meetings', view: 'meetings' },
                { key: 'resolutions', icon: 'fa-file-signature', labelKey: 'nav.resolutions', view: 'resolutions', badge: 2 },
                { key: 'library', icon: 'fa-book-bookmark', labelKey: 'nav.library', view: 'library' }
            ]
        },
        // Secretary Tools (Only rendered if role permits)
        { 
            id: 'secretary', 
            role: 'Secretary', 
            items: [
                { key: 'manage', icon: 'fa-briefcase', labelKey: 'nav.secretaryTools', view: 'secretary', specialClass: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20' }
            ]
        }
    ];

    // ==========================================
    // INITIALIZATION
    // ==========================================
    async function init() {
        if (_state.isInitialized) return;

        console.log('🚀 Initializing Board Portal Engine v7.0...');

        // 1. Dependency Check
        if (typeof AppConfig === 'undefined' || typeof DataService === 'undefined') {
            console.error('❌ Critical Error: Core dependencies (AppConfig, DataService) missing.');
            return;
        }

        // 2. Initialize Config
        AppConfig.init();

        // 3. Load User Context
        await _loadUserContext();

        // 4. Render Core Components
        renderSidebar();
        renderHeader();
        
        // 5. Initial View Load
        switchView('dashboard'); // Default view

        // 6. Setup Listeners & Remove Loader
        _setupEventListeners();
        _removeLoader();

        _state.isInitialized = true;
    }

    // ==========================================
    // CORE LOGIC
    // ==========================================
    async function _loadUserContext() {
        // Try to get user from shared AppConfig first
        let user = AppConfig.getCurrentUser();

        // If no user in session, fetch default/mock for Board Portal
        if (!user) {
            // In production, this would redirect to login. For demo, we load a default Board Member.
            // Using DataService to ensure data consistency
            const allUsers = DataService.getUsers();
            user = allUsers.find(u => u.role === 'Secretary') || allUsers[0]; 
            AppConfig.setCurrentUser(user);
        }

        _state.currentUser = user;
        console.log('👤 Board User Loaded:', user.name.en);
    }

    function _removeLoader() {
        const loader = document.getElementById('loadingOverlay');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }

    // ==========================================
    // RENDERERS (Sidebar & Header)
    // ==========================================
    function renderSidebar() {
        const lang = AppConfig.getLang();
        const user = _state.currentUser;
        
        // 1. User Profile in Sidebar
        const name = lang === 'ar' ? user.name.ar : user.name.en;
        const role = user.role; // You might want to translate this using a helper
        const avatar = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

        document.getElementById('sidebarName').innerText = name;
        document.getElementById('sidebarRole').innerText = role;
        document.getElementById('sidebarAvatar').src = avatar;

        // 2. Generate Menu Items
        const navContainer = document.querySelector('aside nav');
        if (!navContainer) return;

        let navHTML = '';

        _menuStructure.forEach(section => {
            // RBAC Check
            if (section.role && section.role !== user.role) return;

            if (section.id === 'secretary') {
                navHTML += `<div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <p class="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">${lang === 'ar' ? 'أمانة السر' : 'Secretary Office'}</p>`;
            }

            section.items.forEach(item => {
                // Get Label (Mocking I18n if not fully implemented in board pages)
                // Ideally: const label = I18n.t(item.labelKey);
                const labelMap = {
                    'nav.dashboard': { ar: 'الرئيسية', en: 'Dashboard' },
                    'nav.meetings': { ar: 'الاجتماعات', en: 'Meetings' },
                    'nav.resolutions': { ar: 'القرارات', en: 'Resolutions' },
                    'nav.library': { ar: 'المكتبة', en: 'Library' },
                    'nav.secretaryTools': { ar: 'إدارة المجلس', en: 'Manage Board' }
                };
                const label = labelMap[item.labelKey][lang];
                const activeClass = item.view === _state.currentView ? 'active bg-brandRed text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50';
                const specialClass = item.specialClass || '';
                const badgeHTML = item.badge ? `<span class="ms-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">${item.badge}</span>` : '';

                navHTML += `
                    <a href="#" onclick="BoardLayout.switchView('${item.view}')" id="nav-${item.view}" class="nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeClass} ${specialClass}">
                        <i class="fa-solid ${item.icon} w-5 text-center"></i>
                        <span class="text-sm font-bold flex-1">${label}</span>
                        ${badgeHTML}
                    </a>
                `;
            });

            if (section.id === 'secretary') navHTML += `</div>`;
        });

        navContainer.innerHTML = navHTML;
    }

    function renderHeader() {
        const lang = AppConfig.getLang();
        
        // Update Page Title based on current view
        const titleMap = {
            'dashboard': { ar: 'لوحة المعلومات', en: 'Dashboard' },
            'meetings': { ar: 'جدول الاجتماعات', en: 'Meetings Schedule' },
            'resolutions': { ar: 'القرارات والتصويت', en: 'Voting Center' },
            'library': { ar: 'المكتبة الرقمية', en: 'Digital Library' },
            'secretary': { ar: 'مركز أمانة السر', en: 'Secretary Command Center' }
        };
        
        const titleEl = document.getElementById('pageTitle');
        if (titleEl) titleEl.innerText = titleMap[_state.currentView][lang];

        // Header User Info (If separate from sidebar)
        // ... (Optional implementation)
    }

    // ==========================================
    // VIEW CONTROLLER
    // ==========================================
    function switchView(viewId) {
        // 1. Update State
        _state.currentView = viewId;

        // 2. DOM Manipulation: Hide all views, show target
        document.querySelectorAll('[id^="view-"]').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('animate-fade-in');
        });

        const targetView = document.getElementById(`view-${viewId}`);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('animate-fade-in');
        }

        // 3. Update Navigation State
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active', 'bg-brandRed', 'text-white', 'shadow-lg');
            // Re-apply base styles if needed, handled by CSS mostly
            if (!el.classList.contains('text-purple-600')) { // Don't mess with special buttons
                el.classList.add('text-slate-500');
            }
        });

        const activeNav = document.getElementById(`nav-${viewId}`);
        if (activeNav) {
            activeNav.classList.add('active', 'bg-brandRed', 'text-white', 'shadow-lg');
            activeNav.classList.remove('text-slate-500');
        }

        // 4. Update Header
        renderHeader();

        // 5. Trigger View-Specific Logic (Lazy Loading)
        if (viewId === 'dashboard') _renderDashboardLogic();
        if (viewId === 'meetings') _renderMeetingsLogic();
    }

    // ==========================================
    // SUB-MODULE: DASHBOARD LOGIC
    // ==========================================
    function _renderDashboardLogic() {
        const lang = AppConfig.getLang();
        const user = _state.currentUser;
        const name = lang === 'ar' ? user.name.ar : user.name.en;

        // Welcome Message
        const dashNameEl = document.getElementById('dashName');
        if (dashNameEl) dashNameEl.innerText = name.split(' ')[0]; // First name

        // Render Chart (If Chart.js is loaded)
        if (typeof Chart !== 'undefined') {
            const ctx = document.getElementById('boardChart');
            if (ctx) {
                if (_state.chartInstance) _state.chartInstance.destroy();
                _state.chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                        datasets: [{
                            label: lang === 'ar' ? 'نسبة الحضور' : 'Attendance',
                            data: [98, 95, 92, 100],
                            backgroundColor: '#4267B2',
                            borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: { y: { beginAtZero: true, max: 100 } }
                    }
                });
            }
        }
    }

    // ==========================================
    // SUB-MODULE: MEETINGS LOGIC
    // ==========================================
    function _renderMeetingsLogic() {
        // Here we would pull data from DataService.getMeetings()
        // and dynamically populate the table in 'view-meetings'
        console.log('Rendering Meetings Table...');
    }

    // ==========================================
    // ACTION HANDLERS (Public)
    // ==========================================
    function logout() {
        const msg = AppConfig.getLang() === 'ar' ? 'هل أنت متأكد من تسجيل الخروج؟' : 'Are you sure you want to logout?';
        if (confirm(msg)) {
            // Clear session (if any)
            window.location.href = '../index.html'; // Adjust path as needed
        }
    }

    function toggleLang() {
        AppConfig.toggleLang();
        location.reload(); // Simplest way to refresh translations across the board
    }

    function castVote(type) {
        document.getElementById('signModal').classList.remove('hidden');
    }

    function confirmVote() {
        document.getElementById('signModal').classList.add('hidden');
        // Toast logic here
        alert(AppConfig.getLang() === 'ar' ? 'تم اعتماد التصويت.' : 'Vote Confirmed.');
        switchView('dashboard');
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    function _setupEventListeners() {
        // Sign Modal Close
        const closeModalBtn = document.querySelector('#signModal button[data-action="close"]');
        if(closeModalBtn) closeModalBtn.addEventListener('click', () => document.getElementById('signModal').classList.add('hidden'));
    }

    // ==========================================
    // EXPOSE PUBLIC API
    // ==========================================
    return {
        init: init,
        switchView: switchView,
        logout: logout,
        toggleLang: toggleLang,
        castVote: castVote,
        confirmVote: confirmVote
    };

})();

// ==========================================
// AUTO-START
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    BoardLayout.init();
});
