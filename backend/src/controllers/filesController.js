const getFileList = require('../usecases/getFileList');
const getFilesData = require('../usecases/getFilesData');

async function list(req, res) {
  try {
    const list = await getFileList();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function data(req, res) {
  try {
    const { fileName } = req.query;
    const data = await getFilesData({ fileName });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  list,
  data
};