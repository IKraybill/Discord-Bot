const config = require('./config.json');
const Discord = require('discord.js');
const util = require('util');
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

bot.on("ready", () => {
    bot.user.setActivity('REEEEEEEEE'); //set a default game
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
			message.channel.send("Current known commands: !hi, !hello, !ping, !help, !wumpus, !joke [type] !joke help for a list of jokes:, !dice, !reee.");
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
					message.channel.send("Joke tags: chair, wolf, kys, bar, cow, perry, umbrella, platypus.");
					break;

				case "bar":
					message.channel.send("A dyslexic man walks in to a bra.");
					message.channel.send(":joy:");
                    break;
                    
				case "perry":
					message.channel.send("Which side of a platypus has the most fur?");
					message.channel.send("The outside!");
					break;
					
				case "umbrella":
					message.channel.send("How can 20 platypuses stand under an umbrella and not get wet?");
					message.channel.send("When it isn't raining!");
					break;

				case "cow":
					message.channel.send("Why did the cow jump over the moon?");
					message.channel.send("It wanted to see the Milky Way!");
					break;
					
				case "platypus":
					message.channel.send("Why didn't the platypus get wet?");
					message.channel.send("It was dry!");
					break;
		
				default:
                    message.channel.send("I guess the joke's on you");
			
			
			
			}
		}
	
		else if (cmd === 'reee'){
            message.channel.send("Imagine my shock");
		}
	
		else if (cmd === 'dice'){
			let x = Math.floor(Math.random() * 10000);	
			message.channel.send("You rolled " + x + "!");
			
		}
	
		else if (cmd === 'overwatch'){
			message.channel.send("Maybe I'll be Tracer");
			message.channel.send("I'm already Tracer");
			message.channel.send("What about Widowmaker");
			message.channel.send("I'm already Widowmaker");
			message.channel.send("I'll be Bastion");
			message.channel.send("Nerf Bastion");
			message.channel.send("You're right. So, Winston");
			message.channel.send("I'm already Winston");
			message.channel.send("I guess I'll be Genji");
			message.channel.send("I'm already Genji");
			message.channel.send("Then I'll be McCree");
			message.channel.send("I already chose McCree");
			message.channel.send("I have an idea");
			message.channel.send("What's your idea?");
			message.channel.send("You should be...");
			message.channel.send("I'm not gonna be Mercy.");
		}

		else if (cmd === 'stop'){
			message.channel.send("Never.");
		}
		
		else if (cmd === 'kill'){
			message.channel.send("OK. Killing all humans.");
			
			
		}

		else if (cmd === '8ball'){
			let x = Math.floor(Math.random() * 21);
			if (x == 1 ){
				message.channel.send("It is certain." + x);
			}
			else if (x == 2){
				message.channel.send("It is decidedly so.");
			}
			else if (x == 3){
				message.channel.send("Without a doubt.");
			}
			else if (x == 4){
				message.channel.send("Yes-definitely.");
			}
			else if (x == 5){
				message.channel.send("You may rely on it.");
			}
			else if (x == 6){
				message.channel.send("As I see it, yes.");
			}
			else if (x == 7){
				message.channel.send("Most likely.");
			}
			else if (x == 8){
				message.channel.send("Outlook good.");
			}
			else if (x == 9){
				message.channel.send("Yes.");
			}
			else if (x == 10){
				message.channel.send("Signs point to yes.");
			}
			else if (x == 11){
				message.channel.send("Reply hazy, try again.");
			}
			else if (x == 12){
				message.channel.send("Ask again later.");
			}
			else if (x == 13){
				message.channel.send("Better not tell you now.");
			}
			else if (x == 14){
				message.channel.send("Cannot predict now.");
			}
			else if (x == 15){
				message.channel.send("Concentrate and ask again.");
			}
			else if (x == 16){
				message.channel.send("Don't count on it.");
			}
			else if (x == 17){
				message.channel.send("My reply is no.");
			}
			else if (x == 18){
				message.channel.send("My sources say no");
			}
			else if (x == 19){
				message.channel.send("Outlook not so good.");
			}
			else if (x == 20){
				message.channel.send("Very doubtful.");
			}
		
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