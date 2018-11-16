const config = require('./config.json');
const jokes = require('./jokes.json');
const quotes = require('./quotes.json');
const daniel = require("./daniel.json");
const eightball = require('./eightball.json');
const CommandSet = require('./CommandSet');
const util = require('util');

let jokeFuncs = [];

for (let joke in jokes){
    if (jokes.hasOwnProperty(joke)) {
        jokeFuncs.push({name: joke, task: function(message) {
            let first = jokes[joke][0];
            let punchline = jokes[joke][1];

            message.channel.send(first);
            setTimeout(() => {message.channel.send(punchline);}, 2000);
        }})
    }
}

console.log(jokeFuncs);

console.log(CommandSet.toFuncObj(jokeFuncs));

module.exports = {
    hello: function(message) {
        message.channel.send(`Hello, ${message.author.toString()}`);
    },

    hi: function(message){
        message.channel.send(`Hello, ${message.author.toString()}`);
    },

    ping: function(message) {
        message.channel.send("pong");
    },

    eval: function (message, args) {
        if (message.author.id === config.owner){
            const code = args.join(" ");
            return evalCmd(message, code);
        }
    },

    wumpus: function (message) {
        message.channel.send("We do not talk about that");
    },

    // joke: function (message, args) {
    //     let defaultJoke = "Joke machine broke";
    //     if (args[0]) tellJoke(args[0], defaultJoke, message);
    //     else message.channel.send(defaultJoke);
    // },

    //joke: new SubCommandSet()

    quote: function (message) {
        message.channel.send(quotes[Math.floor(Math.random() * 2) + 1])
    },

    reee: function (message) {
        message.channel.send("Imagine my shock");
    },

    dice: function (message) {
        let x = Math.floor(Math.random() * 10000);
        message.channel.send("You rolled " + x + "!");
    },

    strong: function (message) {
        message.channel.send("What's 1000 minus 7?");
        message.channel.send("", {files: ["https://thumbs.gfycat.com/AromaticZigzagHamadryad-size_restricted.gif"]})
    },

    daniel: function (message) {
        let danielVals = Object.values(daniel);
        let random = Math.floor(Math.random() * danielVals.length);
        message.channel.send("", {files: [danielVals[random]]})
    },

    stop: function (message) {
        message.channel.send("Never.");
    },

    kill: function (message) {
        message.channel.send("OK. I will destroy all humans");
    },

    eightball: function (message) {
        let random = Math.floor(Math.random() * 20);
        message.channel.send(eightball[random + 1]);
    }
};

function tellJoke(joke, defaultJoke, message) {
    if (jokes[joke]){
        let first = jokes[joke][0];
        let punchline = jokes[joke][1];

        message.channel.send(first);
        setTimeout(() => {message.channel.send(punchline);}, 2000);
    } else message.channel.send(defaultJoke);
}

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
        .replace(config.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0'); //Don't let it post your token
    return text;
}