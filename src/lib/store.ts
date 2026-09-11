"use client";
import { create } from "zustand";
type UIStore = { dark: boolean; searchOpen: boolean; quickCreateOpen: boolean; toggleDark: () => void; setSearchOpen: (open: boolean) => void; setQuickCreateOpen: (open: boolean) => void; };
export const useUIStore = create<UIStore>((set) => ({ dark: false, searchOpen: false, quickCreateOpen: false, toggleDark: () => set((state) => ({ dark: !state.dark })), setSearchOpen: (searchOpen) => set({ searchOpen }), setQuickCreateOpen: (quickCreateOpen) => set({ quickCreateOpen }) }));
