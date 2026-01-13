/**
 * AndroGov Authentication Engine v2.0
 * المصدر الوحيد للحقيقة: يقرأ البيانات من company_policy.json
 */

const AUTH_CONFIG = {
    policyPath: 'data/company_policy.json' // مسار الملف المركزي
};

class AuthSystem {
    constructor() {
        this.users = [];
        this.isReady = false;
    }

    // تهيئة النظام وجلب البيانات
    async init() {
        if (this.isReady) return;

        try {
            const response = await fetch(AUTH_CONFIG.policyPath);
            if (!response.ok) throw new Error("Could not load system policy");
            
            const data = await response.json();
            this.processUsers(data);
            this.isReady = true;
            console.log("✅ Auth System Ready: Loaded users from Central Repo");
        } catch (error) {
            console.error("❌ Auth Init Failed:", error);
        }
    }

    // دمج وتصنيف المستخدمين من مصادر مختلفة في الملف
    processUsers(data) {
        let combinedUsers = [];

        // 1. معالجة الموظفين وأعضاء المجلس (من users_directory)
        if (data.organizational_chart && data.organizational_chart.users_directory) {
            const employees = data.organizational_chart.users_directory.map(u => ({
                id: u.id,
                name: u.name || u.name_ar, // دعم اللغتين
                email: u.email,
                title: u.title || u.role,
                role: u.role, // الدور التقني
                type: this.determineUserType(u.role, u.title), // تصنيف للعرض
                avatarColor: this.getAvatarColor(u.role)
            }));
            combinedUsers = [...combinedUsers, ...employees];
        }

        // 2. معالجة المساهمين (من shareholders)
        if (data.shareholders) {
            const shareholders = data.shareholders.map(s => ({
                id: s.id,
                name: s.name,
                email: s.email,
                title: `مساهم (${s.percent}%)`,
                role: 'Shareholder',
                type: 'shareholder',
                avatarColor: 'fb4747'
            }));
            // إضافة المساهمين الذين ليسوا موظفين بالفعل (لتجنب التكرار إذا كان الموظف مساهماً)
            shareholders.forEach(sh => {
                if (!combinedUsers.find(u => u.email === sh.email)) {
                    combinedUsers.push(sh);
                }
            });
        }

        this.users = combinedUsers;
    }

    // خوارزمية تحديد نوع المستخدم للعرض في صفحة الدخول
    determineUserType(role, title) {
        const r = role.toLowerCase();
        const t = title.toLowerCase();

        if (r.includes('admin') || r.includes('grc')) return 'admin';
        if (r.includes('chairman') || t.includes('board') || t.includes('مجلس')) return 'board';
        if (r.includes('ceo') || r.includes('cfo') || r.includes('cao') || r.includes('director')) return 'exec';
        if (r.includes('audit')) return 'audit';
        if (r.includes('manager') || r.includes('lead') || r.includes('ncso')) return 'manager';
        return 'staff';
    }

    getAvatarColor(role) {
        // ألوان مميزة لكل دور
        const colors = {
            'admin': 'b91c1c', // Red
            'board': '1e293b', // Dark Slate
            'ceo': '4267B2',   // Blue
            'cfo': '7c3aed',   // Purple
            'audit': '059669', // Green
            'default': '64748b' // Gray
        };
        // بحث تقريبي عن اللون
        for (const key in colors) {
            if (role.toLowerCase().includes(key)) return colors[key];
        }
        return colors['default'];
    }

    // دالة تسجيل الدخول
    async login(email, password) {
        if (!this.isReady) await this.init();

        const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) throw new Error("المستخدم غير موجود");
        // في الوضع الحقيقي، هنا يتم التحقق من كلمة المرور المشفرة
        
        // حفظ الجلسة
        const session = {
            ...user,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(session));
        
        return this.getRedirectUrl(user.role);
    }

    getRedirectUrl(role) {
        const r = role.toLowerCase();
        if (r.includes('ceo') || r.includes('chairman')) return 'ceo/ceo_dashboard.html';
        if (r.includes('cfo') || r.includes('finance')) return 'finance/cfo_dashboard.html';
        if (r.includes('hr') || r.includes('cao')) return 'hr/hr_dashboard.html';
        if (r.includes('admin') || r.includes('grc')) return 'admin/admin.html';
        if (r.includes('tech') || r.includes('cto') || r.includes('ncso')) return 'cto/cto_dashboard.html';
        // الافتراضي لبقية الموظفين
        return 'employee/dashboard.html'; 
    }

    // دالة عامة لجلب المستخدمين لواجهة الدخول
    async getDemoUsers() {
        if (!this.isReady) await this.init();
        return this.users;
    }
}

// تصدير نسخة واحدة للنظام
window.authSystem = new AuthSystem();
