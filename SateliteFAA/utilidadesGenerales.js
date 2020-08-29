/**  
 * Agrega funcionalidad 'pad' a la clase Number 
*/
Number.prototype.pad = function (size) {
    var sign = Math.sign(this) === -1 ? '-' : '';
    return sign + new Array(size).concat([Math.abs(this)]).join('0').slice(-size);
}

/**
 * Retorna un ID random de cinco digitos
 */
module.exports.RandomID = () => Math.random().toString(36).substr(8).toUpperCase()

/**
 * Retornar fecha completa YYYY-MM-DD- hh:mm:ss (con o sin separadores)
 * @param {Bool} separadores Utilizar separadores para la fecha, por defecto false.
 */
module.exports.TimeStamp = (separadores = false) => {
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

/**
 * Verifica si una variable es un nuemro positivo o cero
 * @param {*} n Parametro para verificar su tipo
 * @returns True si es de tipo Number
 */
module.exports.isNumeric = (n) => {
    const aux = Number(n);
    return (typeof aux == "number" && !isNaN(aux) && aux >= 0);
}