/**
 * AndroGov Toast Notification System
 * @file ceo/js/components/toast.js
 */

const Toast = (function() {
  
  let _container = null;

  // ==========================================
  // INITIALIZATION
  // ==========================================
  
  function init() {
    if (_container) return;
    
    _container = document.createElement('div');
    _container.id = 'toast-container';
    _container.className = 'fixed top-24 right-6 z-[9999] flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(_container);
  }

  // ==========================================
  // TOAST CREATION
  // ==========================================
  
  function show(message, type = 'info', duration = 3000) {
    init();

    const toast = document.createElement('div');
    toast.className = `
      pointer-events-auto
      min-w-[320px] max-w-md
      bg-white dark:bg-slate-800 
      border-2 
      rounded-2xl 
      shadow-2xl
      p-4
      flex items-center gap-3
      transform translate-x-[400px]
      transition-all duration-300
      animate-slide-in
    `;

    // Icon & Color based on type
    const styles = {
      success: {
        icon: 'fa-circle-check',
        color: 'text-green-600',
        border: 'border-green-500',
        bg: 'bg-green-50 dark:bg-green-900/20'
      },
      error: {
        icon: 'fa-circle-xmark',
        color: 'text-red-600',
        border: 'border-red-500',
        bg: 'bg-red-50 dark:bg-red-900/20'
      },
      warning: {
        icon: 'fa-triangle-exclamation',
        color: 'text-orange-600',
        border: 'border-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-900/20'
      },
      info: {
        icon: 'fa-circle-info',
        color: 'text-blue-600',
        border: 'border-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/20'
      }
    };

    const style = styles[type] || styles.info;
    toast.classList.add(style.border);

    toast.innerHTML = `
      <div class="w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center shrink-0">
        <i class="fa-solid ${style.icon} ${style.color} text-xl"></i>
      </div>
      <p class="flex-1 text-sm font-medium text-slate-800 dark:text-white">${message}</p>
      <button onclick="this.closest('.pointer-events-auto').remove()" 
              class="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition flex items-center justify-center">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    _container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }

    return toast;
  }

  // ==========================================
  // SHORTCUTS
  // ==========================================
  
  function success(message, duration) {
    return show(message, 'success', duration);
  }

  function error(message, duration) {
    return show(message, 'error', duration);
  }

  function warning(message, duration) {
    return show(message, 'warning', duration);
  }

  function info(message, duration) {
    return show(message, 'info', duration);
  }

  // ==========================================
  // PUBLIC API
  // ==========================================
  
  return {
    show,
    success,
    error,
    warning,
    info
  };

})();

window.Toast = Toast;
