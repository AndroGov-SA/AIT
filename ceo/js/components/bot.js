/**
 * AndroBot - AI Assistant for CEO
 * @file ceo/js/components/bot.js
 */

const AndroBot = (function() {
  
  let _isOpen = false;
  let _container = null;
  let _messages = [];

  const _responses = {
    ar: {
      greeting: 'مرحباً! أنا AndroBot، مساعدك الذكي التنفيذي. كيف يمكنني مساعدتك اليوم؟',
      help: 'يمكنني مساعدتك في:\n• تحليل الأداء المالي\n• مراجعة التقارير الاستراتيجية\n• متابعة المخاطر\n• الإجابة على استفساراتك',
      financial: 'الأداء المالي للربع الحالي:\n• الإيرادات: 4.2 مليون ريال (+12.5%)\n• المصروفات: 1.8 مليون ريال\n• صافي الربح: 2.4 مليون ريال\n• هامش الربح: 57%',
      projects: 'المشاريع النشطة: 8 مشاريع\n• 7 مشاريع في الموعد ✓\n• مشروع واحد متأخر (التجارة الإلكترونية)',
      risk: 'تقييم المخاطر الحالي:\n• المخاطر العالية: 2\n• المخاطر المتوسطة: 5\n• المخاطر المنخفضة: 12',
      default: 'عذراً، لم أفهم استفسارك. يمكنك سؤالي عن:\n• الأداء المالي\n• المشاريع النشطة\n• المخاطر\n• التقارير'
    },
    en: {
      greeting: 'Hello! I\'m AndroBot, your executive AI assistant. How can I help you today?',
      help: 'I can help you with:\n• Financial performance analysis\n• Strategic reports review\n• Risk monitoring\n• Answering your questions',
      financial: 'Current Quarter Financial Performance:\n• Revenue: 4.2M SAR (+12.5%)\n• Expenses: 1.8M SAR\n• Net Profit: 2.4M SAR\n• Net Margin: 57%',
      projects: 'Active Projects: 8\n• 7 projects on track ✓\n• 1 delayed (E-Commerce Platform)',
      risk: 'Current Risk Assessment:\n• High Risk: 2\n• Medium Risk: 5\n• Low Risk: 12',
      default: 'Sorry, I didn\'t understand. You can ask me about:\n• Financial performance\n• Active projects\n• Risks\n• Reports'
    }
  };

  // ==========================================
  // INITIALIZATION
  // ==========================================
  
  function init() {
    if (_container) return;
    
    const lang = localStorage.getItem('lang') || 'ar';
    const isRTL = lang === 'ar';

    _container = document.createElement('div');
    _container.id = 'androbot-container';
    _container.className = 'fixed bottom-6 z-[9999] transition-all duration-300';
    _container.style[isRTL ? 'left' : 'right'] = '24px';
    
    _container.innerHTML = `
      <!-- Toggle Button -->
      <button id="androbot-toggle" 
              class="w-16 h-16 rounded-full bg-gradient-to-br from-brandBlue to-blue-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group border-4 border-white dark:border-slate-800">
        <i class="fa-solid fa-robot text-2xl group-hover:animate-bounce"></i>
        <span class="absolute -top-1 -${isRTL ? 'left' : 'right'}-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
      </button>

      <!-- Chat Window -->
      <div id="androbot-chat" 
           class="absolute bottom-20 ${isRTL ? 'left-0' : 'right-0'} w-96 h-[500px] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden transform scale-0 origin-bottom-${isRTL ? 'left' : 'right'} transition-all duration-300">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-brandBlue to-blue-600 p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <i class="fa-solid fa-robot text-white text-xl"></i>
            </div>
            <div>
              <h3 class="font-bold text-white text-sm">AndroBot</h3>
              <p class="text-[10px] text-white/80">${lang === 'ar' ? 'المساعد الذكي التنفيذي' : 'Executive AI Assistant'}</p>
            </div>
          </div>
          <button onclick="AndroBot.toggle()" class="w-8 h-8 rounded-lg hover:bg-white/10 text-white transition flex items-center justify-center">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Messages -->
        <div id="androbot-messages" class="flex-1 p-4 overflow-y-auto custom-scroll space-y-3 bg-slate-50 dark:bg-slate-900">
          <!-- Messages will be added here -->
        </div>

        <!-- Input -->
        <div class="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div class="flex gap-2">
            <input type="text" 
                   id="androbot-input" 
                   placeholder="${lang === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question...'}"
                   class="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:border-brandBlue transition"
                   onkeypress="if(event.key==='Enter') AndroBot.sendMessage()">
            <button onclick="AndroBot.sendMessage()" 
                    class="w-12 h-12 rounded-xl bg-brandBlue hover:bg-blue-700 text-white shadow-lg transition flex items-center justify-center">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          
          <!-- Quick Actions -->
          <div class="flex gap-2 mt-3 flex-wrap">
            <button onclick="AndroBot.quickAsk('financial')" class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium rounded-lg transition border border-slate-200 dark:border-slate-600">
              ${lang === 'ar' ? '💰 الأداء المالي' : '💰 Finance'}
            </button>
            <button onclick="AndroBot.quickAsk('projects')" class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium rounded-lg transition border border-slate-200 dark:border-slate-600">
              ${lang === 'ar' ? '📊 المشاريع' : '📊 Projects'}
            </button>
            <button onclick="AndroBot.quickAsk('risk')" class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-medium rounded-lg transition border border-slate-200 dark:border-slate-600">
              ${lang === 'ar' ? '⚠️ المخاطر' : '⚠️ Risks'}
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(_container);

    // Add initial greeting
    setTimeout(() => {
      addMessage(_responses[lang].greeting, 'bot');
    }, 500);
  }

  // ==========================================
  // MESSAGES
  // ==========================================
  
  function addMessage(text, type = 'user') {
    const messagesContainer = document.getElementById('androbot-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`;

    const time = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
      <div class="max-w-[80%]">
        ${type === 'bot' ? `
          <div class="flex items-start gap-2 mb-1">
            <div class="w-6 h-6 rounded-full bg-brandBlue flex items-center justify-center shrink-0">
              <i class="fa-solid fa-robot text-white text-xs"></i>
            </div>
            <span class="text-[10px] text-slate-400">${time}</span>
          </div>
        ` : ''}
        <div class="px-4 py-3 rounded-2xl ${
          type === 'user' 
            ? 'bg-brandBlue text-white rounded-br-none' 
            : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-600 rounded-bl-none'
        } shadow-sm">
          <p class="text-sm whitespace-pre-line leading-relaxed">${text}</p>
        </div>
        ${type === 'user' ? `
          <div class="text-left mt-1">
            <span class="text-[10px] text-slate-400">${time}</span>
          </div>
        ` : ''}
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    _messages.push({ text, type, time });
  }

  function sendMessage() {
    const input = document.getElementById('androbot-input');
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    input.value = '';

    // Simulate typing
    const messagesContainer = document.getElementById('androbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'flex justify-start';
    typingDiv.innerHTML = `
      <div class="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
        <div class="flex gap-1">
          <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
          <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
          <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Generate response
    setTimeout(() => {
      typingDiv.remove();
      const response = generateResponse(message);
      addMessage(response, 'bot');
    }, 1000);
  }

  function generateResponse(message) {
    const lang = localStorage.getItem('lang') || 'ar';
    const responses = _responses[lang];
    
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('مالي') || lowerMsg.includes('financial') || lowerMsg.includes('revenue') || lowerMsg.includes('ايراد')) {
      return responses.financial;
    }
    if (lowerMsg.includes('مشروع') || lowerMsg.includes('مشاريع') || lowerMsg.includes('project')) {
      return responses.projects;
    }
    if (lowerMsg.includes('مخاطر') || lowerMsg.includes('risk')) {
      return responses.risk;
    }
    if (lowerMsg.includes('مساعدة') || lowerMsg.includes('help')) {
      return responses.help;
    }
    
    return responses.default;
  }

  function quickAsk(topic) {
    const lang = localStorage.getItem('lang') || 'ar';
    const questions = {
      ar: {
        financial: 'ما هو الأداء المالي الحالي؟',
        projects: 'كم عدد المشاريع النشطة؟',
        risk: 'ما هي المخاطر الحالية؟'
      },
      en: {
        financial: 'What is the current financial performance?',
        projects: 'How many active projects?',
        risk: 'What are the current risks?'
      }
    };

    const input = document.getElementById('androbot-input');
    if (input) {
      input.value = questions[lang][topic];
      sendMessage();
    }
  }

  // ==========================================
  // TOGGLE
  // ==========================================
  
  function toggle() {
    init();
    
    _isOpen = !_isOpen;
    const chatWindow = document.getElementById('androbot-chat');
    
    if (chatWindow) {
      if (_isOpen) {
        chatWindow.style.transform = 'scale(1)';
        chatWindow.style.opacity = '1';
      } else {
        chatWindow.style.transform = 'scale(0)';
        chatWindow.style.opacity = '0';
      }
    }
  }

  // ==========================================
  // AUTO-INIT
  // ==========================================
  
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(init, 1000);
  });

  // ==========================================
  // PUBLIC API
  // ==========================================
  
  return {
    init,
    toggle,
    sendMessage,
    quickAsk
  };

})();

window.AndroBot = AndroBot;
