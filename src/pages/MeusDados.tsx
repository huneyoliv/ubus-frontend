import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function MeusDados() {
    const navigate = useNavigate()

    const dados = [
        { label: 'Nome completo', value: 'João Silva' },
        { label: 'CPF', value: '123.456.789-00' },
        { label: 'Telefone (WhatsApp)', value: '(79) 99999-0000' },
        { label: 'Instituição', value: 'Universidade Tiradentes (UNIT)' },
        { label: 'Curso', value: 'Eng. de Software' },
        { label: 'Turno', value: 'Noturno' },
        { label: 'Linha', value: 'Linha 2 - UNIT' },
        { label: 'Categoria', value: 'Prioridade 1' },
    ]

    return (
        <div className="flex flex-col min-h-full bg-white">
            <div className="flex items-center px-4 pt-12 pb-4 gap-3 sticky top-0 bg-white z-10 border-b border-slate-100">
                <button onClick={() => navigate('/perfil')} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-900">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-slate-900">Meus Dados Pessoais</h1>
            </div>

            <div className="flex-1 px-6 py-6 flex flex-col gap-4">
                <div className="flex flex-col items-center mb-2">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl mb-3">
                        JS
                    </div>
                    <p className="text-xs text-slate-400">Para alterar seus dados, entre em contato com o gestor.</p>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
                    {dados.map((item, i) => (
                        <div key={i} className="flex flex-col px-5 py-4">
                            <p className="text-[11px] text-slate-400 uppercase tracking-wider">{item.label}</p>
                            <p className="text-sm font-semibold text-slate-900 mt-1">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
