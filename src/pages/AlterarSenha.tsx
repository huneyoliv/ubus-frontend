import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function AlterarSenha() {
    const navigate = useNavigate()
    const [current, setCurrent] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const handleSave = () => {
        setError('')
        if (!current) { setError('Digite sua senha atual.'); return }
        if (newPass.length < 8) { setError('A nova senha deve ter no mínimo 8 caracteres.'); return }
        if (newPass !== confirm) { setError('As senhas não coincidem.'); return }
        setSaved(true)
        setTimeout(() => { setSaved(false); navigate('/perfil') }, 1500)
    }

    return (
        <div className="flex flex-col min-h-full bg-white">
            <div className="flex items-center px-4 pt-12 pb-4 gap-3 sticky top-0 bg-white z-10 border-b border-slate-100">
                <button onClick={() => navigate('/perfil')} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-900">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-slate-900">Alterar Senha</h1>
            </div>

            <div className="flex-1 px-6 py-6 flex flex-col gap-5">
                <label className="flex flex-col w-full">
                    <p className="text-slate-900 text-sm font-medium pb-2">Senha atual</p>
                    <div className="flex w-full items-center rounded-xl bg-slate-100 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <input
                            className="flex-1 w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 h-14 px-4 text-base focus:ring-0 focus:outline-none"
                            type={showCurrent ? 'text' : 'password'}
                            placeholder="Digite sua senha atual"
                            value={current}
                            onChange={(e) => setCurrent(e.target.value)}
                        />
                        <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="pr-4 text-slate-400 hover:text-primary transition-colors">
                            {showCurrent ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>
                </label>

                <label className="flex flex-col w-full">
                    <p className="text-slate-900 text-sm font-medium pb-2">Nova senha</p>
                    <div className="flex w-full items-center rounded-xl bg-slate-100 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <input
                            className="flex-1 w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 h-14 px-4 text-base focus:ring-0 focus:outline-none"
                            type={showNew ? 'text' : 'password'}
                            placeholder="Mínimo 8 caracteres"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                        <button type="button" onClick={() => setShowNew(!showNew)} className="pr-4 text-slate-400 hover:text-primary transition-colors">
                            {showNew ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>
                    {newPass.length > 0 && (
                        <div className="flex gap-1 mt-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`h-1 flex-1 rounded-full transition-all ${newPass.length >= i * 3 ? (newPass.length >= 10 ? 'bg-emerald-500' : 'bg-amber-400') : 'bg-slate-200'
                                    }`} />
                            ))}
                        </div>
                    )}
                </label>

                <label className="flex flex-col w-full">
                    <p className="text-slate-900 text-sm font-medium pb-2">Confirmar nova senha</p>
                    <input
                        className="w-full rounded-xl bg-slate-100 border-none py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all h-14"
                        type="password"
                        placeholder="Repita a nova senha"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </label>

                {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                        {error}
                    </div>
                )}
            </div>

            <div className="sticky bottom-0 bg-white/90 backdrop-blur-md p-6 pt-3 border-t border-slate-100">
                <button
                    onClick={handleSave}
                    className={`w-full rounded-xl py-4 text-base font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${saved
                            ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                            : 'bg-primary text-white shadow-primary/30 hover:bg-blue-600'
                        }`}
                >
                    {saved ? <><CheckCircle size={20} /> Senha alterada!</> : 'Alterar Senha'}
                </button>
            </div>
        </div>
    )
}
