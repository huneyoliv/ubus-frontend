import { Search, Filter, MoreHorizontal, Maximize2, School, Route, Bus, AlertCircle, TrendingUp } from 'lucide-react'

export default function ManagerDashboard() {
    return (
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-6 md:hidden">Visão Geral do Gestor</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8 gap-4 md:gap-6">
                {/* Alunos */}
                <div className="flex flex-col gap-3 rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal uppercase tracking-wider">Alunos Ativos</p>
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                            <School className="text-blue-600 w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold leading-tight">1.204</p>
                        <p className="text-emerald-500 text-sm font-medium mt-1 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" /> +2.4% este mês
                        </p>
                    </div>
                </div>

                {/* Viagens */}
                <div className="flex flex-col gap-3 rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal uppercase tracking-wider">Viagens Hoje</p>
                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                            <Route className="text-emerald-500 w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold leading-tight">84</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">100% programadas</p>
                    </div>
                </div>

                {/* Frota */}
                <div className="flex flex-col gap-3 rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal uppercase tracking-wider">Frota Operação</p>
                        <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                            <Bus className="text-amber-500 w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold leading-tight">12 <span className="text-lg font-normal text-slate-500">/ 15</span></p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">3 veículos em manutenção</p>
                    </div>
                </div>

                {/* Pendências */}
                <div className="flex flex-col gap-3 rounded-2xl p-5 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-red-700 dark:text-red-400 text-sm font-medium leading-normal uppercase tracking-wider">Pendências</p>
                        <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                            <AlertCircle className="text-red-500 w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <p className="text-red-700 dark:text-red-400 text-3xl font-bold leading-tight">8</p>
                        <p className="text-red-600/80 dark:text-red-400/80 text-sm font-medium mt-1">Cadastros aguardando revisão</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráfico */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <h3 className="text-lg font-bold">Deslocamentos Semanais de Alunos</h3>
                        <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm rounded-lg px-3 py-1.5 focus:ring-blue-600 focus:border-blue-600">
                            <option>Esta Semana</option>
                            <option>Semana Passada</option>
                            <option>Últimos 30 dias</option>
                        </select>
                    </div>

                    <div className="flex-1 relative min-h-[240px] flex items-end gap-2 md:gap-4 mt-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-full border-t border-slate-200 dark:border-slate-800 opacity-50"></div>
                            ))}
                        </div>

                        {/* Barras do Gráfico Fake */}
                        {[{ day: 'Seg', h: '60%' }, { day: 'Ter', h: '75%' }, { day: 'Qua', h: '85%' }, { day: 'Qui', h: '70%' }, { day: 'Sex', h: '90%' }].map((bar, i) => (
                            <div key={i} className="relative flex-1 flex flex-col justify-end items-center group h-full">
                                <div className="w-full max-w-[40px] bg-blue-600/20 hover:bg-blue-600/40 rounded-t-sm transition-colors relative" style={{ height: bar.h }}>
                                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white dark:border-slate-900"></div>
                                </div>
                                <span className="absolute -bottom-6 text-xs text-slate-500 dark:text-slate-400">{bar.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mapa */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Mapa em Tempo Real</h3>
                        <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                            <Maximize2 className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 w-full bg-slate-200 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative min-h-[240px] bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-10.9472,-37.0731&zoom=13&size=400x300&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:water|element:geometry|color:0x3498db&sensor=false')] bg-cover bg-center">
                        <div className="absolute inset-0 bg-black/10"></div>

                        <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                                <Bus className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="absolute top-[60%] left-[70%] -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                                <Bus className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50 shadow-sm flex items-center justify-center">
                            <span className="text-sm font-medium flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                8 ônibus operando agora
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rotas Ativas Hoje */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mb-8 md:mb-0">
                <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold">Rotas Ativas Hoje</h3>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-blue-600 focus:border-blue-600 md:w-64"
                                placeholder="Buscar rota..."
                                type="text"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-3 md:px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <Filter className="w-4 h-4" /> <span className="hidden md:inline">Filtrar</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="px-6 py-4">Linha / Rota</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Motorista</th>
                                <th className="px-6 py-4">Veículo</th>
                                <th className="px-6 py-4">Ocupação</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                                        <Route className="w-4 h-4" />
                                    </div>
                                    <span className="whitespace-nowrap">Linha 02 - UNIT</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold uppercase tracking-wide">
                                        No Prazo
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">João Silva</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">Placa ABC-1234</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden w-24">
                                            <div className="h-full bg-blue-600 w-[85%]"></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">85%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                                        <Route className="w-4 h-4" />
                                    </div>
                                    <span className="whitespace-nowrap">Linha 05 - UFS</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                                        Atrasada (10m)
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">Carlos Mendes</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">Placa XYZ-9876</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden w-24">
                                            <div className="h-full bg-amber-500 w-[95%]"></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">95%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
