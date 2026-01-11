/**
 * AndroGov Finance Bot (Red Brand)
 */
(function() {
    const lang = localStorage.getItem('lang') || 'ar';
    const isAr = lang === 'ar';

    const t = {
        title: isAr ? 'المساعد المالي' : 'Finance AI',
        subtitle: isAr ? 'متصل بقاعدة البيانات' : 'Connected to DB',
        welcome: isAr 
            ? 'مرحباً أستاذ محمد. نظام AndroGov المالي جاهز. يمكنك سؤالي عن السيولة، أو استخراج التقارير.' 
            : 'Welcome Mr. Mohammed. AndroGov Finance is ready. Ask about liquidity or reports.',
        placeholder: isAr ? 'اكتب استفسارك...' : 'Type your query...',
    };

    if (!document.getElementById('andro-bot-container')) {
        const botHTML = `
        <div id="andro-bot-container" class="fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-50 flex flex-col items-start gap-4 font-sans" dir="${isAr ? 'rtl' : 'ltr'}">
            <div id="chat-window" class="hidden bg-white dark:bg-slate-800 w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col transition-all" style="height: 500px; max-height: 70vh;">
                <div class="bg-brandRed p-4 flex justify-between items-center text-white">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><i class="fa-solid fa-robot"></i></div>
                        <div><h4 class="font-bold text-sm">${t.title}</h4><p class="text-[10px] text-white/80">${t.subtitle}</p></div>
                    </div>
                    <button id="close-chat-btn" class="text-white/80 hover:text-white"><i class="fa-solid fa-times"></i></button>
                </div>
                <div id="chat-body" class="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto space-y-3 flex flex-col text-sm">
                    <div class="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg rounded-tl-none dark:text-white max-w-[85%]">${t.welcome}</div>
                </div>
                <div class="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                    <input type="text" id="chat-input" placeholder="${t.placeholder}" class="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-xs px-4 py-3 focus:ring-1 focus:ring-brandRed outline-none dark:text-white">
                    <button id="send-btn" class="w-10 h-10 rounded-lg bg-brandRed text-white hover:bg-red-700 flex items-center justify-center"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
            <button id="chat-fab" class="w-14 h-14 bg-brandRed hover:bg-red-700 text-white rounded-full shadow-lg shadow-red-500/30 flex items-center justify-center text-2xl transition-transform hover:scale-110">
                <i class="fa-solid fa-comments-dollar"></i>
            </button>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', botHTML);
    }

    const chatWindow = document.getElementById('chat-window');
    const fab = document.getElementById('chat-fab');
    const closeBtn = document.getElementById('close-chat-btn');
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    function toggleChat() { chatWindow.classList.toggle('hidden'); if(!chatWindow.classList.contains('hidden')) input.focus(); }
    if(fab) fab.addEventListener('click', toggleChat);
    if(closeBtn) closeBtn.addEventListener('click', toggleChat);

    sendBtn.addEventListener('click', () => {
        const txt = input.value.trim();
        if(!txt) return;
        
        // User Msg
        const uDiv = document.createElement('div');
        uDiv.className = 'bg-brandRed text-white p-3 rounded-lg rounded-tr-none self-end max-w-[85%]';
        uDiv.innerHTML = txt;
        chatBody.appendChild(uDiv);
        input.value = '';

        // Bot Response (Simulated)
        setTimeout(() => {
            let reply = isAr ? "جاري تحليل البيانات..." : "Analyzing data...";
            if (txt.includes('cash') || txt.includes('سيولة')) reply = isAr ? "السيولة الحالية: <b>2.45 مليون ريال</b>" : "Current Cash: <b>2.45M SAR</b>";
            
            const bDiv = document.createElement('div');
            bDiv.className = 'bg-slate-100 dark:bg-slate-700 dark:text-white p-3 rounded-lg rounded-tl-none self-start max-w-[85%]';
            bDiv.innerHTML = reply;
            chatBody.appendChild(bDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 600);
    });
})();
