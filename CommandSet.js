const Help = require('./Help.js');

class CommandSet {
    constructor(prefix, helpbase, commandList){
        this.prefix = prefix;
        this.help = new Help(helpbase, prefix);
        this.commands = [];
        let commandNames = Object.keys(commandList);
        let commandTasks = Object.values(commandList);
        for (let i = 0; i < commandNames.length; i++) {
            this.addEntry(commandNames[i], commandTasks[i]);
        }
    }

    addEntry(name, task){
        this.help.addEntry(name);
        this.commands.push({name: name, task: task});
    }
}

module.exports = CommandSet;