import { useState } from 'react'
import { ShieldCheck, MapPin, Users, AlertTriangle, CheckCircle, BellRing, X, Send } from 'lucide-react'

// Dados mockados
const passageirosMock = [
    { id: 1, nome: 'Ana Paula', assento: '01', presente: true, confirmou: true },
    { id: 2, nome: 'Carlos Mendes', assento: '02', presente: true, confirmou: true },
    { id: 3, nome: 'João Silva', assento: '03', presente: true, confirmou: false },
    { id: 4, nome: 'Mariana Costa', assento: '04', presente: true, confirmou: true },
    { id: 5, nome: 'Pedro Henrique', assento: '05', presente: true, confirmou: false },
    { id: 6, nome: 'Beatriz Santos', assento: '06', presente: true, confirmou: true },
]

export default function Lider() {
    const [comMarcacao, setComMarcacao] = useState(true)
    const [passageiros, setPassageiros] = useState(passageirosMock)
    const [alertaEnviado, setAlertaEnviado] = useState(false)
    const [punicaoAplicada, setPunicaoAplicada] = useState(false)

    // Total de reservados (mock)
    const totalReservados = 40
    const confirmados = passageiros.filter(p => comMarcacao ? p.presente : p.confirmou).length
    const diferenca = comMarcacao ? totalReservados - confirmados : 0

    const togglePresenca = (id: number) => {
        setPassageiros(prev => prev.map(p => p.id === id ? { ...p, presente: !p.presente } : p))
    }

    const handleEnviarAlerta = () => {
        setAlertaEnviado(true)
        setTimeout(() => setAlertaEnviado(false), 3000)
        // Simula as pessoas confirmando no app delas (2s depois metade confirma)
        setTimeout(() => {
            setPassageiros(prev => prev.map(p => ({ ...p, confirmou: Math.random() > 0.3 })))
        }, 2000)
    }

    const handleAplicarPunicao = () => {
        setPunicaoAplicada(true)
        setTimeout(() => setPunicaoAplicada(false), 3000)
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
                        <p className="text-sm text-slate-500">Gestão da viagem atual</p>
                    </div>
                </div>

                {/* Mock toggle for testing purposes */}
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

                {/* Painel Com Marcação */}
                {comMarcacao ? (
                    <>
                        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
                            <div>
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Status da Lotação</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-bold text-slate-900">{confirmados} <span className="text-lg text-slate-400 font-medium">/ {totalReservados}</span></p>
                                    <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 flex items-center gap-1">
                                        <Users size={14} /> Embarcados
                                    </div>
                                </div>
                            </div>

                            {diferenca > 0 && (
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                                    <AlertTriangle className="text-amber-500 shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs font-bold text-amber-800">Atenção ao número de pessoas</p>
                                        <p className="text-[11px] text-amber-700/90 leading-relaxed mt-0.5">
                                            Há {diferenca} pessoa{diferenca > 1 ? 's' : ''} a menos que o esperado. Solicite que todos se dirijam aos assentos marcados para conferência.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-800">Lista de Passageiros</h3>
                                <span className="text-[10px] text-slate-500 font-medium bg-slate-200 px-2 py-0.5 rounded-full">Tap para marcar falta</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                {passageiros.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => togglePresenca(p.id)}
                                        className={`w-full flex items-center p-3 rounded-xl border transition-all text-left ${p.presente ? 'bg-white border-slate-200' : 'bg-red-50 border-red-200'}`}
                                    >
                                        <div className="flex-1">
                                            <p className={`text-sm font-semibold ${p.presente ? 'text-slate-800' : 'text-red-700'}`}>{p.nome}</p>
                                            <p className={`text-[11px] font-medium mt-0.5 ${p.presente ? 'text-slate-400' : 'text-red-500'}`}>Assento {p.assento}</p>
                                        </div>
                                        {p.presente ? (
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                <CheckCircle size={18} />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-red-200 text-red-600 flex items-center justify-center">
                                                <X size={18} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 pb-8">
                            <button
                                onClick={handleAplicarPunicao}
                                disabled={punicaoAplicada || !passageiros.some(p => !p.presente)}
                                className="w-full bg-red-600 active:bg-red-700 hover:bg-red-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/20 disabled:shadow-none transition-all flex justify-center items-center gap-2"
                            >
                                {punicaoAplicada ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                                {punicaoAplicada ? 'Punição Aplicada' : 'Confirmar Ausências e Punir'}
                            </button>
                            <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">Os alunos marcados com "X" receberão advertência automática no sistema.</p>
                        </div>
                    </>
                ) : (
                    /* Painel Sem Marcação */
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
                                disabled={alertaEnviado}
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
                                            <p className="text-sm font-semibold text-slate-800">{p.nome}</p>
                                        </div>
                                        {p.confirmou ? (
                                            <div className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center gap-1.5 text-[10px] font-bold">
                                                <CheckCircle size={12} /> Confirmado
                                            </div>
                                        ) : (
                                            <div className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-100 text-amber-600 flex items-center gap-1.5 text-[10px] font-bold">
                                                <Clock size={12} /> Aguardando
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 pb-8">
                            <button
                                onClick={handleAplicarPunicao}
                                disabled={punicaoAplicada || !passageiros.some(p => !p.confirmou)}
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

function Clock(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
