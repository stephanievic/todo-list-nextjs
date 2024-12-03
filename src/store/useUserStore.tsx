import { useApi } from "@/hooks/useApi"
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
    initializeUser: async() => {
        const response: User = await useApi.userLogged()

        console.log(response)

        set({ user: response })
    }
}))