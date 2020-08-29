const log = require("../Utils/logger");
const Arena = require('bull-arena');

log.silly("Iniciando bull-arena");

//http://localhost:3030/arena/localhost/flights-input
const bullArena = Arena(
  {
    queues: [
      {
        name: "flights-input",
        hostId: "localhost",
        redis: {
          host: "localhost"
        }
      },
      {
        name: "airports-input",
        hostId: "localhost",
        redis: {
          host: "localhost"
        }
      },
      {
        name: "airlines-input",
        hostId: "localhost",
        redis: {
          host: "localhost"
        }
      }
    ]
  },
  {
    // Make the arena dashboard become available at {my-site.com}/arena.
    basePath: "/arena",

    // Let express handle the listening.
    disableListen: true
  }
);

module.exports = bullArena;