import { 
  Building2, 
  Route, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ShieldCheck, 
  PlusCircle, 
  UserPlus, 
  Filter, 
  Download, 
  Edit3,
  Search,
  Bell
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

export default function SuperAdminDashboard() {
  // const { user } = useAuthStore() // Removed if unused

  const kpis = [
    {
      title: 'Total de Prefeituras',
      value: '42',
      change: '+2% este mês',
      trend: 'up',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Embarques Diários (Global)',
      value: '128.5k',
      change: '+5.4% vs semana passada',
      trend: 'up',
      icon: Activity,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: 'Saúde Global da Frota',
      value: '94.2%',
      change: '-1.2% alertas de serviço',
      trend: 'down',
      icon: ShieldCheck,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ]

  const prefeituras = [
    { name: 'Prefeitura de Aracaju', status: 'Active', routes: 45, drivers: 120, initial: 'A' },
    { name: 'Prefeitura de São Paulo', status: 'Active', routes: 312, drivers: 890, initial: 'S' },
    { name: 'Prefeitura de Curitiba', status: 'Suspended', routes: 88, drivers: 215, initial: 'C' },
    { name: 'Prefeitura de Manaus', status: 'Active', routes: 62, drivers: 145, initial: 'M' }
  ]

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-slate-50 dark:bg-slate-950">
      {/* Header Info (Visible on mobile dashboard) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Console de Comando Central</h1>
          <p className="text-slate-500 dark:text-slate-400">Visão global do ecossistema MobilitySaaS</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar dados..." 
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{kpi.title}</p>
                <h3 className="text-3xl font-bold mt-2">{kpi.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
            <div className={`mt-4 flex items-center gap-1 text-sm font-medium ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <h4 className="font-semibold text-slate-700 dark:text-slate-300">Ações Rápidas:</h4>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
            <PlusCircle className="w-4 h-4" />
            <span>Nova Prefeitura</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            <UserPlus className="w-4 h-4" />
            <span>Novo Gestor</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client Management Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Prefeituras Ativas</h3>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">Ver Todas</button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase font-bold text-slate-500 tracking-wider">
                    <th className="px-6 py-4">Prefeitura</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Rotas</th>
                    <th className="px-6 py-4">Motoristas</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {prefeituras.map((pref) => (
                    <tr key={pref.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold border border-blue-600/20">
                            {pref.initial}
                          </div>
                          <span className="font-semibold">{pref.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          pref.status === 'Active' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' 
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${pref.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                          {pref.status === 'Active' ? 'Ativo' : 'Suspenso'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{pref.routes}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{pref.drivers}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Form: Register New Municipality */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold">Nova Prefeitura</h3>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Cidade</label>
                <input 
                  type="text" 
                  placeholder="Ex: Florianópolis" 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Estado</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option value="">Selecione...</option>
                  <option value="SE">Sergipe</option>
                  <option value="SP">São Paulo</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Gestor Principal</label>
                <input 
                  type="text" 
                  placeholder="Nome do gestor" 
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="pt-2">
                <button 
                  type="button"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
                >
                  Implantar Infraestrutura
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
