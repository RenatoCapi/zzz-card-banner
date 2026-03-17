import DB from "../../lib/DB/db";
import { Character } from "../../lib/models/Character";
import { Environment } from "../../lib/models/Environment";
import { useCalcTabStore } from "./UseCalcStore";

export const MSG_CODE = {
    ERROR: 0,
    SUCCESS: 1
}

export type logMsgCode = {
    "code": number,
    "msg": string,
}

export class TerminalCmd {
    static #instance: TerminalCmd

    env: Environment = new Environment();
    charsDict: Record<string, number> = {}
    possibleValues: string[] = []
    commands: any = {}

    private constructor() {
    }

    public static get instance(): TerminalCmd {
        if (!TerminalCmd.#instance) {
            TerminalCmd.#instance = new TerminalCmd();
            TerminalCmd.#instance.loadCommands();
            TerminalCmd.#instance.env = new Environment();
        }

        return TerminalCmd.#instance;
    }

    executeCommand(instructions: string[]) {
        const commandsFunctions: { [id: string]: (param: string[]) => logMsgCode } = {
            "add": TerminalCmd.#instance.add,
        }

        const useCalc = useCalcTabStore.getState();
        const [cmd, ...param]: string[] = instructions;

        const rowResponse = commandsFunctions[cmd](param);
        const formatedString = rowResponse["msg"].charAt(0).toUpperCase() + rowResponse["msg"].slice(1);
        rowResponse["msg"] = formatedString;
        useCalc.setLoghistory([rowResponse, ...useCalc.logHistory]);
        useCalc.setLabelText("");
        useCalc.setChainInstructions([]);
        useCalc.setSuggestionFocus(0);
        useCalc.setSuggestions([]);
        console.log(useCalc.possibleCommands);
    }

    add(param: string[]): logMsgCode {
        const addMap: { [id: string]: (char: Character) => logMsgCode } = {
            "mainDPS": TerminalCmd.#instance.addMainDPS,
            "teammate": TerminalCmd.#instance.addTeammate,
        }

        const [param1, name] = param;
        const char = DB.getCharacterById(TerminalCmd.#instance.charsDict[name])
        return addMap[param1](char);
    }

    addMainDPS(char: Character) {
        if (TerminalCmd.#instance.env.mainDPS.id !== 0) {
            return {
                "code": MSG_CODE.ERROR,
                "msg": "you need to remove the current main DPS first."
            }
        }

        TerminalCmd.#instance.env.mainDPS = char;
        TerminalCmd.#instance.loadHits();

        useCalcTabStore.getState().setMainDPSId(char.id);
        useCalcTabStore.getState().setPossibleCommands(TerminalCmd.#instance.commands);
        return {
            "code": MSG_CODE.SUCCESS,
            "msg": char.name.toLowerCase() + " was added as main DPS!"
        }
    }

    addTeammate(char: Character) {
        if (TerminalCmd.#instance.env.teammates.length >= 2) {
            return {
                "code": MSG_CODE.ERROR,
                "msg": "you need to remove at least one teammate first."
            }
        }

        TerminalCmd.#instance.env.teammates.push(char);
        useCalcTabStore.getState().setTeammatesId([...useCalcTabStore.getState().teammatesId, char.id]);
        return {
            "code": MSG_CODE.SUCCESS,
            "msg": char.name.toLowerCase() + " was added as teammate!"
        }
    }

    addhit(hitId: string[]) {
        if (!this.env.mainDPS.id) {
            return {
                "code": MSG_CODE.ERROR,
                "msg": "Choosen a mainDPS first!"
            }
        }

        this.env.addHit(hitId[0], hitId[1], hitId[2]);
        this.env.calcRotation();
        console.log(this.env.mainDPS);
    }

    clear() {
        this.env = new Environment();
    }

    loadCommands() {
        const charsDict: Record<string, number> = {}
        Object.values(DB.getCharactersById()).forEach((char) => {
            charsDict[char.name.toLowerCase().replace(" ", "-")] = char.id;
        });

        TerminalCmd.#instance.charsDict = charsDict;
        TerminalCmd.#instance.commands = {
            "add": {
                "mainDPS": charsDict,
                "teammate": charsDict,
            },
            "remove": {
                "mainDPS": charsDict,
                "teammate": charsDict,
            },
            "hit": {}
        }
    }

    loadHits() {
        this.commands["hit"] = this.env.mainDPS.skillKit.calculatedHits;
    }
}