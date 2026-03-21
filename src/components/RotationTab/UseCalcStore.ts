import { create } from 'zustand';
import { logHitType, logMsgCode, TerminalCmd } from './TerminalCommands';
type CalcTabStore = {
    labelText: string,
    possibleCommands: any,
    chainInstructions: string[],
    suggestions: string[],
    suggestionFocus: number,

    teammatesId: number[],
    logHistory: logMsgCode[],
    rotationList: logHitType[],

    dps: number,

    setLabelText: (instruction: string) => void,
    setPossibleCommands: (commandsMap: any) => void,
    setChainInstructions: (instructions: string[]) => void,
    setSuggestions: (values: string[]) => void,
    setSuggestionFocus: (suggestionFocus: number) => void,

    setTeammatesId: (team: number[]) => void,
    setLoghistory: (log: logMsgCode[]) => void,
    setRotationList: (list: logHitType[]) => void,

    setDps: (dps: number) => void,
}

export const useCalcTabStore = create<CalcTabStore>()((set) => ({
    labelText: "",
    possibleCommands: {},
    chainInstructions: [],
    suggestions: [],
    suggestionFocus: 0,

    teammatesId: [],
    logHistory: [],
    rotationList: [],

    dps: 0,

    setLabelText: x => set(() => ({ labelText: x })),
    setPossibleCommands: x => set(() => ({ possibleCommands: x })),
    setChainInstructions: x => set(() => ({ chainInstructions: x })),
    setSuggestions: x => set(() => ({ suggestions: x })),
    setSuggestionFocus: x => set(() => ({ suggestionFocus: x })),

    setTeammatesId: x => set(() => ({ teammatesId: x })),
    setLoghistory: x => set(() => ({ logHistory: x })),
    setRotationList: x => set(() => ({ rotationList: x })),

    setDps: x => set(() => ({ dps: x })),
}))

export const CalcTabController = {
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
    resetSuggestions: () => {
        useCalcTabStore.getState().setSuggestionFocus(0);
        useCalcTabStore.getState().setSuggestions([]);
    },
    resetInputText: () => {
        useCalcTabStore.getState().setLabelText("");
        useCalcTabStore.getState().setChainInstructions([]);
    }
}