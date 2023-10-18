import { create } from 'zustand'

type State = {
    csrf: string
}

type Action = {
    updateCsrf: (firstName: State['csrf']) => void
}

const useCsrfStore = create<State & Action>((set) => ({
    csrf: '',
    updateCsrf: (csrf) => set(() => ({ csrf: csrf }))
}))

export default useCsrfStore