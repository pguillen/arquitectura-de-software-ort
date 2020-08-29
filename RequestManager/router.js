require('dotenv').config({ path: __dirname + '/RequestManager.env' });
const log = require("../Utils/logger");
const express = require('express');
const bodyParser = require('body-parser')
const bullArena = require('./bull-arena')
const app = express();

//app.use(bodyParser.json()) // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({
//   limit: '50mb',
//   extended: true,
//   parameterLimit:50000
// }));
// app.use((req, res, next) => {
//   log.info(JSON.stringify(req.body));
//   next();
// })

const router = require('./routes/v1');

app.use('/api/v1/', router);
app.use(bullArena);

module.exports = app;