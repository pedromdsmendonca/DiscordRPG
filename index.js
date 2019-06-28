const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')

const RoguePG = require('./roguepg/roguepg.js');

const rpg = new RoguePG();

bot.on('ready', () => {
    console.log('bot is online');
    bot.user.setActivity('RoguePG', {type: 'PLAYING'}).catch(console.error);
});

//TODO: move routing to routing file
bot.on('message', msg => {
    if(msg.author.id === bot.user.id) return;
    
    let args = msg.content.split(" ");

    if(args[0] === '!create'){
        if(args[1]){
            return rpg.register(msg, args[1]);
        }
        return msg.reply('You need to suply a character name! (!rpg create <name>)');
    }

    if(args[0] === '!status'){
        return rpg.getCharacter(msg);
    }

    if(args[0] === '!action'){
        return rpg.performAction(msg);
    }

    if(args[0] === '!dungeon'){
        if(!args[0]){
            return rpg.getDungeonList(msg);
        }

        return rpg.attemptDungeon(msg, args[1]);
    }
});

bot.login(config.token);