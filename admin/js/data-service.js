/**
 * AndroGov Data Service v1.0
 * خدمة مركزية لجلب وإدارة البيانات من company_policy.js
 * @description Fetches data from GitHub repository and provides unified API
 */

const DataService = (function() {
    // GitHub Raw URL for company_policy.js
    const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/androgov-sa/AIT/main/data';
    
    // Cache for loaded data
    let _cache = {
        companyPolicy: null,
        shareholders: null,
        lastFetch: null
    };

    // Cache duration: 5 minutes
    const CACHE_DURATION = 5 * 60 * 1000;

    /**
     * Fetch company policy from GitHub
     */
    async function fetchCompanyPolicy() {
        // Check cache first
        if (_cache.companyPolicy && _cache.lastFetch && 
            (Date.now() - _cache.lastFetch) < CACHE_DURATION) {
            return _cache.companyPolicy;
        }

        try {
            // Try fetching from GitHub
            const response = await fetch(`${GITHUB_BASE_URL}/company_policy.js`);
            if (!response.ok) throw new Error('GitHub fetch failed');
            
            const text = await response.text();
            // Parse the module.exports object
            const data = parseModuleExports(text);
            
            _cache.companyPolicy = data;
            _cache.lastFetch = Date.now();
            
            console.log('✅ Data loaded from GitHub');
            return data;
        } catch (error) {
            console.warn('⚠️ GitHub fetch failed, using fallback data:', error);
            return getFallbackData();
        }
    }

    /**
     * Parse module.exports from JS file content
     */
    function parseModuleExports(jsContent) {
        try {
            // Remove module.exports = and trailing semicolon
            let cleaned = jsContent
                .replace(/module\.exports\s*=\s*/, '')
                .replace(/;\s*$/, '');
            
            // Use Function constructor to safely evaluate
            const fn = new Function(`return ${cleaned}`);
            return fn();
        } catch (e) {
            console.error('Parse error:', e);
            return null;
        }
    }

    /**
     * Fallback data when GitHub is unavailable
     */
    function getFallbackData() {
        return {
            governance: {
                shareholders: [
                    { id: "SH_001", name: { ar: "ورثة محمد بن صالح السحيباني", en: "Heirs of Mohammed Al-Suhaibani" }, percent: 35, email: "alcaseer@gmail.com" },
                    { id: "SH_002", name: { ar: "هشام بن محمد السحيباني", en: "Hesham bin Muhammad Al-Sohibani" }, percent: 10, email: "Hesham@androomeda.com" },
                    { id: "SH_010", name: { ar: "شركة بيجي المحدودة", en: "BG LTD.Company" }, percent: 15, email: "saleh@bgtech.com" }
                ],
                users_directory: [
                    { id: "USR_000", name: { ar: "عبدالله الحواس", en: "Abdullah Al-Hawas" }, title: { ar: "رئيس مجلس الإدارة", en: "Chairman" }, department_id: "DEP_EXEC", role: "chairman", email: "amh400@gmail.com" },
                    { id: "USR_001", name: { ar: "هشام السحيباني", en: "Hesham Al-Sohaibani" }, title: { ar: "الرئيس التنفيذي", en: "CEO" }, department_id: "DEP_EXEC", role: "ceo", email: "hesham@androomeda.com" },
                    { id: "USR_004", name: { ar: "أيمن المغربي", en: "Ayman Al-Maghrabi" }, title: { ar: "مسؤول الحوكمة", en: "GRCO" }, department_id: "DEP_COMP", role: "manager", email: "amaghrabi@androomeda.com" }
                ]
            },
            organization: {
                departments: [
                    { id: "DEP_EXEC", name: { en: "Executive Management", ar: "الإدارة التنفيذية" } },
                    { id: "DEP_FIN", name: { en: "Finance", ar: "الإدارة المالية" } },
                    { id: "DEP_TECH", name: { en: "Technology", ar: "التقنية والتطوير" } },
                    { id: "DEP_COMP", name: { en: "Governance & Compliance", ar: "الحوكمة والالتزام" } }
                ]
            },
            access_control: {
                roles: {
                    sys_admin: { label: { ar: "مدير النظام", en: "System Admin" }, desc: { ar: "صلاحيات تقنية كاملة", en: "Full IT privileges" }, inherits: "chairman" },
                    chairman: { label: { ar: "رئيس مجلس الإدارة", en: "Chairman" }, desc: { ar: "صلاحيات التوقيع المنفرد", en: "Sole signatory" }, inherits: "board_member" },
                    ceo: { label: { ar: "الرئيس التنفيذي", en: "CEO" }, desc: { ar: "إدارة تنفيذية", en: "Executive management" }, inherits: "cfo" },
                    cfo: { label: { ar: "المدير المالي", en: "CFO" }, desc: { ar: "صلاحيات مالية", en: "Financial authority" }, inherits: "manager" },
                    manager: { label: { ar: "مدير إدارة", en: "Manager" }, desc: { ar: "إدارة الفريق", en: "Team management" }, inherits: "employee" },
                    employee: { label: { ar: "موظف", en: "Employee" }, desc: { ar: "خدمة ذاتية", en: "Self-service" }, inherits: "viewer" },
                    shareholder: { label: { ar: "مساهم", en: "Shareholder" }, desc: { ar: "اطلاع وتصويت", en: "View & vote" }, inherits: "viewer" },
                    viewer: { label: { ar: "زائر", en: "Viewer" }, desc: { ar: "قراءة فقط", en: "Read-only" }, inherits: null }
                },
                permissions: {
                    financial: {
                        title: { ar: "الصلاحيات المالية", en: "Financial Permissions" },
                        items: [
                            { key: "approve_po", label: { ar: "اعتماد أوامر الشراء", en: "Approve POs" }, roles: ["ceo", "cfo", "manager"] },
                            { key: "approve_payroll", label: { ar: "اعتماد الرواتب", en: "Approve Payroll" }, roles: ["ceo", "cfo"] },
                            { key: "view_financials", label: { ar: "الاطلاع على القوائم المالية", en: "View Financials" }, roles: ["chairman", "board_member", "shareholder", "ceo", "cfo"] }
                        ]
                    },
                    legal: {
                        title: { ar: "الشؤون القانونية", en: "Legal Affairs" },
                        items: [
                            { key: "sign_contracts", label: { ar: "توقيع العقود", en: "Sign Contracts" }, roles: ["chairman", "ceo"] },
                            { key: "govt_rep", label: { ar: "التمثيل الحكومي", en: "Gov Representation" }, roles: ["ceo", "chairman", "manager"] }
                        ]
                    }
                }
            }
        };
    }

    // ==========================================
    // PUBLIC API
    // ==========================================
    
    return {
        /**
         * Get all users (employees + shareholders)
         */
        async getUsers() {
            const data = await fetchCompanyPolicy();
            const users = data?.governance?.users_directory || data?.organization?.key_personnel || [];
            return users.map(u => ({
                ...u,
                name: typeof u.name === 'string' ? { ar: u.name, en: u.name } : u.name,
                title: typeof u.title === 'string' ? { ar: u.title, en: u.title } : u.title,
                role_ref: u.role_ref || u.role || 'employee',
                dept: u.dept || u.department_id
            }));
        },

        /**
         * Get shareholders list
         */
        async getShareholders() {
            const data = await fetchCompanyPolicy();
            return data?.governance?.shareholders || [];
        },

        /**
         * Get departments
         */
        async getDepartments() {
            const data = await fetchCompanyPolicy();
            const depts = data?.organization?.departments || [];
            // Convert array to object for easier lookup
            const deptMap = {};
            depts.forEach(d => {
                deptMap[d.id] = d.name;
            });
            return deptMap;
        },

        /**
         * Get roles definitions
         */
        async getRoles() {
            const data = await fetchCompanyPolicy();
            return data?.access_control?.roles || {};
        },

        /**
         * Get permissions matrix
         */
        async getPermissions() {
            const data = await fetchCompanyPolicy();
            return data?.access_control?.permissions || {};
        },

        /**
         * Get full company policy (for advanced use)
         */
        async getFullPolicy() {
            return await fetchCompanyPolicy();
        },

        /**
         * Clear cache (force refresh)
         */
        clearCache() {
            _cache = { companyPolicy: null, shareholders: null, lastFetch: null };
            console.log('🔄 Cache cleared');
        }
    };
})();

// Make available globally
window.DataService = DataService;
