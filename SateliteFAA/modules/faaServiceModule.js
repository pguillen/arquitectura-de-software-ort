
module.exports = {
    HOST_NAME: process.env.FAAASERVICE_HOST_NAME ? process.env.FAAASERVICE_HOST_NAME : 'localhost',
    PORT: process.env.FAAASERVICE_PORT ? process.env.FAAASERVICE_PORT : 3030,
    /** 
     * Example: http://localhost:3030/api/v1/airline?id=${ID}&iata_code=${IATA_CODE}&airline=${AIRLINE}`;
     */
    GET_URI: function (name) {
        let retorno;
        switch (name.toLowerCase()) {
            case 'airlines':
                retorno = `http://${this.HOST_NAME}:${this.PORT}/api/v1/airline`;
                break;
            case 'airports':
                retorno = `http://${this.HOST_NAME}:${this.PORT}/api/v1/airport`;
                break;
            case 'flights':
                retorno = `http://${this.HOST_NAME}:${this.PORT}/api/v1/flight`;
                break;
            default:
                throw new Error(`El nombre: ${name} no es soportado, intente con: airline, airport o flight`)
                break;
        }

        return retorno;
    },
    GET_PATH: function (name) {
        let retorno;
        switch (name.toLowerCase()) {
            case 'airlines':
                retorno = `/api/v1/airline`;
                break;
            case 'airports':
                retorno = `/api/v1/airport`;
                break;
            case 'flights':
                retorno = `/api/v1/flight`;
                break;
            default:
                throw new Error(`El nombre: ${name} no es soportado, intente con: airline, airport o flight`)
                break;
        }

        return retorno;
    },
}   