import { CalendarDays, CheckCircle, XCircle, Clock } from 'lucide-react'

const trips = [
    { date: '28/02/2026', type: 'Ida e Volta', line: 'Linha 2 - UNIT', status: 'completed' as const, seat: 14 },
    { date: '27/02/2026', type: 'Apenas Ida', line: 'Linha 2 - UNIT', status: 'completed' as const, seat: 7 },
    { date: '26/02/2026', type: 'Ida e Volta', line: 'Linha 2 - UNIT', status: 'no-show' as const, seat: 14 },
    { date: '25/02/2026', type: 'Ida e Volta', line: 'Linha 2 - UNIT', status: 'completed' as const, seat: 3 },
    { date: '24/02/2026', type: 'Apenas Volta', line: 'Linha 2 - UNIT', status: 'completed' as const, seat: 14 },
]

const statusMap = {
    completed: { label: 'Concluída', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    'no-show': { label: 'Falta', icon: XCircle, color: 'text-red-600 bg-red-50' },
    cancelled: { label: 'Cancelada', icon: Clock, color: 'text-slate-500 bg-slate-50' },
}

export default function Historico() {
    return (
        <div className="flex flex-col min-h-full bg-bg-light">
            <div className="px-6 pt-12 pb-4">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Histórico</h1>
                <p className="text-sm text-slate-500 mt-1">Suas viagens recentes</p>
            </div>

            <div className="flex-1 px-6 pb-6">
                <div className="flex flex-col gap-3">
                    {trips.map((trip, i) => {
                        const s = statusMap[trip.status]
                        const Icon = s.icon
                        return (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-slate-900">{trip.type}</p>
                                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.color}`}>
                                            <Icon size={12} />
                                            {s.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-500">{trip.date}</span>
                                        <span className="text-slate-300 text-xs">•</span>
                                        <span className="text-xs text-slate-500">{trip.line}</span>
                                        <span className="text-slate-300 text-xs">•</span>
                                        <span className="text-xs text-slate-500">Poltrona {trip.seat}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
