import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { api, ApiError } from '@/lib/api'
import type { LoginResponse } from '@/types'

export default function Login() {
    const navigate = useNavigate()
    const setAuth = useAuthStore((s) => s.setAuth)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await api.post<LoginResponse>('/auth/login', {
                email,
                password,
            })

            setAuth(data.accessToken, data.user)

            const role = data.user.role
            if (role === 'MOTORISTA') {
                navigate('/motorista')
            } else if (role === 'GESTOR' || role === 'SUPER_ADMIN') {
                navigate('/dashboard')
            } else {
                navigate('/dashboard')
            }
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) {
                setError('Email ou senha incorretos.')
            } else {
                setError('Erro de conexão. Tente novamente.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-white flex flex-col">
            <div className="flex items-center p-4 pb-2 justify-between">
                <button
                    onClick={() => navigate('/')}
                    className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-900"
                >
                    <ArrowLeft size={24} />
                </button>
            </div>

            <div className="flex flex-col px-6 pt-4 pb-6">
                <h1 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight text-left pb-3">
                    Bem-vindo de volta!
                </h1>
                <p className="text-slate-500 text-base font-normal leading-normal">
                    Informe seus dados para acessar a plataforma.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-2 w-full">
                <label className="flex flex-col w-full">
                    <p className="text-slate-900 text-sm font-medium leading-normal pb-2">Email</p>
                    <div className="flex w-full items-center rounded-xl bg-slate-100 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <input
                            className="flex-1 w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 h-14 px-4 text-base font-normal focus:ring-0 focus:outline-none"
                            placeholder="seu@email.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex items-center justify-center pr-4 text-slate-400">
                            <Mail size={24} />
                        </div>
                    </div>
                </label>

                <label className="flex flex-col w-full">
                    <p className="text-slate-900 text-sm font-medium leading-normal pb-2">Senha</p>
                    <div className="flex w-full items-center rounded-xl bg-slate-100 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <input
                            className="flex-1 w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 h-14 px-4 text-base font-normal focus:ring-0 focus:outline-none"
                            placeholder="Digite sua senha"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="flex items-center justify-center pr-4 text-slate-400 hover:text-primary transition-colors"
                        >
                            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                        </button>
                    </div>
                </label>

                <div className="flex justify-end">
                    <a className="text-primary text-sm font-medium hover:underline transition-all" href="#">
                        Esqueci minha senha
                    </a>
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
                )}

                <div className="h-4" />

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-primary h-14 px-4 text-white text-base font-bold tracking-wide hover:bg-blue-600 focus:ring-4 focus:ring-primary/30 transition-all shadow-lg shadow-primary/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? 'Entrando...' : 'Acessar Plataforma'}
                </button>
            </form>

            <div className="flex-1 flex flex-col justify-end pb-8 items-center text-center mt-auto">
                <p className="text-slate-400 text-sm">
                    Ainda não tem conta?{' '}
                    <button onClick={() => navigate('/cadastro')} className="text-primary font-medium">
                        Cadastre-se
                    </button>
                </p>
                <div className="mt-8 w-12 h-1 bg-slate-200 rounded-full" />
            </div>
        </div>
    )
}
