import create from 'zustand';

type Page = 'Home' | 'Users' | 'Documents' | 'Settings';

interface SidebarState {
  isLeftOpen: boolean;
  toggleLeft: () => void;
  isRightOpen: boolean;
  toggleRight: () => void;
  selectedPage: Page;
  setSelectedPage: (page: Page) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isLeftOpen: true,
  toggleLeft: () => set((state) => ({ isLeftOpen: !state.isLeftOpen })),
  isRightOpen: false,
  toggleRight: () => set((state) => ({ isRightOpen: !state.isRightOpen })),
  selectedPage: 'Home',
  setSelectedPage: (page) => set({ selectedPage: page }),
}));
