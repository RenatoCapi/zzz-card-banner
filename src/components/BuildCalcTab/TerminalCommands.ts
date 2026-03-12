import DB from "../../lib/DB/db";
import { Environment } from "../../lib/models/Environment";

export const commands = {
    "add": [
        "mainDPS",
        "teammate",
    ],
    "remove": [
        "mainDPS",
        "teammate",
    ],
}

export type CommandsKeys = keyof typeof commands;

export class TerminalCommands {
    env: Environment = new Environment();
    charsDict: Record<string, number> = {}
    possibleValues: string[] = []

    constructor() {
        this.loadChars()
    }



    addMainDPS(name: string): string {
        if (this.env.mainDPS)
            return "remove the current mainDPS."

        this.env.mainDPS = DB.getCharacterById(this.charsDict[name]);
        return this.addMainDPS.name + " added!";
    }

    addhit(hitId: string[]) {
        if (this.env.mainDPS) {
            return "Choosen a mainDPS first!";
        }

        this.env.addHit(hitId[0], hitId[1], hitId[2]);
        this.env.calcRotation();
        console.log(this.env.dps);
    }
    add(param: string) {


        this.env.mainDPS = DB.getCharacterById(this.charsDict[param]);
    }

    clear() {
        this.env = new Environment()
    }

    private loadChars() {
        DB.getCharacters().forEach((char) => {
            this.charsDict[char.name] = char.id;
        })
    }
}