const Queue = require("bull");

const redisConfig = {
  password: "",
  host: "localhost"
};

const airportsInputQueue = new Queue("airports-input", {
  redis: redisConfig
});

const flightsInputQueue = new Queue("flights-input", {
  redis: redisConfig
});

const airlinesInputQueue = new Queue("airlines-input", {
  redis: redisConfig
});


module.exports = {flightsInputQueue, airportsInputQueue, airlinesInputQueue};