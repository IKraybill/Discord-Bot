const config = require('./config.json');
const Discord = require('discord.js');
const util = require('util');
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

bot.on("ready", () => {
    bot.user.setGame('REEEEEEEEE'); //set a default game
    console.log(`Bot is online!\n${bot.users.size} users, in ${bot.guilds.size} servers connected.`);
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

        
        if (cmd === "hi" || cmd === "hello") { // the first command [I don't like ping > pong]
            message.channel.send(`Hello, ${message.author.toString()}`);
            return; 
        }

        else if (cmd === "ping") { // ping > pong just in case..
            return message.channel.send("pong");
        }

        // Make sure this command always checks for you. YOU NEVER WANT ANYONE ELSE TO USE THIS COMMAND
        else if (cmd === "eval" && message.author.id === config.owner){ // < checks the message author's id to yours in config.json.
            const code = args.join(" ");
            return evalCmd(message, code);
        }

		else if (cmd === "help"){
			message.channel.send("Current known commands: !hi, !hello, !ping, !help, !wumpus, !joke [type] !joke help for a list of jokes:, !dice.");
		}

		else if (cmd === "music"){
				message.channel.send("Music bot not ready");
		}
	
		else if (cmd === "wumpus"){
			message.channel.send("We do not talk about that");
		}
	
		else if (cmd === "joke"){
			switch(args[0]){
				case "wolf" : 
					message.channel.send("Where does a werewolf sit?");
					message.channel.send("Anywhere it wants to!");
					break;
				
				case "chair" :
					message.channel.send("What is the favorite fruit of a chair?");
					message.channel.send("A cherry!");
                    break;
				
				case "kys" :
					message.channel.send("Okay here's the joke: ");
					message.channel.send("Your message.");
					break;

				case "help":
					message.channel.send("Joke tags: chair, wolf, kys, bar");
					break;

				case "bar":
					message.channel.send("A dyslexic man walks in to a bra.");
					message.channel.send(":joy:");
                    break;
                    
                default:
                    message.channel.send("I guess the joke's on you")
			}
		}
	
		else if (cmd === 'reee'){
		}
	
		else if (cmd === 'dice'){
			let x = Math.floor(Math.random() * 10000);	
			message.channel.send("You rolled " + x + "!");
			
		}
	
		else { // if the command doesn't match anything you can say something or just ignore it
            message.channel.send(`Unknown Command, nigga.`);
            return;
        }
        
    } else if (message.content.indexOf("<@"+bot.user.id) === 0 || message.content.indexOf("<@!"+bot.user.id) === 0) { // Catch @Mentions

        return message.channel.send(`Use \`${config.prefix}\` to interact with me.`); //help people learn your prefix
    }
    return;
});

function evalCmd(message, code) {
    if(message.author.id !== config.owner) return;
    try {
        let evaled = eval(code);
        if (typeof evaled !== "string")
            evaled = util.inspect(evaled);
            message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
function clean(text) {
    if (typeof(text) !== 'string') {
        text = util.inspect(text, { depth: 0 });
    }
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(config.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0') //Don't let it post your token
    return text;
}

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