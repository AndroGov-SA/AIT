/**
 * AndroGov Users Page Controller v2.0
 * @description Handles Users & Permissions page logic
 * @requires DataService, Layout
 */

const UsersPage = (function() {
    // ==========================================
    // STATE
    // ==========================================
    let _state = {
        users: [],
        shareholders: [],
        departments: {},
        roles: {},
        permissions: {},
        allUsers: [],
        currentLang: 'ar',
        isLoading: true
    };

    // ==========================================
    // TRANSLATIONS
    // ==========================================
    const t = {
        ar: {
            pageTitle: "AndroGov | إدارة المستخدمين",
            headerTitle: "إدارة المستخدمين والصلاحيات",
            headerDesc: "لوحة التحكم المركزية بالوصول والأدوار (RBAC)",
            statTotal: "إجمالي المستخدمين",
            statShareholders: "المساهمين",
            statExec: "الإدارة التنفيذية",
            statRoles: "الأدوار المعرفة",
            tabUsers: "دليل المستخدمين",
            tabRoles: "هيكل الصلاحيات",
            searchPlaceholder: "بحث بالاسم، الدور، أو البريد...",
            colUser: "المستخدم",
            colRole: "الدور الوظيفي",
            colDept: "القسم / الجهة",
            colEmail: "البريد الإلكتروني",
            colStatus: "الحالة",
            colActions: "إجراءات",
            statusActive: "نشط",
            statusInactive: "غير نشط",
            inherits: "يرث صلاحيات:",
            ownerDept: "الملاك / المساهمين",
            loading: "جاري التحميل...",
            errorLoad: "خطأ في تحميل البيانات"
        },
        en: {
            pageTitle: "AndroGov | User Management",
            headerTitle: "User & Role Management",
            headerDesc: "Central Access Control Panel (RBAC)",
            statTotal: "Total Users",
            statShareholders: "Shareholders",
            statExec: "Executives",
            statRoles: "Defined Roles",
            tabUsers: "User Directory",
            tabRoles: "Roles Structure",
            searchPlaceholder: "Search name, role, or email...",
            colUser: "User",
            colRole: "Role",
            colDept: "Department",
            colEmail: "Email",
            colStatus: "Status",
            colActions: "Actions",
            statusActive: "Active",
            statusInactive: "Inactive",
            inherits: "Inherits from:",
            ownerDept: "Owners / Shareholders",
            loading: "Loading...",
            errorLoad: "Error loading data"
        }
    };

    // ==========================================
    // INITIALIZATION
    // ==========================================
    async function init() {
        _state.currentLang = localStorage.getItem('lang') || 'ar';
        
        showLoadingState();
        
        try {
            // Fetch all data from DataService
            const [users, shareholders, departments, roles, permissions] = await Promise.all([
                DataService.getUsers(),
                DataService.getShareholders(),
                DataService.getDepartments(),
                DataService.getRoles(),
                DataService.getPermissions()
            ]);

            _state.users = users;
            _state.shareholders = shareholders;
            _state.departments = departments;
            _state.roles = roles;
            _state.permissions = permissions;

            processUsers();
            applyLanguage();
            renderStats();
            renderUsers();
            renderRolesList();
            
            // Select first role
            const firstRole = Object.keys(_state.roles)[0];
            if (firstRole) showRoleDetails(firstRole);

            _state.isLoading = false;
            hideLoadingState();
            
            console.log('✅ Users Page initialized');
        } catch (error) {
            console.error('❌ Error initializing Users Page:', error);
            showErrorState();
        }
    }

    // ==========================================
    // DATA PROCESSING
    // ==========================================
    function processUsers() {
        const lang = _state.currentLang;
        const trans = t[lang];

        // Process employees
        const employees = _state.users.map(u => {
            const name = u.name || {};
            const title = u.title || {};
            
            return {
                ...u,
                type: 'employee',
                displayName: lang === 'ar' ? (name.ar || name.en) : (name.en || name.ar),
                displayTitle: lang === 'ar' ? (title.ar || title.en) : (title.en || title.ar),
                displayRole: getRoleLabel(u.role_ref),
                displayDept: getDeptName(u.dept),
                avatarColor: getRoleColor(u.role_ref)
            };
        });

        // Process shareholders (exclude those already in employees)
        const shareholderEmails = employees.map(e => e.email?.toLowerCase());
        const shareholdersOnly = _state.shareholders
            .filter(s => !shareholderEmails.includes(s.email?.toLowerCase()))
            .map(s => {
                const name = s.name || {};
                return {
                    id: s.id,
                    email: s.email,
                    displayName: lang === 'ar' ? (name.ar || name.en) : (name.en || name.ar),
                    displayTitle: lang === 'ar' ? `مساهم (${s.percent}%)` : `Shareholder (${s.percent}%)`,
                    type: 'shareholder',
                    role_ref: 'shareholder',
                    displayRole: getRoleLabel('shareholder'),
                    displayDept: trans.ownerDept,
                    avatarColor: '#10B981'
                };
            });

        _state.allUsers = [...employees, ...shareholdersOnly];
    }

    // ==========================================
    // RENDERING
    // ==========================================
    function renderStats() {
        const container = document.getElementById('stats-container');
        if (!container) return;
        
        const trans = t[_state.currentLang];
        const totalUsers = _state.allUsers.length;
        const shareholdersCount = _state.allUsers.filter(u => u.type === 'shareholder').length;
        const execCount = _state.allUsers.filter(u => ['ceo', 'cfo', 'manager'].includes(u.role_ref)).length;
        const rolesCount = Object.keys(_state.roles).length;

        container.innerHTML = `
            <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center hover:shadow-md transition">
                <div>
                    <p class="text-xs text-slate-500 font-bold uppercase">${trans.statTotal}</p>
                    <h3 class="text-2xl font-bold mt-1 font-en text-brandBlue">${totalUsers}</h3>
                </div>
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-brandBlue flex items-center justify-center text-xl"><i class="fa-solid fa-users"></i></div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center hover:shadow-md transition">
                <div>
                    <p class="text-xs text-slate-500 font-bold uppercase">${trans.statShareholders}</p>
                    <h3 class="text-2xl font-bold mt-1 font-en text-green-600">${shareholdersCount}</h3>
                </div>
                <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl"><i class="fa-solid fa-hand-holding-dollar"></i></div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center hover:shadow-md transition">
                <div>
                    <p class="text-xs text-slate-500 font-bold uppercase">${trans.statExec}</p>
                    <h3 class="text-2xl font-bold mt-1 font-en text-purple-600">${execCount}</h3>
                </div>
                <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl"><i class="fa-solid fa-user-tie"></i></div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center hover:shadow-md transition">
                <div>
                    <p class="text-xs text-slate-500 font-bold uppercase">${trans.statRoles}</p>
                    <h3 class="text-2xl font-bold mt-1 font-en text-brandRed">${rolesCount}</h3>
                </div>
                <div class="w-10 h-10 rounded-xl bg-red-50 text-brandRed flex items-center justify-center text-xl"><i class="fa-solid fa-shield-halved"></i></div>
            </div>
        `;
    }

    function renderUsers() {
        const tbody = document.getElementById('usersTableBody');
        const searchInput = document.getElementById('searchInput');
        if (!tbody) return;

        const search = (searchInput?.value || '').toLowerCase();
        const trans = t[_state.currentLang];

        const filtered = _state.allUsers.filter(u =>
            (u.displayName?.toLowerCase().includes(search)) ||
            (u.email?.toLowerCase().includes(search)) ||
            (u.displayRole?.toLowerCase().includes(search))
        );

        tbody.innerHTML = filtered.map(u => {
            const safeColor = (u.avatarColor || '#64748B').replace('#', '');
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.displayName || 'U')}&background=${safeColor}&color=fff&bold=true`;
            const isActive = u.status !== 'inactive';
            const statusColor = isActive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100';
            const statusDot = isActive ? 'bg-green-500' : 'bg-red-500';
            const statusText = isActive ? trans.statusActive : trans.statusInactive;

            return `
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                    <td class="p-4">
                        <div class="flex items-center gap-3">
                            <img src="${avatarUrl}" class="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-600">
                            <div>
                                <p class="font-bold text-sm text-slate-800 dark:text-white">${u.displayName}</p>
                                <p class="text-[10px] text-slate-400 font-en uppercase">${u.id}</p>
                            </div>
                        </div>
                    </td>
                    <td class="p-4">
                        <span class="px-2 py-1 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 border text-slate-600 dark:text-slate-300">${u.displayRole}</span>
                        <div class="text-[10px] text-slate-400 mt-1">${u.displayTitle}</div>
                    </td>
                    <td class="p-4 text-xs text-slate-500">${u.displayDept}</td>
                    <td class="p-4 text-xs font-en text-slate-500">${u.email || '-'}</td>
                    <td class="p-4 text-center">
                        <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold ${statusColor} border">
                            <span class="w-1.5 h-1.5 rounded-full ${statusDot} animate-pulse"></span> ${statusText}
                        </span>
                    </td>
                    <td class="p-4 text-center">
                        <div class="flex justify-center gap-2">
                            <button onclick="UsersPage.editUser('${u.id}')" class="w-8 h-8 rounded-lg bg-slate-50 hover:bg-brandBlue hover:text-white text-slate-400 transition flex items-center justify-center"><i class="fa-solid fa-pen"></i></button>
                            <button onclick="UsersPage.deleteUser('${u.id}')" class="w-8 h-8 rounded-lg bg-slate-50 hover:bg-brandRed hover:text-white text-slate-400 transition flex items-center justify-center"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function renderRolesList() {
        const container = document.getElementById('rolesList');
        if (!container) return;

        const lang = _state.currentLang;
        const trans = t[lang];

        container.innerHTML = Object.entries(_state.roles).map(([key, role]) => {
            const label = role.label?.[lang] || key;
            const desc = role.desc?.[lang] || '';
            const inheritsLabel = role.inherits ? (_state.roles[role.inherits]?.label?.[lang] || role.inherits) : '';

            return `
                <div onclick="UsersPage.showRoleDetails('${key}')" id="role-card-${key}" class="role-card p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition bg-white dark:bg-slate-800">
                    <div class="flex justify-between items-center mb-2">
                        <h4 class="font-bold text-sm text-slate-800 dark:text-white">${label}</h4>
                        <i class="fa-solid fa-chevron-${lang === 'ar' ? 'left' : 'right'} text-xs text-slate-400"></i>
                    </div>
                    <p class="text-[11px] text-slate-500 leading-snug">${desc}</p>
                    ${role.inherits ? `<p class="text-[10px] text-blue-500 mt-2"><i class="fa-solid fa-link"></i> ${trans.inherits} ${inheritsLabel}</p>` : ''}
                </div>
            `;
        }).join('');
    }

    function showRoleDetails(roleKey) {
        // Update active state
        document.querySelectorAll('.role-card').forEach(el => el.classList.remove('active'));
        document.getElementById(`role-card-${roleKey}`)?.classList.add('active');

        const role = _state.roles[roleKey];
        if (!role) return;

        const lang = _state.currentLang;
        const trans = t[lang];

        document.getElementById('roleDetailName').innerText = role.label?.[lang] || roleKey;
        document.getElementById('roleDetailDesc').innerText = role.desc?.[lang] || '';

        // Inheritance badge
        const badge = document.getElementById('roleInheritsBadge');
        if (role.inherits) {
            badge.classList.remove('hidden');
            document.getElementById('roleInheritsVal').innerText = _state.roles[role.inherits]?.label?.[lang] || role.inherits;
        } else {
            badge.classList.add('hidden');
        }

        // Permissions
        const permContainer = document.getElementById('permissionsContainer');
        permContainer.innerHTML = Object.values(_state.permissions).map(group => {
            const items = (group.items || []).map(perm => {
                const hasPerm = checkPermission(roleKey, perm.roles);
                return `
                    <div class="flex items-center justify-between p-3 border-b border-slate-50 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                        <span class="text-sm text-slate-700 dark:text-slate-300">${perm.label?.[lang] || perm.key}</span>
                        ${hasPerm 
                            ? '<i class="fa-solid fa-circle-check text-green-500 text-lg"></i>' 
                            : '<i class="fa-regular fa-circle text-slate-300 text-lg opacity-50"></i>'}
                    </div>
                `;
            }).join('');

            return `
                <div class="mb-4">
                    <h5 class="font-bold text-xs text-brandBlue mb-2 border-b-2 border-brandBlue/10 pb-1 inline-block">${group.title?.[lang] || ''}</h5>
                    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">${items}</div>
                </div>
            `;
        }).join('');
    }

    // ==========================================
    // HELPERS
    // ==========================================
    function getRoleLabel(key) {
        return _state.roles[key]?.label?.[_state.currentLang] || key;
    }

    function getDeptName(id) {
        const dept = _state.departments[id];
        return dept ? (dept[_state.currentLang] || dept.en || dept.ar) : id || 'General';
    }

    function getRoleColor(key) {
        if (key?.includes('admin')) return '#EF4444';
        if (key?.includes('ceo') || key?.includes('chair')) return '#3B82F6';
        if (key?.includes('manager')) return '#8B5CF6';
        if (key?.includes('shareholder')) return '#10B981';
        return '#64748B';
    }

    function checkPermission(currentRole, allowedRoles = []) {
        if (allowedRoles.includes(currentRole)) return true;
        let inherited = _state.roles[currentRole]?.inherits;
        while (inherited) {
            if (allowedRoles.includes(inherited)) return true;
            inherited = _state.roles[inherited]?.inherits;
        }
        return false;
    }

    function applyLanguage() {
        const trans = t[_state.currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (trans[key]) el.innerText = trans[key];
        });
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (trans[key]) el.placeholder = trans[key];
        });
    }

    function showLoadingState() {
        const tbody = document.getElementById('usersTableBody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin text-2xl"></i><p class="mt-2">${t[_state.currentLang].loading}</p></td></tr>`;
        }
    }

    function hideLoadingState() {
        // Already handled by renderUsers
    }

    function showErrorState() {
        const tbody = document.getElementById('usersTableBody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-red-500"><i class="fa-solid fa-exclamation-triangle text-2xl"></i><p class="mt-2">${t[_state.currentLang].errorLoad}</p></td></tr>`;
        }
    }

    // ==========================================
    // VIEW SWITCHING
    // ==========================================
    function switchView(view) {
        const usersView = document.getElementById('view-users');
        const rolesView = document.getElementById('view-roles');
        const toolbar = document.getElementById('userToolbar');
        const btnUsers = document.getElementById('btn-users');
        const btnRoles = document.getElementById('btn-roles');

        if (view === 'users') {
            usersView?.classList.remove('hidden');
            rolesView?.classList.add('hidden');
            toolbar?.classList.remove('hidden');
            btnUsers?.classList.add('bg-white', 'text-brandBlue', 'shadow-sm');
            btnUsers?.classList.remove('text-slate-500');
            btnRoles?.classList.remove('bg-white', 'text-brandBlue', 'shadow-sm');
            btnRoles?.classList.add('text-slate-500');
        } else {
            usersView?.classList.add('hidden');
            rolesView?.classList.remove('hidden');
            toolbar?.classList.add('hidden');
            btnRoles?.classList.add('bg-white', 'text-brandBlue', 'shadow-sm');
            btnRoles?.classList.remove('text-slate-500');
            btnUsers?.classList.remove('bg-white', 'text-brandBlue', 'shadow-sm');
            btnUsers?.classList.add('text-slate-500');
        }
    }

    // ==========================================
    // ACTIONS (Mock for now)
    // ==========================================
    function editUser(id) {
        const user = _state.allUsers.find(u => u.id === id);
        alert((_state.currentLang === 'ar' ? "تعديل: " : "Edit: ") + (user?.displayName || id));
    }

    function deleteUser(id) {
        const user = _state.allUsers.find(u => u.id === id);
        if (confirm((_state.currentLang === 'ar' ? "هل أنت متأكد من حذف " : "Are you sure you want to delete ") + (user?.displayName || id) + "?")) {
            alert(_state.currentLang === 'ar' ? "تم الحذف (محاكاة)" : "Deleted (mock)");
        }
    }

    // ==========================================
    // PUBLIC API
    // ==========================================
    return {
        init,
        renderUsers,
        switchView,
        showRoleDetails,
        editUser,
        deleteUser
    };
})();

// Make available globally
window.UsersPage = UsersPage;
