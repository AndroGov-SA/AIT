// ==========================================
// 1. مستودع البيانات (Data Repository)
// ==========================================
const SYSTEM_DATA = {
    users: [
        { id: "USR_000", name: { ar: "عبدالله الحواس", en: "Abdullah Al-Hawas" }, title: { ar: "رئيس مجلس الإدارة", en: "Chairman of the Board" }, dept: "DEP_EXEC", role_ref: "chairman", email: "amh400@gmail.com" },
        { id: "USR_001", name: { ar: "هشام السحيباني", en: "Hesham Al-Sohaibani" }, title: { ar: "الرئيس التنفيذي ونائب الرئيس", en: "CEO & Board Vice Chairman" }, dept: "DEP_EXEC", role_ref: "ceo", email: "hesham@androomeda.com" },
        { id: "USR_004", name: { ar: "أيمن المغربي", en: "Ayman Al-Maghrabi" }, title: { ar: "مسؤول الحوكمة / أمين السر", en: "GRCO / Board Secretary" }, dept: "DEP_COMP", role_ref: "manager", email: "amaghrabi@androomeda.com" },
    ],
    shareholders: [
        { id: "SH_001", name: { ar: "ورثة محمد بن صالح السحيباني", en: "Heirs of Mohammed Al-Suhaibani" }, email: "alcaseer@gmail.com", percent: 35 },
        { id: "SH_002", name: { ar: "هشام بن محمد السحيباني", en: "Hesham bin Muhammad Al-Sohibani" }, email: "Hesham@androomeda.com", percent: 10 },
        { id: "SH_010", name: { ar: "شركة بيجي المحدودة", en: "BG LTD.Company" }, email: "saleh@bgtech.com", percent: 15 },
        { id: "SH_011", name: { ar: "احمد بن سليمان الجاسر", en: "Ahmed bin Suleiman Al-Jasser" }, email: "ahmed.jasser@gmail.com", percent: 5 },
        { id: "SH_OTH", name: { ar: "آخرون", en: "Others" }, email: "", percent: 35 }
    ],
    notifications: [
        { id: 1, title: "سياسة جديدة", msg: "تم رفع مسودة الدليل الداخلي للاعتماد", time: "منذ 10 دقائق", read: false, type: "urgent" },
        { id: 2, title: "اجتماع مجلس", msg: "تذكير: اجتماع مجلس الإدارة الربع سنوي غداً", time: "منذ ساعة", read: false, type: "info" },
        { id: 3, title: "اكتمال النصاب", msg: "تم اكتمال نصاب التصويت على قرار تشكيل اللجنة", time: "منذ 3 ساعات", read: true, type: "success" }
    ]
};

const pageContent = {
    ar: {
        pageTitle: "AndroGov | لوحة القيادة",
        alertTitle: 'إجراء مطلوب: اعتماد "الدليل الداخلي"',
        alertDesc: 'مسودة بانتظار الاعتماد النهائي من المجلس. الرافع:',
        uploaderName: 'أيمن المغربي',
        reviewBtn: 'مراجعة واعتماد',
        kpiCapital: 'رأس المال المصدر',
        currency: 'ر.س',
        fullyPaid: 'مدفوع بالكامل',
        kpiShareholders: 'المساهمين',
        member: 'عضو',
        shareholdersList: 'ورثة محمد السحيباني، شركة بيجي...',
        kpiGov: 'قرارات بالتمرير',
        pending: 'قيد التوقيع',
        waitingFor: 'بانتظار: هشام السحيباني',
        kpiComp: 'نسبة الامتثال',
        chartTitle: 'هيكل الملكية',
        commTitle: 'اللجان والمجلس',
        auditComm: 'لجنة المراجعة',
        newCycle: 'دورة جديدة',
        commMember1: 'محمد بن منصور العنزي (رئيس)',
        commMember2: 'أحمد بن سلطان السحيباني (عضو)',
        commMember3: 'عادل بن عدنان سعسع (رئيس)',
        lastMeeting: 'آخر اجتماع: 22/12/2025',
        minutes: 'المحضر',
        boardSec: 'أمين السر',
        secName: 'أيمن بن علي المغربي',
        schedule: 'جدولة',
        opsTitle: 'المهام التشغيلية',
        task1: 'اعتماد سياسة المكافآت',
        dueDate: 'تاريخ الاستحقاق',
        gov: 'حوكمة',
        taskPayroll: 'مراجعة تقرير الرواتب (HR)',
        fromLabel: 'من',
        senderName: 'منصور اليامي',
        ops: 'تشغيل',
        task3: 'تحديث بيانات السجل التجاري',
        ministry: 'وزارة التجارة',
        legal: 'قانونية',
        viewAll: 'عرض كل المهام (12)',
        auditTitle: 'سجل النظام المباشر',
        chartHeirs: 'ورثة السحيباني',
        chartHesham: 'هشام السحيباني',
        chartBG: 'شركة بيجي',
        chartOthers: 'آخرون',
        logBackup: 'تم إكمال النسخ الاحتياطي بنجاح',
        logPolicy: 'قام هشام باستعراض سياسة المكافآت',
        logUpload: 'قام أيمن برفع مسودة الدليل الداخلي',
        logFirewall: 'تم حظر محاولة دخول مشبوهة'
    },
    en: {
        pageTitle: "AndroGov | Dashboard",
        alertTitle: 'Action Required: Approve "Internal Manual"',
        alertDesc: 'Draft awaiting final Board approval. Uploader:',
        uploaderName: 'Ayman Almaghrabi',
        reviewBtn: 'Review & Approve',
        kpiCapital: 'Issued Capital',
        currency: 'SAR',
        fullyPaid: 'Fully Paid',
        kpiShareholders: 'Shareholders',
        member: 'Members',
        shareholdersList: 'Heirs of Al-Suhaibani, BG Company...',
        kpiGov: 'Circulated Resolutions',
        pending: 'Pending Signature',
        waitingFor: 'Waiting: Hesham Al-Suhaibani',
        kpiComp: 'Compliance Rate',
        chartTitle: 'Ownership Structure',
        commTitle: 'Committees & Board',
        auditComm: 'Audit Committee',
        newCycle: 'New Cycle',
        commMember1: 'Mohammed Al-Enezi (Chairman)',
        commMember2: 'Ahmed Al-Suhaibani (Member)',
        commMember3: 'Adel Sasa (Chairman)',
        lastMeeting: 'Last Meeting: 22/12/2025',
        minutes: 'Minutes',
        boardSec: 'Board Secretary',
        secName: 'Ayman Almaghrabi',
        schedule: 'Schedule',
        opsTitle: 'Operational Tasks',
        task1: 'Approve Bonus Policy',
        dueDate: 'Due Date',
        gov: 'Gov',
        taskPayroll: 'Review Payroll Report (HR)',
        fromLabel: 'From',
        senderName: 'Mansour Alyami',
        ops: 'Ops',
        task3: 'Update Commercial Registry',
        ministry: 'Ministry of Commerce',
        legal: 'Legal',
        viewAll: 'View All Tasks (12)',
        auditTitle: 'Live System Audit',
        chartHeirs: 'Heirs of Al-Suhaibani',
        chartHesham: 'Hesham Al-Suhaibani',
        chartBG: 'BG LTD',
        chartOthers: 'Others',
        logBackup: 'Backup completed successfully',
        logPolicy: 'Hesham viewed Bonus Policy',
        logUpload: 'Ayman uploaded Internal Manual draft',
        logFirewall: 'Suspicious login attempt blocked'
    }
};

// ==========================================
// 2. محرك التخطيط (Layout Engine)
// ==========================================
(function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        id: "USR_004", name: {ar: "أيمن المغربي", en: "Ayman Al-Maghrabi"}, role: "GRCO"
    };
    
    // Force reset to Ayman if it was previously set to Hesham
    if (currentUser.id === "USR_001") {
        currentUser = {
            id: "USR_004", name: {ar: "أيمن المغربي", en: "Ayman Al-Maghrabi"}, role: "GRCO"
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    const config = {
        lang: localStorage.getItem('lang') || 'ar',
        theme: localStorage.getItem('theme') || 'light'
    };

    const menuStructure = [
        { section: 'main', items: [{ key: 'dash', icon: 'fa-gauge-high', link: 'admin.html' }] },
        { section: 'comm', items: [{ key: 'chat', icon: 'fa-comments', link: '#' }, { key: 'circulars', icon: 'fa-bullhorn', link: '#' }] },
        { section: 'gov', items: [{ key: 'ga', icon: 'fa-users-rectangle', link: '#' }, { key: 'board', icon: 'fa-building-columns', link: '#' }, { key: 'committees', icon: 'fa-people-group', link: '#' }] },
        { section: 'ops', items: [{ key: 'tasks', icon: 'fa-list-check', link: 'tasks.html' }, { key: 'doa', icon: 'fa-sitemap', link: '#' }, { key: 'policies', icon: 'fa-book-open', link: '#' }] },
    ];

    const layoutTrans = {
        ar: {
            sysName: "AndroGov", sysVer: "Enterprise v4.5", logout: "خروج",
            sections: { main: "الرئيسية", comm: "التواصل", gov: "الحوكمة", ops: "التشغيل" },
            menu: { dash: "لوحة القيادة", chat: "الدردشة", circulars: "التعاميم", ga: "الجمعيات", board: "المجلس", committees: "اللجان", tasks: "إدارة المهام", doa: "الصلاحيات", policies: "السياسات" }
        },
        en: {
            sysName: "AndroGov", sysVer: "Enterprise v4.5", logout: "Logout",
            sections: { main: "Main", comm: "Comms", gov: "Gov", ops: "Ops" },
            menu: { dash: "Dashboard", chat: "Chat", circulars: "Circulars", ga: "GA", board: "Board", committees: "Committees", tasks: "Task Manager", doa: "DOA", policies: "Policies" }
        }
    };

    function initLayout() {
        if(!currentUser.avatarUrl) currentUser.avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name.ar)}&background=FB4747&color=fff&bold=true`;
        applyLayoutSettings();
        renderSidebar();
        renderHeader();
    }

    function applyLayoutSettings() {
        const html = document.documentElement;
        html.lang = config.lang;
        html.dir = config.lang === 'ar' ? 'rtl' : 'ltr';
        if (config.theme === 'dark') html.classList.add('dark');
    }

    function renderSidebar() {
        const container = document.getElementById('sidebar-container');
        if (!container) return;
        const dict = layoutTrans[config.lang];
        let menuHTML = '';
        menuStructure.forEach(group => {
            menuHTML += `<div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">${dict.sections[group.section]}</div>`;
            group.items.forEach(item => {
                const isActive = window.location.href.includes(item.link);
                const activeClass = isActive ? "bg-brandRed text-white shadow-md shadow-red-500/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed";
                menuHTML += `
                <a href="${item.link}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeClass}">
                    <div class="w-6 text-center"><i class="fa-solid ${item.icon}"></i></div>
                    <span class="flex-1 truncate">${dict.menu[item.key]}</span>
                </a>`;
            });
        });

        container.innerHTML = `
        <aside class="fixed top-0 ${config.lang === 'ar' ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex-col hidden md:flex bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3 w-full">
                    <div class="w-10 h-10 rounded-xl bg-brandRed text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-red-500/30">A</div>
                    <div class="overflow-hidden">
                        <h1 class="font-bold text-sm text-slate-800 dark:text-white font-sans truncate">AndroGov</h1>
                        <p class="text-[10px] text-slate-500 uppercase tracking-widest truncate">${dict.sysVer}</p>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <img src="${currentUser.avatarUrl}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 object-cover shrink-0">
                    <div class="overflow-hidden flex-1 min-w-0">
                        <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${currentUser.name.ar}</p>
                        <p class="text-[10px] text-brandRed font-medium truncate">${currentUser.role}</p>
                    </div>
                </div>
            </div>
            <nav class="flex-1 overflow-y-auto px-3 py-2 custom-scroll space-y-0.5">${menuHTML}</nav>
        </aside>`;
    }

    function renderHeader() {
        const container = document.getElementById('header-container');
        if (!container) return;
        const unreadCount = SYSTEM_DATA.notifications.filter(n => !n.read).length;
        const badgeHTML = unreadCount > 0 ? `<span class="absolute top-1 right-1 w-4 h-4 bg-brandRed text-white text-[10px] font-bold flex items-center justify-center rounded-full notif-pulse">${unreadCount}</span>` : '';

        container.innerHTML = `
        <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all no-print">
            <div class="flex items-center gap-4">
                <button onclick="document.querySelector('aside').classList.toggle('hidden'); document.querySelector('aside').classList.toggle('flex');" class="md:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed"><i class="fa-solid fa-bars text-xl"></i></button>
                <h2 class="text-lg font-bold text-slate-700 dark:text-white hidden sm:block">لوحة القيادة</h2>
            </div>
            <div class="flex items-center gap-3">
                <div class="relative">
                    <button onclick="toggleNotifDropdown()" class="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition relative">
                        <i class="fa-regular fa-bell text-lg"></i>
                        ${badgeHTML}
                    </button>
                    <div id="notif-dropdown" class="hidden absolute top-12 left-0 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden animate-fade-in">
                        <div class="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <span class="font-bold text-sm dark:text-white">الإشعارات</span>
                            <span class="text-xs text-brandBlue cursor-pointer hover:underline">تحديد الكل كمقروء</span>
                        </div>
                        <div class="max-h-64 overflow-y-auto custom-scroll p-2 space-y-2">
                            ${SYSTEM_DATA.notifications.map(n => `
                                <div class="p-3 rounded-lg ${n.read ? 'bg-transparent opacity-60' : 'bg-blue-50 dark:bg-slate-700/50'} hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer flex gap-3">
                                    <div class="w-2 h-2 rounded-full ${n.type === 'urgent' ? 'bg-red-500' : 'bg-brandBlue'} mt-2 shrink-0"></div>
                                    <div>
                                        <p class="text-xs font-bold text-slate-800 dark:text-white">${n.title}</p>
                                        <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">${n.msg}</p>
                                        <p class="text-[9px] text-slate-400 mt-1">${n.time}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <button onclick="window.changeTheme()" class="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition"><i class="fa-solid ${config.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i></button>
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button onclick="window.doLogout()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2"><i class="fa-solid fa-power-off"></i></button>
            </div>
        </header>`;
    }

    initLayout();
})();

// ==========================================
// 3. وظائف النظام العامة (Global Functions)
// ==========================================

window.changeTheme = () => {
    const current = localStorage.getItem('theme');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    location.reload();
}

window.doLogout = () => {
    Swal.fire({
        title: 'هل تود الخروج؟',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'نعم، خروج',
        cancelButtonText: 'إلغاء'
    }).then((res) => {
        if(res.isConfirmed) location.reload();
    });
}

function toggleNotifDropdown() {
    const el = document.getElementById('notif-dropdown');
    if(el) el.classList.toggle('hidden');
}

function openReviewModal() {
    Swal.fire({
        title: '<strong>مراجعة: الدليل الداخلي</strong>',
        html: `
            <div class="text-right text-sm">
                <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg mb-4 text-slate-600 dark:text-slate-300">
                    <p class="mb-2"><strong class="text-brandBlue">رقم النسخة:</strong> v3.2</p>
                    <p class="mb-2"><strong class="text-brandBlue">الرافع:</strong> أيمن المغربي</p>
                    <p class="mb-2"><strong class="text-brandBlue">تاريخ الرفع:</strong> 2025-07-27</p>
                    <p><strong class="text-brandBlue">التغييرات الرئيسية:</strong> تحديث سياسات الإجازات.</p>
                </div>
                <div class="flex gap-2 justify-center mb-2">
                    <button class="px-3 py-1 bg-slate-200 rounded text-xs hover:bg-slate-300"><i class="fa-solid fa-eye"></i> معاينة الملف</button>
                </div>
            </div>
        `,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> اعتماد',
        denyButtonText: '<i class="fa-solid fa-rotate-left"></i> طلب تعديل',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#10B981',
        denyButtonColor: '#F59E0B',
        customClass: { popup: 'dark:bg-slate-800 dark:text-white' }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({ title: 'تم الاعتماد!', text: 'تم توثيق الدليل وإرسال إشعار للموظفين.', icon: 'success', confirmButtonColor: '#4267B2' });
            const alertBox = document.getElementById('urgent-alert-box');
            if(alertBox) {
                alertBox.classList.add('opacity-50', 'pointer-events-none');
                alertBox.querySelector('h3').innerText = 'تم الاعتماد بنجاح ✅';
                alertBox.querySelector('button').style.display = 'none';
            }
            addLog('Ayman', 'تم اعتماد الدليل الداخلي (v3.2) من قبل مسؤول الحوكمة', 'text-green-400');
        } else if (result.isDenied) {
            Swal.fire('تم إرسال طلب التعديل', 'تلقى فريق السياسات ملاحظاتك.', 'info');
        }
    });
}

function addLog(user, msg, color) {
    const container = document.getElementById('audit-log-container');
    if (!container) return;
    const time = new Date().toLocaleTimeString('en-US', {hour12: false, hour: "2-digit", minute: "2-digit"});
    const html = `
        <div class="flex gap-3 hover:bg-slate-800/50 p-1 rounded transition cursor-default animate-fade-in">
            <span class="text-slate-500 w-16 shrink-0">[${time}]</span>
            <span class="${color} font-bold w-16 shrink-0 truncate">${user}</span>
            <span class="text-slate-400 truncate flex-1">${msg}</span>
        </div>
    `;
    container.insertAdjacentHTML('afterbegin', html);
}

// ==========================================
// 4. تهيئة لوحة القيادة (Dashboard Init)
// ==========================================
function updateContent() {
    const lang = localStorage.getItem('lang') || 'ar';
    const t = pageContent[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if(t) {
        document.title = t.pageTitle;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(t[key]) el.innerText = t[key];
        });
    }
}

function initCharts() {
    const ctx = document.getElementById('ownershipChart');
    if(!ctx) return; 
    
    const lang = localStorage.getItem('lang') || 'ar';
    const t = pageContent[lang];
    const data = {
        labels: [t.chartHeirs, t.chartHesham, t.chartBG, t.chartOthers],
        datasets: [{
            data: [35, 10, 10, 45],
            backgroundColor: ['#FB4747', '#4267B2', '#10B981', '#CBD5E1'],
            borderWidth: 0,
            hoverOffset: 10
        }]
    };
    const legendContainer = document.getElementById('chartLegend');
    if(legendContainer) {
        legendContainer.innerHTML = `
            <div class="flex justify-between items-center text-xs">
                <span class="flex items-center gap-2 text-slate-600 dark:text-slate-300"><span class="w-2 h-2 rounded-full bg-brandRed"></span> ${t.chartHeirs}</span>
                <span class="font-bold font-en">35%</span>
            </div>
            <div class="flex justify-between items-center text-xs">
                <span class="flex items-center gap-2 text-slate-600 dark:text-slate-300"><span class="w-2 h-2 rounded-full bg-blue-500"></span> ${t.chartHesham}</span>
                <span class="font-bold font-en">10%</span>
            </div>
            <div class="flex justify-between items-center text-xs">
                <span class="flex items-center gap-2 text-slate-600 dark:text-slate-300"><span class="w-2 h-2 rounded-full bg-green-500"></span> ${t.chartBG}</span>
                <span class="font-bold font-en">15%</span>
            </div>
            <div class="flex justify-between items-center text-xs">
                <span class="flex items-center gap-2 text-slate-600 dark:text-slate-300"><span class="w-2 h-2 rounded-full bg-slate-300"></span> ${t.chartOthers}</span>
                <span class="font-bold font-en">40%</span>
            </div>
        `;
    }
    if(window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: data,
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1E293B', titleFont: { family: 'Inter' }, bodyFont: { family: 'Inter' } } }, cutout: '75%' }
    });
}

function renderLogs() {
    const container = document.getElementById('audit-log-container');
    if(!container) return;
    const lang = localStorage.getItem('lang') || 'ar';
    const t = pageContent[lang];
    const logs = [
        { t: "10:45:22", type: "INFO", u: "System", msg: t.logBackup, c: "text-green-400" },
        { t: "10:42:15", type: "WARN", u: "Hesham", msg: t.logPolicy, c: "text-yellow-400" },
        { t: "10:30:01", type: "INFO", u: "Ayman", msg: t.logUpload, c: "text-blue-400" },
        { t: "09:15:00", type: "CRIT", u: "Firewall", msg: t.logFirewall, c: "text-red-400" }
    ];
    container.innerHTML = '';
    logs.forEach(log => {
        container.innerHTML += `
            <div class="flex gap-3 hover:bg-slate-800/50 p-1 rounded transition cursor-default">
                <span class="text-slate-500 w-16 shrink-0">[${log.t}]</span>
                <span class="${log.c} font-bold w-10 shrink-0">${log.type}</span>
                <span class="text-white w-16 shrink-0 font-bold">${log.u}</span>
                <span class="text-slate-400 truncate">${log.msg}</span>
            </div>
        `;
    });
}

// تشغيل عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    initCharts();
    renderLogs();
});
