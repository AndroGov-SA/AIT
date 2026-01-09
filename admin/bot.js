(function() {
    // 1. Configuration & Language Detection
    const lang = localStorage.getItem('lang') || 'ar';
    const isAr = lang === 'ar';

    // 2. Dictionary for Static Text (UI Elements)
    const t = {
        title: 'AndroBot',
        subtitle: isAr ? 'مساعد الحوكمة الذكي (Live AI)' : 'AI Governance Assistant (Live)',
        welcome: isAr 
            ? 'مرحباً بك في AndroGov 👋<br>أنا متصل الآن بنظام Gemini الذكي. اسألني عن أي تفاصيل تخص الشركة، اللوائح، أو المساهمين.' 
            : 'Welcome to AndroGov 👋<br>I am connected to Gemini AI. Ask me anything about the company, bylaws, or shareholders.',
        placeholder: isAr ? 'اكتب استفسارك هنا...' : 'Type your query here...',
        suggestions: {
            quorum: { 
                label: isAr ? 'ما هو النصاب؟' : 'What is the quorum?', 
                val: isAr ? 'ما هو نصاب الجمعية العامة العادية وغير العادية؟' : 'What is the quorum for OGA and EGA?' 
            },
            owners: { 
                label: isAr ? 'كبار المساهمين' : 'Major Shareholders', 
                val: isAr ? 'من هم كبار المساهمين ونسب ملكيتهم؟' : 'Who are the major shareholders and their percentages?' 
            },
            fees: { 
                label: isAr ? 'مكافآت المجلس' : 'Board Fees', 
                val: isAr ? 'كم تبلغ مكافأة حضور اجتماعات مجلس الإدارة واللجان؟' : 'What are the meeting fees for Board and Committees?' 
            }
        },
        direction: isAr ? 'rtl' : 'ltr'
    };

    // 3. Inject HTML UI
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
                    <button class="suggestion-btn" data-q="${t.suggestions.fees.val}">${t.suggestions.fees.label}</button>
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

    function toggleChat() {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) input.focus();
    }

    if(fab) fab.addEventListener('click', toggleChat);
    if(closeBtn) closeBtn.addEventListener('click', toggleChat);

    // --- GEMINI INTEGRATION ---
    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // UI: User Message
        appendMessage(text, 'user');
        input.value = '';
        showTyping();

        try {
            // Call Gemini API
            const responseText = await callGeminiAPI(text);
            removeTyping();
            appendMessage(responseText, 'bot');
        } catch (error) {
            console.error("Gemini Error:", error);
            removeTyping();
            appendMessage(isAr ? "عذراً، حدث خطأ في الاتصال بالنظام." : "Sorry, connection error.", 'bot');
        }
    }

    if(sendBtn) sendBtn.addEventListener('click', sendMessage);
    if(input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            input.value = btn.getAttribute('data-q');
            sendMessage();
        });
    });

    // --- API LOGIC ---
    async function callGeminiAPI(userQuery) {
        const apiKey = ""; // API Key injected by environment
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        // System Prompt: Context about Andromeda
        const systemInstruction = `
        You are AndroBot, the AI Governance Assistant for 'Andromeda Information Technology' (Saudi Closed Joint Stock Company).
        
        KEY DATA (Context):
        - Capital: 6,000,000 SAR (Fully Paid).
        - Shares: 600,000 Shares (Par value 10 SAR).
        - Headquarters: Riyadh.
        
        OWNERSHIP (Shareholders):
        1. Heirs of Mohammed Al-Suhaibani: 35% (210,000 shares).
        2. BG LTD Company: 15% (90,000 shares).
        3. Hesham Al-Suhaibani (Vice/CEO): 10% (60,000 shares).
        4. Others (Abdullah Al-Hawas, Mansour Al-Yami, etc.): 5% each.

        BOARD OF DIRECTORS (Current Term 2025-2028):
        - Chairman: Abdullah Al-Hawas (Non-Executive).
        - Vice/CEO: Hesham Al-Suhaibani (Executive).
        - Member: Mansour Al-Yami (Executive).
        - Member: Ahmed Al-Suhaibani (Independent).
        - Secretary: Ayman Almaghrabi.

        COMMITTEES:
        - Audit Committee (Active): Mohammed Al-Enezi (Chair), Adel Sasa, Ahmed Al-Suhaibani.
        - Nomination & Remuneration: Not yet formed.
        - Executive Committee: Not yet formed.

        FINANCIAL POLICY (Remuneration):
        - Board Meeting Fee: 2,000 SAR per member.
        - Committee Meeting Fee: 1,500 SAR per member.
        - Secretary Meeting Fee: 1,000 SAR.
        - Annual Cap: 500,000 SAR per member.

        GOVERNANCE RULES (Bylaws):
        - Ordinary GA Quorum: 25% of capital.
        - Extraordinary GA Quorum: 50% of capital.
        - Circular Resolutions: Require 100% approval (unanimous).

        INSTRUCTIONS:
        - Provide short, concise, and professional answers.
        - If the user asks in Arabic, reply in Arabic. If in English, reply in English.
        - Format key numbers in bold <b>text</b>.
        - Do not hallucinate. If info is missing, say it's not in the current context.
        `;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('API Request Failed');

        const data = await response.json();
        // Extract text and convert markdown bold (**text**) to HTML bold (<b>text</b>) for the chat UI
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text || (isAr ? "لا توجد إجابة" : "No response");
        text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // Simple Markdown parser
        text = text.replace(/\n/g, '<br>'); // Line breaks
        return text;
    }

    // --- UI Helpers ---
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
