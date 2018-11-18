export interface ICommand {
    name: string

    task?(message, args, parent)
    parseCommand?(message)
}