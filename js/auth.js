/**
 * AndroGov Authentication Engine v4.5
 * ملف: js/auth.js
 * (Pure JavaScript - Do NOT add script tags here)
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
            
            // 1. محاولة العثور على البيانات
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

        // معالجة المستخدمين
        this.users = rawUsers.map(u => {
            let roleRaw = String(u.role || '').toLowerCase();
            let email = u.email ? u.email.toLowerCase().trim() : '';
            
            // تحديد اسم العرض
            let name = u.name;
            if (typeof u.name === 'object') {
                const lang = localStorage.getItem('lang') || 'ar';
                name = u.name[lang] || u.name.ar || u.name.en;
            }

            // تحديد نوع التوجيه
            let type = 'staff';
            if (roleRaw.includes('admin') || roleRaw.includes('grc')) type = 'admin';
            else if (roleRaw.includes('board') || roleRaw.includes('chairman')) type = 'board';
            else if (roleRaw.includes('audit') || u.department_id === 'DEP_AUDIT') type = 'audit';
            else if (roleRaw.includes('ceo') || u.is_executive) type = 'exec';
            else if (roleRaw.includes('shareholder')) type = 'shareholder';

            return {
                id: u.id,
                name: name,
                email: email,
                title: typeof u.title === 'object' ? (u.title.ar || u.title.en) : u.title,
                role: roleRaw,
                type: type,
                profiles: u.profiles || [] 
            };
        }).filter(u => u.email !== '');

        // إضافة المساهمين غير الموظفين
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
        switch (type) {
            case 'admin': return 'admin/index.html';
            case 'board': return 'board/index.html';
            case 'audit': return 'audit/index.html';
            case 'shareholder': return 'shareholder/index.html';
            case 'exec': return 'ceo/index.html';
            default: return 'employee/index.html';
        }
    }

    getUsers() { return this.users; }
    
    getAvatarColor(u) { return '#64748b'; }
}

window.authSystem = new AuthSystem();
