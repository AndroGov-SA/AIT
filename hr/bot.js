/**
 * AndroGov HR AI Assistant
 * ملف الجافاسكريبت المسؤول عن بوت المساعدة الذكي
 */

document.addEventListener('DOMContentLoaded', () => {
    initBot();
});

function initBot() {
    // التحقق من اللغة الحالية
    const isRTL = document.documentElement.dir === 'rtl';
    const lang = document.documentElement.lang || 'ar';

    // نصوص الواجهة
    const uiText = {
        ar: {
            title: "المساعد الذكي",
            subtitle: "متاح لمساعدتك 24/7",
            placeholder: "اكتب استفسارك هنا...",
            welcome: "مرحباً بك يا منصور 👋\nأنا مساعدك الذكي للموارد البشرية. كيف يمكنني خدمتك اليوم؟\nيمكنك سؤالي عن: الرواتب، الإجازات، أو السياسات.",
            send: "إرسال"
        },
        en: {
            title: "AI Assistant",
            subtitle: "Available 24/7",
            placeholder: "Type your query...",
            welcome: "Hello Mansour 👋\nI am your HR AI Assistant. How can I help you today?\nYou can ask about: Payroll, Leaves, or Policies.",
            send: "Send"
        }
    };

    const t = uiText[lang];
    const positionClass = isRTL ? 'left-6' : 'right-6'; // عكس مكان البوت عن القائمة الجانبية

    // 1. حقن كود HTML الخاص بالبوت
    const botHTML = `
        <div id="ai-widget" class="fixed bottom-6 ${positionClass} z-50 font-sans flex flex-col items-end gap-4">
            
            <div id="chat-window" class="hidden w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 origin-bottom transform scale-95 opacity-0" style="height: 500px; max-height: 80vh;">
                
                <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex items-center justify-between text-white">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <i class="fa-solid fa-robot text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-sm">${t.title}</h3>
                            <p class="text-[10px] text-slate-300 flex items-center gap-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> ${t.subtitle}
                            </p>
                        </div>
                    </div>
                    <button onclick="toggleChat()" class="text-white/70 hover:text-white transition"><i class="fa-solid fa-xmark"></i></button>
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

            <button onclick="toggleChat()" id="chat-fab" class="w-14 h-14 bg-brandRed text-white rounded-full shadow-lg shadow-red-500/40 flex items-center justify-center text-2xl hover:scale-110 transition duration-300 group">
                <i class="fa-solid fa-comment-dots group-hover:hidden"></i>
                <i class="fa-solid fa-chevron-down hidden group-hover:block"></i>
                
                <span class="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', botHTML);
}

// --- وظائف التحكم ---

function toggleChat() {
    const window = document.getElementById('chat-window');
    const fab = document.getElementById('chat-fab');
    
    if (window.classList.contains('hidden')) {
        // Open
        window.classList.remove('hidden');
        setTimeout(() => {
            window.classList.remove('scale-95', 'opacity-0');
            window.classList.add('scale-100', 'opacity-100');
        }, 10);
        document.getElementById('chat-input').focus();
    } else {
        // Close
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

    // إضافة رسالة المستخدم
    addMessage(message, 'user');
    input.value = '';

    // محاكاة التفكير والرد
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateBotResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000); // تأخير عشوائي بين 1-2 ثانية
}

function addMessage(text, sender) {
    const container = document.getElementById('chat-messages');
    const isUser = sender === 'user';
    const isRTL = document.documentElement.dir === 'rtl';
    
    // تنسيق الرسالة
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

// --- قاعدة المعرفة (المخ) ---
function generateBotResponse(input) {
    const text = input.toLowerCase();
    const lang = document.documentElement.lang || 'ar';

    // قاعدة بيانات الردود (Simple Rule-Based)
    const knowledgeBase = {
        ar: [
            { keywords: ['راتب', 'رواتب', 'تحويل', 'salary', 'payroll'], response: "يتم تحويل الرواتب في يوم 27 من كل شهر ميلادي. يمكنك مراجعة قسيمة الراتب من صفحة 'مسير الرواتب'." },
            { keywords: ['إجازة', 'اجازة', 'رصيد', 'leave', 'vacation'], response: "رصيد إجازاتك السنوي الحالي هو 24 يوماً. يمكنك تقديم طلب جديد من صفحة 'الإجازات'." },
            { keywords: ['تأمين', 'طبي', 'insurance', 'medical'], response: "أنت مشترك في فئة (VIP) لدى بوبا العربية. رقم البوليصة: 10293847." },
            { keywords: ['دوام', 'حضور', 'بصمة', 'attendance'], response: "ساعات العمل الرسمية من 8:00 ص إلى 4:00 م. يتم احتساب التأخير بعد الساعة 8:15 ص." },
            { keywords: ['انتداب', 'سفر', 'trip'], response: "بدل الانتداب الداخلي هو 500 ريال يومياً، والخارجي 900 ريال. يتطلب الموافقة المسبقة." },
            { keywords: ['مرحبا', 'هلا', 'سلام', 'hi', 'hello'], response: "أهلاً بك! كيف يمكنني مساعدتك في شؤون الموارد البشرية اليوم؟" }
        ],
        en: [
            { keywords: ['salary', 'payroll', 'pay'], response: "Salaries are transferred on the 27th of each Gregorian month. Check your payslip in the 'Payroll' page." },
            { keywords: ['leave', 'vacation', 'balance'], response: "Your current annual leave balance is 24 days. You can apply from the 'Leaves' page." },
            { keywords: ['insurance', 'medical'], response: "You are enrolled in the (VIP) class with Bupa Arabia. Policy No: 10293847." },
            { keywords: ['attendance', 'shift', 'time'], response: "Official working hours are 8:00 AM to 4:00 PM. Lateness is calculated after 8:15 AM." },
            { keywords: ['trip', 'travel', 'per diem'], response: "Domestic per diem is 500 SAR, International is 900 SAR. Pre-approval is required." },
            { keywords: ['hi', 'hello', 'welcome'], response: "Hello! How can I assist you with HR matters today?" }
        ]
    };

    // البحث عن رد مناسب
    const rules = knowledgeBase[lang];
    for (const rule of rules) {
        if (rule.keywords.some(k => text.includes(k))) {
            return rule.response;
        }
    }

    // الرد الافتراضي
    return lang === 'ar' 
        ? "عذراً، لم أفهم استفسارك تماماً. هل يمكنك إعادة صياغته؟ أو تواصل مع إدارة الموارد البشرية مباشرة."
        : "I'm sorry, I didn't quite get that. Could you rephrase? Or contact HR administration directly.";
}
