require("dotenv").config({ path: __dirname + "/RequestManager.env" });

//NÚMERO MAXIMO DE LINEAS POR JOB "10"
module.exports.MAX_BATCH_SIZE  = (process.env.MAX_BATCH_SIZE && process.env.MAX_BATCH_SIZE > 1) ?process.env.MAX_BATCH_SIZE : 10;