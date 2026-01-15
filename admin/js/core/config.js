/**
 * AndroGov System Configuration
 * @description Central configuration management for the entire system
 * @version 1.0.0
 */

const AppConfig = (function() {
  // ==========================================
  // DEFAULT SETTINGS
  // ==========================================
  const DEFAULTS = {
    lang: 'ar',
    theme: 'light',
    sidebarCollapsed: false,
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'SAR',
    timezone: 'Asia/Riyadh'
  };

  // ==========================================
  // SYSTEM INFO
  // ==========================================
  const SYSTEM = {
    name: 'AndroGov',
    version: '6.0.0',
    company: 'Andromeda IT',
    website: 'https://ait.sa',
    supportEmail: 'support@androomeda.com',
    copyright: `© ${new Date().getFullYear()} Andromeda IT`
  };

  // ==========================================
  // API ENDPOINTS
  // ==========================================
  const API = {
    baseUrl: 'https://api.androomeda.com',
    githubRepo: 'https://raw.githubusercontent.com/androgov-sa/AIT/main',
    timeout: 30000
  };

  // ==========================================
  // ROUTES / PAGES
  // ==========================================
  const ROUTES = {
    login: 'login.html',
    dashboard: 'admin.html',
    profile: 'my_profile.html',
    users: 'users.html',
    shareholders: 'shareholders.html',
    board: 'board.html',
    committees: 'committees.html',
    tasks: 'tasks.html',
    policies: 'policies.html',
    settings: 'admin_settings.html'
  };

  // ==========================================
  // STORAGE KEYS
  // ==========================================
  const STORAGE_KEYS = {
    lang: 'lang',
    theme: 'theme',
    currentUser: 'currentUser',
    activeContext: 'activeContext',
    sidebarState: 'sidebarCollapsed',
    lastVisited: 'lastVisitedPage'
  };

  // ==========================================
  // CONTEXTS (for multi-role support)
  // ==========================================
  const CONTEXTS = {
    system: { 
      key: 'system', 
      label: { ar: 'إدارة النظام', en: 'System Admin' }, 
      icon: 'fa-cog',
      color: '#EF4444'
    },
    board: { 
      key: 'board', 
      label: { ar: 'مجلس الإدارة', en: 'Board of Directors' }, 
      icon: 'fa-building-columns',
      color: '#3B82F6'
    },
    audit_committee: { 
      key: 'audit_committee', 
      label: { ar: 'لجنة المراجعة', en: 'Audit Committee' }, 
      icon: 'fa-clipboard-check',
      color: '#F97316'
    },
    executive: { 
      key: 'executive', 
      label: { ar: 'الإدارة التنفيذية', en: 'Executive Management' }, 
      icon: 'fa-user-tie',
      color: '#8B5CF6'
    },
    shareholders: { 
      key: 'shareholders', 
      label: { ar: 'المساهمين', en: 'Shareholders' }, 
      icon: 'fa-hand-holding-dollar',
      color: '#F59E0B'
    },
    governance: { 
      key: 'governance', 
      label: { ar: 'الحوكمة والالتزام', en: 'GRC' }, 
      icon: 'fa-shield-halved',
      color: '#EC4899'
    },
    employee: { 
      key: 'employee', 
      label: { ar: 'الخدمة الذاتية', en: 'Self Service' }, 
      icon: 'fa-user',
      color: '#64748B'
    }
  };

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  let _state = {
    lang: localStorage.getItem(STORAGE_KEYS.lang) || DEFAULTS.lang,
    theme: localStorage.getItem(STORAGE_KEYS.theme) || DEFAULTS.theme,
    currentUser: null,
    activeContext: localStorage.getItem(STORAGE_KEYS.activeContext) || null,
    isInitialized: false
  };

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function init() {
    if (_state.isInitialized) return;

    // Load saved settings
    _loadUserFromStorage();
    _applyTheme();
    _applyDirection();

    _state.isInitialized = true;
    console.log('✅ AppConfig initialized', getState());

    return getState();
  }

  // ==========================================
  // PRIVATE METHODS
  // ==========================================

  function _loadUserFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.currentUser);
      if (stored) {
        _state.currentUser = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('⚠️ Could not load user from storage');
    }
  }

  function _applyTheme() {
    const html = document.documentElement;
    if (_state.theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  function _applyDirection() {
    const html = document.documentElement;
    html.lang = _state.lang;
    html.dir = _state.lang === 'ar' ? 'rtl' : 'ltr';
  }

  function _saveToStorage(key, value) {
    try {
      if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn('⚠️ Could not save to storage:', key);
    }
  }

  // ==========================================
  // PUBLIC METHODS - GETTERS
  // ==========================================

  function getState() {
    return { ..._state };
  }

  function getLang() {
    return _state.lang;
  }

  function getTheme() {
    return _state.theme;
  }

  function getCurrentUser() {
    return _state.currentUser ? { ..._state.currentUser } : null;
  }

  function getActiveContext() {
    return _state.activeContext;
  }

  function isRTL() {
    return _state.lang === 'ar';
  }

  function isDarkMode() {
    return _state.theme === 'dark';
  }

  // ==========================================
  // PUBLIC METHODS - SETTERS
  // ==========================================

  function setLang(lang) {
    if (!['ar', 'en'].includes(lang)) return false;
    
    _state.lang = lang;
    _saveToStorage(STORAGE_KEYS.lang, lang);
    _applyDirection();
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
    
    return true;
  }

  function setTheme(theme) {
    if (!['light', 'dark'].includes(theme)) return false;
    
    _state.theme = theme;
    _saveToStorage(STORAGE_KEYS.theme, theme);
    _applyTheme();
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    
    return true;
  }

  function toggleTheme() {
    const newTheme = _state.theme === 'dark' ? 'light' : 'dark';
    return setTheme(newTheme);
  }

  function toggleLang() {
    const newLang = _state.lang === 'ar' ? 'en' : 'ar';
    return setLang(newLang);
  }

  function setCurrentUser(user) {
    _state.currentUser = user;
    _saveToStorage(STORAGE_KEYS.currentUser, user);
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('userChanged', { detail: { user } }));
    
    return true;
  }

  function setActiveContext(contextKey) {
    if (!CONTEXTS[contextKey]) {
      console.warn('⚠️ Invalid context:', contextKey);
      return false;
    }
    
    _state.activeContext = contextKey;
    _saveToStorage(STORAGE_KEYS.activeContext, contextKey);
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('contextChanged', { detail: { context: contextKey } }));
    
    return true;
  }

  // ==========================================
  // PUBLIC METHODS - UTILITIES
  // ==========================================

  function getContextInfo(contextKey) {
    return CONTEXTS[contextKey] || null;
  }

  function getAllContexts() {
    return { ...CONTEXTS };
  }

  function getRoute(routeKey) {
    return ROUTES[routeKey] || null;
  }

  function getSystemInfo() {
    return { ...SYSTEM };
  }

  function logout() {
    // Clear user data
    _state.currentUser = null;
    _state.activeContext = null;
    
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    localStorage.removeItem(STORAGE_KEYS.activeContext);
    
    // Redirect to login
    window.location.href = ROUTES.login;
  }

  // ==========================================
  // RETURN PUBLIC API
  // ==========================================
  return {
    // Initialize
    init,

    // Getters
    getState,
    getLang,
    getTheme,
    getCurrentUser,
    getActiveContext,
    isRTL,
    isDarkMode,

    // Setters
    setLang,
    setTheme,
    toggleTheme,
    toggleLang,
    setCurrentUser,
    setActiveContext,

    // Utilities
    getContextInfo,
    getAllContexts,
    getRoute,
    getSystemInfo,
    logout,

    // Constants (read-only)
    get DEFAULTS() { return { ...DEFAULTS }; },
    get SYSTEM() { return { ...SYSTEM }; },
    get API() { return { ...API }; },
    get ROUTES() { return { ...ROUTES }; },
    get STORAGE_KEYS() { return { ...STORAGE_KEYS }; },
    get CONTEXTS() { return { ...CONTEXTS }; }
  };
})();

// ==========================================
// AUTO INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  AppConfig.init();
});

// ==========================================
// GLOBAL EXPORT
// ==========================================
if (typeof window !== 'undefined') {
  window.AppConfig = AppConfig;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppConfig;
}
