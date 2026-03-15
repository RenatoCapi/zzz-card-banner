import { create } from 'zustand';
import DB from '../../lib/DB/db';
import { Character } from '../../lib/models/Character';
import { TerminalCommands } from './TerminalCommands';
type CalcTabStore = {
    suggestions: string[],
    rawInstruction: string,
    chainInstructions: string[],
    mainDPS: Character,
    terminal: TerminalCommands,

    setSuggestions: (values: string[]) => void,
    setRawInstruction: (instruction: string) => void,
    setChainInstructions: (instructions: string[]) => void,
    setMainDPS: (char: Character) => void,
    setTerminal: (terminal: TerminalCommands) => void,
}

export const useCalcTabStore = create<CalcTabStore>()((set) => ({
    suggestions: [],
    rawInstruction: "",
    chainInstructions: [],
    mainDPS: new Character(),
    terminal: new TerminalCommands(),

    setSuggestions: (values) => set(() => ({ suggestions: values })),
    setRawInstruction: (value) => set(() => ({ rawInstruction: value })),
    setChainInstructions: (instructions) => set(() => ({ chainInstructions: instructions })),
    setMainDPS: (char) => set(() => ({ mainDPS: char })),
    setTerminal: (terminal) => set(() => ({ terminal: terminal })),
}))

export const CalcTabController = {
    addInstruction: (instruction: string) => {
        const state = () => useCalcTabStore.getState();
        state().setChainInstructions([...state().chainInstructions, instruction])
        const instructions = state().chainInstructions;
        state().setRawInstruction(instructions.join(" ") + " ");
        state().setSuggestions([]);
    },
    executeInstruction: () => {
        const state = () => useCalcTabStore.getState();
        try {

            const instructions = state().chainInstructions;
            const charId = state().terminal.commands[instructions[0]][instructions[1]][instructions[2]];
            const terminal = () => state().terminal;
            terminal().env.mainDPS = DB.getCharacterById(charId);
            terminal().loadHits();
            state().setTerminal(terminal())
        } catch (e) {
            console.log(e);
        }
    }
}