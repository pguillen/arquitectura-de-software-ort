// use it as module
var Enum = require('enum');

// or extend node.js with this new type
require('enum').register();

// define a simple enum with tables name
module.exports.ENUM_TABLES = new Enum({'airlines': 1, 'airports': 2, 'flights': 3});