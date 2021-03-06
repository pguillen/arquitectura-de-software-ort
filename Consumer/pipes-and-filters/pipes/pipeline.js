var configPipes = require('../config/const');

function deferBinding() {
    console.log('Defer bidning');
    let type = configPipes.pipeType || 'direct';
    console.log('Type: ', type);
    let implementation;
    try {
        implementation = require(`./${type}-pipeline`); // Restringir dependencias
    } catch (err) {
        // Use default implementation
        implementation = require('./direct-pipeline'); // Restringir dependencias
    }
    return implementation;
}

module.exports = deferBinding();