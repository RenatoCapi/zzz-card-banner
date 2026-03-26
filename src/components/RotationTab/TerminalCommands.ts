import DB from "../../lib/DB/db";
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

export type logHitType = {
    "char": string,
    "hit": string,
    "dmg": number
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

    possibleCommands: Record<string, unknown> = {}
    commandsMaps: { [id: string]: (param: string[]) => logMsgCode } = {}

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
        const instance = TerminalCmd.#instance;
        let rowResponse: logMsgCode;

        const useCalc = useCalcTabStore.getState();
        const [cmd]: string[] = instructions;

        if (!Object.keys(instance.commandsMaps).includes(cmd)) {
            rowResponse = msgToTerminal(MSG_CODE.ERROR, "Invalid command!")
            useCalc.setLoghistory([rowResponse, ...useCalc.logHistory]);
            return;
        }

        rowResponse = instance.commandsMaps[cmd](instructions);
        rowResponse["msg"] = capitalized(rowResponse["msg"]);
        rowResponse["cmd"] = useCalc.labelText;
        useCalc.setLoghistory([rowResponse, ...useCalc.logHistory]);

        CalcTabController.resetInputText();
        CalcTabController.resetSuggestions();
    }

    add(instructions: string[]): logMsgCode {
        const instance = TerminalCmd.#instance;
        const [, ...param] = instructions;
        const [name] = param;

        if (Object.keys(instance.env.teammates).length >= 3) {
            return msgToTerminal(MSG_CODE.ERROR,
                "you need to remove at least one teammate first!");
        }

        if (!Object.keys(instance.addableChars).includes(name)) {
            console.log(instance.addableChars);
            return msgToTerminal(MSG_CODE.ERROR, "invalid character!");
        }

        const char = DB.getCharacterById(instance.addableChars[name]);
        instance.env.teammates[name] = char;
        instance.loadHits(name);
        instance.commandsMaps[name] = instance.addhit;

        instance.removableChars[name] = instance.addableChars[name];
        delete instance.addableChars[name];

        useCalcTabStore.getState().setTeammatesId(
            [...useCalcTabStore.getState().teammatesId, char.id]
        );

        return msgToTerminal(
            MSG_CODE.SUCCESS,
            char.name.toLowerCase() + " was added as teammate."
        );
    }

    remove(instructions: string[]): logMsgCode {
        const instance = TerminalCmd.#instance;
        const [, ...param] = instructions;
        const [name] = param;

        if (
            !Object.keys(instance.removableChars).includes(name)
            || !Object.keys(instance.env.teammates).includes(name)
        ) {
            return msgToTerminal(MSG_CODE.ERROR, "Invalid character!");
        }
        const charId = instance.env.teammates[name].id;
        useCalcTabStore.getState().setTeammatesId(
            useCalcTabStore.getState().teammatesId.filter(id => id !== charId)
        );

        instance.addableChars[name] = instance.removableChars[name];

        delete instance.env.teammates[name];
        delete instance.removableChars[name];
        delete instance.commandsMaps[name];
        if (typeof instance.possibleCommands === 'object')
            delete instance.possibleCommands[name];

        return msgToTerminal(
            MSG_CODE.SUCCESS,
            name.toLowerCase() + " was removed from the team."
        );
    }

    addhit(hitId: string[]) {
        const [charName, ...param] = hitId;
        const instance = TerminalCmd.#instance;

        if (!instance.env.teammates[charName].id) {
            return msgToTerminal(MSG_CODE.ERROR, "Choosen a character first!");
        }

        try {
            const dmg = instance.env.addHitDmg(hitId);
            useCalcTabStore.getState().setDps(precisionRound(instance.env.calcAllRotation(), 2));
            console.log(instance.env.dps);
            const hitLog: logHitType = { char: charName, hit: param.join(" "), dmg: dmg }
            useCalcTabStore.getState().setRotationList(
                [hitLog, ...useCalcTabStore.getState().rotationList]
            );
            return msgToTerminal(MSG_CODE.SUCCESS, hitId.join(" ") + " added.");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return msgToTerminal(MSG_CODE.ERROR, "invalid Skill!");
        }

    }

    clear() {
        TerminalCmd.#instance.env = new Environment();
    }

    loadCommands() {
        const charsDict: Record<string, number> = {}
        const instance = TerminalCmd.#instance;

        Object.values(DB.getCharactersById()).forEach((char) => {
            charsDict[formatKey(char.name)] = char.id;
        });

        instance.charsDict = charsDict;
        instance.addableChars = charsDict;
        instance.possibleCommands = {
            "add": () => instance.addableChars,
            "remove": () => instance.removableChars,
        }

        instance.commandsMaps = {
            "add": instance.add,
            "remove": instance.remove,
        }
    }

    loadHits(charName: string) {
        const instance = TerminalCmd.#instance;
        instance.possibleCommands[charName] = instance.env.teammates[charName].skillKit.calculatedHits;
    }
}