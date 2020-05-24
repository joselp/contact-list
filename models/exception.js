class Exception {
    constructor(message, debug) {
        this.message = message;
        this.debug = debug;
        this.date = Date.now();
    }
}

module.exports = Exception