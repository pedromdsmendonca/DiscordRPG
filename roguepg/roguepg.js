const UserRepository = require('./repos/UserRepository');
const DungeonRepository = require('./repos/DungeonRepository');
const Discord = require('discord.js');

const CharManager = require('./characterManager');
const Inventory = require('./inventoryCreator');
const JobManager = require('./jobManager');

const Equip = require('./models/equip');
const EquipManager = require('./equipManager');

class RoguePG{
    constructor(){
        this.userRepository = new UserRepository();
        this.dungeonRepository = new DungeonRepository();
        this.cooldowns = {}
        this.confirmationCodes = {}
        this.charManager = new CharManager();
        this.equipManager = new EquipManager();
        this.jobManager = new JobManager();
    }

    register(msg, name){
        //TODO we can jsut get user by id and check if not undefined or null
        this.userRepository.userExistWithId(msg.author.id).then( r => {
            if(r){
                return msg.reply('You already have a character! If you want to create a new character, first delete your current one! (!delete)');
            }
    
            let char = this.charManager.generateCharacter(name);
            char.inventory = Inventory();
            
            this.userRepository.addUser({name: msg.member.user.tag, discordId: msg.author.id}, char);
            return msg.reply('Created a character!');
        });
    }

    delete(msg){
        this.userRepository.getUser(msg.author.id).then(user => {
            this.userRepository.delete(user);
            return msg.reply('Deleted character'); 
        });
    }

    getCharacter(msg){
        this.userRepository.getUser(msg.author.id).then(user => {
            if(!user) return msg.reply('You have not created a character yet! (!create <name>)');

            let stats = this.charManager.getStats(user.character);
    
            let embed = new Discord.RichEmbed()
                .setTitle('Character Status')
                .addField('Name', user.character.name, true)
                .addField('Lvl', user.character.level, true)
                .addField('Exp', `${user.character.exp}/${stats.neededExp} (${100*user.character.exp/stats.neededExp >> 0}%)`)
                .addBlankField()
                .addField('HP', stats.hp, true)
                .addField('Defense', stats.def, true)
                .addField('Magic Resistance', stats.mdef, true)
                .addField('Attack', stats.att, true)
                .addField('Magic Power', stats.matt, true)
                .addBlankField()
                .addField('Evasion Rate', stats.eva + '%', true)
                .addField('Crit Rate', stats.cr + '%', true)
                .addField('Crit Damage', stats.cd + '%', true)
                .addField('Damage Inflicted Increase', stats.dmgi + '%', true)
                .addField('Damage Received Decrease', stats.dmgr + '%', true)
                .addField('Attack Speed', stats.ats + '%', true)
                .addBlankField()
                .addField('Drop Rate Increase', stats.bdr + '%', true)
                .addField('Dungeon Speed Increase', stats.dsi + '%', true)

            // let weapon = user.character.weapon;

            // if(!weapon){
            //     embed
            //         .addBlankField()
            //         .addField('Weapon', 'NONE')
            // } else{
            //     embed
            //     .addBlankField()
            //     .addField('Weapon', weapon.id)
            // }
            
            return msg.reply(embed);
        });     
    }

    getDungeonList(msg){
        let dungs = this.dungeonRepository.dungeons;

        var response = '';

        dungs.forEach(d => {
            response += 
            `
            [${d.name}] <${d.tag}>
            Lvl.${d.level}
            Time: ${d.cooldown} seconds
            ---------------------------
            `;
                d.name + ' <' + d.tag + '>\n';
        });
              
        return msg.reply(response);
    }

    attemptDungeon(msg, tag){
        let dung = this.dungeonRepository.dungeons.find(d => d.tag == tag);

        if(!dung) return msg.reply('Invalid tag! Check which tags exist with !dungeon');

        this.userRepository.getUser(msg.author.id).then(user => {

            if(user.character.level < dung.level) return msg.reply('Dungeon level is too high for you! Try a weaker dungeon!');

            msg.reply('You just started attempting the dungeon! The time for completion is ' + dung.cooldown + ' seconds.');

            setTimeout(() => {
                let success = this.charManager.dungeonSuccess(user.chararcter, dung);
                if(!success){
                    return msg.reply('You failed to complete the dungeon! D:');
                }
                
                let reward = this.dungeonRepository.getReward(tag);
                console.log(reward)
                if(reward[0] == 'e'){
                    let v = reward.substring(2, reward.length);
                    v = v.split(',');
                    let equip = new Equip(v[0],v[1], v[2]);
                    msg.reply(this.equipManager.printable(equip));
                    user.character.inventory.equips.push(equip);
                    
                }
                else if(reward[0] == 'c'){
                    let t = reward.substring(2, reward.length);
                    user.character.inventory.consumables.forEach(c => {
                        if(c.tag == t){
                            msg.reply(c.name);
                            c.quantity++;
                        }
                    });
                }
                user.character = this.charManager.gainExperience(user.character, dung.exp);
                this.userRepository.update(user);
                msg.reply('Finished dungeon!');
            }, dung.cooldown * 1000);
        });
    }

    performAction(msg){
        let cd = this.cooldowns[msg.author.id];
        let currentTime = new Date();
        if(!cd){ // not in cooldown list: can perform action
            this.cooldowns[msg.author.id] = currentTime;
            return msg.reply('doing action for X seconds');
        } 
        
        let dif = currentTime.getTime() - cd.getTime();
        console.log(`cd: ${cd}\ncu: ${currentTime}\ndif: ${dif/1000}`);
        if(dif < 5){
            return msg.reply('still in cooldown');
        }
        this.cooldowns[msg.author.id] = currentTime;
        return msg.reply('doing action for X seconds');
    }

    getConsumables(msg){
        this.userRepository.getUser(msg.author.id).then(user => {
            let consumables = user.character.inventory.consumables;

            let resp = '';
            consumables.filter(c => c.quantity > 0).forEach(c => {
                resp += `${c.name} <${c.tag}> x${c.quantity}\n`;
            });

            return msg.reply(resp);
        });
    }

    consumableDescription(msg, tag){
        let cons = Inventory().consumables.find(c => c.tag === tag);
        if(!cons) return msg.reply('Item tag does not exist. Check available tags: !items');

        return msg.reply(cons.desc);
    }

    getEquips(msg){
        this.userRepository.getUser(msg.author.id).then(user => {
            let equips = user.character.inventory.equips;

            //TODO add equip stats and color coding for readability
            let resp = '';   
            equips.forEach(e => {
                
                resp += this.equipManager.printable(e);
                
            });
                  
            return msg.reply(resp);
        }); 
    }

    equipItem(msg, id){
        this.userRepository.getUser(msg.author.id).then(user => {
            let equip = user.character.inventory.equips.find(e => e.id == id);
            if(!equip || equip == null) return msg.reply('You do not have that equip! Check your equips: !equips');

            var oldEquip;
            switch(equip.type){
                case 0:
                    oldEquip = user.character.weapon;
                    user.character.weapon = equip;
                    break;
                case 1:
                    oldEquip = user.character.armor;
                    user.character.armor = equip;
                    break;
                case 2:
                    oldEquip = user.character.ring;
                    user.character.ring = equip;
                    break;
                case 3:
                    oldEquip = user.character.amulet;
                    user.character.amulet = equip;
                    break;
            }
            
            if(oldEquip){
                user.character.inventory.equips.push(oldEquip);
            } 

            user.character.inventory.equips = user.character.inventory.equips.filter(e => e.id != id);
           
            this.userRepository.update(user).then( () => {
                return msg.reply('Equiped!');
            });
        });
    }

    changeJob(msg, jobName){
        console.log('attempting to change class')
        this.userRepository.getUser(msg.author.id).then(user => {
            if(!user) return msg.reply('No character found!');

            let job = this.jobManager.getJob(jobName);

            user.character = this.charManager.addClass(user.character, job);
           
            this.userRepository.update(user).then( () => {
                return msg.reply('Added class!');
            });
        });
    }
}

module.exports = RoguePG;