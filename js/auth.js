/**
 * AndroGov Authentication Engine v4.7 (Enterprise Routing)
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
            // التحقق من مصدر البيانات (SYSTEM_DATA أو CompanyPolicy)
            if (typeof window.SYSTEM_DATA !== 'undefined') {
                data = window.SYSTEM_DATA;
            } else if (typeof window.CompanyPolicy !== 'undefined') {
                data = {
                    users: window.CompanyPolicy.users,
                    shareholders: window.CompanyPolicy.shareholders
                };
            }

            if (!data) {
                console.warn("⚠️ Warning: No global data found. Make sure login page has SYSTEM_DATA.");
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
            
            // تحديد النوع (Routing Type)
            let type = 'staff'; 

            // 1. الإدارة العليا (Executive Management)
            if (roleRaw.includes('ceo')) {
                type = 'ceo';
            } 
            else if (roleRaw.includes('cfo') || dept.includes('fin')) {
                type = 'cfo';
            }
            else if (roleRaw.includes('cto') || roleRaw.includes('ncso') || dept.includes('tech')) {
                type = 'cto';
            }
            else if (roleRaw.includes('cao') || dept.includes('hr')) {
                type = 'hr_exec';
            }
            
            // 2. مثلث الحوكمة (Board, Secretary, Audit)
            // نضمن توجيه أمين السر مع المجلس في نفس البوابة الموحدة
            else if (roleRaw.includes('chairman') || roleRaw.includes('board') || roleRaw.includes('secretary')) {
                type = 'board';
            }
            else if (roleRaw.includes('audit') || dept.includes('audit')) {
                type = 'audit';
            }
            
            // 3. المسؤولين التقنيين (System Admin)
            else if (roleRaw.includes('admin') || roleRaw.includes('grc')) {
                type = 'admin';
            }

            // معالجة الاسم متعدد اللغات
            let displayName = u.name;
            if (typeof u.name === 'object') {
                const lang = localStorage.getItem('lang') || 'ar';
                displayName = u.name[lang] || u.name.ar || u.name.en;
            }

            return {
                id: u.id,
                name: displayName,
                email: email,
                title: typeof u.title === 'object' ? (u.title.ar || u.title.en) : u.title,
                role: roleRaw, // الدور التقني للمقارنة
                type: type,    // المجلد الموجه إليه
                avatar: u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`
            };
        }).filter(u => u.email !== '');

        // 4. إضافة المساهمين
        shareholders.forEach(s => {
            const email = s.email ? s.email.toLowerCase().trim() : '';
            if (email && !this.users.find(u => u.email === email)) {
                let sName = (typeof s.name === 'object') ? (s.name.ar || s.name.en) : s.name;
                this.users.push({
                    id: s.id,
                    name: sName,
                    email: email,
                    title: 'مساهم',
                    role: 'shareholder',
                    type: 'shareholder'
                });
            }
        });
    }

    async login(email, password) {
        if (!this.isReady) await this.init();

        const cleanEmail = email.trim().toLowerCase();
        const user = this.users.find(u => u.email === cleanEmail);
        
        if (!user) throw new Error("المستخدم غير موجود في قاعدة البيانات");
        if (password !== this.demoPass) throw new Error("كلمة المرور غير صحيحة (Demo Mode)");

        // حفظ الجلسة
        localStorage.setItem('currentUser', JSON.stringify(user));
        return this.getRedirectUrl(user.type);
    }

    getRedirectUrl(type) {
        switch (type) {
            case 'admin':       return 'admin/index.html';
            case 'ceo':         return 'ceo/index.html';
            case 'cfo':         return 'finance/index.html';
            case 'cto':         return 'cto/index.html';
            case 'hr_exec':     return 'hr/index.html';
            case 'board':       return 'board/index.html';
            case 'audit':       return 'audit/index.html';
            case 'shareholder': return 'shareholder/index.html';
            default:            return 'employee/index.html';
        }
    }

    getUsers() { return this.users; }
}

window.authSystem = new AuthSystem();
