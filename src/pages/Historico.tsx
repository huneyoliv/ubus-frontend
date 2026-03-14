import { useState, useEffect } from 'react'
import { CalendarDays, CheckCircle, XCircle, Clock } from 'lucide-react'
import { api } from '@/lib/api'
import type { Reservation, StatusReserva } from '@/types'

const statusMap: Record<StatusReserva, { label: string; icon: typeof CheckCircle; color: string }> = {
    CONFIRMADA: { label: 'Confirmada', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    PRESENTE: { label: 'Presente', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    FALTOU: { label: 'Falta', icon: XCircle, color: 'text-red-600 bg-red-50' },
    CANCELADA_SISTEMA: { label: 'Cancelada', icon: Clock, color: 'text-slate-500 bg-slate-50' },
    EXCESSO: { label: 'Excesso', icon: Clock, color: 'text-amber-600 bg-amber-50' },
}

export default function Historico() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get<Reservation[]>('/reservations/minhas')
            .then((data) => setReservations(Array.isArray(data) ? data : []))
            .catch(() => setReservations([]))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="flex flex-col min-h-full bg-bg-light">
            <div className="px-6 pt-12 pb-4">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Histórico</h1>
                <p className="text-sm text-slate-500 mt-1">Suas viagens recentes</p>
            </div>

            <div className="flex-1 px-6 pb-6">
                {loading ? (
                    <div className="flex flex-col gap-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : reservations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <CalendarDays size={28} className="text-slate-400" />
                        </div>
                        <h3 className="text-base font-bold text-slate-700 mb-1">Nenhuma viagem ainda</h3>
                        <p className="text-sm text-slate-500">Seu histórico de viagens aparecerá aqui.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {reservations.map((res) => {
                            const s = statusMap[res.status] ?? statusMap.CONFIRMADA
                            const Icon = s.icon
                            return (
                                <div key={res.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <CalendarDays size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-slate-900">
                                                {res.viagem?.direcao ?? 'Viagem'} — {res.viagem?.turno ?? ''}
                                            </p>
                                            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.color}`}>
                                                <Icon size={12} />
                                                {s.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-slate-500">{res.viagem?.dataViagem ?? ''}</span>
                                            <span className="text-slate-300 text-xs">•</span>
                                            <span className="text-xs text-slate-500">{res.viagem?.linha?.nome ?? res.idViagem}</span>
                                            <span className="text-slate-300 text-xs">•</span>
                                            <span className="text-xs text-slate-500">Poltrona {res.numeroAssento ?? 'Excesso'}</span>
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
