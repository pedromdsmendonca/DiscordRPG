const UserRepository = require('./repos/UserRepository');
const DungeonRepository = require('./repos/DungeonRepository');
const Discord = require('discord.js');

const Character = require('./characterCreator');
const Inventory = require('./inventoryCreator');

class RoguePG{
    constructor(){
        this.userRepository = new UserRepository();
        this.dungeonRepository = new DungeonRepository();
        this.cooldowns = {}
        this.confirmationCodes = {}
    }

    register(msg, name){
        this.userRepository.userExistWithId(msg.author.id).then( r => {
            if(r){
                return msg.reply('You already have a character! If you want to create a new first delete your current one! (!rpg delete)');
            }
    
            let char = Character(name);
            char.inventory = Inventory();
            
            this.userRepository.addUser({name: msg.member.user.tag, discordId: msg.author.id}, char);
            return msg.reply('Created a character!');
        });
    }

    getCharacter(msg){
        this.userRepository.getUser(msg.author.id).then(user => {
            if(!user) return msg.reply('You have not created a character yet! (!rpg create)');
    
            let embed = new Discord.RichEmbed()
                .setTitle('Character Status')
                .addField('Name', user.character.name, true)
                .addField('Lvl', user.character.level, true)
                .addBlankField()
                .addField('HP', user.character.hp, true)
                .addField('Defense', user.character.def, true)
                .addField('Attack', user.character.att, true)
                .addField('Magic', user.character.matt, true)

            let weapon = user.character.weapon;
            if(weapon){
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

        let user = this.userRepository.users.find(u => u.discordId == msg.author.id);

        if(user.character.level < dung.level) return msg.reply('Dungeon level is too high for you! Try a weaker dungeon!');

        msg.reply('You just started attempting the dungeon! The time for completion is ' + dung.cooldown + ' seconds.');

        setTimeout(() => {
            msg.reply('Finished dungeon!');
        }, dung.cooldown * 1000);
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
        let consumables = this.userRepository.getConsumables(msg.author.id);

        msg.reply(consumables.length);
    }

    getEquips(msg){
        let equips = this.userRepository.getEquips(msg.author.id);

        var response = '';

        equips.forEach(e => {
            response += '<' + e.id + '>\n';
        });
              
        return msg.reply(response);
    }

    equipItem(msg, args){
        let equip = this.userRepository.getEquip(msg.author.id, args[1]);
        if(!equip || equip == null) return msg.reply('You do not have that equip! Check your equips with !equips');
       
        this.userRepository.equip(msg.author.id, equip);
        msg.reply('OK!');
    }
}

module.exports = RoguePG;