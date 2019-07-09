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
            inventory: null,
            weapon: {
                sword: null,
                greatSword: null,
                spear: null,
                staff: null,
                bow: null,
                book: null,
                scythe: null,
                dagger: null,
                shield: null
            },
            armor: null,
            ring: null,
            amulet: null        
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

        //add the values of the equips if they exist
        // char.weapon && char.weapon.att && (att += char.weapon.att);
        // char.weapon && char.weapon.matt && (matt += char.weapon.matt);
        // char.armor && char.armor.def && (def += char.armor.def);
        // char.armor && char.armor.mdef && (def += char.armor.mdef);
        // char.ring && char.ring.att && (att += char.ring.att);
        // char.ring && char.ring.hp && (hp += char.ring.hp);
        // char.amulet && char.amulet.eva && (eva += char.amulet.eva);
        // char.amulet && char.amulet.matt && (matt += char.amulet.matt);

        //add job values
        // char.classes.forEach(c => {
        //     console.log('class')
        //     c.hp && (hp += c.hp * c.lvl);
        //     c.att && (att += c.att * c.lvl);
        //     c.matt && (matt += c.matt * c.lvl);
        //     c.def && (def += c.def * c.lvl);
        //     c.mdef && (mdef += c.mdef * c.lvl);
        //     c.eva && (eva += c.eva * c.lvl);
        // });

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

    dungeonSuccess(char, dung){
        return true;
    }

    gainExperience(char, exp){
        char.exp += exp;
        if(char.exp >= this.neededExp(char.level)){
            char.level++;
            char.exp = 0;
        }
        return char;
    }

    addClass(char, job){
        char.classes.push(job);
        return char;
    }
}

module.exports = CharacterManager;