/**
 * Board Portal Layout Manager
 * Handles navigation, user info injection, and view switching for Board Members.
 */

const BoardLayout = {
    // Current State
    currentUser: null,
    currentView: 'dashboard',

    init: function() {
        this.loadUser();
        this.setupNavigation();
        this.checkPermissions();
        this.renderInitialView();
        
        // Initialize Shared Components
        if (typeof Bot !== 'undefined') Bot.init();
    },

    loadUser: function() {
        // In a real app, this comes from API/Session. 
        // Here we use AppConfig or mock it if missing.
        if (typeof AppConfig !== 'undefined' && AppConfig.getCurrentUser()) {
            this.currentUser = AppConfig.getCurrentUser();
        } else {
            // Fallback Mock for Demo
            this.currentUser = {
                name: { ar: "م. هشام السحيباني", en: "Eng. Hesham Al-Suhaibani" },
                role: "Secretary", // Change to 'Member' to hide secretary tools
                avatar: "../photo/ceo.jpeg"
            };
        }

        this.updateUIWithUserData();
    },

    updateUIWithUserData: function() {
        const lang = document.documentElement.lang || 'ar';
        const name = lang === 'ar' ? this.currentUser.name.ar : this.currentUser.name.en;
        const roleTitle = this.currentUser.role === 'Secretary' 
            ? (lang === 'ar' ? 'أمين السر' : 'Board Secretary') 
            : (lang === 'ar' ? 'عضو مجلس' : 'Board Member');

        // Update Sidebar & Header Elements
        const elements = ['userName', 'dashName', 'sidebarName'];
        elements.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.innerText = id === 'dashName' ? name.split(' ')[1] : name;
        });

        const roleEls = ['userRole', 'sidebarRole'];
        roleEls.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.innerText = roleTitle;
        });

        const avatarEls = ['userAvatar', 'sidebarAvatar'];
        avatarEls.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.src = this.currentUser.avatar;
        });
    },

    checkPermissions: function() {
        // Show Secretary Tools only if role is Secretary
        if (this.currentUser.role === 'Secretary') {
            const secNav = document.getElementById('secNavSection');
            if(secNav) secNav.classList.remove('hidden');
        }
    },

    showView: function(viewId) {
        // 1. Hide all views
        document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.add('hidden'));
        
        // 2. Show target view
        const target = document.getElementById(`view-${viewId}`);
        if(target) target.classList.remove('hidden');
        
        // 3. Update Sidebar Active State
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active', 'bg-brandRed', 'text-white');
            // Re-add hover classes if removed
            if(document.documentElement.classList.contains('dark')) {
                el.classList.add('text-slate-400'); 
            } else {
                el.classList.add('text-slate-500');
            }
        });

        // 4. Highlight clicked item (Simple lookup based on onclick attribute)
        // Note: In a robust app, we'd use data-attributes. For now, we assume the click triggers this.
        if(event && event.currentTarget) {
            const btn = event.currentTarget;
            btn.classList.add('active', 'bg-brandRed', 'text-white');
            btn.classList.remove('text-slate-500', 'text-slate-400');
        }

        // 5. Update Page Title
        const titles = {
            'dashboard': { ar: 'لوحة المعلومات', en: 'Dashboard' },
            'meetings': { ar: 'الاجتماعات', en: 'Meetings' },
            'decisions': { ar: 'القرارات', en: 'Decisions' },
            'library': { ar: 'المكتبة', en: 'Library' },
            'secretary': { ar: 'أمانة السر', en: 'Secretary Office' }
        };
        
        const lang = document.documentElement.lang || 'ar';
        const titleEl = document.getElementById('pageTitle');
        if(titleEl && titles[viewId]) {
            titleEl.innerText = titles[viewId][lang];
        }

        this.currentView = viewId;
    },

    renderInitialView: function() {
        // Default to dashboard
        this.showView('dashboard');
    },

    logout: function() {
        if(confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            window.location.href = '../index.html';
        }
    }
};

// Expose global functions for HTML onclick attributes
window.showView = (viewId) => BoardLayout.showView(viewId);
window.logout = () => BoardLayout.logout();

// Auto-init on load
document.addEventListener('DOMContentLoaded', () => {
    BoardLayout.init();
});
