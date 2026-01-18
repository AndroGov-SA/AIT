/**
 * AndroGov Authentication Engine v4.6 (Fixed Routing)
 * ملف: js/auth.js
 */

class AuthSystem {
    constructor() {
        this.users = [];
        this.isReady = false;
        this.demoPass = "12345678"; 
    }

    async init() {
        if (this.isReady) return;

        try {
            console.log("🔄 Initializing AuthSystem...");
            
            let data = null;
            if (typeof window.SYSTEM_DATA !== 'undefined') {
                data = window.SYSTEM_DATA;
            } else if (typeof window.CompanyPolicy !== 'undefined') {
                data = {
                    users: window.CompanyPolicy.users,
                    shareholders: window.CompanyPolicy.shareholders
                };
            }

            if (!data) {
                console.warn("⚠️ Warning: No global data found yet.");
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
        let rawUsers = data.users || [];
        let shareholders = data.shareholders || [];

        this.users = rawUsers.map(u => {
            let roleRaw = String(u.role || '').toLowerCase();
            let email = u.email ? u.email.toLowerCase().trim() : '';
            let dept = String(u.department_id || '').toLowerCase();
            
            // تحديد الاسم
            let name = u.name;
            if (typeof u.name === 'object') {
                const lang = localStorage.getItem('lang') || 'ar';
                name = u.name[lang] || u.name.ar || u.name.en;
            }

            // ====================================================
            // 🛠️ إصلاح منطق تحديد النوع (Routing Fix)
            // ====================================================
            let type = 'staff'; // الافتراضي

            // 1. الأدوار القيادية العليا المحددة
            if (roleRaw.includes('ceo')) {
                type = 'ceo';
            } 
            else if (roleRaw.includes('cfo') || dept.includes('fin')) {
                type = 'cfo'; // يذهب للمالية
            }
            else if (roleRaw.includes('cto') || roleRaw.includes('ncso') || dept.includes('tech')) {
                type = 'cto'; // يذهب للتقنية
            }
            else if (roleRaw.includes('cao') || dept.includes('hr')) {
                type = 'hr_exec'; // يذهب للموارد البشرية
            }
            
            // 2. أدوار مجلس الإدارة والحوكمة
            else if (roleRaw.includes('chairman') || roleRaw.includes('board')) {
                type = 'board';
            }
            else if (roleRaw.includes('audit') || dept.includes('audit')) {
                type = 'audit';
            }
            
            // 3. أدوار المسؤولين (Admins)
            else if (roleRaw.includes('admin') || roleRaw.includes('grc')) {
                type = 'admin';
            }
            
            // 4. المساهمين
            else if (roleRaw.includes('shareholder')) {
                type = 'shareholder';
            }

            return {
                id: u.id,
                name: name,
                email: email,
                title: typeof u.title === 'object' ? (u.title.ar || u.title.en) : u.title,
                role: roleRaw,
                type: type, // النوع الجديد المصحح
                profiles: u.profiles || [] 
            };
        }).filter(u => u.email !== '');

        // إضافة المساهمين
        shareholders.forEach(s => {
            const email = s.email ? s.email.toLowerCase().trim() : '';
            if (email && !this.users.find(u => u.email === email)) {
                let sName = s.name;
                if (typeof s.name === 'object') sName = localStorage.getItem('lang') === 'en' ? s.name.en : s.name.ar;

                this.users.push({
                    id: s.id,
                    name: sName,
                    email: email,
                    title: 'مساهم',
                    role: 'shareholder',
                    type: 'shareholder',
                    profiles: []
                });
            }
        });
    }

    async login(email, password) {
        if (!this.isReady) await this.init();

        const cleanEmail = email.trim().toLowerCase();
        const user = this.users.find(u => u.email === cleanEmail);
        
        if (!user) throw new Error("المستخدم غير موجود");
        if (password !== this.demoPass) throw new Error("كلمة المرور غير صحيحة");

        localStorage.setItem('currentUser', JSON.stringify(user));
        return this.getRedirectUrl(user.type);
    }

    getRedirectUrl(type) {
        // ====================================================
        // 🛠️ توجيه دقيق لكل دور تنفيذي
        // ====================================================
        switch (type) {
            case 'admin':       return 'admin/index.html';
            
            case 'ceo':         return 'ceo/index.html';
            case 'cfo':         return 'finance/index.html'; // المدير المالي
            case 'cto':         return 'cto/index.html';     // المدير التقني
            case 'hr_exec':     return 'hr/index.html';      // المدير الإداري/الموارد
            
            case 'board':       return 'board/index.html';
            case 'audit':       return 'audit/index.html';
            case 'shareholder': return 'shareholder/index.html';
            
            default:            return 'employee/index.html'; // الموظفين العاديين
        }
    }

    getUsers() { return this.users; }
    getAvatarColor(u) { return '#64748b'; }
}

window.authSystem = new AuthSystem();
