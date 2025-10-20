# Quick Start Guide - Zero Waste Indonesia Prototype

## ⚡ Get Running in 3 Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React 18 + React DOM
- React Router DOM (routing)
- MapLibre GL (mapping)
- Lucide React (icons)
- Tailwind CSS (styling)
- Vite (build tool)

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 3. Explore!

Navigate through:
- **Home** (`/`) - Overview with featured content
- **Map** (`/map`) - Interactive Indonesia map with filters
- **Resources** (`/resources`) - Browse and filter resources
- **Campaigns** (`/campaigns`) - Active and past campaigns
- **Events** (`/events`) - Upcoming and past events
- **Calculator** (`/calculator`) - Waste impact calculator
- **About** (`/about`) - Project information

---

## 🎨 Key Features to Test

### Language Switch
Click the **EN/ID** button in the header to switch between English and Indonesian.

### Map & Directory
1. Go to `/map`
2. Use filters on the left (entry type, search, verified only)
3. Click map markers to see details
4. Click "Get Directions" to open Google Maps

### Calculator
1. Go to `/calculator`
2. Adjust population, waste per capita, diversion rates
3. Modify waste composition sliders
4. View results update in real-time
5. Click Share (copies URL) or Download (saves JSON)

### Resources
1. Go to `/resources`
2. Use filters (topic, year, format, access type)
3. Toggle between grid and list views
4. Click resources to open in new tab

---

## 📁 Project Structure Overview

```
zwi-proto/
├── src/
│   ├── components/     # 15 reusable components
│   ├── routes/         # 7 page components
│   ├── lib/            # Utilities (i18n, hooks, calc, utils)
│   └── styles/         # Tailwind + brand tokens
├── public/
│   └── mock/           # 7 JSON data files
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md           # Full documentation
```

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Build
npm run build            # Build for production (outputs to dist/)

# Preview
npm run preview          # Preview production build locally
```

---

## 🎯 Mock Data Files

All data lives in `/public/mock/`:

- `organizations.json` - 5 verified organizations (YPBB, Waste4Change, etc.)
- `initiatives.json` - 4 community initiatives
- `directory.json` - 10 locations (MRFs, composting, refill stations, etc.)
- `resources.json` - 8 reports, toolkits, and guides
- `campaigns.json` - 6 campaigns (Plastic-Free July, EPR, etc.)
- `events.json` - 7 events (conferences, workshops, clean-ups)
- `calculator.config.json` - Default values and emission factors

You can edit these files directly to test different data scenarios.

---

## 🌐 Testing Bilingual Support

1. Click **EN/ID** in the header
2. Check that:
   - Navigation labels change
   - Section titles change
   - Button text changes
   - Date formats change (English vs. Indonesian locale)

Language preference is stored in `localStorage` and persists across sessions.

---

## 🗺️ Map Testing Notes

- The map uses **MapLibre GL** with a free tile service (no API key needed)
- Default bounds: Indonesia (95°E to 141°E, 11°S to 6°N)
- Markers are color-coded and clickable
- "Get Directions" opens Google Maps with lat/lng

---

## 🧮 Calculator Testing

Try these scenarios:

**Baseline (Indonesia defaults)**
- Population: 277,500,000
- Waste per capita: 0.7 kg/day
- Current diversion: 12%
- Target diversion: 12%

**Ambitious scenario**
- Target diversion: 50%
- Increase organics composition
- Observe: emissions avoided, jobs created

**Share feature**
- Adjust parameters
- Click Share
- Open copied URL in new tab → parameters restored

---

## 🚀 Next Steps

### For Development

1. **Customize mock data** - Edit JSON files in `/public/mock/`
2. **Adjust branding** - Modify CSS variables in `src/styles/globals.css`
3. **Add images** - Place in `/public/images/` and reference in mock data

### For Production

1. **Connect to Supabase**
   - Uncomment `src/lib/supabaseClient.js`
   - Replace `useMockData.js` hooks with real queries
   - Add `.env` with Supabase credentials

2. **Deploy**
   - Build: `npm run build`
   - Deploy `dist/` folder to Netlify, Vercel, or any static host

3. **Optimize**
   - Add real images (WebP format)
   - Set up analytics (Plausible, Fathom)
   - Add service worker (optional)

---

## 🐛 Troubleshooting

### Map not loading?
- Check browser console for errors
- MapLibre GL loads lazily - give it a moment
- Try refreshing the page

### Data not showing?
- Verify JSON files exist in `/public/mock/`
- Check browser Network tab for 404s
- Ensure JSON files are valid (no trailing commas)

### Build errors?
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Make sure you're using Node.js 16+

---

## 💡 Tips

- **Fast refresh** - Edits to components hot-reload instantly
- **Tailwind IntelliSense** - Install the VS Code extension for autocomplete
- **Component library** - All reusable components are in `src/components/`
- **Routing** - Add new routes in `src/App.jsx` and create pages in `src/routes/`

---

## 📚 Learn More

- [Full README](./README.md) - Comprehensive documentation
- [Vite Docs](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Routing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MapLibre GL](https://maplibre.org/) - Mapping

---

## ✅ Checklist

After running `npm install` and `npm run dev`, verify:

- [ ] Homepage loads with hero and featured sections
- [ ] Navigation works (all 7 routes accessible)
- [ ] Language switch toggles EN/ID
- [ ] Map loads with Indonesia bounds and markers
- [ ] Resources page shows 8 resources with filters
- [ ] Calculator accepts inputs and displays results
- [ ] Events show upcoming and past, grouped by month
- [ ] Campaigns display with status badges
- [ ] About page loads with contact info

---

**You're all set!** 🎉

Start exploring or jump into `src/routes/Home.jsx` to see how it all fits together.

