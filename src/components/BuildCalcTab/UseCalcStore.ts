import { create } from 'zustand';
import DB from '../../lib/DB/db';
import { TerminalCommands } from './TerminalCommands';
type CalcTabStore = {
    suggestions: string[],
    labelText: string,
    chainInstructions: string[],
    mainDPSId: number,
    teammatesId: number[],
    possibleCommands: any,

    setSuggestions: (values: string[]) => void,
    setLabelText: (instruction: string) => void,
    setChainInstructions: (instructions: string[]) => void,
    setMainDPSId: (char: number) => void,
    setTeammatesId: (team: number[]) => void,
    setPossibleCommands: (commandsMap: any) => void,
}

export const useCalcTabStore = create<CalcTabStore>()((set) => ({
    suggestions: [],
    labelText: "",
    chainInstructions: [],
    mainDPSId: 0,
    teammatesId: [],
    possibleCommands: {},

    setSuggestions: x => set(() => ({ suggestions: x })),
    setLabelText: x => set(() => ({ labelText: x })),
    setChainInstructions: x => set(() => ({ chainInstructions: x })),
    setMainDPSId: x => set(() => ({ mainDPSId: x })),
    setTeammatesId: x => set(() => ({ teammatesId: x })),
    setPossibleCommands: x => set(() => ({ possibleCommands: x })),
}))

export const CalcTabController = {
    initTerminal: () => {
    },
    addInstruction: (instruction: string) => {
        const state = () => useCalcTabStore.getState();
        state().setChainInstructions([...state().chainInstructions, instruction])
        const instructions = state().chainInstructions;
        state().setLabelText(instructions.join(" ") + " ");
        state().setSuggestions([]);
    },
    executeInstruction: () => {
        try {
            const terminal = TerminalCommands.instance;
            const instructions = useCalcTabStore.getState().chainInstructions;
            const charId = terminal.commands[instructions[0]][instructions[1]][instructions[2]];
            if (!charId)
                return;

            terminal.env.mainDPS = DB.getCharacterById(charId);
            terminal.loadHits();

            useCalcTabStore.getState().setPossibleCommands(terminal.commands);
            useCalcTabStore.getState().setMainDPSId(charId);
            console.log(useCalcTabStore.getState().possibleCommands);
        } catch (e) {
            console.log(e);
        }
    }
}