require('dotenv').config({ path: __dirname + '/SateliteFAA.env' });
const argv = require('yargs').argv;
const log = require('../Utils/logger');

const gutils = require("./utilidadesGenerales");
const controlerComandos = require("./controlerComandos");
const configGeneral = require("./config/general");

const appModules = require("./modules/appModules");


let parametros = appModules.init();

controlerComandos.procesarArchivo(parametros);