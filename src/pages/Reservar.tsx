import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Bus, Ticket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { api, ApiError } from '@/lib/api'
import type { Trip, CreateReservationPayload } from '@/types'

type SeatStatus = 'available' | 'occupied' | 'selected'

interface SeatData {
    id: number
    status: SeatStatus
}

export default function Reservar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { tripId, trip } = (location.state as { tripId?: string; trip?: Trip }) ?? {}
    const [seats, setSeats] = useState<SeatData[]>([])
    const [selectedSeat, setSelectedSeat] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const capacity = trip?.capacidadeReal ?? 40

    useEffect(() => {
        if (!tripId) {
            setLoading(false)
            return
        }

        const fetchSeats = async () => {
            try {
                const occupied = await api.get<number[]>(`/reservations/trip/${tripId}/occupied-seats`)
                const occupiedSet = new Set(Array.isArray(occupied) ? occupied : [])
                const seatList: SeatData[] = Array.from({ length: capacity }, (_, i) => ({
                    id: i + 1,
                    status: occupiedSet.has(i + 1) ? 'occupied' as const : 'available' as const,
                }))
                setSeats(seatList)
            } catch {
                // fallback: all available
                setSeats(Array.from({ length: capacity }, (_, i) => ({ id: i + 1, status: 'available' as const })))
            } finally {
                setLoading(false)
            }
        }
        fetchSeats()
    }, [tripId, capacity])

    const toggleSeat = (id: number) => {
        const seat = seats.find((s) => s.id === id)
        if (!seat || seat.status === 'occupied') return

        if (selectedSeat === id) {
            setSelectedSeat(null)
            setSeats(seats.map((s) => (s.id === id ? { ...s, status: 'available' as const } : s)))
        } else {
            // Deselect previous
            setSeats(seats.map((s) => {
                if (s.id === id) return { ...s, status: 'selected' as const }
                if (s.id === selectedSeat) return { ...s, status: 'available' as const }
                return s
            }))
            setSelectedSeat(id)
        }
    }

    const handleReserve = async () => {
        if (!tripId || selectedSeat === null) return
        setSubmitting(true)
        setError('')
        try {
            const payload: CreateReservationPayload = {
                tripId,
                seatNumber: selectedSeat,
            }
            await api.post('/reservations', payload)
            navigate('/bilhete', { state: { tripId, seatNumber: selectedSeat, trip } })
        } catch (err) {
            if (err instanceof ApiError) {
                const body = err.body as Record<string, unknown> | null
                setError(typeof body?.message === 'string' ? body.message : 'Erro ao reservar. Tente novamente.')
            } else {
                setError('Erro de conexão. Tente novamente.')
            }
        } finally {
            setSubmitting(false)
        }
    }

    // Generate 4-column layout
    const rows = Math.ceil(seats.length / 4)
    const leftSeats = Array.from({ length: rows }, (_, row) =>
        [seats[row * 4], seats[row * 4 + 1]].filter(Boolean)
    )
    const rightSeats = Array.from({ length: rows }, (_, row) =>
        [seats[row * 4 + 2], seats[row * 4 + 3]].filter(Boolean)
    )

    const seatClass = (status: SeatStatus) =>
        cn(
            'h-10 w-10 rounded-lg flex items-center justify-center text-xs font-medium transition-all',
            status === 'occupied' && 'bg-slate-200 text-slate-400 cursor-not-allowed',
            status === 'available' && 'border-2 border-primary/30 bg-white text-slate-600 cursor-pointer hover:border-primary hover:bg-primary/5',
            status === 'selected' && 'bg-primary text-white shadow-lg shadow-primary/40 font-bold ring-2 ring-primary ring-offset-2 ring-offset-white'
        )

    if (!tripId) {
        return (
            <div className="w-full max-w-md mx-auto min-h-screen bg-bg-light flex flex-col items-center justify-center p-6 text-center">
                <p className="text-slate-500">Nenhuma viagem selecionada.</p>
                <button onClick={() => navigate('/dashboard')} className="mt-4 text-primary font-medium">Voltar</button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-bg-light flex flex-col">
            <header className="flex items-center gap-4 px-6 pt-12 pb-4 bg-white shadow-sm z-20 shrink-0">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-slate-900 hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold tracking-tight">Nova Reserva</h1>
            </header>

            <main className="flex-1 overflow-y-auto relative">
                <div className="px-6 py-6 pb-40 flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Viagem</label>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                                    <Bus size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">
                                        {trip?.direcao ?? 'Viagem'} — {trip?.turno ?? ''}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {trip?.dataViagem ?? tripId} • {trip?.linha?.nome ?? ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <label className="self-start text-sm font-semibold text-slate-500 uppercase tracking-wide">Mapa de Assentos</label>
                            <div className="relative w-full max-w-[320px] bg-white rounded-[3rem] px-6 py-10 shadow-lg border border-slate-200">
                                <div className="absolute top-6 left-6 text-slate-300">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20" /></svg>
                                </div>
                                <div className="mt-10 flex justify-center">
                                    <div className="grid grid-cols-[auto_16px_auto] gap-x-2 gap-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            {leftSeats.map((row) =>
                                                row.map((seat) => (
                                                    <button
                                                        key={seat.id}
                                                        onClick={() => toggleSeat(seat.id)}
                                                        disabled={seat.status === 'occupied'}
                                                        className={seatClass(seat.status)}
                                                    >
                                                        {String(seat.id).padStart(2, '0')}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                        <div className="w-4" />
                                        <div className="grid grid-cols-2 gap-3">
                                            {rightSeats.map((row) =>
                                                row.map((seat) => (
                                                    <button
                                                        key={seat.id}
                                                        onClick={() => toggleSeat(seat.id)}
                                                        disabled={seat.status === 'occupied'}
                                                        className={seatClass(seat.status)}
                                                    >
                                                        {String(seat.id).padStart(2, '0')}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-center gap-4 text-[10px] font-medium text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-3 w-3 rounded-full bg-slate-200" />
                                        <span>Ocupado</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-3 w-3 rounded-full border border-primary bg-white" />
                                        <span>Livre</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-3 w-3 rounded-full bg-primary" />
                                        <span>Seu</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                            {error}
                        </div>
                    )}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] px-6 py-6 pb-8">
                <div className="max-w-md mx-auto w-full flex flex-col gap-4">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-500 uppercase">Resumo</span>
                            <span className="text-base font-semibold text-slate-900">
                                {selectedSeat
                                    ? `Assento ${String(selectedSeat).padStart(2, '0')}`
                                    : 'Nenhum assento selecionado'}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-medium text-slate-500 uppercase">Total</span>
                            <br />
                            <span className="text-base font-bold text-primary">Gratuito</span>
                        </div>
                    </div>
                    <button
                        onClick={handleReserve}
                        disabled={selectedSeat === null || submitting}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform active:scale-[0.98] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Ticket size={20} />
                        <span>{submitting ? 'Reservando...' : 'Confirmar Reserva'}</span>
                    </button>
                </div>
            </footer>
        </div>
    )
}
