import { create } from "zustand";

interface MenuState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}

const useMenuStore = create<MenuState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (value: boolean) => set({ mobileMenuOpen: value }),
}));

export default useMenuStore;
