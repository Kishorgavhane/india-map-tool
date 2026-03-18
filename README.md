# 🗺️ India District Map Tool

> Search any state or district → select → export as PNG / PDF / PPT

**Live:** [map.irt.co.in](https://map.irt.co.in) &nbsp;|&nbsp; **Dev:** GitHub Pages

---

## Stack
| Layer | Tech |
|---|---|
| UI | HTML5 + Tailwind CSS |
| Search | Fuse.js (fuzzy) |
| Map | Pure SVG |
| Export PPT | PptxGenJS (client-side) |
| Export PDF | jsPDF + html2canvas |
| Hosting | GitHub Pages → Hostinger |

## Data
- **781 districts** across 36 States/UTs
- Sources: PPT + LGD (lgdirectory.gov.in) + Gazette 2020–23
- All corrections documented in `district-data.js`

## Local Dev
```bash
# Koi build step nahi — seedha open karo
open index.html
# Ya live server use karo
npx serve .
```

## Deploy
Push to `main` → GitHub Actions → GitHub Pages auto deploy.

## Folder Structure
```
india-map-tool/
├── index.html          # Main app
├── app.js              # All logic (Fuse, render, export)
├── district-data.js    # Verified district data
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD
```
