import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Ban, Clock, CheckCircle } from 'lucide-react'

const regras = [
    {
        icon: Ban,
        title: 'Falta sem justificativa',
        description: 'Reservar e não comparecer ao embarque gera 1 advertência.',
        severity: 'warning' as const,
    },
    {
        icon: AlertTriangle,
        title: '3 advertências = Suspensão',
        description: 'Ao acumular 3 advertências, o acesso ao transporte é suspenso por 7 dias.',
        severity: 'danger' as const,
    },
    {
        icon: Clock,
        title: 'Horário de reserva',
        description: 'As reservas noturnas devem ser feitas até às 13:00. Após esse horário, o sistema fecha automaticamente.',
        severity: 'info' as const,
    },
    {
        icon: Ban,
        title: 'Cancelamento tardio',
        description: 'Cancelar a reserva após 1h antes do embarque conta como falta.',
        severity: 'warning' as const,
    },
    {
        icon: CheckCircle,
        title: 'Cancelamento antecipado',
        description: 'Cancelar com mais de 1h de antecedência libera a vaga sem penalidade.',
        severity: 'success' as const,
    },
    {
        icon: AlertTriangle,
        title: 'Uso do bilhete',
        description: 'O bilhete é pessoal e intransferível. Compartilhar gera suspensão imediata.',
        severity: 'danger' as const,
    },
]

const severityStyles = {
    info: 'bg-blue-50 border-blue-100 text-blue-600',
    warning: 'bg-orange-50 border-orange-100 text-orange-600',
    danger: 'bg-red-50 border-red-100 text-red-600',
    success: 'bg-emerald-50 border-emerald-100 text-emerald-600',
}

const severityIcon = {
    info: 'bg-blue-100 text-blue-600',
    warning: 'bg-orange-100 text-orange-600',
    danger: 'bg-red-100 text-red-600',
    success: 'bg-emerald-100 text-emerald-600',
}

export default function Regras() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col min-h-full bg-bg-light">
            <div className="flex items-center px-4 pt-12 pb-4 gap-3 sticky top-0 bg-white z-10 border-b border-slate-100">
                <button onClick={() => navigate('/perfil')} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-900">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-slate-900">Regras e Penalidades</h1>
            </div>

            <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Suas Advertências</p>
                        <p className="text-3xl font-bold text-emerald-600 mt-1">0</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-600">Sem penalidades</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-6 pb-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Regras do Sistema</h3>
                <div className="flex flex-col gap-3">
                    {regras.map((regra, i) => {
                        const Icon = regra.icon
                        return (
                            <div key={i} className={`p-4 rounded-2xl border ${severityStyles[regra.severity]} flex items-start gap-3`}>
                                <div className={`p-2 rounded-xl shrink-0 ${severityIcon[regra.severity]}`}>
                                    <Icon size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 mb-0.5">{regra.title}</p>
                                    <p className="text-xs leading-relaxed text-slate-600">{regra.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
