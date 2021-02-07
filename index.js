const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')
const https = require('https')

bot.on('ready', () => {
    console.log('bot is online');
    bot.user.setActivity('Porn Hub', {type: 'WATCHING'}).catch(console.error);
});

bot.on('message', async msg => {
    if(msg.author.id === bot.user.id) return;
    
    if(msg.author.bot ) return msg.reply('Sai daqui que este server é meu!');
    let args = msg.content.split(" ");

    if(msg.content === '!hello')
        return msg.author.send('hello friend');
    if(args[0] === '!miguel')
        return countdown(msg, args[1]);
    if(msg.content === '!dad'){
        return dadJoke(msg);
    }
    if(msg.content === '!porn'){
        return msg.channel.send('https://pt.pornhub.com/random')
    }
    if(args[0] === '-play' || args[0] === '.music'){
        return msg.member.send('NAO PARES DE POR MUSICA SEU MALANDRO!')
    }
});

bot.login(config.token);

function countdown(message, arg){
    console.log(message.member)
    const voiceChannel = message.member.voice.channel;
    if(!voiceChannel) return message.channel.send('Not in voice channel!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
    }
    voiceChannel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
        var file = 'miguel_docinho';
        switch(arg){
            case 'espetaculo':
                file = 'miguel_espetaculo';
                break;
            case 'abanar':
                file = 'miguel_abanar';
                break;
            case 'docinho':
            default:
                file = 'miguel_docinho';
        }
        if (message.content === "!bernardo") file = 'bernardo';
        const dispatcher = connection.play(`./${file}.ogg`);
        dispatcher.on("end", end => {voiceChannel.leave()});
      }).catch(e => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
      });
}

function dadJoke(message){
    var endpoint = 'https://icanhazdadjoke.com/'

    https.get(endpoint, {headers: {"Accept": "application/json"}}, (resp) => {
        let data = '';
        
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });
        
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            let joke = JSON.parse(data).joke;
            console.log(joke);

            return message.channel.send(joke)
          });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
}