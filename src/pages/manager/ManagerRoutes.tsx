import { Search, Map, ChevronDown, Bus } from 'lucide-react'

export default function ManagerRoutes() {
    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-full">
            {/* Header (Desktop mainly, Mobile has layout header but we can add filters here) */}
            <div className="hidden md:flex items-center p-4 pb-2 justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h2 className="text-xl font-bold leading-tight flex-1">Gestão de Rotas</h2>
                <div className="flex items-center justify-end">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-blue-600 focus:border-blue-600 w-64"
                            placeholder="Buscar rota..."
                            type="text"
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 transition-colors">
                    <p className="text-sm font-medium">Linha</p>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 transition-colors">
                    <p className="text-sm font-medium">Período</p>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 transition-colors">
                    <p className="text-sm font-medium">Status</p>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
            </div>

            {/* Route List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">

                    {/* Route Item 1 */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
                                <Bus className="text-blue-600 w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                    <h3 className="font-semibold text-lg">Linha 101 - Centro / Norte</h3>
                                    <span className="inline-flex self-start items-center px-2.5 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                        Em trânsito
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Ocupação: <span className="font-medium text-slate-700 dark:text-slate-300">32/44</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400 mb-5 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800/50">
                            <div>
                                <span className="block text-xs text-slate-400 dark:text-slate-500 mb-1">Motorista</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">João Silva</span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 dark:text-slate-500 mb-1">Veículo</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">Placa A123</span>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 rounded-lg h-11 bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 font-medium transition-colors">
                            <Map className="w-5 h-5" />
                            Ver Mapa
                        </button>
                    </div>

                    {/* Route Item 2 */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
                                <Bus className="text-blue-600 w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                    <h3 className="font-semibold text-lg">Linha 204 - Sul / Leste</h3>
                                    <span className="inline-flex self-start items-center px-2.5 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                        Atrasado (15m)
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Ocupação: <span className="font-medium text-slate-700 dark:text-slate-300">15/44</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400 mb-5 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800/50">
                            <div>
                                <span className="block text-xs text-slate-400 dark:text-slate-500 mb-1">Motorista</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">Maria Santos</span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 dark:text-slate-500 mb-1">Veículo</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">Placa B456</span>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 rounded-lg h-11 bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 font-medium transition-colors">
                            <Map className="w-5 h-5" />
                            Ver Mapa
                        </button>
                    </div>

                    {/* Route Item 3 */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
                                <Bus className="text-blue-600 w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                    <h3 className="font-semibold text-lg">Linha 305 - Universitária</h3>
                                    <span className="inline-flex self-start items-center px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                                        Parado
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Ocupação: <span className="font-medium text-slate-700 dark:text-slate-300">0/44</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400 mb-5 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800/50">
                            <div>
                                <span className="block text-xs text-slate-400 dark:text-slate-500 mb-1">Motorista</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">Carlos Mendes</span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 dark:text-slate-500 mb-1">Veículo</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">Placa C789</span>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 rounded-lg h-11 bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 font-medium transition-colors">
                            <Map className="w-5 h-5" />
                            Ver Mapa
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
