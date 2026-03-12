// ============================================================
//  NETINIMA — SHARED PAGE LOGIC
//  Included on index.html, films.html, show.html, smp.html
//  Each page sets  window.PAGE  before this script runs.
//
//  window.PAGE values:
//    'home'  → index.html   — hero + Films row + Shows row + SMP row + full grid
//    'films' → films.html   — hero of a film + full films grid
//    'shows' → show.html    — hero of a series + full series grid
//    'smp'   → smp.html     — hero of an SMP + full SMP grid
// ============================================================

// ── FILTER REGISTRY BY PAGE ──
function getPageShows() {
  const all = SHOW_REGISTRY;
  if (window.PAGE === 'films') return all.filter(s => s.type === 'Film' || s.type === 'Short');
  if (window.PAGE === 'shows') return all.filter(s => s.type === 'Series' && !(s.genres||[]).includes('SMP'));
  if (window.PAGE === 'smp')   return all.filter(s => (s.genres||[]).includes('SMP'));
  return all; // home
}

// ── BUILD CARD ──
function buildCard(s) {
  const isFilm = s.type === 'Film' || s.type === 'Short';
  const isSMP  = (s.genres||[]).includes('SMP');
  let typeLabel = s.type;
  let typeClass = isFilm ? 'card-type-film' : 'card-type-series';
  if (isSMP && s.type === 'Series') { typeLabel = 'SMP'; typeClass = 'card-type-smp'; }

  const a = document.createElement('a');
  a.className = 'card';
  a.href = s.file;
  a.innerHTML = `
    <div class="card-thumb">
      <img src="https://img.youtube.com/vi/${s.thumbYt}/mqdefault.jpg" alt="${s.title}" onerror="this.style.opacity=0" />
      <div class="play-overlay"><div class="play-circle">▶</div></div>
      ${s.badge ? `<div class="card-badge ${s.badge==='NEW'?'badge-new':'badge-hot'}">${s.badge}</div>` : ''}
      <div class="card-type-tag ${typeClass}">${typeLabel}</div>
    </div>
    <div class="card-info">
      <div class="card-title">${s.title}</div>
      <div class="card-sub">${s.seasons}</div>
    </div>`;
  return a;
}

// ── BUILD HERO ──
function buildHero(pageShows) {
  const mount = document.getElementById('hero-mount');
  if (!mount) return;
  const show = pageShows.find(s => s.featured) || pageShows[0] || null;
  if (!show) {
    mount.innerHTML = `<div class="empty-hero"><div class="empty-bg"></div><div class="empty-bg-overlay"></div><div class="empty-content"><div class="empty-logo">NET<span>INIMA</span></div><p class="empty-sub">No content here yet</p></div></div>`;
    return;
  }
  const isFilm = show.type === 'Film' || show.type === 'Short';
  const isSMP  = (show.genres||[]).includes('SMP');
  let typeBadgeClass = isFilm ? 'hero-type-film' : 'hero-type-series';
  let typeLabel = isFilm ? '🎬 Film' : '📺 Series';
  if (isSMP) { typeBadgeClass = 'hero-type-smp'; typeLabel = '⛏ SMP'; }
  const genres = (show.genres||[]).map(g=>`<span class="htag">${g}</span>`).join('');
  mount.innerHTML = `
    <section class="hero">
      <div class="hero-bg-img">
        <img src="https://img.youtube.com/vi/${show.thumbYt}/maxresdefault.jpg" alt="${show.title}"
          onerror="this.parentElement.style.display='none';document.querySelector('.hero-fallback').style.display='block'" />
      </div>
      <div class="hero-fallback"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">Now Streaming</div>
        <div class="hero-type-badge ${typeBadgeClass}">${typeLabel}</div>
        <h1 class="hero-title">${show.title}</h1>
        <div class="hero-meta">
          <span class="hdot"></span><span>${show.year}</span>
          <span class="hdot"></span><span>${show.seasons}</span>
          <span class="hdot"></span>${genres}
        </div>
        <p class="hero-desc">${show.heroDesc}</p>
        <div class="hero-btns">
          <a class="btn btn-primary" href="${show.file}">${isFilm?'▶&nbsp; Watch Now':'▶&nbsp; Play Now'}</a>
          <a class="btn btn-secondary" href="${show.file}">ℹ More Info</a>
        </div>
      </div>
    </section>`;
}

// ── BUILD TICKER ──
function buildTicker(shows) {
  const wrap = document.getElementById('ticker-wrap');
  if (!wrap || shows.length < 2) return;
  wrap.style.display = 'block';
  const inner = document.getElementById('ticker-inner');
  const items = shows.map(s => {
    const icon = (s.genres||[]).includes('SMP') ? '⛏' : (s.type==='Film' ? '🎬' : '📺');
    return `<span class="ticker-item"><span>${icon}</span>${s.title.toUpperCase()} · ${s.year}</span>`;
  });
  inner.innerHTML = [...items,...items].join('');
}

// ── BUILD STATS BAR ──
function buildStats(shows) {
  const bar = document.getElementById('stats-bar');
  if (!bar || shows.length < 2) return;
  bar.style.display = 'flex';

  if (window.PAGE === 'home') {
    const films  = SHOW_REGISTRY.filter(s => s.type==='Film'||s.type==='Short').length;
    const series = SHOW_REGISTRY.filter(s => s.type==='Series' && !(s.genres||[]).includes('SMP')).length;
    const smps   = SHOW_REGISTRY.filter(s => (s.genres||[]).includes('SMP')).length;
    bar.innerHTML = [
      ['stat-num-total',  SHOW_REGISTRY.length, 'Total'],
      ['stat-num-film',   films,                'Films'],
      ['stat-num-series', series,               'Shows'],
      ['stat-num-smp',    smps,                 'SMP'],
    ].map(([cls,n,l])=>`<div><div class="stat-num ${cls}">${n}</div><div class="stat-lbl">${l}</div></div>`).join('');
  } else {
    bar.innerHTML = `<div><div class="stat-num">${shows.length}</div><div class="stat-lbl">Titles</div></div>`;
  }
}

// ── BUILD GRID (used on category pages + home "All Shows") ──
function buildGrid(shows, isSearch=false) {
  const wrap  = document.getElementById('grid-wrap');
  const title = document.getElementById('grid-title');
  const back  = document.getElementById('search-back');
  if (!wrap) return;
  wrap.innerHTML = '';

  if (!isSearch) {
    const labels = { home:'All Shows', films:'All Films', shows:'All Series', smp:'All SMP' };
    const label  = labels[window.PAGE] || 'All Shows';
    title.textContent = shows.length > 1 ? `${label} (${shows.length})` : label;
    if (back) back.style.display = 'none';
  } else {
    if (back) back.style.display = 'inline';
  }

  if (!shows.length && isSearch) { wrap.innerHTML=`<div class="no-shows"><p>No results found.</p></div>`; return; }
  if (!shows.length) { wrap.innerHTML=`<div class="no-shows"><p>Nothing here yet.</p></div>`; return; }
  const grid = document.createElement('div');
  grid.className = 'shows-grid';
  shows.forEach(s => grid.appendChild(buildCard(s)));
  wrap.appendChild(grid);
}

// ── BUILD HOME ROWS (Films / Shows / SMP horizontal rows) ──
function buildHomeRows() {
  if (window.PAGE !== 'home') return;

  const films  = SHOW_REGISTRY.filter(s => s.type==='Film'||s.type==='Short');
  const series = SHOW_REGISTRY.filter(s => s.type==='Series' && !(s.genres||[]).includes('SMP'));
  const smps   = SHOW_REGISTRY.filter(s => (s.genres||[]).includes('SMP'));

  function fillRow(sectionId, rowId, list) {
    if (!list.length) return;
    const sec = document.getElementById(sectionId);
    const row = document.getElementById(rowId);
    if (!sec || !row) return;
    sec.style.display = 'block';
    list.forEach(s => row.appendChild(buildCard(s)));
  }

  fillRow('section-films',  'row-films',  films);
  fillRow('section-series', 'row-series', series);
  fillRow('section-smp',    'row-smp',    smps);
}

// ── SEARCH — scoped to this page's shows ──
function filterShows(q) {
  q = q.toLowerCase().trim();
  const scope = getPageShows();
  const results = !q ? scope : scope.filter(s =>
    s.title.toLowerCase().includes(q) ||
    (s.genres||[]).some(g => g.toLowerCase().includes(q)) ||
    s.type.toLowerCase().includes(q) ||
    s.year.includes(q)
  );
  const title = document.getElementById('grid-title');
  if (q && title) title.innerHTML = `Search: "<span style="color:var(--green)">${q}</span>" <span style="font-size:.8rem;color:var(--muted);font-family:var(--fm)">(${results.length} found)</span>`;
  buildGrid(results, q !== '');
  const url = new URL(window.location);
  if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
  window.history.replaceState({}, '', url);
}

function onSearchInput(input) {
  input.classList.toggle('has-value', input.value.length > 0);
  // on show pages, redirect to homepage search
  if (window.PAGE === undefined) {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const base  = depth <= 1 ? '' : '../'.repeat(depth - 1);
    if (input.value.trim().length >= 2) {
      clearTimeout(window._searchTimer);
      window._searchTimer = setTimeout(() => {
        window.location.href = `${base}index.html?q=${encodeURIComponent(input.value.trim())}`;
      }, 600);
    }
    return;
  }
  filterShows(input.value);
}

function clearSearch(e) {
  if (e) e.preventDefault();
  const inp = document.getElementById('nav-search-input');
  if (inp) { inp.value = ''; inp.classList.remove('has-value'); }
  filterShows('');
  const url = new URL(window.location);
  url.searchParams.delete('q');
  window.history.replaceState({}, '', url);
}

// ── MARK ACTIVE NAV ──
function markActiveNav() {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href') || '';
    if (window.PAGE === 'home'  && href.endsWith('index.html')) a.classList.add('active');
    if (window.PAGE === 'films' && href.endsWith('films.html')) a.classList.add('active');
    if (window.PAGE === 'shows' && href.endsWith('show.html'))  a.classList.add('active');
    if (window.PAGE === 'smp'   && href.endsWith('smp.html'))   a.classList.add('active');
  });
}

// ── INIT ──
(function init() {
  const pageShows = getPageShows();

  buildHero(pageShows);
  buildTicker(pageShows);
  buildStats(pageShows);
  buildHomeRows();   // only does anything on home
  buildGrid(pageShows);

  const yr = SHOW_REGISTRY.length
    ? Math.max(...SHOW_REGISTRY.map(s => parseInt(s.year)||2026))
    : new Date().getFullYear();
  const fc = document.getElementById('footer-copy');
  if (fc) fc.textContent = `© ${yr} Netinima · Not affiliated with Mojang or Microsoft`;

  // Handle ?q= redirect from show pages
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    const inp = document.getElementById('nav-search-input');
    if (inp) { inp.value = q; inp.classList.add('has-value'); }
    filterShows(q);
    setTimeout(() => {
      const el = document.getElementById('all-shows');
      if (el) el.scrollIntoView({behavior:'smooth'});
    }, 300);
  }

  markActiveNav();
})();

window.addEventListener('scroll', () =>
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 40)
);
