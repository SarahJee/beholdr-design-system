// Beholdr working file: swap old type styles for the new responsive ones
// Run in the WORKING file (not the library), with Scripter.
// Before you run it: publish the library and accept its updates in this file.
// What it does:
//   1. Finds every text layer using an old Desktop / Tablet / Mobile library style
//      (including old names like "D Body/Bold" or "DeskT Heading/h6").
//   2. Swaps it for the new single style (Body/Bold, Heading/h6...).
//   3. Sets the Responsive mode so sizes stay the same: each top-level frame gets the
//      device most of its text was using, and any layer that differs gets its own mode.
//   4. Italic (slanted) words, like artwork titles, are put back after the swap.
//   5. Headings with a dotted underline (h3, h4, h5) move to Link/h3, Link/h4, Link/h5.
//      Any other underline added by hand (on an h2, say) is put back after the swap.
// It skips text inside component instances (the library handles those) and deletes nothing.
// Save a version first (File > Save to version history).

const NEW_KEYS: any = {
  'Heading/Display 1': '8fda866b8f400cd3ff4dc1d9dc07991fa4891f7e',
  'Heading/Display 2': 'b9043e05f3807b2bb0a001a2a5ea3783202401c9',
  'Heading/h1': '74a83aa4bafd6ebb2d5b3d8953892c09898af121',
  'Heading/h2': 'a762d4a6c2418d7f3ad85639b2ae41981b54e56f',
  'Heading/h3': '760c81c376cfe742596b57ddcc384dfecceb3759',
  'Heading/h4': 'acc983c59728993c5ef9fed394b805ba9ebb11b6',
  'Heading/h5': '7a068448aaec762dae9f24421fdaaff660b3adbf',
  'Heading/h6': '00d05abaa5a4d4b0f0fd717091885d5e97de91e2',
  'Body/Regular': 'ce02f60e0ac4383cb50133e179b628b863e90311',
  'Body/Bold': '53c87e1eb83076e62e79e3ee63859ceb4b3ca6ce',
  'Body/Small': 'd92b57635469c4a76f5ba0820d77d8b27083aaab',
  'Body/Small Bold': 'b623d8456f97b774488824a0916a19d7c9e5a5a6',
  'Body/XS': '6d3835d612ac102a71d24de37dfbbed1d937ff46',
  'Body/Large': 'fafd69dec6014db3ac6e7fedd92f21dc7a126e8f',
  'Body/Large Bold': '4699697709bc95a417c59ef8ff401f3fb5d506a3',
  'Body/XL': '15707dc20403ba43561caa6765e1a7c0f65bb55d',
  'Link/Regular': 'ca8a8c0dfd6ce20616889eb8138b8ca242908c09',
  'Link/Large': '4ca838c8cbdf5a186a4009aff14af303a2ac8977',
  'Link/Small': '8131b776e8150caa4b5a61a18ea58f431d79af45',
  'Button/Text': '6afa10229f6f6c423feab9bb631f7078d34bf820',
  'Link/h3': '5b4bf7c9df572413b6805e7c234b44800c7dee94',
  'Link/h4': '3ad3ea1ccac32c2888a99a0e21a07f8610b635d0',
  'Link/h5': 'f80a1100c7683a087884e518597f0c218880b264',
};
// Leave as true for a trial run that changes nothing and just reports. Set to false to do it.
const DRY_RUN = true;

const RESPONSIVE_VAR_KEY = 'be9f602109098ac1578168d813630ff319c1f57c';

// Old name (after the device prefix) -> new style name
const MAP: any = {
  'Heading/h1 Display': 'Heading/Display 1',
  'Heading/h2 Display': 'Heading/Display 2',
  'Heading/h1': 'Heading/h1', 'Heading/h2': 'Heading/h2', 'Heading/h3': 'Heading/h3',
  'Heading/h4': 'Heading/h4', 'Heading/h5': 'Heading/h5', 'Heading/h6': 'Heading/h6',
  'Body/XL': 'Body/XL', 'Body/Large': 'Body/Large', 'Body/Large Bold': 'Body/Large Bold',
  'Body/Regular': 'Body/Regular', 'Body/Bold': 'Body/Bold', 'Body/Regular Bold': 'Body/Bold',
  'Body/Small': 'Body/Small', 'Body/Small Bold': 'Body/Small Bold', 'Body/XS': 'Body/XS',
  'Link/Large': 'Link/Large', 'Link/Regular': 'Link/Regular', 'Link/R': 'Link/Regular',
  'Link/Small': 'Link/Small', 'Link/Button Text': 'Button/Text',
  'Link/h3 Link': 'Link/h3', 'Link/h4 Link': 'Link/h4', 'Link/h5 Link': 'Link/h5',
};
const PREFIX: any = { 'Desktop': 'Desktop', 'DeskT': 'Desktop', 'D': 'Desktop', 'Tablet': 'Tablet', 'T': 'Tablet', 'Mobile': 'Mobile', 'Mob': 'Mobile', 'M': 'Mobile' };

const report: any = { framesWanted: 0, pinsWanted: 0, italicsKept: 0, toLinkStyle: 0, underlinesKept: 0, overrideList: [], overrides: 0, swapped: 0, framesSet: 0, layersPinned: 0, unmapped: {} };

// New styles and the Responsive collection, from the library
const newStyle: any = {};
for (const name of Object.keys(NEW_KEYS)) newStyle[name] = await figma.importStyleByKeyAsync(NEW_KEYS[name]);
const rv = await figma.variables.importVariableByKeyAsync(RESPONSIVE_VAR_KEY);
const responsive = await figma.variables.getVariableCollectionByIdAsync(rv.variableCollectionId);
const modeId: any = {};
for (const m of responsive.modes) modeId[m.name] = m.modeId;

// Work out what an old style id maps to (cached)
const cache: any = {};
async function lookup(id: string) {
  if (!id || typeof id !== 'string') return null;
  if (id in cache) return cache[id];
  let hit = null;
  const s = await figma.getStyleByIdAsync(id);
  if (s) {
    const name = s.name.replace(/^\*+/, '').trim();
    const m = name.match(/^(\S+) (.+)$/);
    if (m && PREFIX[m[1]] && MAP[m[2]]) hit = { device: PREFIX[m[1]], style: newStyle[MAP[m[2]]] };
    else if (!NEW_KEYS[name]) report.unmapped[s.name] = (report.unmapped[s.name] || 0) + 1;
  }
  cache[id] = hit;
  return hit;
}

// h3/h4/h5 from an old or new heading style name, else null
const lvCache: any = {};
async function headingLevel(id: string) {
  if (!id || typeof id !== 'string') return null;
  if (id in lvCache) return lvCache[id];
  const st = await figma.getStyleByIdAsync(id);
  const m = st ? st.name.match(/Heading\/(h[345])$/) : null;
  lvCache[id] = m ? m[1] : null;
  return lvCache[id];
}

function insideInstance(n: any) {
  let p = n.parent;
  while (p && p.type !== 'PAGE') { if (p.type === 'INSTANCE') return true; p = p.parent; }
  return false;
}
function topFrame(n: any) {
  let p = n;
  while (p.parent && p.parent.type !== 'PAGE') p = p.parent;
  return p;
}
function setMode(node: any, device: string) {
  if (DRY_RUN) return true;
  try { node.setExplicitVariableModeForCollection(responsive, modeId[device]); return true; } catch (e) { return false; }
}

for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  const texts = page.findAllWithCriteria({ types: ['TEXT'] }).filter(t => !insideInstance(t));

  // Pass 1: what each text layer maps to, and which device each top-level frame mostly uses
  const jobs: any[] = [];
  const votes: any = new Map();
  for (const t of texts) {
    const DEC: any = ['textStyleId', 'textDecoration', 'textDecorationStyle', 'textDecorationOffset', 'textDecorationThickness', 'textDecorationColor'];
    let segs: any[];
    try { segs = t.getStyledTextSegments(DEC); } catch (e) { segs = t.getStyledTextSegments(['textStyleId']); }
    const hits: any[] = [];
    for (const sg of segs) {
      const dotted = sg.textDecoration === 'UNDERLINE' && sg.textDecorationStyle === 'DOTTED';
      let h = await lookup(sg.textStyleId as string);
      let device = h ? h.device : null;
      let style = h ? h.style : null;
      // Dotted-underlined h3/h4/h5 (old or new style) go to the matching Link style
      const lv = await headingLevel(sg.textStyleId as string);
      if (dotted && lv && newStyle['Link/' + lv]) { style = newStyle['Link/' + lv]; report.toLinkStyle++; }
      if (!style) continue;
      // Keep a hand-made underline when the new style has none
      const keep = sg.textDecoration && sg.textDecoration !== 'NONE' && style.textDecoration === 'NONE'
        ? { d: sg.textDecoration, ds: sg.textDecorationStyle, off: sg.textDecorationOffset, th: sg.textDecorationThickness, col: sg.textDecorationColor } : null;
      hits.push({ start: sg.start, end: sg.end, device, style, keep });
    }
    if (!hits.length) continue;
    const italics: any[] = [];
    if (t.fontName === figma.mixed) {
      for (const fs of t.getStyledTextSegments(['fontName'])) {
        const fn: any = fs.fontName;
        if (/slant|italic|oblique/i.test(fn.style) || (fn.variationSettings && fn.variationSettings.ital)) italics.push({ start: fs.start, end: fs.end, font: fn });
      }
    }
    jobs.push({ t, hits, italics, mixed: hits.length > 1 || hits[0].end - hits[0].start < t.characters.length });
    if (!hits.some(h => h.end - h.start < t.characters.length) && hits.length === 1) {
      const old: any = await figma.getStyleByIdAsync(t.textStyleId as string);
      if (old && (t.fontSize !== old.fontSize || (t.fontName !== figma.mixed && JSON.stringify(t.fontName) !== JSON.stringify(old.fontName)) || JSON.stringify(t.lineHeight) !== JSON.stringify(old.lineHeight))) { report.overrides++; report.overrideList.push(page.name + ' > ' + topFrame(t).name + ' > "' + t.characters.slice(0, 30) + '" (' + old.name + ')'); }
    }
    const dev = (hits.find(h => h.device) || {}).device;
    if (dev) {
      const top = topFrame(t);
      const v = votes.get(top) || { Desktop: 0, Tablet: 0, Mobile: 0 };
      v[dev]++;
      votes.set(top, v);
    }
  }

  // Load every font these layers use before changing anything (Figma needs this)
  if (!DRY_RUN) {
    const seen: any = {};
    for (const job of jobs) for (const f of job.t.getRangeAllFontNames(0, job.t.characters.length)) {
      const k = JSON.stringify(f);
      if (!seen[k]) { seen[k] = true; await figma.loadFontAsync(f); }
    }
  }

  // Pass 2: set each top-level frame to its main device
  const frameDevice: any = new Map();
  for (const [top, v] of votes) {
    const device = ['Desktop', 'Tablet', 'Mobile'].sort((a, b) => v[b] - v[a])[0];
    const current = top.resolvedVariableModes && top.resolvedVariableModes[responsive.id];
    if (current !== modeId[device]) { report.framesWanted++; if (setMode(top, device)) report.framesSet++; }
    frameDevice.set(top, device);
  }

  // Pass 3: swap styles, pinning any layer whose device differs from its frame
  for (const job of jobs) {
    const t = job.t;
    const device = (job.hits.find((h: any) => h.device) || {}).device;
    if (device && device !== (frameDevice.get(topFrame(t)) || 'Desktop')) { report.pinsWanted++; if (setMode(t, device)) report.layersPinned++; }
    for (const h of job.hits) if (h.keep) report.underlinesKept++;
    report.italicsKept += job.italics.length;
    if (DRY_RUN) { report.swapped++; continue; }
    if (job.mixed) {
      for (const h of job.hits) await t.setRangeTextStyleIdAsync(h.start, h.end, h.style.id);
    } else {
      await t.setTextStyleIdAsync(job.hits[0].style.id);
    }
    for (const it of job.italics) t.setRangeFontName(it.start, it.end, it.font);
    for (const h of job.hits) {
      if (!h.keep) continue;
      t.setRangeTextDecoration(h.start, h.end, h.keep.d);
      try {
        if (h.keep.ds) t.setRangeTextDecorationStyle(h.start, h.end, h.keep.ds);
        if (h.keep.off) t.setRangeTextDecorationOffset(h.start, h.end, h.keep.off);
        if (h.keep.th) t.setRangeTextDecorationThickness(h.start, h.end, h.keep.th);
        if (h.keep.col) t.setRangeTextDecorationColor(h.start, h.end, h.keep.col);
      } catch (e) {}
    }
    report.swapped++;
  }
}

print(DRY_RUN ? 'TRIAL RUN, nothing changed. This is what it would do:' : 'Done.');
print('Text layers swapped: ' + report.swapped + ' | Frames set to a device: ' + report.framesSet + ' (of ' + report.framesWanted + ') | Layers given their own device: ' + report.layersPinned + ' (of ' + report.pinsWanted + ')');
print('Dotted-underlined h3, h4 and h5 moving to the Link styles: ' + report.toLinkStyle + ' | Hand-made underlines kept after the swap: ' + report.underlinesKept + ' | Italic words kept: ' + report.italicsKept);
print('Layers with hand-made size, font or line-height tweaks on top of their style (these get reset to the style): ' + report.overrides);
if (report.overrideList.length) print(report.overrideList.join('\n'));
const un = Object.keys(report.unmapped);
if (un.length) print('Styles not recognised (left as they were): ' + un.map(n => n + ' (' + report.unmapped[n] + ')').join(', '));
