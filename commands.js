const config = require('./config.json');
const jokes = require('./jokes.json');
const quotes = require('./quotes.json');
const daniel = require("./daniel.json");
const util = require('util');

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

    eval: function (message) {
        if (message.author.id === config.owner){
            const code = args.join(" ");
            return evalCmd(message, code);
        }
    },

    wumpus: function (message) {
        message.channel.send("We do not talk about that");
    },

    joke: function (message) {
        let defaultJoke = "Joke machine broke";
        if (args[0]) tellJoke(args[0], defaultJoke, message);
        else message.channel.send(defaultJoke);
    },

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
        let x = Math.floor(Math.random() * 21);
        switch(x){
            case 1: message.channel.send("It is certain.");
                break;
            case 2: message.channel.send("It is decidedly so.");
                break;
            case 3: message.channel.send("Without a doubt.");
                break;
            case 4: message.channel.send("Yes-definitely.");
                break;
            case 5: message.channel.send("You may rely on it.");
                break;
            case 6: message.channel.send("As I see it, yes.");
                break;
            case 7: message.channel.send("Most likely.");
                break;
            case 8: message.channel.send("Outlook good.");
                break;
            case 9: message.channel.send("Yes.");
                break;
            case 10: message.channel.send("Signs point to yes.");
                break;
            case 11: message.channel.send("Reply hazy, try again.");
                break;
            case 12: message.channel.send("Ask again later.");
                break;
            case 13: message.channel.send("Better not tell you now.");
                break;
            case 14: message.channel.send("Cannot predict now.");
                break;
            case 15: message.channel.send("Concentrate and ask again.");
                break;
            case 16: message.channel.send("Don't count on it.");
                break;
            case 17: message.channel.send("My reply is no.");
                break;
            case 18: message.channel.send("My sources say no");
                break;
            case 19: message.channel.send("Outlook not so good.");
                break;
            case 20: message.channel.send("Very doubtful.");
                break;
        }
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