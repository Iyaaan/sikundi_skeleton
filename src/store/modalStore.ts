import { create } from 'zustand'

type modalStore = {
    modal: boolean,
    on: () => void,
    off: () => void,
    toggle: () => void
}

export const useModalStore = create<modalStore>((set) => ({
    modal: false,
    on: () => set((state) => ({ modal: true })),
    off: () => set((state) => ({ modal: false })),
    toggle: () => set((state) => ({ modal: !state.modal }))
}));