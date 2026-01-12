/**
 * AndroGov - Executive AI Assistant (Red Brand Theme)
 * المساعد الذكي - نسخة متوافقة مع الهوية البصرية الحمراء
 */

document.addEventListener('DOMContentLoaded', () => {
    initBot();
});

function initBot() {
    const isRTL = document.documentElement.dir === 'rtl';
    const lang = document.documentElement.lang || 'ar';

    const uiText = {
        ar: {
            title: "المستشار الذكي",
            subtitle: "تحليل البيانات ودعم القرار",
            placeholder: "اسأل عن الأداء، المبيعات، أو المخاطر...",
            welcome: "أهلاً بك أستاذ هشام 👔\nأنا جاهز لتزويدك بملخصات فورية عن أداء الشركة.\nجرب سؤالي عن: 'صافي الربح'، 'حالة المشاريع'، أو 'المخاطر الحالية'.",
            send: "إرسال"
        },
        en: {
            title: "AI Advisor",
            subtitle: "Data Analysis & Decision Support",
            placeholder: "Ask about Performance, Sales, Risks...",
            welcome: "Welcome Mr. Hisham 👔\nI am ready to provide instant insights on company performance.\nTry asking about: 'Net Profit', 'Project Status', or 'Current Risks'.",
            send: "Send"
        }
    };

    const t = uiText[lang];
    const positionClass = isRTL ? 'left-6' : 'right-6'; 

    const botHTML = `
        <div id="ai-widget" class="fixed bottom-6 ${positionClass} z-50 font-sans flex flex-col items-end gap-4">
            
            <div id="chat-window" class="hidden w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 origin-bottom transform scale-95 opacity-0" style="height: 500px; max-height: 80vh;">
                
                <div class="bg-brandRed p-4 flex items-center justify-between text-white shadow-md">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner border border-white/10">
                            <i class="fa-solid fa-brain text-xl text-white"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-sm">${t.title}</h3>
                            <p class="text-[10px] text-red-100 flex items-center gap-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> ${t.subtitle}
                            </p>
                        </div>
                    </div>
                    <button onclick="toggleChat()" class="text-white/80 hover:text-white transition"><i class="fa-solid fa-xmark"></i></button>
                </div>

                <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 custom-scroll">
                    <div class="flex items-start gap-2.5">
                        <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500"><i class="fa-solid fa-robot"></i></div>
                        <div class="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-600 whitespace-pre-line">
                            ${t.welcome}
                        </div>
                    </div>
                </div>

                <div class="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                    <form onsubmit="handleUserMessage(event)" class="relative">
                        <input type="text" id="chat-input" placeholder="${t.placeholder}" class="w-full bg-slate-100 dark:bg-slate-900 border-0 rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-brandRed dark:text-white placeholder-slate-400" autocomplete="off">
                        <button type="submit" class="absolute top-1/2 ${isRTL ? 'left-2' : 'right-2'} -translate-y-1/2 w-8 h-8 bg-brandRed text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition shadow-sm">
                            <i class="fa-solid fa-paper-plane text-xs ${isRTL ? 'rotate-180' : ''}"></i>
                        </button>
                    </form>
                </div>
            </div>

            <button onclick="toggleChat()" id="chat-fab" class="w-14 h-14 bg-brandRed text-white rounded-full shadow-lg shadow-red-500/40 flex items-center justify-center text-2xl hover:scale-110 hover:bg-red-700 transition duration-300 group border-2 border-white/20">
                <i class="fa-solid fa-sparkles text-white group-hover:hidden"></i>
                <i class="fa-solid fa-chevron-down hidden group-hover:block"></i>
                
                <span class="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </button>

        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', botHTML);
}

// ... (باقي الدوال: toggleChat, handleUserMessage, addMessage... تبقى كما هي) ...

function toggleChat() {
    const window = document.getElementById('chat-window');
    if (window.classList.contains('hidden')) {
        window.classList.remove('hidden');
        setTimeout(() => {
            window.classList.remove('scale-95', 'opacity-0');
            window.classList.add('scale-100', 'opacity-100');
        }, 10);
        document.getElementById('chat-input').focus();
    } else {
        window.classList.remove('scale-100', 'opacity-100');
        window.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            window.classList.add('hidden');
        }, 300);
    }
}

function handleUserMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    input.value = '';
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateCeoResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const container = document.getElementById('chat-messages');
    const isUser = sender === 'user';
    let html = '';
    
    if (isUser) {
        html = `
            <div class="flex items-end justify-end gap-2 animate-fade-in-up">
                <div class="bg-brandRed text-white p-3 rounded-2xl rounded-br-none shadow-md text-sm max-w-[80%]">
                    ${text}
                </div>
            </div>
        `;
    } else {
        html = `
            <div class="flex items-start gap-2.5 animate-fade-in-up">
                <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500"><i class="fa-solid fa-robot"></i></div>
                <div class="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-600">
                    ${text}
                </div>
            </div>
        `;
    }
    container.insertAdjacentHTML('beforeend', html);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('chat-messages');
    const html = `
        <div id="typing-indicator" class="flex items-start gap-2.5 animate-fade-in-up">
            <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500"><i class="fa-solid fa-robot"></i></div>
            <div class="bg-white dark:bg-slate-700 p-4 rounded-2xl rounded-tr-none shadow-sm border border-slate-100 dark:border-slate-600 flex gap-1">
                <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
}

// --- قاعدة المعرفة (نفس النسخة السابقة) ---
function generateCeoResponse(input) {
    const text = input.toLowerCase();
    const lang = document.documentElement.lang || 'ar';

    const knowledgeBase = {
        ar: [
            { keywords: ['ربح', 'أرباح', 'صافي'], response: "صافي الربح حتى اليوم هو **2.4 مليون ريال**، بهامش ربح قدره **57%**. نحن أعلى من المستهدف بنسبة 5%." },
            { keywords: ['مبيعات', 'ايرادات'], response: "إجمالي الإيرادات (YTD) بلغ **4.2 مليون ريال**. \nأفضل المنتجات أداءً: الخدمات السحابية." },
            { keywords: ['مخاطر', 'خطر'], response: "⚠️ **تنبيه:** يوجد خطر تشغيلي واحد يتعلق بانتهاء رخصة بلدية الفرع الشمالي خلال 15 يوماً. المدير الإداري يعمل على ذلك." },
            { keywords: ['موظفين', 'توطين'], response: "عدد الموظفين الحالي: **45**. \nنسبة التوطين: **78%** (نطاق بلاتيني)." },
            { keywords: ['نقد', 'سيولة'], response: "السيولة النقدية الحالية تغطي المصاريف التشغيلية لمدة **6 أشهر**. الوضع المالي مستقر جداً." },
            { keywords: ['مرحبا', 'هلا'], response: "أهلاً أستاذ هشام. يسرني مساعدتك في اتخاذ القرارات اليوم. ما هو المؤشر الذي تود معرفته؟" }
        ],
        en: [
            { keywords: ['profit', 'net'], response: "Net profit YTD is **2.4M SAR**, with a margin of **57%**. We are 5% above target." },
            { keywords: ['sales', 'revenue'], response: "Total Revenue (YTD): **4.2M SAR**. \nTop performing segment: Cloud Services." },
            { keywords: ['risk', 'alert'], response: "⚠️ **Alert:** One operational risk detected regarding North Branch license expiry in 15 days." },
            { keywords: ['employees', 'staff'], response: "Total Headcount: **45**. \nSaudization: **78%** (Platinum)." },
            { keywords: ['cash', 'liquidity'], response: "Current cash runway covers **6 months** of OpEx. Financial position is very stable." },
            { keywords: ['hi', 'hello'], response: "Hello Mr. Hisham. I'm here to support your decisions. Which metric would you like to review?" }
        ]
    };

    const rules = knowledgeBase[lang];
    for (const rule of rules) {
        if (rule.keywords.some(k => text.includes(k))) {
            return rule.response;
        }
    }

    return lang === 'ar' 
        ? "عذراً، بصلاحياتي الحالية لا أملك إجابة دقيقة لهذا السؤال. هل تريد مني تحويل الاستفسار للمدير المالي أو الإداري؟"
        : "I don't have the exact data for this query. Should I forward this to the CFO or CAO?";
}
