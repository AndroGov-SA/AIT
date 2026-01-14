/**
 * AndroGov Authentication Engine v3.5 (No-Server Mode)
 * يعتمد على متغير POLICY_DATA المحمل مسبقاً في الصفحة.
 */

class AuthSystem {
    constructor() {
        this.users = [];
        this.isReady = false;
    }

    async init() {
        if (this.isReady) return;

        try {
            if (typeof POLICY_DATA === 'undefined') {
                console.error("Critical Error: POLICY_DATA is not defined. Check company_policy.js");
                alert("خطأ في النظام: لم يتم تحميل ملف البيانات (company_policy.js).\nتأكد من وجود الملف في مجلد data وعدم وجود أخطاء برمجية فيه.");
                return;
            }

            console.log("✅ Data Source Loaded Successfully");
            this.processUsers(POLICY_DATA);
            this.isReady = true;

        } catch (error) {
            console.error("Auth Init Error:", error);
        }
    }

    processUsers(data) {
        let rawUsers = [];
        let shareholders = [];

        // 1. الموظفين
        if (data.organizational_chart && data.organizational_chart.users_directory) {
            rawUsers = data.organizational_chart.users_directory;
        }

        // 2. المساهمين
        if (data.shareholders) {
            shareholders = data.shareholders;
        }

        // تجهيز قائمة المستخدمين مع كشف جميع الصلاحيات
        this.users = rawUsers.map(u => {
            // التحقق من الأدوار المتعددة
            let roles = [];
            let email = u.email ? u.email.toLowerCase().trim() : '';

            // 1. هل هو مساهم؟ (مطابقة بالإيميل)
            const isShareholder = shareholders.find(s => s.email && s.email.toLowerCase() === email);
            if (isShareholder) roles.push('shareholder');

            // 2. هل هو عضو مجلس؟
            if (u.role.toLowerCase().includes('chairman') || u.role.toLowerCase().includes('board') || (u.title && u.title.includes('مجلس'))) {
                roles.push('board');
            }

            // 3. هل هو تنفيذي؟
            if (u.is_executive || u.role.toLowerCase().includes('ceo') || u.role.toLowerCase().includes('cfo')) {
                roles.push('exec');
            }

            // 4. هل هو لجنة مراجعة؟
            if (u.role.toLowerCase().includes('audit') || (u.title && u.title.includes('Audit'))) {
                roles.push('audit');
            }

            // 5. هل هو أدمن؟
            if (u.role.toLowerCase() === 'admin' || u.id === 'USR_004') { // أيمن المغربي
                roles.push('admin');
            }

            // إذا لم يكن لديه أي دور خاص، فهو موظف
            if (roles.length === 0) roles.push('staff');

            return {
                id: u.id,
                name: u.name || u.name_ar,
                email: email,
                title: u.title,
                primaryRole: roles[0], // الدور الافتراضي للدخول
                accessLevels: roles,   // قائمة كل الصلاحيات
                avatarColor: this.getAvatarColor(u.role)
            };
        }).filter(u => u.email !== '');

        // إضافة المساهمين الذين ليسوا موظفين (مثل ورثة السحيباني)
        shareholders.forEach(s => {
            const email = s.email ? s.email.toLowerCase().trim() : '';
            // إذا لم يكن موجوداً مسبقاً في القائمة (كموظف)
            if (!this.users.find(u => u.email === email)) {
                this.users.push({
                    id: s.id,
                    name: s.name,
                    email: email,
                    title: `مساهم (${s.percent}%)`,
                    primaryRole: 'shareholder',
                    accessLevels: ['shareholder'],
                    avatarColor: '#fb4747'
                });
            }
        });
    }

    determineUserType(role, manualType, title) {
        if (manualType) return manualType;
        const r = String(role || '').toLowerCase();
        const t = String(title || '').toLowerCase();

        if (r.includes('admin') || r.includes('grc')) return 'admin';
        if (r.includes('chairman') || r.includes('board') || t.includes('مجلس')) return 'board';
        if (r.includes('ceo') || r.includes('cfo') || r.includes('cao') || r.includes('director')) return 'exec';
        if (r.includes('shareholder')) return 'shareholder';
        if (r.includes('audit')) return 'audit';
        if (r.includes('manager')) return 'manager';
        return 'staff';
    }

    getAvatarColor(role) {
        const r = String(role || '').toLowerCase();
        if (r.includes('admin')) return 'b91c1c';
        if (r.includes('ceo') || r.includes('chairman')) return '4267B2';
        if (r.includes('shareholder')) return 'fb4747';
        return '64748b';
    }

    async login(email, password) {
        if (!this.isReady) await this.init();

        const cleanEmail = email.trim().toLowerCase();
        const demoPass = "12345678";

        const user = this.users.find(u => u.email === cleanEmail);
        
        if (!user) throw new Error("المستخدم غير موجود");
        if (password !== demoPass) throw new Error("كلمة المرور غير صحيحة");

        localStorage.setItem('currentUser', JSON.stringify(user));
        return this.getRedirectUrl(user.role);
    }

    getRedirectUrl(role) {
        const r = String(role).toLowerCase();
        if (r.includes('admin')) return 'admin/admin.html';
        if (r.includes('ceo')) return 'ceo/ceo_dashboard.html';
        if (r.includes('cfo') || r.includes('finance')) return 'finance/cfo_dashboard.html';
        if (r.includes('hr') || r.includes('cao')) return 'hr/hr_dashboard.html';
        if (r.includes('tech') || r.includes('cto')) return 'cto/cto_dashboard.html';
        if (r.includes('shareholder')) return 'shareholder/dashboard.html'; // بوابة المساهمين
        return 'employee/dashboard.html'; // بوابة الموظفين
    }

    async getDemoUsers() {
        if (!this.isReady) await this.init();
        return this.users;
    }
}

window.authSystem = new AuthSystem();

window.handleLogin = async (e) => {
    e.preventDefault();
    const btn = document.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري التحقق...';
    btn.disabled = true;
    document.getElementById('errorMsg').classList.add('hidden');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const redirect = await window.authSystem.login(email, password);
        window.location.href = redirect;
    } catch (err) {
        document.getElementById('errorText').innerText = err.message;
        document.getElementById('errorMsg').classList.remove('hidden');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};
