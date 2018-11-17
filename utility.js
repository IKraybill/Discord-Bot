config = require("./config");
const Command = require('./Command');

module.exports = {
    /**
     * @deprecated
     * @param jokeObj
     * @param joke
     * @param defaultJoke
     * @param message
     */
    tellJoke: function (jokeObj, joke, defaultJoke, message) {
        let jokes = this.jokeObjToCommandArr(jokeObj);
        if (jokes[joke]) {
            let first = jokes[joke][0];
            let punchline = jokes[joke][1];

            message.channel.send(first);
            setTimeout(() => {
                message.channel.send(punchline);
            }, 2000);
        } else message.channel.send(defaultJoke);
    },

    evalCmd: function (message, code) {
        if (message.author.id !== config.owner) return;
        try {
            let evaled = eval(code);
            if (typeof evaled !== "string")
                evaled = util.inspect(evaled);
            message.channel.send(this.clean(evaled), {code: "xl"});
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
        }
    },

    clean: function (text) {
        if (typeof(text) !== 'string') {
            text = util.inspect(text, {depth: 0});
        }
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(config.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0'); //Don't let it post your token
        return text;
    },

    jokeObjToCommandArr: function (jokeObj) {
        let jokeCommands = [];

        for (let joke in jokeObj){
            if (jokeObj.hasOwnProperty(joke)) {
                jokeCommands.push(new Command(joke, function(message) {
                    let first = jokeObj[joke][0];
                    let punchline = jokeObj[joke][1];

                    message.channel.send(first);
                    setTimeout(() => {message.channel.send(punchline);}, 2000);
                }));
            }
        }

        jokeCommands.push(new Command("help", function (message, args, parent) {
                message.channel.send(parent.helpText);
            })
        );

        return jokeCommands;
    },

    /**
     * @deprecated
     * @param funcObj
     * @returns {Array}
     */
    funcObjToFuncArray: function (funcObj){
        let array = [];

        for (let name in funcObj){
            if (funcObj.hasOwnProperty(name)) {
                array.push({name: name, task: funcObj[name]})
            }
        }

        return array;
    },

    /**
     * @deprecated
     * @param funcArr
     */
    funcArrToFuncObj: function (funcArr){
        let object = {};
        for (let i = 0; i < funcArr.length; i++){
            object = eval("Object.assign({"+funcArr[i].name+": funcArr[i].task}, object)");
        }
        return object;
    }
};