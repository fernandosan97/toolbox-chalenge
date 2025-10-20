const axios = require('axios');

const API_BASE = 'https://echo-serv.tbxnet.com/v1/secret';
const API_AUTH = 'Bearer aSuperSecretKey';

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
  fetchFileContent
};