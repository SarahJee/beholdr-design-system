// Beholdr: add heading link styles (Link/h3, Link/h4, Link/h5)
// Run in the LIBRARY file, with Scripter. Safe to run more than once.
// Each new style copies its heading (Heading/h3, h4, h5), is bound to the same
// Responsive and Fonts variables, and adds an underline.
// Figma's plugin API can't save the dotted part in a style, so the script tries,
// then tells you if you need to set it by hand.

const LEVELS = ['h3', 'h4', 'h5'];
const all = await figma.getLocalTextStylesAsync();
const byName: any = {};
for (const s of all) byName[s.name] = s;

const results: string[] = [];
let dottedSaved = true;

for (const lv of LEVELS) {
  const src = byName['Heading/' + lv];
  if (!src) { results.push('Heading/' + lv + ' not found, skipped'); continue; }
  await figma.loadFontAsync(src.fontName);

  const name = 'Link/' + lv;
  const st: any = byName[name] || figma.createTextStyle();
  st.name = name;
  st.fontName = src.fontName;
  st.fontSize = src.fontSize;
  st.lineHeight = src.lineHeight;
  st.letterSpacing = src.letterSpacing;
  st.textCase = src.textCase;
  st.textDecoration = 'UNDERLINE';

  // Same variables as the heading
  const b: any = src.boundVariables || {};
  for (const field of ['fontSize', 'lineHeight', 'letterSpacing', 'fontWeight']) {
    if (b[field]) st.setBoundVariable(field, await figma.variables.getVariableByIdAsync(b[field].id));
  }

  // Dotted, 7% thick, 15% offset: only works if your Figma version allows it on styles
  try {
    st.textDecorationStyle = 'DOTTED';
    st.textDecorationThickness = { unit: 'PERCENT', value: 7 };
    st.textDecorationOffset = { unit: 'PERCENT', value: 15 };
    if (st.textDecorationStyle !== 'DOTTED') dottedSaved = false;
  } catch (e) { dottedSaved = false; }

  st.description = 'Heading ' + lv + ' as a link: dotted underline, 7% thick, 15% offset. Sizes follow the Responsive variables, like Heading/' + lv + '.';
  results.push((byName[name] ? 'Updated ' : 'Created ') + name);
}

print(results.join('\n'));
print(dottedSaved
  ? 'Dotted underline saved in the styles.'
  : 'Underline added, but Figma would not save "dotted" in the style. Set it by hand: edit each Link style > Type details (the sliders icon) > Decoration > dotted, thickness 7%, offset 15%.');
