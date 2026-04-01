import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle, Shield } from 'lucide-react'

export default function AlterarSenha() {
    const navigate = useNavigate()
    const [current, setCurrent] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const handleSave = () => {
        setError('')
        if (!current) { setError('Digite sua senha atual.'); return }
        if (newPass.length < 8) { setError('A nova senha deve ter no mínimo 8 caracteres.'); return }
        if (newPass !== confirm) { setError('As senhas não coincidem.'); return }
        setSaved(true)
        setTimeout(() => { setSaved(false); navigate('/perfil') }, 1800)
    }

    const strength = newPass.length === 0 ? 0 : newPass.length < 6 ? 1 : newPass.length < 10 ? 2 : newPass.length < 14 ? 3 : 4
    const strengthConfig = [
        { label: '', color: 'var(--color-border)' },
        { label: 'Muito fraca', color: '#EF4444' },
        { label: 'Fraca', color: '#F59E0B' },
        { label: 'Boa', color: '#3B82F6' },
        { label: 'Forte', color: '#10B981' },
    ]

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
                    <h1 className="font-bold text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>Alterar Senha</h1>
                    <p className="text-xs" style={{ color: 'var(--color-text-3)' }}>Segurança da sua conta</p>
                </div>
            </div>

            <div className="flex-1 px-5 py-6 flex flex-col gap-5">
                <div className="flex items-start gap-3 p-4 rounded-2xl"
                    style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.12)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(37,99,235,0.12)', color: 'var(--color-primary)' }}>
                        <Shield size={16} />
                    </div>
                    <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>Dica de segurança</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-2)' }}>
                            Use pelo menos 8 caracteres combinando letras maiúsculas, números e símbolos.
                        </p>
                    </div>
                </div>

                <PasswordField
                    label="Senha atual"
                    value={current}
                    onChange={setCurrent}
                    show={showCurrent}
                    onToggle={() => setShowCurrent(!showCurrent)}
                    placeholder="Digite sua senha atual"
                />

                <div className="flex flex-col gap-1.5">
                    <PasswordField
                        label="Nova senha"
                        value={newPass}
                        onChange={setNewPass}
                        show={showNew}
                        onToggle={() => setShowNew(!showNew)}
                        placeholder="Mínimo 8 caracteres"
                    />
                    {newPass.length > 0 && (
                        <div className="flex flex-col gap-1.5 px-1">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
                                        style={{ background: strength >= i ? strengthConfig[strength].color : 'var(--color-border)' }} />
                                ))}
                            </div>
                            {strength > 0 && (
                                <p className="text-[11px] font-semibold" style={{ color: strengthConfig[strength].color }}>
                                    {strengthConfig[strength].label}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <PasswordField
                    label="Confirmar nova senha"
                    value={confirm}
                    onChange={setConfirm}
                    show={showConfirm}
                    onToggle={() => setShowConfirm(!showConfirm)}
                    placeholder="Repita a nova senha"
                    isMatch={confirm.length > 0 ? newPass === confirm : undefined}
                />

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-3.5 rounded-xl text-sm font-medium text-center"
                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#EF4444' }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="sticky bottom-0 px-5 py-4"
                style={{ background: 'rgba(240,244,255,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--color-border)' }}>
                <button
                    onClick={handleSave}
                    disabled={saved}
                    className="w-full h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    style={{
                        background: saved ? 'var(--color-success)' : 'var(--color-primary)',
                        color: 'white',
                        fontFamily: 'var(--font-display)',
                        boxShadow: saved ? '0 4px 16px -4px rgba(16,185,129,0.5)' : '0 4px 16px -4px rgba(37,99,235,0.5)',
                    }}
                >
                    {saved ? (
                        <><CheckCircle size={20} /> Senha alterada!</>
                    ) : (
                        <><Lock size={18} /> Alterar Senha</>
                    )}
                </button>
            </div>
        </div>
    )
}

function PasswordField({ label, value, onChange, show, onToggle, placeholder, isMatch }: {
    label: string; value: string; onChange: (v: string) => void
    show: boolean; onToggle: () => void; placeholder: string; isMatch?: boolean
}) {
    const borderColor = isMatch === undefined ? 'var(--color-border)' : isMatch ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{label}</label>
            <div className="flex items-center rounded-xl overflow-hidden transition-all"
                style={{ background: 'var(--color-surface)', border: `1.5px solid ${borderColor}` }}>
                <div className="flex items-center justify-center w-12 h-14 shrink-0" style={{ color: 'var(--color-text-3)' }}>
                    <Lock size={16} />
                </div>
                <input
                    className="flex-1 h-14 bg-transparent text-sm outline-none"
                    style={{ color: 'var(--color-text)' }}
                    type={show ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button type="button" onClick={onToggle}
                    className="flex items-center justify-center w-12 h-14 shrink-0 transition-colors"
                    style={{ color: show ? 'var(--color-primary)' : 'var(--color-text-3)' }}>
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    )
}
