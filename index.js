const { prefix } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
client.commands = new Discord.Collection();

require('dotenv').config();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

var characterDictionaries = {};

var folder = './characters';
fs.readdirSync(folder).forEach(file => {

    const extname = path.extname(file);
    const filename = path.basename(file, extname);
    const absolutePath = path.resolve(folder, file);

    //console.log( "File : ", file );
    //console.log("filename : ", filename);
    //console.log( "extname : ", extname );
    //console.log( "absolutePath : ", absolutePath);

    var name = filename.toLowerCase();

    characterDictionaries[name] = {};
    //console.log(characterDictionaries);

    fs.readFile(absolutePath, (err, data) => {
        if (err) throw err;
        let character = JSON.parse(data);

        for (var key in character) {
            //console.log(key + ": " + character[key]);
            characterDictionaries[name][key] = character[key];
        }
    });

    //console.log(characterDictionaries[filename]);
});



client.login(process.env.BOTTOKEN);

client.on('ready', () => {
    console.log('at your service m lord');
});


client.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, args, characterDictionaries);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

    // else if (message.content === 'players') {
    //     console.log("!!!!!!!!");
    //     try {
    //         for (let k in characterDictionaries) {
    //             await message.channel.send(characterDictionaries[k]["Player"]);
    //             // console.log(k + ' is ' + characterDictionaries[k])

    //             // console.log(characterDictionaries[k])
    //             // for (let l in characterDictionaries[k]){
    //             //     await message.channel.send(l + " : " + characterDictionaries[k][l]);
    //             // }

    //         }
    //         //await message.react('🇦');
    //         //await message.react('🇧');
    //         //await message.react('🇨');
    //     } catch (error) {
    //         // handle failure of any Promise rejection inside here
    //     }
    // }
});

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);









