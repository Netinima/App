// ============================================================
//  NETINIMA — SHARED SEARCH SCRIPT
//  Include this on every page: <script src="../search.js"></script>
//  (or <script src="search.js"></script> on the homepage)
//
//  On the HOMEPAGE: filters the grid live as you type.
//  On SHOW PAGES:   redirects to homepage with ?q= query.
// ============================================================

(function () {
  // Detect whether we are on the homepage or a show page
  const isHome = !!document.getElementById('search-input') && !!document.getElementById('grid-wrap');

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
            // Work out the path depth to find index.html
            const depth = window.location.pathname.split('/').filter(Boolean).length;
            const base = depth <= 1 ? '' : '../'.repeat(depth - 1);
            window.location.href = `${base}index.html?q=${encodeURIComponent(q)}`;
          }, 600);
        }
      });

      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
          const depth = window.location.pathname.split('/').filter(Boolean).length;
          const base = depth <= 1 ? '' : '../'.repeat(depth - 1);
          window.location.href = `${base}index.html?q=${encodeURIComponent(this.value.trim())}`;
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
