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
const CommandSet_1 = require("./CommandSet");
const utility = require("./utility");
const Command_1 = require("./Command");
const config = require('../config.json');
const jokes = require('../data/jokes.json');
const quotes = require('../data/quotes.json');
const daniel = require("../data/daniel.json");
const eightball = require('../data/eightball.json');
const nodemailer = require('nodemailer');
const ytdl = require("ytdl-core");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email,
        pass: config.emailpass
    }
});
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
        return __awaiter(this, void 0, void 0, function* () {
            let index = Math.floor(Math.random() * object.value.length);
            if (!isNaN(parseInt(args[0]))) {
                index = parseInt(args[0]) - 1;
            }
            console.log(index + 1);
            if (!object.value[index].includes("!file: ")) {
                console.log("hello");
                message.channel.send('"' + object.value[index] + '"');
            }
            else {
                let file = object.value[index].substring(7);
                yield message.channel.send('"', { files: [file] });
                message.channel.send('"');
            }
        });
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
    new Command_1.Command("bitcoin", function (message) {
        let random = Math.floor(Math.random() * 4);
        if (random === 1 && message.author.id === config.owner) {
            message.channel.send("You got bitcoin!");
        }
        else {
            message.channel.send("You didn't get bitcoin! loser");
        }
    }),
    new Command_1.Command("music", function (message, args, parent) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            let dispatcher;
            if (message.member.voiceChannel) {
                connection = yield message.member.voiceChannel.join();
            }
            else {
                message.channel.send("Not in a voice channel, silly!");
            }
            //console.log(connection);
            if (args[0]) {
                dispatcher = connection.playStream(ytdl(args[0], { filter: 'audioonly' }));
                console.log("playing stream");
            }
            else
                dispatcher = connection.playFile("res/music/Ievan_polkka.mp3");
            dispatcher.on('finish', () => {
                console.log('Finished playing!');
            });
        });
    }, "<search query or url>"),
    new Command_1.Command("email", function (message, args) {
        let recipient = "";
        if (args[0]) {
            recipient = args[0];
        }
        else {
            message.channel.send("No email input, silly!");
            return;
        }
        args.shift();
        let msg = "";
        if (args[0]) {
            msg = args.join(" ");
        }
        else {
            message.channel.send("No message input, silly!");
            return;
        }
        transporter.sendMail({
            from: config.email,
            to: recipient,
            subject: "Beep boop! incoming mail from Discord",
            text: msg
        }, function (error, info) {
            if (error) {
                console.log(error);
                message.channel.send("Error: email not sent. Did you input a valid email address?");
            }
            else {
                console.log('Email sent: ' + info.response);
                message.channel.send("Email sent!");
            }
        });
    }, "<address> <message>"),
    new Command_1.Command("eightball", function (message) {
        let random = Math.floor(Math.random() * 20);
        message.channel.send(eightball[random + 1]);
    })
];
exports.commands = commands;
//# sourceMappingURL=commands.js.map