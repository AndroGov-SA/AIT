/**
 * Shareholder Portal Layout
 * تصميم خاص للمستثمرين (أنيق، بسيط، يركز على الأرقام)
 */
(function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) window.location.href = '../login.html';

    const config = { theme: localStorage.getItem('theme') || 'light' };

    function init() {
        if(config.theme === 'dark') document.documentElement.classList.add('dark');
        renderSidebar();
        renderHeader();
    }

    function renderSidebar() {
        const isRtl = document.documentElement.dir === 'rtl';
        const menu = [
            { link: "dashboard.html", icon: "fa-chart-pie", text: "ملخص الاستثمار" },
            { link: "certificates.html", icon: "fa-file-contract", text: "شهادات الأسهم" },
            { link: "dividends.html", icon: "fa-hand-holding-dollar", text: "توزيعات الأرباح" },
            { link: "voting.html", icon: "fa-check-to-slot", text: "التصويت والجمعيات" },
            { link: "reports.html", icon: "fa-file-pdf", text: "التقارير المالية" }
        ];

        let links = menu.map(m => `
            <a href="${m.link}" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all mb-1 ${window.location.href.includes(m.link)?'bg-brandRed text-white':''}">
                <i class="fa-solid ${m.icon} w-6"></i> <span class="font-bold text-sm">${m.text}</span>
            </a>
        `).join('');

        document.getElementById('sidebar-container').innerHTML = `
        <aside class="fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-screen w-72 bg-slate-900 text-white flex flex-col z-50">
            <div class="h-20 flex items-center px-8 border-b border-slate-800">
                <h1 class="text-xl font-extrabold tracking-tight">Andro<span class="text-brandRed">Gov</span> <span class="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">مساهم</span></h1>
            </div>
            <div class="p-6">
                <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <p class="text-[10px] text-slate-400 mb-1">المستثمر</p>
                    <p class="font-bold text-sm truncate">${currentUser.name}</p>
                    <p class="text-[10px] text-brandRed mt-1">${currentUser.email}</p>
                </div>
            </div>
            <nav class="flex-1 px-4 overflow-y-auto">${links}</nav>
            <div class="p-4"><button onclick="logout()" class="w-full py-3 text-red-400 hover:bg-white/5 rounded-xl font-bold text-sm"><i class="fa-solid fa-power-off ml-2"></i> تسجيل خروج</button></div>
        </aside>`;
    }

    function renderHeader() {
        document.getElementById('header-container').innerHTML = `
        <header class="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
            <h2 class="font-bold text-slate-800 dark:text-white">بوابة علاقات المساهمين</h2>
            <div class="flex gap-3">
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> السوق مفتوح
                </span>
            </div>
        </header>`;
    }

    window.logout = () => { localStorage.removeItem('currentUser'); window.location.href = 'https://androgov-sa.github.io/AIT/login.html'; };
    init();
})();
