// ============================================================
//  NETINIMA — SHARED SEARCH SCRIPT
//  Include this on every page: <script src="../search.js"></script>
//  (or <script src="search.js"></script> on the homepage)
//
//  On the HOMEPAGE: filters the grid live as you type.
//  On SHOW PAGES:   redirects to homepage with ?q= query.
// ============================================================

(function () {
  // Determine current page type (set via data-page on body)
  const page = document.body.dataset.page || 'home';
  const isHome = page === 'home';

  function initSearch() {
    const input = document.getElementById('nav-search-input');
    if (!input) return;

    // On show pages — redirect to homepage on Enter or after a short pause
    if (!isHome) {
      let redirectTimer;
      input.addEventListener('input', function () {
        this.classList.toggle('has-value', this.value.length > 0);
        clearTimeout(redirectTimer);
        const q = this.value.trim();
        if (q.length >= 2) {
          // Redirect after 600ms pause so fast typers don't get kicked immediately
          redirectTimer = setTimeout(() => {
            const depth = window.location.pathname.split('/').filter(Boolean).length;
            const base = depth <= 1 ? '' : '../'.repeat(depth - 1);
            const target = page === 'home' ? 'index.html' : `${page}.html`;
            window.location.href = `${base}${target}?q=${encodeURIComponent(q)}`;
          }, 600);
        }
      });

      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
          const depth = window.location.pathname.split('/').filter(Boolean).length;
          const base = depth <= 1 ? '' : '../'.repeat(depth - 1);
          const target = page === 'home' ? 'index.html' : `${page}.html`;
          window.location.href = `${base}${target}?q=${encodeURIComponent(this.value.trim())}`;
        }
        if (e.key === 'Escape') {
          this.value = '';
          this.classList.remove('has-value');
        }
      });
    }

    // On homepage — the inline oninput already calls filterShows(),
    // but we still wire up the Enter key clear and URL param reading here.
    if (isHome) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          this.value = '';
          this.classList.remove('has-value');
          if (typeof filterShows === 'function') filterShows('');
          if (typeof clearSearch === 'function') clearSearch(e);
        }
      });
    }
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
