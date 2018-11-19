import {CommandSet} from "./CommandSet";
import {ICommand} from "./ICommand";

export class Command implements ICommand{
    name: string;
    argHelp: string;

    /**
     * Creates a command that the user can type in
     * @param name: name of the command; is what the user types in
     * @param task: function the command performs. has access to Discord messages, command arguments, and parent
     * command set
     * @param argHelp
     */
    constructor(name, task, argHelp = null) {
        this.name = name;
        this.task = task;
        this.argHelp = argHelp;
    }

    task(message, args: string[], parent: CommandSet){
        message.channel.send("Error, no task specified");
    }

}