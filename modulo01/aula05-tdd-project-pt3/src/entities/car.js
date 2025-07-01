const Base = require("./base/base");

class Car extends Base {
    constructor({ id, name, releaseYear, availabel, gasAvailable }) {
        super({ id, name })
        this.releaseYear = releaseYear
        this.availabel = availabel
        this.gasAvailable = gasAvailable
    }
}

module.exports = Car