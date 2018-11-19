"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandSet_1 = require("./CommandSet");
const utility = require("./utility");
const Command_1 = require("./Command");
const config = require('../config.json');
const jokes = require('../data/jokes.json');
const quotes = require('../data/quotes.json');
const daniel = require("../data/daniel.json");
const eightball = require('../data/eightball.json');
let commands = [
    new Command_1.Command("hello", function (message) {
        message.channel.send(`Hello, ${message.author.toString()}`);
    }),
    new Command_1.Command("eval", function (message, args) {
        if (message.author.id === config.owner) {
            const code = args.join(" ");
            return utility.evalCmd(message, code);
        }
    }),
    new Command_1.Command("cute", function (message) {
        message.channel.send("Very cute!");
        message.channel.send("Just like Miku");
    }),
    new CommandSet_1.CommandSet("joke", config.prefix, "Possible jokes", utility.objToObjArray(jokes).map(object => new Command_1.Command(object.key, function (message) {
        let first = object.value[0];
        let punchline = object.value[1];
        message.channel.send(first);
        setTimeout(() => { message.channel.send(punchline); }, 2000);
    }))),
    new CommandSet_1.CommandSet("quote", config.prefix, "Possible quote authors", utility.objToObjArray(quotes).map(object => new Command_1.Command(object.key, function (message, args) {
        let index = Math.floor(Math.random() * object.value.length);
        if (!isNaN(parseInt(args[0]))) {
            index = parseInt(args[0]) - 1;
        }
        console.log(index + 1);
        message.channel.send('"' + object.value[index] + '"');
    }, "[number]"))),
    new Command_1.Command("strong", function (message) {
        message.channel.send("What's 1000 minus 7?");
        message.channel.send({ files: ["https://thumbs.gfycat.com/AromaticZigzagHamadryad-size_restricted.gif"] });
    }),
    new Command_1.Command("daniel", function (message) {
        let danielVals = Object.keys(daniel).map(key => daniel[key]);
        let random = Math.floor(Math.random() * danielVals.length);
        message.channel.send({ files: [danielVals[random]] });
    }),
    new Command_1.Command("stop", function (message) {
        message.channel.send("Never.");
    }),
    new Command_1.Command("kill", function (message) {
        message.channel.send("OK. I will destroy all humans");
    }),
    new Command_1.Command("eightball", function (message) {
        let random = Math.floor(Math.random() * 20);
        message.channel.send(eightball[random + 1]);
    }),
];
exports.commands = commands;
//# sourceMappingURL=commands.js.map