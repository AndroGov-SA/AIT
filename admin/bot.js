/**
 * AndroGov AI Assistant (AndroBot) v3.0
 * @description Context-aware chatbot with DataService integration
 * @requires DataService (optional - falls back to static responses)
 */

const AndroBot = (function() {
    // ==========================================
    // CONFIGURATION
    // ==========================================
    const _config = {
        lang: localStorage.getItem('lang') || 'ar',
        apiKey: '', // Leave empty for demo mode
        position: 'left' // 'left' or 'right'
    };

    const isAr = _config.lang === 'ar';

    // ==========================================
    // TRANSLATIONS
    // ==========================================
    const _t = {
        title: 'AndroBot',
        subtitle: isAr ? 'مساعد الحوكمة الذكي' : 'AI Governance Assistant',
        welcome: isAr
            ? 'مرحباً بك في AndroGov 👋<br>أنا المساعد الذكي للنظام. كيف يمكنني مساعدتك؟'
            : 'Welcome to AndroGov 👋<br>I am your AI assistant. How can I help you?',
        placeholder: isAr ? 'اكتب استفسارك هنا...' : 'Type your query here...',
        direction: isAr ? 'rtl' : 'ltr',
        thinking: isAr ? 'جاري التفكير...' : 'Thinking...',
        error: isAr ? 'عذراً، حدث خطأ. حاول مرة أخرى.' : 'Sorry, an error occurred. Please try again.'
    };

    // ==========================================
    // KNOWLEDGE BASE (Context-Aware Responses)
    // ==========================================
    const _knowledgeBase = {
        // General Greetings
        greetings: {
            patterns: ['hello', 'hi', 'مرحبا', 'هلا', 'السلام', 'صباح', 'مساء'],
            response: {
                ar: 'أهلاً وسهلاً! كيف يمكنني مساعدتك اليوم؟',
                en: 'Hello! How can I help you today?'
            }
        },
        
        // Shareholders Context
        shareholders: {
            patterns: ['مساهم', 'ملاك', 'أسهم', 'shareholder', 'owner', 'shares', 'ورثة', 'heirs'],
            topics: {
                major: {
                    patterns: ['كبار', 'أكبر', 'major', 'largest'],
                    response: {
                        ar: 'أكبر الملاك هم <b>ورثة محمد السحيباني</b> بنسبة 35%، يليهم شركة بيجي المحدودة بنسبة 15%.',
                        en: 'The largest shareholders are <b>Heirs of Al-Suhaibani</b> (35%), followed by BG LTD (15%).'
                    }
                },
                total: {
                    patterns: ['إجمالي', 'عدد', 'total', 'count', 'كم'],
                    response: {
                        ar: 'إجمالي عدد الأسهم هو <b>600,000 سهم</b> بقيمة اسمية 10 ريال للسهم.',
                        en: 'Total shares: <b>600,000</b> with par value of 10 SAR per share.'
                    }
                },
                capital: {
                    patterns: ['رأس', 'مال', 'capital'],
                    response: {
                        ar: 'رأس المال المصدر: <b>6,000,000 ريال سعودي</b> (مدفوع بالكامل).',
                        en: 'Issued Capital: <b>6,000,000 SAR</b> (Fully Paid).'
                    }
                }
            }
        },

        // Board Context
        board: {
            patterns: ['مجلس', 'إدارة', 'board', 'director', 'رئيس'],
            topics: {
                chairman: {
                    patterns: ['رئيس', 'chairman', 'chair'],
                    response: {
                        ar: 'رئيس مجلس الإدارة هو <b>عبدالله بن محمد الحواس</b> (غير تنفيذي).',
                        en: 'The Chairman is <b>Abdullah Al-Hawas</b> (Non-Executive).'
                    }
                },
                secretary: {
                    patterns: ['أمين', 'سر', 'secretary'],
                    response: {
                        ar: 'أمين سر المجلس هو <b>أيمن المغربي</b>.',
                        en: 'Board Secretary is <b>Ayman Almaghrabi</b>.'
                    }
                },
                fee: {
                    patterns: ['مكافأة', 'بدل', 'fee', 'remuneration'],
                    response: {
                        ar: 'مكافأة حضور الجلسة: <b>2,000 ريال</b> للعضو، و<b>1,000 ريال</b> لأمين السر.',
                        en: 'Meeting fee: <b>2,000 SAR</b> per member, <b>1,000 SAR</b> for secretary.'
                    }
                }
            }
        },

        // General Assembly Context
        assembly: {
            patterns: ['جمعية', 'عمومية', 'assembly', 'quorum', 'نصاب'],
            topics: {
                quorum: {
                    patterns: ['نصاب', 'quorum'],
                    response: {
                        ar: 'نصاب الجمعية العادية: <b>25%</b> | غير العادية: <b>50%</b> (الانعقاد الأول).',
                        en: 'Quorum - Ordinary: <b>25%</b> | Extraordinary: <b>50%</b> (First meeting).'
                    }
                }
            }
        },

        // Compliance Context
        compliance: {
            patterns: ['امتثال', 'compliance', 'حوكمة', 'governance'],
            response: {
                ar: 'نسبة الامتثال الحالية: <b>92%</b>. النظام متوافق مع معايير SA_CL_2024 وISO 27001.',
                en: 'Current compliance rate: <b>92%</b>. System compliant with SA_CL_2024 and ISO 27001.'
            }
        },

        // Default/Fallback
        default: {
            response: {
                ar: 'عذراً، لم أجد إجابة دقيقة. يمكنك سؤالي عن:<br>• المساهمين وهيكل الملكية<br>• مجلس الإدارة واللجان<br>• الجمعيات العمومية<br>• الامتثال والحوكمة',
                en: 'Sorry, I couldn\'t find a precise answer. You can ask about:<br>• Shareholders & ownership<br>• Board & committees<br>• General assemblies<br>• Compliance & governance'
            }
        }
    };

    // ==========================================
    // DOM ELEMENTS
    // ==========================================
    let _elements = {
        container: null,
        window: null,
        body: null,
        input: null,
        suggestions: null
    };

    // ==========================================
    // INITIALIZATION
    // ==========================================
    function init() {
        if (document.getElementById('andro-bot-container')) return; // Already initialized
        
        injectHTML();
        cacheElements();
        setupEventListeners();
        loadContextSuggestions();
        
        console.log('✅ AndroBot initialized');
    }

    function injectHTML() {
        const pos = isAr ? 'left-6' : 'right-6';
        
        const html = `
        <div id="andro-bot-container" class="fixed bottom-6 ${pos} z-50 flex flex-col items-start gap-4 font-sans" dir="${_t.direction}">
            <!-- Chat Window -->
            <div id="chat-window" class="hidden bg-white dark:bg-slate-800 w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col" style="height: 500px; max-height: 70vh;">
                <!-- Header -->
                <div class="bg-brandBlue p-4 flex justify-between items-center text-white">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <i class="fa-solid fa-robot"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm">${_t.title}</h4>
                            <p class="text-[10px] text-white/80">${_t.subtitle}</p>
                        </div>
                    </div>
                    <button id="close-chat-btn" class="text-white/80 hover:text-white transition">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
                
                <!-- Body -->
                <div id="chat-body" class="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto custom-scroll space-y-3 flex flex-col">
                    <div class="chat-bubble bot">${_t.welcome}</div>
                    <div class="flex flex-wrap gap-2 mt-2" id="suggestions"></div>
                </div>

                <!-- Input -->
                <div class="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                    <input type="text" id="chat-input" placeholder="${_t.placeholder}" 
                           class="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-brandBlue outline-none dark:text-white">
                    <button id="send-btn" class="w-10 h-10 rounded-lg bg-brandBlue text-white hover:bg-blue-700 transition flex items-center justify-center">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>

            <!-- Floating Button -->
            <button id="chat-fab" class="w-14 h-14 bg-brandBlue hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-2xl transition-all transform hover:scale-110 active:scale-95">
                <i class="fa-solid fa-comment-dots"></i>
                <span class="absolute top-0 right-0 w-4 h-4 bg-brandRed rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', html);

        // Inject styles
        if (!document.getElementById('androbot-styles')) {
            const styles = `
            <style id="androbot-styles">
                .chat-bubble { max-width: 85%; padding: 10px 14px; border-radius: 12px; font-size: 0.9rem; line-height: 1.5; word-wrap: break-word; }
                .chat-bubble.bot { background-color: #f1f5f9; color: #334155; border-bottom-right-radius: 2px; }
                .dark .chat-bubble.bot { background-color: #334155; color: #f8fafc; }
                .chat-bubble.user { background-color: #4267B2; color: white; border-bottom-left-radius: 2px; margin-right: auto; margin-left: auto; }
                .typing-indicator span { display: inline-block; width: 6px; height: 6px; background-color: #94a3b8; border-radius: 50%; animation: typing 1.4s infinite ease-in-out both; margin: 0 1px; }
                .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
                .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
                @keyframes typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
            </style>`;
            document.head.insertAdjacentHTML('beforeend', styles);
        }
    }

    function cacheElements() {
        _elements = {
            container: document.getElementById('andro-bot-container'),
            window: document.getElementById('chat-window'),
            body: document.getElementById('chat-body'),
            input: document.getElementById('chat-input'),
            suggestions: document.getElementById('suggestions')
        };
    }

    function setupEventListeners() {
        document.getElementById('chat-fab')?.addEventListener('click', toggleChat);
        document.getElementById('close-chat-btn')?.addEventListener('click', toggleChat);
        document.getElementById('send-btn')?.addEventListener('click', sendMessage);
        
        _elements.input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // ==========================================
    // CHAT LOGIC
    // ==========================================
    function toggleChat() {
        _elements.window?.classList.toggle('hidden');
        if (!_elements.window?.classList.contains('hidden')) {
            _elements.input?.focus();
        }
    }

    async function sendMessage() {
        const text = _elements.input?.value?.trim();
        if (!text) return;

        // Show user message
        appendMessage(text, 'user');
        _elements.input.value = '';
        
        // Show typing indicator
        showTyping();

        // Get response (with small delay for UX)
        setTimeout(() => {
            removeTyping();
            const response = getResponse(text);
            appendMessage(response, 'bot');
        }, 600);
    }

    function getResponse(query) {
        const q = query.toLowerCase();
        const lang = _config.lang;

        // Check greetings
        if (_knowledgeBase.greetings.patterns.some(p => q.includes(p))) {
            return _knowledgeBase.greetings.response[lang];
        }

        // Check each context
        for (const [contextKey, context] of Object.entries(_knowledgeBase)) {
            if (contextKey === 'greetings' || contextKey === 'default') continue;

            // Check if query matches context patterns
            if (context.patterns?.some(p => q.includes(p))) {
                // Check specific topics within context
                if (context.topics) {
                    for (const [topicKey, topic] of Object.entries(context.topics)) {
                        if (topic.patterns?.some(p => q.includes(p))) {
                            return topic.response[lang];
                        }
                    }
                }
                // Return general context response if exists
                if (context.response) {
                    return context.response[lang];
                }
            }
        }

        // Default response
        return _knowledgeBase.default.response[lang];
    }

    function appendMessage(html, sender) {
        const div = document.createElement('div');
        div.className = `chat-bubble ${sender}`;
        div.innerHTML = html;
        _elements.body?.appendChild(div);
        _elements.body.scrollTop = _elements.body.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typing-indicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        _elements.body?.appendChild(div);
        _elements.body.scrollTop = _elements.body.scrollHeight;
    }

    function removeTyping() {
        document.getElementById('typing-indicator')?.remove();
    }

    // ==========================================
    // SUGGESTIONS (Context-Aware)
    // ==========================================
    function loadContextSuggestions() {
        const pageTitle = document.title.toLowerCase();
        let items = [];

        if (pageTitle.includes('shareholder') || pageTitle.includes('مساهم')) {
            items = isAr
                ? [{ l: 'كبار الملاك', q: 'من هم كبار الملاك؟' }, { l: 'رأس المال', q: 'كم رأس المال؟' }]
                : [{ l: 'Major Owners', q: 'Who are the major owners?' }, { l: 'Capital', q: 'What is the capital?' }];
        } else if (pageTitle.includes('board') || pageTitle.includes('مجلس')) {
            items = isAr
                ? [{ l: 'رئيس المجلس', q: 'من هو رئيس المجلس؟' }, { l: 'مكافأة الجلسة', q: 'كم مكافأة الجلسة؟' }]
                : [{ l: 'Chairman', q: 'Who is the chairman?' }, { l: 'Meeting Fee', q: 'What is the meeting fee?' }];
        } else if (pageTitle.includes('user') || pageTitle.includes('مستخدم')) {
            items = isAr
                ? [{ l: 'الصلاحيات', q: 'ما هي صلاحيات المدير؟' }, { l: 'الأدوار', q: 'ما هي الأدوار المتاحة؟' }]
                : [{ l: 'Permissions', q: 'What are manager permissions?' }, { l: 'Roles', q: 'What roles are available?' }];
        } else {
            items = isAr
                ? [{ l: 'نسبة الامتثال', q: 'ما هي نسبة الامتثال؟' }, { l: 'المساهمين', q: 'من هم المساهمين؟' }]
                : [{ l: 'Compliance', q: 'What is the compliance rate?' }, { l: 'Shareholders', q: 'Who are the shareholders?' }];
        }

        if (_elements.suggestions) {
            _elements.suggestions.innerHTML = items.map(i =>
                `<button class="text-xs bg-white dark:bg-slate-700 border border-brandBlue/30 text-brandBlue dark:text-blue-300 px-3 py-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-slate-600 transition" onclick="AndroBot.ask('${i.q}')">${i.l}</button>`
            ).join('');
        }
    }

    // ==========================================
    // PUBLIC API
    // ==========================================
    return {
        init,
        toggle: toggleChat,
        ask(question) {
            if (_elements.input) {
                _elements.input.value = question;
                sendMessage();
            }
        }
    };
})();

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    AndroBot.init();
});

// Global access
window.AndroBot = AndroBot;
