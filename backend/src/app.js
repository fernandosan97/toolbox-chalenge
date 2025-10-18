const express = require('express');
const cors = require('cors');
const filesController = require('./controllers/filesController');

const app = express();

app.use(cors());

app.get('/files/data', filesController.data);
app.get('/files/list', filesController.list);

module.exports = app;
