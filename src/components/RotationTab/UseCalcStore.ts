import { create } from 'zustand';
import { logMsgCode, TerminalCmd } from './TerminalCommands';
type CalcTabStore = {
    labelText: string,
    possibleCommands: any,
    chainInstructions: string[],
    suggestions: string[],
    suggestionFocus: number,

    mainDPSId: number,
    teammatesId: number[],

    logHistory: logMsgCode[],

    dps: number,

    setLabelText: (instruction: string) => void,
    setPossibleCommands: (commandsMap: any) => void,
    setChainInstructions: (instructions: string[]) => void,
    setSuggestions: (values: string[]) => void,
    setSuggestionFocus: (suggestionFocus: number) => void,

    setMainDPSId: (char: number) => void,
    setTeammatesId: (team: number[]) => void,

    setLoghistory: (log: logMsgCode[]) => void,

    setDps: (dps: number) => void,
}

export const useCalcTabStore = create<CalcTabStore>()((set) => ({
    labelText: "",
    possibleCommands: {},
    chainInstructions: [],
    suggestions: [],
    suggestionFocus: 0,

    mainDPSId: 0,
    teammatesId: [],

    logHistory: [],

    dps: 0,

    setLabelText: x => set(() => ({ labelText: x })),
    setPossibleCommands: x => set(() => ({ possibleCommands: x })),
    setChainInstructions: x => set(() => ({ chainInstructions: x })),
    setSuggestions: x => set(() => ({ suggestions: x })),
    setSuggestionFocus: x => set(() => ({ suggestionFocus: x })),

    setMainDPSId: x => set(() => ({ mainDPSId: x })),
    setTeammatesId: x => set(() => ({ teammatesId: x })),

    setLoghistory: x => set(() => ({ logHistory: x })),

    setDps: x => set(() => ({ dps: x })),
}))

export const CalcTabController = {
    initTerminal: () => {
    },
    addInstruction: (instruction: string) => {
        const state = useCalcTabStore.getState();
        state.setChainInstructions([...state.chainInstructions, instruction]);
        const instructions = useCalcTabStore.getState().chainInstructions;
        state.setLabelText(instructions.join(" ") + " ");
        CalcTabController.resetSuggestions();
    },
    executeInstruction: () => {
        try {
            const instructions = useCalcTabStore.getState().chainInstructions;
            TerminalCmd.instance.executeCommand(instructions);

        } catch (e) {
            console.log(e);
        }
    },
    moveSuggestionFocus: (newIndex: number) => {
        useCalcTabStore.getState().setSuggestionFocus(newIndex);
    },
    resetSuggestions: () => {
        useCalcTabStore.getState().setSuggestionFocus(0);
        useCalcTabStore.getState().setSuggestions([]);
    },
    resetInputText: () => {
        useCalcTabStore.getState().setLabelText("");
        useCalcTabStore.getState().setChainInstructions([]);
    }
}