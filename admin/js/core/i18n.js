/**
 * AndroGov Internationalization (i18n) System
 * @description Unified translation management for the entire system
 * @version 1.0.0
 * @requires AppConfig
 */

const I18n = (function() {
  // ==========================================
  // TRANSLATIONS DATABASE
  // ==========================================
  const _translations = {
    // ==========================================
    // GLOBAL / COMMON
    // ==========================================
    common: {
      appName: { ar: 'AndroGov', en: 'AndroGov' },
      appTagline: { ar: 'نظام الحوكمة المؤسسية', en: 'Enterprise Governance System' },
      companyName: { ar: 'اندروميدا لتقنية المعلومات', en: 'Andromeda IT' },
      loading: { ar: 'جاري التحميل...', en: 'Loading...' },
      error: { ar: 'حدث خطأ', en: 'An error occurred' },
      noData: { ar: 'لا توجد بيانات', en: 'No data available' },
      noResults: { ar: 'لا توجد نتائج', en: 'No results found' },
      search: { ar: 'بحث', en: 'Search' },
      filter: { ar: 'تصفية', en: 'Filter' },
      all: { ar: 'الكل', en: 'All' },
      yes: { ar: 'نعم', en: 'Yes' },
      no: { ar: 'لا', en: 'No' },
      or: { ar: 'أو', en: 'or' },
      and: { ar: 'و', en: 'and' }
    },

    // ==========================================
    // ACTIONS / BUTTONS
    // ==========================================
    actions: {
      save: { ar: 'حفظ', en: 'Save' },
      cancel: { ar: 'إلغاء', en: 'Cancel' },
      close: { ar: 'إغلاق', en: 'Close' },
      edit: { ar: 'تعديل', en: 'Edit' },
      delete: { ar: 'حذف', en: 'Delete' },
      add: { ar: 'إضافة', en: 'Add' },
      create: { ar: 'إنشاء', en: 'Create' },
      update: { ar: 'تحديث', en: 'Update' },
      submit: { ar: 'إرسال', en: 'Submit' },
      confirm: { ar: 'تأكيد', en: 'Confirm' },
      approve: { ar: 'اعتماد', en: 'Approve' },
      reject: { ar: 'رفض', en: 'Reject' },
      export: { ar: 'تصدير', en: 'Export' },
      import: { ar: 'استيراد', en: 'Import' },
      print: { ar: 'طباعة', en: 'Print' },
      download: { ar: 'تحميل', en: 'Download' },
      upload: { ar: 'رفع', en: 'Upload' },
      refresh: { ar: 'تحديث', en: 'Refresh' },
      back: { ar: 'رجوع', en: 'Back' },
      next: { ar: 'التالي', en: 'Next' },
      previous: { ar: 'السابق', en: 'Previous' },
      viewAll: { ar: 'عرض الكل', en: 'View All' },
      viewDetails: { ar: 'عرض التفاصيل', en: 'View Details' },
      showMore: { ar: 'عرض المزيد', en: 'Show More' },
      showLess: { ar: 'عرض أقل', en: 'Show Less' }
    },

    // ==========================================
    // STATUS / STATES
    // ==========================================
    status: {
      active: { ar: 'نشط', en: 'Active' },
      inactive: { ar: 'غير نشط', en: 'Inactive' },
      pending: { ar: 'قيد الانتظار', en: 'Pending' },
      approved: { ar: 'معتمد', en: 'Approved' },
      rejected: { ar: 'مرفوض', en: 'Rejected' },
      draft: { ar: 'مسودة', en: 'Draft' },
      published: { ar: 'منشور', en: 'Published' },
      archived: { ar: 'مؤرشف', en: 'Archived' },
      completed: { ar: 'مكتمل', en: 'Completed' },
      inProgress: { ar: 'قيد التنفيذ', en: 'In Progress' },
      cancelled: { ar: 'ملغي', en: 'Cancelled' },
      expired: { ar: 'منتهي', en: 'Expired' },
      new: { ar: 'جديد', en: 'New' }
    },

    // ==========================================
    // AUTHENTICATION
    // ==========================================
    auth: {
      login: { ar: 'تسجيل الدخول', en: 'Login' },
      logout: { ar: 'تسجيل الخروج', en: 'Logout' },
      logoutConfirm: { ar: 'هل أنت متأكد من تسجيل الخروج؟', en: 'Are you sure you want to logout?' },
      username: { ar: 'اسم المستخدم', en: 'Username' },
      password: { ar: 'كلمة المرور', en: 'Password' },
      forgotPassword: { ar: 'نسيت كلمة المرور؟', en: 'Forgot Password?' },
      rememberMe: { ar: 'تذكرني', en: 'Remember Me' },
      welcomeBack: { ar: 'مرحباً بعودتك', en: 'Welcome Back' },
      sessionExpired: { ar: 'انتهت الجلسة', en: 'Session Expired' }
    },

    // ==========================================
    // NAVIGATION / MENU
    // ==========================================
    nav: {
      dashboard: { ar: 'لوحة القيادة', en: 'Dashboard' },
      home: { ar: 'الرئيسية', en: 'Home' },
      profile: { ar: 'الملف الشخصي', en: 'Profile' },
      settings: { ar: 'الإعدادات', en: 'Settings' },
      notifications: { ar: 'الإشعارات', en: 'Notifications' },
      help: { ar: 'المساعدة', en: 'Help' },
      // Sections
      main: { ar: 'الرئيسية', en: 'Main' },
      communication: { ar: 'التواصل المؤسسي', en: 'Communication' },
      governance: { ar: 'الحوكمة', en: 'Governance' },
      operations: { ar: 'التشغيل', en: 'Operations' },
      departments: { ar: 'الإدارات', en: 'Departments' },
      admin: { ar: 'النظام', en: 'Admin' },
      // Menu Items
      tasks: { ar: 'إدارة المهام', en: 'Task Management' },
      chat: { ar: 'الدردشة', en: 'Chat' },
      circulars: { ar: 'التعاميم', en: 'Circulars' },
      generalAssembly: { ar: 'الجمعيات العمومية', en: 'General Assembly' },
      board: { ar: 'مجلس الإدارة', en: 'Board' },
      committees: { ar: 'اللجان', en: 'Committees' },
      shareholders: { ar: 'المساهمين', en: 'Shareholders' },
      doa: { ar: 'مصفوفة الصلاحيات', en: 'DOA Matrix' },
      policies: { ar: 'السياسات', en: 'Policies' },
      compliance: { ar: 'الامتثال', en: 'Compliance' },
      hr: { ar: 'الموارد البشرية', en: 'HR' },
      finance: { ar: 'المالية', en: 'Finance' },
      procurement: { ar: 'المشتريات', en: 'Procurement' },
      it: { ar: 'التقنية', en: 'IT' },
      users: { ar: 'المستخدمين', en: 'Users' },
      auditLog: { ar: 'سجل التدقيق', en: 'Audit Log' }
    },

    // ==========================================
    // USERS & ROLES
    // ==========================================
    users: {
      pageTitle: { ar: 'إدارة المستخدمين والصلاحيات', en: 'User & Role Management' },
      pageDesc: { ar: 'لوحة التحكم المركزية بالوصول والأدوار', en: 'Central Access Control Panel (RBAC)' },
      directory: { ar: 'دليل المستخدمين', en: 'User Directory' },
      rolesStructure: { ar: 'هيكل الصلاحيات', en: 'Roles Structure' },
      totalUsers: { ar: 'إجمالي المستخدمين', en: 'Total Users' },
      activeUsers: { ar: 'المستخدمين النشطين', en: 'Active Users' },
      executives: { ar: 'الإدارة التنفيذية', en: 'Executives' },
      definedRoles: { ar: 'الأدوار المعرفة', en: 'Defined Roles' },
      // Table Columns
      colUser: { ar: 'المستخدم', en: 'User' },
      colRole: { ar: 'الدور الوظيفي', en: 'Role' },
      colDept: { ar: 'القسم / الجهة', en: 'Department' },
      colEmail: { ar: 'البريد الإلكتروني', en: 'Email' },
      colStatus: { ar: 'الحالة', en: 'Status' },
      colActions: { ar: 'إجراءات', en: 'Actions' },
      // Misc
      inheritsFrom: { ar: 'يرث صلاحيات', en: 'Inherits from' },
      searchPlaceholder: { ar: 'بحث بالاسم، الدور، أو البريد...', en: 'Search by name, role, or email...' },
      addUser: { ar: 'إضافة مستخدم', en: 'Add User' },
      editUser: { ar: 'تعديل المستخدم', en: 'Edit User' },
      deleteUserConfirm: { ar: 'هل أنت متأكد من حذف هذا المستخدم؟', en: 'Are you sure you want to delete this user?' }
    },

    // ==========================================
    // SHAREHOLDERS
    // ==========================================
    shareholders: {
      pageTitle: { ar: 'سجل المساهمين', en: 'Shareholders Registry' },
      currentCapital: { ar: 'رأس المال الحالي', en: 'Current Capital' },
      issuedShares: { ar: 'عدد الأسهم المصدرة', en: 'Issued Shares' },
      shareholdersCount: { ar: 'عدد المساهمين', en: 'Shareholders Count' },
      ownershipStructure: { ar: 'هيكل الملكية', en: 'Ownership Structure' },
      capitalHistory: { ar: 'سجل التغيرات في رأس المال', en: 'Capital History' },
      fullyPaid: { ar: 'مدفوع بالكامل', en: 'Fully Paid' },
      parValue: { ar: 'القيمة الاسمية', en: 'Par Value' },
      share: { ar: 'سهم', en: 'Share' },
      shares: { ar: 'أسهم', en: 'Shares' },
      percent: { ar: 'النسبة', en: 'Percent' },
      value: { ar: 'القيمة', en: 'Value' },
      proxy: { ar: 'الوكالة', en: 'Proxy' },
      principal: { ar: 'أصيل', en: 'Principal' },
      nationality: { ar: 'الجنسية', en: 'Nationality' },
      saudi: { ar: 'سعودي', en: 'Saudi' },
      heirs: { ar: 'الورثة', en: 'Heirs' },
      others: { ar: 'آخرون', en: 'Others' }
    },

    // ==========================================
    // BOARD & COMMITTEES
    // ==========================================
    board: {
      pageTitle: { ar: 'مجلس الإدارة', en: 'Board of Directors' },
      chairman: { ar: 'رئيس مجلس الإدارة', en: 'Chairman' },
      viceChairman: { ar: 'نائب رئيس مجلس الإدارة', en: 'Vice Chairman' },
      boardMember: { ar: 'عضو مجلس إدارة', en: 'Board Member' },
      boardSecretary: { ar: 'أمين سر المجلس', en: 'Board Secretary' },
      meetingFee: { ar: 'مكافأة الجلسة', en: 'Meeting Fee' },
      lastMeeting: { ar: 'آخر اجتماع', en: 'Last Meeting' },
      nextMeeting: { ar: 'الاجتماع القادم', en: 'Next Meeting' },
      minutes: { ar: 'المحضر', en: 'Minutes' },
      quorum: { ar: 'النصاب', en: 'Quorum' },
      term: { ar: 'الدورة', en: 'Term' },
      executive: { ar: 'تنفيذي', en: 'Executive' },
      nonExecutive: { ar: 'غير تنفيذي', en: 'Non-Executive' },
      independent: { ar: 'مستقل', en: 'Independent' }
    },

    // ==========================================
    // COMMITTEES
    // ==========================================
    committees: {
      auditCommittee: { ar: 'لجنة المراجعة', en: 'Audit Committee' },
      committeeChair: { ar: 'رئيس اللجنة', en: 'Committee Chairman' },
      committeeMember: { ar: 'عضو اللجنة', en: 'Committee Member' },
      committeeSecretary: { ar: 'أمين سر اللجنة', en: 'Committee Secretary' },
      newCycle: { ar: 'دورة جديدة', en: 'New Cycle' }
    },

    // ==========================================
    // GOVERNANCE
    // ==========================================
    governance: {
      complianceRate: { ar: 'نسبة الامتثال', en: 'Compliance Rate' },
      pendingResolutions: { ar: 'قرارات بالتمرير', en: 'Circulated Resolutions' },
      pendingSignature: { ar: 'قيد التوقيع', en: 'Pending Signature' },
      waitingFor: { ar: 'بانتظار', en: 'Waiting for' },
      grcOfficer: { ar: 'مسؤول الحوكمة والمخاطر والالتزام', en: 'GRC Officer' },
      investorRelations: { ar: 'علاقات المساهمين', en: 'Investor Relations' }
    },

    // ==========================================
    // TASKS
    // ==========================================
    tasks: {
      pageTitle: { ar: 'إدارة المهام', en: 'Task Management' },
      newTask: { ar: 'مهمة جديدة', en: 'New Task' },
      taskTitle: { ar: 'عنوان المهمة', en: 'Task Title' },
      dueDate: { ar: 'تاريخ الاستحقاق', en: 'Due Date' },
      assignee: { ar: 'المسؤول', en: 'Assignee' },
      priority: { ar: 'الأولوية', en: 'Priority' },
      urgent: { ar: 'عاجل', en: 'Urgent' },
      // Columns
      todo: { ar: 'قيد الانتظار', en: 'To Do' },
      inProgress: { ar: 'جاري التنفيذ', en: 'In Progress' },
      review: { ar: 'تحت المراجعة', en: 'Under Review' },
      done: { ar: 'مكتمل', en: 'Done' },
      // Tags
      tagGov: { ar: 'حوكمة', en: 'Gov' },
      tagOps: { ar: 'تشغيل', en: 'Ops' },
      tagLegal: { ar: 'قانونية', en: 'Legal' },
      tagHR: { ar: 'موارد بشرية', en: 'HR' },
      tagFinance: { ar: 'مالية', en: 'Finance' }
    },

    // ==========================================
    // POLICIES
    // ==========================================
    policies: {
      pageTitle: { ar: 'مكتبة السياسات واللوائح', en: 'Policy Library' },
      pageDesc: { ar: 'المرجع الموحد لجميع لوائح وسياسات الشركة', en: 'Unified reference for all company policies' },
      uploadNew: { ar: 'رفع جديد', en: 'Upload New' },
      version: { ar: 'الإصدار', en: 'Version' },
      lastUpdate: { ar: 'آخر تحديث', en: 'Last Update' },
      category: { ar: 'التصنيف', en: 'Category' },
      document: { ar: 'وثيقة', en: 'Document' },
      documents: { ar: 'وثائق', en: 'Documents' }
    },

    // ==========================================
    // NOTIFICATIONS
    // ==========================================
    notifications: {
      title: { ar: 'الإشعارات', en: 'Notifications' },
      markRead: { ar: 'تحديد كمقروء', en: 'Mark as Read' },
      markAllRead: { ar: 'تحديد الكل كمقروء', en: 'Mark All as Read' },
      empty: { ar: 'لا توجد إشعارات جديدة', en: 'No new notifications' },
      securityAlert: { ar: 'تنبيه أمني', en: 'Security Alert' },
      newContract: { ar: 'عقد جديد', en: 'New Contract' },
      actionRequired: { ar: 'إجراء مطلوب', en: 'Action Required' }
    },

    // ==========================================
    // ROLE SWITCHER
    // ==========================================
    roleSwitcher: {
      title: { ar: 'تبديل الدور', en: 'Switch Role' },
      currentRole: { ar: 'الدور الحالي', en: 'Current Role' },
      availableRoles: { ar: 'الأدوار المتاحة', en: 'Available Roles' },
      switchTo: { ar: 'التبديل إلى', en: 'Switch to' }
    },

    // ==========================================
    // DATES & TIME
    // ==========================================
    datetime: {
      today: { ar: 'اليوم', en: 'Today' },
      yesterday: { ar: 'أمس', en: 'Yesterday' },
      tomorrow: { ar: 'غداً', en: 'Tomorrow' },
      now: { ar: 'الآن', en: 'Now' },
      ago: { ar: 'منذ', en: 'ago' },
      in: { ar: 'خلال', en: 'in' },
      days: { ar: 'أيام', en: 'days' },
      hours: { ar: 'ساعات', en: 'hours' },
      minutes: { ar: 'دقائق', en: 'minutes' },
      seconds: { ar: 'ثواني', en: 'seconds' }
    },

    // ==========================================
    // VALIDATION MESSAGES
    // ==========================================
    validation: {
      required: { ar: 'هذا الحقل مطلوب', en: 'This field is required' },
      invalidEmail: { ar: 'البريد الإلكتروني غير صحيح', en: 'Invalid email address' },
      minLength: { ar: 'الحد الأدنى للأحرف هو', en: 'Minimum characters is' },
      maxLength: { ar: 'الحد الأقصى للأحرف هو', en: 'Maximum characters is' },
      passwordMismatch: { ar: 'كلمات المرور غير متطابقة', en: 'Passwords do not match' }
    },

    // ==========================================
    // SUCCESS / ERROR MESSAGES
    // ==========================================
    messages: {
      saveSuccess: { ar: 'تم الحفظ بنجاح', en: 'Saved successfully' },
      updateSuccess: { ar: 'تم التحديث بنجاح', en: 'Updated successfully' },
      deleteSuccess: { ar: 'تم الحذف بنجاح', en: 'Deleted successfully' },
      createSuccess: { ar: 'تم الإنشاء بنجاح', en: 'Created successfully' },
      uploadSuccess: { ar: 'تم الرفع بنجاح', en: 'Uploaded successfully' },
      errorOccurred: { ar: 'حدث خطأ، حاول مرة أخرى', en: 'An error occurred, please try again' },
      networkError: { ar: 'خطأ في الاتصال', en: 'Network error' },
      unauthorized: { ar: 'غير مصرح لك بهذا الإجراء', en: 'You are not authorized for this action' }
    },

    // ==========================================
    // CHATBOT
    // ==========================================
    bot: {
      title: { ar: 'AndroBot', en: 'AndroBot' },
      subtitle: { ar: 'مساعد الحوكمة الذكي', en: 'AI Governance Assistant' },
      welcome: { ar: 'مرحباً بك! كيف يمكنني مساعدتك؟', en: 'Welcome! How can I help you?' },
      placeholder: { ar: 'اكتب استفسارك هنا...', en: 'Type your query here...' },
      thinking: { ar: 'جاري التفكير...', en: 'Thinking...' }
    }
  };

  // ==========================================
  // PRIVATE STATE
  // ==========================================
  let _currentLang = 'ar';

  // ==========================================
  // PRIVATE METHODS
  // ==========================================

  function _getLang() {
    if (typeof AppConfig !== 'undefined') {
      return AppConfig.getLang();
    }
    return localStorage.getItem('lang') || 'ar';
  }

  function _getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

  // ==========================================
  // PUBLIC METHODS
  // ==========================================

  /**
   * Get translation by key
   * @param {string} key - Dot notation key (e.g., 'common.loading', 'actions.save')
   * @param {string} [lang] - Optional language override
   * @returns {string}
   */
  function t(key, lang = null) {
    const useLang = lang || _getLang();
    const value = _getNestedValue(_translations, key);
    
    if (!value) {
      console.warn(`⚠️ Translation not found: ${key}`);
      return key;
    }

    if (typeof value === 'object' && value[useLang]) {
      return value[useLang];
    }

    return value.ar || value.en || key;
  }

  /**
   * Get entire translation group
   * @param {string} group - Group name (e.g., 'common', 'actions')
   * @param {string} [lang] - Optional language override
   * @returns {Object}
   */
  function getGroup(group, lang = null) {
    const useLang = lang || _getLang();
    const groupData = _translations[group];
    
    if (!groupData) return {};

    const result = {};
    Object.keys(groupData).forEach(key => {
      const value = groupData[key];
      result[key] = typeof value === 'object' ? (value[useLang] || value.ar) : value;
    });

    return result;
  }

  /**
   * Get bilingual object (both ar and en)
   * @param {string} key
   * @returns {Object} { ar: '...', en: '...' }
   */
  function getBilingual(key) {
    const value = _getNestedValue(_translations, key);
    if (!value) return { ar: key, en: key };
    return value;
  }

  /**
   * Apply translations to DOM elements with data-i18n attribute
   * @param {Element} [container=document] - Container to search within
   */
  function applyToDOM(container = document) {
    const lang = _getLang();

    // Text content
    container.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key, lang);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    });

    // Placeholders
    container.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = t(key, lang);
      if (translation && translation !== key) {
        el.placeholder = translation;
      }
    });

    // Titles (tooltips)
    container.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = t(key, lang);
      if (translation && translation !== key) {
        el.title = translation;
      }
    });

    // Aria labels
    container.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const translation = t(key, lang);
      if (translation && translation !== key) {
        el.setAttribute('aria-label', translation);
      }
    });
  }

  /**
   * Format number with localization
   * @param {number} num
   * @param {Object} options
   * @returns {string}
   */
  function formatNumber(num, options = {}) {
    const lang = _getLang();
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, options).format(num);
  }

  /**
   * Format currency
   * @param {number} amount
   * @param {string} currency
   * @returns {string}
   */
  function formatCurrency(amount, currency = 'SAR') {
    const lang = _getLang();
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Format date
   * @param {Date|string} date
   * @param {Object} options
   * @returns {string}
   */
  function formatDate(date, options = {}) {
    const lang = _getLang();
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    };

    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
  }

  /**
   * Format relative time (e.g., "2 days ago")
   * @param {Date|string} date
   * @returns {string}
   */
  function formatRelativeTime(date) {
    const lang = _getLang();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now - dateObj;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return t('datetime.now');
    if (diffMinutes < 60) return `${diffMinutes} ${t('datetime.minutes')} ${t('datetime.ago')}`;
    if (diffHours < 24) return `${diffHours} ${t('datetime.hours')} ${t('datetime.ago')}`;
    if (diffDays === 1) return t('datetime.yesterday');
    if (diffDays < 7) return `${diffDays} ${t('datetime.days')} ${t('datetime.ago')}`;

    return formatDate(dateObj);
  }

  /**
   * Get current language
   * @returns {string}
   */
  function getCurrentLang() {
    return _getLang();
  }

  /**
   * Check if current language is RTL
   * @returns {boolean}
   */
  function isRTL() {
    return _getLang() === 'ar';
  }

  /**
   * Add custom translations (for plugins/extensions)
   * @param {string} group
   * @param {Object} translations
   */
  function extend(group, translations) {
    if (!_translations[group]) {
      _translations[group] = {};
    }
    Object.assign(_translations[group], translations);
  }

  // ==========================================
  // RETURN PUBLIC API
  // ==========================================
  return {
    t,
    getGroup,
    getBilingual,
    applyToDOM,
    formatNumber,
    formatCurrency,
    formatDate,
    formatRelativeTime,
    getCurrentLang,
    isRTL,
    extend
  };
})();

// ==========================================
// GLOBAL EXPORT & SHORTHAND
// ==========================================
if (typeof window !== 'undefined') {
  window.I18n = I18n;
  // Shorthand for quick access
  window.__ = I18n.t;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18n;
}
