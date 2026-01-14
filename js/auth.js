/**
 * AndroGov Authentication Engine v4.1 (Safe Mode)
 * - يدعم تعدد الصلاحيات (Admin + Board + Audit)
 * - محمي ضد الأخطاء إذا كانت البيانات ناقصة
 */

class AuthSystem {
    constructor() {
        this.users = [];
        this.isReady = false;
    }

    async init() {
        if (this.isReady) return;

        try {
            // التحقق من وجود البيانات
            if (typeof POLICY_DATA === 'undefined') {
                console.error("Critical Error: POLICY_DATA is not defined.");
                alert("خطأ في النظام: ملف البيانات غير موجود أو فيه خطأ.");
                return;
            }

            console.log("✅ تم تحميل البيانات بنجاح");
            this.processUsers(POLICY_DATA);
            this.isReady = true;

        } catch (error) {
            console.error("Auth Init Error:", error);
        }
    }

    processUsers(data) {
        let rawUsers = [];
        let shareholders = [];

        // جلب البيانات بأمان
        if (data.organizational_chart && data.organizational_chart.users_directory) {
            rawUsers = data.organizational_chart.users_directory;
        }
        if (data.shareholders) {
            shareholders = data.shareholders;
        }

        // معالجة الموظفين
        this.users = rawUsers.map(u => {
            let roles = [];
            // تنظيف البيانات لتجنب الأخطاء
            let email = u.email ? u.email.toLowerCase().trim() : '';
            let name = u.name || u.name_ar || 'Unknown';
            let roleRaw = u.role ? String(u.role).toLowerCase() : ''; // حماية ضد null
            let titleRaw = u.title ? String(u.title).toLowerCase() : '';

            // 1. كشف صلاحيات الأدمن والتنفيذيين
            if (roleRaw === 'admin' || roleRaw.includes('grc')) {
                roles.push('admin');
            }
            if (u.is_executive || roleRaw.includes('ceo') || roleRaw.includes('cfo')) {
                roles.push('exec');
            }

            // 2. كشف صلاحيات المجلس (الرئيس، الأعضاء، وأمين السر)
            if (roleRaw.includes('chairman') || roleRaw.includes('board') || titleRaw.includes('secretary')) {
                roles.push('board');
            }

            // 3. كشف صلاحيات لجنة المراجعة (من خلال البحث في القوائم)
            if (data.governance_config && data.governance_config.committees) {
                const audit = data.governance_config.committees.Audit;
                if (audit) {
                    // هل الاسم موجود في قائمة الأعضاء أو هو أمين السر؟
                    const isMember = audit.members && audit.members.some(m => m.includes(name));
                    const isSec = audit.secretary && audit.secretary.includes(name);
                    
                    if (isMember || isSec) {
                        if (!roles.includes('audit')) roles.push('audit');
                    }
                }
            }

            // 4. كشف المساهمين (من خلال الإيميل)
            const isShareholder = shareholders.find(s => s.email && s.email.toLowerCase() === email);
            if (isShareholder) roles.push('shareholder');

            // 5. الموظف العادي (إذا لم يكن لديه أي دور مما سبق)
            if (roles.length === 0) roles.push('staff');

            return {
                id: u.id,
                name: name,
                email: email,
                title: u.title,
                role: u.role,          // الدور الأصلي (مهم جداً)
                primaryRole: roles[0], // الدور الأساسي للدخول
                accessLevels: roles,   // قائمة بكل الصلاحيات
                avatarColor: this.getAvatarColor(u.role)
            };
        }).filter(u => u.email !== '');

        // إضافة المساهمين من خارج الشركة (الذين ليس لديهم حساب موظف)
        shareholders.forEach(s => {
            const email = s.email ? s.email.toLowerCase().trim() : '';
            // إذا لم يكن موجوداً مسبقاً
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
        // كلمة مرور موحدة للتجربة
        const demoPass = "12345678";

        const user = this.users.find(u => u.email === cleanEmail);
        
        if (!user) throw new Error("المستخدم غير موجود");
        if (password !== demoPass) throw new Error("كلمة المرور غير صحيحة");

        // حفظ المستخدم في الذاكرة
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // التوجيه حسب الدور الأساسي
        return this.getRedirectUrl(user.primaryRole);
    }

    getRedirectUrl(role) {
        // تنظيف الدور (تحويله لنص صغير)
        const r = String(role || '').toLowerCase();
        
        if (r === 'admin') return 'admin/admin.html';
        if (r === 'board') return 'admin/board.html';
        if (r === 'exec') return 'ceo/ceo_dashboard.html';
        if (r === 'audit') return 'audit.html'; // تأكد أن الملف audit.html موجود في الجذر أو عدل المسار
        if (r === 'shareholder') return 'shareholder/dashboard.html';
        
        // التوجيه الافتراضي للموظفين
        return 'employee/dashboard.html';
    }

    async getDemoUsers() {
        if (!this.isReady) await this.init();
        return this.users;
    }
}

// تهيئة النظام
window.authSystem = new AuthSystem();

// دالة الدخول (يتم استدعاؤها من login.html)
window.handleLogin = async (e) => {
    e.preventDefault();
    const btn = document.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // إظهار حالة التحميل
    if(btn) {
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري التحقق...';
        btn.disabled = true;
    }
    
    const errorMsg = document.getElementById('errorMsg');
    if(errorMsg) errorMsg.classList.add('hidden');

    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');

    if(!emailInput || !passInput) {
        console.error("Login inputs not found!");
        return;
    }

    try {
        const redirect = await window.authSystem.login(emailInput.value, passInput.value);
        console.log("Redirecting to:", redirect); // للمساعدة في اكتشاف الأخطاء
        window.location.href = redirect;
    } catch (err) {
        console.error(err);
        if(document.getElementById('errorText')) {
            document.getElementById('errorText').innerText = err.message;
        }
        if(errorMsg) errorMsg.classList.remove('hidden');
        
        if(btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }
};
