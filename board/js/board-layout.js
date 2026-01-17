/**
 * Board Portal Engine v2.0 (Integrated)
 */
const BoardLayout = (function() {
    
    let state = {
        user: null,
        currentView: 'dashboard'
    };

    function init() {
        console.log("Board Engine Starting...");
        
        // 1. Load User (Mock or from Admin)
        if (typeof AppConfig !== 'undefined' && AppConfig.getCurrentUser()) {
            state.user = AppConfig.getCurrentUser();
        } else {
            // Default Mock User (Secretary for Demo)
            state.user = {
                name: { ar: "م. هشام السحيباني", en: "Eng. Hesham" },
                role: "Secretary", // Change to 'Member' to hide tools
                avatar: "../photo/ceo.jpeg"
            };
        }

        // 2. Setup UI
        setupSidebar();
        setupDashboard();
        renderMeetings();
        
        // 3. Remove Loader
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.add('hidden');
        }, 500);
    }

    function setupSidebar() {
        const user = state.user;
        const lang = 'ar'; // Force AR for now based on HTML
        const name = lang === 'ar' ? user.name.ar : user.name.en;

        document.getElementById('sidebarName').innerText = name;
        document.getElementById('dashName').innerText = name.split(' ')[0];
        document.getElementById('sidebarRole').innerText = user.role === 'Secretary' ? 'أمين السر' : 'عضو مجلس';
        document.getElementById('sidebarAvatar').src = user.avatar;

        if (user.role === 'Secretary') {
            document.getElementById('secMenu').classList.remove('hidden');
        }
    }

    function setupDashboard() {
        // Render Chart
        const ctx = document.getElementById('boardChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: 'الحضور',
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

    function renderMeetings() {
        const tbody = document.getElementById('meetingsTableBody');
        if (!tbody) return;

        // Mock Meetings Data
        const meetings = [
            { id: 'BOD-01', title: 'اجتماع مجلس الإدارة الأول', date: '15 Feb 2026', type: 'حضوري', status: 'مجدول', color: 'blue' },
            { id: 'BOD-02', title: 'اجتماع طارئ', date: '20 Jan 2026', type: 'عن بعد', status: 'منعقد', color: 'green' }
        ];

        tbody.innerHTML = meetings.map(m => `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                <td class="p-4 font-bold text-slate-800">${m.title}</td>
                <td class="p-4 text-xs font-mono text-slate-500">${m.date}</td>
                <td class="p-4 text-center text-xs">${m.type}</td>
                <td class="p-4 text-center"><span class="bg-${m.color}-50 text-${m.color}-700 px-2 py-1 rounded text-[10px] font-bold">${m.status}</span></td>
                <td class="p-4 text-center"><button class="text-slate-400 hover:text-brandBlue"><i class="fa-solid fa-eye"></i></button></td>
            </tr>
        `).join('');
    }

    // --- Public Actions ---

    function switchView(viewId) {
        // Hide all views
        document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.add('hidden'));
        // Show target
        document.getElementById(`view-${viewId}`).classList.remove('hidden');
        
        // Update Sidebar Active
        document.querySelectorAll('.nav-link').forEach(el => {
            el.classList.remove('active', 'bg-brandRed', 'text-white');
            el.classList.add('text-slate-500');
        });
        
        const btn = document.getElementById(`nav-${viewId}`);
        if(btn) {
            btn.classList.add('active', 'bg-brandRed', 'text-white');
            btn.classList.remove('text-slate-500');
        }

        // Title Map
        const titles = {
            'dashboard': 'لوحة القيادة', 'meetings': 'الاجتماعات', 
            'resolutions': 'القرارات', 'library': 'المكتبة', 'secretary': 'أمانة السر'
        };
        document.getElementById('pageTitle').innerText = titles[viewId];
    }

    function castVote(type) {
        document.getElementById('signModal').classList.remove('hidden');
    }

    function confirmVote() {
        document.getElementById('signModal').classList.add('hidden');
        alert('تم اعتماد التصويت والتوقيع بنجاح.');
        switchView('dashboard');
    }

    function logout() {
        if(confirm('تسجيل الخروج؟')) window.location.href = '../index.html';
    }

    return {
        init,
        switchView,
        castVote,
        confirmVote,
        logout
    };

})();

// Auto Start
document.addEventListener('DOMContentLoaded', () => {
    BoardLayout.init();
});
