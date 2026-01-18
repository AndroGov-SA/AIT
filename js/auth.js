<script src="js/auth.js"></script> 

  <script>
    // ==========================================
    // 1. DATA DEFINITION (Single Source of Truth)
    // ==========================================
    // نُبقي البيانات هنا لأنها غير موجودة في ملفات منفصلة في الرفع الخاص بك
    window.SYSTEM_DATA = {
        shareholders: [
            { "id": "SH_001", "name": { "ar": "ورثة محمد بن صالح السحيباني", "en": "Heirs of Mohammed Al-Suhaibani" }, "percent": 35, "type": "Individual", "shares": 210000, "voting": true, "email": "alcaseer@gmail.com" },
            { "id": "SH_002", "name": { "ar": "هشام بن محمد السحيباني", "en": "Hesham bin Mohammed Al-Suhaibani" }, "percent": 10, "type": "Individual", "shares": 60000, "voting": true, "email": "Hesham@androomeda.com" },
            // ... (بقية قائمة المساهمين كما هي في ملفك الأصلي)
        ],
        users: [
            { "id": "USR_000", "name": "Abdullah Al-Hawas", "title": "Chairman of the Board", "role": "Chairman", "is_executive": false, "email": "amh400@gmail.com" },
            { "id": "USR_001", "name": "Hesham Al-Suhaibani", "title": "CEO", "role": "CEO", "is_executive": true, "email": "hesham@androomeda.com" },
            { "id": "USR_004", "name": "Ayman Al-Maghrabi", "title": "GRCO", "role": "Admin", "email": "amaghrabi@androomeda.com" },
            // ... (بقية قائمة المستخدمين كما هي في ملفك الأصلي)
        ]
    };

    // ==========================================
    // 2. UI LOGIC & TRANSLATIONS
    // ==========================================
    const translations = {
      ar: { 
        loginTitle: "تسجيل الدخول", 
        loginSub: "يرجى اختيار صفتك للدخول إلى النظام", 
        errorCredentials: "بيانات الدخول غير صحيحة",
        verifying: "جاري التحقق...",
        // ... (يمكنك إبقاء بقية الترجمات)
      },
      en: { 
        loginTitle: "Sign In", 
        loginSub: "Please select your role to access", 
        errorCredentials: "Invalid credentials",
        verifying: "Verifying...",
        // ...
      }
    };

    let lang = localStorage.getItem('lang') || 'ar';

    // عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', async () => {
        applyTheme();
        applyLang();
        
        // تهيئة نظام المصادقة الخارجي بالبيانات الموجودة هنا
        if (window.authSystem) {
            await window.authSystem.init();
            renderDynamicUsers(); // رسم أيقونات المستخدمين (Demo)
        } else {
            console.error("AuthSystem script not loaded!");
        }

        // ربط زر الدخول
        document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);
    });

    // دالة التعامل مع نموذج الدخول
    async function handleLoginSubmit(e) {
        e.preventDefault();
        
        const btn = document.querySelector('button[type="submit"]');
        const btnSpan = btn.querySelector('span');
        const originalText = btnSpan.innerText;
        const t = translations[lang] || translations['ar']; // Fallback
        
        // UI Loading State
        if(btn) {
            btnSpan.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${t.verifying}`;
            btn.disabled = true;
        }
        
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.classList.add('hidden');

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // محاكاة تأخير الشبكة قليلاً
        setTimeout(async () => {
            try {
                // استخدام نظام المصادقة الخارجي الذي أصلحناه
                const redirectUrl = await window.authSystem.login(email, password);
                window.location.href = redirectUrl;
            } catch (err) {
                console.error(err);
                if(document.getElementById('errorText')) document.getElementById('errorText').innerText = t.errorCredentials;
                errorMsg.classList.remove('hidden');
                if(btn) {
                    btnSpan.innerHTML = originalText; // إعادة النص الأصلي
                    btn.disabled = false;
                }
            }
        }, 800);
    }

    // دالة رسم المستخدمين (للوصول السريع Demo)
    function renderDynamicUsers() {
        const container = document.getElementById('usersContainer');
        if (!container || !window.authSystem) return;
        
        container.innerHTML = '';
        const users = window.authSystem.getUsers();

        // تجميع المستخدمين حسب النوع لتبسيط العرض
        // هذا مجرد مثال مبسط، يمكنك استخدام الكود الأصلي للتجميع إذا رغبت
        users.slice(0, 10).forEach(u => {
             // ... يمكنك نسخ منطق توليد HTML للأزرار هنا من الكود القديم ...
             // للتسهيل، سنستخدم دالة fillDemo الموجودة في النافذة
        });
        
        // إعادة تعريف دالة التعبئة التلقائية
        window.fillDemo = (email) => {
            document.getElementById('email').value = email;
            document.getElementById('password').value = '12345678';
        };
    }

    // دوال المظهر واللغة (كما هي في كودك الأصلي)
    function applyTheme() { /* ... */ }
    function applyLang() { /* ... */ }
    window.toggleDarkMode = () => { /* ... */ };
    window.toggleLanguage = () => { /* ... */ };
    window.togglePassword = () => {
        const inp = document.getElementById('password');
        const icon = document.getElementById('passIcon');
        if(inp.type === 'password') {
            inp.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            inp.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    };

  </script>
</body>
</html>
