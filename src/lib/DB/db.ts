import { create } from "zustand";
import { Character } from "../models/Character";

const state = {
    characters: [],
    activeCharacter: Character,
}

window.store = create((set) => ({
    characters: [],
    charactersById: {},
    activeCharacter: new Character(),

    setCharacters: (x: Character[]) => set(() => ({ characters: x })),
    setCharactersById: (x: Record<number, Character>) => set(() => ({ charactersById: x })),
    setActiveCharacter: (x) => set(() => ({ activeCharacter: x })),
}))

export const DB = {
    getCharacters: () => window.store.getState().characters,
    getCharacterById: (id: number) => window.store.getState().charactersById[id],

    getCharactersById: () => window.store.getState().charactersById,
    setCharactersById: (x: Record<number, Character>) => { window.store.getState().setCharactersById(x) },

    setActiveChar: (x: Character) => { window.store.getState().setActiveCharacter(x) },
    getActiveChar: () => window.store.getState().activeCharacter,

    setCharacters: (x: Character[]) => {
        const charactersById: Record<number, Character> = {};
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

    setStore: (x: { charactersById: Record<number, Character>, activeCharacter: Character }) => {
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