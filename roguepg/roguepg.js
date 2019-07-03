const UserRepository = require('./repos/UserRepository');
const DungeonRepository = require('./repos/DungeonRepository');
const Discord = require('discord.js');

const random = require('random-int');

const CharManager = require('./character');
const Inventory = require('./inventoryCreator');

const Equip = require('./models/equip')

class RoguePG{
    constructor(){
        this.userRepository = new UserRepository();
        this.dungeonRepository = new DungeonRepository();
        this.cooldowns = {}
        this.confirmationCodes = {}
        this.charManager = new CharManager();
    }

    register(msg, name){
        this.userRepository.userExistWithId(msg.author.id).then( r => {
            if(r){
                return msg.reply('You already have a character! If you want to create a new first delete your current one! (!rpg delete)');
            }
    
            let char = this.charManager.generateCharacter(name);
            char.inventory = Inventory();
            
            this.userRepository.addUser({name: msg.member.user.tag, discordId: msg.author.id}, char);
            return msg.reply('Created a character!');
        });
    }

    getCharacter(msg){
        this.userRepository.getUser(msg.author.id).then(user => {
            if(!user) return msg.reply('You have not created a character yet! (!rpg create)');

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
                .addField('Evasion', stats.eva, true)

            let weapon = user.character.weapon;
            if(!weapon){
                embed
                    .addBlankField()
                    .addField('Weapon', '')
            } else{
                embed
                .addBlankField()
                .addField('Weapon', weapon.id)
            }
            
            return msg.reply(embed);
        });     
    }

    getDungeonList(msg){
        let dungs = this.dungeonRepository.dungeons;

        var response = '';

        dungs.forEach(d => {
            response += d.name + ' <' + d.tag + '>\n';
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
                let type = e.type
                resp += 
                `
                [${e.grade} ${e.type} Lvl.${e.lvl}] +${e.enhance}
                <${e.id}>
                ---------------------------
                `;
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
            
            if(!oldEquip) user.character.inventory.equips.push(oldEquip);

            user.character.inventory.equips = user.character.inventory.equips.filter(e => e.id != id);
           
            this.userRepository.update(user).then( () => {
                return msg.reply('Equiped!');
            });
        });
    }
}

module.exports = RoguePG;