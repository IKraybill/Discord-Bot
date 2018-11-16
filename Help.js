class Help {
    constructor(intro, base){
        this.text = intro + ":";
        this.base = base;
        this.entries = 0;
    }

    addEntry(entry){
        this.text = this.text + (this.entries === 0 ? " " : ", ") + this.base + entry;
        //console.log("Help text: " + this.text);
        this.entries++;
    }
}

module.exports = Help;