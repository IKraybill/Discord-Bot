import {CommandSet} from "./CommandSet";
import {Command} from "./Command";
import * as utility from "./utility";

/**
 * This class is broken
 * @deprecated for now
 */
export class JokeCommandSet extends CommandSet {
    constructor(prefix, helpBase, jokeObj){
        console.log(jokeObj);
        let jokeCommands: Command[] = [];

        for (let joke in jokeObj){
            console.log(joke);
            console.log(jokeObj.hasOwnProperty(joke));
            if (jokeObj.hasOwnProperty(joke)) {
                console.log(jokeObj.key);
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

        for (let i in jokeCommands){
            console.log("Joke command" + jokeCommands[i].task);
        }

        console.log("Joke commands" + jokeCommands);

        super("joke", prefix, "Possible jokes", utility.jokeObjToCommandArr(jokeObj));
    }
}