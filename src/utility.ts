import * as util from "util";
import * as fs from "fs";

const config = require("../config");

function evalCmd(message, code) {
    if (message.author.id !== config.owner) return;
    try {
        let evaled = eval(code);
        if (typeof evaled !== "string")
            evaled = util.inspect(evaled);
        message.channel.send(this.clean(evaled), {code: "xl"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
    }
}

function getSongFromDir(path){
    let songFile;

    return new Promise(function (resolve) {
        fs.readdir(path, function (err, items) {
            let fileIndex = Math.floor(Math.random() * items.length);

            songFile = items[fileIndex];

            resolve(songFile);
        });
    })
}

function clean(text) {
    if (typeof(text) !== 'string') {
        text = util.inspect(text, {depth: 0});
    }
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(config.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0'); //Don't let it post your token
    return text;
}

/**
 * Converts object (usually JSON) to array of objects (useful for Array.map)
 * @param obj: object to be converted
 * @returns {Array}: converted array
 */
function objToObjArray(obj){
    let array = [];

    for (let name in obj){
        if (obj.hasOwnProperty(name)) {
            array.push({key: name, value: obj[name]})
        }
    }

    return array;
}

export {evalCmd, clean, objToObjArray, getSongFromDir}