import { create } from "zustand";
import { Character } from "../models/Character";

const state = {
    characters: [],
    metadata: {},
    activeCharacter: Character,
}

window.store = create((set) => ({
    characters: [],
    charactersById: {},
    activeCharacter: new Character(),

    setCharacters: (x) => set(() => ({ characters: x })),
    setCharactersById: (x) => set(() => ({ charactersById: x })),
    setActiveCharacter: (x) => set(() => ({ activeCharacter: x })),
}))

export const DB = {
    getMetadata: () => state.metadata,
    setMetadata: (x: any) => state.metadata = x,

    getCharacters: () => window.store.getState().characters,
    getCharacterById: (id: string) => window.store.getState().charactersById[id],

    getCharactersById: () => window.store.getState().charactersById,
    setCharactersById: (x: Record<string, Character>) => { window.store.getState().setCharactersById(x) },

    setActiveChar: (x: Character) => { window.store.getState().setActiveCharacter(x) },
    getActiveChar: () => window.store.getState().activeCharacter,

    setCharacters: (x: Character[]) => {
        const charactersById: Record<string, Character> = {};
        for (const character of x) {
            charactersById[character.id] = character;
        }

        const newCharacterArray = [...x]
        window.store.getState().setCharacters(newCharacterArray)
        window.store.getState().setCharactersById(charactersById)
    },

    setCharacter: (x: Character) => {
        const charactersById = window.store.getState().charactersById
        charactersById[x.id] = x

        window.store.getState().setActiveCharacter(x)
        window.store.getState().setCharactersById(charactersById)
    },
    addCharacter: (x: Character) => {
        const characters = DB.getCharacters()
        characters.push(x)
        DB.setCharacters(characters)
    },
    getState: () => window.store.getState(),

    setStore: (x: { charactersById: Record<string, Character>, activeCharacter: Character }) => {
        //const dbCharacters = DB.getMetadata().characters
        DB.setActiveChar(x.activeCharacter)
        DB.setCharactersById(x.charactersById)
    },

    resetStore: () => {
        DB.setStore({
            charactersById: {},
            activeCharacter: new Character(),
        })
    },
}

export default DB