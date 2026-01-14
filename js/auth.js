/**
 * AndroGov Authentication Engine v4.2 (Fixed Demo Display)
 * - تم إصلاح مشكلة اختفاء حسابات الدخول السريع (Demo Users)
 * - يدعم تعدد الصلاحيات (Admin + Board + Audit)
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
                // لا نعرض تنبيه هنا لعدم إزعاج المستخدم، التنبيه موجود في login.html
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

        // جلب البيانات
        if (data.organizational_chart && data.organizational_chart.users_directory) {
            rawUsers = data.organizational_chart.users_directory;
        }
        if (data.shareholders) {
            shareholders = data.shareholders;
        }

        this.users = rawUsers.map(u => {
            let roles = [];
            let email = u.email ? u.email.toLowerCase().trim() : '';
            let name = u.name || u.name_ar || 'Unknown';
            let roleRaw = u.role ? String(u.role).toLowerCase() : '';
            let titleRaw = u.title ? String(u.title).toLowerCase() : '';

            // 1. كشف الصلاحيات (Admin, Exec, Board...)
            if (roleRaw === 'admin' || roleRaw.includes('grc')) roles.push('admin');
            if (u.is_executive || roleRaw.includes('ceo') || roleRaw.includes('cfo')) roles.push('exec');
            if (roleRaw.includes('chairman') || roleRaw.includes('board') || titleRaw.includes('secretary')) roles.push('board');

            // 2. كشف لجنة المراجعة
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

            // 3. كشف المساهمين
            const isShareholder = shareholders.find(s => s.email && s.email.toLowerCase() === email);
            if (isShareholder) roles.push('shareholder');

            // 4. الافتراضي
            if (roles.length === 0) roles.push('staff');

            return {
                id: u.id,
                name: name,
                email: email,
                title: u.title,
                role: u.role,          
                
                // --- الإصلاح هنا: إعادة خاصية type ليفهمها login.html ---
                type: roles[0],        
                // -------------------------------------------------------

                primaryRole: roles[0], // للدخول
                accessLevels: roles,   // للتبديل
                avatarColor: this.getAvatarColor(u.role)
            };
        }).filter(u => u.email !== '');

        // إضافة المساهمين الأفراد
        shareholders.forEach(s => {
            const email = s.email ? s.email.toLowerCase().trim() : '';
            if (!this.users.find(u => u.email === email)) {
                this.users.push({
                    id: s.id,
                    name: s.name,
                    email: email,
                    title: `مساهم (${s.percent}%)`,
                    type: 'shareholder', // هام للعرض
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
        return this.getRedirectUrl(user.primaryRole);
    }

    getRedirectUrl(role) {
        const r = String(role || '').toLowerCase();
        if (r === 'admin') return 'admin/admin.html';
        if (r === 'board') return 'admin/board.html';
        if (r === 'exec') return 'ceo/ceo_dashboard.html';
        if (r === 'audit') return 'audit.html'; 
        if (r === 'shareholder') return 'shareholder/dashboard.html';
        return 'employee/dashboard.html';
    }

    async getDemoUsers() {
        if (!this.isReady) await this.init();
        return this.users;
    }
}

window.authSystem = new AuthSystem();

// دالة الدخول
window.handleLogin = async (e) => {
    e.preventDefault();
    const btn = document.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    if(btn) {
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري التحقق...';
        btn.disabled = true;
    }
    
    const errorMsg = document.getElementById('errorMsg');
    if(errorMsg) errorMsg.classList.add('hidden');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const redirect = await window.authSystem.login(email, password);
        window.location.href = redirect;
    } catch (err) {
        if(document.getElementById('errorText')) document.getElementById('errorText').innerText = err.message;
        if(errorMsg) errorMsg.classList.remove('hidden');
        if(btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }
};
