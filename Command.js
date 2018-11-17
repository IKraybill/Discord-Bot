class Command{
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

}

module.exports = Command;