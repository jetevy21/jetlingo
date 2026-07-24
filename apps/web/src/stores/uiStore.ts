import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  isModalOpen: boolean;
  modalType: string | null;
  modalData: unknown;

  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  isMobileMenuOpen: false,
  isModalOpen: false,
  modalType: null,
  modalData: null,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  openModal: (type, data) =>
    set({ isModalOpen: true, modalType: type, modalData: data }),
  closeModal: () =>
    set({ isModalOpen: false, modalType: null, modalData: null }),
}));
