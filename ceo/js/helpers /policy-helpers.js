/**
 * PolicyHelpers - Utility Functions for CompanyPolicy
 * @description Helper functions to work with company_policy.js data (v5 Compatible)
 * @version 2.0.0
 * @requires CompanyPolicy (from company_policy.js)
 * @file admin/js/helpers/policy-helpers.js
 */

const PolicyHelpers = (function() {
  // ==========================================
  // PRIVATE HELPERS
  // ==========================================

  function _isPolicyLoaded() {
    return typeof CompanyPolicy !== 'undefined' && CompanyPolicy !== null;
  }

  function _getLang() {
    if (typeof AppConfig !== 'undefined') {
      return AppConfig.getLang();
    }
    return localStorage.getItem('lang') || 'ar';
  }

  function _localize(obj, lang = null) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const useLang = lang || _getLang();
    return obj[useLang] || obj.ar || obj.en || '';
  }

  // ==========================================
  // USER CONTEXTS & ROLES
  // ==========================================

  function getUserContexts(userId) {
    if (!_isPolicyLoaded()) return [];

    // FIX: المسار الصحيح في الإصدار الخامس هو CompanyPolicy.users
    const user = CompanyPolicy.users.find(u => u.id === userId);
    if (!user) return [];

    // التحقق من وجود تعيينات خاصة للأدوار في userRolesMap
    const roleMap = CompanyPolicy.userRolesMap?.find(m => m.userId === userId);
    if (roleMap && roleMap.contexts) {
      return roleMap.contexts;
    }

    // إنشاء السياقات الافتراضية إذا لم يوجد تعيين خاص
    const contexts = [];
    
    // الدور الأساسي
    if (user.role) {
      const contextKey = _mapRoleToContext(user.role);
      contexts.push({
        context: contextKey,
        role: user.role,
        isPrimary: true,
        label: _getRoleLabelObj(user.role)
      });
    }

    // الأدوار الإضافية
    if (user.additionalRoles && Array.isArray(user.additionalRoles)) {
      user.additionalRoles.forEach(role => {
        const contextKey = _mapRoleToContext(role);
        contexts.push({
          context: contextKey,
          role: role,
          isPrimary: false,
          label: _getRoleLabelObj(role)
        });
      });
    }

    return contexts;
  }

  function _getRoleLabelObj(roleKey) {
    const role = CompanyPolicy.roles[roleKey];
    return role ? role.label : { ar: roleKey, en: roleKey };
  }

  function _mapRoleToContext(roleKey) {
    const role = CompanyPolicy.roles[roleKey];
    return role ? (role.context || _legacyMapRoleToContext(roleKey)) : 'employee';
  }

  function _legacyMapRoleToContext(role) {
    const mapping = {
      'sys_admin': 'system',
      'chairman': 'board',
      'vice_chairman': 'board',
      'board_member': 'board',
      'ceo': 'executive',
      'cfo': 'executive',
      'manager': 'employee',
      'shareholder': 'shareholders'
    };
    return mapping[role] || 'employee';
  }

  function getShareholderData(userId) {
    if (!_isPolicyLoaded()) return null;

    // FIX: المسار الصحيح
    const user = CompanyPolicy.users.find(u => u.id === userId);
    if (!user || (!user.isShareholder && !user.additionalRoles?.includes('shareholder'))) {
      return null;
    }

    // البحث عن المساهم
    const shareholder = CompanyPolicy.shareholders.find(s => s.email === user.email) ||
                        CompanyPolicy.shareholders.find(s => s.id === user.shareholderId); // دعم الربط بالمعرف

    if (!shareholder) return null;

    return {
      id: shareholder.id,
      percent: shareholder.percent,
      shares: shareholder.shares,
      // FIX: المسار الصحيح لقيمة السهم
      value: shareholder.shares * (CompanyPolicy.capital?.shareValue || 10),
      type: shareholder.type,
      voting: shareholder.voting
    };
  }

  function getRoleLabel(roleKey, lang = null) {
    if (!_isPolicyLoaded()) return roleKey;
    const useLang = lang || _getLang();
    // FIX: المسار الصحيح للأدوار
    const role = CompanyPolicy.roles[roleKey];
    return role ? _localize(role.label, useLang) : roleKey;
  }

  function hasPermission(roleKey, allowedRoles = []) {
    if (!_isPolicyLoaded() || !allowedRoles) return false;
    
    // FIX: التأكد من أن allowedRoles مصفوفة
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (rolesArray.includes(roleKey)) return true;

    // التحقق من الوراثة
    let currentRole = CompanyPolicy.roles[roleKey];
    while (currentRole && currentRole.inherits) {
      if (rolesArray.includes(currentRole.inherits)) return true;
      currentRole = CompanyPolicy.roles[currentRole.inherits];
    }

    return false;
  }

  function getMergedPermissions(userId) {
    if (!_isPolicyLoaded()) return [];

    const contexts = getUserContexts(userId);
    const allPermissions = new Set();

    // تجميع الصلاحيات من مصفوفة الصلاحيات
    contexts.forEach(ctx => {
      // البحث في كل مجموعات الصلاحيات
      Object.values(CompanyPolicy.permissions).forEach(group => {
        group.items.forEach(perm => {
           if (hasPermission(ctx.role, perm.roles)) {
             allPermissions.add(perm.key);
           }
        });
      });
    });

    return Array.from(allPermissions);
  }

  // ==========================================
  // DEPARTMENT HELPERS
  // ==========================================

  function getDeptName(deptId, lang = null) {
    if (!_isPolicyLoaded()) return deptId;
    const useLang = lang || _getLang();
    // FIX: المسار الصحيح للأقسام
    const dept = CompanyPolicy.departments.find(d => d.id === deptId);
    return dept ? _localize(dept.name, useLang) : deptId;
  }

  // ==========================================
  // FINANCIAL AUTHORITY
  // ==========================================

  function canApproveTransaction(roleKey, transactionType, amount) {
    if (!_isPolicyLoaded()) return false;

    // FIX: التعامل مع الهيكلية الجديدة للصلاحيات المالية
    const authConfig = CompanyPolicy.financialAuthority;
    if (!authConfig) return false;

    // البحث عن النوع في مفاتيح الكائن
    // مثال: transactionType = 'po' قد يقابل 'poApproval'
    let limits = authConfig[transactionType] || authConfig[transactionType + 'Approval'];

    if (!limits || !Array.isArray(limits)) return false;

    for (const level of limits) {
      if (hasPermission(roleKey, [level.role])) {
        if (level.limit === -1) return true; // غير محدود
        if (amount <= level.limit) return true;
      }
    }

    return false;
  }

  // ==========================================
  // COMPANY INFO
  // ==========================================

  function getCompanyProfile(lang = null) {
    if (!_isPolicyLoaded()) return {};

    const useLang = lang || _getLang();
    // FIX: المسارات الجديدة للهوية ورأس المال
    const identity = CompanyPolicy.identity;
    const capital = CompanyPolicy.capital;

    return {
      name: _localize(identity?.name, useLang),
      legalName: _localize(identity?.legalName, useLang),
      crNumber: identity?.crNumber,
      unifiedNumber: identity?.unifiedNumber,
      establishmentDate: identity?.establishmentDate,
      capital: capital,
      website: identity?.website
    };
  }

  // ==========================================
  // VALIDATION
  // ==========================================

  function userExists(userId) {
    if (!_isPolicyLoaded()) return false;
    // FIX: المسار الصحيح
    return CompanyPolicy.users.some(u => u.id === userId);
  }

  function roleExists(roleKey) {
    if (!_isPolicyLoaded()) return false;
    // FIX: المسار الصحيح
    return !!CompanyPolicy.roles[roleKey];
  }

  // ==========================================
  // RETURN PUBLIC API
  // ==========================================
  return {
    getUserContexts,
    getShareholderData,
    getRoleLabel,
    hasPermission,
    getMergedPermissions,
    getDeptName,
    canApproveTransaction,
    getCompanyProfile,
    userExists,
    roleExists
  };
})();

// Export
if (typeof window !== 'undefined') {
  window.PolicyHelpers = PolicyHelpers;
}
