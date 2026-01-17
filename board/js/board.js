/**
 * ==========================================
 * Board Portal Engine (board.js) v2.0
 * ==========================================
 */

const BoardSystem = (function() {
    
    // State Management
    let state = {
        user: null,
        currentView: 'dashboard'
    };

    /**
     * Initialization Logic
     */
    function init() {
        console.log("🚀 Board System Starting...");
        
        // 1. Get User
        if (typeof AppConfig !== 'undefined' && AppConfig.getCurrentUser()) {
            state.user = AppConfig.getCurrentUser();
        } else {
            // Mock for testing if not logged in via Admin
            state.user = {
                name: { ar: "م. هشام السحيباني", en: "Eng. Hesham" },
                role: "Secretary", // Change to 'Member' to verify RBAC
                avatar: "../photo/ceo.jpeg"
            };
        }

        // 2. Render Components
        _setupSidebar();
        _setupDashboard();
        _renderMeetingsTable();
        
        // 3. Reveal UI
        setTimeout(() => {
            const loader = document.getElementById('loadingOverlay');
            if(loader) loader.classList.add('hidden');
        }, 500);
    }

    /**
     * Setup Sidebar & User Profile
     */
    function _setupSidebar() {
        const user = state.user;
        const lang = 'ar'; // Forced AR for layout context
        const name = lang === 'ar' ? user.name.ar : user.name.en;

        // Fill Data
        if(document.getElementById('sidebarName')) document.getElementById('sidebarName').innerText = name;
        if(document.getElementById('dashName')) document.getElementById('dashName').innerText = name.split(' ')[0];
        if(document.getElementById('sidebarRole')) document.getElementById('sidebarRole').innerText = user.role === 'Secretary' ? 'أمين السر' : 'عضو مجلس';
        if(document.getElementById('sidebarAvatar')) document.getElementById('sidebarAvatar').src = user.avatar;

        // Permission Check (RBAC)
        if (user.role === 'Secretary') {
            const secMenu = document.getElementById('secMenu');
            if(secMenu) secMenu.classList.remove('hidden');
        }
    }

    /**
     * Initialize Charts
     */
    function _setupDashboard() {
        const ctx = document.getElementById('boardChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['الربع 1', 'الربع 2', 'الربع 3', 'الربع 4'],
                    datasets: [{
                        label: 'نسبة الحضور',
                        data: [100, 95, 90, 100],
                        backgroundColor: '#4267B2',
                        borderRadius: 4
                    }, {
                        label: 'القرارات',
                        data: [5, 3, 8, 4],
                        backgroundColor: '#FB4747',
                        borderRadius: 4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
    }

    /**
     * Render Meetings Table (Mock Data Integration)
     */
    function _renderMeetingsTable() {
        const tbody = document.getElementById('meetingsTableBody');
        if (!tbody) return;

        // In real app, fetch from DataService.getMeetings()
        const meetings = [
            { id: 'BOD-01', title: 'اجتماع مجلس الإدارة الأول', date: '15 Feb 2026', type: 'حضوري', status: 'مجدول', color: 'blue' },
            { id: 'BOD-02', title: 'اجتماع طارئ', date: '20 Jan 2026', type: 'عن بعد', status: 'منعقد', color: 'green' }
        ];

        tbody.innerHTML = meetings.map(m => `
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition border-b border-slate-100 dark:border-slate-700">
                <td class="p-4 font-bold text-slate-800 dark:text-white">${m.title}</td>
                <td class="p-4 text-xs font-mono text-slate-500">${m.date}</td>
                <td class="p-4 text-center text-xs">${m.type}</td>
                <td class="p-4 text-center"><span class="bg-${m.color}-50 text-${m.color}-700 px-2 py-1 rounded text-[10px] font-bold">${m.status}</span></td>
                <td class="p-4 text-center"><button class="text-slate-400 hover:text-brandBlue"><i class="fa-solid fa-eye"></i></button></td>
            </tr>
        `).join('');
    }

    // ========================
    // PUBLIC METHODS
    // ========================

    function switchTab(tabId) {
        // Hide all views
        document.querySelectorAll('[id^="tab-"]').forEach(el => el.classList.add('hidden'));
        // Show target
        const target = document.getElementById(`tab-${tabId}`);
        if(target) {
            target.classList.remove('hidden');
            target.classList.add('animate-fade-in');
        }
        
        // Update Sidebar Active State
        document.querySelectorAll('.nav-link').forEach(el => {
            el.classList.remove('active');
            el.classList.add('text-slate-500');
        });
        
        const btn = document.getElementById(`nav-${tabId}`);
        if(btn) {
            btn.classList.add('active');
            btn.classList.remove('text-slate-500');
        }

        // Update Header Title
        const titles = {
            'dashboard': 'لوحة القيادة', 'meetings': 'الاجتماعات', 
            'resolutions': 'القرارات', 'library': 'المكتبة', 'secretary': 'أمانة السر'
        };
        document.getElementById('pageTitle').innerText = titles[tabId];
    }

    function castVote(type) {
        document.getElementById('signModal').classList.remove('hidden');
    }

    function confirmVote() {
        document.getElementById('signModal').classList.add('hidden');
        alert('تم اعتماد التصويت والتوقيع بنجاح.');
        switchTab('dashboard');
    }

    function logout() {
        if(confirm('هل أنت متأكد من تسجيل الخروج؟')) window.location.href = '../index.html';
    }

    // Expose Public API
    return {
        init: init,
        switchTab: switchTab,
        castVote: castVote,
        confirmVote: confirmVote,
        logout: logout
    };

})();

// Auto-run on load
document.addEventListener('DOMContentLoaded', () => {
    BoardSystem.init();
});
