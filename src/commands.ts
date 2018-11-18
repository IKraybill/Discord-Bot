import {CommandSet} from "./CommandSet";
import * as utility from "./utility";
import {Command} from "./Command";
const config = require('../config.json');
const jokes = require('../data/jokes.json');
const quotes = require('../data/quotes.json');
const daniel = require("../data/daniel.json");
const eightball = require('../data/eightball.json');

let commands = [
    new Command("hello", function(message) {
        message.channel.send(`Hello, ${message.author.toString()}`);
    }),

    new Command("hi", function(message){
        message.channel.send(`Hello, ${message.author.toString()}`);
    }),

    new Command("ping", function(message) {
        message.channel.send("pong");
    }),

    new Command("eval", function (message, args) {
        if (message.author.id === config.owner){
            const code = args.join(" ");
            return utility.evalCmd(message, code);
        }
    }),

    new Command("cute", function (message) {
        message.channel.send("Very cute!");
        message.channel.send("Just like Miku");
    }),

    new CommandSet("joke", config.prefix + "joke ",
        "Possible jokes",
        utility.objToObjArray(jokes)
            .map(object =>
                new Command(object.key, function (message) {
                    let first = object.value[0];
                    let punchline = object.value[1];

                    message.channel.send(first);
                    setTimeout(() => {message.channel.send(punchline);}, 2000);
                }
            ))
    ),

    // new JokeCommandSet(config.prefix + "joke ",
    //     "Possible jokes",
    //     jokes
    // ),

    new Command("quote", function (message) {
        message.channel.send(quotes[Math.floor(Math.random() * 2) + 1])
    }),

    new Command("reee", function (message) {
        message.channel.send("Imagine my shock");
    }),

    new Command("dice", function (message) {
        let x = Math.floor(Math.random() * 10000);
        message.channel.send("You rolled " + x + "!");
    }),

    new Command("strong", function (message) {
        message.channel.send("What's 1000 minus 7?");
        message.channel.send({files: ["https://thumbs.gfycat.com/AromaticZigzagHamadryad-size_restricted.gif"]});
    }),

    new Command("daniel", function (message) {
        let danielVals = Object.keys(daniel).map(key => daniel[key]);
        let random = Math.floor(Math.random() * danielVals.length);
        message.channel.send({files: [danielVals[random]]});
    }),

    new Command("stop", function (message) {
        message.channel.send("Never.");
    }),

    new Command("kill", function (message) {
        message.channel.send("OK. I will destroy all humans");
    }),

    new Command("eightball", function (message) {
        let random = Math.floor(Math.random() * 20);
        message.channel.send(eightball[random + 1]);
    }),

    // new Command("help", function (message, args, parent) {
    //     message.channel.send(parent.helpText);
    // })
];

export {commands}