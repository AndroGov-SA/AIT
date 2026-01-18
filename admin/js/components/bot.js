/**
 * AndroBot v4.0 - AI Governance Assistant
 * @description Fully integrated with AndroGov core system
 * @version 4.0.0
 * @requires AppConfig, I18n, DataService
 * @file admin/js/components/bot.js
 */

const AndroBot = (function() {
  // ==========================================
  // CONFIGURATION
  // ==========================================
  const _config = {
    apiKey: '', // Empty = demo mode
    position: 'left', // or 'right' (will auto-adjust for RTL)
    minQueryLength: 2,
    maxHistorySize: 50,
    typingDelay: 800
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
    
    // Wait for core modules
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
      lang: AppConfig.getLang(),
      dataServiceAvailable: typeof DataService !== 'undefined'
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
    } else if (path.includes('task') || title.includes('مهام')) {
      _state.currentContext = 'tasks';
    } else if (path.includes('policies') || title.includes('سياسات')) {
      _state.currentContext = 'policies';
    } else {
      _state.currentContext = 'general';
    }
  }

  // ==========================================
  // INJECT HTML
  // ==========================================
  // ==========================================
  // INJECT HTML (جاهز: نافذة محادثة بدون زر عائم)
  // ==========================================
  function _injectHTML() {
    const lang = AppConfig.getLang();
    const isRTL = AppConfig.isRTL();
    // تحديد موقع النافذة (يمين أو يسار)
    const pos = isRTL ? 'left-6' : 'right-6';

    // 1. كود HTML للنافذة
    const html = `
      <div id="andro-bot-container" class="fixed bottom-20 ${pos} z-[100] flex flex-col items-start gap-4 font-sans pointer-events-none" dir="${isRTL ? 'rtl' : 'ltr'}">
        
                <div id="chat-window" class="hidden pointer-events-auto bg-white dark:bg-slate-800 w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col transform transition-all duration-300 origin-bottom scale-95 opacity-0" style="height: 500px; max-height: 70vh;">
          
                    <div class="bg-gradient-to-r from-brandBlue to-blue-600 p-4 flex justify-between items-center text-white">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <i class="fa-solid fa-robot"></i>
              </div>
              <div>
                <h4 class="font-bold text-sm">${I18n.t('bot.title') || 'المساعد الذكي'}</h4>
                <p class="text-[10px] text-white/80">AndroGov AI</p>
              </div>
            </div>
            <button id="close-chat-btn" class="text-white/80 hover:text-white transition" title="${I18n.t('bot.close')}">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          
                    <div id="chat-body" class="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto custom-scroll space-y-3 flex flex-col">
            <div class="chat-bubble bot">${I18n.t('bot.welcome')}</div>
            <div class="flex flex-wrap gap-2 mt-2" id="suggestions"></div>
          </div>

                    <div class="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
            <input 
              type="text" 
              id="chat-input" 
              placeholder="${I18n.t('bot.placeholder')}"
              class="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-brandBlue outline-none dark:text-white"
            >
            <button id="send-btn" class="w-10 h-10 rounded-lg bg-brandBlue text-white hover:bg-blue-700 transition flex items-center justify-center" title="${I18n.t('bot.send')}">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    // 2. كود CSS (مدمج وجاهز)
    if (!document.getElementById('androbot-styles')) {
      const styles = `
        <style id="androbot-styles">
          /* كلاس الفتح: يظهر النافذة ويعيد حجمها الطبيعي */
          #chat-window.open { display: flex; transform: scale(1); opacity: 1; pointer-events: auto; }
          
          /* فقاعات المحادثة */
          .chat-bubble { max-width: 85%; padding: 10px 14px; border-radius: 12px; font-size: 0.9rem; line-height: 1.5; word-wrap: break-word; animation: bubbleIn 0.3s ease-out; }
          
          /* رسائل البوت */
          .chat-bubble.bot { background-color: #f1f5f9; color: #334155; border-bottom-${isRTL ? 'left' : 'right'}-radius: 2px; align-self: flex-start; }
          .dark .chat-bubble.bot { background-color: #334155; color: #f8fafc; }
          
          /* رسائل المستخدم */
          .chat-bubble.user { background-color: #4267B2; color: white; border-bottom-${isRTL ? 'right' : 'left'}-radius: 2px; align-self: flex-end; }
          
          /* مؤشر الكتابة (Typing...) */
          .typing-indicator { display: flex; align-items: center; gap: 4px; padding: 10px 14px; background-color: #f1f5f9; border-radius: 12px; width: fit-content; align-self: flex-start; }
          .dark .typing-indicator { background-color: #334155; }
          .typing-indicator span { display: inline-block; width: 6px; height: 6px; background-color: #94a3b8; border-radius: 50%; animation: typing 1.4s infinite ease-in-out both; }
          .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
          .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
          
          /* الحركات (Animations) */
          @keyframes typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
          @keyframes bubbleIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
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

    // Listen for theme change (automatically handled by Tailwind dark: classes)
    window.addEventListener('themeChanged', () => {
      console.log('🎨 Theme changed, bot UI auto-adapts');
    });

    // Listen for page navigation
    window.addEventListener('popstate', () => {
      _detectPageContext();
      _loadContextSuggestions();
    });
  }

  // ==========================================
  // TOGGLE CHAT WINDOW
  // ==========================================
  function toggle() {
    _state.isOpen = !_state.isOpen;
    const win = _elements.window;
    
    if (_state.isOpen) {
        // إظهار العنصر أولاً (لا يزال شفافاً)
        win.classList.remove('hidden');
        
        // تفعيل الترانزيشن بعد لحظة قصيرة جداً ليظهر بشكل ناعم
        requestAnimationFrame(() => {
            win.classList.add('open');
            _elements.input?.focus();
        });
    } else {
        // إزالة كلاس الفتح (يبدأ الاختفاء)
        win.classList.remove('open');
        
        // الانتظار حتى ينتهي الأنيميشن (300ms) ثم إخفاء العنصر تماماً
        setTimeout(() => {
            win.classList.add('hidden');
        }, 300);
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
    }, _config.typingDelay);
  }

  // ==========================================
  // GET RESPONSE (KNOWLEDGE BASE)
  // ==========================================
  function _getResponse(query) {
    const q = query.toLowerCase();
    const lang = AppConfig.getLang();

    // Greetings first
    if (_matchesPattern(q, ['hello', 'hi', 'مرحبا', 'هلا', 'السلام', 'صباح', 'مساء', 'اهلا'])) {
      return I18n.t('bot.responses.greeting');
    }

    // Try DataService if available
    if (typeof DataService !== 'undefined') {
      
      // === SHAREHOLDERS QUERIES ===
      if (_matchesPattern(q, ['مساهم', 'ملاك', 'shareholder', 'owner', 'أسهم', 'shares'])) {
        
        // Major shareholders
        if (_matchesPattern(q, ['كبار', 'أكبر', 'major', 'largest', 'top'])) {
          try {
            const major = DataService.getMajorShareholders(5);
            if (major.length > 0) {
              const top = major[0];
              return lang === 'ar'
                ? `أكبر المساهمين هم <b>${top.displayName}</b> بنسبة <b>${top.percent}%</b> (${I18n.formatNumber(top.shares)} سهم).`
                : `The largest shareholder is <b>${top.displayName}</b> with <b>${top.percent}%</b> (${I18n.formatNumber(top.shares)} shares).`;
            }
          } catch (e) {
            console.warn('DataService error:', e);
          }
        }

        // Total count/capital
        if (_matchesPattern(q, ['عدد', 'إجمالي', 'total', 'count', 'كم', 'how many'])) {
          try {
            const stats = DataService.getShareholdersStats();
            return lang === 'ar'
              ? `إجمالي عدد المساهمين: <b>${stats.totalCount}</b><br>رأس المال: <b>${I18n.formatCurrency(stats.totalCapital)}</b><br>عدد الأسهم: <b>${I18n.formatNumber(stats.totalShares)}</b>`
              : `Total shareholders: <b>${stats.totalCount}</b><br>Capital: <b>${I18n.formatCurrency(stats.totalCapital)}</b><br>Total shares: <b>${I18n.formatNumber(stats.totalShares)}</b>`;
          } catch (e) {
            console.warn('DataService error:', e);
          }
        }
      }

      // === BOARD QUERIES ===
      if (_matchesPattern(q, ['مجلس', 'إدارة', 'board', 'director'])) {
        
        // Chairman
        if (_matchesPattern(q, ['رئيس', 'chairman', 'chair'])) {
          try {
            const board = DataService.getBoardMembers();
            const chairman = board.find(m => m.boardRole === 'chairman');
            if (chairman) {
              return lang === 'ar'
                ? `رئيس مجلس الإدارة هو <b>${chairman.displayName}</b><br>${chairman.displayTitle}`
                : `The Chairman is <b>${chairman.displayName}</b><br>${chairman.displayTitle}`;
            }
          } catch (e) {
            console.warn('DataService error:', e);
          }
        }

        // Board members count
        if (_matchesPattern(q, ['أعضاء', 'members', 'عدد', 'count', 'كم'])) {
          try {
            const board = DataService.getBoardMembers();
            return lang === 'ar'
              ? `مجلس الإدارة يتكون من <b>${board.length}</b> أعضاء.`
              : `The Board consists of <b>${board.length}</b> members.`;
          } catch (e) {
            console.warn('DataService error:', e);
          }
        }
      }

      // === USERS QUERIES ===
      if (_matchesPattern(q, ['موظف', 'مستخدم', 'user', 'employee', 'staff'])) {
        try {
          const stats = DataService.getSystemStats();
          return lang === 'ar'
            ? `إجمالي المستخدمين: <b>${stats.totalUsers}</b><br>الإدارة التنفيذية: <b>${stats.executiveCount}</b><br>أدوار متعددة: <b>${stats.multiRoleUsers}</b>`
            : `Total users: <b>${stats.totalUsers}</b><br>Executives: <b>${stats.executiveCount}</b><br>Multi-role users: <b>${stats.multiRoleUsers}</b>`;
        } catch (e) {
          console.warn('DataService error:', e);
        }
      }

      // === DEPARTMENTS QUERIES ===
      if (_matchesPattern(q, ['قسم', 'إدارة', 'department', 'dept'])) {
        try {
          const depts = DataService.getDepartments();
          return lang === 'ar'
            ? `عدد الإدارات: <b>${depts.length}</b><br>من أهمها: ${depts.slice(0, 3).map(d => d.displayName).join(' • ')}`
            : `Total departments: <b>${depts.length}</b><br>Including: ${depts.slice(0, 3).map(d => d.displayName).join(' • ')}`;
        } catch (e) {
          console.warn('DataService error:', e);
        }
      }

      // === COMPLIANCE QUERIES ===
      if (_matchesPattern(q, ['امتثال', 'compliance', 'حوكمة', 'governance'])) {
        return I18n.t('bot.responses.compliance');
      }

      // === COMPANY INFO ===
      if (_matchesPattern(q, ['شركة', 'company', 'اندروميدا', 'andromeda'])) {
        try {
          const profile = DataService.getCompanyProfile();
          return lang === 'ar'
            ? `<b>${profile.name}</b><br>سجل تجاري: ${profile.crNumber}<br>رأس المال: ${profile.capital.formatted}`
            : `<b>${profile.name}</b><br>CR: ${profile.crNumber}<br>Capital: ${profile.capital.formatted}`;
        } catch (e) {
          console.warn('DataService error:', e);
        }
      }
    }

    // Default fallback
    return I18n.t('bot.responses.noAnswer');
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
        items = [
          { label: I18n.t('bot.suggestions.majorShareholders'), query: I18n.t('bot.questions.majorShareholders') },
          { label: I18n.t('bot.suggestions.capital'), query: I18n.t('bot.questions.capital') }
        ];
        break;

      case 'board':
        items = [
          { label: I18n.t('bot.suggestions.chairman'), query: I18n.t('bot.questions.chairman') },
          { label: I18n.t('bot.suggestions.boardMembers'), query: I18n.t('bot.questions.boardCount') }
        ];
        break;

      case 'users':
        items = [
          { label: I18n.t('bot.suggestions.userCount'), query: I18n.t('bot.questions.userCount') },
          { label: I18n.t('bot.suggestions.roles'), query: I18n.t('bot.questions.availableRoles') }
        ];
        break;

      default:
        items = [
          { label: I18n.t('bot.suggestions.compliance'), query: I18n.t('bot.questions.complianceRate') },
          { label: I18n.t('bot.suggestions.shareholders'), query: I18n.t('bot.questions.whoAreShareholders') }
        ];
    }

    _elements.suggestions.innerHTML = items.map(i => `
      <button 
        onclick="AndroBot.ask('${i.query.replace(/'/g, "\\'")}')"
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
    // Save state
    const wasOpen = _state.isOpen;
    const history = [..._state.conversationHistory];

    // Remove and re-inject
    _elements.container?.remove();
    _injectHTML();
    _cacheElements();
    _setupEventListeners();

    // Restore state
    _state.conversationHistory = history;
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
      if (!_state.isOpen) toggle();
      if (_elements.input) {
        _elements.input.value = question;
        sendMessage();
      }
    },
    close() {
      if (_state.isOpen) toggle();
    },
    open() {
      if (!_state.isOpen) toggle();
    },
    getState() {
      return { ..._state };
    },
    clearHistory() {
      _state.conversationHistory = [];
      if (_elements.body) {
        _elements.body.innerHTML = `
          <div class="chat-bubble bot">${I18n.t('bot.welcome')}</div>
          <div class="flex flex-wrap gap-2 mt-2" id="suggestions"></div>
        `;
        _elements.suggestions = document.getElementById('suggestions');
        _loadContextSuggestions();
      }
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
