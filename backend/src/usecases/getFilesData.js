const { fetchFileList, fetchFileContent, parseCsvContent } = require('../services/externalApiService');

async function getFilesData({ fileName } = {}) {
  const list = await fetchFileList();
  if (!list || !Array.isArray(list.files)) return [];
  const filesToProcess = fileName ? [fileName] : list.files;
  const results = await Promise.all(
    filesToProcess.map(async (f) => {
      try {
        const content = await fetchFileContent(f);
        return parseCsvContent(content, f);
      } catch (err) {
        console.error(`Error fetching file ${f}: ${err.message}`);
        return null;
      }
    })
  );
  return results.filter(Boolean);
}

module.exports = getFilesData;