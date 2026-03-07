import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Lock, FileText, Shield, ChevronRight, LogOut } from 'lucide-react'

export default function Perfil() {
    const navigate = useNavigate()

    const menuItems = [
        { icon: User, label: 'Meus Dados Pessoais', sub: 'Nome, CPF, Telefone', color: 'bg-primary/10 text-primary', route: '/meus-dados' },
        { icon: Lock, label: 'Alterar Senha', sub: 'Segurança da conta', color: 'bg-primary/10 text-primary', route: '/alterar-senha' },
        {
            icon: FileText,
            label: 'Renovar Semestre',
            sub: 'Documentação necessária',
            color: 'bg-orange-100 text-orange-600',
            badge: 'PENDENTE',
            route: '/renovar-semestre',
        },
        {
            icon: Shield,
            label: 'Regras e Penalidades',
            sub: <span>Você possui <span className="text-emerald-500 font-bold">0 advertências</span></span>,
            color: 'bg-primary/10 text-primary',
            route: '/regras',
        },
    ]

    return (
        <div className="flex flex-col min-h-full bg-white">
            <div className="flex items-center px-4 py-4 pt-12 pb-2 justify-between sticky top-0 bg-white z-10">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-900"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
                    Meu Perfil
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto pb-4">
                <div className="p-4 w-full">
                    <div className="relative w-full aspect-[1.586/1] rounded-xl shadow-[0_20px_40px_-15px_rgba(55,128,246,0.3)] overflow-hidden text-white group transition-transform duration-500 hover:scale-[1.02]">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-primary to-blue-700" />
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                        <div className="relative h-full flex flex-col justify-between p-5 z-10">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4 items-center">
                                    <div className="w-16 h-16 rounded-full border-2 border-white/30 p-0.5 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                                            JS
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-xl leading-tight">João Silva</h3>
                                        <p className="text-blue-100 text-xs font-medium opacity-90 tracking-wide mt-1">Universidade Tiradentes</p>
                                        <p className="text-blue-100 text-xs opacity-80 mt-0.5">CPF: 123.456.789-00</p>
                                    </div>
                                </div>
                                <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        {Array.from({ length: 10 }).map((_, row) =>
                                            Array.from({ length: 10 }).map((_, col) => (
                                                <rect
                                                    key={`${row}-${col}`}
                                                    x={col * 10}
                                                    y={row * 10}
                                                    width="8"
                                                    height="8"
                                                    rx="1"
                                                    fill={(row + col) % 3 === 0 ? '#1e293b' : ((row * col) % 5 < 2 ? '#1e293b' : 'transparent')}
                                                />
                                            ))
                                        )}
                                    </svg>
                                </div>
                            </div>
                            <div className="flex justify-between items-end mt-4">
                                <div>
                                    <p className="text-[10px] text-blue-200 uppercase tracking-wider mb-1">Matrícula</p>
                                    <p className="text-lg font-mono tracking-widest font-semibold">202300158</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="bg-emerald-400/20 border border-emerald-400/30 text-emerald-100 text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md">
                                        STATUS: ATIVO
                                    </span>
                                    <p className="text-[10px] font-medium text-white/80">Validade: 07/2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-2">
                    <h3 className="text-slate-900 text-sm font-semibold uppercase tracking-wider opacity-60 px-2 pb-3 pt-4">Configurações</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        {menuItems.map((item, i) => (
                            <div key={i}>
                                <button
                                    onClick={() => navigate(item.route)}
                                    className="w-full flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors group"
                                >
                                    <div className={`flex items-center justify-center rounded-xl shrink-0 size-10 group-hover:scale-110 transition-transform ${item.color}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div className="flex flex-col items-start flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-slate-900 text-sm font-medium leading-normal">{item.label}</p>
                                            {item.badge && (
                                                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-1 animate-pulse">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-500 text-xs font-normal leading-normal">{item.sub}</p>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                                </button>
                                {i < menuItems.length - 1 && <div className="h-px bg-slate-100 mx-4" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-4 mt-6">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 px-4 rounded-xl transition-all active:scale-95"
                    >
                        <LogOut size={20} />
                        Sair da Conta
                    </button>
                    <p className="text-center text-slate-400 text-xs mt-6 mb-4 font-mono opacity-60">v1.0.4</p>
                </div>
            </div>
        </div>
    )
}
