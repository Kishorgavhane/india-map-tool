# 🗺️ India District Map Tool

Pick states or districts, colour them, and export a clean map as PDF, PNG, SVG, PowerPoint or Word. It runs in the browser, so there is nothing to install.

**Live:** map.irt.co.in

## How to use
1. Tick a state, or open it and tick single districts. The zone buttons (Northern, Central...) select a whole zone.
2. Check the **Export preview** tab. Set the title, page size, orientation, map size and label size there.
3. Pick a format and press **Export**.

Use *Shades per state* in Colours when you pick more than one state. *PowerPoint (editable shapes)* gives you slides you can still edit.

## Files in this repo
- `index.html` - the whole app
- `india-map-paths.js` - the map data (36 states and UTs)
- `.github/workflows/deploy.yml` - publishes the site on GitHub Pages

## Updating
Edit a file, commit, push to `main`. The site updates in a minute or two.

To fix a district name, find the `AL` list in `index.html`. Each line looks like `Maharashtra:Aurangabad>Sambhaji Nagar`.

## Known gaps
- Rajasthan still has the older 2023 districts. Nine were abolished in Dec 2024 and show a warning sign in the list.
- Some newer districts are missing from the map data (Vav-Tharad, Maihar, Mauganj, Pandhurna, newer Ladakh districts).
- One Assam shape has no name.
- PDF, PNG and Word hold an image. SVG and editable PowerPoint stay sharp at any size.
