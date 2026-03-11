// ============================================================
//  NETINIMA — SHOW REGISTRY
//  ============================================================
//  This is the ONLY file you edit to add/remove shows from
//  the homepage. The homepage reads this automatically.
//
//  TO ADD A SHOW:    Copy one object below and fill it in.
//  TO REMOVE A SHOW: Delete its object from the array.
//  TO SET THE HERO:  Set  featured: true  on one show.
//
//  FIELDS:
//    id        → unique slug, should match your filename (no .html)
//    file      → path to show page from root  e.g. 'shows/my-show.html'
//    title     → full show title
//    year      → release year string  e.g. '2026'
//    type      → 'Series' | 'Film' | 'Short'
//    seasons   → 'Film' | 'Short' | '1 Season' | '2 Seasons' etc.
//    episodes  → '4:22' (runtime for films) | '7 Episodes' (for series)
//    runtime   → '4:22' | '11 min avg'
//    views     → '12 views' | '1.5M views'
//    stars     → '★★★★★'
//    rating    → '9.0'
//    badge     → 'NEW' | 'HOT' | ''   (empty = no badge)
//    genres    → array of strings  e.g. ['Action', 'Comedy']
//    thumbYt   → YouTube video ID used for the card/hero thumbnail
//    heroDesc  → 1–2 sentence hook shown on hero banner
//    featured  → true | false  (first true entry = hero)
//
//  COMMON MISTAKES:
//    ✗  seasons: '1'           →  ✓  seasons: '1 Season'
//    ✗  episodes: '7'          →  ✓  episodes: '7 Episodes'
//    ✗  title: 'Class of '25'  →  ✓  title: "Class of '25"
// ============================================================

const SHOW_REGISTRY = [

  {
    id:       'ghost-rider',
    file:     'shows/ghost-rider.html',
    title:    'GHOST RIDER Appears?!',
    year:     '2026',
    type:     'Film',
    seasons:  'Film',
    episodes: '4:13',
    runtime:  '4:13',
    views:    '0 views',
    stars:    '★★★★★',
    rating:   '9.0',
    badge:    'NEW',
    genres:   ['Action', 'Comedy'],
    thumbYt:  'jEGOMYHFFMw',
    heroDesc: 'Chapter Plus brings the Ghost Rider to Minecraft in this wild short film.',
    featured: true,
  },

  {
    id:       'dragon-egg',
    file:     'shows/dragon-egg.html',
    title:    'The Search for the Dragon Egg',
    year:     '2026',
    type:     'Film',
    seasons:  'Film',
    episodes: '4:22',
    runtime:  '4:22',
    views:    '12 views',
    stars:    '★★★★★',
    rating:   '9.0',
    badge:    '',
    genres:   ['Action', 'Adventure', 'Comedy'],
    thumbYt:  'OG1c3D0N2WY',
    heroDesc: 'DuckLeader_ goes on an adventure to find a dragon egg — cuz y not.',
    featured: false,
  },

  {
    id:       'class-25',
    file:     'shows/class-of-25.html',
    title:    "Class of '25",
    year:     '2025',
    type:     'Series',
    seasons:  '1 Season',
    episodes: '7 Episodes',
    runtime:  '11 min avg',
    views:    '0 views',
    stars:    '★★★★★',
    rating:   '9.0',
    badge:    'HOT',
    genres:   ['Drama', 'Comedy', 'School'],
    thumbYt:  'TA6L9-k7KHg',
    heroDesc: 'A Minecraft high school drama from Cratin Studios — femboys, drama, and chaos.',
    featured: false,
  },

  {
    id:       'echo-smp',
    file:     'shows/echo-smp.html',
    title:    'Echo SMP',
    year:     '2025',
    type:     'Series',
    seasons:  '1 Season',
    episodes: '5 Episodes',
    runtime:  '33 min avg',
    views:    '0 views',
    stars:    '★★★★★',
    rating:   '9.0',
    badge:    '',
    genres:   ['Adventure', 'SMP', 'Survival'],
    thumbYt:  'IsKOKpHXz8E',
    heroDesc: 'nemonlad uncovers the truth on a hardcore SMP — and nothing is what it seems.',
    featured: false,
  },

  {
    id:       'MidgetAndGiant(OMGThereisMidgetinthis)-not-gonna-lie-just-want-to-see-URL-Limit-At-This-Point',
    file:     'shows/MidgetAndGiant(OMGThereisMidgetinthis)-not-gonna-lie-just-want-to-see-URL-Limit-At-This-Point.html',
    title:    'Midgets and Giants',
    year:     '2015',
    type:     'Film',
    seasons:  'Film',
    episodes: '9:24',
    runtime:  '9:24',
    views:    '30K views',
    stars:    '★★★★',
    rating:   '9.0',
    badge:    '',
    genres:   ['Action', 'Fantasy'],
    thumbYt:  'OG1c3D0N2WY',
    heroDesc: "I don't really know",
    featured: false,
  },

  // ── ADD YOUR NEXT SHOW BELOW ──
  // {
  //   id:       'your-show-id',
  //   file:     'shows/your-show.html',
  //   title:    'Your Show Title',
  //   year:     '2026',
  //   type:     'Series',
  //   seasons:  '1 Season',
  //   episodes: '6 Episodes',
  //   runtime:  '15 min avg',
  //   views:    '0 views',
  //   stars:    '★★★★★',
  //   rating:   '9.0',
  //   badge:    'NEW',
  //   genres:   ['Adventure', 'Drama'],
  //   thumbYt:  'YOUR_YOUTUBE_ID',
  //   heroDesc: 'A short punchy description.',
  //   featured: false,
  // },

];
