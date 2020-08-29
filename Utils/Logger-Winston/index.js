//'use strict';
require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');
const chalk = require("chalk");

console.log(chalk.green("Winston Level:", process.env.WINSTON_LEVEL));

const env_Level = (process.env.WINSTON_LEVEL && "error,warn,info,verbose,debug,silly".indexOf(process.env.WINSTON_LEVEL) >= 0) ? process.env.WINSTON_LEVEL : 'info'

const logDir =  process.env.LOG_DIR ? process.env.LOG_DIR : 'log'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const TimeStamp = (separadores = false) => {
    function pad(n) { return n < 10 ? "0" + n : n }
    const d = new Date();
    let dash = '', colon = '', space = '';

    if (separadores) {
        dash = "-";
        colon = ":";
        space = " ";
    }

    return d.getFullYear() + dash +
        pad(d.getMonth() + 1) + dash +
        pad(d.getDate()) + space +
        pad(d.getHours()) + colon +
        pad(d.getMinutes()) + colon +
        pad(d.getSeconds())
}

//const myFilename = path.join(logDir, `results_${TimeStamp()}.log`);
const resultFileNmae = path.join(logDir, `results.log`);
const errorsFileNmae = path.join(logDir, `errors.log`);

var options = {
    fileErrors: {
        level: 'error',
        filename: path.join(logDir, `errors.log`),
        handleExceptions: true,
        json: false,
        maxsize: 10485760, // 10MB
        maxFiles: 50,
        colorize: true,
    },
    fileResult: {
        level: env_Level,
        filename: path.join(logDir, `results.log`),
        handleExceptions: true,
        json: false,
        maxsize: 10485760, // 10MB
        maxFiles: 50,
        colorize: true,
    },
    console: {
        level: env_Level,
        handleExceptions: true,
        json: false,
        colorize: true,
        format: format.combine(
            format.colorize(),
            format.printf(
                info => `${info.timestamp} ${info.level}: ${info.message}`
            )
        )
    },
};

const logger = createLogger({
    // change level if in dev environment versus production
    level: env_Level,
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console(options.console),
        new transports.File(options.fileErrors),
        new transports.File(options.fileResult),
    ]
});

module.exports.logger = logger;

// logger.error('Error message');
// logger.warn('Warning message');
// logger.info('Info message');
// logger.verbose('Verbose message');
// logger.debug('Debug message');
// logger.silly("Silly message");
// logger.silly(env_Level);