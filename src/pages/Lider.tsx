import { useState, useEffect, useCallback } from 'react'
import { ShieldCheck, Users, AlertTriangle, CheckCircle, BellRing, X, Send } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import type { Reservation } from '@/types'

export default function Lider() {
    const [comMarcacao, setComMarcacao] = useState(true)
    const [passageiros, setPassageiros] = useState<Reservation[]>([])
    const [loading, setLoading] = useState(true)
    const [alertaEnviado, setAlertaEnviado] = useState(false)
    const [punicaoAplicada, setPunicaoAplicada] = useState(false)
    const [error, setError] = useState('')
    const [tripId, setTripId] = useState<string | null>(null)

    // Fetch open trips and pick the current one
    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const trips = await api.get<{ idViagem: string }[]>('/trips/open')
                if (Array.isArray(trips) && trips.length > 0) {
                    setTripId(trips[0].idViagem)
                }
            } catch {
                // silently fail
            }
        }
        fetchTrip()
    }, [])

    // Fetch passengers for current trip
    const fetchPassageiros = useCallback(async () => {
        if (!tripId) {
            setLoading(false)
            return
        }
        try {
            const data = await api.get<Reservation[]>(`/reservations/trip/${tripId}`)
            setPassageiros(Array.isArray(data) ? data : [])
        } catch {
            setPassageiros([])
        } finally {
            setLoading(false)
        }
    }, [tripId])

    useEffect(() => {
        fetchPassageiros()
    }, [fetchPassageiros])

    const totalReservados = passageiros.length
    const presentes = passageiros.filter(p => p.status === 'PRESENTE' || p.status === 'CONFIRMADA').length

    const handleEnviarAlerta = async () => {
        if (!tripId) return
        setError('')
        try {
            await api.post(`/trips/${tripId}/alerta-confirmacao`)
            setAlertaEnviado(true)
            setTimeout(() => {
                setAlertaEnviado(false)
                fetchPassageiros() // Refresh after alert
            }, 3000)
        } catch (err) {
            if (err instanceof ApiError) {
                const body = err.body as Record<string, unknown> | null
                setError(typeof body?.message === 'string' ? body.message : 'Erro ao enviar alerta.')
            }
        }
    }

    const handleAplicarPunicao = async () => {
        if (!tripId) return
        setError('')
        try {
            await api.post(`/trips/${tripId}/encerrar-e-punir`)
            setPunicaoAplicada(true)
            setTimeout(() => setPunicaoAplicada(false), 3000)
        } catch (err) {
            if (err instanceof ApiError) {
                const body = err.body as Record<string, unknown> | null
                setError(typeof body?.message === 'string' ? body.message : 'Erro ao aplicar punição.')
            }
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col min-h-full bg-slate-50 items-center justify-center">
                <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-full bg-slate-50 relative pb-24">
            <div className="px-6 pt-12 pb-4 bg-white border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-xl">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Painel do Líder</h1>
                        <p className="text-sm text-slate-500">
                            {tripId ? `Viagem: ${tripId}` : 'Nenhuma viagem ativa'}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setComMarcacao(true)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${comMarcacao ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Com Marcação
                    </button>
                    <button
                        onClick={() => setComMarcacao(false)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${!comMarcacao ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Sem Marcação
                    </button>
                </div>
            </div>

            <div className="flex-1 px-6 pt-6 flex flex-col gap-6">
                {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                        {error}
                    </div>
                )}

                {comMarcacao ? (
                    <>
                        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
                            <div>
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Status da Lotação</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-bold text-slate-900">{presentes} <span className="text-lg text-slate-400 font-medium">/ {totalReservados}</span></p>
                                    <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 flex items-center gap-1">
                                        <Users size={14} /> Embarcados
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-800">Lista de Passageiros</h3>
                                <span className="text-[10px] text-slate-500 font-medium bg-slate-200 px-2 py-0.5 rounded-full">{totalReservados} reservas</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                {passageiros.map(p => (
                                    <div
                                        key={p.id}
                                        className={`w-full flex items-center p-3 rounded-xl border transition-all text-left ${
                                            p.status === 'FALTOU'
                                                ? 'bg-red-50 border-red-200'
                                                : 'bg-white border-slate-200'
                                        }`}
                                    >
                                        <div className="flex-1">
                                            <p className={`text-sm font-semibold ${p.status === 'FALTOU' ? 'text-red-700' : 'text-slate-800'}`}>
                                                {p.usuario?.nome ?? `Usuário ${p.idUsuario.slice(0, 8)}`}
                                            </p>
                                            <p className={`text-[11px] font-medium mt-0.5 ${p.status === 'FALTOU' ? 'text-red-500' : 'text-slate-400'}`}>
                                                Assento {p.numeroAssento ?? 'Excesso'} • {p.status}
                                            </p>
                                        </div>
                                        {p.status === 'FALTOU' ? (
                                            <div className="w-8 h-8 rounded-full bg-red-200 text-red-600 flex items-center justify-center">
                                                <X size={18} />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                <CheckCircle size={18} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 pb-8">
                            <button
                                onClick={handleAplicarPunicao}
                                disabled={punicaoAplicada || !tripId}
                                className="w-full bg-red-600 active:bg-red-700 hover:bg-red-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/20 disabled:shadow-none transition-all flex justify-center items-center gap-2"
                            >
                                {punicaoAplicada ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                                {punicaoAplicada ? 'Punição Aplicada' : 'Confirmar Ausências e Punir'}
                            </button>
                            <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">Os alunos que faltaram receberão advertência automática no sistema.</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white rounded-2xl border border-blue-200 shadow-sm flex flex-col p-5 bg-gradient-to-br from-blue-50 to-white">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 text-primary rounded-lg shrink-0">
                                    <BellRing size={20} />
                                </div>
                                <h3 className="text-sm font-bold text-blue-900">Alerta Rápido</h3>
                            </div>
                            <p className="text-xs text-blue-800/80 leading-relaxed mb-4">
                                Envie uma notificação push para todos os alunos que registraram viagem agora. Eles terão 2 minutos para confirmar que estão no ônibus.
                            </p>
                            <button
                                onClick={handleEnviarAlerta}
                                disabled={alertaEnviado || !tripId}
                                className="w-full bg-primary active:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:bg-blue-300 disabled:shadow-none"
                            >
                                {alertaEnviado ? <CheckCircle size={18} /> : <Send size={18} />}
                                {alertaEnviado ? 'Alerta Enviado' : 'Enviar Alerta de Confirmação'}
                            </button>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-800 mb-4">Status de Confirmações</h3>
                            <div className="flex flex-col gap-2">
                                {passageiros.map(p => (
                                    <div key={p.id} className="w-full flex items-center p-3 rounded-xl border bg-white border-slate-200">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-800">
                                                {p.usuario?.nome ?? `Usuário ${p.idUsuario.slice(0, 8)}`}
                                            </p>
                                        </div>
                                        {p.status === 'CONFIRMADA' || p.status === 'PRESENTE' ? (
                                            <div className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center gap-1.5 text-[10px] font-bold">
                                                <CheckCircle size={12} /> Confirmado
                                            </div>
                                        ) : (
                                            <div className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-100 text-amber-600 flex items-center gap-1.5 text-[10px] font-bold">
                                                <ClockIcon size={12} /> {p.status}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 pb-8">
                            <button
                                onClick={handleAplicarPunicao}
                                disabled={punicaoAplicada || !tripId}
                                className="w-full bg-red-600 active:bg-red-700 hover:bg-red-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
                            >
                                {punicaoAplicada ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                                {punicaoAplicada ? 'Punição Aplicada' : 'Punir Alunos Não Confirmados'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
    const { size = 24, ...rest } = props
    return (
        <svg
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
