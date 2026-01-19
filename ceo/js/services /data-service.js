/**
 * AndroGov Data Service v2.0
 * @description Centralized data service with CompanyPolicy integration
 * @requires CompanyPolicy, PolicyHelpers (from company_policy.js)
 */

const DataService = (function() {
  // ==========================================
  // CONFIGURATION
  // ==========================================
  const CONFIG = {
    // GitHub Raw URL (fallback)
    githubBaseUrl: 'https://raw.githubusercontent.com/androgov-sa/AIT/main/admin/data',
    // Cache duration: 5 minutes
    cacheDuration: 5 * 60 * 1000,
    // Current language
    lang: localStorage.getItem('lang') || 'ar'
  };

  // ==========================================
  // CACHE
  // ==========================================
  let _cache = {
    data: null,
    timestamp: null
  };

  // ==========================================
  // PRIVATE METHODS
  // ==========================================
  
  /**
   * Check if CompanyPolicy is loaded
   */
  function _isPolicyLoaded() {
    return typeof CompanyPolicy !== 'undefined' && CompanyPolicy !== null;
  }

  /**
   * Check if cache is valid
   */
  function _isCacheValid() {
    return _cache.data && _cache.timestamp && 
           (Date.now() - _cache.timestamp) < CONFIG.cacheDuration;
  }

  /**
   * Get localized value from bilingual object
   */
  function _localize(obj, lang = CONFIG.lang) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.ar || obj.en || '';
  }

  /**
   * Update language setting
   */
  function _updateLang() {
    CONFIG.lang = localStorage.getItem('lang') || 'ar';
  }

  // ==========================================
  // PUBLIC API - USERS
  // ==========================================

  /**
   * Get all users with processed data
   * @returns {Array}
   */
  function getUsers() {
    _updateLang();
    
    if (!_isPolicyLoaded()) {
      console.warn('⚠️ CompanyPolicy not loaded');
      return [];
    }

    return CompanyPolicy.users.map(user => {
      const contexts = PolicyHelpers.getUserContexts(user.id);
      const primaryContext = contexts.find(c => c.isPrimary) || contexts[0];
      const shareholderData = PolicyHelpers.getShareholderData(user.id);

      return {
        ...user,
        // Localized fields
        displayName: _localize(user.name),
        displayTitle: _localize(user.title),
        displayDept: getDeptName(user.dept),
        displayRole: primaryContext ? PolicyHelpers.getRoleLabel(primaryContext.role, CONFIG.lang) : '',
        // Role info
        primaryRole: primaryContext?.role || user.role,
        contexts: contexts,
        contextCount: contexts.length,
        // Shareholder info
        isShareholder: !!shareholderData,
        shareholderData: shareholderData,
        // Avatar
        avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(_localize(user.name))}&background=${_getRoleColor(primaryContext?.role || user.role)}&color=fff&bold=true`
      };
    });
  }

  /**
   * Get user by ID
   * @param {string} userId
   * @returns {Object|null}
   */
  function getUserById(userId) {
    const users = getUsers();
    return users.find(u => u.id === userId) || null;
  }

  /**
   * Get users by role
   * @param {string} role
   * @returns {Array}
   */
  function getUsersByRole(role) {
    return getUsers().filter(u => 
      u.primaryRole === role || 
      u.contexts.some(c => c.role === role)
    );
  }

  /**
   * Get users by department
   * @param {string} deptId
   * @returns {Array}
   */
  function getUsersByDept(deptId) {
    return getUsers().filter(u => u.dept === deptId);
  }

  /**
   * Search users
   * @param {string} query
   * @returns {Array}
   */
  function searchUsers(query) {
    if (!query) return getUsers();
    
    const q = query.toLowerCase();
    return getUsers().filter(u => 
      u.displayName.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.displayRole.toLowerCase().includes(q) ||
      u.displayDept.toLowerCase().includes(q)
    );
  }

  // ==========================================
  // PUBLIC API - SHAREHOLDERS
  // ==========================================

  /**
   * Get all shareholders
   * @returns {Array}
   */
  function getShareholders() {
    _updateLang();
    
    if (!_isPolicyLoaded()) return [];

    return CompanyPolicy.shareholders.map(sh => {
      // Find linked user if exists
      const linkedUser = CompanyPolicy.users.find(u => u.email === sh.email);
      
      return {
        ...sh,
        displayName: _localize(sh.name),
        displayProxy: sh.proxy ? _localize(sh.proxy) : null,
        value: sh.shares * CompanyPolicy.capital.shareValue,
        linkedUserId: linkedUser?.id || null,
        linkedUser: linkedUser ? {
          id: linkedUser.id,
          displayName: _localize(linkedUser.name),
          displayTitle: _localize(linkedUser.title)
        } : null
      };
    });
  }

  /**
   * Get shareholder by ID
   * @param {string} shareholderId
   * @returns {Object|null}
   */
  function getShareholderById(shareholderId) {
    return getShareholders().find(s => s.id === shareholderId) || null;
  }

  /**
   * Get major shareholders (above threshold)
   * @param {number} minPercent - default 10%
   * @returns {Array}
   */
  function getMajorShareholders(minPercent = 10) {
    return getShareholders().filter(s => s.percent >= minPercent);
  }

  /**
   * Get shareholders statistics
   * @returns {Object}
   */
  function getShareholdersStats() {
    const shareholders = getShareholders();
    const capital = CompanyPolicy.capital;

    return {
      totalCount: shareholders.length,
      totalShares: capital.sharesCount,
      totalCapital: capital.amount,
      shareValue: capital.shareValue,
      currency: capital.currency,
      individualCount: shareholders.filter(s => s.type === 'Individual').length,
      entityCount: shareholders.filter(s => s.type === 'Entity').length,
      topShareholder: shareholders.reduce((max, s) => s.percent > max.percent ? s : max, shareholders[0])
    };
  }

  // ==========================================
  // PUBLIC API - DEPARTMENTS
  // ==========================================

  /**
   * Get all departments
   * @returns {Array}
   */
  function getDepartments() {
    _updateLang();
    
    if (!_isPolicyLoaded()) return [];

    return CompanyPolicy.departments.map(dept => ({
      ...dept,
      displayName: _localize(dept.name),
      userCount: CompanyPolicy.users.filter(u => u.dept === dept.id).length
    }));
  }

  /**
   * Get department by ID
   * @param {string} deptId
   * @returns {Object|null}
   */
  function getDeptById(deptId) {
    return getDepartments().find(d => d.id === deptId) || null;
  }

  /**
   * Get department name (helper)
   * @param {string} deptId
   * @returns {string}
   */
  function getDeptName(deptId) {
    if (!_isPolicyLoaded()) return deptId;
    const dept = CompanyPolicy.departments.find(d => d.id === deptId);
    return dept ? _localize(dept.name) : deptId;
  }

  // ==========================================
  // PUBLIC API - ROLES & PERMISSIONS
  // ==========================================

  /**
   * Get all roles
   * @returns {Object}
   */
  function getRoles() {
    _updateLang();
    
    if (!_isPolicyLoaded()) return {};

    const roles = {};
    Object.entries(CompanyPolicy.roles).forEach(([key, role]) => {
      roles[key] = {
        ...role,
        key: key,
        displayLabel: _localize(role.label),
        displayDesc: _localize(role.desc)
      };
    });
    return roles;
  }

  /**
   * Get role by key
   * @param {string} roleKey
   * @returns {Object|null}
   */
  function getRoleByKey(roleKey) {
    const roles = getRoles();
    return roles[roleKey] || null;
  }

  /**
   * Get permissions matrix
   * @returns {Object}
   */
  function getPermissions() {
    _updateLang();
    
    if (!_isPolicyLoaded()) return {};

    const permissions = {};
    Object.entries(CompanyPolicy.permissions).forEach(([groupKey, group]) => {
      permissions[groupKey] = {
        key: groupKey,
        displayTitle: _localize(group.title),
        items: group.items.map(item => ({
          ...item,
          displayLabel: _localize(item.label)
        }))
      };
    });
    return permissions;
  }

  /**
   * Check if role has specific permission
   * @param {string} roleKey
   * @param {string} permissionKey
   * @returns {boolean}
   */
  function hasPermission(roleKey, permissionKey) {
    if (!_isPolicyLoaded()) return false;

    for (const group of Object.values(CompanyPolicy.permissions)) {
      const perm = group.items.find(p => p.key === permissionKey);
      if (perm && PolicyHelpers.hasPermission(roleKey, perm.roles)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get all permissions for a user (merged from all roles)
   * @param {string} userId
   * @returns {Array} Array of permission keys
   */
  function getUserPermissions(userId) {
    if (!_isPolicyLoaded()) return [];
    return PolicyHelpers.getMergedPermissions(userId);
  }

  // ==========================================
  // PUBLIC API - GOVERNANCE
  // ==========================================

  /**
   * Get governance configuration
   * @returns {Object}
   */
  function getGovernanceConfig() {
    if (!_isPolicyLoaded()) return {};
    return CompanyPolicy.governance;
  }

  /**
   * Get board members
   * @returns {Array}
   */
  function getBoardMembers() {
    return getUsers().filter(u => 
      u.contexts.some(c => c.context === 'board')
    ).map(u => {
      const boardContext = u.contexts.find(c => c.context === 'board');
      return {
        ...u,
        boardRole: boardContext?.role,
        boardRoleLabel: PolicyHelpers.getRoleLabel(boardContext?.role, CONFIG.lang)
      };
    });
  }

  /**
   * Get audit committee members
   * @returns {Array}
   */
  function getAuditCommitteeMembers() {
    return getUsers().filter(u => 
      u.contexts.some(c => c.context === 'audit_committee')
    ).map(u => {
      const committeeContext = u.contexts.find(c => c.context === 'audit_committee');
      return {
        ...u,
        committeeRole: committeeContext?.role,
        committeeRoleLabel: PolicyHelpers.getRoleLabel(committeeContext?.role, CONFIG.lang)
      };
    });
  }

  // ==========================================
  // PUBLIC API - COMPANY INFO
  // ==========================================

  /**
   * Get company identity/profile
   * @returns {Object}
   */
  function getCompanyProfile() {
    _updateLang();
    
    if (!_isPolicyLoaded()) return {};

    const identity = CompanyPolicy.identity;
    const capital = CompanyPolicy.capital;

    return {
      name: _localize(identity.name),
      legalName: _localize(identity.legalName),
      website: identity.website,
      crNumber: identity.crNumber,
      unifiedNumber: identity.unifiedNumber,
      establishmentDate: identity.establishmentDate,
      capital: {
        ...capital,
        formatted: `${capital.amount.toLocaleString()} ${capital.currency}`
      }
    };
  }

  /**
   * Get HR policies
   * @returns {Object}
   */
  function getHRPolicies() {
    if (!_isPolicyLoaded()) return {};
    return CompanyPolicy.hrPolicies;
  }

  /**
   * Get financial authority limits
   * @returns {Object}
   */
  function getFinancialAuthority() {
    if (!_isPolicyLoaded()) return {};
    return CompanyPolicy.financialAuthority;
  }

  // ==========================================
  // PUBLIC API - UTILITIES
  // ==========================================

  /**
   * Get color for role (for avatars/badges)
   */
  function _getRoleColor(roleKey) {
    const colors = {
      sys_admin: 'EF4444',
      chairman: '3B82F6',
      vice_chairman: '3B82F6',
      board_member: '6366F1',
      ceo: '8B5CF6',
      cfo: '8B5CF6',
      manager: '10B981',
      employee: '64748B',
      shareholder: 'F59E0B',
      grc_officer: 'EC4899',
      board_secretary: '06B6D4',
      audit_committee_chair: 'F97316',
      audit_committee_member: 'F97316',
      investor_relations: 'F59E0B'
    };
    return colors[roleKey] || '64748B';
  }

  /**
   * Get system statistics
   * @returns {Object}
   */
  function getSystemStats() {
    const users = getUsers();
    const shareholders = getShareholders();

    return {
      totalUsers: users.length,
      totalShareholders: shareholders.length,
      totalDepartments: CompanyPolicy.departments?.length || 0,
      totalRoles: Object.keys(CompanyPolicy.roles || {}).length,
      executiveCount: users.filter(u => u.isExecutive).length,
      multiRoleUsers: users.filter(u => u.contextCount > 1).length
    };
  }

  /**
   * Clear cache
   */
  function clearCache() {
    _cache = { data: null, timestamp: null };
    console.log('🔄 DataService cache cleared');
  }

  /**
   * Check service status
   * @returns {Object}
   */
  function getStatus() {
    return {
      policyLoaded: _isPolicyLoaded(),
      cacheValid: _isCacheValid(),
      currentLang: CONFIG.lang,
      version: '2.0.0'
    };
  }

  // ==========================================
  // RETURN PUBLIC API
  // ==========================================
  return {
    // Users
    getUsers,
    getUserById,
    getUsersByRole,
    getUsersByDept,
    searchUsers,

    // Shareholders
    getShareholders,
    getShareholderById,
    getMajorShareholders,
    getShareholdersStats,

    // Departments
    getDepartments,
    getDeptById,
    getDeptName,

    // Roles & Permissions
    getRoles,
    getRoleByKey,
    getPermissions,
    hasPermission,
    getUserPermissions,

    // Governance
    getGovernanceConfig,
    getBoardMembers,
    getAuditCommitteeMembers,

    // Company Info
    getCompanyProfile,
    getHRPolicies,
    getFinancialAuthority,

    // Utilities
    getSystemStats,
    clearCache,
    getStatus
  };
})();

// ==========================================
// GLOBAL EXPORT
// ==========================================
if (typeof window !== 'undefined') {
  window.DataService = DataService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataService;
}
