import { 
  Building2, 
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

export default function SuperAdminDashboard() {
  const kpis = [
    {
      title: 'Total de Prefeituras',
      value: '42',
      change: '+2% este mês',
      trend: 'up',
      icon: Building2,
      color: 'var(--color-primary)',
      bgColor: 'rgba(37,99,235,0.08)',
      trendColor: 'var(--color-success)'
    },
    {
      title: 'Embarques Diários (Global)',
      value: '128.5k',
      change: '+5.4% vs semana passada',
      trend: 'up',
      icon: Activity,
      color: 'var(--color-success)',
      bgColor: 'rgba(16,185,129,0.08)',
      trendColor: 'var(--color-success)'
    },
    {
      title: 'Saúde Global da Frota',
      value: '94.2%',
      change: '-1.2% alertas de serviço',
      trend: 'down',
      icon: ShieldCheck,
      color: '#D97706',
      bgColor: 'rgba(245,158,11,0.08)',
      trendColor: '#EF4444'
    }
  ]

  const prefeituras = [
    { name: 'Prefeitura de Aracaju', status: 'Active', routes: 45, drivers: 120, initial: 'A' },
    { name: 'Prefeitura de São Paulo', status: 'Active', routes: 312, drivers: 890, initial: 'S' },
    { name: 'Prefeitura de Curitiba', status: 'Suspended', routes: 88, drivers: 215, initial: 'C' },
    { name: 'Prefeitura de Manaus', status: 'Active', routes: 62, drivers: 145, initial: 'M' }
  ]

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--color-bg)' }}>
      <div className="flex-1 overflow-y-auto p-5 md:p-8 max-w-[1600px] mx-auto w-full space-y-6 md:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
              Console de Comando Central
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-2)' }}>
              Visão global do ecossistema MobilitySaaS
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-3)' }} />
              <input 
                type="text" 
                placeholder="Buscar dados..." 
                className="pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-500/20 w-full md:w-64"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>
            <button className="p-2.5 rounded-xl transition-colors relative" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-3)' }}>
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2" style={{ borderColor: 'var(--color-surface)' }}></span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi) => (
            <div key={kpi.title} className="p-6 rounded-2xl transition-all hover:-translate-y-1" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: '0 4px 16px -4px rgba(0,0,0,0.05)' }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-3)' }}>{kpi.title}</p>
                  <h3 className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>{kpi.value}</h3>
                </div>
                <div className="p-3 rounded-xl flex items-center justify-center shrink-0" style={{ background: kpi.bgColor, color: kpi.color }}>
                  <kpi.icon size={22} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold" style={{ color: kpi.trendColor }}>
                {kpi.trend === 'up' ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
                <span>{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <h4 className="text-sm font-bold w-full sm:w-auto mb-2 sm:mb-0" style={{ color: 'var(--color-text)' }}>Ações Rápidas:</h4>
            <button className="btn-primary px-4 h-10 flex items-center gap-2 flex-1 sm:flex-none justify-center">
              <PlusCircle size={16} />
              <span>Nova Prefeitura</span>
            </button>
            <button className="px-4 h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all hover:bg-slate-50 flex-1 sm:flex-none"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
              <UserPlus size={16} />
              <span>Novo Gestor</span>
            </button>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end mt-2 sm:mt-0">
            <button className="p-2.5 rounded-xl transition-colors hover:bg-slate-100" style={{ color: 'var(--color-text-3)' }}>
              <Filter size={18} />
            </button>
            <button className="p-2.5 rounded-xl transition-colors hover:bg-slate-100" style={{ color: 'var(--color-text-3)' }}>
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Main Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client Management Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>Prefeituras Ativas</h3>
              <button className="text-sm font-bold hover:underline transition-all" style={{ color: 'var(--color-primary)' }}>Ver Todas</button>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="text-[11px] font-bold uppercase tracking-wider" style={{ background: 'rgba(37,99,235,0.03)', color: 'var(--color-text-3)' }}>
                      <th className="px-6 py-4">Prefeitura</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Rotas</th>
                      <th className="px-6 py-4">Motoristas</th>
                      <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium divide-y" style={{ divideColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                    {prefeituras.map((pref) => (
                      <tr key={pref.name} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0"
                              style={{ background: 'rgba(37,99,235,0.08)', color: 'var(--color-primary)', border: '1px solid rgba(37,99,235,0.1)' }}>
                              {pref.initial}
                            </div>
                            <span className="font-bold">{pref.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            pref.status === 'Active' 
                              ? 'bg-emerald-100/50 text-emerald-700' 
                              : 'bg-rose-100/50 text-rose-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${pref.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                            {pref.status === 'Active' ? 'Ativo' : 'Suspenso'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold" style={{ color: 'var(--color-text-2)' }}>{pref.routes}</td>
                        <td className="px-6 py-4 font-semibold" style={{ color: 'var(--color-text-2)' }}>{pref.drivers}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 -mr-2 rounded-lg transition-colors hover:bg-slate-100" style={{ color: 'var(--color-text-3)' }}>
                            <Edit3 size={16} />
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
              <PlusCircle size={20} style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>Nova Prefeitura</h3>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <form className="space-y-4 flex flex-col gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-3)' }}>Cidade</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Florianópolis" 
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-3)' }}>Estado</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                  >
                    <option value="">Selecione...</option>
                    <option value="SE">Sergipe</option>
                    <option value="SP">São Paulo</option>
                    <option value="PR">Paraná</option>
                    <option value="SC">Santa Catarina</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-3)' }}>Gestor Principal</label>
                  <input 
                    type="text" 
                    placeholder="Nome do gestor" 
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
                <div className="pt-3">
                  <button type="button" className="btn-primary w-full shadow-lg shadow-blue-600/20">
                    Implantar Infraestrutura
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
