import {commands} from './commands';
import {CommandSet} from "./CommandSet";
import * as Discord from "discord.js";
const config = require("../config");

const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

let baseSet = new CommandSet("command", config.prefix, "Possible commands", commands);

bot.on("ready", () => {
    bot.user.setActivity(config.prefix + 'help'); //set a default game
    console.log(`Bot is online!\n${bot.users.size} users, in ${bot.guilds.size} servers connected.`);
});

bot.on("guildCreate", guild => {
    console.log(`I've joined the guild ${guild.name} (${guild.id}), owned by ${guild.owner.user.username} (${guild.owner.user.id}).`);
});

bot.on("message", async message => {

    //if(message.author.bot || message.system) return; // Ignore bots

    if(message.channel.type === 'dm') { // Direct Message
        return; //Optionally handle direct messages
    }

    console.log(message.content); // Log chat to console for debugging/testing

    if (message.content.indexOf(config.prefix) === 0) {

        baseSet.parseCommand(message);

    } else if (message.content.indexOf("<@"+bot.user.id) === 0 || message.content.indexOf("<@!"+bot.user.id) === 0) { // Catch @Mentions

        return message.channel.send(`Use \`${config.prefix}\` to interact with me.`); //help people learn your prefix
    }
});

// bot.on('disconnected', () => {
//     console.log("disconnected, logging in again");
//     bot.login(config.token)
// });
//
// //bot.on('error', console.error);
//
// // Catch Errors before they crash the app.
// process.on('uncaughtException', (err) => {
//     const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
//     console.error('Uncaught Exception: ', errorMsg);
//     // process.exit(1); //Eh, should be fine, but maybe handle this?
//     bot.login(config.token)
// });
//
// process.on('unhandledRejection', err => {
//     console.error('Uncaught Promise Error: ', err);
//     // process.exit(1); //Eh, should be fine, but maybe handle this?
// });

bot.login(config.token);