const log = require('../Utils/logger');
const comandoModel = require('./models/Comando');
const Enumerados = require('./models/Enumerados');
const gutils = require("./utilidadesGenerales");
const FAAServiceModule = require("./modules/faaServiceModule");
const appModule = require('./modules/appModules');
const chalk = require('chalk');
const fs = require('fs');
const http = require('http');
const readline = require('readline');
const stream = require('stream');

module.exports.procesarArchivo = async (pParametros) => {

    log.verbose(`2.0 - Inicio procesamiento de comandos`);
    try {
        let listaDeComandos = await _leerArchivo(pParametros);
        debugger;
        for (let i = 0; i < listaDeComandos.length; i++) {
            const element = listaDeComandos[i];

            await _procesarComando(element, pParametros);
        }

    } catch (e) {
        log.error((`Error ControlerComandos.procesarArchivo: ${e}`));
    }
}

const _leerArchivo = async (pParametros) => {
    let listaDeComandos = [];

    log.verbose('*'.repeat(110));
    log.verbose(`1.0 - Inicio lectura de archivo de comandos`);
    log.verbose(`1.1 - Parametro: ${JSON.stringify(pParametros)}`);


    //Obtener archivo de comandos
    let data = fs.readFileSync(pParametros.COMMANDS_PATH_FILE, "utf8", function (err, data) {
        if (err) throw err;
    }).toString().split("\n");

    let totalDeComandosParaEjecutar = data.length;

    log.verbose(`1.1 - Cantidad total de Comandos: ${totalDeComandosParaEjecutar - 1}.`);

    for (let i = 1; i < totalDeComandosParaEjecutar; i++) {

        try {
            log.verbose('*'.repeat(110));
            let auxArrayComando = data[i].toLowerCase().replace(/(\n|\r)+$/, '').split(',');

            log.verbose(`Comando ${i.pad(totalDeComandosParaEjecutar.toString().length)}: [${auxArrayComando}]`);

            await _verificarLineaDeParametrosDelComando(auxArrayComando);

            let auxComando = new comandoModel(i, auxArrayComando[0],
                Number(auxArrayComando[1]),
                Number(auxArrayComando[2]),
                Number(auxArrayComando[3]));

            listaDeComandos.push(auxComando);

            log.silly((`Valores del comando: ${JSON.stringify(auxComando)}`));

            log.verbose('*'.repeat(110));
        } catch (err) {
            log.error((`RGISTRO DE COMANDO N° ${i.pad(3)}: ${err.message}`));
        }
    }

    log.verbose(`4. Se encontraro: ${listaDeComandos.length} comandos para procesar.`);
    log.verbose("End: readFile");

    return listaDeComandos;
}

const _verificarLineaDeParametrosDelComando = async (auxArrayComando) => {

    let errorMessage = "";

    if (!auxArrayComando[0] || !Enumerados.ENUM_TABLES.isDefined(auxArrayComando[0])) {
        errorMessage += `El primer campo '${chalk.blue.underline.bold(auxArrayComando[0])}' no es aceptable, debe corresponder a un nombre de tabla valido: \' ${JSON.stringify(Enumerados.ENUM_TABLES)}\'`;
    }

    for (let i = 1; i < auxArrayComando.length; i++) {

        if (!gutils.isNumeric(auxArrayComando[i])) {
            if (errorMessage != "")
                errorMessage += '\n';

            errorMessage += `El parametro '${i}' debe ser de tipo numerico: '${chalk.blue.underline.bold(auxArrayComando[i])}' no es aceptable.`;
        }
    }

    if (errorMessage)
        throw new Error(errorMessage);
}

const _procesarComando = async (pComando, pParametros) => {
    try {
        log.silly(`3.0 _procesarComando [Comando ID: ${pComando.id}]`);
        log.silly(`3.1 _procesarComando Procesar: ${JSON.stringify(pComando)}`);
        log.silly(` host: ${FAAServiceModule.HOST_NAME}`);
        log.silly(` path: ${FAAServiceModule.GET_PATH(pComando.table)}`);
        log.silly(` port: ${FAAServiceModule.PORT}`);
        for (let iteradorDePaquete = 1; iteradorDePaquete <= pComando.post; iteradorDePaquete++) {
            try {

                await _procesarPaquete(iteradorDePaquete, pComando, pParametros);

            } catch (err) {
                log.error((`ERROR EN COMANDO N° ${iteradorDePaquete.pad(3)}: ${err.message}`));
            }
        }

    } catch (err) {
        log.error(("ERROR controlerComando._procesarComando:", err));
    }
}



const _procesarPaquete = async (iteradorDePaquete, pComando, pParametros) => {
    //let debugMessage = `[Comando ID: ${pComando.id}] PAQUETE(${iteradorDePaquete}/${pComando.post}) `;
    try {

        if (pComando.lineNumber <= 0)
            pComando.lineNumber = 1;

        if (pComando.offset <= 0)
            pComando.offset = 1;

        const filePath = appModule.getFileDataPath(pComando, pParametros);
        const instream = fs.createReadStream(filePath);
        const outstream = new stream();

        const HTTP_REQUEST_OPTIONS = {
            method: "POST",
            protocol: 'http:',
            host: FAAServiceModule.HOST_NAME,
            path: FAAServiceModule.GET_PATH(pComando.table),
            port: FAAServiceModule.PORT,
            headers: {
                'Content-Type': 'text/csv'
            }
        };

        const rl = readline.createInterface(instream, outstream);

        const START = pComando.offset;
        const END = pComando.lineNumber + pComando.offset;

        await _enviarPaquete(HTTP_REQUEST_OPTIONS, START, END, pComando.lineNumber, rl);

        pComando.offset += pComando.lineNumber;

    } catch (err) {
        log.error(`ERROR controlerComando._procesarPaquete (${iteradorDePaquete}): ${err}`);
    }
    finally {
        //log.debug(debugMessage);
    }
}

const _enviarPaquete = async (HTTP_REQUEST_OPTIONS, START, END, LINENUMBER, rl) => {
    let lineCount = 0;
    
    log.warn(`Desde el ${START} al ${END}`);

    const req = http.request(HTTP_REQUEST_OPTIONS, res => {
        log.info(`STATUS: ${res.statusCode} `);
        log.info(`HEADERS: ${JSON.stringify(res.headers)} `);
        res.setEncoding("utf8");
        res.on("data", chunk => {
            log.info(`BODY: ${chunk} `);
        });
        res.on("close", () => {
            log.debug("No more data in response.");
        });
    });

    req.flushHeaders();
    //debugger;
    let ok = false;
    rl.on('line', async (line) => {
        let n = lineCount++;

        //log.debug("n: " + n + " START: " + START + " END: " + END);

        if (n >= START && n < END) {
            log.info(`_enviarPaquete.rl linea: ${n}, ${line} `);
            ok = await req.write(`${line} \n`);
        }
        if (n == END) {
            log.debug('_enviarPaquete.rl should close');
            rl.close();
            await req.end();
        }

        // rl.resume();
    }).on('error', (err) => {
        log.error(`Error controllerComandos._enviarPaquete.rl: ${err} `);
    }).on('close', async () => {
        // lines.join();
        // await req.end();
        rl.close();
        await req.end();
        log.info('_enviarPaquete.rl close');
    }).on('abort', () => {
        log.info('_enviarPaquete.rl abort');
    }).on('response', (r) => {
        log.info('_enviarPaquete.rl response');
    });
}