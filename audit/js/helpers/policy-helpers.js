/**
 * PolicyHelpers - Utility Functions for CompanyPolicy (Audit Enhanced)
 * @description Helper functions to work with company_policy.js data with audit-specific features
 * @version 3.0.0 - Audit Enhanced
 * @requires CompanyPolicy (from company_policy.js)
 * @file audit/js/helpers/policy-helpers.js
 */

const PolicyHelpers = (function() {
  // ==========================================
  // PRIVATE HELPERS
  // ==========================================

  function _isPolicyLoaded() {
    return typeof CompanyPolicy !== 'undefined' && CompanyPolicy !== null;
  }

  function _getLang() {
    if (typeof Layout !== 'undefined' && typeof Layout.getCurrentLang === 'function') {
      return Layout.getCurrentLang();
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

    const user = CompanyPolicy.users?.find(u => u.id === userId);
    if (!user) return [];

    // Check for specific role mappings
    const roleMap = CompanyPolicy.userRolesMap?.find(m => m.userId === userId);
    if (roleMap && roleMap.contexts) {
      return roleMap.contexts;
    }

    // Create default contexts
    const contexts = [];
    
    // Primary role
    if (user.role) {
      const contextKey = _mapRoleToContext(user.role);
      contexts.push({
        context: contextKey,
        role: user.role,
        isPrimary: true,
        label: _getRoleLabelObj(user.role)
      });
    }

    // Additional roles
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
    const role = CompanyPolicy.roles?.[roleKey];
    return role ? role.label : { ar: roleKey, en: roleKey };
  }

  function _mapRoleToContext(roleKey) {
    const role = CompanyPolicy.roles?.[roleKey];
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
      'cao': 'executive',
      'manager': 'employee',
      'shareholder': 'shareholders',
      'auditor': 'audit',
      'internal_auditor': 'audit',
      'audit_committee_chair': 'audit_committee',
      'audit_committee_member': 'audit_committee'
    };
    return mapping[role] || 'employee';
  }

  function getShareholderData(userId) {
    if (!_isPolicyLoaded()) return null;

    const user = CompanyPolicy.users?.find(u => u.id === userId);
    if (!user || (!user.isShareholder && !user.additionalRoles?.includes('shareholder'))) {
      return null;
    }

    // Find shareholder
    const shareholder = CompanyPolicy.shareholders?.find(s => s.email === user.email) ||
                        CompanyPolicy.shareholders?.find(s => s.id === user.shareholderId);

    if (!shareholder) return null;

    return {
      id: shareholder.id,
      percent: shareholder.percent,
      shares: shareholder.shares,
      value: shareholder.shares * (CompanyPolicy.capital?.shareValue || 10),
      type: shareholder.type,
      voting: shareholder.voting
    };
  }

  function getRoleLabel(roleKey, lang = null) {
    if (!_isPolicyLoaded()) return roleKey;
    const useLang = lang || _getLang();
    const role = CompanyPolicy.roles?.[roleKey];
    return role ? _localize(role.label, useLang) : roleKey;
  }

  function hasPermission(roleKey, allowedRoles = []) {
    if (!_isPolicyLoaded() || !allowedRoles) return false;
    
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (rolesArray.includes(roleKey)) return true;

    // Check inheritance
    let currentRole = CompanyPolicy.roles?.[roleKey];
    while (currentRole && currentRole.inherits) {
      if (rolesArray.includes(currentRole.inherits)) return true;
      currentRole = CompanyPolicy.roles?.[currentRole.inherits];
    }

    return false;
  }

  function getMergedPermissions(userId) {
    if (!_isPolicyLoaded()) return [];

    const contexts = getUserContexts(userId);
    const allPermissions = new Set();

    contexts.forEach(ctx => {
      Object.values(CompanyPolicy.permissions || {}).forEach(group => {
        (group.items || []).forEach(perm => {
           if (hasPermission(ctx.role, perm.roles)) {
             allPermissions.add(perm.key);
           }
        });
      });
    });

    return Array.from(allPermissions);
  }

  // ==========================================
  // AUDIT-SPECIFIC HELPERS
  // ==========================================

  function getAuditTeam() {
    if (!_isPolicyLoaded()) return [];
    
    return (CompanyPolicy.users || []).filter(u => 
      u.role === 'auditor' || 
      u.role === 'internal_auditor' ||
      u.additionalRoles?.includes('auditor') ||
      u.dept === 'DEP_AUDIT'
    );
  }

  function getAuditCommittee() {
    if (!_isPolicyLoaded()) return [];
    
    return (CompanyPolicy.users || []).filter(u =>
      u.role === 'audit_committee_chair' ||
      u.role === 'audit_committee_member' ||
      u.additionalRoles?.includes('audit_committee_chair') ||
      u.additionalRoles?.includes('audit_committee_member')
    );
  }

  function canAccessAuditData(userId, dataType = 'general') {
    if (!_isPolicyLoaded()) return false;
    
    const user = CompanyPolicy.users?.find(u => u.id === userId);
    if (!user) return false;

    // Audit team has access to all audit data
    const auditRoles = ['auditor', 'internal_auditor', 'audit_committee_chair', 'audit_committee_member'];
    if (auditRoles.includes(user.role) || 
        user.additionalRoles?.some(r => auditRoles.includes(r))) {
      return true;
    }

    // Executives have read access to audit reports
    if (dataType === 'reports') {
      const execRoles = ['ceo', 'cfo', 'cao', 'chairman', 'board_member'];
      if (execRoles.includes(user.role) || 
          user.additionalRoles?.some(r => execRoles.includes(r))) {
        return true;
      }
    }

    return false;
  }

  function getAuditableEntities() {
    if (!_isPolicyLoaded()) return [];
    
    return (CompanyPolicy.departments || []).map(dept => ({
      id: dept.id,
      name: dept.name,
      type: 'department',
      riskLevel: dept.riskLevel || 'medium',
      lastAudit: dept.lastAudit || null,
      nextAudit: dept.nextAudit || null
    }));
  }

  // ==========================================
  // DEPARTMENT HELPERS
  // ==========================================

  function getDeptName(deptId, lang = null) {
    if (!_isPolicyLoaded()) return deptId;
    const useLang = lang || _getLang();
    const dept = CompanyPolicy.departments?.find(d => d.id === deptId);
    return dept ? _localize(dept.name, useLang) : deptId;
  }

  function getDepartmentHead(deptId) {
    if (!_isPolicyLoaded()) return null;
    
    return (CompanyPolicy.users || []).find(u => 
      u.dept === deptId && 
      (u.role === 'manager' || u.role === 'director' || u.isHead === true)
    );
  }

  // ==========================================
  // FINANCIAL AUTHORITY
  // ==========================================

  function canApproveTransaction(roleKey, transactionType, amount) {
    if (!_isPolicyLoaded()) return false;

    const authConfig = CompanyPolicy.financialAuthority;
    if (!authConfig) return false;

    let limits = authConfig[transactionType] || authConfig[transactionType + 'Approval'];

    if (!limits || !Array.isArray(limits)) return false;

    for (const level of limits) {
      if (hasPermission(roleKey, [level.role])) {
        if (level.limit === -1) return true; // Unlimited
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

  function getGovernanceInfo() {
    if (!_isPolicyLoaded()) return null;
    
    return CompanyPolicy.governance || null;
  }

  // ==========================================
  // VALIDATION
  // ==========================================

  function userExists(userId) {
    if (!_isPolicyLoaded()) return false;
    return (CompanyPolicy.users || []).some(u => u.id === userId);
  }

  function roleExists(roleKey) {
    if (!_isPolicyLoaded()) return false;
    return !!CompanyPolicy.roles?.[roleKey];
  }

  function departmentExists(deptId) {
    if (!_isPolicyLoaded()) return false;
    return (CompanyPolicy.departments || []).some(d => d.id === deptId);
  }

  // ==========================================
  // LOCALIZATION HELPERS
  // ==========================================

  function localize(data, lang = null) {
    return _localize(data, lang);
  }

  function getCurrentLanguage() {
    return _getLang();
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
    
    // Audit-Specific
    getAuditTeam,
    getAuditCommittee,
    canAccessAuditData,
    getAuditableEntities,
    
    // Departments
    getDeptName,
    getDepartmentHead,
    
    // Financial
    canApproveTransaction,
    
    // Company Info
    getCompanyProfile,
    getGovernanceInfo,
    
    // Validation
    userExists,
    roleExists,
    departmentExists,
    
    // Localization
    localize,
    getCurrentLanguage,
    
    // Direct access to helpers
    _isPolicyLoaded,
    _getLang,
    _localize
  };
})();

// Export
if (typeof window !== 'undefined') {
  window.PolicyHelpers = PolicyHelpers;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PolicyHelpers;
}

console.log('✅ Audit PolicyHelpers Loaded (v3.0.0)');
