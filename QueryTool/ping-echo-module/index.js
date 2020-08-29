const Ping = require('./lib/ping');
const log = require("../Utils/logger");


let pingOrderService = new Ping({ 
    host: 'localhost', 
    path: '/api/v1/', 
    port: 3031,
    timeout: 5,
    interval: 1
});
// let pingUserService = new Ping({
//     host: 'localhost', 
//     path: '/users', 
//     port: 8081,
//     timeout: 50,
//     interval: 10000
// });

pingOrderService.ping();
pingOrderService.on('success', (message) => log.info(message));
pingOrderService.on('failure', (message) => log.error(message));

// pingUserService.ping();
// pingUserService.on('success', (message) => log.info(message));
// pingUserService.on('failure', (message) => log.error(message));