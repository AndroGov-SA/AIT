/**
 * AndroGov AI Assistant - CTO Edition v2.0
 * Features: Tech Support, Server Status, Bilingual Support
 */

(function() {
    // 1. Translations Database
    const botText = {
        ar: {
            greeting: "مرحباً فيصل 👋، أنا مساعدك التقني. الأنظمة تعمل بكفاءة 99.9%. كيف أخدمك؟",
            placeholder: "اكتب استفسار تقني أو أمر...",
            actions: {
                status: "📊 حالة النظام",
                ticket: "🎫 فتح تذكرة",
                logs: "📜 سجلات الأخطاء",
                deploy: "🚀 نشر تحديث"
            },
            responses: {
                status: "تحليل النظام: <br>✅ السيرفرات: مستقرة (Load: 45%)<br>✅ الشبكة: متصلة<br>✅ السنترال: نشط",
                ticket: "تم فتح تذكرة دعم فني جديدة (High Priority). الرقم المرجعي: #INC-9920",
                default: "جاري تحليل الطلب... سأقوم بتوجيه الأمر للفريق المختص."
            },
            header: "المساعد الذكي (AI Ops)"
        },
        en: {
            greeting: "Hi Faisal 👋, I'm your AI Ops Assistant. Systems running at 99.9%. How can I help?",
            placeholder: "Type a command or query...",
            actions: {
                status: "📊 System Status",
                ticket: "🎫 Open Ticket",
                logs: "📜 Error Logs",
                deploy: "🚀 Deploy Update"
            },
            responses: {
                status: "System Analysis: <br>✅ Servers: Stable (Load: 45%)<br>✅ Network: Connected<br>✅ PBX: Active",
                ticket: "New High Priority Incident ticket created. Ref: #INC-9920",
                default: "Analyzing request... I will forward this to the DevOps team."
            },
            header: "AI Ops Assistant"
        }
    };

    // 2. Get Current Language
    const lang = localStorage.getItem('lang') || 'ar';
    const t = botText[lang];
    const isRtl = lang === 'ar';

    // 3. Inject HTML Structure
    const botHTML = `
        <div id="ai-bot-container" class="fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex flex-col items-end gap-4 font-sans">
            
            <div id="chat-window" class="hidden w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 transform scale-95 opacity-0 origin-bottom-right">
                
                <div class="bg-slate-900 text-white p-4 flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <i class="fa-solid fa-robot text-sm"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-sm">${t.header}</h3>
                            <span class="text-[10px] text-green-400 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online</span>
                        </div>
                    </div>
                    <button onclick="toggleBot()" class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
                </div>

                <div id="chat-messages" class="h-64 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/50 space-y-3 custom-scroll">
                    <div class="flex items-start gap-2">
                        <div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-xs shrink-0 mt-1"><i class="fa-solid fa-robot"></i></div>
                        <div class="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-600 leading-relaxed">
                            ${t.greeting}
                        </div>
                    </div>
                </div>

                <div class="px-4 py-2 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex gap-2 overflow-x-auto custom-scroll">
                    <button onclick="sendBotAction('status')" class="whitespace-nowrap px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-full hover:bg-blue-100 transition">${t.actions.status}</button>
                    <button onclick="sendBotAction('ticket')" class="whitespace-nowrap px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-full hover:bg-red-100 transition">${t.actions.ticket}</button>
                    <button onclick="sendBotAction('deploy')" class="whitespace-nowrap px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-full hover:bg-slate-200 transition">${t.actions.deploy}</button>
                </div>

                <div class="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                    <input type="text" id="bot-input" placeholder="${t.placeholder}" class="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none dark:text-white">
                    <button onclick="sendUserMessage()" class="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                        <i class="fa-solid fa-paper-plane text-xs ${isRtl ? 'rotate-180' : ''}"></i>
                    </button>
                </div>
            </div>

            <button onclick="toggleBot()" class="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform duration-300 group relative">
                <i class="fa-solid fa-robot group-hover:rotate-12 transition-transform"></i>
                <span class="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
                <span class="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', botHTML);

    // 4. Bot Logic Functions
    window.toggleBot = function() {
        const win = document.getElementById('chat-window');
        if (win.classList.contains('hidden')) {
            win.classList.remove('hidden');
            setTimeout(() => {
                win.classList.remove('scale-95', 'opacity-0');
                win.classList.add('scale-100', 'opacity-100');
            }, 10);
        } else {
            win.classList.remove('scale-100', 'opacity-100');
            win.classList.add('scale-95', 'opacity-0');
            setTimeout(() => win.classList.add('hidden'), 300);
        }
    };

    window.sendUserMessage = function() {
        const input = document.getElementById('bot-input');
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        // Simulate typing delay
        showTyping();
        setTimeout(() => {
            hideTyping();
            const response = getAutoResponse(text);
            addMessage(response, 'bot');
        }, 1500);
    };

    window.sendBotAction = function(actionType) {
        const actionLabels = t.actions;
        let userText = actionLabels[actionType];
        
        addMessage(userText, 'user');
        showTyping();
        
        setTimeout(() => {
            hideTyping();
            let response = t.responses[actionType] || t.responses.default;
            addMessage(response, 'bot');
        }, 1200);
    };

    function addMessage(text, sender) {
        const container = document.getElementById('chat-messages');
        const isUser = sender === 'user';
        
        const html = `
            <div class="flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in-up">
                <div class="w-6 h-6 rounded-full ${isUser ? 'bg-slate-200 dark:bg-slate-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'} flex items-center justify-center text-xs shrink-0">
                    <i class="fa-solid ${isUser ? 'fa-user' : 'fa-robot'}"></i>
                </div>
                <div class="${isUser ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-600 rounded-tl-none'} p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed shadow-sm">
                    ${text}
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', html);
        container.scrollTop = container.scrollHeight;
    }

    function showTyping() {
        const container = document.getElementById('chat-messages');
        const html = `
            <div id="typing-indicator" class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-xs shrink-0"><i class="fa-solid fa-robot"></i></div>
                <div class="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-600">
                    <div class="flex gap-1">
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
        container.scrollTop = container.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    function getAutoResponse(input) {
        // Simple logic simulation
        input = input.toLowerCase();
        if (input.includes('status') || input.includes('حالة') || input.includes('server')) return t.responses.status;
        if (input.includes('ticket') || input.includes('تذكرة') || input.includes('support')) return t.responses.ticket;
        return t.responses.default;
    }

    // Input Enter Key Support
    document.getElementById('bot-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendUserMessage();
    });

})();
