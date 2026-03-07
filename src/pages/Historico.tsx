import { CalendarDays, CheckCircle, XCircle, Clock } from 'lucide-react'

type TripStatus = 'completed' | 'no-show' | 'cancelled'

interface Trip {
    date: string
    type: string
    line: string
    status: TripStatus
    seat: number
}

const statusMap = {
    completed: { label: 'Concluída', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    'no-show': { label: 'Falta', icon: XCircle, color: 'text-red-600 bg-red-50' },
    cancelled: { label: 'Cancelada', icon: Clock, color: 'text-slate-500 bg-slate-50' },
}

export default function Historico() {
    const trips: Trip[] = []

    return (
        <div className="flex flex-col min-h-full bg-bg-light">
            <div className="px-6 pt-12 pb-4">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Histórico</h1>
                <p className="text-sm text-slate-500 mt-1">Suas viagens recentes</p>
            </div>

            <div className="flex-1 px-6 pb-6">
                {trips.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <CalendarDays size={28} className="text-slate-400" />
                        </div>
                        <h3 className="text-base font-bold text-slate-700 mb-1">Nenhuma viagem ainda</h3>
                        <p className="text-sm text-slate-500">Seu histórico de viagens aparecerá aqui.</p>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    )
}
