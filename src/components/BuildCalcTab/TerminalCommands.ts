import DB from "../../lib/DB/db";
import { Environment } from "../../lib/models/Environment";

export const commands = {
    "add": {
        "mainDPS": DB.getCharactersById(),
        "teammate": DB.getCharactersById(),
    },
    "remove": {
        "mainDPS": DB.getCharactersById(),
        "teammate": DB.getCharactersById(),
    },
}

export type CommandsKeys = keyof typeof commands;

export class TerminalCommands {
    env: Environment = new Environment();
    charsDict: Record<string, number> = {}
    possibleValues: string[] = []

    //transformar em singleton

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

    loadChars() {
        Object.values(DB.getCharactersById()).forEach((char) => {
            this.charsDict[char.name.toLowerCase()] = char.id;
        });
    }
}