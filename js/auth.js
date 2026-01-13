/**
 * AndroGov Smart Authentication Engine
 * يربط واجهة الدخول بالمستودع المركزي (company_policy.json)
 */

async function handleLogin(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const emailInput = document.getElementById('email').value.trim().toLowerCase();
    const passwordInput = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');

    // تغيير حالة الزر للتحميل
    const originalBtnText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري التحقق...';
    loginBtn.disabled = true;

    try {
        // 1. جلب البيانات من المستودع المركزي
        // نفترض أن ملف login.html في الجذر، لذا المسار هو data/...
        const response = await fetch('data/company_policy.json');
        if (!response.ok) throw new Error("فشل الاتصال بقاعدة البيانات المركزية");
        
        const data = await response.json();
        const users = data.organizational_chart.users_directory;

        // 2. البحث عن المستخدم (مطابقة البريد الإلكتروني)
        // ملاحظة: في بيئة ديمو، سنتجاوز التحقق المعقد لكلمة المرور
        const user = users.find(u => u.email.toLowerCase() === emailInput);

        if (!user) {
            throw new Error("البريد الإلكتروني غير مسجل في النظام");
        }

        // 3. بناء جلسة المستخدم (User Session)
        const sessionUser = {
            id: user.id,
            name: user.name, // الاسم كما هو في الملف
            title: user.title,
            role: user.role,
            departmentId: user.department_id,
            email: user.email,
            isExecutive: user.is_executive || false,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
        };

        // حفظ الجلسة
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        localStorage.setItem('userRole', user.role); // للوصول السريع

        // 4. التوجيه الذكي (Smart Routing)
        // يوجه المستخدم للوحة المناسبة حسب دوره أو قسمه
        let redirectUrl = 'employee/dashboard.html'; // الافتراضي للموظفين

        // المدراء التنفيذيين
        if (['CEO', 'Chairman', 'Vice Chairman'].includes(user.role)) {
            redirectUrl = 'ceo/ceo_dashboard.html';
        }
        // الإدارة المالية
        else if (user.role === 'CFO' || user.department_id === 'DEP_FIN') {
            redirectUrl = 'finance/cfo_dashboard.html';
        }
        // الموارد البشرية والشؤون الإدارية
        else if (['CAO', 'HR_Manager'].includes(user.role) || user.department_id === 'DEP_HR') {
            redirectUrl = 'hr/hr_dashboard.html';
        }
        // الحوكمة وأمانة السر
        else if (['GRCO', 'Board Secretary'].includes(user.role) || user.department_id === 'DEP_GRC') {
            redirectUrl = 'admin/admin.html';
        }
        // التقنية (للمدراء فقط، المطورون يذهبون للوحة الموظف أو لوحة خاصة)
        else if (['Director', 'Tech_Lead', 'NCSO'].includes(user.role)) {
            redirectUrl = 'cto/cto_dashboard.html';
        }
        // المبيعات (إذا أنشأت لها لوحة)
        else if (user.department_id === 'DEP_SALES') {
            // redirectUrl = 'sales/dashboard.html'; // مستقبلاً
            redirectUrl = 'employee/dashboard.html';
        }

        // تنفيذ التوجيه
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 800);

    } catch (error) {
        alert("خطأ في الدخول: " + error.message);
        loginBtn.innerHTML = originalBtnText;
        loginBtn.disabled = false;
        console.error(error);
    }
}

// ربط الوظيفة بالنموذج عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
