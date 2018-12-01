import kotlin.js.Json

external fun require(module: String): dynamic



fun main(args: Array<String>) {
    val message = "Hello JavaScript!"

    //language=JavaScript
    js("var discord = require('discord.js')")
    //language=JavaScript
    val bot = js("new discord.Client({ disableEveryone: true, disabledEvents: ['TYPING_START']})")

    println(message)
}