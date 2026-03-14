import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Check, Camera, FileText, X, Home, Mail } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import type { Prefeitura, RegisterPayload, LoginResponse } from '@/types'
import { useAuthStore } from '@/store/useAuthStore'

export default function Cadastro() {
    const navigate = useNavigate()
    const setAuth = useAuthStore((s) => s.setAuth)
    const [step, setStep] = useState(1)
    const [search, setSearch] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [photo, setPhoto] = useState<string | null>(null)
    const [gradeFile, setGradeFile] = useState<File | null>(null)
    const [residenciaFile, setResidenciaFile] = useState<File | null>(null)

    const [agreed, setAgreed] = useState(false)
    const [needsWheelchair, setNeedsWheelchair] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Municipality selection
    const [prefeituras, setPrefeituras] = useState<Prefeitura[]>([])
    const [selectedPrefeitura, setSelectedPrefeitura] = useState('')
    const [loadingPrefeituras, setLoadingPrefeituras] = useState(false)

    const photoInputRef = useRef<HTMLInputElement>(null)
    const gradeInputRef = useRef<HTMLInputElement>(null)
    const residenciaInputRef = useRef<HTMLInputElement>(null)
    const totalSteps = 4

    // Fetch prefeituras when step 2 is reached
    useEffect(() => {
        if (step === 2 && prefeituras.length === 0) {
            setLoadingPrefeituras(true)
            api.get<Prefeitura[]>('/prefeitura')
                .then((data) => {
                    const list = Array.isArray(data) ? data : []
                    setPrefeituras(list.filter(p => p.ativo !== false))
                })
                .catch(() => {
                    setPrefeituras([])
                })
                .finally(() => setLoadingPrefeituras(false))
        }
    }, [step, prefeituras.length])

    const filteredPrefeituras = prefeituras.filter((p) =>
        p.nome.toLowerCase().includes(search.toLowerCase())
    )

    const formatCpf = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11)
        return digits
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11)
        if (digits.length <= 2) return `(${digits}`
        if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
    }

    const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setPhoto(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleGradeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setGradeFile(file)
    }

    const handleResidenciaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setResidenciaFile(file)
    }

    const handleSubmit = async () => {
        setError('')
        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.')
            return
        }
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.')
            return
        }
        if (!selectedPrefeitura) {
            setError('Selecione uma cidade.')
            return
        }

        setLoading(true)
        try {
            const payload: RegisterPayload = {
                municipalityId: selectedPrefeitura,
                cpf: cpf.replace(/\D/g, ''),
                name,
                email,
                password,
                phone: phone.replace(/\D/g, '') || undefined,
            }

            const data = await api.post<LoginResponse>('/auth/register', payload)
            setAuth(data.accessToken, data.user)
            navigate('/ponto-embarque')
        } catch (err) {
            if (err instanceof ApiError) {
                const body = err.body as Record<string, unknown> | null
                if (err.status === 409) {
                    setError('Email ou CPF já cadastrado.')
                } else if (body && typeof body.message === 'string') {
                    setError(body.message)
                } else {
                    setError('Erro ao cadastrar. Tente novamente.')
                }
            } else {
                setError('Erro de conexão. Tente novamente.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-white flex flex-col">
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="flex items-center justify-between p-4 pb-2">
                    <button
                        onClick={() => (step > 1 ? setStep(step - 1) : navigate('/'))}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-900"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="text-sm font-medium text-slate-500">Passo {step} de {totalSteps}</div>
                    <div className="w-12" />
                </div>
                <div className="flex w-full flex-row items-center justify-center gap-2 px-8 py-4">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 w-full max-w-[40px] rounded-full transition-all ${i < step ? 'bg-primary' : 'bg-slate-200'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {step === 1 && (
                <div className="flex-1 flex flex-col">
                    <div className="px-6 pt-4 pb-4">
                        <h1 className="text-slate-900 tracking-tight text-[28px] font-bold leading-tight">
                            Como você se chama?
                        </h1>
                        <p className="text-slate-500 text-base font-normal leading-normal pt-2">
                            Precisamos de algumas informações básicas.
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 px-6 py-2 flex-1">
                        <label className="flex flex-col w-full">
                            <p className="text-slate-900 text-sm font-medium pb-2">Nome completo</p>
                            <input
                                className="w-full rounded-xl bg-slate-100 border-none py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all h-14"
                                placeholder="Seu nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label className="flex flex-col w-full">
                            <p className="text-slate-900 text-sm font-medium pb-2">Email</p>
                            <div className="flex w-full items-center rounded-xl bg-slate-100 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                <input
                                    className="flex-1 w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 h-14 px-4 text-base font-normal focus:ring-0 focus:outline-none"
                                    placeholder="seu@email.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="flex items-center justify-center pr-4 text-slate-400">
                                    <Mail size={20} />
                                </div>
                            </div>
                        </label>
                        <label className="flex flex-col w-full">
                            <p className="text-slate-900 text-sm font-medium pb-2">CPF</p>
                            <input
                                className="w-full rounded-xl bg-slate-100 border-none py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all h-14"
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={(e) => setCpf(formatCpf(e.target.value))}
                            />
                        </label>
                        <label className="flex flex-col w-full">
                            <p className="text-slate-900 text-sm font-medium pb-2">Telefone (WhatsApp)</p>
                            <input
                                className="w-full rounded-xl bg-slate-100 border-none py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all h-14"
                                placeholder="(79) 99999-0000"
                                value={phone}
                                onChange={(e) => setPhone(formatPhone(e.target.value))}
                            />
                        </label>
                        <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border border-slate-300 bg-white accent-primary"
                                    type="checkbox"
                                    checked={needsWheelchair}
                                    onChange={(e) => setNeedsWheelchair(e.target.checked)}
                                />
                                <span className="text-sm text-slate-700 select-none group-hover:text-slate-900 transition-colors">
                                    Necessito de ônibus adaptado para cadeirante (Lei de Acessibilidade)
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="flex-1 flex flex-col">
                    <div className="px-6 pt-4 pb-4">
                        <h1 className="text-slate-900 tracking-tight text-[28px] font-bold leading-tight">
                            Selecione sua cidade
                        </h1>
                        <p className="text-slate-500 text-base font-normal leading-normal pt-2">
                            Isso definirá a prefeitura vinculada à sua conta.
                        </p>
                    </div>
                    <div className="px-6 pb-4">
                        <div className="relative flex items-center">
                            <Search size={20} className="absolute left-4 text-slate-400 pointer-events-none" />
                            <input
                                className="w-full rounded-xl bg-slate-100 border-none py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="Pesquisar cidade..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 px-6 pb-6 overflow-y-auto">
                        {loadingPrefeituras ? (
                            <div className="flex flex-col gap-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        ) : filteredPrefeituras.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-sm text-slate-500">Nenhuma cidade encontrada.</p>
                            </div>
                        ) : (
                            filteredPrefeituras.map((pref) => (
                                <button
                                    key={pref.id}
                                    onClick={() => setSelectedPrefeitura(pref.id)}
                                    className={`group relative flex items-center gap-4 rounded-2xl p-4 transition-all text-left ${selectedPrefeitura === pref.id
                                        ? 'border-2 border-primary bg-primary/5'
                                        : 'border border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex grow flex-col">
                                        <span className="text-slate-900 text-base font-semibold">{pref.nome}</span>
                                        <span className={`text-sm font-medium ${selectedPrefeitura === pref.id ? 'text-primary' : 'text-slate-500'}`}>
                                            {selectedPrefeitura === pref.id ? 'Selecionado' : 'Disponível'}
                                        </span>
                                    </div>
                                    {selectedPrefeitura === pref.id ? (
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                    ) : (
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>


                </div>
            )}

            {step === 3 && (
                <div className="flex-1 flex flex-col">
                    <div className="px-6 pt-4 pb-4">
                        <h1 className="text-slate-900 tracking-tight text-[28px] font-bold leading-tight">
                            Crie uma senha
                        </h1>
                        <p className="text-slate-500 text-base font-normal leading-normal pt-2">
                            Mínimo de 6 caracteres.
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 px-6 py-2 flex-1">
                        <label className="flex flex-col w-full">
                            <p className="text-slate-900 text-sm font-medium pb-2">Senha</p>
                            <input
                                className="w-full rounded-xl bg-slate-100 border-none py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all h-14"
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <label className="flex flex-col w-full">
                            <p className="text-slate-900 text-sm font-medium pb-2">Confirmar senha</p>
                            <input
                                className="w-full rounded-xl bg-slate-100 border-none py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all h-14"
                                type="password"
                                placeholder="Repita a senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="flex-1 flex flex-col">
                    <div className="px-6 pt-4 pb-2">
                        <h1 className="text-slate-900 tracking-tight text-xl font-bold">Validação Semestral</h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Precisamos de três documentos para liberar seu passe.
                        </p>
                        <p className="text-xs text-amber-600 mt-2 bg-amber-50 p-2 rounded-lg border border-amber-100">
                            ⚠️ Os documentos serão analisados posteriormente. Preencha para agilizar a aprovação.
                        </p>
                    </div>
                    <main className="flex-1 px-6 py-4 flex flex-col gap-4 overflow-y-auto">
                        <input
                            ref={photoInputRef}
                            type="file"
                            accept="image/*"
                            capture="user"
                            className="hidden"
                            onChange={handlePhotoCapture}
                        />
                        {photo ? (
                            <div className="relative flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                <img src={photo} alt="Foto" className="w-14 h-14 rounded-lg object-cover" />
                                <div className="flex flex-1 flex-col">
                                    <p className="text-sm font-medium text-slate-900">Foto do rosto</p>
                                    <p className="text-xs text-emerald-600 font-medium">✓ Capturada pela câmera</p>
                                </div>
                                <button
                                    onClick={() => setPhoto(null)}
                                    className="p-1 rounded-full hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => photoInputRef.current?.click()}
                                className="group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-white p-6 transition-colors hover:border-primary hover:bg-primary/5 cursor-pointer"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Camera size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-slate-900">Tirar foto do rosto</p>
                                    <p className="text-xs text-slate-500 mt-0.5">A foto deve ser tirada na hora, sem boné ou óculos</p>
                                </div>
                                <span className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 group-hover:bg-white group-hover:shadow-sm transition-colors">
                                    Abrir Câmera
                                </span>
                            </button>
                        )}

                        <input
                            ref={gradeInputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={handleGradeUpload}
                        />
                        {gradeFile ? (
                            <div className="relative flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                    <FileText size={20} />
                                </div>
                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <p className="truncate text-sm font-medium text-slate-900">{gradeFile.name}</p>
                                    <p className="text-xs text-emerald-600 font-medium">✓ Grade enviada • {(gradeFile.size / 1024).toFixed(0)} KB</p>
                                </div>
                                <button
                                    onClick={() => setGradeFile(null)}
                                    className="p-1 rounded-full hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => gradeInputRef.current?.click()}
                                className="group flex items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 bg-white p-5 transition-colors hover:border-primary hover:bg-primary/5 cursor-pointer"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <FileText size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-slate-900">Enviar Grade de Horários</p>
                                    <p className="text-xs text-slate-500 mt-0.5">PDF ou imagem da grade semestral</p>
                                </div>
                            </button>
                        )}

                        <input
                            ref={residenciaInputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={handleResidenciaUpload}
                        />
                        {residenciaFile ? (
                            <div className="relative flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                    <Home size={20} />
                                </div>
                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <p className="truncate text-sm font-medium text-slate-900">{residenciaFile.name}</p>
                                    <p className="text-xs text-emerald-600 font-medium">✓ Comprovante enviado • {(residenciaFile.size / 1024).toFixed(0)} KB</p>
                                </div>
                                <button
                                    onClick={() => setResidenciaFile(null)}
                                    className="p-1 rounded-full hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => residenciaInputRef.current?.click()}
                                className="group flex items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 bg-white p-5 transition-colors hover:border-primary hover:bg-primary/5 cursor-pointer"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Home size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-slate-900">Comprovante de Residência</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Conta de luz, água ou telefone recente</p>
                                </div>
                            </button>
                        )}

                        <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    className="mt-0.5 h-5 w-5 cursor-pointer rounded border border-slate-300 bg-white accent-primary"
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <span className="text-sm text-slate-600 select-none group-hover:text-slate-900 transition-colors">
                                    Declaro que as informações são verdadeiras e estou ciente das regras de suspensão por faltas.
                                </span>
                            </label>
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                                {error}
                            </div>
                        )}
                    </main>
                </div>
            )}

            <div className="sticky bottom-0 z-20 bg-white/90 backdrop-blur-md p-6 pt-2 border-t border-slate-100">
                <button
                    onClick={() => {
                        if (step < totalSteps) {
                            setStep(step + 1)
                        } else {
                            handleSubmit()
                        }
                    }}
                    disabled={loading}
                    className="w-full rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-blue-600 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? 'Enviando...' : step < totalSteps ? 'Continuar' : 'Enviar para Análise'}
                </button>
            </div>
        </div>
    )
}
