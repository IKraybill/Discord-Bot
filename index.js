const config = require('./config.json');
const commands = require('./commands');
const reference = require('./reference.js');
const CommandSet = require('./CommandSet');
const Discord = require('discord.js');
const { PerformanceObserver, performance } = require('perf_hooks');
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
let baseSet = new CommandSet(config.prefix, "Current known commands", commands);

bot.on("ready", () => {
    bot.user.setActivity('Despacito 2'); //set a default game
    console.log(`Bot is online!\n${bot.users.size} users, in ${bot.guilds.size} servers connected.`);

    // let commandNames = Object.keys(commands);
    // let commandTasks = Object.values(commands);
    //
    // for (let i = 0; i < commandNames.length; i++) {
    //     baseSet.addEntry(commandNames[i], commandTasks[i]);
    // }
});

bot.on("guildCreate", guild => {
    console.log(`I've joined the guild ${guild.name} (${guild.id}), owned by ${guild.owner.user.username} (${guild.owner.user.id}).`);
});

bot.on("message", async message => { 

    if(message.author.bot || message.system) return; // Ignore bots
    
    if(message.channel.type === 'dm') { // Direct Message
        return; //Optionally handle direct messages
    } 

    console.log(message.content); // Log chat to console for debugging/testing
    
    if (message.content.indexOf(config.prefix) === 0) { // Message starts with your prefix
        
        let msg = message.content.slice(config.prefix.length); // slice of the prefix on the message

        let args = msg.split(" "); // break the message into part by spaces

        let cmd = args[0].toLowerCase(); // set the first word as the command in lowercase just in case

        args.shift(); // delete the first word from the args

        console.log(baseSet.help.text);

        let commandKnown = false;

        for (let i = 0; i < baseSet.commands.length; i++){
            if (cmd === baseSet.commands[i].name) {
                baseSet.commands[i].task(message);
                commandKnown = true;
            }
        }

        if (cmd === "help"){
            message.channel.send(baseSet.help.text);
        } else if (!commandKnown){
            message.channel.send("Unknown command, nigga");
        }
        //
        // else if (cmd === "help"){
		// 	message.channel.send(commandHelp.text);
		// }
		//
		// else { // if the command doesn't match anything you can say something or just ignore it
        //     message.channel.send(`Unknown Command, nigga.`);
        // }


	   
    } else if (message.content.indexOf("<@"+bot.user.id) === 0 || message.content.indexOf("<@!"+bot.user.id) === 0) { // Catch @Mentions

        return message.channel.send(`Use \`${config.prefix}\` to interact with me.`); //help people learn your prefix
    }
});

// Catch Errors before they crash the app.
process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception: ', errorMsg);
    // process.exit(1); //Eh, should be fine, but maybe handle this?
});

process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: ', err);
    // process.exit(1); //Eh, should be fine, but maybe handle this?
});

bot.login(config.token);