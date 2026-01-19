/**
 * AndroGov CEO Configuration
 * @file ceo/js/core/config.js
 */

const AppConfig = (function() {
  
  const _config = {
    appName: 'AndroGov Executive',
    version: '1.0.0',
    companyName: 'Andromeda IT',
    defaultLang: 'ar',
    supportedLangs: ['ar', 'en']
  };

  // ==========================================
  // USER MANAGEMENT
  // ==========================================
  
  function setCurrentUser(user) {
    if (!user || !user.id) {
      console.error('❌ Invalid user object');
      return false;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('✅ CEO User Set:', user.displayName);
    return true;
  }

  function getCurrentUser() {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  function clearUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('ceo_activeRole');
  }

  // ==========================================
  // LANGUAGE & THEME
  // ==========================================
  
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function initLanguage() {
    const lang = localStorage.getItem('lang') || _config.defaultLang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  
  function init() {
    initTheme();
    initLanguage();
    
    // Show page
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
    
    console.log(`✅ ${_config.appName} v${_config.version} Initialized`);
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ==========================================
  // PUBLIC API
  // ==========================================
  
  return {
    config: _config,
    setCurrentUser,
    getCurrentUser,
    clearUser,
    init
  };

})();

window.AppConfig = AppConfig;
