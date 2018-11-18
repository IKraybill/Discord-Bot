"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const CommandSet_1 = require("./CommandSet");
const Discord = require("discord.js");
const config = require("../config");
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
let baseSet = new CommandSet_1.CommandSet("command", config.prefix, "Possible commands", commands_1.commands);
bot.on("ready", () => {
    bot.user.setActivity(config.prefix + 'help'); //set a default game
    console.log(`Bot is online!\n${bot.users.size} users, in ${bot.guilds.size} servers connected.`);
});
bot.on("guildCreate", guild => {
    console.log(`I've joined the guild ${guild.name} (${guild.id}), owned by ${guild.owner.user.username} (${guild.owner.user.id}).`);
});
bot.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
    if (message.author.bot || message.system)
        return; // Ignore bots
    if (message.channel.type === 'dm') { // Direct Message
        return; //Optionally handle direct messages
    }
    console.log(message.content); // Log chat to console for debugging/testing
    if (message.content.indexOf(config.prefix) === 0) {
        baseSet.parseCommand(message);
    }
    else if (message.content.indexOf("<@" + bot.user.id) === 0 || message.content.indexOf("<@!" + bot.user.id) === 0) { // Catch @Mentions
        return message.channel.send(`Use \`${config.prefix}\` to interact with me.`); //help people learn your prefix
    }
}));
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
//# sourceMappingURL=index.js.map