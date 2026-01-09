(function() {
    // 1. Configuration & Language Detection
    const lang = localStorage.getItem('lang') || 'ar';
    const isAr = lang === 'ar';

    // 2. Dictionary for Static Text
    const t = {
        title: 'AndroBot',
        subtitle: isAr ? 'مساعد الحوكمة الذكي' : 'AI Governance Assistant',
        welcome: isAr 
            ? 'مرحباً بك في AndroGov 👋<br>أنا مساعدك الذكي. يمكنني الإجابة عن استفسارات الحوكمة، نسب الملكية، أو المهام العاجلة.' 
            : 'Welcome to AndroGov 👋<br>I am your AI assistant. I can answer questions about governance, ownership structure, or urgent tasks.',
        placeholder: isAr ? 'اكتب استفسارك هنا...' : 'Type your query here...',
        suggestions: {
            quorum: { 
                label: isAr ? 'ما هو النصاب؟' : 'What is the quorum?', 
                val: isAr ? 'ما هو النصاب القانوني؟' : 'What is the legal quorum?' 
            },
            owners: { 
                label: isAr ? 'كبار المساهمين' : 'Major Shareholders', 
                val: isAr ? 'من هم كبار المساهمين؟' : 'Who are major shareholders?' 
            },
            tasks: { 
                label: isAr ? 'المهام العاجلة' : 'Urgent Tasks', 
                val: isAr ? 'المهام العاجلة' : 'Urgent tasks' 
            }
        },
        direction: isAr ? 'rtl' : 'ltr',
        align: isAr ? 'right-0' : 'left-0' // For FAB positioning adjustment if needed
    };

    // 3. Inject HTML UI
    // Note: We remove the hardcoded dir="rtl" and use ${t.direction}
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
                <div class="flex flex-wrap gap-2 mt-2" id="suggestions">
                    <button class="suggestion-btn" data-q="${t.suggestions.quorum.val}">${t.suggestions.quorum.label}</button>
                    <button class="suggestion-btn" data-q="${t.suggestions.owners.val}">${t.suggestions.owners.label}</button>
                    <button class="suggestion-btn" data-q="${t.suggestions.tasks.val}">${t.suggestions.tasks.label}</button>
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

    // Only inject if not already there (to prevent duplicates on re-runs)
    if (!document.getElementById('andro-bot-container')) {
        document.body.insertAdjacentHTML('beforeend', botHTML);
    }

    // 4. Logic & Event Listeners
    const chatWindow = document.getElementById('chat-window');
    const fab = document.getElementById('chat-fab');
    const closeBtn = document.getElementById('close-chat-btn');
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    // Toggle Chat
    function toggleChat() {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) input.focus();
    }

    if(fab) fab.addEventListener('click', toggleChat);
    if(closeBtn) closeBtn.addEventListener('click', toggleChat);

    // Send Message
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // User Message
        appendMessage(text, 'user');
        input.value = '';

        // Typing Indicator
        showTyping();

        // Process (Simulated Delay)
        setTimeout(() => {
            removeTyping();
            const response = getAIResponse(text, isAr);
            appendMessage(response, 'bot');
        }, 1000);
    }

    if(sendBtn) sendBtn.addEventListener('click', sendMessage);
    if(input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    // Handle Suggestions
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            input.value = btn.getAttribute('data-q');
            sendMessage();
        });
    });

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

    // 5. Knowledge Base (Multilingual)
    function getAIResponse(query, isArabic) {
        const q = query.toLowerCase();
        
        if (isArabic) {
            // --- Arabic Logic ---
            if (q.includes('نصاب') || q.includes('حضور')) {
                return `وفقاً للنظام الأساسي:<br>
                - <b>الجمعية العادية:</b> تتطلب حضور مساهمين يمثلون <b>25%</b> من رأس المال.<br>
                - <b>الجمعية غير العادية:</b> تتطلب حضور <b>50%</b> من رأس المال.`;
            }
            if (q.includes('امتثال') || q.includes('نسبة')) {
                return `نسبة الامتثال الحالية هي <b class="text-green-600">92%</b>.<br>للوصول إلى 100%، يرجى استكمال تحديث السجل التجاري.`;
            }
            if (q.includes('مهام') || q.includes('عاجل')) {
                return `لديك مهمة عاجلة: <b>اعتماد سياسة المكافآت</b> (الاستحقاق: 01/02/2026).<br>وهناك طلب مراجعة تقرير الرواتب.`;
            }
            if (q.includes('ورثة') || q.includes('سحيباني') || q.includes('مساهم')) {
                return `أكبر الملاك هم <b>ورثة محمد السحيباني</b> (35%)، يليهم هشام السحيباني (10%)، وشركة بيجي المحدودة.`;
            }
            if (q.includes('صلاحي') || q.includes('أمين')) {
                return `بصفتك <b>أمين السر</b>، تشمل صلاحياتك: تدوين المحاضر، حفظ السجلات، ومتابعة تنفيذ القرارات.`;
            }
            return `عذراً، لم أفهم استفسارك.<br>جرب السؤال عن: <b>النصاب، الامتثال، أو كبار المساهمين</b>.`;

        } else {
            // --- English Logic ---
            if (q.includes('quorum') || q.includes('attend')) {
                return `According to the Bylaws:<br>
                - <b>Ordinary Assembly:</b> Requires shareholders representing <b>25%</b> of capital.<br>
                - <b>Extraordinary Assembly:</b> Requires attendance of <b>50%</b> of capital.`;
            }
            if (q.includes('compliance') || q.includes('rate')) {
                return `Current compliance rate is <b class="text-green-600">92%</b>.<br>To reach 100%, please complete the Commercial Registry update.`;
            }
            if (q.includes('task') || q.includes('urgent')) {
                return `You have an urgent task: <b>Approve Bonus Policy</b> (Due: 01/02/2026).<br>Also, pending Payroll Report review.`;
            }
            if (q.includes('heirs') || q.includes('shareholder') || q.includes('owner')) {
                return `Major shareholders are <b>Heirs of Al-Suhaibani</b> (35%), followed by Hesham Al-Suhaibani (10%), and BG Ltd.`;
            }
            if (q.includes('permission') || q.includes('secretary')) {
                return `As <b>Board Secretary</b>, your role includes: Drafting minutes, maintaining records, and tracking resolution implementation.`;
            }
            return `Sorry, I didn't catch that.<br>Try asking about: <b>Quorum, Compliance, or Shareholders</b>.`;
        }
    }
})();
