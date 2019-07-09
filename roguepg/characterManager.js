//base stats
const baseHp = 75;
const baseAtt = 8;
const baseMatt = 8;
const baseDef = 8;
const baseMdef = 8;

//advanced percentage stats
const baseEva = 5;
const baseCritRate = 5;
const baseCritDamage = 150;
const baseAttSpeed = 100;
const baseDmgInc = 0;
const baseDmgRed = 0;

//out of combat stats
const baseDropRateInc = 0;
const baseDungSpeedInc = 0;

const jobManager = require('./jobManager')

const jm = new jobManager();

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
        //these stats increase by levelling
        let hp = baseHp + char.level * 25;
        let att = baseAtt + char.level * 2;
        let matt = baseMatt + char.level * 2;
        let def = baseDef + char.level * 2;
        let mdef = baseMdef + char.level * 2;
        //these stats are only increased by items/jobs
        let eva = baseEva;
        let cr = baseCritRate;
        let cd = baseCritDamage;
        let ats = baseAttSpeed;
        let dmgi = baseDmgInc;
        let dmgr = baseDmgRed;
        //out of combat stats (affected by jobs)
        let bdr = baseDropRateInc;
        let dsi = baseDungSpeedInc;

        //add the values of the equips if they exist
        // char.weapon && char.weapon.att && (att += char.weapon.att);
        // char.weapon && char.weapon.matt && (matt += char.weapon.matt);
        char.armor && char.armor.def && (def += char.armor.def);
        char.armor && char.armor.mdef && (def += char.armor.mdef);
        char.ring && char.ring.att && (att += char.ring.att);
        char.ring && char.ring.hp && (hp += char.ring.hp);
        char.amulet && char.amulet.eva && (eva += char.amulet.eva);
        char.amulet && char.amulet.matt && (matt += char.amulet.matt);

        //add job values
        char.classes.forEach(job => {
            if(job.active) {              
                let c = jm.getJob(job.name)

                c.hp && (hp += c.hp * job.lvl);
                c.att && (att += c.att * job.lvl);
                c.matt && (matt += c.matt * job.lvl);
                c.def && (def += c.def * job.lvl);
                c.mdef && (mdef += c.mdef * job.lvl);

                //base %stat increases
                c.base.eva && (eva += c.base.eva);
                c.base.cr && (cr += c.base.cr);
                c.base.cd && (cd += c.base.cd);
                c.base.ats && (ats += c.base.ats);
                c.base.dmgi && (dmgi += c.base.dmgi);
                c.base.dmgr && (dmgr += c.base.dmgr);

                //lvl %stat increases
                c.incremental.eva && (eva += c.incremental.eva * job.lvl);
                c.incremental.cr && (cr += c.incremental.cr * job.lvl);
                c.incremental.cd && (cd += c.incremental.cd) * job.lvl;
                c.incremental.ats && (ats += c.incremental.ats * job.lvl);
                c.incremental.dmgi && (dmgi += c.incremental.dmgi * job.lvl);
                c.incremental.dmgr && (dmgr += c.incremental.dmgr * job.lvl);
            }
        });

        return{
            hp,
            att,
            matt,
            def,
            mdef,
            eva,
            cr,
            cd,
            dmgi,
            dmgr,
            ats,
            bdr,
            dsi,
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