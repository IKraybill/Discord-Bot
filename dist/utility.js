"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const Command_1 = require("./Command");
const config = require("../config");
function evalCmd(message, code) {
    if (message.author.id !== config.owner)
        return;
    try {
        let evaled = eval(code);
        if (typeof evaled !== "string")
            evaled = util.inspect(evaled);
        message.channel.send(this.clean(evaled), { code: "xl" });
    }
    catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
    }
}
exports.evalCmd = evalCmd;
function clean(text) {
    if (typeof (text) !== 'string') {
        text = util.inspect(text, { depth: 0 });
    }
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(config.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0'); //Don't let it post your token
    return text;
}
exports.clean = clean;
/**
 * @deprecated
 * @param jokeObj
 */
function jokeObjToCommandArr(jokeObj) {
    let jokeCommands = [];
    for (let joke in jokeObj) {
        if (jokeObj.hasOwnProperty(joke)) {
            jokeCommands.push(new Command_1.Command(joke, function (message) {
                let first = jokeObj[joke][0];
                let punchline = jokeObj[joke][1];
                message.channel.send(first);
                setTimeout(() => { message.channel.send(punchline); }, 2000);
            }));
        }
    }
    jokeCommands.push(new Command_1.Command("help", function (message, args, parent) {
        message.channel.send(parent.helpText);
    }));
    return jokeCommands;
}
exports.jokeObjToCommandArr = jokeObjToCommandArr;
/**
 * Converts object (usually JSON) to array of objects (useful for Array.map)
 * @param obj: object to be converted
 * @returns {Array}: converted array
 */
function objToObjArray(obj) {
    let array = [];
    for (let name in obj) {
        if (obj.hasOwnProperty(name)) {
            array.push({ key: name, value: obj[name] });
        }
    }
    return array;
}
exports.objToObjArray = objToObjArray;
/**
 * @deprecated
 * @param funcArr
 */
function funcArrToFuncObj(funcArr) {
    let object = {};
    for (let i = 0; i < funcArr.length; i++) {
        object = eval("Object.assign({" + funcArr[i].name + ": funcArr[i].task}, object)");
    }
    return object;
}
//# sourceMappingURL=utility.js.map