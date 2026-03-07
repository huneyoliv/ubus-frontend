import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Bell, Sun, Moon, ArrowRight, CheckCircle, AlertTriangle,
    Clock, MapPin, MessageCircle, CalendarCheck
} from 'lucide-react'

const RESERVATION_WINDOW = {
    noite: { open: 0, close: 13 },
}

const pickupPoints: Record<string, { ida: string; volta: string }> = {
    unit: { ida: 'Praça do GBarbosa', volta: 'Em frente à UNIT' },
    ufs: { ida: 'Praça do GBarbosa', volta: 'Parada da UFS' },
    ifs: { ida: 'Praça do GBarbosa', volta: 'Terminal IFS' },
    outros: { ida: 'Praça do GBarbosa', volta: 'Em frente à Drogasil' },
}

interface TripData {
    id: string
    type: 'ida' | 'volta'
    time: string
    line: string
    seat: number
    pickup: string
    destination: string
    driverStarted: boolean
}

export default function Home() {
    const navigate = useNavigate()
    const [currentTime, setCurrentTime] = useState(new Date())
    const userLine = 'unit'
    const points = pickupPoints[userLine]

    const [hasReservation] = useState(true)
    const [trips] = useState<TripData[]>([
        {
            id: '1',
            type: 'ida',
            time: '18:00',
            line: 'Linha 2 - UNIT',
            seat: 14,
            pickup: points.ida,
            destination: 'Campus UNIT',
            driverStarted: false,
        },
        {
            id: '2',
            type: 'volta',
            time: '22:00',
            line: 'Linha 2 - UNIT',
            seat: 14,
            pickup: points.volta,
            destination: 'Praça do GBarbosa',
            driverStarted: false,
        },
    ])

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 30000)
        return () => clearInterval(timer)
    }, [])

    const currentHour = currentTime.getHours()
    const window = RESERVATION_WINDOW.noite
    const isReservationOpen = currentHour >= window.open && currentHour < window.close
    const isAfterDeadline = currentHour >= window.close

    const formatOpenTime = `${String(window.open).padStart(2, '0')}:00`
    const formatCloseTime = `${String(window.close).padStart(2, '0')}:00`

    return (
        <div className="flex flex-col min-h-full bg-bg-light">
            <div className="flex items-center justify-between px-6 pt-12 pb-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-slate-200 ring-2 ring-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                            JS
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-bg-light rounded-full" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900">Olá, João!</h2>
                        <p className="text-xs text-slate-500 font-medium">Estudante</p>
                    </div>
                </div>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-colors relative">
                    <Bell size={24} />
                    {isReservationOpen && (
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white animate-pulse" />
                    )}
                    {isAfterDeadline && !hasReservation && (
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                    )}
                </button>
            </div>

            <div className="flex-1 px-6 pb-6">
                <div className="mt-2 mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm">
                        <CheckCircle size={18} />
                        <p className="text-sm font-semibold">Verificado: Linha 2 - UNIT</p>
                    </div>
                </div>

                {isReservationOpen && (
                    <div className="mb-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                        <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600 shrink-0">
                            <CalendarCheck size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-blue-800 mb-0.5">Reservas Abertas!</p>
                            <p className="text-xs leading-relaxed text-blue-700/80">
                                Faça sua reserva até às {formatCloseTime}. Após esse horário, não será possível reservar online.
                            </p>
                        </div>
                    </div>
                )}

                <div className="mb-4 p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-start gap-3">
                    <div className="p-1.5 bg-orange-100 rounded-lg text-orange-600 shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-orange-800 mb-0.5">Aviso Importante</p>
                        <p className="text-xs leading-relaxed text-orange-700/80">
                            Sua categoria é Prioridade 2. Reservas sujeitas a disponibilidade.
                        </p>
                    </div>
                </div>

                {isReservationOpen && (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Reserve sua Viagem</h3>
                            <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                                Até {formatCloseTime}
                            </span>
                        </div>
                        <button
                            onClick={() => navigate('/reservar')}
                            className="w-full p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group mb-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <CalendarCheck size={24} />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-base font-bold text-slate-900">Nova Reserva</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Escolha ida, volta ou ida e volta</p>
                                </div>
                                <ArrowRight size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                            </div>
                        </button>
                    </>
                )}

                {isAfterDeadline && hasReservation && (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Suas Viagens de Hoje</h3>
                        </div>
                        {trips.map((trip) => (
                            <div
                                key={trip.id}
                                className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 mb-4 transition-all hover:shadow-md"
                            >
                                <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none">
                                    {trip.type === 'ida' ? <Sun size={100} /> : <Moon size={100} />}
                                </div>
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="flex flex-col">
                                        <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${trip.type === 'ida' ? 'text-amber-500' : 'text-indigo-500'
                                            }`}>
                                            {trip.type === 'ida' ? 'Tarde' : 'Noite'}
                                        </span>
                                        <h4 className="text-base font-bold text-slate-900 leading-tight">
                                            {trip.type === 'ida' ? 'Ida para Faculdade' : 'Volta para Casa'}
                                        </h4>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-bold text-slate-900 tracking-tight">{trip.time}</span>
                                        <span className="text-xs text-slate-500">Embarque</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-2 relative z-10">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${trip.type === 'ida' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'
                                        }`}>
                                        <MapPin size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-800">{trip.pickup}</span>
                                        <span className="text-xs text-slate-500">
                                            {trip.driverStarted
                                                ? '🟢 Motorista a caminho'
                                                : '⏳ Aguardando início do trajeto'}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between mb-4 relative z-10">
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <span className="font-medium">{trip.line}</span>
                                        <span className="text-slate-300">•</span>
                                        <span>Poltrona {trip.seat}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/bilhete')}
                                    className={`w-full py-3 px-4 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.98] relative z-10 ${trip.type === 'ida'
                                            ? 'bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20'
                                        }`}
                                >
                                    <CheckCircle size={18} />
                                    <span>Ver Bilhete</span>
                                </button>
                            </div>
                        ))}
                    </>
                )}

                {isAfterDeadline && !hasReservation && (
                    <div className="mt-2">
                        <div className="p-6 rounded-2xl bg-red-50 border border-red-100 text-center">
                            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <Clock size={28} className="text-red-500" />
                            </div>
                            <h3 className="text-base font-bold text-red-800 mb-2">Horário de Reserva Encerrado</h3>
                            <p className="text-sm text-red-700/80 leading-relaxed mb-4">
                                O prazo para reservas era até às {formatCloseTime}. Para verificar alocação disponível, entre em contato com o líder do ônibus.
                            </p>
                            <button className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
                                <MessageCircle size={18} />
                                <span>Contatar Líder do Ônibus</span>
                            </button>
                        </div>
                    </div>
                )}

                {!isReservationOpen && !isAfterDeadline && (
                    <div className="mt-2">
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                <Clock size={28} className="text-slate-400" />
                            </div>
                            <h3 className="text-base font-bold text-slate-700 mb-2">Reservas Fechadas</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                As reservas para o período noturno abrem às {formatOpenTime} e encerram às {formatCloseTime}.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
