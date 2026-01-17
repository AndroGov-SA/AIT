/**
 * ==========================================
 * Board Portal Engine (board-layout.js)
 * المسؤول عن تشغيل بوابة المجلس واللجان
 * ==========================================
 */

const BoardLayout = {
    // حالة النظام الحالية
    state: {
        currentUser: null,
        currentTab: 'dashboard',
        chartInstance: null
    },

    /**
     * نقطة البداية: تشغيل النظام
     */
    init: function() {
        console.log("Initializing Board Portal...");
        
        // 1. التحقق من تحميل ملفات النظام الأساسية
        if (typeof DataService === 'undefined' || typeof AppConfig === 'undefined') {
            console.error("System Core Files Missing! Please check script tags.");
            return;
        }

        // 2. تحميل بيانات المستخدم (أو استخدام بيانات افتراضية للعرض)
        this.loadUser();

        // 3. إعداد الواجهة بناءً على المستخدم
        this.setupUI();

        // 4. عرض الصفحة الافتراضية (لوحة القيادة)
        this.switchTab('dashboard');

        // 5. إزالة شاشة التحميل (Safety Timer)
        setTimeout(() => {
            const loader = document.getElementById('loadingOverlay');
            if(loader) loader.classList.add('hidden');
        }, 500);
    },

    /**
     * تحميل بيانات المستخدم الحالي وتحديد الصلاحيات
     */
    loadUser: function() {
        // محاولة جلب المستخدم من الذاكرة، أو استخدام مستخدم افتراضي (أمين السر للتجربة)
        const storedUser = AppConfig.getCurrentUser();
        
        if (storedUser) {
            this.state.currentUser = storedUser;
        } else {
            // Default Mock User (Secretary Role for full access demo)
            this.state.currentUser = {
                name: { ar: "أ. أيمن المغربي", en: "Mr. Ayman Al-Maghrabi" },
                role: "Secretary", // Options: 'Chairman', 'Member', 'Secretary'
                avatar: "../photo/ceo.jpeg" // Placeholder
            };
        }
    },

    /**
     * تحديث النصوص والصور في القائمة العلوية والجانبية
     */
    setupUI: function() {
        const user = this.state.currentUser;
        const lang = document.documentElement.lang || 'ar';
        const name = lang === 'ar' ? user.name.ar : user.name.en;
        
        // تعبئة البيانات في الهيدر والسايدبار
        const nameElements = ['sidebarName', 'dashName', 'userName'];
        nameElements.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.innerText = id === 'dashName' ? name.split(' ')[1] : name; // الاسم الأول فقط في الترحيب
        });

        const roleElements = ['sidebarRole', 'userRole'];
        roleElements.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.innerText = user.role === 'Secretary' ? (lang==='ar'?'أمين السر':'Secretary') : (lang==='ar'?'عضو مجلس':'Board Member');
        });

        const avatarElements = ['sidebarAvatar', 'userAvatar'];
        avatarElements.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.src = user.avatar || `https://ui-avatars.com/api/?name=${name}&background=random`;
        });

        // إظهار أدوات أمين السر فقط إذا كان المستخدم أمين سر
        if (user.role === 'Secretary') {
            const secMenu = document.getElementById('secMenu');
            if(secMenu) secMenu.classList.remove('hidden');
        }
    },

    /**
     * التنقل بين التبويبات (Dashboard, Meetings, etc.)
     */
    switchTab: function(tabId) {
        // 1. إخفاء جميع التبويبات
        document.querySelectorAll('[id^="tab-"]').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('animate-fade-in'); // Reset animation
        });

        // 2. إظهار التبويب المطلوب
        const target = document.getElementById(`tab-${tabId}`);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('animate-fade-in');
        }

        // 3. تحديث القائمة الجانبية (Active State)
        document.querySelectorAll('.nav-link').forEach(el => {
            el.classList.remove('active');
            el.classList.add('text-slate-500');
        });
        
        const activeNav = document.getElementById(`nav-${tabId}`);
        if(activeNav) {
            activeNav.classList.add('active');
            activeNav.classList.remove('text-slate-500');
        }

        // 4. تحميل البيانات الخاصة بالتبويب (Lazy Loading)
        if (tabId === 'dashboard') this.renderChart();
        if (tabId === 'meetings') this.renderMeetingsTable();
        // if (tabId === 'library') this.renderLibrary(); // Future impl

        // 5. تحديث عنوان الصفحة
        const titles = {
            'dashboard': 'لوحة القيادة',
            'meetings': 'الاجتماعات والمحاضر',
            'resolutions': 'القرارات والتصويت',
            'library': 'المكتبة الرقمية',
            'secretary': 'أمانة السر'
        };
        document.getElementById('pageTitle').innerText = titles[tabId] || 'بوابة المجلس';
    },

    /**
     * رسم المخطط البياني في لوحة القيادة
     */
    renderChart: function() {
        const ctx = document.getElementById('boardChart');
        if (!ctx) return;

        // تدمير المخطط القديم لمنع التداخل
        if (this.state.chartInstance) {
            this.state.chartInstance.destroy();
        }

        this.state.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع'],
                datasets: [{
                    label: 'نسبة الحضور',
                    data: [98, 92, 95, 100],
                    backgroundColor: '#4267B2',
                    borderRadius: 6,
                    barThickness: 20
                }, {
                    label: 'القرارات المعتمدة',
                    data: [5, 8, 4, 6],
                    backgroundColor: '#FB4747',
                    borderRadius: 6,
                    barThickness: 20
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { font: { family: 'Tajawal' } } }
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
                    x: { grid: { display: false } }
                }
            }
        });
    },

    /**
     * تعبئة جدول الاجتماعات من البيانات المركزية
     */
    renderMeetingsTable: function() {
        // ملاحظة: هنا نستخدم DataService لجلب البيانات الحقيقية
        // في حال لم يكن الملف موجوداً، نستخدم بيانات وهمية للتجربة
        const meetings = (typeof DataService !== 'undefined') ? DataService.getMeetings() : [];
        
        const tbody = document.querySelector('#tab-meetings tbody');
        if (!tbody) return;

        if (meetings.length === 0) {
            // بيانات افتراضية إذا كانت القائمة فارغة
            return; 
        }

        // مسح الجدول وإعادة تعبئته (تحديث ديناميكي)
        tbody.innerHTML = meetings.map(m => {
            const statusClass = m.status === 'Scheduled' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700';
            const statusText = m.status === 'Scheduled' ? 'مجدول' : 'منعقد';
            const lang = document.documentElement.lang || 'ar';
            
            return `
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition border-b border-slate-100 dark:border-slate-700">
                <td class="p-4 font-mono text-xs font-bold text-blue-600">${m.id}</td>
                <td class="p-4 font-bold text-slate-800 dark:text-white">${lang==='ar' ? m.title.ar : m.title.en}</td>
                <td class="p-4 text-xs font-mono text-slate-500">${m.date}</td>
                <td class="p-4 text-center text-xs">Hybrid</td>
                <td class="p-4 text-center"><span class="${statusClass} px-2 py-1 rounded text-[10px] font-bold">${statusText}</span></td>
                <td class="p-4 text-center">
                    <button class="text-slate-400 hover:text-brandBlue transition"><i class="fa-solid fa-eye"></i></button>
                </td>
            </tr>`;
        }).join('');
    },

    // --- عمليات التصويت (Voting Logic) ---
    
    openVoteModal: function(type) {
        document.getElementById('signModal').classList.remove('hidden');
    },

    confirmVote: function() {
        document.getElementById('signModal').classList.add('hidden');
        
        // إظهار رسالة نجاح
        // يمكن استبدالها بـ Toast Notification
        alert("تم اعتماد صوتك وتشفير التوقيع الرقمي بنجاح.");
        
        // العودة للرئيسية
        this.switchTab('dashboard');
    },

    // --- النظام ---
    logout: function() {
        if(confirm("هل أنت متأكد من تسجيل الخروج؟")) {
            window.location.href = '../index.html';
        }
    }
};

// ==========================================
// ربط الدوال بالنطاق العام (Global Scope)
// لكي تعمل مع onclick="..." في HTML
// ==========================================
window.switchBoardTab = (id) => BoardLayout.switchTab(id);
window.castVote = (type) => BoardLayout.openVoteModal(type);
window.confirmVoteProcess = () => BoardLayout.confirmVote();
window.logout = () => BoardLayout.logout();
window.toggleLang = () => {
    const html = document.documentElement;
    const current = html.lang;
    html.lang = current === 'ar' ? 'en' : 'ar';
    html.dir = current === 'ar' ? 'ltr' : 'rtl';
    BoardLayout.setupUI(); // تحديث النصوص
    BoardLayout.renderMeetingsTable(); // تحديث الجدول
};

// التشغيل التلقائي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    BoardLayout.init();
});
