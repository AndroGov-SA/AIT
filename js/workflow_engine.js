/**
 * AndroGov Workflow Engine v1.0
 * محرك سير العمل الذكي: يقرأ من المستودع المركزي ويطبق قواعد الصلاحيات
 */

class WorkflowSystem {
    constructor() {
        this.policyData = null;
        this.isReady = false;
        // تعريف التسلسل الهرمي للأدوار للمقارنة
        this.roleHierarchy = {
            'Employee': 0,
            'Coordinator': 1,
            'Specialist': 1,
            'Team_Lead': 2,
            'Manager': 3,
            'Director': 4,
            'CFO': 5,
            'CAO': 5,
            'GRCO': 5,
            'CEO': 6,
            'Chairman': 7,
            'Board': 8
        };
    }

    // تهيئة المحرك وجلب البيانات
    async init() {
        if (this.isReady) return true;
        
        try {
            const response = await fetch('../data/company_policy.json');
            if (!response.ok) throw new Error("Could not load policy data");
            
            this.policyData = await response.json();
            this.isReady = true;
            console.log("✅ Workflow Engine Ready");
            return true;
        } catch (error) {
            console.error("❌ Workflow Init Failed:", error);
            return false;
        }
    }

    /**
     * تحديد المعتمد التالي للمعاملات المالية
     * @param {string} type - نوع المعاملة (PO_Approval, Petty_Cash)
     * @param {number} amount - المبلغ
     * @param {boolean} isBudgeted - هل هي ضمن الموازنة؟ (افتراضي: نعم)
     * @returns {Object} - { role: 'CFO', action: 'Approve' }
     */
    async getNextApprover(type, amount, isBudgeted = true) {
        await this.init();

        const matrix = this.policyData.authority_matrix.financial_authority;
        const rule = matrix.find(r => r.transaction_type === type);

        if (!rule) {
            console.warn(`No rule found for transaction type: ${type}`);
            return { role: 'CEO', reason: 'No Rule Defined' }; // Fallback
        }

        // التكرار عبر المستويات للعثور على أول مستوى يغطي المبلغ
        for (const level of rule.levels) {
            // 1. تحقق من شرط الموازنة (إذا وجد)
            if (level.condition && level.condition.includes("Unbudgeted") && !isBudgeted) {
                // إذا كانت غير مجدولة في الميزانية، تتطلب مستوى أعلى عادة (مثل المجلس)
                if (level.role === 'Board') return level;
                continue; 
            }

            // 2. تحقق من حدود المبلغ (-1 تعني بلا حد)
            if (level.limit === -1 || amount <= level.limit) {
                return level; // وجدنا المعتمد المناسب
            }
        }

        return { role: 'Board', reason: 'Exceeds All Limits' };
    }

    /**
     * التحقق من الصلاحيات الإدارية والقانونية
     * @param {string} actionCode - كود الإجراء (مثل LEG_001)
     * @returns {Object} - تفاصيل الصلاحية ومن يملكها
     */
    async getAdminPower(actionCode) {
        await this.init();
        
        const powers = this.policyData.authority_matrix.legal_and_admin_powers.powers;
        const power = powers.find(p => p.code === actionCode);

        if (!power) return null;

        return {
            roles: power.authorized_roles, // المصفوفة ["CEO", "Vice_Chairman"]
            type: power.execution_type, // "Solo" or "Joint"
            requiresBoard: power.requires_board_resolution || false
        };
    }

    /**
     * دالة مساعدة: هل المستخدم الحالي يملك صلاحية كافية؟
     * @param {string} userRole - دور المستخدم الحالي
     * @param {string} requiredRole - الدور المطلوب
     */
    isUserAuthorized(userRole, requiredRole) {
        // إذا كان الدور المطلوب هو نفسه دور المستخدم
        if (userRole === requiredRole) return true;

        // أو إذا كان المستخدم أعلى رتبة في الهرم الوظيفي
        const userLevel = this.roleHierarchy[userRole] || 0;
        const requiredLevel = this.roleHierarchy[requiredRole] || 99;

        return userLevel >= requiredLevel;
    }
}

// إتاحة المحرك للاستخدام العام في أي صفحة
window.workflowEngine = new WorkflowSystem();
