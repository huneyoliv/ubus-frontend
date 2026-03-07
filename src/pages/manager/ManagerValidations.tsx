import { useState } from 'react'
import { Search, Check, X, ZoomIn, Download, FileText, UserCheck, Bus } from 'lucide-react'

export default function ManagerValidations() {
    const [selectedStudent, setSelectedStudent] = useState(1)

    const students = [
        { id: 1, name: 'Mariana Silva Costa', inst: 'Universidade Tiradentes (UNIT)', time: 'Há 2h', isNew: true },
        { id: 2, name: 'Lucas Oliveira Santos', inst: 'UFS - São Cristóvão', time: 'Há 4h', isNew: false },
        { id: 3, name: 'Beatriz Ferreira', inst: 'Instituto Federal (IFS)', time: 'Ontem', isNew: true },
    ]

    return (
        <div className="flex flex-col md:flex-row h-full overflow-hidden bg-slate-50 dark:bg-slate-950 absolute inset-0">
            {/* Sidebar List */}
            <div className="w-full md:w-[340px] lg:w-[400px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 h-[40vh] md:h-full z-10">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold tracking-tight">Fila de Aprovação</h2>
                        <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">12 Pendentes</span>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-500" placeholder="Buscar aluno..." type="text" />
                    </div>

                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                        <button className="whitespace-nowrap px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-medium">Todos (12)</button>
                        <button className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Renovação (8)</button>
                        <button className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Novos (4)</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {students.map((student) => (
                        <div
                            key={student.id}
                            onClick={() => setSelectedStudent(student.id)}
                            className={`p-4 border-b border-slate-200 dark:border-slate-800 cursor-pointer relative transition-colors ${selectedStudent === student.id ? 'bg-blue-600/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                        >
                            {selectedStudent === student.id && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                            )}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 flex items-center justify-center font-bold text-slate-500 overflow-hidden">
                                        {student.id === 1 ? (
                                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Foto perfil" className="w-full h-full object-cover" />
                                        ) : (
                                            student.name.substring(0, 2).toUpperCase()
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="text-sm font-semibold truncate text-slate-900 dark:text-white">{student.name}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{student.inst}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className="text-[10px] text-slate-500">{student.time}</span>
                                    {student.isNew ? (
                                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">Novo</span>
                                    ) : (
                                        <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">Renovação</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Validation Details Area */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto md:overflow-hidden relative bg-slate-50 dark:bg-slate-950">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-4 z-10 sticky top-0 md:static">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                            Revisão de Cadastro
                            <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Aguardando</span>
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Verifique os documentos e aprove ou rejeite a solicitação.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-semibold text-sm">
                            <X className="w-5 h-5" />
                            Reprovar
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-semibold text-sm shadow-sm">
                            <Check className="w-5 h-5" />
                            Aprovar
                        </button>
                    </div>
                </div>

                {/* Details Content */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto md:overflow-hidden">
                    {/* Left Panel: Info */}
                    <div className="w-full lg:w-1/3 p-6 flex flex-col gap-6 lg:overflow-y-auto lg:border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 min-w-0">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 bg-cover bg-center border-4 border-white dark:border-slate-900 shadow-sm overflow-hidden">
                                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Foto perfil" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-lg font-bold">Mariana Silva Costa</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">CPF: 123.456.789-00</p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Dados Institucionais</h4>
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
                                    <div>
                                        <span className="text-xs text-slate-500 block">Instituição</span>
                                        <span className="text-sm font-medium">Universidade Tiradentes (UNIT)</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-500 block">Curso</span>
                                        <span className="text-sm font-medium">Direito - Noturno</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-500 block">Matrícula</span>
                                        <span className="text-sm font-medium">2023101456</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Rota Solicitada</h4>
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                                        <Bus className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold block">Linha 02 - Centro / UNIT</span>
                                        <span className="text-xs text-slate-500 mt-0.5">Turno: Noturno</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Documents */}
                    <div className="w-full lg:w-2/3 p-6 flex flex-col gap-4 lg:overflow-y-auto min-w-0">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Documentos Anexados</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 pb-8 md:pb-0">
                            {/* Selfie Card */}
                            <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full min-h-[300px]">
                                <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
                                    <span className="text-sm font-semibold flex items-center gap-2">
                                        <UserCheck className="w-4 h-4 text-slate-500" />
                                        Selfie (Foto de Perfil)
                                    </span>
                                    <button className="text-blue-600 hover:bg-blue-600/10 p-1.5 rounded-md transition-colors">
                                        <ZoomIn className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 p-4 flex items-center justify-center relative">
                                    <img src="https://i.pravatar.cc/300?u=a042581f4e29026704d" alt="Selfie do Aluno" className="max-h-full max-w-full object-contain rounded-lg shadow-md" />
                                </div>
                            </div>

                            {/* Comprovante Card */}
                            <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full min-h-[300px]">
                                <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
                                    <span className="text-sm font-semibold flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-slate-500" />
                                        Comprovante de Matrícula
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button className="text-blue-600 hover:bg-blue-600/10 p-1.5 rounded-md transition-colors">
                                            <ZoomIn className="w-4 h-4" />
                                        </button>
                                        <button className="text-blue-600 hover:bg-blue-600/10 p-1.5 rounded-md transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 p-4 flex items-center justify-center relative">
                                    <div className="w-full h-full bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-6 text-center max-w-full">
                                        <FileText className="w-12 h-12 text-slate-400 mb-3 shrink-0" />
                                        <p className="text-sm font-medium truncate w-full px-2">declaracao_matricula_2023.pdf</p>
                                        <p className="text-xs text-slate-500 mt-1">2.4 MB</p>
                                        <button className="mt-4 px-4 py-2 bg-blue-600/10 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-600/20 transition-colors">
                                            Visualizar Documento
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
