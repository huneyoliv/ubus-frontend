import { Settings } from 'lucide-react'

export default function ManagerConfiguracoes() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-50 dark:bg-slate-950">
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center mb-6">
                <Settings className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Configurações Gerais</h1>
            <p className="text-slate-500 max-w-md">
                O painel de configurações do sistema está em desenvolvimento.
                Em breve você poderá gerenciar permissões, integrações e parâmetros do Ubus.
            </p>
        </div>
    )
}
