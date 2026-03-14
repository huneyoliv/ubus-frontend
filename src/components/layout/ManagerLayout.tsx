import { Outlet, Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Route as RouteIcon,
    UserCheck,
    Bus,
    BarChart3,
    Settings,
    Bell,
    Menu,
    Landmark,
    ShieldCheck
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

export default function ManagerLayout({ children }: { children?: React.ReactNode }) {
    const location = useLocation()
    const { user } = useAuthStore()

    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Início', activePrefix: '/dashboard' },
        { path: '/rotas', icon: RouteIcon, label: 'Rotas', activePrefix: '/rotas' },
        { path: '/validacoes', icon: UserCheck, label: 'Validações', activePrefix: '/validacoes', badge: 12 },
        { path: '/frota', icon: Bus, label: 'Frota', activePrefix: '/frota' },
        { path: '/relatorios', icon: BarChart3, label: 'Relatórios', activePrefix: '/relatorios' },
    ]

    const isActive = (itemPath?: string) => {
        if (!itemPath || itemPath === '#') return false
        return location.pathname.startsWith(itemPath)
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans w-full h-screen flex overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shrink-0 z-20">
                <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
                    <Landmark className="text-blue-600 w-6 h-6 mr-3" />
                    <h2 className="text-lg font-bold leading-tight tracking-tight">
                        {user?.role === 'SUPER_ADMIN' ? 'Gestão de Sistema' : 'Gestão Municipal'}
                    </h2>
                </div>

                <nav className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = isActive(item.activePrefix)
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${active
                                    ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        )
                    })}

                    {user?.role === 'SUPER_ADMIN' && (
                        <Link
                            to="/admin-management"
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive('/admin-management')
                                ? 'bg-purple-600/10 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            <ShieldCheck className="w-5 h-5" />
                            <span>Gestão Geral</span>
                        </Link>
                    )}

                    <div className="mt-auto">
                        <Link to="/configuracoes" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors">
                            <Settings className="w-5 h-5" />
                            <span>Configurações</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold border border-blue-600/20 shrink-0">
                        GM
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold truncate text-slate-900 dark:text-slate-50">{user?.name || 'Gestor'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email || 'gestor@contato.com'}</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Desktop Header */}
                <header className="hidden md:flex h-16 bg-white dark:bg-slate-900 px-8 items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold tracking-tight">Painel Administrativo</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="text-right">
                                <p className="text-sm font-semibold leading-none">{user?.name || 'Carregando...'}</p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {user?.role === 'SUPER_ADMIN' ? 'Administrador Geral' : 'Gestor de Mobilidade'}
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold border border-blue-600/20">
                                {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'US'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Header */}
                <header className="md:hidden flex h-16 bg-white dark:bg-slate-900 px-4 items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0 z-10">
                    <button className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h2 className="text-lg font-bold leading-tight flex-1 text-center truncate px-2">GovMobility</h2>
                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold border border-blue-600/20 shrink-0">
                        {user?.name?.[0] || 'U'}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 pb-20 md:pb-0 relative">
                    {children ?? <Outlet />}
                </main>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-0 w-full left-0 right-0 flex gap-1 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 pt-2 pb-safe z-50">
                    {navItems.slice(0, 5).map((item) => {
                        const active = isActive(item.activePrefix)
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`flex flex-1 flex-col items-center justify-center gap-1 p-2 rounded-lg relative transition-colors ${active
                                    ? 'text-blue-600'
                                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <Icon className="w-6 h-6" />
                                {item.badge && (
                                    <span className="absolute top-1 right-2 bg-blue-600 text-white text-[8px] font-bold px-1 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                                <p className="text-[10px] font-medium leading-none tracking-wide">{item.label}</p>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}
