const random = require('random-int');
const uuid = require('uuid/v4');

class Equipment {
    constructor(lvl, grade, type){
        //common
        this.id = uuid();
        this.enhance = 0;
        this.type = type;
        this.grade = grade;
        this.lvl = lvl;

        //specific
        if(type === 0){
            let r = random(0,1);
            if(r === 0){
                this.att = lvl + grade * 5;
            }
            else{
                this.matt = lvl + grade * 5;
            }
        }
        if(type === 1){
            this.def = lvl + grade * 5;
            this.mdef = lvl + grade * 5;
        }
        if(type === 2){
            this.hp = lvl + grade * 5;
            this.att = lvl + grade * 5;
        }
        if(type === 3){
            this.eva = lvl + grade * 5;
            this.matt = lvl + grade * 5;
        }
    }
}

module.exports = Equipment;