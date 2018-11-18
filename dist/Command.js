"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    /**
     * Creates a command that the user can type in
     * @param name: name of the command; is what the user types in
     * @param task: function the command performs. has access to Discord messages, command arguments, and parent
     * command set
     */
    constructor(name, task) {
        this.name = name;
        this.task = task;
    }
    task(message, args, parent) {
        message.channel.send("Error, no task specified");
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map