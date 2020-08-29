
module.exports = {
    MONGO_USER  : 'sa',
    MONGO_PASW  : 'braida',
    MONGO_SERVER: 'localhost',
    MONGO_DB    : 'Fuente_de_Datos',
    MONGO_PORT  : 27017,
    MONGO_CONNECTION : function (){ return `mongodb://${this.MONGO_SERVER}:${this.MONGO_PORT}/${this.MONGO_DB}` },
}