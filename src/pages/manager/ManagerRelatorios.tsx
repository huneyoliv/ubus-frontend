import { BarChart3 } from 'lucide-react'

export default function ManagerRelatorios() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-50 dark:bg-slate-950">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Relatórios Gerenciais</h1>
            <p className="text-slate-500 max-w-md">
                O módulo de relatórios analíticos está em fase de implementação.
                Logo você terá acesso a métricas detalhadas da operação.
            </p>
        </div>
    )
}
