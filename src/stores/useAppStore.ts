import { create } from 'zustand';

interface AppState {
  selectedAppId: string;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: string;

  setSelectedApp: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
  setMobilePanelOpen: (isOpen: boolean) => void;
  setActiveInspectorTab: (tab: string) => void;
  resetSelection: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: 'app-1', 
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',

  setSelectedApp: (id) => set({ 
    selectedAppId: id,
    selectedNodeId: null 
  }),

  setSelectedNode: (id) => set((state) => ({ 
    selectedNodeId: id,
    isMobilePanelOpen: !!id ? true : state.isMobilePanelOpen
  })),

  setMobilePanelOpen: (isOpen) => set({ 
    isMobilePanelOpen: isOpen 
  }),

  setActiveInspectorTab: (tab) => set({ 
    activeInspectorTab: tab 
  }),

  resetSelection: () => set({ 
    selectedNodeId: null, 
    isMobilePanelOpen: false 
  }),
}));