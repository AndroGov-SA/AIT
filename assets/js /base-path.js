// base-path.js
// Auto-detect GitHub Pages base path (example: https://domain/AIT/...)
(function () {
  const parts = location.pathname.split("/").filter(Boolean);
  // If URL is /AIT/admin/... => base = /AIT
  window.BASE_PATH = parts.length ? `/${parts[0]}` : "";
  window.withBase = (p) => `${window.BASE_PATH}${p}`;
})();
