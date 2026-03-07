import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    name: string
    cpf: string
    institution: string
    course: string
    type: 'aluno' | 'motorista' | 'gestor'
}

interface AuthState {
    token: string | null
    user: User | null
    isAuthenticated: boolean
    pagamentos: boolean
    lider: boolean
    setAuth: (token: string, user: User, pagamentos?: boolean, lider?: boolean) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            pagamentos: false,
            lider: false,
            setAuth: (token, user, pagamentos = false, lider = false) =>
                set({ token, user, isAuthenticated: true, pagamentos, lider }),
            logout: () =>
                set({ token: null, user: null, isAuthenticated: false, pagamentos: false, lider: false }),
        }),
        {
            name: 'ubus-auth',
        }
    )
)
