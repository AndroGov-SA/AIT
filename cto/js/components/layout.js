<invoke name="artifacts">
<parameter name="command">create</parameter>
<parameter name="type">application/vnd.ant.code</parameter>
<parameter name="language">javascript</parameter>
<parameter name="title">CTO Layout Engine - Clean</parameter>
<parameter name="id">cto_layout_clean</parameter>
<parameter name="content">/**
 * AndroGov CTO Layout Engine v1.0
 * @file cto/js/components/layout.js
 * @author Ayman Al-Maghrabi
 */
const Layout = (function() {
let _state = {
currentUser: null,
activeRole: 'cto',
isInitialized: false,
sidebarOpen: false,
notifications: [],
unreadCount: 0
};
const _menuDefinitions = {
'cto': [
{ section: 'tech_dashboard', items: [
{ key: 'tech_overview', icon: 'fa-gauge-high', link: 'index.html', badge: 'live' },
{ key: 'system_monitoring', icon: 'fa-desktop', link: 'cto_monitoring.html', badge: 'monitoring' }
]},
{ section: 'infrastructure', items: [
{ key: 'servers_management', icon: 'fa-server', link: 'cto_servers.html', badge: null },
{ key: 'it_assets', icon: 'fa-laptop-code', link: 'cto_assets.html', badge: 'assets' }
]},
{ section: 'security', items: [
{ key: 'soc_center', icon: 'fa-shield-halved', link: 'cto_soc.html', badge: 'security' },
{ key: 'iam_management', icon: 'fa-id-badge', link: 'cto_iam.html', badge: null }
]},
{ section: 'telecom', items: [
{ key: 'pbx_dashboard', icon: 'fa-phone-volume', link: 'cto_pbx.html', badge: 'pbx' },
{ key: 'extensions', icon: 'fa-users-viewfinder', link: 'cto_extensions.html', badge: null },
{ key: 'call_logs', icon: 'fa-list-ol', link: 'cto_call_logs.html', badge: null }
]},
{ section: 'development', items: [
{ key: 'dev_projects', icon: 'fa-code-branch', link: 'cto_projects.html', badge: 'devops' },
{ key: 'tech_support', icon: 'fa-headset', link: 'cto_support.html', badge: null }
]},
{ section: 'personal', items: [
{ key: 'my_profile', icon: 'fa-user-circle', link: 'profile.html', badge: null }
]}
]
};
const _roleLabels = {
'cto': {
ar: 'المدير التقني',
en: 'Chief Technology Officer',
desc: { ar: 'القيادة التقنية والبنية التحتية', en: 'Technical Leadership & Infrastructure' }
}
};
const _translations = {
ar: {
tech_dashboard: 'لوحة القيادة التقنية',
infrastructure: 'البنية التحتية',
security: 'الأمن السيبراني',
telecom: 'الاتصالات',
development: 'التطوير والدعم',
personal: 'الحساب الشخصي',
tech_overview: 'نظرة تقنية شاملة',
system_monitoring: 'مراقبة الأنظمة',
servers_management: 'إدارة السيرفرات',
it_assets: 'الأصول التقنية',
soc_center: 'مركز الأمن (SOC)',
iam_management: 'إدارة الهوية (IAM)',
pbx_dashboard: 'لوحة السنترال',
extensions: 'التحويلات',
call_logs: 'سجل المكالمات',
dev_projects: 'المشاريع البرمجية',
tech_support: 'الدعم الفني',
my_profile: 'الملف الشخصي',
notifications: 'الإشعارات',
noNotifications: 'لا توجد إشعارات جديدة',
markAllRead: 'تعليم الكل كمقروء',
logout: 'تسجيل الخروج',
logoutConfirm: 'هل أنت متأكد من تسجيل الخروج؟',
poweredBy: 'تطوير',
aymanDev: 'أيمن المغربي'
},
en: {
tech_dashboard: 'Tech Dashboard',
infrastructure: 'Infrastructure',
security: 'Cybersecurity',
telecom: 'Telecommunications',
development: 'Development & Support',
personal: 'Personal',
tech_overview: 'Technical Overview',
system_monitoring: 'System Monitoring',
servers_management: 'Servers Management',
it_assets: 'IT Assets',
soc_center: 'SOC Center',
iam_management: 'IAM Management',
pbx_dashboard: 'PBX Dashboard',
extensions: 'Extensions',
call_logs: 'Call Logs',
dev_projects: 'Dev Projects',
tech_support: 'Tech Support',
my_profile: 'My Profile',
notifications: 'Notifications',
noNotifications: 'No new notifications',
markAllRead: 'Mark all as read',
logout: 'Logout',
logoutConfirm: 'Are you sure you want to logout?',
poweredBy: 'Developed by',
aymanDev: 'Ayman Almaghrabi'
}
};
async function init() {
if (_state.isInitialized) return;
const storedUser = localStorage.getItem('currentUser');
if (storedUser) {
  _state.currentUser = JSON.parse(storedUser);
} else {
  _state.currentUser = {
    id: 'USR_009',
    type: 'cto',
    role: 'CTO',
    displayName: 'مشاعل الهديان',
    displayTitle: 'المدير التقني (CTO)',
    avatar: 'https://ui-avatars.com/api/?name=Meshail+AlHadyan&background=EC4899&color=fff'
  };
  localStorage.setItem('currentUser', JSON.stringify(_state.currentUser));
}

loadNotifications();
renderSidebar();
renderHeader();
document.body.style.opacity = '1';

_state.isInitialized = true;
console.log('✅ AndroGov CTO Layout Ready');
}
function getCurrentLang() {
return localStorage.getItem('lang') || 'ar';
}
function setLanguage(lang) {
if (!['ar', 'en'].includes(lang)) return;
localStorage.setItem('lang', lang);
document.documentElement.lang = lang;
document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

renderSidebar();
renderHeader();

window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

if (window.Toast) {
  const msg = lang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English';
  Toast.success(msg);
}
}
function t(key) {
const lang = getCurrentLang();
return _translations[lang]?.[key] || key;
}
function loadNotifications() {
const stored = localStorage.getItem('cto_notifications');
if (stored) {
_state.notifications = JSON.parse(stored);
} else {
_state.notifications = [
{
id: 'CTO001',
type: 'server',
icon: 'fa-server',
color: 'orange',
title: { ar: 'تحذير: حمل زائد على الخادم', en: 'Warning: Server High Load' },
body: { ar: 'WEB-LBS-01 يستهلك 88% من الموارد', en: 'WEB-LBS-01 using 88% resources' },
time: new Date(Date.now() - 1000 * 60 * 30),
read: false,
link: 'cto_monitoring.html'
},
{
id: 'CTO002',
type: 'security',
icon: 'fa-shield-halved',
color: 'red',
title: { ar: 'تنبيه أمني: محاولة اختراق', en: 'Security Alert: Intrusion Attempt' },
body: { ar: 'تم حظر 1,204 محاولة هجوم', en: '1,204 attack attempts blocked' },
time: new Date(Date.now() - 1000 * 60 * 60 * 2),
read: false,
link: 'cto_soc.html'
}
];
}
_state.unreadCount = _state.notifications.filter(n => !n.read).length;
}
function markNotificationRead(id) {
const notif = _state.notifications.find(n => n.id === id);
if (notif && !notif.read) {
notif.read = true;
_state.unreadCount--;
localStorage.setItem('cto_notifications', JSON.stringify(_state.notifications));
renderHeader();
}
}
function markAllRead() {
_state.notifications.forEach(n => n.read = true);
_state.unreadCount = 0;
localStorage.setItem('cto_notifications', JSON.stringify(_state.notifications));
renderHeader();
if (window.Toast) {
  Toast.success(t('markAllRead'));
}
}
function getTimeAgo(date) {
const lang = getCurrentLang();
const seconds = Math.floor((new Date() - date) / 1000);
if (seconds < 60) return lang === 'ar' ? 'الآن' : 'Now';
if (seconds < 3600) {
  const mins = Math.floor(seconds / 60);
  return lang === 'ar' ? `منذ ${mins} دقيقة` : `${mins}m ago`;
}
if (seconds < 86400) {
  const hours = Math.floor(seconds / 3600);
  return lang === 'ar' ? `منذ ${hours} ساعة` : `${hours}h ago`;
}
const days = Math.floor(seconds / 86400);
return lang === 'ar' ? `منذ ${days} يوم` : `${days}d ago`;
}
function renderSidebar() {
const container = document.getElementById('sidebar-container');
if (!container) return;
const lang = getCurrentLang();
const isRTL = lang === 'ar';
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const activeMenu = _menuDefinitions['cto'];

let menuHTML = '';
activeMenu.forEach(group => {
  const sectionLabel = t(group.section);
  
  menuHTML += `
    <div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
      ${sectionLabel}
    </div>
  `;
  
  group.items.forEach(item => {
    const isActive = currentPath === item.link;
    const label = t(item.key);
    
    const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group mb-1";
    const activeClass = "bg-gradient-to-r from-brandRed to-red-600 text-white shadow-lg shadow-red-500/30";
    const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandRed dark:hover:text-red-400";

    let badgeHTML = '';
    if (item.badge) {
      const badgeStyles = {
        'live': 'bg-red-500 animate-pulse',
        'monitoring': 'bg-orange-500',
        'assets': 'bg-blue-500',
        'security': 'bg-purple-500',
        'pbx': 'bg-green-500',
        'devops': 'bg-indigo-500'
      };
      const badgeClass = badgeStyles[item.badge] || 'bg-slate-400';
      badgeHTML = `<span class="px-1.5 py-0.5 text-[9px] font-bold rounded ${badgeClass} text-white uppercase tracking-wider">${item.badge}</span>`;
    }

    menuHTML += `
      <a href="${item.link}" class="${baseClass} ${isActive ? activeClass : inactiveClass}">
        <div class="w-5 text-center transition-transform group-hover:scale-110">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <span class="flex-1 truncate">${label}</span>
        ${badgeHTML}
        ${isActive ? '<div class="w-1.5 h-1.5 rounded-full bg-white"></div>' : ''}
      </a>
    `;
  });
});

const user = _state.currentUser;
const displayName = user?.displayName || 'مشاعل الهديان';
const roleLabel = _roleLabels['cto'][lang];

container.innerHTML = `
  <aside id="main-sidebar" class="fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen w-72 flex flex-col bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-2xl">
    <div class="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-gradient-to-${isRTL ? 'l' : 'r'} from-slate-50 to-transparent dark:from-slate-900/50">
      <div class="flex items-center gap-3 w-full">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brandRed to-red-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brandRed/30">
          <i class="fa-solid fa-microchip"></i>
        </div>
        <div class="overflow-hidden">
          <h1 class="font-bold text-base text-slate-800 dark:text-white truncate">AndroGov</h1>
          <p class="text-[10px] text-brandRed font-bold uppercase tracking-widest truncate">Technical</p>
        </div>
      </div>
    </div>
    
    <div class="p-4 shrink-0">
      <div class="relative group cursor-pointer">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
          <img src="${user?.avatar || 'https://ui-avatars.com/api/?name=CTO&background=EC4899&color=fff'}" 
               class="w-11 h-11 rounded-full border-2 border-white dark:border-slate-600 object-cover shadow-md">
          <div class="overflow-hidden flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 dark:text-white truncate">${displayName}</p>
            <p class="text-[10px] text-brandRed font-bold truncate uppercase tracking-tight">${roleLabel}</p>
          </div>
          <i class="fa-solid fa-chevron-down text-slate-400 text-xs"></i>
        </div>
        <div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
          <a href="profile.html" class="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <i class="fa-solid fa-user-circle text-brandRed"></i>
            <span class="text-xs font-medium">${t('my_profile')}</span>
          </a>
        </div>
      </div>
    </div>

    <nav id="sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
      ${menuHTML}
    </nav>
    
    <div class="p-4 text-center border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
      <p class="text-[10px] text-slate-400 font-medium">© 2026 Andromeda IT</p>
      <p class="text-[9px] text-slate-300 dark:text-slate-600 mt-1">${t('poweredBy')} ${t('aymanDev')}</p>
    </div>
  </aside>
`;
}
function renderHeader() {
const container = document.getElementById('header-container');
if (!container) return;
const lang = getCurrentLang();
const isRTL = lang === 'ar';
const isDark = document.documentElement.classList.contains('dark');

const notifHTML = _state.notifications.length === 0 ? `
  <div class="p-8 text-center text-slate-400">
    <i class="fa-solid fa-bell-slash text-4xl mb-3"></i>
    <p class="text-sm">${t('noNotifications')}</p>
  </div>
` : _state.notifications.map(notif => {
  const colorStyles = {
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
  };
  const colorClass = colorStyles[notif.color] || colorStyles.blue;
  
  return `
    <a href="${notif.link}" onclick="Layout.markNotificationRead('${notif.id}')" 
       class="flex gap-3 p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${!notif.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}">
      <div class="w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center shrink-0">
        <i class="fa-solid ${notif.icon}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-slate-800 dark:text-white truncate">${notif.title[lang]}</p>
        <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${notif.body[lang]}</p>
        <p class="text-[10px] text-slate-400 mt-1">${getTimeAgo(new Date(notif.time))}</p>
      </div>
      ${!notif.read ? '<div class="w-2 h-2 rounded-full bg-brandRed animate-pulse"></div>' : ''}
    </a>
  `;
}).join('');

container.innerHTML = `
  <header class="h-20 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
    <div class="flex items-center gap-4">
      <button onclick="Layout.toggleMobileSidebar()" class="lg:hidden text-slate-500 dark:text-slate-200 hover:text-brandRed">
        <i class="fa-solid fa-bars text-xl"></i>
      </button>
      
      <div class="hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
        <i class="fa-solid fa-microchip text-brandRed"></i>
        <span class="text-xs font-bold text-slate-700 dark:text-slate-200">${_roleLabels['cto'][lang]}</span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="relative group">
        <button class="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-slate-600 dark:text-slate-300 hover:border-orange-400 transition-all flex items-center justify-center">
          <i class="fa-solid fa-bell"></i>
          ${_state.unreadCount > 0 ? `
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-brandRed text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              ${_state.unreadCount}
            </span>
          ` : ''}
        </button>
        
        <div class="absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-3 w-96 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
          <div class="p-4 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-orange-500 to-amber-500 flex justify-between items-center">
            <div>
              <p class="text-sm font-bold text-white">${t('notifications')}</p>
              <p class="text-[10px] text-white/80">${_state.unreadCount} ${lang === 'ar' ? 'غير مقروءة' : 'unread'}</p>
            </div>
            ${_state.unreadCount > 0 ? `
              <button onclick="Layout.markAllRead()" class="text-xs text-white/90 hover:text-white underline">
                ${t('markAllRead')}
              </button>
            ` : ''}
          </div>
          
          <div class="max-h-96 overflow-y-auto">
            ${notifHTML}
          </div>
        </div>
      </div>

      <button onclick="Layout.toggleLanguage()" 
              class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 hover:border-blue-400 transition-all flex items-center justify-center font-bold text-xs">
        ${lang === 'ar' ? 'EN' : 'ع'}
      </button>
      
      <button onclick="if(window.AndroBot) AndroBot.toggle()" 
              class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-brandRed hover:border-blue-400 transition-all flex items-center justify-center group">
        <i class="fa-solid fa-robot group-hover:animate-bounce"></i>
      </button>
      
      <button onclick="Layout.toggleTheme()" 
              class="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-900/20 text-slate-600 dark:text-yellow-400 hover:border-amber-400 transition-all">
        <i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
      </button>
      
      <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
      
      <button onclick="Layout.logout()" 
              class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border-2 border-transparent hover:border-red-200">
        <i class="fa-solid fa-power-off"></i> 
        <span class="hidden sm:inline">${t('logout')}</span>
      </button>
    </div>
  </header>
`;
}
function toggleLanguage() {
const currentLang = getCurrentLang();
const newLang = currentLang === 'ar' ? 'en' : 'ar';
setLanguage(newLang);
}
function toggleTheme() {
const html = document.documentElement;
html.classList.toggle('dark');
const isDark = html.classList.contains('dark');
localStorage.setItem('theme', isDark ? 'dark' : 'light');
renderHeader();
}
function logout() {
const lang = getCurrentLang();
const confirmMsg = t('logoutConfirm');
if (confirm(confirmMsg)) {
  localStorage.removeItem('currentUser');
  window.location.href = '../login.html';
}
}
function toggleMobileSidebar() {
const sidebar = document.getElementById('main-sidebar');
if (sidebar) {
sidebar.classList.toggle('-translate-x-full');
}
}
return {
init,
toggleTheme,
toggleLanguage,
setLanguage,
logout,
toggleMobileSidebar,
markNotificationRead,
markAllRead,
getCurrentLang,
t
};
})();
document.addEventListener('DOMContentLoaded', () => {
Layout.init();
});
window.Layout = Layout;
</parameter>
