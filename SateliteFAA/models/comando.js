module.exports = class Comando {

    constructor(id, table, post, lineNumber, offset) {
        this.id = id;
        this.table = table;
        this.post = post;
        this.lineNumber = lineNumber;
        this.offset = offset;
    }
}