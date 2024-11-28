import { create } from "zustand"

interface UserStore {
    user: User | null
    setUser: (userData: User) => void
    exit: () => void
    initializeUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (userData: User) => {
        set({ user: userData })
    },
    exit: () => {
        set({ user: null })
    },
    initializeUser: () => {
        //cookie

        // validar se existe
            // caso exista -> enviar token para backend e retorna usuário
    }
}))