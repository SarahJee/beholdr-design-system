// Beholdr working file: swap old type styles for the new responsive ones
// Run in the WORKING file (not the library), with Scripter.
// Before you run it: publish the library and accept its updates in this file.
// What it does:
//   1. Finds every text layer using an old Desktop / Tablet / Mobile library style
//      (including old names like "D Body/Bold" or "DeskT Heading/h6").
//   2. Swaps it for the new single style (Body/Bold, Heading/h6...).
//   3. Sets the Responsive mode so sizes stay the same: each top-level frame gets the
//      device most of its text was using, and any layer that differs gets its own mode.
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
};
const PREFIX: any = { 'Desktop': 'Desktop', 'DeskT': 'Desktop', 'D': 'Desktop', 'Tablet': 'Tablet', 'T': 'Tablet', 'Mobile': 'Mobile', 'M': 'Mobile' };

const report: any = { overrides: 0, swapped: 0, framesSet: 0, layersPinned: 0, unmapped: {} };

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
    const segs = t.textStyleId === figma.mixed
      ? t.getStyledTextSegments(['textStyleId']).map(s => ({ start: s.start, end: s.end, id: s.textStyleId }))
      : [{ start: 0, end: t.characters.length, id: t.textStyleId }];
    const hits: any[] = [];
    for (const sg of segs) { const h = await lookup(sg.id as string); if (h) hits.push({ start: sg.start, end: sg.end, device: h.device, style: h.style }); }
    if (!hits.length) continue;
    jobs.push({ t, hits, mixed: t.textStyleId === figma.mixed });
    if (!hits.some(h => h.end - h.start < t.characters.length) && hits.length === 1) {
      const old: any = await figma.getStyleByIdAsync(t.textStyleId as string);
      if (old && (t.fontSize !== old.fontSize || JSON.stringify(t.fontName) !== JSON.stringify(old.fontName) || JSON.stringify(t.lineHeight) !== JSON.stringify(old.lineHeight))) report.overrides++;
    }
    const top = topFrame(t);
    const v = votes.get(top) || { Desktop: 0, Tablet: 0, Mobile: 0 };
    v[hits[0].device]++;
    votes.set(top, v);
  }

  // Pass 2: set each top-level frame to its main device
  const frameDevice: any = new Map();
  for (const [top, v] of votes) {
    const device = ['Desktop', 'Tablet', 'Mobile'].sort((a, b) => v[b] - v[a])[0];
    const current = top.resolvedVariableModes && top.resolvedVariableModes[responsive.id];
    if (current !== modeId[device] && setMode(top, device)) report.framesSet++;
    frameDevice.set(top, device);
  }

  // Pass 3: swap styles, pinning any layer whose device differs from its frame
  for (const job of jobs) {
    const t = job.t;
    const device = job.hits[0].device;
    if (device !== frameDevice.get(topFrame(t)) && setMode(t, device)) report.layersPinned++;
    if (DRY_RUN) { report.swapped++; continue; }
    for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f);
    if (job.mixed) {
      for (const h of job.hits) await t.setRangeTextStyleIdAsync(h.start, h.end, h.style.id);
    } else {
      await t.setTextStyleIdAsync(job.hits[0].style.id);
    }
    report.swapped++;
  }
}

print(DRY_RUN ? 'TRIAL RUN, nothing changed. This is what it would do:' : 'Done.');
print('Text layers swapped: ' + report.swapped + ' | Frames set to a device: ' + report.framesSet + ' | Layers given their own device: ' + report.layersPinned);
print('Layers with hand-made size, font or line-height tweaks on top of their style (these get reset to the style): ' + report.overrides);
const un = Object.keys(report.unmapped);
if (un.length) print('Styles not recognised (left as they were): ' + un.map(n => n + ' (' + report.unmapped[n] + ')').join(', '));
