import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, Clock, Copy, X, ChevronDown, ChevronUp, Bell } from 'lucide-react'

type ParcelaStatus = 'pago' | 'pendente' | 'atrasado' | 'futuro'

interface Parcela {
    id: number
    mes: string
    valor: number
    vencimento: string
    status: ParcelaStatus
    canAdvance: boolean
}

interface PaymentConfig {
    allowAdvancePayment: boolean
    pixKey: string
    pixName: string
    notificationDaysBefore: number
}

const statusConfig = {
    pago: { label: 'Pago', icon: CheckCircle, bg: 'rgba(16,185,129,0.08)', color: '#059669', border: 'rgba(16,185,129,0.2)' },
    pendente: { label: 'Pendente', icon: Clock, bg: 'rgba(245,158,11,0.08)', color: '#D97706', border: 'rgba(245,158,11,0.2)' },
    atrasado: { label: 'Atrasado', icon: AlertTriangle, bg: 'rgba(239,68,68,0.06)', color: '#DC2626', border: 'rgba(239,68,68,0.2)' },
    futuro: { label: 'A vencer', icon: Clock, bg: 'rgba(148,163,184,0.08)', color: '#64748B', border: 'var(--color-border)' },
}

export default function Pagamentos() {
    const [selectedParcela, setSelectedParcela] = useState<Parcela | null>(null)
    const [pixCopied, setPixCopied] = useState(false)
    const [showAll, setShowAll] = useState(false)

    const parcelas: Parcela[] = []
    const [config] = useState<PaymentConfig | null>(null)

    const atrasadas = parcelas.filter((p) => p.status === 'atrasado')
    const pendentes = parcelas.filter((p) => p.status === 'pendente')
    const totalDevido = [...atrasadas, ...pendentes].reduce((sum, p) => sum + p.valor, 0)
    const visibleParcelas = showAll ? parcelas : parcelas.slice(0, 4)

    const handleCopyPix = () => {
        if (!config) return
        navigator.clipboard.writeText(config.pixKey)
        setPixCopied(true)
        setTimeout(() => setPixCopied(false), 2500)
    }

    return (
        <div className="flex flex-col min-h-full">
            <div className="px-5 pt-8 pb-5">
                <h1 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                    Pagamentos
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-text-2)' }}>Gerencie suas mensalidades</p>
            </div>

            <div className="flex-1 px-5 pb-6">
                {parcelas.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                            style={{ background: 'rgba(37,99,235,0.06)' }}>
                            <Clock size={28} style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                            Nenhuma cobrança encontrada
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-2)' }}>Suas parcelas aparecerão aqui.</p>
                    </motion.div>
                ) : (
                    <>
                        {atrasadas.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-start gap-3 p-4 rounded-2xl mb-4"
                                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
                            >
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: 'rgba(239,68,68,0.12)' }}>
                                    <AlertTriangle size={18} className="text-red-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-red-700 mb-0.5">
                                        {atrasadas.length} parcela{atrasadas.length > 1 ? 's' : ''} em atraso
                                    </p>
                                    <p className="text-xs text-red-600/80">Regularize para manter seu acesso ao transporte.</p>
                                </div>
                            </motion.div>
                        )}

                        <div className="p-5 rounded-2xl mb-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>Total em aberto</p>
                                    <p className="text-3xl font-black mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                                        R$ {totalDevido.toFixed(2).replace('.', ',')}
                                    </p>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-bold"
                                    style={{
                                        background: atrasadas.length > 0 ? 'rgba(239,68,68,0.1)' : totalDevido > 0 ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)',
                                        color: atrasadas.length > 0 ? '#DC2626' : totalDevido > 0 ? '#D97706' : '#059669',
                                    }}>
                                    {atrasadas.length > 0 ? 'Irregular' : totalDevido > 0 ? 'Pendente' : 'Em dia'}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { count: parcelas.filter(p => p.status === 'pago').length, label: 'Pagas', color: '#059669', bg: 'rgba(16,185,129,0.08)' },
                                    { count: pendentes.length, label: 'Pendentes', color: '#D97706', bg: 'rgba(245,158,11,0.08)' },
                                    { count: atrasadas.length, label: 'Atrasadas', color: '#DC2626', bg: 'rgba(239,68,68,0.08)' },
                                ].map(({ count, label, color, bg }) => (
                                    <div key={label} className="text-center p-3 rounded-xl" style={{ background: bg }}>
                                        <p className="text-xl font-black" style={{ fontFamily: 'var(--font-display)', color }}>{count}</p>
                                        <p className="text-[10px] font-semibold mt-0.5" style={{ color }}>{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>Parcelas</h3>
                            {config && (
                                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-3)' }}>
                                    <Bell size={11} />
                                    <span>Aviso {config.notificationDaysBefore} dias antes</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            {visibleParcelas.map((parcela, idx) => {
                                const cfg = statusConfig[parcela.status]
                                const Icon = cfg.icon
                                const canPay = parcela.status === 'atrasado' || parcela.status === 'pendente'
                                const canAdvancePay = parcela.status === 'futuro' && parcela.canAdvance && !!config?.allowAdvancePayment

                                return (
                                    <motion.div
                                        key={parcela.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.04 }}
                                        className="p-4 rounded-2xl"
                                        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                                    style={{ background: 'rgba(255,255,255,0.5)', color: cfg.color }}>
                                                    <Icon size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{parcela.mes}</p>
                                                    <p className="text-xs" style={{ color: 'var(--color-text-3)' }}>Venc: {parcela.vencimento}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>R$ {parcela.valor.toFixed(2).replace('.', ',')}</p>
                                                <span className="text-[10px] font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
                                            </div>
                                        </div>
                                        {(canPay || canAdvancePay) && (
                                            <button
                                                onClick={() => setSelectedParcela(parcela)}
                                                className="w-full mt-3 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
                                                style={{
                                                    background: parcela.status === 'atrasado' ? '#DC2626' : 'var(--color-primary)',
                                                    color: 'white',
                                                    fontFamily: 'var(--font-display)',
                                                }}
                                            >
                                                {canAdvancePay ? 'Adiantar Pagamento' : 'Pagar Agora'}
                                            </button>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>

                        {parcelas.length > 4 && (
                            <button onClick={() => setShowAll(!showAll)}
                                className="w-full mt-3 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold transition-colors"
                                style={{ color: 'var(--color-primary)' }}>
                                {showAll ? <><ChevronUp size={16} /> Ver menos</> : <><ChevronDown size={16} /> Ver todas ({parcelas.length})</>}
                            </button>
                        )}
                    </>
                )}
            </div>

            <AnimatePresence>
                {selectedParcela && config && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-end justify-center"
                    >
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedParcela(null)} />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                            className="relative w-full max-w-xl rounded-t-3xl p-6 pb-10"
                            style={{ background: 'var(--color-surface)' }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                                    Pagamento via PIX
                                </h3>
                                <button onClick={() => setSelectedParcela(null)}
                                    className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
                                    style={{ background: 'var(--color-bg)' }}>
                                    <X size={18} style={{ color: 'var(--color-text-2)' }} />
                                </button>
                            </div>

                            <div className="p-4 rounded-2xl mb-5" style={{ background: 'var(--color-bg)' }}>
                                {[['Parcela', selectedParcela.mes], ['Vencimento', selectedParcela.vencimento]].map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-center py-2.5 border-b" style={{ borderColor: 'var(--color-border)' }}>
                                        <span className="text-sm" style={{ color: 'var(--color-text-2)' }}>{k}</span>
                                        <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{v}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center pt-2.5">
                                    <span className="text-sm" style={{ color: 'var(--color-text-2)' }}>Valor</span>
                                    <span className="text-xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                                        R$ {selectedParcela.valor.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-5">
                                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-3)' }}>Chave PIX (CNPJ)</p>
                                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--color-bg)' }}>
                                    <p className="flex-1 text-sm font-mono font-semibold select-all truncate" style={{ color: 'var(--color-text)' }}>
                                        {config.pixKey}
                                    </p>
                                    <button onClick={handleCopyPix}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0"
                                        style={{ background: pixCopied ? 'rgba(16,185,129,0.1)' : 'var(--color-primary)', color: pixCopied ? '#059669' : 'white' }}>
                                        {pixCopied ? <><CheckCircle size={13} /> Copiado!</> : <><Copy size={13} /> Copiar</>}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl mb-5"
                                style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.12)' }}>
                                <Bell size={16} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: 1 }} />
                                <div>
                                    <p className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>Favorecido</p>
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-2)' }}>{config.pixName}</p>
                                </div>
                            </div>

                            <p className="text-xs text-center leading-relaxed" style={{ color: 'var(--color-text-3)' }}>
                                Após o pagamento, envie o comprovante para o gestor. A baixa pode levar até 24h úteis.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
