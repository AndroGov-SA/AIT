/**
 * AndroGov Users Page Controller v3.0
 * @description Handles Users & Permissions page logic
 * @version 3.0.0
 * @requires AppConfig, I18n, DataService, PolicyHelpers, RoleSwitcher
 */

const UsersPage = (function() {
  // ==========================================
  // STATE
  // ==========================================
  let _state = {
    users: [],
    roles: {},
    permissions: {},
    departments: [],
    selectedRole: null,
    searchQuery: '',
    currentView: 'users', // 'users' or 'roles'
    isLoading: true
  };

  // ==========================================
  // INITIALIZATION
  // ==========================================
  async function init() {
    showLoading();

    try {
      // Load data from DataService
      _state.users = DataService.getUsers();
      _state.roles = DataService.getRoles();
      _state.permissions = DataService.getPermissions();
      _state.departments = DataService.getDepartments();

      // Apply translations
      I18n.applyToDOM();

      // Render components
      renderStats();
      renderUsers();
      renderRolesList();

      // Select first role by default
      const firstRoleKey = Object.keys(_state.roles)[0];
      if (firstRoleKey) {
        selectRole(firstRoleKey);
      }

      _state.isLoading = false;
      hideLoading();

      console.log('✅ UsersPage initialized', {
        users: _state.users.length,
        roles: Object.keys(_state.roles).length
      });

    } catch (error) {
      console.error('❌ Error initializing UsersPage:', error);
      showError();
    }
  }

  // ==========================================
  // STATS CARDS
  // ==========================================
  function renderStats() {
    const container = document.getElementById('stats-container');
    if (!container) return;

    const stats = DataService.getSystemStats();
    const lang = AppConfig.getLang();

    const cards = [
      {
        label: I18n.t('users.totalUsers'),
        value: stats.totalUsers,
        icon: 'fa-users',
        color: 'blue',
        bgColor: 'bg-blue-50 dark:bg-blue-900/30',
        textColor: 'text-brandBlue'
      },
      {
        label: I18n.t('shareholders.shareholdersCount'),
        value: stats.totalShareholders,
        icon: 'fa-hand-holding-dollar',
        color: 'green',
        bgColor: 'bg-green-50 dark:bg-green-900/30',
        textColor: 'text-green-600'
      },
      {
        label: I18n.t('users.executives'),
        value: stats.executiveCount,
        icon: 'fa-user-tie',
        color: 'purple',
        bgColor: 'bg-purple-50 dark:bg-purple-900/30',
        textColor: 'text-purple-600'
      },
      {
        label: I18n.t('users.definedRoles'),
        value: stats.totalRoles,
        icon: 'fa-shield-halved',
        color: 'red',
        bgColor: 'bg-red-50 dark:bg-red-900/30',
        textColor: 'text-brandRed'
      }
    ];

    container.innerHTML = cards.map(card => `
      <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition stats-card">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">${card.label}</p>
            <h3 class="text-2xl font-bold mt-1 font-en ${card.textColor}">${I18n.formatNumber(card.value)}</h3>
          </div>
          <div class="w-10 h-10 rounded-xl ${card.bgColor} ${card.textColor} flex items-center justify-center text-xl">
            <i class="fa-solid ${card.icon}"></i>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // USERS TABLE
  // ==========================================
  function renderUsers() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    const lang = AppConfig.getLang();
    const query = _state.searchQuery.toLowerCase();

    // Filter users
    let filteredUsers = _state.users;
    if (query) {
      filteredUsers = _state.users.filter(u =>
        u.displayName?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query) ||
        u.displayRole?.toLowerCase().includes(query) ||
        u.displayDept?.toLowerCase().includes(query)
      );
    }

    // Empty state
    if (filteredUsers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="p-8 text-center">
            <div class="text-slate-400">
              <i class="fa-solid fa-search text-4xl mb-3"></i>
              <p class="text-sm">${I18n.t('common.noResults')}</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    // Render rows
    tbody.innerHTML = filteredUsers.map(user => {
      const statusActive = user.status !== 'inactive';
      const statusClass = statusActive
        ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-800'
        : 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-800';
      const statusDot = statusActive ? 'bg-green-500' : 'bg-red-500';
      const statusText = statusActive ? I18n.t('status.active') : I18n.t('status.inactive');

      // Multi-role indicator
      const multiRoleBadge = user.contextCount > 1
        ? `<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brandBlue text-white text-[10px] font-bold mr-1" title="${user.contextCount} ${lang === 'ar' ? 'أدوار' : 'roles'}">${user.contextCount}</span>`
        : '';

      // Shareholder badge
      const shareholderBadge = user.isShareholder
        ? `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 text-[9px] font-bold dark:bg-amber-900/20"><i class="fa-solid fa-hand-holding-dollar"></i> ${user.shareholderData?.percent}%</span>`
        : '';

      return `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition group">
          <!-- User Info -->
          <td class="p-4">
            <div class="flex items-center gap-3">
              <div class="relative">
                <img src="${user.avatar}" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 shadow-sm object-cover">
                ${user.contextCount > 1 ? `<span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brandBlue text-white text-[10px] flex items-center justify-center font-bold border-2 border-white dark:border-slate-800">${user.contextCount}</span>` : ''}
              </div>
              <div class="min-w-0">
                <p class="font-bold text-sm text-slate-800 dark:text-white truncate">${user.displayName}</p>
                <p class="text-[10px] text-slate-400 font-mono uppercase">${user.id}</p>
              </div>
            </div>
          </td>

          <!-- Role -->
          <td class="p-4">
            <div class="flex flex-col gap-1">
              <span class="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 w-fit">
                ${user.displayRole}
              </span>
              <span class="text-[10px] text-slate-400 truncate">${user.displayTitle}</span>
              ${shareholderBadge}
            </div>
          </td>

          <!-- Department -->
          <td class="p-4">
            <span class="text-xs text-slate-500 dark:text-slate-400">${user.displayDept}</span>
          </td>

          <!-- Email -->
          <td class="p-4">
            <a href="mailto:${user.email}" class="text-xs text-slate-500 hover:text-brandBlue transition font-mono">${user.email || '-'}</a>
          </td>

          <!-- Status -->
          <td class="p-4 text-center">
            <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold ${statusClass} border">
              <span class="w-1.5 h-1.5 rounded-full ${statusDot} ${statusActive ? 'animate-pulse' : ''}"></span>
              ${statusText}
            </span>
          </td>

          <!-- Actions -->
          <td class="p-4">
            <div class="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onclick="UsersPage.viewUser('${user.id}')" class="action-btn w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-brandBlue hover:text-white text-slate-400 transition flex items-center justify-center" title="${I18n.t('actions.viewDetails')}">
                <i class="fa-solid fa-eye text-xs"></i>
              </button>
              <button onclick="UsersPage.editUser('${user.id}')" class="action-btn w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-brandBlue hover:text-white text-slate-400 transition flex items-center justify-center" title="${I18n.t('actions.edit')}">
                <i class="fa-solid fa-pen text-xs"></i>
              </button>
              <button onclick="UsersPage.deleteUser('${user.id}')" class="action-btn w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-brandRed hover:text-white text-slate-400 transition flex items-center justify-center" title="${I18n.t('actions.delete')}">
                <i class="fa-solid fa-trash text-xs"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // ==========================================
  // ROLES LIST
  // ==========================================
  function renderRolesList() {
    const container = document.getElementById('rolesList');
    if (!container) return;

    const lang = AppConfig.getLang();

    container.innerHTML = Object.entries(_state.roles).map(([key, role]) => {
      const isSelected = _state.selectedRole === key;
      const usersWithRole = _state.users.filter(u =>
        u.primaryRole === key || u.contexts?.some(c => c.role === key)
      ).length;

      return `
        <div 
          onclick="UsersPage.selectRole('${key}')"
          id="role-card-${key}"
          class="role-card p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected
            ? 'border-brandBlue bg-blue-50 dark:bg-blue-900/20 shadow-md'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'}"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <span class="text-xs font-bold text-slate-500">${role.level || 0}</span>
              </div>
              <h4 class="font-bold text-sm ${isSelected ? 'text-brandBlue' : 'text-slate-800 dark:text-white'}">${role.displayLabel}</h4>
            </div>
            <span class="text-[10px] bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300 px-2 py-0.5 rounded-full">${usersWithRole}</span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">${role.displayDesc}</p>
          ${role.inherits ? `
            <p class="text-[10px] text-brandBlue flex items-center gap-1">
              <i class="fa-solid fa-link"></i>
              ${I18n.t('users.inheritsFrom')}: ${_state.roles[role.inherits]?.displayLabel || role.inherits}
            </p>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // ROLE DETAILS & PERMISSIONS
  // ==========================================
  function selectRole(roleKey) {
    _state.selectedRole = roleKey;

    // Update UI
    document.querySelectorAll('.role-card').forEach(el => {
      el.classList.remove('border-brandBlue', 'bg-blue-50', 'dark:bg-blue-900/20', 'shadow-md');
      el.classList.add('border-slate-200', 'dark:border-slate-700');
    });

    const selectedCard = document.getElementById(`role-card-${roleKey}`);
    if (selectedCard) {
      selectedCard.classList.remove('border-slate-200', 'dark:border-slate-700');
      selectedCard.classList.add('border-brandBlue', 'bg-blue-50', 'dark:bg-blue-900/20', 'shadow-md');
    }

    // Update details panel
    renderRoleDetails(roleKey);
  }

  function renderRoleDetails(roleKey) {
    const role = _state.roles[roleKey];
    if (!role) return;

    const lang = AppConfig.getLang();

    // Role name & description
    const nameEl = document.getElementById('roleDetailName');
    const descEl = document.getElementById('roleDetailDesc');
    if (nameEl) nameEl.textContent = role.displayLabel;
    if (descEl) descEl.textContent = role.displayDesc;

    // Inherits badge
    const inheritsBadge = document.getElementById('roleInheritsBadge');
    const inheritsVal = document.getElementById('roleInheritsVal');
    if (inheritsBadge && inheritsVal) {
      if (role.inherits) {
        inheritsBadge.classList.remove('hidden');
        inheritsVal.textContent = _state.roles[role.inherits]?.displayLabel || role.inherits;
      } else {
        inheritsBadge.classList.add('hidden');
      }
    }

    // Permissions
    renderPermissions(roleKey);
  }

  function renderPermissions(roleKey) {
    const container = document.getElementById('permissionsContainer');
    if (!container) return;

    const lang = AppConfig.getLang();

    container.innerHTML = Object.entries(_state.permissions).map(([groupKey, group]) => {
      const items = group.items.map(perm => {
        const hasPermission = _checkPermission(roleKey, perm.roles);

        return `
          <div class="flex items-center justify-between p-3 border-b border-slate-50 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-700 dark:text-slate-300">${perm.displayLabel}</span>
            </div>
            ${hasPermission
              ? '<i class="fa-solid fa-circle-check text-green-500 text-lg"></i>'
              : '<i class="fa-regular fa-circle text-slate-300 dark:text-slate-600 text-lg"></i>'
            }
          </div>
        `;
      }).join('');

      return `
        <div class="mb-6">
          <h5 class="font-bold text-xs text-brandBlue mb-3 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brandBlue"></span>
            ${group.displayTitle}
          </h5>
          <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            ${items}
          </div>
        </div>
      `;
    }).join('');
  }

  function _checkPermission(roleKey, allowedRoles) {
    if (!allowedRoles || !Array.isArray(allowedRoles)) return false;
    if (allowedRoles.includes(roleKey)) return true;

    // Check inherited permissions
    let inherited = _state.roles[roleKey]?.inherits;
    while (inherited) {
      if (allowedRoles.includes(inherited)) return true;
      inherited = _state.roles[inherited]?.inherits;
    }

    return false;
  }

  // ==========================================
  // VIEW SWITCHING
  // ==========================================
  function switchView(view) {
    _state.currentView = view;

    const usersView = document.getElementById('view-users');
    const rolesView = document.getElementById('view-roles');
    const toolbar = document.getElementById('userToolbar');
    const btnUsers = document.getElementById('btn-users');
    const btnRoles = document.getElementById('btn-roles');

    if (view === 'users') {
      usersView?.classList.remove('hidden');
      rolesView?.classList.add('hidden');
      toolbar?.classList.remove('hidden');
      btnUsers?.classList.add('bg-white', 'dark:bg-slate-600', 'text-brandBlue', 'shadow-sm');
      btnUsers?.classList.remove('text-slate-500');
      btnRoles?.classList.remove('bg-white', 'dark:bg-slate-600', 'text-brandBlue', 'shadow-sm');
      btnRoles?.classList.add('text-slate-500');
    } else {
      usersView?.classList.add('hidden');
      rolesView?.classList.remove('hidden');
      toolbar?.classList.add('hidden');
      btnRoles?.classList.add('bg-white', 'dark:bg-slate-600', 'text-brandBlue', 'shadow-sm');
      btnRoles?.classList.remove('text-slate-500');
      btnUsers?.classList.remove('bg-white', 'dark:bg-slate-600', 'text-brandBlue', 'shadow-sm');
      btnUsers?.classList.add('text-slate-500');
    }
  }

  // ==========================================
  // SEARCH
  // ==========================================
  function search(query) {
    _state.searchQuery = query || '';
    renderUsers();
  }

  // ==========================================
  // USER ACTIONS
  // ==========================================
  function viewUser(userId) {
    const user = _state.users.find(u => u.id === userId);
    if (!user) return;

    const lang = AppConfig.getLang();

    // Build contexts list
    const contextsHTML = user.contexts?.length > 0
      ? user.contexts.map(ctx => {
          const ctxInfo = AppConfig.getContextInfo(ctx.context);
          return `
            <div class="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div class="w-6 h-6 rounded flex items-center justify-center text-white text-xs" style="background-color: ${ctxInfo?.color || '#64748B'}">
                <i class="fa-solid ${ctxInfo?.icon || 'fa-user'}"></i>
              </div>
              <span class="text-xs font-medium">${ctx.label?.[lang] || ctx.context}</span>
              ${ctx.isPrimary ? '<span class="text-[9px] bg-brandBlue text-white px-1.5 py-0.5 rounded">' + (lang === 'ar' ? 'أساسي' : 'Primary') + '</span>' : ''}
            </div>
          `;
        }).join('')
      : `<p class="text-xs text-slate-400">${lang === 'ar' ? 'لا توجد أدوار متعددة' : 'No multiple roles'}</p>`;

    // Shareholder info
    const shareholderHTML = user.isShareholder && user.shareholderData
      ? `
        <div class="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
          <p class="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">
            <i class="fa-solid fa-hand-holding-dollar"></i> ${I18n.t('shareholders.shareholdersCount')}
          </p>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div>
              <p class="text-lg font-bold text-amber-600">${user.shareholderData.percent}%</p>
              <p class="text-[10px] text-amber-600/70">${I18n.t('shareholders.percent')}</p>
            </div>
            <div>
              <p class="text-lg font-bold text-amber-600">${I18n.formatNumber(user.shareholderData.shares)}</p>
              <p class="text-[10px] text-amber-600/70">${I18n.t('shareholders.shares')}</p>
            </div>
            <div>
              <p class="text-lg font-bold text-amber-600">${I18n.formatNumber(user.shareholderData.value)}</p>
              <p class="text-[10px] text-amber-600/70">${I18n.t('shareholders.value')}</p>
            </div>
          </div>
        </div>
      `
      : '';

    Swal.fire({
      title: user.displayName,
      html: `
        <div class="text-${lang === 'ar' ? 'right' : 'left'}">
          <div class="flex items-center gap-4 mb-4 pb-4 border-b dark:border-slate-700">
            <img src="${user.avatar}" class="w-16 h-16 rounded-full border-2 border-slate-200">
            <div>
              <p class="text-sm font-bold">${user.displayTitle}</p>
              <p class="text-xs text-slate-500">${user.displayDept}</p>
              <p class="text-xs text-brandBlue font-mono mt-1">${user.email}</p>
            </div>
          </div>
          
          <div class="mb-4">
            <p class="text-xs font-bold text-slate-500 mb-2">${I18n.t('roleSwitcher.availableRoles')}</p>
            <div class="flex flex-wrap gap-2">
              ${contextsHTML}
            </div>
          </div>

          ${shareholderHTML}
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: 'dark:bg-slate-800 dark:text-white',
        title: 'text-lg'
      }
    });
  }

  function editUser(userId) {
    const user = _state.users.find(u => u.id === userId);
    if (!user) return;

    const lang = AppConfig.getLang();

    Swal.fire({
      title: `${I18n.t('users.editUser')}: ${user.displayName}`,
      html: `
        <div class="text-${lang === 'ar' ? 'right' : 'left'} space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">${I18n.t('users.colUser')}</label>
            <input type="text" id="edit-name" value="${user.displayName}" class="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">${I18n.t('users.colEmail')}</label>
            <input type="email" id="edit-email" value="${user.email || ''}" class="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white font-mono">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">${I18n.t('users.colDept')}</label>
            <select id="edit-dept" class="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white">
              ${_state.departments.map(d => `
                <option value="${d.id}" ${d.id === user.dept ? 'selected' : ''}>${d.displayName}</option>
              `).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">${I18n.t('users.colStatus')}</label>
            <select id="edit-status" class="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white">
              <option value="active" ${user.status !== 'inactive' ? 'selected' : ''}>${I18n.t('status.active')}</option>
              <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>${I18n.t('status.inactive')}</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: I18n.t('actions.save'),
      cancelButtonText: I18n.t('actions.cancel'),
      confirmButtonColor: '#4267B2',
      customClass: {
        popup: 'dark:bg-slate-800 dark:text-white'
      },
      preConfirm: () => {
        return {
          name: document.getElementById('edit-name').value,
          email: document.getElementById('edit-email').value,
          dept: document.getElementById('edit-dept').value,
          status: document.getElementById('edit-status').value
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Here you would save to backend
        console.log('Save user:', result.value);
        Swal.fire({
          icon: 'success',
          title: I18n.t('messages.updateSuccess'),
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  function deleteUser(userId) {
    const user = _state.users.find(u => u.id === userId);
    if (!user) return;

    Swal.fire({
      title: I18n.t('users.deleteUserConfirm'),
      text: user.displayName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: I18n.t('actions.delete'),
      cancelButtonText: I18n.t('actions.cancel'),
      confirmButtonColor: '#FB4747',
      customClass: {
        popup: 'dark:bg-slate-800 dark:text-white'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Here you would delete from backend
        console.log('Delete user:', userId);
        Swal.fire({
          icon: 'success',
          title: I18n.t('messages.deleteSuccess'),
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  // ==========================================
  // LOADING & ERROR STATES
  // ==========================================
  function showLoading() {
    const tbody = document.getElementById('usersTableBody');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="p-8 text-center">
            <div class="text-slate-400">
              <i class="fa-solid fa-spinner fa-spin text-3xl mb-3"></i>
              <p class="text-sm">${I18n.t('common.loading')}</p>
            </div>
          </td>
        </tr>
      `;
    }
  }

  function hideLoading() {
    _state.isLoading = false;
  }

  function showError() {
    const tbody = document.getElementById('usersTableBody');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="p-8 text-center">
            <div class="text-red-500">
              <i class="fa-solid fa-exclamation-triangle text-3xl mb-3"></i>
              <p class="text-sm">${I18n.t('common.error')}</p>
            </div>
          </td>
        </tr>
      `;
    }
  }

  // ==========================================
  // RETURN PUBLIC API
  // ==========================================
  return {
    init,
    renderUsers,
    renderStats,
    renderRolesList,
    switchView,
    selectRole,
    search,
    viewUser,
    editUser,
    deleteUser
  };
})();

// ==========================================
// GLOBAL EXPORT
// ==========================================
if (typeof window !== 'undefined') {
  window.UsersPage = UsersPage;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UsersPage;
}
