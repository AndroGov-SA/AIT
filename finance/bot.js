/**
 * AndroGov AI Assistant (AndroBot) v2.0
 * Features:
 * - Bilingual Support (AR/EN)
 * - Auto-Context Detection (Reads page title to know context)
 * - Hybrid Mode: Uses API if key provided, otherwise falls back to smart local simulation.
 */

(function() {
    // 1. Configuration & Language Detection
    const lang = localStorage.getItem('lang') || 'ar';
    const isAr = lang === 'ar';

    // 2. UI Dictionary
    const t = {
        title: 'AndroBot',
        subtitle: isAr ? 'مساعد الحوكمة الذكي' : 'AI Governance Assistant',
        welcome: isAr 
            ? 'مرحباً بك في AndroGov 👋<br>أنا المساعد الذكي للنظام. أنا هنا للإجابة على استفساراتك حول هذه الصفحة.' 
            : 'Welcome to AndroGov 👋<br>I am your AI assistant. I am here to help you with inquiries about this page.',
        placeholder: isAr ? 'اكتب استفسارك هنا...' : 'Type your query here...',
        direction: isAr ? 'rtl' : 'ltr'
    };

    // 3. Inject HTML UI
    // Note: We check if container exists to prevent duplicates
    if (!document.getElementById('andro-bot-container')) {
        const botHTML = `
        <div id="andro-bot-container" class="fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-50 flex flex-col items-start gap-4 font-sans" dir="${t.direction}">
            <!-- Chat Window -->
            <div id="chat-window" class="hidden bg-white dark:bg-slate-800 w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col chat-window-anim" style="height: 500px; max-height: 70vh;">
                <!-- Header -->
                <div class="bg-brandBlue p-4 flex justify-between items-center text-white">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <i class="fa-solid fa-robot"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm">${t.title}</h4>
                            <p class="text-[10px] text-white/80">${t.subtitle}</p>
                        </div>
                    </div>
                    <button id="close-chat-btn" class="text-white/80 hover:text-white transition"><i class="fa-solid fa-times"></i></button>
                </div>
                
                <!-- Body -->
                <div id="chat-body" class="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto custom-scroll space-y-3 flex flex-col">
                    <div class="chat-bubble bot">
                        ${t.welcome}
                    </div>
                    <!-- Context Aware Suggestions -->
                    <div class="flex flex-wrap gap-2 mt-2" id="suggestions">
                        <!-- Injected by JS based on Page Context -->
                    </div>
                </div>

                <!-- Input -->
                <div class="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                    <input type="text" id="chat-input" placeholder="${t.placeholder}" class="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-brandBlue outline-none dark:text-white">
                    <button id="send-btn" class="w-10 h-10 rounded-lg bg-brandBlue text-white hover:bg-blue-700 transition flex items-center justify-center">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>

            <!-- Floating Button -->
            <button id="chat-fab" class="w-14 h-14 bg-brandBlue hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-2xl transition-all transform hover:scale-110 active:scale-95 animate-bounce-slow">
                <i class="fa-solid fa-comment-dots"></i>
                <span class="absolute top-0 right-0 w-4 h-4 bg-brandRed rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', botHTML);
    }

    // 4. Logic & Event Listeners
    const chatWindow = document.getElementById('chat-window');
    const fab = document.getElementById('chat-fab');
    const closeBtn = document.getElementById('close-chat-btn');
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');
    const suggestionsBox = document.getElementById('suggestions');

    // -- Initialize Suggestions based on Page Title --
    initSuggestions();

    function toggleChat() {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) input.focus();
    }

    if(fab) fab.addEventListener('click', toggleChat);
    if(closeBtn) closeBtn.addEventListener('click', toggleChat);

    // --- MAIN SEND FUNCTION ---
    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // UI: User Message
        appendMessage(text, 'user');
        input.value = '';
        showTyping();

        // --- DEMO MODE LOGIC ---
        // بما أن هذا ديمو، سنستخدم الردود المحلية الذكية بدلاً من محاولة الاتصال الفاشل
        const apiKey = ""; // اتركها فارغة للديمو

        if (!apiKey) {
            setTimeout(() => {
                removeTyping();
                // Get answer based on current page context
                const response = getContextResponse(text, isAr);
                appendMessage(response, 'bot');
            }, 800); // تأخير بسيط لمحاكاة التفكير
            return;
        }

        // If API key exists, call Gemini
        try {
            const responseText = await callGeminiAPI(text, apiKey);
            removeTyping();
            appendMessage(responseText, 'bot');
        } catch (error) {
            removeTyping();
            // Fallback to local response on error
            const response = getContextResponse(text, isAr);
            appendMessage(response, 'bot');
        }
    }

    if(sendBtn) sendBtn.addEventListener('click', sendMessage);
    if(input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    // --- LOCAL INTELLIGENCE (Context Aware) ---
    function getContextResponse(query, isAr) {
        const q = query.toLowerCase();
        const pageTitle = document.title.toLowerCase();

        // 1. Context: Shareholder Registry
        if (pageTitle.includes('shareholder') || pageTitle.includes('مساهم')) {
            if (q.includes('major') || q.includes('كبار') || q.includes('owner') || q.includes('ملاك') || q.includes('ورثة')) {
                return isAr 
                    ? `أكبر الملاك هم <b>ورثة محمد السحيباني</b> بنسبة 35% (210,000 سهم)، يليهم شركة بيجي المحدودة (15%).`
                    : `Major shareholders are <b>Heirs of Al-Suhaibani</b> (35%) followed by BG LTD (15%).`;
            }
            if (q.includes('total') || q.includes('count') || q.includes('عدد') || q.includes('أسهم')) {
                return isAr
                    ? `إجمالي عدد الأسهم هو <b>600,000 سهم</b> بقيمة اسمية 10 ريال.`
                    : `Total issued shares: <b>600,000</b> (Par value 10 SAR).`;
            }
            if (q.includes('capital') || q.includes('رأس') || q.includes('مال')) {
                return isAr ? `رأس المال الحالي: <b>6,000,000 ريال سعودي</b> (مدفوع بالكامل).` : `Current Capital: <b>6,000,000 SAR</b> (Fully Paid).`;
            }
        }

        // 2. Context: Board of Directors
        else if (pageTitle.includes('board') || pageTitle.includes('مجلس')) {
            if (q.includes('chair') || q.includes('رئيس')) {
                return isAr
                    ? `رئيس مجلس الإدارة هو <b>عبدالله بن محمد الحواس</b> (غير تنفيذي).`
                    : `The Chairman is <b>Abdullah Al-Hawas</b> (Non-Executive).`;
            }
            if (q.includes('fee') || q.includes('pay') || q.includes('مكافأة') || q.includes('بدل')) {
                return isAr
                    ? `مكافأة حضور الجلسة هي <b>2,000 ريال</b> للعضو، و <b>1,000 ريال</b> لأمين السر.`
                    : `Meeting fee is <b>2,000 SAR</b> per member, and <b>1,000 SAR</b> for the secretary.`;
            }
            if (q.includes('secretary') || q.includes('أمين')) {
                return isAr ? `أمين سر المجلس هو <b>أيمن المغربي</b>.` : `Board Secretary is <b>Ayman Almaghrabi</b>.`;
            }
        }

        // 3. Context: General Assembly
        else if (pageTitle.includes('assembly') || pageTitle.includes('جمعيات')) {
            if (q.includes('quorum') || q.includes('نصاب')) {
                return isAr
                    ? `نصاب الجمعية العامة العادية هو <b>25%</b> من رأس المال، وغير العادية <b>50%</b>.`
                    : `Quorum for Ordinary GA is <b>25%</b>, and for Extraordinary GA is <b>50%</b>.`;
            }
        }

        // Default / General Governance
        if (q.includes('hello') || q.includes('hi') || q.includes('مرحبا') || q.includes('هلا')) {
            return isAr ? `أهلاً بك! كيف يمكنني مساعدتك في بيانات هذه الصفحة؟` : `Hello! How can I help you with this page data?`;
        }

        return isAr 
            ? `عذراً، لم أجد إجابة دقيقة. يمكنك سؤالي عن <b>أهم الأرقام</b> أو <b>السياسات</b> في هذه الصفحة.` 
            : `Sorry, I didn't find a precise answer. Ask me about <b>key figures</b> or <b>policies</b> on this page.`;
    }

    function initSuggestions() {
        if(!suggestionsBox) return;
        const pageTitle = document.title.toLowerCase();
        let items = [];

        if (pageTitle.includes('shareholder') || pageTitle.includes('مساهم')) {
            items = isAr 
                ? [{l:'كبار الملاك', v:'من هم كبار الملاك؟'}, {l:'رأس المال', v:'كم رأس المال؟'}] 
                : [{l:'Major Owners', v:'Who are major owners?'}, {l:'Capital', v:'What is the capital?'}];
        } else if (pageTitle.includes('board') || pageTitle.includes('مجلس')) {
            items = isAr
                ? [{l:'مكافأة الجلسة', v:'كم مكافأة الجلسة؟'}, {l:'الرئيس', v:'من هو رئيس المجلس؟'}]
                : [{l:'Meeting Fee', v:'What is the meeting fee?'}, {l:'Chairman', v:'Who is the chairman?'}];
        } else {
            items = isAr
                ? [{l:'الحالة العامة', v:'ما هي حالة الامتثال؟'}, {l:'مهام عاجلة', v:'ما هي المهام العاجلة؟'}]
                : [{l:'Status', v:'What is compliance status?'}, {l:'Tasks', v:'Urgent tasks'}];
        }

        suggestionsBox.innerHTML = items.map(i => 
            `<button class="suggestion-btn text-xs bg-white border border-brandBlue/30 text-brandBlue px-3 py-1.5 rounded-full hover:bg-blue-50 transition" onclick="fillInput('${i.v}')">${i.l}</button>`
        ).join('');
    }

    // Expose helper to window for HTML onClick (if needed, though event listeners are better)
    window.fillInput = function(val) {
        if(input) {
            input.value = val;
            sendMessage();
        }
    };

    async function callGeminiAPI(userQuery, apiKey) {
        // ... (API Code remains same as placeholder for future)
    }

    function appendMessage(html, sender) {
        const div = document.createElement('div');
        div.className = `chat-bubble ${sender}`;
        div.innerHTML = html;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typing-indicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTyping() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

})();
