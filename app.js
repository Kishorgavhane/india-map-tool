// ============================================================
//  India Map Tool — app.js
//  Stack: Vanilla JS + Fuse.js + PptxGenJS + jsPDF + html2canvas
// ============================================================

// ── STATE ──
let selected = {};     // { stateName: { color, districts: Set } }
let showLabels = true;
let showLegend = true;
let autoFit   = true;
let fuse;

// Real map paths loaded from india-map-paths.js (extracted from PPT vector shapes)

// ── PRESETS ──
const PRESETS = {
  south:   ["Karnataka","Kerala","Tamil Nadu","Andhra Pradesh","Telangana","Goa","Puducherry"],
  north:   ["Delhi","Haryana","Punjab","Uttar Pradesh","Rajasthan","Himachal Pradesh","Uttarakhand","Jammu & Kashmir","Ladakh","Chandigarh"],
  west:    ["Gujarat","Maharashtra","Goa","Rajasthan","Dadra & Nagar Haveli"],
  east:    ["West Bengal","Odisha","Bihar","Jharkhand","Andaman & Nicobar Islands"],
  ne:      ["Assam","Arunachal Pradesh","Manipur","Meghalaya","Mizoram","Nagaland","Sikkim","Tripura"],
  central: ["Madhya Pradesh","Chhattisgarh","Jharkhand","Odisha","Bihar"],
  all:     Object.keys(INDIA_STATES),
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Init Fuse
  fuse = new Fuse(SEARCH_INDEX, {
    keys: ['name'],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  });

  renderStateList();

  // Close search dropdown on outside click
  document.addEventListener('click', e => {
    if (!document.getElementById('search-container').contains(e.target)) {
      closeSearch();
    }
  });
});

// ── SEARCH ──
function onSearch(q) {
  if (!q || q.length < 2) {
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-results').classList.remove('open');
    return;
  }
  const results = fuse.search(q).slice(0, 12);
  const el = document.getElementById('search-results');
  el.innerHTML = results.map(r => {
    const item = r.item;
    return `<div class="search-result-item" onclick="selectSearchResult('${escAttr(item.type)}','${escAttr(item.name)}','${escAttr(item.state)}')">
      <span class="result-type-badge ${item.type === 'state' ? 'badge-state' : 'badge-district'}">
        ${item.type === 'state' ? 'STATE' : 'DIST'}
      </span>
      <span class="result-name">${highlight(item.name, q)}</span>
      ${item.type === 'district' ? `<span class="result-parent">${item.state}</span>` : ''}
    </div>`;
  }).join('');
  el.classList.toggle('open', results.length > 0);
}

function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  return text.replace(re, '<mark style="background:#DBEAFE;color:#1E40AF;border-radius:2px;padding:0 1px">$1</mark>');
}

function openSearch() {
  const q = document.getElementById('search-input').value;
  if (q.length >= 2) onSearch(q);
}

function closeSearch() {
  document.getElementById('search-results').classList.remove('open');
}

function selectSearchResult(type, name, state) {
  closeSearch();
  document.getElementById('search-input').value = '';

  if (type === 'state') {
    addState(name);
  } else {
    // Add state if not exists, then toggle district
    if (!selected[state]) addState(state);
    // Toggle that specific district
    const sel = selected[state];
    if (sel.districts.has(name)) sel.districts.delete(name);
    else sel.districts.add(name);
    if (sel.districts.size === 0) { removeState(state); return; }
    renderStateList();
    renderMap();
    updateSelectionCount();
  }
  // Scroll to state in list
  setTimeout(() => {
    const el = document.querySelector(`[data-state="${CSS.escape(state || name)}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ── STATE MANAGEMENT ──
function addState(name) {
  if (!INDIA_STATES[name]) return;
  if (!selected[name]) {
    selected[name] = {
      color: INDIA_STATES[name].color,
      districts: new Set(INDIA_STATES[name].districts)
    };
  }
  renderStateList();
  renderMap();
  updateSelectionCount();
}

function removeState(name) {
  delete selected[name];
  renderStateList();
  renderMap();
  updateSelectionCount();
}

function toggleStateExpand(name) {
  const card = document.querySelector(`[data-state="${CSS.escape(name)}"]`);
  if (card) card.classList.toggle('expanded');
}

function toggleDistrict(state, district) {
  if (!selected[state]) return;
  const sel = selected[state];
  if (sel.districts.has(district)) sel.districts.delete(district);
  else sel.districts.add(district);
  if (sel.districts.size === 0) { removeState(state); return; }
  // Re-render district tags only
  renderDistrictTags(state);
  renderMap();
  updateSelectionCount();
}

function setAllDistricts(state, val) {
  if (!selected[state]) return;
  if (val) INDIA_STATES[state].districts.forEach(d => selected[state].districts.add(d));
  else { removeState(state); return; }
  renderDistrictTags(state);
  renderMap();
  updateSelectionCount();
}

function changeStateColor(state, color) {
  if (!selected[state]) return;
  selected[state].color = color;
  renderMap();
}

function clearAll() {
  selected = {};
  renderStateList();
  renderMap();
  updateSelectionCount();
  toast('Sab clear ho gaya', 'info');
}

// ── RENDER STATE LIST ──
function renderStateList() {
  const container = document.getElementById('state-list');
  const stateNames = Object.keys(INDIA_STATES);
  container.innerHTML = stateNames.map(name => {
    const data = INDIA_STATES[name];
    const isSelected = !!selected[name];
    const selCount = isSelected ? selected[name].districts.size : 0;
    const totalCount = data.districts.length;
    const color = isSelected ? selected[name].color : data.color;
    const isExpanded = isSelected; // auto-expand selected states

    return `<div class="state-card ${isSelected ? 'selected' : ''} ${isExpanded && isSelected ? 'expanded' : ''}" data-state="${escAttr(name)}">
      <div class="state-card-header" onclick="handleStateClick('${escAttr(name)}')">
        <div class="state-swatch" style="background:${color}" title="Change color">
          <input type="color" value="${color}" onchange="changeStateColor('${escAttr(name)}',this.value)" onclick="event.stopPropagation()">
        </div>
        <span class="state-card-name">${name}</span>
        <span class="state-card-count">${isSelected ? selCount + '/' : ''}${totalCount}</span>
        <div class="state-card-check">✓</div>
        <button class="state-remove-btn" onclick="event.stopPropagation(); removeState('${escAttr(name)}')" title="Remove">✕</button>
        ${isSelected ? '<span class="state-expand-icon">▼</span>' : ''}
      </div>
      ${isSelected ? `
      <div class="district-panel">
        <div class="district-controls">
          <button class="select-all-btn" onclick="setAllDistricts('${escAttr(name)}', true)">All</button>
          <button class="clear-btn" onclick="removeState('${escAttr(name)}')">None</button>
          <label style="font-size:11px;color:var(--muted);margin-left:auto">${selCount} selected</label>
        </div>
        <div class="district-tags" id="dtags-${sanitizeId(name)}">
          ${renderDistrictTagsHTML(name)}
        </div>
      </div>` : ''}
    </div>`;
  }).join('');
}

function handleStateClick(name) {
  if (selected[name]) {
    toggleStateExpand(name);
  } else {
    addState(name);
  }
}

function renderDistrictTagsHTML(state) {
  if (!selected[state]) return '';
  const sel = selected[state];
  const color = sel.color;
  return INDIA_STATES[state].districts.map(d => {
    const active = sel.districts.has(d);
    const style = active ? `background:${color};color:${getTextColor(color)}` : '';
    return `<span class="district-tag ${active ? 'active' : ''}" style="${style}"
      onclick="toggleDistrict('${escAttr(state)}','${escAttr(d)}')">${d}</span>`;
  }).join('');
}

function renderDistrictTags(state) {
  const el = document.getElementById(`dtags-${sanitizeId(state)}`);
  if (el) el.innerHTML = renderDistrictTagsHTML(state);
  // Update count label
  const card = document.querySelector(`[data-state="${CSS.escape(state)}"]`);
  if (card) {
    const countEl = card.querySelector('.state-card-count');
    const ctrlLabel = card.querySelector('.district-controls label');
    const cnt = selected[state] ? selected[state].districts.size : 0;
    if (countEl) countEl.textContent = `${cnt}/${INDIA_STATES[state].districts.length}`;
    if (ctrlLabel) ctrlLabel.textContent = `${cnt} selected`;
  }
}

// ── PRESETS ──
function preset(key) {
  selected = {};
  (PRESETS[key] || []).forEach(s => {
    if (INDIA_STATES[s]) {
      selected[s] = {
        color: INDIA_STATES[s].color,
        districts: new Set(INDIA_STATES[s].districts)
      };
    }
  });
  renderStateList();
  renderMap();
  updateSelectionCount();
  toast(`Preset applied: ${key}`, 'success');
}

// ── UPDATE HEADER COUNT ──
function updateSelectionCount() {
  const states = Object.keys(selected).length;
  const districts = Object.values(selected).reduce((s, v) => s + v.districts.size, 0);
  document.getElementById('sel-count').textContent = `${states} states · ${districts} districts`;
}

// ── TOGGLE OPTIONS ──
function toggleLabels() {
  showLabels = !showLabels;
  document.getElementById('labels-btn').classList.toggle('active', showLabels);
  renderMap();
}
function toggleLegend() {
  showLegend = !showLegend;
  document.getElementById('legend-btn').classList.toggle('active', showLegend);
  renderMap();
}
function toggleAutofit() {
  autoFit = !autoFit;
  document.getElementById('autofit-btn').classList.toggle('active', autoFit);
  renderMap();
}

// ── SVG MAP RENDER ──
function getOutputSize() {
  const v = document.getElementById('sz').value;
  const [w, h] = v.split('x').map(Number);
  return { w, h };
}

function renderMap() {
  const states = Object.keys(selected);
  const empty = document.getElementById('empty-state');
  const mapOut = document.getElementById('map-output');

  if (states.length === 0) {
    empty.style.display = 'block';
    mapOut.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  mapOut.style.display = 'block';
  mapOut.classList.remove('map-render-anim');
  void mapOut.offsetWidth;
  mapOut.classList.add('map-render-anim');

  const { w, h } = getOutputSize();
  const bgColor = document.querySelector('#bg-swatch input').value;
  const titleText = document.getElementById('title-input').value.trim();

  // ── Compute bounding box from REAL path data ──
  const PAD = 32;
  const titleH = titleText ? 52 : 0;
  const legW = showLegend && states.length <= 16 ? 165 : 0;

  // MAP_W / MAP_H = native size of extracted paths (860x980)
  const nativeW = window.MAP_W || 860;
  const nativeH = window.MAP_H || 980;

  // Find tight bbox of selected states only
  let minX = nativeW, minY = nativeH, maxX = 0, maxY = 0;
  states.forEach(st => {
    const stData = window.INDIA_MAP_PATHS && window.INDIA_MAP_PATHS[st];
    if (!stData) return;
    stData.s.forEach(shape => {
      const nums = shape.p.match(/[\d.]+,[\d.]+/g) || [];
      nums.forEach(coord => {
        const [x, y] = coord.split(',').map(Number);
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      });
    });
  });

  // Add padding around selection
  minX = Math.max(0, minX - PAD);
  minY = Math.max(0, minY - PAD);
  maxX = Math.min(nativeW, maxX + PAD);
  maxY = Math.min(nativeH, maxY + PAD);

  const dataW = maxX - minX || nativeW;
  const dataH = maxY - minY || nativeH;

  // Scale to fit output canvas
  const availW = w - PAD*2 - legW;
  const availH = h - PAD*2 - titleH;
  const scale = Math.min(availW / dataW, availH / dataH);

  // Center offset
  const offX = PAD + (availW - dataW * scale) / 2 - minX * scale;
  const offY = PAD + titleH + (availH - dataH * scale) / 2 - minY * scale;

  let svg = '';

  // Background
  svg += `<rect width="${w}" height="${h}" fill="${bgColor}"/>`;

  // Title
  if (titleText) {
    svg += `<text x="${f((w-legW)/2)}" y="34" font-family="'Plus Jakarta Sans',sans-serif" font-size="22" font-weight="800" fill="#0F172A" text-anchor="middle">${esc(titleText)}</text>`;
    svg += `<line x1="${f((w-legW)/2-120)}" y1="44" x2="${f((w-legW)/2+120)}" y2="44" stroke="#E2E8F0" stroke-width="1"/>`;
  }

  // ── Draw real map paths ──
  states.forEach(st => {
    const stPathData = window.INDIA_MAP_PATHS && window.INDIA_MAP_PATHS[st];
    if (!stPathData) return;

    const sel = selected[st];
    const stateColor = sel.color;
    const selSet = sel.districts;
    const allDistricts = INDIA_STATES[st].districts;

    stPathData.s.forEach(shape => {
      const distName = shape.n;
      // Match PPT names to district-data names (normalize spaces/case)
      const norm = s => s.toLowerCase().replace(/[\s\-\.&()]/g,'');
      const isSelected = selSet.has(distName) || [...selSet].some(d => norm(d) === norm(distName));

      // Transform path: scale + translate
      const transformedPath = shape.p.replace(/[\d.]+,[\d.]+/g, coord => {
        const [px, py] = coord.split(',').map(Number);
        const nx = f(px * scale + offX);
        const ny = f(py * scale + offY);
        return `${nx},${ny}`;
      });

      let fillColor;
      if (isSelected) {
        fillColor = stateColor;
      } else {
        // Dimmed — unselected district of a selected state
        fillColor = lighten(stateColor, 0.72);
      }

      const strokeColor = bgColor === '#ffffff' || bgColor === '#FFFFFF' ? 'white' : 'rgba(255,255,255,0.6)';
      svg += `<path d="${transformedPath}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="0.6" data-state="${esc(st)}" data-district="${esc(distName)}"/>`;

      // District label
      if (showLabels && isSelected) {
        // Find centroid of path bbox
        const nums = transformedPath.match(/[\d.]+,[\d.]+/g) || [];
        if (nums.length > 2) {
          let cx = 0, cy = 0;
          nums.forEach(c => { const [x,y] = c.split(',').map(Number); cx+=x; cy+=y; });
          cx /= nums.length; cy /= nums.length;
          const fs = Math.max(5, Math.min(10, scale * 8));
          const tc = getTextColor(fillColor);
          const short = distName.length > 11 ? distName.substring(0,10)+'…' : distName;
          if (fs >= 6) {
            svg += `<text x="${f(cx)}" y="${f(cy+2)}" font-family="'Plus Jakarta Sans',sans-serif" font-size="${f(fs)}" fill="${tc}" text-anchor="middle" dominant-baseline="middle" pointer-events="none" opacity="0.9">${esc(short)}</text>`;
          }
        }
      }
    });
  });

  // ── LEGEND ──
  if (showLegend && states.length > 0 && states.length <= 16) {
    const legItemH = 22;
    const legH = states.length * legItemH + 20;
    const legX = w - legW + 8;
    const legY = Math.max(titleH + 10, (h - legH) / 2);

    svg += `<rect x="${f(legX-4)}" y="${f(legY-8)}" width="${f(legW-8)}" height="${f(legH+8)}" rx="8" fill="white" stroke="#E2E8F0" stroke-width="1" opacity="0.95"/>`;

    states.forEach((st, i) => {
      const ly = legY + i * legItemH + 10;
      const c = selected[st].color;
      const cnt = selected[st].districts.size;
      svg += `<rect x="${f(legX+4)}" y="${f(ly-6)}" width="13" height="13" rx="3" fill="${c}" stroke="#E2E8F0" stroke-width="0.5"/>`;
      svg += `<text x="${f(legX+22)}" y="${f(ly+3)}" font-family="'Plus Jakarta Sans',sans-serif" font-size="10.5" fill="#334155">${esc(st.length>15?st.substring(0,14)+'…':st)} <tspan fill="#94A3B8">(${cnt})</tspan></text>`;
    });
  }

  // Set SVG
  const svgEl = document.getElementById('map-svg');
  svgEl.setAttribute('width', w);
  svgEl.setAttribute('height', h);
  svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svgEl.innerHTML = svg;

  // Preview scale
  if (autoFit) {
    const wrap = document.getElementById('canvas-wrap');
    const avW = wrap.clientWidth - 40;
    const avH = wrap.clientHeight - 40;
    const sc = Math.min(avW/w, avH/h, 1);
    document.getElementById('map-output').style.transform = `scale(${sc})`;
  } else {
    document.getElementById('map-output').style.transform = '';
  }
}

// ── EXPORT: PNG ──
async function exportPNG() {
  if (!Object.keys(selected).length) { toast('Koi state select karo!', 'error'); return; }
  showLoading(true);
  toast('PNG export ho raha hai…', 'info');
  try {
    const canvas = await svgToCanvas(2);
    const a = document.createElement('a');
    a.download = `india-map-${Date.now()}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
    toast('PNG download ho gayi ✓', 'success');
  } catch(e) { toast('Error: ' + e.message, 'error'); }
  finally { showLoading(false); }
}

// ── EXPORT: PDF ──
async function exportPDF() {
  if (!Object.keys(selected).length) { toast('Koi state select karo!', 'error'); return; }
  showLoading(true);
  toast('PDF ban raha hai…', 'info');
  try {
    const { w, h } = getOutputSize();
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: w > h ? 'l' : 'p',
      unit: 'px',
      format: [w, h],
      hotfixes: ['px_scaling']
    });
    const canvas = await svgToCanvas(1);
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, w, h);
    pdf.save(`india-map-${Date.now()}.pdf`);
    toast('PDF download ho gayi ✓', 'success');
  } catch(e) { toast('Error: ' + e.message, 'error'); }
  finally { showLoading(false); }
}

// ── EXPORT: PPT (PptxGenJS — fully client-side, no PHP!) ──
async function exportPPT() {
  if (!Object.keys(selected).length) { toast('Koi state select karo!', 'error'); return; }
  showLoading(true);
  toast('PPT ban raha hai…', 'info');
  try {
    const { w, h } = getOutputSize();
    const canvas = await svgToCanvas(2);
    const imgData = canvas.toDataURL('image/png');

    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'CUSTOM', width: w/96, height: h/96 });
    pptx.layout = 'CUSTOM';

    const slide = pptx.addSlide();

    // Background
    slide.background = { color: document.querySelector('#bg-swatch input').value.replace('#','') };

    // Add map image
    slide.addImage({
      data: imgData,
      x: 0, y: 0,
      w: w/96, h: h/96
    });

    // Title if set
    const titleText = document.getElementById('title-input').value.trim();
    if (titleText) {
      slide.addText(titleText, {
        x: 0.2, y: 0.1,
        w: w/96 - 0.4, h: 0.5,
        align: 'center',
        fontSize: 20, bold: true, color: '0F172A'
      });
    }

    await pptx.writeFile({ fileName: `india-map-${Date.now()}.pptx` });
    toast('PPT download ho gayi ✓', 'success');
  } catch(e) { toast('Error: ' + e.message, 'error'); }
  finally { showLoading(false); }
}

// ── SVG → CANVAS ──
async function svgToCanvas(scale = 1) {
  const { w, h } = getOutputSize();
  const svgEl = document.getElementById('map-svg');
  const svgStr = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'">' +
    svgEl.innerHTML + '</svg>';

  const blob = new Blob([svgStr], {type: 'image/svg+xml'});
  const url = URL.createObjectURL(blob);

  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = w * scale; c.height = h * scale;
      const ctx = c.getContext('2d');
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      res(c);
    };
    img.onerror = rej;
    img.src = url;
  });
}

// ── HELPERS ──
function f(n) { return isFinite(n) ? n.toFixed(2) : '0'; }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escAttr(s) { return String(s).replace(/'/g, "\\'"); }
function sanitizeId(s) { return s.replace(/[^a-zA-Z0-9]/g, '_'); }

function getTextColor(hex) {
  try {
    const r = parseInt(hex.slice(1,3),16)/255;
    const g = parseInt(hex.slice(3,5),16)/255;
    const b = parseInt(hex.slice(5,7),16)/255;
    const lum = 0.2126*r + 0.7152*g + 0.0722*b;
    return lum > 0.45 ? '#1E293B' : '#FFFFFF';
  } catch { return '#1E293B'; }
}

function lighten(hex, amt) {
  try {
    let r = parseInt(hex.slice(1,3),16);
    let g = parseInt(hex.slice(3,5),16);
    let b = parseInt(hex.slice(5,7),16);
    r = Math.round(r + (255-r)*amt);
    g = Math.round(g + (255-g)*amt);
    b = Math.round(b + (255-b)*amt);
    return `#${[r,g,b].map(v=>Math.min(255,v).toString(16).padStart(2,'0')).join('')}`;
  } catch { return hex; }
}

function tintColor(hex, i, total) {
  // Alternate between slightly lighter/darker shades
  const shifts = [0, 12, -8, 18, -15, 8, -12, 20, -6, 15];
  const shift = shifts[i % shifts.length];
  try {
    let r = parseInt(hex.slice(1,3),16);
    let g = parseInt(hex.slice(3,5),16);
    let b = parseInt(hex.slice(5,7),16);
    r = Math.max(0, Math.min(255, r + shift));
    g = Math.max(0, Math.min(255, g + shift));
    b = Math.max(0, Math.min(255, b + shift));
    return `#${[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')}`;
  } catch { return hex; }
}

function showLoading(v) {
  document.getElementById('loading-bar').style.display = v ? 'block' : 'none';
}

// ── TOAST ──
function toast(msg, type = 'info') {
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icons = { success:'✓', error:'✕', info:'ℹ' };
  el.innerHTML = `<span>${icons[type]||'ℹ'}</span> ${msg}`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

// Trigger initial empty render
renderMap();
