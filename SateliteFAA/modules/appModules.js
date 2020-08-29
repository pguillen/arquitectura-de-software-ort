require('dotenv').config({ path: __dirname + '/SateliteFAA.env' });
const log = require('../../Utils/logger');
const fs = require('fs');
const http = require('http');
const readline = require('readline');
const stream = require('stream');
const argv = require('yargs').argv;
const gutils = require("../utilidadesGenerales");
const configGeneral = require("../config/general");



const init = () => {

    let parametro = {
        COMMANDS_PATH_FILE: "",
        AIRLINE_PATH_FILE: "",
        AIRPORT_PATH_FILE: "",
        FLIGTS_PATH_FILE: ""
    }

    try {

        const nombreSatelite = `SateliteFAA_${gutils.TimeStamp()}_${gutils.RandomID()}`;

        log.verbose('\033[2J');
        const v8 = require('v8');
        log.verbose("*".repeat(107));
        log.verbose(`Total heap size (bytes) ${v8.getHeapStatistics().total_available_size}, (GB ~ ${(v8.getHeapStatistics().total_available_size / 1024 / 1024 / 1024).toFixed(2)})`);
        log.verbose(`ENV WINSTON_LEVEL: ${process.env.WINSTON_LEVEL}`);
        log.verbose("*".repeat(107));

        if (process.env.MODO == 'DEV') {
            log.info('*'.repeat(110));
            log.info(`Inicio Satelite: ${nombreSatelite}`);
            log.info('*'.repeat(110));
            log.info("Argumentos: ");
            log.info(JSON.stringify(argv));
            log.info('*'.repeat(110));
        }


        if (!argv.COMANDS_PATH) {
            argv.COMANDS_PATH = "D:\\";
            argv.COMANDS_PATH = process.env.COMANDS_PATH ? process.env.COMANDS_PATH : configGeneral.COMMANDS_PATH_FILE;
            log.warn(`Se ASUME que el archivo de comandos se encuentra en: '${argv.COMANDS_PATH}', puede señalar el archivo con el parametro: '--COMANDS_PATH'`);
        }
        else {
            log.info(`Archivo de comandos: '${argv.COMANDS_PATH}'`);
        }

        parametro.COMMANDS_PATH_FILE = argv.COMANDS_PATH;
        if (!fs.existsSync(parametro.COMMANDS_PATH_FILE))
            throw new Error(`No se encontro el archivo: '${parametro.COMMANDS_PATH_FILE}', puede señalar la ubicación con el parametro: '--COMANDS_PATH'`);

        if (!argv.DATA_PATH) {
            argv.DATA_PATH = process.env.DATA_PATH ? process.env.DATA_PATH : "D:\\";
            log.warn(`appModules => Se ASUME que el directorio con las fuentes de datos 'archivos .csv' se encuentran en: '${argv.DATA_PATH}', puede señalar el directorio raíz con el parametro: '--DATA_PATH'`);
        }
        else {
            log.info(`Directorio con fuente de datos (archivos .csv): '${argv.DATA_PATH}'`);
        }

        parametro.AIRLINE_PATH_FILE = argv.DATA_PATH + "\\airlines.csv";
        parametro.AIRPORT_PATH_FILE = argv.DATA_PATH + "\\airports.csv";
        parametro.FLIGTS_PATH_FILE = argv.DATA_PATH  + "\\flights.csv";

        let nombreArchivoFaltante;
        if (!fs.existsSync(parametro.AIRLINE_PATH_FILE))
            nombreArchivoFaltante = parametro.AIRLINE_PATH_FILE
        if (!fs.existsSync(parametro.AIRPORT_PATH_FILE))
            nombreArchivoFaltante = parametro.AIRPORT_PATH_FILE
        if (!fs.existsSync(parametro.FLIGTS_PATH_FILE))
            nombreArchivoFaltante = parametro.FLIGTS_PATH_FILE

        if (nombreArchivoFaltante)
            throw new Error(`No se encontro el archivo: '${nombreArchivoFaltante}', puede señalar el directorio raíz con el parametro: '--DATA_PATH'`);
        else {
            log.info('*'.repeat(110));
            log.info(`Las fuente de datos se encuentran en:`);
            log.info(`\t${parametro.AIRLINE_PATH_FILE}`);
            log.info(`\t${parametro.AIRPORT_PATH_FILE}`);
            log.info(`\t${parametro.FLIGTS_PATH_FILE}`);
            log.info('*'.repeat(110));
        }

    } catch (e) {
        log.error(`SateliteFAA.app.init: ${e} `);
        throw e;
    }

    log.info(`Retorno Parametro: ${JSON.stringify(parametro)}`);

    return parametro;
}

const getFileDataPath = (pComando, pParametro) =>
{
    let retorno;
    switch ( pComando.table.toLowerCase()) {
        case 'airlines':
            retorno = pParametro.AIRLINE_PATH_FILE;
            break;
        case 'airports':
            retorno = pParametro.AIRPORT_PATH_FILE;
            break;
        case 'flights':
            retorno = pParametro.FLIGTS_PATH_FILE;
            break;
        default:
            throw new Error(`El nombre: ${name} no es soportado, intente con: airline, airport o flight`)
            break;
    }


    return retorno;
}

module.exports = {
    init,
    getFileDataPath
}