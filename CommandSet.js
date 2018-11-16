class CommandSet {
    constructor(prefix, helpBase, commandList){
        this.prefix = prefix;
        this.helpText = helpBase + ": ";
        this.commandNames = Object.keys(commandList);
        this.commandTasks = Object.values(commandList);
        for (let name in commandList) {
            this.helpText += (this.helpText === helpBase + ": " ? " " : ", ") + this.prefix + name;
        }
    }

    static toFuncArray(funcObj){
        // let commandNames = Object.keys(funcObj);
        // let commandTasks = Object.values(funcObj);
        let array = [];

        for (let name in funcObj){
            if (funcObj.hasOwnProperty(name)) {
                array.push({name: name, task: funcObj[name]})
            }
        }

        return array;
    }

    static toFuncObj(funcArr){
        let object = {};
        for (let i = 0; i < funcArr.length; i++){
            object = eval("Object.assign({"+funcArr[i].name+": funcArr[i].task}, object)");
        }
        return object;
    }
}

module.exports = CommandSet;