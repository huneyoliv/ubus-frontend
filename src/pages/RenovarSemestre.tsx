import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, X, CheckCircle, Check, AlertTriangle, Upload } from 'lucide-react'

export default function RenovarSemestre() {
    const navigate = useNavigate()
    const [gradeFile, setGradeFile] = useState<File | null>(null)
    const [agreed, setAgreed] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const gradeRef = useRef<HTMLInputElement>(null)

    const handleGrade = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setGradeFile(file)
    }

    const handleSubmit = () => {
        setSubmitted(true)
        setTimeout(() => navigate('/perfil'), 2200)
    }

    if (submitted) {
        return (
            <div className="flex flex-col min-h-dvh items-center justify-center px-8" style={{ background: 'var(--color-bg)' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
                        style={{ background: 'rgba(16,185,129,0.12)' }}>
                        <CheckCircle size={40} style={{ color: 'var(--color-success)' }} />
                    </div>
                    <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                        Grade Enviada!
                    </h2>
                    <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-text-2)' }}>
                        Sua grade será analisada pelo gestor. Você receberá uma notificação quando aprovada.
                    </p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-full" style={{ background: 'var(--color-bg)' }}>
            <div className="sticky top-0 z-20 flex items-center gap-3 px-5 py-4"
                style={{ background: 'rgba(240,244,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--color-border)' }}>
                <button onClick={() => navigate('/perfil')}
                    className="flex items-center justify-center w-10 h-10 rounded-xl transition-all hover:bg-white"
                    style={{ border: '1.5px solid var(--color-border)' }}>
                    <ArrowLeft size={18} style={{ color: 'var(--color-text)' }} />
                </button>
                <div>
                    <h1 className="font-bold text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>Renovar Semestre</h1>
                    <p className="text-xs" style={{ color: 'var(--color-text-3)' }}>Documentação necessária</p>
                </div>
            </div>

            <div className="flex-1 px-5 py-6 flex flex-col gap-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl"
                    style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(245,158,11,0.15)', color: '#D97706' }}>
                        <AlertTriangle size={16} />
                    </div>
                    <div>
                        <p className="text-sm font-bold" style={{ color: '#92400E' }}>Renovação Pendente</p>
                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
                            Envie sua grade de horários atualizada para manter seu acesso ao transporte no novo semestre.
                        </p>
                    </div>
                </div>

                <input ref={gradeRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleGrade} />

                {gradeFile ? (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 rounded-2xl"
                        style={{ background: 'rgba(16,185,129,0.06)', border: '1.5px solid rgba(16,185,129,0.2)' }}
                    >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--color-success)' }}>
                            <FileText size={18} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>{gradeFile.name}</p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--color-success)' }}>
                                ✓ Grade selecionada • {(gradeFile.size / 1024).toFixed(0)} KB
                            </p>
                        </div>
                        <button onClick={() => setGradeFile(null)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                            <X size={16} className="text-slate-400" />
                        </button>
                    </motion.div>
                ) : (
                    <button
                        onClick={() => gradeRef.current?.click()}
                        className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-dashed transition-all hover:bg-white"
                        style={{ borderColor: 'var(--color-border)' }}
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105"
                            style={{ background: 'rgba(37,99,235,0.08)', color: 'var(--color-primary)' }}>
                            <Upload size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--color-text)' }}>Enviar Grade de Horários</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-3)' }}>PDF ou imagem da grade semestral atualizada</p>
                        </div>
                    </button>
                )}

                <label className="flex items-start gap-3 cursor-pointer mt-2">
                    <div className="relative mt-0.5 flex-shrink-0">
                        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="sr-only" />
                        <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                            style={{ borderColor: agreed ? 'var(--color-primary)' : 'var(--color-border)', background: agreed ? 'var(--color-primary)' : 'white' }}>
                            {agreed && <Check size={12} className="text-white" strokeWidth={3} />}
                        </div>
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
                        Declaro que as informações são verdadeiras e estou ciente das regras.
                    </span>
                </label>
            </div>

            <div className="sticky bottom-0 px-5 py-4"
                style={{ background: 'rgba(240,244,255,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--color-border)' }}>
                <button
                    onClick={handleSubmit}
                    disabled={!agreed || !gradeFile}
                    className="btn-primary"
                >
                    Enviar para Análise
                </button>
            </div>
        </div>
    )
}
