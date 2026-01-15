/**
 * PolicyHelpers - Utility Functions for CompanyPolicy
 * @description Helper functions to work with company_policy.js data
 * @version 1.0.0
 * @requires CompanyPolicy (from company_policy.js)
 * @file admin/js/helpers/policy-helpers.js
 */

const PolicyHelpers = (function() {
  // ==========================================
  // PRIVATE HELPERS
  // ==========================================

  /**
   * Check if CompanyPolicy is loaded
   */
  function _isPolicyLoaded() {
    return typeof CompanyPolicy !== 'undefined' && CompanyPolicy !== null;
  }

  /**
   * Get current language
   */
  function _getLang() {
    if (typeof AppConfig !== 'undefined') {
      return AppConfig.getLang();
    }
    return localStorage.getItem('lang') || 'ar';
  }

  /**
   * Localize bilingual object
   */
  function _localize(obj, lang = null) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const useLang = lang || _getLang();
    return obj[useLang] || obj.ar || obj.en || '';
  }

  // ==========================================
  // USER CONTEXTS & ROLES
  // ==========================================

  /**
   * Get all contexts for a user
   * @param {string} userId
   * @returns {Array} Array of context objects
   */
  function getUserContexts(userId) {
    if (!_isPolicyLoaded()) return [];

    const user = CompanyPolicy.governance.users_directory.find(u => u.id === userId);
    if (!user) return [];

    const contexts = [];
    const lang = _getLang();

    // Primary role context
    if (user.role) {
      const contextKey = _mapRoleToContext(user.role);
      contexts.push({
        context: contextKey,
        role: user.role,
        isPrimary: true,
        label: AppConfig.getContextInfo(contextKey)?.label || { ar: user.role, en: user.role }
      });
    }

    // Additional roles
    if (user.additional_roles && Array.isArray(user.additional_roles)) {
      user.additional_roles.forEach(role => {
        const contextKey = _mapRoleToContext(role);
        contexts.push({
          context: contextKey,
          role: role,
          isPrimary: false,
          label: AppConfig.getContextInfo(contextKey)?.label || { ar: role, en: role }
        });
      });
    }

    return contexts;
  }

  /**
   * Map role to context
   * @param {string} role
   * @returns {string}
   */
  function _mapRoleToContext(role) {
    const mapping = {
      'admin': 'system',
      'Chairman': 'board',
      'vice_chairman': 'board',
      'board_member': 'board',
      'board_secretary': 'governance',
      'shareholder': 'shareholders',
      'CEO': 'executive',
      'CFO': 'executive',
      'CAO': 'executive',
      'Manager': 'employee',
      'Coordinator': 'employee',
      'Specialist': 'employee',
      'Team_Lead': 'employee',
      'Committee_Member': 'audit_committee',
      'Auditor': 'audit_committee'
    };

    return mapping[role] || 'employee';
  }

  /**
   * Get shareholder data for a user
   * @param {string} userId
   * @returns {Object|null}
   */
  function getShareholderData(userId) {
    if (!_isPolicyLoaded()) return null;

    const user = CompanyPolicy.governance.users_directory.find(u => u.id === userId);
    if (!user || !user.additional_roles?.includes('shareholder')) {
      return null;
    }

    // Find shareholder by email
    const shareholder = CompanyPolicy.governance.shareholders.find(
      s => s.email === user.email
    );

    if (!shareholder) return null;

    return {
      id: shareholder.id,
      percent: shareholder.percent,
      shares: shareholder.shares,
      value: shareholder.shares * CompanyPolicy.governance.profile.capital.share_value,
      type: shareholder.type,
      voting: shareholder.voting
    };
  }

  /**
   * Get role label (localized)
   * @param {string} roleKey
   * @param {string} lang
   * @returns {string}
   */
  function getRoleLabel(roleKey, lang = null) {
    if (!_isPolicyLoaded()) return roleKey;

    const useLang = lang || _getLang();
    const role = CompanyPolicy.authority_matrix?.access_control?.roles?.[roleKey];
    
    if (!role) return roleKey;
    
    return _localize(role.label, useLang);
  }

  /**
   * Check if role has permission (including inheritance)
   * @param {string} roleKey
   * @param {Array} allowedRoles
   * @returns {boolean}
   */
  function hasPermission(roleKey, allowedRoles = []) {
    if (!_isPolicyLoaded() || !allowedRoles) return false;
    if (!Array.isArray(allowedRoles)) return false;

    // Direct match
    if (allowedRoles.includes(roleKey)) return true;

    // Check inheritance chain
    let currentRole = CompanyPolicy.authority_matrix?.access_control?.roles?.[roleKey];
    while (currentRole && currentRole.inherits) {
      if (allowedRoles.includes(currentRole.inherits)) return true;
      currentRole = CompanyPolicy.authority_matrix?.access_control?.roles?.[currentRole.inherits];
    }

    return false;
  }

  /**
   * Get all permissions for a user (merged from all contexts)
   * @param {string} userId
   * @returns {Array} Array of permission keys
   */
  function getMergedPermissions(userId) {
    if (!_isPolicyLoaded()) return [];

    const contexts = getUserContexts(userId);
    const allPermissions = new Set();

    contexts.forEach(ctx => {
      const rolePermissions = CompanyPolicy.authority_matrix?.access_control?.permissions?.[ctx.role] || [];
      rolePermissions.forEach(perm => allPermissions.add(perm));
    });

    return Array.from(allPermissions);
  }

  // ==========================================
  // DEPARTMENT HELPERS
  // ==========================================

  /**
   * Get department name (localized)
   * @param {string} deptId
   * @param {string} lang
   * @returns {string}
   */
  function getDeptName(deptId, lang = null) {
    if (!_isPolicyLoaded()) return deptId;

    const useLang = lang || _getLang();
    const dept = CompanyPolicy.organization?.departments?.find(d => d.id === deptId);
    
    if (!dept) return deptId;
    
    return _localize(dept.name, useLang);
  }

  // ==========================================
  // FINANCIAL AUTHORITY
  // ==========================================

  /**
   * Check if user can approve transaction
   * @param {string} roleKey
   * @param {string} transactionType
   * @param {number} amount
   * @returns {boolean}
   */
  function canApproveTransaction(roleKey, transactionType, amount) {
    if (!_isPolicyLoaded()) return false;

    const authority = CompanyPolicy.authority_matrix?.financial_authority?.find(
      f => f.transaction_type === transactionType
    );

    if (!authority) return false;

    for (const level of authority.levels) {
      if (level.role === roleKey || hasPermission(roleKey, [level.role])) {
        if (level.limit === -1) return true; // Unlimited
        if (amount <= level.limit) return true;
      }
    }

    return false;
  }

  // ==========================================
  // COMPANY INFO
  // ==========================================

  /**
   * Get company profile (localized)
   * @param {string} lang
   * @returns {Object}
   */
  function getCompanyProfile(lang = null) {
    if (!_isPolicyLoaded()) return {};

    const useLang = lang || _getLang();
    const profile = CompanyPolicy.governance?.profile;
    const identity = CompanyPolicy.identity?.meta;

    return {
      name: _localize(identity?.brand_name, useLang),
      legalName: _localize(CompanyPolicy.i18n?.translations?.global?.company_legal_name, useLang),
      crNumber: profile?.cr_number,
      unifiedNumber: profile?.unified_number,
      establishmentDate: profile?.establishment_date,
      capital: profile?.capital,
      website: identity?.website
    };
  }

  // ==========================================
  // VALIDATION
  // ==========================================

  /**
   * Validate if user exists
   * @param {string} userId
   * @returns {boolean}
   */
  function userExists(userId) {
    if (!_isPolicyLoaded()) return false;
    return CompanyPolicy.governance?.users_directory?.some(u => u.id === userId) || false;
  }

  /**
   * Validate if role exists
   * @param {string} roleKey
   * @returns {boolean}
   */
  function roleExists(roleKey) {
    if (!_isPolicyLoaded()) return false;
    return !!CompanyPolicy.authority_matrix?.access_control?.roles?.[roleKey];
  }

  // ==========================================
  // RETURN PUBLIC API
  // ==========================================
  return {
    // User & Roles
    getUserContexts,
    getShareholderData,
    getRoleLabel,
    hasPermission,
    getMergedPermissions,

    // Departments
    getDeptName,

    // Financial
    canApproveTransaction,

    // Company
    getCompanyProfile,

    // Validation
    userExists,
    roleExists
  };
})();

// ==========================================
// GLOBAL EXPORT
// ==========================================
if (typeof window !== 'undefined') {
  window.PolicyHelpers = PolicyHelpers;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PolicyHelpers;
}
