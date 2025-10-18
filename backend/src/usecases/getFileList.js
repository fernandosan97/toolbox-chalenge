const { fetchFileList } = require('../services/externalApiService');

async function getFileList() {
  return await fetchFileList();
}

module.exports = getFileList;