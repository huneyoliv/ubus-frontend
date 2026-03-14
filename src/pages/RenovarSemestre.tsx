import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, X, CheckCircle } from 'lucide-react'

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
        setTimeout(() => navigate('/perfil'), 2000)
    }

    if (submitted) {
        return (
            <div className="flex flex-col min-h-full bg-white items-center justify-center px-8">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">Grade Enviada!</h2>
                <p className="text-sm text-slate-500 text-center leading-relaxed">
                    Sua grade será analisada pelo gestor. Você receberá uma notificação quando aprovada.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-full bg-white">
            <div className="flex items-center px-4 pt-12 pb-4 gap-3 sticky top-0 bg-white z-10 border-b border-slate-100">
                <button onClick={() => navigate('/perfil')} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-900">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-slate-900">Renovar Semestre</h1>
            </div>

            <div className="flex-1 px-6 py-6 flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-start gap-3 mb-2">
                    <div className="p-1.5 bg-orange-100 rounded-lg text-orange-600 shrink-0">
                        <FileText size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-orange-800 mb-0.5">Renovação Pendente</p>
                        <p className="text-xs leading-relaxed text-orange-700/80">
                            Envie sua grade de horários atualizada para manter seu acesso ao transporte.
                        </p>
                    </div>
                </div>

                <input ref={gradeRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleGrade} />
                {gradeFile ? (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                            <FileText size={20} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-medium text-slate-900">{gradeFile.name}</p>
                            <p className="text-xs text-emerald-600 font-medium">✓ Enviada • {(gradeFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                        <button onClick={() => setGradeFile(null)} className="p-1 rounded-full hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => gradeRef.current?.click()}
                        className="group flex items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 bg-white p-6 transition-colors hover:border-primary hover:bg-primary/5"
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-primary group-hover:text-white transition-colors">
                            <FileText size={24} />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-slate-900">Enviar Grade de Horários</p>
                            <p className="text-xs text-slate-500 mt-0.5">PDF ou imagem da grade semestral</p>
                        </div>
                    </button>
                )}

                <label className="flex items-start gap-3 cursor-pointer group mt-2">
                    <input className="mt-0.5 h-5 w-5 cursor-pointer rounded border border-slate-300 bg-white accent-primary" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                    <span className="text-sm text-slate-600 select-none group-hover:text-slate-900 transition-colors">
                        Declaro que as informações são verdadeiras e estou ciente das regras.
                    </span>
                </label>
            </div>

            <div className="sticky bottom-0 bg-white/90 backdrop-blur-md p-6 pt-3 border-t border-slate-100">
                <button
                    onClick={handleSubmit}
                    disabled={!agreed || !gradeFile}
                    className="w-full rounded-xl py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all active:scale-[0.98] bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Enviar para Análise
                </button>
            </div>
        </div>
    )
}
