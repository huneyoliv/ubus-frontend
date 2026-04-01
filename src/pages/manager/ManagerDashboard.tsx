import { Search, Filter, Maximize2, School, Route, Bus, AlertCircle, TrendingUp } from 'lucide-react'

export default function ManagerDashboard() {
    return (
        <div className="flex flex-col min-h-full" style={{ background: 'var(--color-bg)' }}>
            <div className="p-5 md:p-8 max-w-[1600px] mx-auto w-full space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                            Visão Geral do Gestor
                        </h1>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-text-2)' }}>
                            Acompanhe os principais indicadores da sua frota hoje.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6 gap-4">
                    <div className="flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-1" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: '0 4px 16px -4px rgba(37,99,235,0.05)' }}>
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>Alunos Ativos</p>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.08)', color: 'var(--color-primary)' }}>
                                <School size={20} />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>—</p>
                            <p className="text-[11px] font-semibold mt-1 flex items-center gap-1" style={{ color: 'var(--color-text-3)' }}>
                                <TrendingUp size={12} /> Aguardando dados
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-1" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: '0 4px 16px -4px rgba(16,185,129,0.05)' }}>
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>Viagens Hoje</p>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--color-success)' }}>
                                <Route size={20} />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>—</p>
                            <p className="text-[11px] font-semibold mt-1" style={{ color: 'var(--color-text-3)' }}>Aguardando dados</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-1" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: '0 4px 16px -4px rgba(245,158,11,0.05)' }}>
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>Frota Operação</p>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.08)', color: '#D97706' }}>
                                <Bus size={20} />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>—</p>
                            <p className="text-[11px] font-semibold mt-1" style={{ color: 'var(--color-text-3)' }}>Aguardando dados</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-1" style={{ background: 'rgba(239,68,68,0.02)', border: '1px solid rgba(239,68,68,0.15)', boxShadow: '0 4px 16px -4px rgba(239,68,68,0.05)' }}>
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#EF4444' }}>Pendências</p>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
                                <AlertCircle size={20} />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)', color: '#EF4444' }}>—</p>
                            <p className="text-[11px] font-semibold mt-1" style={{ color: 'rgba(239,68,68,0.7)' }}>Aguardando dados</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 rounded-2xl p-6 flex flex-col" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>Deslocamentos Semanais</h3>
                            <select className="text-sm font-semibold px-4 py-2 rounded-xl outline-none" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                                <option>Esta Semana</option>
                                <option>Semana Passada</option>
                                <option>Últimos 30 dias</option>
                            </select>
                        </div>
                        <div className="flex-1 flex items-center justify-center min-h-[240px] rounded-xl border-2 border-dashed" style={{ borderColor: 'var(--color-border)' }}>
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-3)' }}>Sem dados disponíveis para o período</p>
                        </div>
                    </div>

                    <div className="lg:col-span-1 border rounded-2xl p-6 flex flex-col" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>Mapa em Tempo Real</h3>
                            <button className="p-2 rounded-lg transition-colors hover:bg-slate-100" style={{ color: 'var(--color-text-3)' }}>
                                <Maximize2 size={18} />
                            </button>
                        </div>
                        <div className="flex-1 rounded-xl flex items-center justify-center min-h-[240px] bg-cover bg-center" style={{ background: 'var(--color-bg)' }}>
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-3)' }}>Mapa indisponível</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>Rotas Ativas Hoje</h3>
                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-none">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-3)' }} />
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none md:w-64 transition-all"
                                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                                    placeholder="Buscar rota..."
                                    type="text"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-80"
                                style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                                <Filter size={16} /> <span className="hidden md:inline">Filtrar</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="text-[11px] font-bold uppercase tracking-wider" style={{ background: 'rgba(37,99,235,0.03)', color: 'var(--color-text-3)' }}>
                                    <th className="px-6 py-4">Linha / Rota</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Motorista</th>
                                    <th className="px-6 py-4">Veículo</th>
                                    <th className="px-6 py-4">Ocupação</th>
                                    <th className="px-6 py-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-sm font-semibold" style={{ color: 'var(--color-text-3)' }}>
                                        Nenhuma rota ativa no momento
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
