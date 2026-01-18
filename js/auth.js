<script src="js/auth.js"></script>

  <script>
    // ==========================================
    // 1. تعريف البيانات (Data Source)
    // ==========================================
    window.SYSTEM_DATA = {
        // ... (أبقِ بيانات المساهمين والمستخدمين كما هي موجودة لديك حالياً) ...
        shareholders: [
             { "id": "SH_001", "name": { "ar": "ورثة محمد بن صالح السحيباني", "en": "Heirs..." }, "percent": 35, "email": "alcaseer@gmail.com", /*...*/ },
             // ... بقية المساهمين
        ],
        users: [
             { "id": "USR_000", "name": "Abdullah Al-Hawas", "role": "Chairman", "email": "amh400@gmail.com", /*...*/ },
             // ... بقية الموظفين
        ]
    };

    // ==========================================
    // 2. منطق الواجهة (UI Logic)
    // ==========================================
    const translations = {
      ar: { loginTitle: "تسجيل الدخول", loginSub: "يرجى اختيار صفتك", verifying: "جاري التحقق...", errorCredentials: "بيانات الدخول غير صحيحة" },
      en: { loginTitle: "Sign In", loginSub: "Select role", verifying: "Verifying...", errorCredentials: "Invalid credentials" }
    };

    let lang = localStorage.getItem('lang') || 'ar';

    document.addEventListener('DOMContentLoaded', async () => {
        applyTheme();
        applyLang();
        
        // تهيئة النظام الخارجي
        if (window.authSystem) {
            await window.authSystem.init();
            renderDynamicUsers();
        } else {
            console.error("❌ AuthSystem not loaded! Check js/auth.js path.");
        }

        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    });

    // دالة الدخول الجديدة التي تستخدم authSystem
    async function handleLogin(e) {
        e.preventDefault();
        const btn = document.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // UI Loading
        btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${translations[lang].verifying}`;
        btn.disabled = true;
        document.getElementById('errorMsg').classList.add('hidden');

        try {
            // ✅ استخدام النظام الخارجي للدخول
            const redirectUrl = await window.authSystem.login(
                document.getElementById('email').value, 
                document.getElementById('password').value
            );
            window.location.href = redirectUrl;
        } catch (err) {
            console.error(err);
            document.getElementById('errorMsg').classList.remove('hidden');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }

    // دالة لعرض مستخدمي الوصول السريع (Demo Users)
    function renderDynamicUsers() {
        const container = document.getElementById('usersContainer');
        if (!container || !window.authSystem) return;
        
        container.innerHTML = '';
        const users = window.authSystem.getUsers().slice(0, 15); // عرض أول 15 فقط

        users.forEach(u => {
            let name = typeof u.name === 'object' ? (lang==='ar'?u.name.ar:u.name.en) : u.name;
            let role = u.role || 'User';
            
            const btn = document.createElement('button');
            btn.className = "flex items-center gap-2 p-2 w-full text-right hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition";
            btn.onclick = () => {
                document.getElementById('email').value = u.email;
                document.getElementById('password').value = '12345678';
            };
            btn.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-brandRed/10 text-brandRed flex items-center justify-center text-xs font-bold">
                    ${name.charAt(0).toUpperCase()}
                </div>
                <div class="overflow-hidden">
                    <p class="text-xs font-bold truncate dark:text-white">${name}</p>
                    <p class="text-[10px] text-slate-500 truncate">${role}</p>
                </div>
            `;
            container.appendChild(btn);
        });
    }

    // دوال المظهر (كما هي)
    function applyTheme() { /* ... كودك السابق ... */ }
    function applyLang() { /* ... كودك السابق ... */ }
    window.toggleDarkMode = () => { /* ... */ };
    window.toggleLanguage = () => { /* ... */ };
    window.togglePassword = () => { /* ... */ };

  </script>
