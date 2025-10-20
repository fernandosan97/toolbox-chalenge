function parseCsvContent(content, fileName) {
  const lines = content.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return { file: fileName, lines: [] };

  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    if (row.length < 4) continue;
    const [f, text, numberStr, hex] = row.map(s => s.trim());
    const number = Number(numberStr);
    if (!f || !text || Number.isNaN(number) || !hex) continue;
    out.push({ text, number, hex });
  }

  return { file: fileName, lines: out };
}

module.exports = {
  parseCsvContent
};
