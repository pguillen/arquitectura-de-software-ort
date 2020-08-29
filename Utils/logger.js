const log = require("./Logger-Winston/index").logger;
const config = require("./config");
const chalk = require("chalk");

const verbose = (message) => {
    log.verbose(config.USE_COLOR ? chalk.cyan(message) : message);
}

const silly = (message) => {
    log.silly(config.USE_COLOR ? chalk.magenta(message) : message);
}

const info = (message) => {
    log.info(config.USE_COLOR ? chalk.green(message) : message);
}

const debug = (message) => {
    log.debug(config.USE_COLOR ? chalk.blue(message) : message);
}

const warn = (message) => {
    log.warn(config.USE_COLOR ? chalk.yellow(message) : message);
}

const error = (message) => {
    log.error(config.USE_COLOR ? chalk.red(message) : message);
}

module.exports = {
    silly,
    info,
    verbose,
    debug,
    warn,
    error
}