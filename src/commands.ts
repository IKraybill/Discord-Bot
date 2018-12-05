import {CommandSet} from "./CommandSet";
import * as utility from "./utility";
import {Command} from "./Command";
import {getSongFromDir} from "./utility";
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
    new Command("hello", message => {
        message.channel.send(`Hello, ${message.author.toString()}`);
    }),

    new Command("eval", (message, args) => {
        if (message.author.id === config.owner){
            const code = args.join(" ");
            return utility.evalCmd(message, code);
        }
    }),

    new Command("cute", (message) => {
        message.channel.send("Very cute!");
        message.channel.send("Just like Miku");
    }),

    new CommandSet("joke", config.prefix, "Possible jokes",
        utility.objToObjArray(jokes).map(object =>
            new Command(object.key, message => {
                let first = object.value[0];
                let punchline = object.value[1];

                message.channel.send(first);
                setTimeout(() => {message.channel.send(punchline);}, 2000);
            })
        )
    ),

    new CommandSet("quote", config.prefix, "Possible quote authors",
        utility.objToObjArray(quotes).map(object =>
            new Command(object.key, async (message, args) => {
                let index = Math.floor(Math.random() * object.value.length);
                if (!isNaN(parseInt(args[0]))){
                    index = parseInt(args[0]) - 1;
                }
                console.log(index + 1);
                if (!object.value[index].includes("!file: ")) {
                    console.log("hello");
                    message.channel.send('"' + object.value[index] + '"');
                } else {
                    let file = object.value[index].substring(7);
                    await message.channel.send('"',{files: [file]});
                    message.channel.send('"');
                }
            }, "[number]")
        )
    ),

    new Command("strong", message => {
        message.channel.send("What's 1000 minus 7?");
        message.channel.send({files: ["https://thumbs.gfycat.com/AromaticZigzagHamadryad-size_restricted.gif"]});
    }),

    new Command("daniel", (message) => {
        let danielVals = Object.keys(daniel).map(key => daniel[key]);
        let random = Math.floor(Math.random() * danielVals.length);
        message.channel.send({files: [danielVals[random]]});
    }),

    new Command("stop", (message) => {
        message.channel.send("Never.");
    }),

    new Command("kill", (message) => {
        message.channel.send("OK. I will destroy all humans");
    }),

    new Command("bitcoin", (message) => {
        let random = Math.floor(Math.random() * 4);
        if (random === 1 && message.author.id === config.owner){
            message.channel.send("You got bitcoin!");
        } else {
            message.channel.send("You didn't get bitcoin! loser");
        }
    }),

    new Command("music", async (message, args) => {
        let connection;
        let dispatcher;
        if (message.member.voiceChannel){
            connection = await message.member.voiceChannel.join();
        } else {
            message.channel.send("Not in a voice channel, silly!");
        }
        //console.log(connection);
        if (args[0]) {
            if (args[0].startsWith("https://")) {
                dispatcher = connection.playStream(ytdl(args[0], {filter: 'audioonly'}));
                console.log("playing stream");
            } else if (args[0].toLowerCase() === "vocaloid") {
                let path = "res/music/vocaloid";

                let songFile = await getSongFromDir(path);
                console.log(songFile);
                let songPath = path + "/" + songFile;
                message.channel.send("Now playing: " + songFile);

                dispatcher = connection.playFile(songPath);

            }

            dispatcher.on('finish', () => {
                console.log('Finished playing!');
            });
        }


    }, "<search query or url>"),

    new Command("email", (message, args) => {
        let recipient = "";
        if (args[0]) {
            recipient = args[0];
        } else {
            message.channel.send("No email input, silly!");
            return;
        }
        args.shift();
        let msg = "";
        if (args[0]) {
            msg = args.join(" ");
        } else {
            message.channel.send("No message input, silly!");
            return;
        }

        transporter.sendMail({
            from: config.email,
            to: recipient,
            subject: "Beep boop! incoming mail from Discord",
            text: msg
        }, (error, info) => {
            if (error) {
                console.log(error);
                message.channel.send("Error: email not sent. Did you input a valid email address?");
            } else {
                console.log('Email sent: ' + info.response);
                message.channel.send("Email sent!");
            }
        })
    }, "<address> <message>"),

    new Command("eightball", message => {
        let random = Math.floor(Math.random() * 20);
        message.channel.send(eightball[random + 1]);
    })
];

export {commands}