import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bus, Ticket } from 'lucide-react'
import { cn } from '@/lib/utils'

type TripType = 'ida' | 'volta' | 'ida-volta'
type SeatStatus = 'available' | 'occupied' | 'selected'

interface SeatData {
    id: number
    status: SeatStatus
}

const generateSeats = (): SeatData[] => {
    const occupied = [1, 2, 7, 8, 9, 10, 19, 20]
    return Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        status: occupied.includes(i + 1) ? 'occupied' as const : 'available' as const,
    }))
}

export default function Reservar() {
    const navigate = useNavigate()
    const [tripType, setTripType] = useState<TripType>('ida-volta')
    const [seats, setSeats] = useState<SeatData[]>(generateSeats)
    const [selectedSeats, setSelectedSeats] = useState<number[]>([])

    const toggleSeat = (id: number) => {
        const seat = seats.find((s) => s.id === id)
        if (!seat || seat.status === 'occupied') return

        if (selectedSeats.includes(id)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== id))
            setSeats(seats.map((s) => (s.id === id ? { ...s, status: 'available' as const } : s)))
        } else {
            setSelectedSeats([...selectedSeats, id])
            setSeats(seats.map((s) => (s.id === id ? { ...s, status: 'selected' as const } : s)))
        }
    }

    const leftSeats = seats.filter((_, i) => {
        const row = Math.floor(i / 4)
        const col = i % 4
        return col < 2
    }).length > 0 ? Array.from({ length: 5 }, (_, row) => [seats[row * 4], seats[row * 4 + 1]]) : []

    const rightSeats = Array.from({ length: 5 }, (_, row) => [seats[row * 4 + 2], seats[row * 4 + 3]])

    const seatClass = (status: SeatStatus) =>
        cn(
            'h-10 w-10 rounded-lg flex items-center justify-center text-xs font-medium transition-all',
            status === 'occupied' && 'bg-slate-200 text-slate-400 cursor-not-allowed',
            status === 'available' && 'border-2 border-primary/30 bg-white text-slate-600 cursor-pointer hover:border-primary hover:bg-primary/5',
            status === 'selected' && 'bg-primary text-white shadow-lg shadow-primary/40 font-bold ring-2 ring-primary ring-offset-2 ring-offset-white'
        )

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
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Tipo de Viagem</label>
                        <div className="flex p-1 bg-slate-200 rounded-xl">
                            {(['ida', 'volta', 'ida-volta'] as TripType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setTripType(type)}
                                    className={cn(
                                        'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all',
                                        tripType === type
                                            ? 'text-white bg-primary font-semibold shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    )}
                                >
                                    {type === 'ida' ? 'Apenas Ida' : type === 'volta' ? 'Apenas Volta' : 'Ida e Volta'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Detalhes</label>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                                    <Bus size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Ida: 18:00 (Linha 2)</p>
                                    <p className="text-xs text-slate-500">Campus Univ. → Terminal Central</p>
                                </div>
                            </div>
                            {tripType !== 'ida' && (
                                <>
                                    <div className="h-px w-full bg-slate-100" />
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                            <Bus size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Volta: 22:00</p>
                                            <p className="text-xs text-slate-500">Terminal Central → Bairro Norte</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <label className="self-start text-sm font-semibold text-slate-500 uppercase tracking-wide">Mapa de Assentos</label>
                        <div className="relative w-full max-w-[320px] bg-white rounded-[3rem] px-6 py-10 shadow-lg border border-slate-200">
                            <div className="absolute top-6 left-6 text-slate-300">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20" /></svg>
                            </div>
                            <div className="mt-10 flex justify-center">
                                <div className="grid grid-cols-[auto_16px_auto] gap-x-2 gap-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        {leftSeats.map((row, ri) =>
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
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] px-6 py-6 pb-8">
                <div className="max-w-md mx-auto w-full flex flex-col gap-4">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-500 uppercase">Resumo</span>
                            <span className="text-base font-semibold text-slate-900">
                                {selectedSeats.length > 0
                                    ? `Assento${selectedSeats.length > 1 ? 's' : ''} ${selectedSeats.sort((a, b) => a - b).join(', ')}`
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
                        onClick={() => selectedSeats.length > 0 && navigate('/bilhete')}
                        disabled={selectedSeats.length === 0}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform active:scale-[0.98] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Ticket size={20} />
                        <span>Confirmar Reserva</span>
                    </button>
                </div>
            </footer>
        </div>
    )
}
