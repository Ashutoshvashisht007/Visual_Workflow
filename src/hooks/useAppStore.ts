import { create } from 'zustand';

interface AppState {
    selectedAppId: string | null;
    selectedNodeId: string | null;
    isMobilePanelOpen: boolean;

    setSelectedApp: (id: string) => void;
    setSelectedNode: (id: string | null) => void;
    toggleMobilePanel: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedAppId: 'app-1', 
    selectedNodeId: null,
    isMobilePanelOpen: false,

    setSelectedApp: (id) => set({ selectedAppId: id }),
    setSelectedNode: (id) => set({
        selectedNodeId: id,
        isMobilePanelOpen: !!id
    }),
    toggleMobilePanel: (isOpen) => set({ isMobilePanelOpen: isOpen }),
}));