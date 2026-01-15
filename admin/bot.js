document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('andro-bot-container');
    if (!container) return;

    container.innerHTML = `
        <div id="chat-window" class="hidden bg-white dark:bg-slate-800 w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col chat-window-anim" style="height: 500px; max-height: 70vh;">
            <div class="bg-brandBlue p-4 flex justify-between items-center text-white">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><i class="fa-solid fa-robot"></i></div>
                    <div><h4 class="font-bold text-sm">AndroBot</h4><p class="text-[10px] text-white/80">مساعد الحوكمة الذكي</p></div>
                </div>
                <button onclick="toggleChat()" class="text-white/80 hover:text-white transition"><i class="fa-solid fa-times"></i></button>
            </div>
            <div id="chat-body" class="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto custom-scroll space-y-3 flex flex-col">
                <div class="chat-bubble bot">مرحباً أستاذ أيمن 👋<br>أنا مساعدك الذكي. اسألني عن المهام أو السياسات.</div>
            </div>
            <div class="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                <input type="text" id="chat-input" placeholder="اكتب..." class="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm px-4 py-2 outline-none dark:text-white">
                <button onclick="sendMsg()" class="w-10 h-10 rounded-lg bg-brandBlue text-white hover:bg-blue-700 transition flex items-center justify-center"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
        <button onclick="toggleChat()" class="w-14 h-14 bg-brandBlue hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-2xl transition-all transform hover:scale-110 active:scale-95 animate-bounce-slow">
            <i class="fa-solid fa-comment-dots"></i>
        </button>
    `;
});

window.toggleChat = () => {
    const w = document.getElementById('chat-window');
    w.classList.toggle('hidden');
    w.classList.toggle('flex');
};

window.sendMsg = () => {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const body = document.getElementById('chat-body');
    body.innerHTML += `<div class="chat-bubble user bg-brandBlue text-white self-end mb-2">${text}</div>`;
    input.value = '';
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
        let reply = "عذراً، لم أفهم السؤال.";
        if(text.includes('مهام')) reply = "لديك 4 مهام معلقة في قسم الحوكمة.";
        if(text.includes('سياسة')) reply = "سياسة المكافآت بانتظار الاعتماد.";
        body.innerHTML += `<div class="chat-bubble bot bg-slate-100 dark:bg-slate-700 dark:text-white text-slate-800 mb-2">${reply}</div>`;
        body.scrollTop = body.scrollHeight;
    }, 1000);
};
