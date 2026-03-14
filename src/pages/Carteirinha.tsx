import { useAuthStore } from '@/store/useAuthStore'

export default function Carteirinha() {
    const user = useAuthStore((s) => s.user)

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
        : '?'

    return (
        <div className="flex flex-col min-h-full bg-white">
            <div className="px-6 pt-12 pb-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Carteirinha Digital</h1>
                <p className="text-sm text-slate-500 mt-1">Apresente ao motorista quando solicitado</p>
            </div>

            <div className="flex-1 flex flex-col items-center px-6 pt-4 pb-8">
                <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
                    <div className="bg-gradient-to-br from-cyan-500 via-[#3780f6] to-blue-700 px-6 pt-6 pb-4 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-3 border-white/40 bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
                            <div className="w-full h-full rounded-full bg-white/25 flex items-center justify-center text-white font-bold text-3xl">
                                {initials}
                            </div>
                        </div>
                        <h2 className="text-white font-bold text-xl text-center">{user?.name ?? '—'}</h2>
                    </div>

                    <div className="flex flex-col items-center px-6 py-6">
                        <div className="w-48 h-48 bg-white rounded-xl p-2 flex items-center justify-center border border-slate-100 shadow-sm mb-3">
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
                        <p className="text-[11px] text-slate-400 mb-6">
                            Gerado em: {new Date().toLocaleString('pt-BR')}
                        </p>

                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                <span className="text-xs text-slate-400 uppercase tracking-wider">CPF</span>
                                <span className="text-sm font-mono font-bold text-slate-900">{user?.cpf ?? '—'}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Email</span>
                                <span className="text-sm font-semibold text-slate-900">{user?.email ?? '—'}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Função</span>
                                <span className="text-sm font-semibold text-slate-900">{user?.role ?? '—'}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Status</span>
                                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    Ativo
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
