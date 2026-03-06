import { create } from "zustand";
import DB from "../../lib/DB/db";
import { Character } from "../../lib/models/Character";

type CharacterTabValues = {
    selectedCharacter: Character,
    focusCharacter: string,
}

type CharacterTabActions = {
    setFocusCharacter: (focusCharacter: string) => void,
}

type CharacterTabState = CharacterTabValues & CharacterTabActions

export const useCharacterTabStore = create<CharacterTabState>()((set) => ({
    selectedCharacter: new Character(),
    focusCharacter: "",
    setFocusCharacter: (focusCharacter) =>
        set(() => {
            if (!focusCharacter) return { focusCharacter: "", selectedCharacter: new Character() }

            const selectedCharacter = DB.getCharacterById(focusCharacter)

            if (!selectedCharacter) return { focusCharacter: "", selectedCharacter: new Character() }

            return { focusCharacter, selectedCharacter }
        }),
}));