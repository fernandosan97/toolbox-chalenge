const axios = require('axios');

const API_BASE = 'https://echo-serv.tbxnet.com/v1/secret';
const API_AUTH = 'Bearer aSuperSecretKey';

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

async function fetchFileList() {
  const res = await axios.get(`${API_BASE}/files`, { headers: { authorization: API_AUTH } });
  return res.data;
}

async function fetchFileContent(fileName) {
  const url = `${API_BASE}/file/${fileName}`;
  try {
    const res = await axios.get(url, { headers: { authorization: API_AUTH } });
    return res.data;
  } catch (err) {
    throw new Error(`Failed to fetch file ${fileName}: ${err.response?.status || err.message}`);
  }
}

module.exports = {
  fetchFileList,
  fetchFileContent,
  parseCsvContent
};