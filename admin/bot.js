/**
 * AndroBot v4.0 - AI Governance Assistant
 * @description Fully integrated with AndroGov core system
 * @version 4.0.0
 * @requires AppConfig, I18n, DataService
 */

const AndroBot = (function() {
  // ==========================================
  // CONFIGURATION
  // ==========================================
  const _config = {
    apiKey: '', // Empty = demo mode
    position: 'left', // or 'right'
    minQueryLength: 3,
    maxHistorySize: 50
  };

  // ==========================================
  // STATE
  // ==========================================
  let _state = {
    isOpen: false,
    isInitialized: false,
    conversationHistory: [],
    currentContext: null
  };

  // ==========================================
  // DOM ELEMENTS
  // ==========================================
  let _elements = {
    container: null,
    window: null,
    body: null,
    input: null,
    sendBtn: null,
    fab: null,
    suggestions: null
  };

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function init() {
    if (_state.isInitialized) return;
    
    // Wait for AppConfig and I18n
    if (typeof AppConfig === 'undefined' || typeof I18n === 'undefined') {
      console.warn('⚠️ AndroBot: Waiting for core modules...');
      setTimeout(init, 100);
      return;
    }

    // Detect current page context
    _detectPageContext();

    // Inject HTML
    _injectHTML();

    // Cache elements
    _cacheElements();

    // Setup event listeners
    _setupEventListeners();

    // Load context suggestions
    _loadContextSuggestions();

    _state.isInitialized = true;
    console.log('✅ AndroBot v4.0 initialized', {
      context: _state.currentContext,
      lang: AppConfig.getLang()
    });
  }

  // ==========================================
  // DETECT PAGE CONTEXT
  // ==========================================
  function _detectPageContext() {
    const path = window.location.pathname.toLowerCase();
    const title = document.title.toLowerCase();

    if (path.includes('shareholder') || title.includes('مساهم')) {
      _state.currentContext = 'shareholders';
    } else if (path.includes('board') || title.includes('مجلس')) {
      _state.currentContext = 'board';
    } else if (path.includes('user') || title.includes('مستخدم')) {
      _state.currentContext = 'users';
    } else if (path.includes('compliance') || title.includes('امتثال')) {
      _state.currentContext = 'compliance';
    } else if (path.includes('committee') || title.includes('لجنة')) {
      _state.currentContext = 'committees';
    } else {
      _state.currentContext = 'general';
    }
  }

  // ==========================================
  // INJECT HTML
  // ==========================================
  function _injectHTML() {
    const lang = AppConfig.getLang();
    const isRTL = AppConfig.isRTL();
    const isDark = AppConfig.isDarkMode();
    const pos = isRTL ? 'left-6' : 'right-6';

    const html = `
      <div id="andro-bot-container" class="fixed bottom-6 ${pos} z-50 flex flex-col items-start gap-4 font-sans" dir="${isRTL ? 'rtl' : 'ltr'}">
        
        <!-- Chat Window -->
        <div id="chat-window" class="hidden bg-white dark:bg-slate-800 w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col" style="height: 500px; max-height: 70vh;">
          
          <!-- Header -->
          <div class="bg-gradient-to-r from-brandBlue to-blue-600 p-4 flex justify-between items-center text-white">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <i class="fa-solid fa-robot"></i>
              </div>
              <div>
                <h4 class="font-bold text-sm">${I18n.t('bot.title')}</h4>
                <p class="text-[10px] text-white/80">${I18n.t('bot.subtitle')}</p>
              </div>
            </div>
            <button id="close-chat-btn" class="text-white/80 hover:text-white transition">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          
          <!-- Body -->
          <div id="chat-body" class="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto custom-scroll space-y-3">
            <div class="chat-bubble bot">${I18n.t('bot.welcome')}</div>
            <div class="flex flex-wrap gap-2 mt-2" id="suggestions"></div>
          </div>

          <!-- Input -->
          <div class="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
            <input 
              type="text" 
              id="chat-input" 
              placeholder="${I18n.t('bot.placeholder')}"
              class="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-brandBlue outline-none dark:text-white"
            >
            <button id="send-btn" class="w-10 h-10 rounded-lg bg-brandBlue text-white hover:bg-blue-700 transition flex items-center justify-center">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>

        <!-- FAB -->
        <button id="chat-fab" class="w-14 h-14 bg-gradient-to-br from-brandBlue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-2xl transition-all transform hover:scale-110 active:scale-95">
          <i class="fa-solid fa-comment-dots"></i>
          <span class="absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-4 h-4 bg-brandRed rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
        </button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    // Inject styles
    if (!document.getElementById('androbot-styles')) {
      const styles = `
        <style id="androbot-styles">
          .chat-bubble { 
            max-width: 85%; 
            padding: 10px 14px; 
            border-radius: 12px; 
            font-size: 0.9rem; 
            line-height: 1.5; 
            word-wrap: break-word;
            animation: bubbleIn 0.3s ease-out;
          }
          .chat-bubble.bot { 
            background-color: #f1f5f9; 
            color: #334155; 
            border-bottom-${AppConfig.isRTL() ? 'left' : 'right'}-radius: 2px;
            align-self: flex-start;
          }
          .dark .chat-bubble.bot { 
            background-color: #334155; 
            color: #f8fafc; 
          }
          .chat-bubble.user { 
            background-color: #4267B2; 
            color: white; 
            border-bottom-${AppConfig.isRTL() ? 'right' : 'left'}-radius: 2px;
            align-self: flex-end;
          }
          .typing-indicator { 
            display: flex; 
            align-items: center; 
            gap: 4px; 
            padding: 10px 14px; 
            background-color: #f1f5f9; 
            border-radius: 12px;
            width: fit-content;
          }
          .dark .typing-indicator { 
            background-color: #334155; 
          }
          .typing-indicator span { 
            display: inline-block; 
            width: 6px; 
            height: 6px; 
            background-color: #94a3b8; 
            border-radius: 50%; 
            animation: typing 1.4s infinite ease-in-out both; 
          }
          .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
          .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
          @keyframes typing { 
            0%, 80%, 100% { transform: scale(0); } 
            40% { transform: scale(1); } 
          }
          @keyframes bubbleIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
      `;
      document.head.insertAdjacentHTML('beforeend', styles);
    }
  }

  // ==========================================
  // CACHE ELEMENTS
  // ==========================================
  function _cacheElements() {
    _elements = {
      container: document.getElementById('andro-bot-container'),
      window: document.getElementById('chat-window'),
      body: document.getElementById('chat-body'),
      input: document.getElementById('chat-input'),
      sendBtn: document.getElementById('send-btn'),
      fab: document.getElementById('chat-fab'),
      suggestions: document.getElementById('suggestions')
    };
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================
  function _setupEventListeners() {
    _elements.fab?.addEventListener('click', toggle);
    document.getElementById('close-chat-btn')?.addEventListener('click', toggle);
    _elements.sendBtn?.addEventListener('click', sendMessage);
    
    _elements.input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Listen for language change
    window.addEventListener('langChanged', () => {
      _updateUI();
      _loadContextSuggestions();
    });

    // Listen for theme change
    window.addEventListener('themeChanged', () => {
      // Styles automatically adapt via dark: classes
    });
  }

  // ==========================================
  // TOGGLE CHAT WINDOW
  // ==========================================
  function toggle() {
    _state.isOpen = !_state.isOpen;
    _elements.window?.classList.toggle('hidden', !_state.isOpen);
    
    if (_state.isOpen) {
      _elements.input?.focus();
    }
  }

  // ==========================================
  // SEND MESSAGE
  // ==========================================
  async function sendMessage() {
    const text = _elements.input?.value?.trim();
    if (!text || text.length < _config.minQueryLength) return;

    // Add to history
    _state.conversationHistory.push({ role: 'user', content: text });

    // Show user message
    _appendMessage(text, 'user');
    _elements.input.value = '';

    // Show typing
    _showTyping();

    // Get response (with delay for UX)
    setTimeout(() => {
      _removeTyping();
      const response = _getResponse(text);
      _appendMessage(response, 'bot');
      _state.conversationHistory.push({ role: 'bot', content: response });
    }, 800);
  }

  // ==========================================
  // GET RESPONSE (KNOWLEDGE BASE)
  // ==========================================
  function _getResponse(query) {
    const q = query.toLowerCase();
    const lang = AppConfig.getLang();

    // Try DataService first if available
    if (typeof DataService !== 'undefined') {
      // Shareholders questions
      if (_matchesPattern(q, ['مساهم', 'ملاك', 'shareholder', 'owner'])) {
        if (_matchesPattern(q, ['كبار', 'أكبر', 'major', 'largest'])) {
          const major = DataService.getMajorShareholders(10);
          if (major.length > 0) {
            const top = major[0];
            return lang === 'ar'
              ? `أكبر المساهمين هم <b>${top.displayName}</b> بنسبة ${top.percent}%.`
              : `The largest shareholder is <b>${top.displayName}</b> with ${top.percent}%.`;
          }
        }

        if (_matchesPattern(q, ['عدد', 'إجمالي', 'total', 'count'])) {
          const stats = DataService.getShareholdersStats();
          return lang === 'ar'
            ? `إجمالي عدد المساهمين: <b>${stats.totalCount}</b><br>رأس المال: <b>${I18n.formatCurrency(stats.totalCapital)}</b>`
            : `Total shareholders: <b>${stats.totalCount}</b><br>Capital: <b>${I18n.formatCurrency(stats.totalCapital)}</b>`;
        }
      }

      // Board questions
      if (_matchesPattern(q, ['مجلس', 'إدارة', 'board', 'director'])) {
        if (_matchesPattern(q, ['رئيس', 'chairman'])) {
          const board = DataService.getBoardMembers();
          const chairman = board.find(m => m.boardRole === 'chairman');
          if (chairman) {
            return lang === 'ar'
              ? `رئيس مجلس الإدارة هو <b>${chairman.displayName}</b>.`
              : `The Chairman is <b>${chairman.displayName}</b>.`;
          }
        }

        if (_matchesPattern(q, ['أعضاء', 'members', 'عدد'])) {
          const board = DataService.getBoardMembers();
          return lang === 'ar'
            ? `مجلس الإدارة يتكون من <b>${board.length}</b> أعضاء.`
            : `The Board consists of <b>${board.length}</b> members.`;
        }
      }

      // Users questions
      if (_matchesPattern(q, ['موظف', 'مستخدم', 'user', 'employee'])) {
        const stats = DataService.getSystemStats();
        return lang === 'ar'
          ? `إجمالي المستخدمين: <b>${stats.totalUsers}</b><br>الإدارة التنفيذية: <b>${stats.executiveCount}</b>`
          : `Total users: <b>${stats.totalUsers}</b><br>Executives: <b>${stats.executiveCount}</b>`;
      }

      // Compliance questions
      if (_matchesPattern(q, ['امتثال', 'compliance', 'حوكمة', 'governance'])) {
        return lang === 'ar'
          ? 'نسبة الامتثال الحالية: <b>92%</b>. النظام متوافق مع معايير SA_CL_2024 وISO 27001.'
          : 'Current compliance rate: <b>92%</b>. System compliant with SA_CL_2024 and ISO 27001.';
      }
    }

    // Greetings
    if (_matchesPattern(q, ['hello', 'hi', 'مرحبا', 'هلا', 'السلام', 'صباح', 'مساء'])) {
      return lang === 'ar'
        ? 'أهلاً وسهلاً! كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! How can I help you today?';
    }

    // Default fallback
    return lang === 'ar'
      ? 'عذراً، لم أجد إجابة دقيقة. يمكنك سؤالي عن:<br>• المساهمين وهيكل الملكية<br>• مجلس الإدارة واللجان<br>• المستخدمين والأدوار<br>• الامتثال والحوكمة'
      : 'Sorry, I couldn\'t find a precise answer. You can ask about:<br>• Shareholders & ownership<br>• Board & committees<br>• Users & roles<br>• Compliance & governance';
  }

  // ==========================================
  // PATTERN MATCHING HELPER
  // ==========================================
  function _matchesPattern(query, patterns) {
    return patterns.some(p => query.includes(p.toLowerCase()));
  }

  // ==========================================
  // APPEND MESSAGE
  // ==========================================
  function _appendMessage(html, sender) {
    const div = document.createElement('div');
    div.className = `chat-bubble ${sender}`;
    div.innerHTML = html;
    _elements.body?.appendChild(div);
    _elements.body.scrollTop = _elements.body.scrollHeight;
  }

  // ==========================================
  // TYPING INDICATOR
  // ==========================================
  function _showTyping() {
    const div = document.createElement('div');
    div.className = 'typing-indicator';
    div.id = 'typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    _elements.body?.appendChild(div);
    _elements.body.scrollTop = _elements.body.scrollHeight;
  }

  function _removeTyping() {
    document.getElementById('typing-indicator')?.remove();
  }

  // ==========================================
  // CONTEXT SUGGESTIONS
  // ==========================================
  function _loadContextSuggestions() {
    if (!_elements.suggestions) return;

    const lang = AppConfig.getLang();
    let items = [];

    switch (_state.currentContext) {
      case 'shareholders':
        items = lang === 'ar'
          ? [
              { label: 'كبار الملاك', query: 'من هم كبار المساهمين؟' },
              { label: 'رأس المال', query: 'كم رأس المال؟' }
            ]
          : [
              { label: 'Major Owners', query: 'Who are the major shareholders?' },
              { label: 'Capital', query: 'What is the capital?' }
            ];
        break;

      case 'board':
        items = lang === 'ar'
          ? [
              { label: 'رئيس المجلس', query: 'من هو رئيس المجلس؟' },
              { label: 'أعضاء المجلس', query: 'كم عدد أعضاء المجلس؟' }
            ]
          : [
              { label: 'Chairman', query: 'Who is the chairman?' },
              { label: 'Board Members', query: 'How many board members?' }
            ];
        break;

      case 'users':
        items = lang === 'ar'
          ? [
              { label: 'عدد المستخدمين', query: 'كم عدد المستخدمين؟' },
              { label: 'الأدوار', query: 'ما هي الأدوار المتاحة؟' }
            ]
          : [
              { label: 'User Count', query: 'How many users?' },
              { label: 'Roles', query: 'What roles are available?' }
            ];
        break;

      default:
        items = lang === 'ar'
          ? [
              { label: 'نسبة الامتثال', query: 'ما هي نسبة الامتثال؟' },
              { label: 'المساهمين', query: 'من هم المساهمين؟' }
            ]
          : [
              { label: 'Compliance', query: 'What is the compliance rate?' },
              { label: 'Shareholders', query: 'Who are the shareholders?' }
            ];
    }

    _elements.suggestions.innerHTML = items.map(i => `
      <button 
        onclick="AndroBot.ask('${i.query}')"
        class="text-xs bg-white dark:bg-slate-700 border border-brandBlue/30 text-brandBlue dark:text-blue-300 px-3 py-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-slate-600 transition"
      >
        ${i.label}
      </button>
    `).join('');
  }

  // ==========================================
  // UPDATE UI (Language Change)
  // ==========================================
  function _updateUI() {
    // Re-inject to update all text
    const wasOpen = _state.isOpen;
    _elements.container?.remove();
    _injectHTML();
    _cacheElements();
    _setupEventListeners();
    if (wasOpen) {
      _elements.window?.classList.remove('hidden');
      _state.isOpen = true;
    }
  }

  // ==========================================
  // PUBLIC API
  // ==========================================
  return {
    init,
    toggle,
    ask(question) {
      if (_elements.input) {
        _elements.input.value = question;
        sendMessage();
      }
      if (!_state.isOpen) toggle();
    },
    close() {
      if (_state.isOpen) toggle();
    },
    getState() {
      return { ..._state };
    }
  };
})();

// ==========================================
// AUTO INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for other modules to load
  setTimeout(() => {
    AndroBot.init();
  }, 300);
});

// ==========================================
// GLOBAL EXPORT
// ==========================================
if (typeof window !== 'undefined') {
  window.AndroBot = AndroBot;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AndroBot;
}
