import { create } from 'zustand';
import { TerminalCmd } from './TerminalCommands';
type CalcTabStore = {
    suggestions: string[],
    labelText: string,
    chainInstructions: string[],
    mainDPSId: number,
    teammatesId: number[],
    possibleCommands: any,
    logHistory: string[],

    setSuggestions: (values: string[]) => void,
    setLabelText: (instruction: string) => void,
    setChainInstructions: (instructions: string[]) => void,
    setMainDPSId: (char: number) => void,
    setTeammatesId: (team: number[]) => void,
    setPossibleCommands: (commandsMap: any) => void,
    setLoghistory: (log: string[]) => void,
}

export const useCalcTabStore = create<CalcTabStore>()((set) => ({
    suggestions: [],
    labelText: "",
    chainInstructions: [],
    mainDPSId: 0,
    teammatesId: [],
    possibleCommands: {},
    logHistory: [],

    setSuggestions: x => set(() => ({ suggestions: x })),
    setLabelText: x => set(() => ({ labelText: x })),
    setChainInstructions: x => set(() => ({ chainInstructions: x })),
    setMainDPSId: x => set(() => ({ mainDPSId: x })),
    setTeammatesId: x => set(() => ({ teammatesId: x })),
    setPossibleCommands: x => set(() => ({ possibleCommands: x })),
    setLoghistory: x => set(() => ({ logHistory: x })),
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
            const terminal = TerminalCmd.instance;

            const instructions = useCalcTabStore.getState().chainInstructions;

            terminal.executeCommand(instructions);

        } catch (e) {
            console.log(e);
        }
    },
    addLogRow: (row: string) => {
        const state = () => useCalcTabStore.getState();
        state().setLoghistory([...state().logHistory, row])
    }
}