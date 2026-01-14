/**
 * AndroGov Authentication Engine v4.4 (Aligned with Policy v4.1.0)
 * - يدعم هيكلية البيانات الجديدة (Organization & Governance Schema)
 * - معالجة الأسماء ثنائية اللغة
 * - دعم role_ref
 */

class AuthSystem {
    constructor() {
        this.users = [];
        this.isReady = false;
    }

    async init() {
        if (this.isReady) return;

        try {
            // محاولة العثور على البيانات سواء كانت Global Variable أو Module
            let data = null;
            if (typeof POLICY_DATA !== 'undefined') {
                data = POLICY_DATA;
            } else if (typeof module !== 'undefined' && module.exports) {
                // في حال استخدام CommonJS في بيئة المتصفح (يتطلب إعداد خاص)
                // هنا نفترض وجود متغير عالمي تم حقنه
                console.warn("POLICY_DATA not found globally, checking context...");
            }

            if (!data) {
                console.error("Critical Error: System Data is missing.");
                return;
            }

            this.processUsers(data);
            this.isReady = true;
            console.log(`✅ System Ready: Loaded ${this.users.length} users.`);

        } catch (error) {
            console.error("Auth Init Error:", error);
        }
    }

    processUsers(data) {
        let rawUsers = [];
        let shareholders = [];

        // 1. جلب الموظفين (دعم الإصدار الجديد v4.1.0 والقديم)
        if (data.organization && data.organization.key_personnel) {
            rawUsers = data.organization.key_personnel;
        } else if (data.organizational_chart && data.organizational_chart.users_directory) {
            rawUsers = data.organizational_chart.users_directory;
        }

        // 2. جلب المساهمين (دعم الإصدار الجديد v4.1.0 والقديم)
        if (data.governance && data.governance.shareholders) {
            shareholders = data.governance.shareholders;
        } else if (data.shareholders) {
            shareholders = data.shareholders;
        }

        // 3. معالجة بيانات الموظفين
        this.users = rawUsers.map(u => {
            let roles = [];
            // التعامل مع اختلاف الحقول بين الإصدارات (role vs role_ref)
            let roleRaw = String(u.role_ref || u.role || '').toLowerCase();
            let titleRaw = String(u.title || '').toLowerCase();
            let email = u.email ? u.email.toLowerCase().trim() : '';
            // التعامل مع الاسم (قد يكون كائن في الإصدار الجديد للمساهمين، لكن الموظفين عادة string)
            let name = typeof u.name === 'object' ? (u.name.ar || u.name.en) : (u.name || 'Unknown');
            
            // --- أ. تحديد الأدوار للصلاحيات (Access Levels) ---
            
            // 1. Admin / System Admin
            if (roleRaw === 'sys_admin' || roleRaw === 'admin' || roleRaw.includes('grc')) roles.push('admin');
            
            // 2. Executive (C-Level)
            if (u.is_executive || roleRaw.includes('ceo') || roleRaw.includes('cfo') || roleRaw.includes('cao')) roles.push('exec');
            
            // 3. Board Members
            if (roleRaw.includes('chairman') || roleRaw.includes('board') || titleRaw.includes('secretary')) roles.push('board');

            // 4. Audit Committee (من الهيكل الجديد)
            // في v4.1.0 اللجنة معرفة داخل governance.config أو يمكن استنتاجها من role_ref إذا كان هناك دور خاص
            if (titleRaw.includes('audit committee')) roles.push('audit');

            // 5. Shareholder (Link by Email or ID)
            const isShareholder = shareholders.find(s => 
                (s.email && s.email.toLowerCase() === email) || 
                (s.id === u.id)
            );
            if (isShareholder || u.additional_roles?.includes('shareholder')) {
                roles.push('shareholder');
            }

            // --- ب. تحديد "نوع العرض" (Display Type) ---
            let displayType = 'staff';

            if (roles.includes('admin')) displayType = 'admin';
            else if (roles.includes('board')) displayType = 'board';
            else if (roles.includes('shareholder') && roles.length === 1) displayType = 'shareholder'; // مساهم فقط
            else if (roles.includes('exec')) displayType = 'exec';
            else if (roles.includes('audit')) displayType = 'audit';
            else if (roleRaw.includes('manager') || roleRaw.includes('director') || roleRaw.includes('head')) displayType = 'manager';
            else displayType = 'staff';

            if (roles.length === 0) roles.push(displayType);

            return {
                id: u.id,
                name: name,
                email: email,
                title: u.title,
                role: roleRaw, // Internal role ref
                
                type: displayType,
                primaryRole: roles[0],
                accessLevels: roles,
                avatarColor: this.getAvatarColor(roleRaw)
            };
        }).filter(u => u.email !== '');

        // 4. إضافة المساهمين (الذين ليسوا موظفين)
        shareholders.forEach(s => {
            const email = s.email ? s.email.toLowerCase().trim() : '';
            // التحقق من عدم وجوده مسبقاً في قائمة المستخدمين
            if (!this.users.find(u => u.email === email || u.id === s.id)) {
                // استخراج الاسم من الكائن ثنائي اللغة
                const sName = typeof s.name === 'object' ? s.name.ar : s.name;
                
                this.users.push({
                    id: s.id,
                    name: sName,
                    email: email,
                    title: `مساهم (${s.percent}%)`,
                    type: 'shareholder',
                    role: 'shareholder',
                    primaryRole: 'shareholder',
                    accessLevels: ['shareholder'],
                    avatarColor: '#fb4747'
                });
            }
        });
    }

    getAvatarColor(role) {
        const r = String(role || '').toLowerCase();
        if (r.includes('admin') || r.includes('sys')) return '#b91c1c';
        if (r.includes('ceo') || r.includes('chairman')) return '#4267B2';
        if (r.includes('shareholder')) return '#fb4747';
        if (r.includes('cfo') || r.includes('finance')) return '#7c3aed';
        if (r.includes('manager') || r.includes('director')) return '#0ea5e9';
        return '#64748b';
    }

    async login(email, password) {
        if (!this.isReady) await this.init();

        const cleanEmail = email.trim().toLowerCase();
        const demoPass = "12345678";

        const user = this.users.find(u => u.email === cleanEmail);
        
        if (!user) throw new Error("المستخدم غير موجود");
        if (password !== demoPass) throw new Error("كلمة المرور غير صحيحة");

        localStorage.setItem('currentUser', JSON.stringify(user));
        return this.getRedirectUrl(user.type); // استخدام type للتوجيه الأدق
    }

    getRedirectUrl(type) {
        switch (type) {
            case 'admin': return 'admin/admin.html';
            case 'board': return 'admin/board.html';
            case 'audit': return 'admin/audit.html';
            case 'shareholder': return 'shareholder/dashboard.html';
            case 'exec': return 'exec/dashboard.html';
            case 'manager': return 'manager/dashboard.html'; // إذا وجدت صفحة للمدراء
            default: return 'employee/dashboard.html';
        }
    }

    async getDemoUsers() {
        if (!this.isReady) await this.init();
        return this.users;
    }
}

// تهيئة النظام
window.authSystem = new AuthSystem();

// معالج تسجيل الدخول للواجهة
window.handleLogin = async (e) => {
    e.preventDefault();
    const btn = document.querySelector('button[type="submit"]');
    const originalText = btn ? btn.innerHTML : '';
    
    if(btn) {
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري التحقق...';
        btn.disabled = true;
    }
    
    const errorMsg = document.getElementById('errorMsg');
    if(errorMsg) errorMsg.classList.add('hidden');

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (!emailInput || !passwordInput) return;

    try {
        const redirect = await window.authSystem.login(emailInput.value, passwordInput.value);
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
