/**
 * AndroGov CEO Internationalization
 * @file ceo/js/core/i18n.js
 */

const I18n = (function() {
  
  let _currentLang = 'ar';

  // ==========================================
  // TRANSLATIONS
  // ==========================================
  
  const _translations = {
    ar: {
      // Common
      loading: 'جاري التحميل...',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      search: 'بحث...',
      noResults: 'لا توجد نتائج',
      success: 'تمت العملية بنجاح',
      error: 'حدث خطأ',
      
      // Navigation
      dashboard: 'لوحة القيادة',
      reports: 'التقارير',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      
      // CEO Specific
      executiveOverview: 'النظرة التنفيذية',
      strategicPlanning: 'التخطيط الاستراتيجي',
      financialPerformance: 'الأداء المالي',
      riskManagement: 'إدارة المخاطر'
    },
    
    en: {
      // Common
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search...',
      noResults: 'No results found',
      success: 'Operation completed successfully',
      error: 'An error occurred',
      
      // Navigation
      dashboard: 'Dashboard',
      reports: 'Reports',
      settings: 'Settings',
      logout: 'Logout',
      
      // CEO Specific
      executiveOverview: 'Executive Overview',
      strategicPlanning: 'Strategic Planning',
      financialPerformance: 'Financial Performance',
      riskManagement: 'Risk Management'
    }
  };

  // ==========================================
  // METHODS
  // ==========================================
  
  function setLanguage(lang) {
    if (!['ar', 'en'].includes(lang)) {
      console.warn('⚠️ Unsupported language:', lang);
      return;
    }
    
    _currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update HTML
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all [data-i18n] elements
    translatePage();
  }

  function getLanguage() {
    return _currentLang;
  }

  function t(key) {
    return _translations[_currentLang]?.[key] || key;
  }

  function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      if (translation !== key) {
        el.textContent = translation;
      }
    });
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  
  function init() {
    _currentLang = localStorage.getItem('lang') || 'ar';
    setLanguage(_currentLang);
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ==========================================
  // PUBLIC API
  // ==========================================
  
  return {
    setLanguage,
    getLanguage,
    t,
    translatePage,
    init
  };

})();

window.I18n = I18n;
