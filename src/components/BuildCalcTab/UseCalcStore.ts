import { create } from 'zustand';
import { Character } from '../../lib/models/Character';
type CalcTabStore = {
    suggestions: string[],
    rawInstruction: string,
    chainInstructions: string[],
    mainDPS: Character,

    setSuggestions: (values: string[]) => void,
    setRawInstruction: (instruction: string) => void,
    addInstruction: (instruction: string) => void,
    setChainInstructions: (instructions: string[]) => void,
    setMainDPS: (char: Character) => void,
}

export const useCalcTabStore = create<CalcTabStore>()((set) => ({
    suggestions: [],
    rawInstruction: "",
    chainInstructions: [],
    mainDPS: new Character(),

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
    setMainDPS: (char) =>
        set(() => {
            return { mainDPS: char }
        }),
}))