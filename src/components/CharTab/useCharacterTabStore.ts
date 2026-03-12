import { create } from "zustand";
import DB from "../../lib/DB/db";
import { Character } from "../../lib/models/Character";

type CharacterTabValues = {
    selectedCharacter: Character,
    focusCharacter: number,
}

type CharacterTabActions = {
    setFocusCharacter: (focusCharacter: number) => void,
}

type CharacterTabState = CharacterTabValues & CharacterTabActions

export const useCharacterTabStore = create<CharacterTabState>()((set) => ({
    selectedCharacter: new Character(),
    focusCharacter: 0,
    setFocusCharacter: (focusCharacter) =>
        set(() => {
            if (!focusCharacter) return { focusCharacter: 0, selectedCharacter: new Character() }

            const selectedCharacter = DB.getCharacterById(focusCharacter)

            if (!selectedCharacter) return { focusCharacter: 0, selectedCharacter: new Character() }

            return { focusCharacter, selectedCharacter }
        }),
}));