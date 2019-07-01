const random = require('random-int');

class Equipment {
    constructor(){
        this.hp = random(5, 10);
        this.att = random(2, 4);
        this.def = random(2, 4);
    }
}

module.exports = Equipment;