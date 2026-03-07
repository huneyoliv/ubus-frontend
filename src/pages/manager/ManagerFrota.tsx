import { Construction } from 'lucide-react'

export default function ManagerFrota() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-50 dark:bg-slate-950">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Construction className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Gestão de Frota</h1>
            <p className="text-slate-500 max-w-md">
                O módulo de gestão de frota está atualmente em desenvolvimento.
                Em breve você poderá gerenciar veículos e manutenções por aqui.
            </p>
        </div>
    )
}
