const baseHp = 75;
const baseAtt = 8;
const baseMatt = 8;
const baseDef = 8;
const baseMdef = 8;
const baseEva = 5;

class CharacterManager {
    generateCharacter(name){
        return {
            name: name,
            level: 1,
            gold: 0,
            exp: 0,
            classes: [],
            inventory: {},
            weapon: {},
            armor: {},
            ring: {},
            amulet: {}
        }
    }

    //TODO take the classes into account
    getStats(char){
        let hp = baseHp + char.level * 25;
        let att = baseAtt + char.level * 2;
        let matt = baseMatt + char.level * 2;
        let def = baseDef + char.level * 2;
        let mdef = baseMdef + char.level * 2;
        let eva = baseEva + (char.level/5 >> 0);

        //TODO add %dmg inc/dec
        return{
            hp,
            att,
            matt,
            def,
            mdef,
            eva,
            neededExp: this.neededExp(char.level)
        }
    }

    //TODO get exp progression formula
    //returns the needed exp for the next level
    neededExp(level){
        return level*10;
    }
}

module.exports = CharacterManager;