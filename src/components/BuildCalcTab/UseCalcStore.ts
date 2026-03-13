import { create } from 'zustand';
import { Environment } from './../../lib/models/Environment';
type CalcTabStore = {
    environment: Environment,
    suggestions: string[],
    rawInstruction: string,
    chainInstructions: string[],

    setSuggestions: (values: string[]) => void,
    setRawInstruction: (instruction: string) => void,
    addInstruction: (instruction: string) => void,
    setChainInstructions: (instructions: string[]) => void,
}

export const useCalcTabStore = create<CalcTabStore>()((set) => ({
    environment: new Environment(),
    suggestions: [],
    rawInstruction: "",
    chainInstructions: [],

    setSuggestions: (values) =>
        set(() => {
            return { suggestions: values }
        }),
    setRawInstruction: (value) =>
        set(() => {
            return { rawInstruction: value }
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