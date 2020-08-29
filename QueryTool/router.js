require('dotenv').config({ path: __dirname + '/QueryTool.env' });
const express = require('express');
const app = express();

const router = require('./routes/v1');
app.use('/api/v1/', router);

module.exports = app;