const random = require('random-int');
const uuid = require('uuid/v4');

class Equipment {
    constructor(){
        this.hp = random(5, 10);
        this.att = random(2, 4);
        this.def = random(2, 4);
        this.id = uuid();
    }
}

module.exports = Equipment;