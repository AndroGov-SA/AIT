<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AndroGov | لوحة تحكم الإدارة</title>

    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: { brandRed: '#FB4747', brandBlue: '#4267B2', brandDark: '#0F172A' },
                    fontFamily: { sans: ['Tajawal', 'sans-serif'] }
                }
            }
        }
    </script>

    <style>
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: #FB4747; border-radius: 10px; }
        .nav-active { background: rgba(251, 71, 71, 0.1); border-right: 4px solid #FB4747; color: #FB4747 !important; }
    </style>
</head>

<body class="bg-slate-50 dark:bg-[#0F172A] font-sans h-screen flex overflow-hidden">

    <aside id="main-sidebar" class="fixed top-0 right-0 h-screen w-72 bg-white dark:bg-[#111827] border-l border-slate-200 dark:border-slate-800 z-50 flex flex-col transition-all duration-300">
        
        <div class="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-layer-group text-2xl text-brandRed"></i>
                <span class="text-xl font-black text-slate-800 dark:text-white italic">AndroGov</span>
            </div>
        </div>

        <nav class="flex-1 overflow-y-auto custom-scroll py-6 px-4 space-y-1">
            
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">الرئيسية</div>
            <a href="index.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-gauge-high w-5 text-center"></i> <span>لوحة القيادة</span>
            </a>

            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-6 mb-2">التواصل</div>
            <a href="admin_chat.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-comments w-5 text-center"></i> <span>غرفة الدردشة</span>
            </a>
            <a href="admin_circulars.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-bullhorn w-5 text-center"></i> <span>التعاميم المؤسسية</span>
            </a>

            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-6 mb-2">الحوكمة</div>
            <a href="ga.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-users-rectangle w-5 text-center"></i> <span>الجمعية العمومية</span>
            </a>
            <a href="board.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-building-columns w-5 text-center"></i> <span>مجلس الإدارة</span>
            </a>
            <a href="committees.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-people-group w-5 text-center"></i> <span>اللجان</span>
            </a>
            <a href="shareholders.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-id-card w-5 text-center"></i> <span>سجل المساهمين</span>
            </a>

            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-6 mb-2">التشغيل</div>
            <a href="tasks.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-list-check w-5 text-center"></i> <span>المهام والتكليفات</span>
            </a>
            <a href="doa.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-sitemap w-5 text-center"></i> <span>مصفوفة الصلاحيات</span>
            </a>
            <a href="policies.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-book-open w-5 text-center"></i> <span>السياسات واللوائح</span>
            </a>
            <a href="compliance.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-scale-balanced w-5 text-center"></i> <span>الالتزام والرقابة</span>
            </a>

            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-6 mb-2">الإدارات</div>
            <a href="hr.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-user-tie w-5 text-center"></i> <span>الموارد البشرية</span>
            </a>
            <a href="finance.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-money-bill-wave w-5 text-center"></i> <span>المالية</span>
            </a>
            <a href="procurement.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-boxes-packing w-5 text-center"></i> <span>المشتريات</span>
            </a>
            <a href="it.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-shield-cat w-5 text-center"></i> <span>تقنية المعلومات</span>
            </a>

            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-6 mb-2">النظام</div>
            <a href="users.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-users-gear w-5 text-center"></i> <span>إدارة المستخدمين</span>
            </a>
            <a href="audit.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-list-ul w-5 text-center"></i> <span>سجل الأحداث</span>
            </a>
            <a href="admin_settings.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fa-solid fa-sliders w-5 text-center"></i> <span>الإعدادات</span>
            </a>
        </nav>

        <div class="p-6 border-t border-slate-100 dark:border-slate-800">
            <a href="profile.html" class="flex items-center gap-3 group">
                <img id="userAvatar" src="https://ui-avatars.com/api/?name=Admin&background=FB4747&color=fff" class="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 group-hover:border-brandRed transition-all">
                <div class="overflow-hidden">
                    <p id="userName" class="text-xs font-bold text-slate-800 dark:text-white truncate">أهلاً، المسؤول</p>
                    <p class="text-[9px] text-slate-400 uppercase font-black">عرض الملف الشخصي</p>
                </div>
            </a>
        </div>
    </aside>

    <div class="flex-1 flex flex-col h-full mr-72 transition-all duration-300">
        
        <header class="h-20 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
            <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">الإدارة العامة</span>
                <i class="fa-solid fa-chevron-left text-[10px] text-slate-300"></i>
                <span id="pageTitle" class="text-xs font-black text-brandRed uppercase tracking-widest">لوحة التحكم</span>
            </div>

            <div class="flex items-center gap-4">
                <button onclick="toggleDarkMode()" class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    <i id="themeIcon" class="fa-solid fa-moon"></i>
                </button>
                <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                <button onclick="handleLogout()" class="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 text-brandRed px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-brandRed hover:text-white transition-all">
                    <i class="fa-solid fa-power-off"></i> خروج آمن
                </button>
            </div>
        </header>

        <main class="flex-1 overflow-y-auto p-8 custom-scroll">
            
            <div id="content-placeholder">
                <h1 class="text-3xl font-black text-slate-800 dark:text-white mb-2">مرحباً بك في نظام AndroGov</h1>
                <p class="text-slate-500 dark:text-slate-400 text-sm">أنت الآن تتصفح بوابة المسؤول العام بكل الصلاحيات الإدارية.</p>
            </div>

        </main>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // جلب اسم المستخدم من الجلسة
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if (user) {
                document.getElementById('userName').innerText = `أهلاً، ${user.name.split(' ')[0]}`;
                document.getElementById('userAvatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FB4747&color=fff`;
            }

            // تفعيل الرابط النشط تلقائياً بناءً على اسم الملف الحالي
            const currentFile = window.location.pathname.split('/').pop();
            document.querySelectorAll('nav a').forEach(link => {
                if (link.getAttribute('href') === currentFile) {
                    link.classList.add('nav-active');
                    // تحديث عنوان الصفحة في الهيدر
                    document.getElementById('pageTitle').innerText = link.querySelector('span').innerText;
                }
            });
        });

        function handleLogout() {
            if(confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                localStorage.removeItem('currentUser');
                window.location.href = '../login.html';
            }
        }

        function toggleDarkMode() {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            document.getElementById('themeIcon').className = isDark ? 'fa-solid fa-sun text-yellow-400' : 'fa-solid fa-moon';
        }
    </script>
</body>
</html>
