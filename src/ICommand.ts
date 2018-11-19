export interface ICommand {
    name: string
    argHelp?: string

    task?(message, args, parent)
    parseCommand?(message)
}