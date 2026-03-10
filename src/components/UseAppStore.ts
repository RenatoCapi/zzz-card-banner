import { create } from "zustand";

interface AppState {
    sidebarState: boolean;
    reverseSidebarState: () => void;
}

export const useAppStore = create<AppState>()((set) => ({
    sidebarState: false,
    reverseSidebarState: () => set((state) => (
        { sidebarState: !state.sidebarState }
    )),
}));