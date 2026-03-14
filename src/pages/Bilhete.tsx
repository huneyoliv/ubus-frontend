import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Bus, Clock, AlertTriangle } from 'lucide-react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'
import type { Reservation } from '@/types'

export default function Bilhete() {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useAuthStore((s) => s.user)
    const [time, setTime] = useState(new Date())

    const stateData = location.state as { reservationId?: string; reservation?: Reservation; tripId?: string; seatNumber?: number; trip?: unknown } | undefined
    const [reservation, setReservation] = useState<Reservation | null>(stateData?.reservation ?? null)
    const [loading, setLoading] = useState(!stateData?.reservation)
    const isRelocated = reservation?.status === 'EXCESSO'

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (reservation) return
        // Try to fetch from API
        if (stateData?.reservationId) {
            api.get<Reservation>(`/reservations/${stateData.reservationId}`)
                .then(setReservation)
                .catch(() => { /* noop */ })
                .finally(() => setLoading(false))
        } else {
            // Get latest reservation
            api.get<Reservation[]>('/reservations/minhas')
                .then((list) => {
                    if (list.length > 0) setReservation(list[0])
                })
                .catch(() => { /* noop */ })
                .finally(() => setLoading(false))
        }
    }, [stateData?.reservationId, reservation])

    const formatTime = (d: Date) =>
        d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

    const formatDate = (d: Date) =>
        d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })

    const bgGradient = isRelocated
        ? 'from-orange-500 via-amber-500 to-orange-600'
        : 'from-cyan-500 via-blue-500 to-indigo-600'

    if (loading) {
        return (
            <div className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center">
                <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const viagem = reservation?.viagem
    const seatDisplay = reservation?.numeroAssento ?? stateData?.seatNumber ?? '—'
    const dirDisplay = viagem?.direcao ?? 'Viagem'
    const linhaDisplay = viagem?.linha?.nome ?? viagem?.idViagem ?? reservation?.idViagem ?? '—'
    const turnoDisplay = viagem?.turno ?? ''
    const dataDisplay = viagem?.dataViagem ?? ''

    return (
        <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden flex flex-col">
            <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`} />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="flex items-center justify-between px-4 pt-12 pb-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-white font-bold text-lg">Bilhete Digital</h1>
                    <div className="w-10" />
                </div>

                {isRelocated && (
                    <div className="mx-6 mb-4 p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center gap-3">
                        <AlertTriangle size={20} className="text-white shrink-0" />
                        <div>
                            <p className="text-white font-bold text-sm">Transbordo Ativo</p>
                            <p className="text-white/80 text-xs">Você foi realocado para um veículo de apoio.</p>
                        </div>
                    </div>
                )}

                <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <div className="mb-8">
                        <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Horário Atual</p>
                        <div className="text-white text-6xl font-bold tracking-tight tabular-nums font-mono">
                            {formatTime(time)}
                        </div>
                        <p className="text-white/60 text-sm mt-2 capitalize">{formatDate(time)}</p>
                    </div>

                    <div className="w-full bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bus size={20} className="text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-bold text-base">{linhaDisplay}</p>
                                    <p className="text-white/70 text-xs">{dirDisplay} • {turnoDisplay}</p>
                                </div>
                            </div>
                            <div className="bg-white/20 px-3 py-1.5 rounded-full">
                                <p className="text-white text-xs font-bold">Poltrona {seatDisplay}</p>
                            </div>
                        </div>

                        <div className="h-px bg-white/20 mb-6" />

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-white border-2 border-white/50" />
                                <div className="w-0.5 h-10 bg-white/30" />
                                <div className="w-3 h-3 rounded-full border-2 border-white/50 bg-transparent" />
                            </div>
                            <div className="flex flex-col gap-6 flex-1">
                                <div>
                                    <p className="text-white/60 text-[10px] uppercase tracking-wider">Viagem</p>
                                    <p className="text-white font-semibold text-sm">{dataDisplay}</p>
                                </div>
                                <div>
                                    <p className="text-white/60 text-[10px] uppercase tracking-wider">ID</p>
                                    <p className="text-white font-semibold text-sm">{reservation?.idViagem ?? '—'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-white/20 mb-4" />

                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-white/50 text-[10px] uppercase">Passageiro</p>
                                <p className="text-white text-xs font-semibold mt-1">{user?.name ?? '—'}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-[10px] uppercase">CPF</p>
                                <p className="text-white text-xs font-semibold mt-1 font-mono">{user?.cpf ? `***${user.cpf.slice(-4)}` : '—'}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-[10px] uppercase">Status</p>
                                <div className="mt-1 inline-flex items-center gap-1 bg-emerald-400/30 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                                    {reservation?.status ?? 'ATIVO'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-10 pt-6">
                    <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
                        <Clock size={14} />
                        <span>Bilhete gerado em tempo real • Não compartilhe</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
