const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')

const RoguePG = require('./roguepg/roguepg.js');

const rpg = new RoguePG();

bot.on('ready', () => {
    console.log('bot is online');
    bot.user.setActivity('RoguePG || !help', {type: 'PLAYING'}).catch(console.error);
});

bot.on('message', msg => {
    if(msg.author.id === bot.user.id) return;
    
    let args = msg.content.split(" ");

    if(args[0] === '!help'){
        return msg.reply('coming soon...');
    }

    if(args[0] === '!create'){
        return rpg.register(msg, args[1]);
    }

    if(args[0] === '!status'){
        return rpg.getCharacter(msg);
    }

    if(args[0] === '!dungeon'){
        if(!args[1]){
            return rpg.getDungeonList(msg);
        }

        return rpg.attemptDungeon(msg, args[1]);
    }

    if(args[0] === '!items'){
        if(!args[1]){
            return rpg.getConsumables(msg);
        }
        return rpg.consumableDescription(msg, args[1]);
    }

    if(args[0] === '!equips'){
        return rpg.getEquips(msg);
    }

    if(args[0] === '!equip'){
        return rpg.equipItem(msg, args);
    }
});

bot.login(config.token);