/**
 * AndroGov Authentication Engine v4.0 (Multi-Role Support)
 * مصحح: تم إصلاح مشكلة التوجيه (Redirection Bug)
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
                console.error("Critical Error: POLICY_DATA is not defined.");
                alert("خطأ في النظام: ملف البيانات غير موجود.");
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

        if (data.organizational_chart && data.organizational_chart.users_directory) {
            rawUsers = data.organizational_chart.users_directory;
        }
        if (data.shareholders) {
            shareholders = data.shareholders;
        }

        this.users = rawUsers.map(u => {
            let roles = [];
            let email = u.email ? u.email.toLowerCase().trim() : '';
            let name = u.name || u.name_ar;

            // 1. Admin & GRC
            if (u.role.toLowerCase() === 'admin' || u.role.toLowerCase().includes('grc')) {
                roles.push('admin');
            }
            
            // 2. Executive (CEO, CFO, etc)
            if (u.is_executive || u.role.toLowerCase().includes('ceo') || u.role.toLowerCase().includes('cfo')) {
                roles.push('exec');
            }

            // 3. Board Members & Secretary
            if (u.role.toLowerCase().includes('chairman') || 
                u.role.toLowerCase().includes('board') || 
                (u.title && u.title.toLowerCase().includes('secretary'))) {
                roles.push('board');
            }

            // 4. Audit Committee
            if (data.governance_config && data.governance_config.committees) {
                const audit = data.governance_config.committees.Audit;
                if (audit) {
                    const isMember = audit.members && audit.members.some(m => m.includes(name));
                    const isSec = audit.secretary && audit.secretary.includes(name);
                    if (isMember || isSec) {
                        if (!roles.includes('audit')) roles.push('audit');
                    }
                }
            }

            // 5. Shareholders
            const isShareholder = shareholders.find(s => s.email && s.email.toLowerCase() === email);
            if (isShareholder) roles.push('shareholder');

            // 6. Staff (Default)
            if (roles.length === 0) roles.push('staff');

            return {
                id: u.id,
                name: name,
                email: email,
                title: u.title,
                role: u.role,          // <--- (تمت الإضافة) ضروري للحفاظ على البيانات الأصلية
                primaryRole: roles[0], // الدور الأساسي للدخول
                accessLevels: roles,   // كافة الصلاحيات
                avatarColor: this.getAvatarColor(u.role)
            };
        }).filter(u => u.email !== '');

        // إضافة المساهمين من خارج الشركة
        shareholders.forEach(s => {
            const email = s.email ? s.email.toLowerCase().trim() : '';
            if (!this.users.find(u => u.email === email)) {
                this.users.push({
                    id: s.id,
                    name: s.name,
                    email: email,
                    title: `مساهم (${s.percent}%)`,
                    role: 'Shareholder',
                    primaryRole: 'shareholder',
                    accessLevels: ['shareholder'],
                    avatarColor: '#fb4747'
                });
            }
        });
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
        
        // (تصحيح) استخدام الدور الأساسي المحسوب للتوجيه
        return this.getRedirectUrl(user.primaryRole);
    }

    // تم تحديث الروابط لتتوافق مع الرموز الجديدة (admin, board, exec...)
    getRedirectUrl(role) {
        const r = String(role).toLowerCase();
        
        if (r === 'admin') return 'admin/admin.html';
        if (r === 'board') return 'admin/board.html'; // أو ceo_board.html حسب رغبتك
        if (r === 'exec') return 'ceo/ceo_dashboard.html';
        if (r === 'audit') return 'admin/audit.html'; // تأكد من وجود هذا الملف
        if (r === 'shareholder') return 'shareholder/dashboard.html';
        
        // التوجيهات القديمة احتياطاً
        if (r.includes('ceo')) return 'ceo/ceo_dashboard.html';
        if (r.includes('finance')) return 'finance/cfo_dashboard.html';
        if (r.includes('hr')) return 'hr/hr_dashboard.html';
        if (r.includes('tech')) return 'cto/cto_dashboard.html';
        
        return 'employee/dashboard.html'; // الافتراضي
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
