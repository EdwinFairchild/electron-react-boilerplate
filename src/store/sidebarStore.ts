import { create } from 'zustand';

interface SidebarStore {
  isLeftOpen: boolean;
  isRightOpen: boolean;
  toggleLeft: () => void;
  toggleRight: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isLeftOpen: true,
  isRightOpen: true,
  toggleLeft: () => set((state) => ({ isLeftOpen: !state.isLeftOpen })),
  toggleRight: () => set((state) => ({ isRightOpen: !state.isRightOpen })),
}));