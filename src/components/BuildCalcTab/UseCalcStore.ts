import { create } from 'zustand';
import { Environment } from './../../lib/models/Environment';
type CalcTabStore = {
    environment: Environment,
    suggestions: string[],
    lastInstruction: string,
    chainInstructions: string[],

    setSuggestions: (values: string[]) => void,
    setLastInstruction: (instruction: string) => void,
    addInstruction: (instruction: string) => void,
    setChainInstructions: (instructions: string[]) => void,
}

export const useCalcTabStore = create<CalcTabStore>()((set) => ({
    environment: new Environment(),
    suggestions: [],
    lastInstruction: "",
    chainInstructions: [],
    setSuggestions: (values) =>
        set(() => {
            return { suggestions: values }
        }),
    setLastInstruction: (value) =>
        set(() => {
            return { lastInstruction: value }
        }),
    addInstruction: (instruction) =>
        set((state) => (
            { chainInstructions: [...state.chainInstructions, instruction] }
        )),
    setChainInstructions: (instructions) =>
        set(() => {
            return { chainInstructions: instructions }
        }),
}))