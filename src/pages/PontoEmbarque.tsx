import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Check, Bus, Navigation } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'

interface PontoEmbarque {
    id: string
    nome: string
    endereco: string
    lat: number
    lng: number
    idLinha: string
    ordem: number
}

interface Linha {
    id: string
    nome: string
    descricao?: string
}

export default function SelecionarPontoEmbarque() {
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)
    const [linhas, setLinhas] = useState<Linha[]>([])
    const [selectedLinha, setSelectedLinha] = useState<string | null>(user?.defaultRouteId ?? null)
    const [pontos, setPontos] = useState<PontoEmbarque[]>([])
    const [selectedPonto, setSelectedPonto] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)

    // Fetch linhas
    useEffect(() => {
        api.get<Linha[]>('/fleet/routes')
            .then(setLinhas)
            .catch(() => setLinhas([]))
            .finally(() => setLoading(false))
    }, [])

    // Fetch pontos when linha changes
    useEffect(() => {
        if (!selectedLinha) {
            setPontos([])
            return
        }
        setLoading(true)
        api.get<PontoEmbarque[]>(`/fleet/routes/${selectedLinha}/pontos`)
            .then((data) => setPontos(Array.isArray(data) ? data : []))
            .catch(() => setPontos([]))
            .finally(() => setLoading(false))
    }, [selectedLinha])

    const handleSave = async () => {
        if (!selectedPonto) return
        setSaving(true)
        try {
            await api.patch('/users/me/ponto-embarque', { pontoEmbarqueId: selectedPonto })
            setSuccess(true)
            setTimeout(() => navigate('/dashboard'), 1200)
        } catch (err) {
            if (err instanceof ApiError) {
                console.error('Erro ao salvar ponto:', err.body)
            }
        } finally {
            setSaving(false)
        }
    }

    const selectedPontoData = pontos.find(p => p.id === selectedPonto)

    return (
        <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-white flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="flex items-center gap-4 p-4 pb-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900">Ponto de Embarque</h1>
                        <p className="text-xs text-slate-500">Selecione onde você embarca no dia a dia</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col px-6 py-6 gap-6 overflow-y-auto pb-32">
                {/* Step 1: Select Line */}
                <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2 mb-3">
                        <Bus size={16} />
                        Sua Linha
                    </label>
                    <div className="flex flex-col gap-2">
                        {linhas.map((linha) => (
                            <button
                                key={linha.id}
                                onClick={() => {
                                    setSelectedLinha(linha.id)
                                    setSelectedPonto(null)
                                }}
                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                                    selectedLinha === linha.id
                                        ? 'border-primary bg-primary/5 shadow-sm'
                                        : 'border-slate-200 bg-white hover:border-primary/40'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                    selectedLinha === linha.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    <Bus size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900">{linha.nome}</p>
                                    {linha.descricao && (
                                        <p className="text-xs text-slate-500 mt-0.5">{linha.descricao}</p>
                                    )}
                                </div>
                                {selectedLinha === linha.id && (
                                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 2: Select Boarding Point */}
                {selectedLinha && (
                    <div>
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2 mb-3">
                            <MapPin size={16} />
                            Onde você embarca?
                        </label>

                        {loading ? (
                            <div className="flex flex-col gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        ) : pontos.length === 0 ? (
                            <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <MapPin size={32} className="text-slate-300 mx-auto mb-2" />
                                <p className="text-sm text-slate-500">Nenhum ponto cadastrado para esta linha.</p>
                                <p className="text-xs text-slate-400 mt-1">O gestor da sua cidade precisa cadastrar os pontos.</p>
                            </div>
                        ) : (
                            <div className="relative">
                                {/* Route line */}
                                <div className="absolute left-[29px] top-8 bottom-8 w-0.5 bg-slate-200 z-0" />

                                <div className="flex flex-col gap-2 relative z-10">
                                    {pontos.map((ponto, index) => {
                                        const isFirst = index === 0
                                        const isLast = index === pontos.length - 1
                                        const isSelected = selectedPonto === ponto.id

                                        return (
                                            <button
                                                key={ponto.id}
                                                onClick={() => setSelectedPonto(ponto.id)}
                                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                                                    isSelected
                                                        ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                                                        : 'border-slate-200 bg-white hover:border-primary/40'
                                                }`}
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                                    isSelected
                                                        ? 'bg-primary text-white ring-4 ring-primary/20'
                                                        : isFirst || isLast
                                                            ? 'bg-emerald-100 text-emerald-600'
                                                            : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                    {isFirst ? (
                                                        <Navigation size={18} />
                                                    ) : isLast ? (
                                                        <MapPin size={18} />
                                                    ) : (
                                                        <div className="w-3 h-3 rounded-full bg-current" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-slate-900">{ponto.nome}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{ponto.endereco}</p>
                                                    {(isFirst || isLast) && (
                                                        <span className={`inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                                            isFirst ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                            {isFirst ? 'Ponto Inicial' : 'Destino Final'}
                                                        </span>
                                                    )}
                                                </div>
                                                {isSelected && (
                                                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                                        <Check size={14} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-slate-100 p-6 pb-8">
                <div className="max-w-md mx-auto">
                    {selectedPontoData && (
                        <div className="flex items-center gap-3 mb-4 p-3 bg-primary/5 rounded-xl border border-primary/20">
                            <MapPin size={18} className="text-primary shrink-0" />
                            <div>
                                <p className="text-xs text-primary font-semibold">Seu ponto de embarque:</p>
                                <p className="text-sm font-bold text-slate-900">{selectedPontoData.nome}</p>
                            </div>
                        </div>
                    )}

                    {success ? (
                        <div className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-center flex items-center justify-center gap-2">
                            <Check size={20} />
                            <span>Ponto salvo com sucesso!</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleSave}
                            disabled={!selectedPonto || saving}
                            className="w-full rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Salvando...' : 'Confirmar Ponto de Embarque'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
