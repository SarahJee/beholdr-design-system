// Beholdr type collapse
// Run in the Beholdr Design System library file, with the Scripter plugin.
// What it does:
//   1. Reads your 59 Desktop / Tablet / Mobile text styles.
//   2. Writes their sizes, line heights and letter spacing into the Responsive
//      variables (Desktop / Tablet / Mobile modes), adding any that are missing.
//   3. Creates 20 single styles (Heading/h1, Body/Regular, Link/Small, Button/Text...)
//      bound to those variables and to your Fonts weights.
//   4. Swaps every text layer in this file from an old style to its new one,
//      and pins Tablet or Mobile mode where a layer was using a Tablet or Mobile style.
//   5. Leaves the old styles in place, marked "Replaced by ...", so nothing breaks.
// It deletes nothing. Save a version first (File > Save to version history).

const DEVICES = ['Desktop', 'Tablet', 'Mobile'];

// Old style name (after the device prefix) -> new style
const MAP: any = {
  'Heading/h1 Display': ['Heading/Display 1', 'display-1'],
  'Heading/h2 Display': ['Heading/Display 2', 'display-2'],
  'Heading/h1': ['Heading/h1', 'h1'],
  'Heading/h2': ['Heading/h2', 'h2'],
  'Heading/h3': ['Heading/h3', 'h3'],
  'Heading/h4': ['Heading/h4', 'h4'],
  'Heading/h5': ['Heading/h5', 'h5'],
  'Heading/h6': ['Heading/h6', 'h6'],
  'Body/XL': ['Body/XL', 'body-xl'],
  'Body/Large': ['Body/Large', 'body-lg'],
  'Body/Large Bold': ['Body/Large Bold', 'body-lg-bold'],
  'Body/Regular': ['Body/Regular', 'body'],
  'Body/Bold': ['Body/Bold', 'body-bold'],
  'Body/Regular Bold': ['Body/Bold', 'body-bold'],
  'Body/Small': ['Body/Small', 'body-sm'],
  'Body/Small Bold': ['Body/Small Bold', 'body-sm-bold'],
  'Body/XS': ['Body/XS', 'body-xs'],
  'Link/Large': ['Link/Large', 'link-lg'],
  'Link/Regular': ['Link/Regular', 'link'],
  'Link/R': ['Link/Regular', 'link'],
  'Link/Small': ['Link/Small', 'link-sm'],
  'Link/Button Text': ['Button/Text', 'button'],
};

const report: any = { styles: 0, varsCreated: 0, swapped: 0, modesPinned: 0, skipped: [] };

// ---------- 1. Read old styles ----------
const oldStyles = await figma.getLocalTextStylesAsync();
const groups: any = {}; // key -> { newName, byDevice: { Desktop: style, ... } }
const oldToKey: any = {}; // old style id -> { key, device }
for (const s of oldStyles) {
  const m = s.name.match(/^(Desktop|Tablet|Mobile) (.+)$/);
  if (!m) continue;
  const device = m[1];
  const rest = m[2];
  const target = MAP[rest];
  if (!target) { report.skipped.push(s.name); continue; }
  const newName = target[0];
  const key = target[1];
  groups[key] = groups[key] || { newName, byDevice: {} };
  if (!groups[key].byDevice[device]) groups[key].byDevice[device] = s;
  oldToKey[s.id] = { key, device };
}

// Load every font the old styles use
const fontKeys = new Set<string>();
for (const s of oldStyles) fontKeys.add(JSON.stringify(s.fontName));
for (const f of fontKeys) await figma.loadFontAsync(JSON.parse(f));

// ---------- 2. Responsive variables ----------
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const responsive = collections.find(c => c.name === 'Responsive');
const fontsCol = collections.find(c => c.name === 'Fonts');
if (!responsive) throw new Error('No "Responsive" variable collection found.');
const modeId: any = {};
for (const md of responsive.modes) modeId[md.name] = md.modeId;
for (const d of DEVICES) if (!modeId[d]) throw new Error('Responsive collection is missing a ' + d + ' mode.');
const allVars = await figma.variables.getLocalVariablesAsync();
const varByName: any = {};
for (const v of allVars) if (v.variableCollectionId === responsive.id) varByName[v.name] = v;
const weightVars: any = {};
for (const v of allVars) if (fontsCol && v.variableCollectionId === fontsCol.id) weightVars[v.id] = v;

function getVar(name, scope) {
  let v = varByName[name];
  if (!v) { v = figma.variables.createVariable(name, responsive, 'FLOAT'); varByName[name] = v; report.varsCreated++; }
  v.scopes = [scope];
  return v;
}
const px = (ls, size) => ls.unit === 'PERCENT' ? Math.round(ls.value * size) / 100 : ls.value;
const lh = (l, size) => l.unit === 'PIXELS' ? l.value : l.unit === 'PERCENT' ? Math.round(l.value * size) / 100 : Math.round(size * 1.2);

// ---------- 3. New styles ----------
const newStyleByKey: any = {};
const existingNew: any = {};
for (const st of oldStyles) existingNew[st.name] = st;
for (const key of Object.keys(groups)) {
  const g = groups[key];
  const base = g.byDevice.Desktop || g.byDevice.Tablet || g.byDevice.Mobile;
  const sizeV = getVar('type/' + key + '/size', 'FONT_SIZE');
  const lineV = getVar('type/' + key + '/line-height', 'LINE_HEIGHT');
  const lsV = getVar('type/' + key + '/letter-spacing', 'LETTER_SPACING');
  for (const d of DEVICES) {
    const s = g.byDevice[d] || (d === 'Tablet' ? g.byDevice.Desktop : null) || base;
    sizeV.setValueForMode(modeId[d], s.fontSize);
    lineV.setValueForMode(modeId[d], lh(s.lineHeight, s.fontSize));
    lsV.setValueForMode(modeId[d], px(s.letterSpacing, s.fontSize));
  }
  let ns = existingNew[g.newName];
  if (!ns) { ns = figma.createTextStyle(); ns.name = g.newName; }
  ns.fontName = base.fontName;
  ns.fontSize = base.fontSize;
  ns.lineHeight = { unit: 'PIXELS', value: lh(base.lineHeight, base.fontSize) };
  ns.letterSpacing = { unit: 'PIXELS', value: px(base.letterSpacing, base.fontSize) };
  ns.textCase = base.textCase;
  ns.textDecoration = base.textDecoration;
  ns.setBoundVariable('fontSize', sizeV);
  ns.setBoundVariable('lineHeight', lineV);
  ns.setBoundVariable('letterSpacing', lsV);
  const w = base.boundVariables && base.boundVariables.fontWeight;
  if (w && weightVars[w.id]) ns.setBoundVariable('fontWeight', weightVars[w.id]);
  ns.description = 'Responsive: sizes come from the Responsive variables. Set the Desktop, Tablet or Mobile mode on the frame (components do this through their Device variant).';
  newStyleByKey[key] = ns;
  report.styles++;
  for (const d of DEVICES) { const o = g.byDevice[d]; if (o) o.description = 'Replaced by ' + g.newName + '. Safe to delete once nothing uses it.'; }
}

// ---------- 4. Swap text layers ----------
function insideInstance(n) { let p = n.parent; while (p && p.type !== 'PAGE' && p.type !== 'DOCUMENT') { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; }
function pinMode(node, device) {
  const want = modeId[device];
  const current = node.resolvedVariableModes && node.resolvedVariableModes[responsive.id];
  if (current === want) return;
  let target = node;
  while (target) {
    try { target.setExplicitVariableModeForCollection(responsive, want); report.modesPinned++; return; } catch (e) { target = target.parent; if (!target || target.type === 'PAGE') return; }
  }
}
for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  const texts = page.findAllWithCriteria({ types: ['TEXT'] }).filter(t => !insideInstance(t));
  for (const t of texts) {
    for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f);
    if (t.textStyleId === figma.mixed) {
      for (const seg of t.getStyledTextSegments(['textStyleId'])) {
        const hit = oldToKey[seg.textStyleId];
        if (!hit) continue;
        await t.setRangeTextStyleIdAsync(seg.start, seg.end, newStyleByKey[hit.key].id);
        if (hit.device !== 'Desktop') pinMode(t, hit.device);
        report.swapped++;
      }
    } else {
      const hit = oldToKey[t.textStyleId];
      if (!hit) continue;
      if (hit.device !== 'Desktop') pinMode(t, hit.device);
      await t.setTextStyleIdAsync(newStyleByKey[hit.key].id);
      report.swapped++;
    }
  }
}

print('Done.');
print('New styles: ' + report.styles + ' | Variables added: ' + report.varsCreated + ' | Text layers swapped: ' + report.swapped + ' | Tablet/Mobile modes pinned: ' + report.modesPinned);
if (report.skipped.length) print('Not mapped (left as they were): ' + report.skipped.join(', '));
