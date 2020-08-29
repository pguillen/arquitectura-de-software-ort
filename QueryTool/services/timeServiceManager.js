class TimeServiceManager {

    constructor() {
    }

    start() {
        return Date.now();
    }

    end() {
        return Date.now();
    }

    getDifference(start, end) {
        return end - start;
    }
}

module.exports = TimeServiceManager;