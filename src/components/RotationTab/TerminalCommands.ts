import DB from "../../lib/DB/db";
import { Character } from "../../lib/models/Character";
import { Environment } from "../../lib/models/Environment";
import { capitalized, formatKey, precisionRound } from "../../lib/Utils";
import { CalcTabController, useCalcTabStore } from "./UseCalcStore";

export const MSG_CODE = {
    ERROR: 0,
    SUCCESS: 1
}

export type logMsgCode = {
    "code": number,
    "msg": string,
    "cmd"?: string,
}

type CommandType = {
    "add": AddType
    "remove": () => Record<string, number>
    "hit": any
}

type AddType = {
    "mainDPS": () => Record<string, number>
    "teammate": () => Record<string, number>
}

const msgToTerminal = (code: number, msg: string): logMsgCode => ({
    "code": code,
    "msg": msg,
    "cmd": undefined,
})

export class TerminalCmd {
    static #instance: TerminalCmd
    charsDict: Record<string, number> = {}
    env: Environment = new Environment();
    addableChars: Record<string, number> = {}
    removableChars: Record<string, number> = {}
    hits: Record<string, number> = {}
    commands: CommandType = {} as CommandType

    private constructor() { }

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
            "remove": TerminalCmd.#instance.remove,
            "hit": TerminalCmd.#instance.addhit,
        }
        let rowResponse: logMsgCode;

        const useCalc = useCalcTabStore.getState();
        const [cmd, ...param]: string[] = instructions;

        if (!Object.keys(commandsFunctions).includes(cmd)) {
            rowResponse = msgToTerminal(MSG_CODE.ERROR, "Invalid command!")
            useCalc.setLoghistory([rowResponse, ...useCalc.logHistory]);
            return;
        }

        rowResponse = commandsFunctions[cmd](param);
        rowResponse["msg"] = capitalized(rowResponse["msg"]);
        rowResponse["cmd"] = useCalc.labelText;
        useCalc.setLoghistory([rowResponse, ...useCalc.logHistory]);

        CalcTabController.resetInputText();
        CalcTabController.resetSuggestions();
    }

    add(param: string[]): logMsgCode {
        const addMap: { [id: string]: (char: Character) => logMsgCode } = {
            "mainDPS": TerminalCmd.#instance.addMainDPS,
            "teammate": TerminalCmd.#instance.addTeammate,
        }

        const [param1, name] = param;

        if (!Object.keys(addMap).includes(param1)) {
            return msgToTerminal(MSG_CODE.ERROR, "Invalid parameter!");
        }

        if (!Object.keys(TerminalCmd.#instance.addableChars).includes(name)) {
            console.log(name);
            console.log(TerminalCmd.#instance.addableChars);
            return msgToTerminal(MSG_CODE.ERROR, "Invalid character!");
        }

        const char = DB.getCharacterById(TerminalCmd.#instance.addableChars[name]);
        return addMap[param1](char);
    }

    addMainDPS(char: Character) {
        const instance = TerminalCmd.#instance;
        if (instance.env.mainDPS.id !== 0) {
            return msgToTerminal(
                MSG_CODE.ERROR,
                "you need to remove the current main DPS first."
            );
        }

        instance.env.mainDPS = char;
        instance.loadHits();
        instance.removableChars[formatKey(char.name)] =
            instance.addableChars[formatKey(char.name)];

        delete instance.addableChars[formatKey(char.name)];

        useCalcTabStore.getState().setMainDPSId(char.id);
        useCalcTabStore.getState().setPossibleCommands(instance.commands);
        return msgToTerminal(
            MSG_CODE.SUCCESS,
            char.name.toLowerCase() + " was added as main DPS."
        );
    }

    addTeammate(char: Character) {
        const instance = TerminalCmd.#instance;
        if (instance.env.teammates.length >= 2) {
            return msgToTerminal(
                MSG_CODE.ERROR,
                "you need to remove at least one teammate first!"
            );
        }

        instance.removableChars[formatKey(char.name)] =
            instance.addableChars[formatKey(char.name)];

        delete instance.addableChars[formatKey(char.name)];
        instance.env.teammates.push(char);
        useCalcTabStore.getState().setTeammatesId(
            [...useCalcTabStore.getState().teammatesId, char.id]
        );
        return msgToTerminal(
            MSG_CODE.SUCCESS,
            char.name.toLowerCase() + " was added as teammate."
        );
    }

    remove(param: string[]): logMsgCode {
        const instance = TerminalCmd.#instance;
        const [name] = param;

        if (!Object.keys(instance.removableChars).includes(name)) {
            return msgToTerminal(MSG_CODE.ERROR, "Invalid character!");
        }

        if (instance.env.mainDPS.id === instance.removableChars[name]) {
            instance.env.mainDPS = new Character();
            useCalcTabStore.getState().setMainDPSId(0);
        } else {
            instance.env.teammates = instance.env.teammates
                .filter(char => char.id !== instance.removableChars[name]);

            useCalcTabStore.getState().setTeammatesId(
                instance.env.teammates.map(char => char.id)
            );
        }

        instance.addableChars[name] = instance.removableChars[name];
        delete instance.removableChars[name];


        return msgToTerminal(
            MSG_CODE.SUCCESS,
            name.toLowerCase() + " was removed from the team."
        );
    }

    addhit(hitId: string[]) {
        const instance = TerminalCmd.#instance;

        if (!instance.env.mainDPS.id) {
            return msgToTerminal(MSG_CODE.ERROR, "Choosen a mainDPS first!");
        }
        try {
            instance.env.addHit(hitId);
            useCalcTabStore.getState().setDps(precisionRound(instance.env.calcRotation(), 2));
            console.log(instance.env.dps);
            return msgToTerminal(MSG_CODE.SUCCESS, hitId.join(" ") + " added.");
        } catch (e) {
            return msgToTerminal(MSG_CODE.ERROR, "invalid Skill!");
        }




    }

    clear() {
        TerminalCmd.#instance.env = new Environment();
    }

    loadCommands() {
        const charsDict: Record<string, number> = {}
        Object.values(DB.getCharactersById()).forEach((char) => {
            charsDict[formatKey(char.name)] = char.id;
        });

        TerminalCmd.#instance.charsDict = charsDict;
        TerminalCmd.#instance.addableChars = charsDict;
        TerminalCmd.#instance.commands = {
            "add": {
                "mainDPS": () => TerminalCmd.#instance.addableChars,
                "teammate": () => TerminalCmd.#instance.addableChars,
            },
            "remove": () => TerminalCmd.#instance.removableChars,
            "hit": TerminalCmd.#instance.hits,
        }
    }

    loadHits() {
        this.commands["hit"] = this.env.mainDPS.skillKit.calculatedHits;
    }
}