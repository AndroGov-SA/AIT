/**
 * AndroGov Role Switcher Component
 * @description Allows users with multiple roles to switch between contexts
 * @version 1.0.0
 * @requires AppConfig, I18n, DataService, PolicyHelpers
 */

const RoleSwitcher = (function() {
  // ==========================================
  // STATE
  // ==========================================
  let _state = {
    isOpen: false,
    currentUser: null,
    contexts: [],
    activeContext: null,
    containerId: 'role-switcher-container'
  };

  // ==========================================
  // INITIALIZATION
  // ==========================================

  /**
   * Initialize the role switcher
   * @param {string} userId - Current user ID
   */
  function init(userId) {
    if (!userId) {
      console.warn('⚠️ RoleSwitcher: No user ID provided');
      return;
    }

    // Get user contexts
    _state.currentUser = DataService.getUserById(userId);
    _state.contexts = _state.currentUser?.contexts || [];

    // Only show if user has multiple roles
    if (_state.contexts.length <= 1) {
      console.log('ℹ️ RoleSwitcher: User has single role, switcher not needed');
      return;
    }

    // Get active context from storage or use primary
    const storedContext = AppConfig.getActiveContext();
    const primaryContext = _state.contexts.find(c => c.isPrimary);
    
    _state.activeContext = storedContext 
      ? _state.contexts.find(c => c.context === storedContext) 
      : primaryContext || _state.contexts[0];

    // Set active context in AppConfig
    if (_state.activeContext) {
      AppConfig.setActiveContext(_state.activeContext.context);
    }

    console.log('✅ RoleSwitcher initialized', {
      user: _state.currentUser?.displayName,
      contexts: _state.contexts.length,
      active: _state.activeContext?.context
    });

    return _state;
  }

  // ==========================================
  // RENDERING
  // ==========================================

  /**
   * Render the role switcher button (for header)
   * @returns {string} HTML string
   */
  function renderButton() {
    if (_state.contexts.length <= 1) return '';

    const lang = AppConfig.getLang();
    const isRTL = lang === 'ar';
    const activeCtx = _state.activeContext;
    const ctxInfo = AppConfig.getContextInfo(activeCtx?.context);

    return `
      <div class="relative" id="${_state.containerId}">
        <button 
          id="role-switcher-btn"
          onclick="RoleSwitcher.toggle()"
          class="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition group"
          title="${I18n.t('roleSwitcher.title')}"
        >
          <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style="background-color: ${ctxInfo?.color || '#64748B'}">
            <i class="fa-solid ${ctxInfo?.icon || 'fa-user'}"></i>
          </div>
          <div class="text-${isRTL ? 'right' : 'left'} hidden sm:block">
            <p class="text-[10px] text-slate-400 leading-tight">${I18n.t('roleSwitcher.currentRole')}</p>
            <p class="text-xs font-bold text-slate-700 dark:text-white leading-tight">${ctxInfo?.label?.[lang] || activeCtx?.label?.[lang] || ''}</p>
          </div>
          <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 group-hover:text-slate-600 transition"></i>
          ${_state.contexts.length > 1 ? `<span class="absolute -top-1 -${isRTL ? 'left' : 'right'}-1 w-5 h-5 bg-brandBlue text-white text-[10px] rounded-full flex items-center justify-center font-bold">${_state.contexts.length}</span>` : ''}
        </button>
        
        <!-- Dropdown -->
        <div 
          id="role-switcher-dropdown"
          class="hidden absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
        >
          ${renderDropdownContent()}
        </div>
      </div>
    `;
  }

  /**
   * Render dropdown content
   * @returns {string} HTML string
   */
  function renderDropdownContent() {
    const lang = AppConfig.getLang();

    // Header
    let html = `
      <div class="p-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
        <p class="text-xs font-bold text-slate-500">${I18n.t('roleSwitcher.availableRoles')}</p>
      </div>
      <div class="p-2 max-h-80 overflow-y-auto custom-scroll">
    `;

    // Context items
    _state.contexts.forEach(ctx => {
      const ctxInfo = AppConfig.getContextInfo(ctx.context);
      const isActive = _state.activeContext?.context === ctx.context;
      const roleLabel = PolicyHelpers.getRoleLabel(ctx.role, lang);

      html += `
        <button 
          onclick="RoleSwitcher.switchTo('${ctx.context}')"
          class="w-full flex items-center gap-3 p-3 rounded-xl transition ${isActive 
            ? 'bg-brandBlue/10 border-2 border-brandBlue' 
            : 'hover:bg-slate-50 dark:hover:bg-slate-700 border-2 border-transparent'}"
        >
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style="background-color: ${ctxInfo?.color || '#64748B'}">
            <i class="fa-solid ${ctxInfo?.icon || 'fa-user'}"></i>
          </div>
          <div class="flex-1 text-${lang === 'ar' ? 'right' : 'left'}">
            <p class="text-sm font-bold ${isActive ? 'text-brandBlue' : 'text-slate-700 dark:text-white'}">${ctx.label?.[lang] || ctxInfo?.label?.[lang] || ctx.context}</p>
            <p class="text-[11px] text-slate-400">${roleLabel}</p>
          </div>
          ${isActive ? '<i class="fa-solid fa-circle-check text-brandBlue text-lg"></i>' : ''}
          ${ctx.isPrimary ? `<span class="text-[9px] bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300 px-2 py-0.5 rounded-full">${lang === 'ar' ? 'أساسي' : 'Primary'}</span>` : ''}
        </button>
      `;
    });

    html += '</div>';

    // Footer with user info
    if (_state.currentUser) {
      html += `
        <div class="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <img src="${_state.currentUser.avatar}" class="w-8 h-8 rounded-full">
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-700 dark:text-white truncate">${_state.currentUser.displayName}</p>
            <p class="text-[10px] text-slate-400 truncate">${_state.currentUser.email}</p>
          </div>
        </div>
      `;
    }

    return html;
  }

  /**
   * Render inline role badges (for profile/header)
   * @returns {string} HTML string
   */
  function renderBadges() {
    if (_state.contexts.length === 0) return '';

    const lang = AppConfig.getLang();

    return _state.contexts.map(ctx => {
      const ctxInfo = AppConfig.getContextInfo(ctx.context);
      const isActive = _state.activeContext?.context === ctx.context;

      return `
        <span 
          onclick="RoleSwitcher.switchTo('${ctx.context}')"
          class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold cursor-pointer transition ${isActive 
            ? 'bg-brandBlue text-white' 
            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}"
          title="${I18n.t('roleSwitcher.switchTo')}: ${ctx.label?.[lang]}"
        >
          <i class="fa-solid ${ctxInfo?.icon || 'fa-user'} text-[8px]"></i>
          ${ctx.label?.[lang] || ctx.context}
        </span>
      `;
    }).join('');
  }

  // ==========================================
  // ACTIONS
  // ==========================================

  /**
   * Toggle dropdown visibility
   */
  function toggle() {
    const dropdown = document.getElementById('role-switcher-dropdown');
    if (!dropdown) return;

    _state.isOpen = !_state.isOpen;
    dropdown.classList.toggle('hidden', !_state.isOpen);

    // Close on outside click
    if (_state.isOpen) {
      setTimeout(() => {
        document.addEventListener('click', _handleOutsideClick);
      }, 10);
    }
  }

  /**
   * Close dropdown
   */
  function close() {
    const dropdown = document.getElementById('role-switcher-dropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
    }
    _state.isOpen = false;
    document.removeEventListener('click', _handleOutsideClick);
  }

  /**
   * Switch to a different context/role
   * @param {string} contextKey
   */
  function switchTo(contextKey) {
    const newContext = _state.contexts.find(c => c.context === contextKey);
    
    if (!newContext) {
      console.warn('⚠️ Context not found:', contextKey);
      return;
    }

    _state.activeContext = newContext;
    AppConfig.setActiveContext(contextKey);
    
    // Close dropdown
    close();

    // Update UI
    _updateUI();

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('roleChanged', { 
      detail: { 
        context: contextKey, 
        role: newContext.role,
        label: newContext.label 
      } 
    }));

    // Show notification
    _showSwitchNotification(newContext);

    console.log('🔄 Role switched to:', contextKey);
  }

  // ==========================================
  // PRIVATE METHODS
  // ==========================================

  function _handleOutsideClick(e) {
    const container = document.getElementById(_state.containerId);
    if (container && !container.contains(e.target)) {
      close();
    }
  }

  function _updateUI() {
    const container = document.getElementById(_state.containerId);
    if (container) {
      container.outerHTML = renderButton();
    }
  }

  function _showSwitchNotification(context) {
    const lang = AppConfig.getLang();
    const ctxInfo = AppConfig.getContextInfo(context.context);
    const message = lang === 'ar' 
      ? `تم التبديل إلى: ${context.label?.ar || context.context}`
      : `Switched to: ${context.label?.en || context.context}`;

    // Use SweetAlert if available, otherwise console
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        toast: true,
        position: lang === 'ar' ? 'top-start' : 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'text-sm'
        }
      });
    } else {
      console.log('✅', message);
    }
  }

  // ==========================================
  // GETTERS
  // ==========================================

  /**
   * Get current active context
   * @returns {Object|null}
   */
  function getActiveContext() {
    return _state.activeContext ? { ..._state.activeContext } : null;
  }

  /**
   * Get all user contexts
   * @returns {Array}
   */
  function getContexts() {
    return [..._state.contexts];
  }

  /**
   * Check if user has multiple roles
   * @returns {boolean}
   */
  function hasMultipleRoles() {
    return _state.contexts.length > 1;
  }

  /**
   * Check if user has specific context
   * @param {string} contextKey
   * @returns {boolean}
   */
  function hasContext(contextKey) {
    return _state.contexts.some(c => c.context === contextKey);
  }

  /**
   * Get current role key
   * @returns {string|null}
   */
  function getCurrentRole() {
    return _state.activeContext?.role || null;
  }

  // ==========================================
  // RETURN PUBLIC API
  // ==========================================
  return {
    // Initialize
    init,

    // Rendering
    renderButton,
    renderBadges,

    // Actions
    toggle,
    close,
    switchTo,

    // Getters
    getActiveContext,
    getContexts,
    hasMultipleRoles,
    hasContext,
    getCurrentRole
  };
})();

// ==========================================
// GLOBAL EXPORT
// ==========================================
if (typeof window !== 'undefined') {
  window.RoleSwitcher = RoleSwitcher;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RoleSwitcher;
}
