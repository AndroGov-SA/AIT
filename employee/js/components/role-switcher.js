/**
 * AndroGov CEO Role Switcher
 * @file ceo/js/components/role-switcher.js
 * @description Handles switching between CEO, Board VP, and Shareholder roles
 */

const RoleSwitcher = (function() {

  // ==========================================
  // ROLE DEFINITIONS
  // ==========================================
  
  const _roles = {
    ceo: {
      id: 'ceo',
      name: { ar: 'الرئيس التنفيذي', en: 'Chief Executive Officer' },
      icon: 'fa-crown',
      color: 'red',
      permissions: [
        'view_all_reports',
        'approve_budgets',
        'manage_strategy',
        'view_risks',
        'broadcast_announcements',
        'manage_executives'
      ],
      pages: [
        'index.html',
        'ceo_strategy.html',
        'ceo_finance.html',
        'ceo_governance.html',
        'ceo_risks.html',
        'ceo_reports.html',
        'ceo_broadcast.html',
        'ceo_communication.html',
        'ceo_feedback.html',
        'profile.html'
      ]
    },
    
    board_vp: {
      id: 'board_vp',
      name: { ar: 'نائب رئيس المجلس', en: 'Board Vice President' },
      icon: 'fa-user-tie',
      color: 'amber',
      permissions: [
        'view_board_minutes',
        'attend_board_meetings',
        'review_governance',
        'view_reports',
        'strategic_oversight'
      ],
      pages: [
        'ceo_board.html',
        'ceo_governance.html',
        'ceo_strategy.html',
        'ceo_risks.html',
        'ceo_reports.html',
        'ceo_finance.html',
        'ceo_communication.html',
        'profile.html'
      ]
    },
    
    shareholder: {
      id: 'shareholder',
      name: { ar: 'مساهم', en: 'Shareholder' },
      icon: 'fa-chart-pie',
      color: 'green',
      permissions: [
        'view_financial_statements',
        'view_annual_reports',
        'attend_general_assembly',
        'view_governance_docs'
      ],
      pages: [
        'index.html',
        'ceo_finance.html',
        'ceo_governance.html',
        'ceo_board.html',
        'ceo_reports.html',
        'ceo_broadcast.html',
        'profile.html'
      ]
    }
  };

  let _currentRole = 'ceo';

  // ==========================================
  // ROLE MANAGEMENT
  // ==========================================
  
  function getCurrentRole() {
    return _currentRole;
  }

  function setRole(roleId) {
    if (!_roles[roleId]) {
      console.error('❌ Invalid role:', roleId);
      return false;
    }

    _currentRole = roleId;
    localStorage.setItem('ceo_activeRole', roleId);
    
    // Update UI if Layout is available
    if (window.Layout && typeof Layout.switchRole === 'function') {
      Layout.switchRole(roleId);
    }

    console.log(`🔄 Role switched to: ${roleId}`);
    return true;
  }

  function getRoleInfo(roleId) {
    return _roles[roleId] || null;
  }

  function getAllRoles() {
    return Object.values(_roles);
  }

  // ==========================================
  // PERMISSIONS
  // ==========================================
  
  function hasPermission(permission) {
    const role = _roles[_currentRole];
    return role && role.permissions.includes(permission);
  }

  function canAccessPage(pageName) {
    const role = _roles[_currentRole];
    return role && role.pages.includes(pageName);
  }

  // ==========================================
  // UI HELPER
  // ==========================================
  
  function getRoleLabel(roleId, lang = 'ar') {
    const role = _roles[roleId];
    return role ? role.name[lang] : roleId;
  }

  function getRoleIcon(roleId) {
    const role = _roles[roleId];
    return role ? role.icon : 'fa-user';
  }

  function getRoleColor(roleId) {
    const role = _roles[roleId];
    return role ? role.color : 'slate';
  }

  // ==========================================
  // PAGE VALIDATION
  // ==========================================
  
  function validateCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!canAccessPage(currentPage)) {
      console.warn(`⚠️ Current role (${_currentRole}) cannot access: ${currentPage}`);
      
      // Redirect to first available page
      const role = _roles[_currentRole];
      if (role && role.pages.length > 0) {
        console.log(`🔄 Redirecting to: ${role.pages[0]}`);
        window.location.href = role.pages[0];
      }
      
      return false;
    }
    
    return true;
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  
  function init() {
    // Load saved role
    const savedRole = localStorage.getItem('ceo_activeRole');
    if (savedRole && _roles[savedRole]) {
      _currentRole = savedRole;
    }

    console.log(`✅ RoleSwitcher initialized | Active Role: ${_currentRole}`);
    
    // Validate current page access
    setTimeout(() => {
      validateCurrentPage();
    }, 500);
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
    getCurrentRole,
    setRole,
    getRoleInfo,
    getAllRoles,
    hasPermission,
    canAccessPage,
    getRoleLabel,
    getRoleIcon,
    getRoleColor,
    validateCurrentPage,
    init
  };

})();

window.RoleSwitcher = RoleSwitcher;
