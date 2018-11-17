class CommandSet {
    /**
     * A governing class for sets of commands, can contain commands and other command sets
     * @param name: name of the command set
     * @param prefix: prefix used for help string
     * @param helpBase: base text displayed with help command
     * @param commands: array of command objects
     */
    constructor(name, prefix, helpBase, commands){
        this.name = name;
        this.prefix = prefix;
        this.helpText = helpBase + ": ";
        this.commands = commands;
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].name !== "help") {
                this.helpText += (this.helpText === helpBase + ": " ? " " : ", ") + this.prefix + commands[i].name;
            }
        }
    }

    /**
     * Parses the given command or command set
     * @param message: Dicord message object, used for sending messages to the user and for
     * command arguments, e.g. prefix + joke has one argument for base command set, but none for joke command set
     */
    parseCommand(message){
        let cmd = "";
        let msg = message.content.slice(this.prefix.length);
        let args = msg.split(" "); // break the message into part by spaces
        if (args[0]) {
            cmd = args[0].toLowerCase();
        }
        args.shift();

        let isCommand = false;
        let index = 0;
        for (let i = 0; i < this.commands.length; i++) {
            if (this.commands[i].name === cmd) {
                isCommand = true;
                index = i;
            }
        }
        if (isCommand){
            if (this.commands[index].constructor.name === "Command") {
                this.commands[index].task(message, args, this);
            } else if (this.commands[index].constructor.name === "CommandSet") {
                this.commands[index].parseCommand(message);
            }
        } else {

            message.channel.send("Unknown "+this.name+", nigga. Try " + this.prefix + "help");
        }
    }
}

module.exports = CommandSet;