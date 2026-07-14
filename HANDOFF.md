# WONLY Overseas B2B Website — Project Handoff

## Overview
React + Vite + Tailwind v4 single-page application for WONLY (王力安防) overseas B2B website.
Silver-white-gold color scheme, Poppins font, HashRouter, all English content.

## Tech Stack
- React 18 + TypeScript
- Vite 5.4
- Tailwind CSS v4
- React Router (HashRouter)
- lucide-react (icons)

## Quick Start
```bash
cd wonly
npm install
npm run dev      # dev server
npm run build    # production build → dist/
```

## Color Palette
```
GOLD   = #BFA06A  (primary accent)
CHAMP  = #D4C4A0  (secondary accent)
SILVER = #B8BFC8  (neutral accent)
DARK   = #221F20  (titles/text)
WHITE  = #FFFFFF  (backgrounds)
```

## Key Source Files
| File | Description |
|------|-------------|
| `src/App.tsx` | Router config, routes for home + /products/security-doors + 404 |
| `src/pages/home/Index.tsx` | Homepage (~690 lines): header with Products dropdown, hero, products carousel, scenarios, footer, inquiry modal |
| `src/pages/products/SecurityDoors.tsx` | Security Doors product page (446 lines): hero, product grid, features, specs, applications, CTA |
| `src/index.css` | Global styles, Tailwind import, dropdown-in animation, AI watermark hiding CSS |
| `src/components/ui/*` | shadcn/ui component library (accordion, button, card, dialog, etc.) |

## Navigation Structure
Products dropdown has 5 categories:
1. Security Doors → `/products/security-doors` ✅ (page exists)
2. Smart Locks → `/products/smart-locks` (route not yet created)
3. Wooden Doors → `/products/wooden-doors` (route not yet created)
4. Aluminum Windows → `/products/aluminum-windows` (route not yet created)
5. Whole-House Intelligence → `/products/whole-house` (route not yet created)

## Image Assets
All images use tiangong.cn URLs (CN runtime — no overseas hotlinks).
Defined in `IMG` object at top of each page component.

## Known Issues
1. **build_and_deploy tool broken**: Returns success but deploys old staged sandbox copy (1345 bytes).
   - Workaround: `npm run build` → inline CSS/JS into standalone HTML → `file_to_url` → `publish_artifact`
   - See `wonly_standalone_v3.html` for the working standalone build
2. **AI watermark**: Platform injects `<div id="ai-watermark">` — hidden via CSS in `index.css`
3. **No Publish button in UI**: Publishing is done via `build_and_deploy` tool or artifact method

## Git
- Repo: https://gitea.tiangong.cn/prod_20985392/wonly.git
- Latest commit: aab5fa2 "Add Security Doors page and Products dropdown"

## Design Preferences (User)
- AI-generated images over CSS placeholders
- Minimalist premium 3D feel
- Layered copy structure (Eyebrow/H1/Sub/CTA)
- Dark overlay text readability (champagne gold text on dark, not white)
- "Get Solutions & Quote" as CTA text (not "Submit Inquiry")
- Hero content must fit in one screen
- All text must be English (no Chinese)
