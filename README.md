# Zero Waste Indonesia (zwi-proto)

A lightweight, modern React prototype for the Zero Waste Indonesia country microsite under Zero Waste Asia.

## Features

- 🗺️ **Interactive Map & Directory** - Browse verified waste management facilities, organizations, and initiatives across Indonesia
- 📚 **Resource Library** - Access reports, toolkits, guides, and research supporting zero waste transitions
- 🎯 **Campaigns** - Discover and join active zero waste campaigns
- 📅 **Events** - Find upcoming workshops, conferences, and community gatherings
- 🧮 **Waste Calculator** - Model waste scenarios and estimate impact of diversion programs
- 🌐 **Bilingual** - Switch between English and Indonesian (Bahasa Indonesia)
- ♿ **Accessible** - Keyboard navigable, semantic HTML, ARIA labels, WCAG AA+ contrast

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18 (JavaScript, no TypeScript)
- **Styling**: Tailwind CSS + CSS variables for brand tokens
- **Routing**: React Router DOM v6
- **Map**: MapLibre GL (no API key required)
- **Icons**: Lucide React
- **State**: React hooks only (no Redux)
- **Fonts**: Schibsted Grotesk (Google Fonts)

## Project Structure

```
zwi-proto/
├── public/
│   └── mock/                        # Mock JSON data files
│       ├── organizations.json
│       ├── initiatives.json
│       ├── directory.json
│       ├── resources.json
│       ├── campaigns.json
│       ├── events.json
│       └── calculator.config.json
├── src/
│   ├── components/                  # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Section.jsx
│   │   ├── Card.jsx
│   │   ├── ResourceCard.jsx
│   │   ├── CampaignCard.jsx
│   │   ├── EventCard.jsx
│   │   ├── Spotlight.jsx
│   │   ├── Filters.jsx
│   │   ├── MapView.jsx
│   │   ├── DirectoryList.jsx
│   │   ├── CalculatorPanel.jsx
│   │   ├── CalculatorResults.jsx
│   │   └── LangSwitch.jsx
│   ├── routes/                      # Page components
│   │   ├── Home.jsx
│   │   ├── MapDirectory.jsx
│   │   ├── Resources.jsx
│   │   ├── Campaigns.jsx
│   │   ├── Events.jsx
│   │   ├── Calculator.jsx
│   │   └── About.jsx
│   ├── lib/                         # Utilities and helpers
│   │   ├── i18n.js                  # Bilingual dictionary (EN/ID)
│   │   ├── useMockData.js           # Mock data hooks
│   │   ├── calc.js                  # Calculator math functions
│   │   ├── utils.js                 # General helpers
│   │   └── supabaseClient.js        # Placeholder for future Supabase integration
│   ├── styles/
│   │   └── globals.css              # Tailwind + brand tokens
│   ├── App.jsx                      # Root component with router
│   └── main.jsx                     # Entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Routes

- `/` - Home (hero, featured campaigns, resources, events, spotlight)
- `/map` - Map & Directory (interactive map with filters)
- `/resources` - Resource Library (filterable grid/list)
- `/campaigns` - Campaigns (featured + archive)
- `/events` - Events (upcoming + past, grouped by month)
- `/calculator` - Waste Calculator (inputs, results, share/download)
- `/about` - About (credits, contact, methodology)

## Branding

### Color Tokens (CSS Variables)

```css
--zwa-bg: #0b1b13;           /* Dark green background */
--zwa-ink: #0f1720;          /* Text */
--zwa-surface: #12281d;      /* Surface/card backgrounds */
--zwa-primary: #1abc9c;      /* Teal (primary CTA) */
--zwa-primary-ink: #0e3b33;  /* Dark teal */
--zwa-accent: #7bd389;       /* Soft green (accent) */
--zwa-muted: #94a3b8;        /* Muted text */
--zwa-border: #1f3b2d;       /* Border color */
```

### Typography

- **Font**: Schibsted Grotesk (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## Internationalization

The app supports English and Indonesian. Language is stored in `localStorage` and can be toggled via the language switch in the header.

Translation keys are defined in `src/lib/i18n.js`.

## Mock Data

All data is currently served from static JSON files in `/public/mock/`. These files contain sample Indonesian organizations, initiatives, directory entries, resources, campaigns, events, and calculator configuration.

### Replacing with Real Data

To connect to Supabase or another backend:

1. Uncomment and configure `src/lib/supabaseClient.js`
2. Replace `useMockData.js` hooks with real API calls
3. Update `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Accessibility

- Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Skip-to-content link
- ARIA labels on interactive elements
- Keyboard navigable (tab, enter, arrow keys)
- Focus-visible rings (Tailwind `focus-visible:` utilities)
- WCAG AA+ color contrast
- Alt text on images
- Respects `prefers-reduced-motion`

## Calculator

The waste calculator estimates:

- **Total waste generated** (tonnes/year)
- **Diversion vs. disposal** (based on target diversion rate)
- **Emissions avoided** (tCO₂e, using stream-specific factors)
- **Jobs created** (estimated using international coefficients)

Users can adjust:
- Population
- Waste generation per capita
- Current and target diversion rates
- Waste composition (organics, paper, plastics, metals, glass, others)

Results can be shared via URL query params or downloaded as JSON.

## Map

The map uses **MapLibre GL** with a free tile service (no API key required). It is lazy-loaded on the `/map` route for performance.

**Default bounds**: Indonesia (zoom ~5)

**Features**:
- Filter by entry type (MRF, composting, refill, collection point, reuse center, policy site, landfill, incinerator, other)
- Search by name, city, or province
- Toggle "verified only"
- Click markers for popups with name, type, status, and "Get Directions" link (opens Google Maps)
- Results list syncs with map bounds

## Performance

- Minimal dependencies (no heavy UI libraries)
- Lazy-loading of MapLibre GL
- Images with `loading="lazy"`, width/height attributes
- Efficient re-renders (React hooks, no unnecessary state)
- Small bundle size (~150 KB gzipped)

## Contributing

This is a prototype. For production deployment:

1. Replace mock data with real backend (Supabase recommended)
2. Add authentication (if needed for contributions)
3. Set up CI/CD (GitHub Actions + Netlify/Vercel)
4. Add analytics (privacy-respecting, e.g. Plausible)
5. Optimize images (WebP, srcset)
6. Add service worker for offline support (optional)

## License

MIT License (or adjust as appropriate for Zero Waste Asia / GAIA AP)

## Credits

Developed for **Zero Waste Asia** by **GAIA Asia Pacific** in collaboration with community partners across Indonesia.

**Contact**: indonesia@zerowaste.asia

---

Built with ❤️ for a waste-free future.

