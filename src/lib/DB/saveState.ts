import DB from "./db";

export const SaveState = {
    save: () => {
        const state = {
            charactersById: DB.getCharactersById(),
            activeCharacter: DB.getActiveChar(),
        }
        console.log('Saved state');
        const stateString = JSON.stringify(state);
        localStorage.state = stateString;

        return stateString;
    },
    load: () => {
        try {
            const state = localStorage.state
            if (state) {
                const parsed = JSON.parse(state);
                console.log('Loaded SaveState');
                DB.setStore(parsed);
                return true;
            }

            console.log('No SaveState found')
            return false;
        } catch (e) {
            console.error('Error loading state', e)
            // localStorage.clear();
            return false;
        }
    },
}