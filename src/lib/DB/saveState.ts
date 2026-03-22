import DB from "./db";

export const SaveState = {
    save: () => {
        try {
            const state = {
                charactersById: DB.getCharactersById(),
            }
            console.log('Saved state');
            const stateString = JSON.stringify(state);
            localStorage.state = stateString;
            return stateString;
        } catch (e) {
            console.error('Error saving state ', e)
            // localStorage.clear();
            return e;
        }
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
            console.error('Error loading state ', e)
            // localStorage.clear();
            return false;
        }
    },
}