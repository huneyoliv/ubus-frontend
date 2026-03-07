import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import AppLayout from '@/components/layout/AppLayout'
import DriverLayout from '@/components/layout/DriverLayout'
import ManagerLayout from '@/components/layout/ManagerLayout'
import Home from '@/pages/Home'
import MotoristaDashboard from '@/pages/driver/MotoristaDashboard'
import ManagerDashboard from '@/pages/manager/ManagerDashboard'

export default function Dashboard() {
    const { user, isAuthenticated } = useAuthStore()

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    if (user.type === 'aluno') {
        return (
            <AppLayout>
                <Home />
            </AppLayout>
        )
    }

    if (user.type === 'motorista') {
        return (
            <DriverLayout>
                <MotoristaDashboard />
            </DriverLayout>
        )
    }

    if (user.type === 'gestor') {
        return (
            <ManagerLayout>
                <ManagerDashboard />
            </ManagerLayout>
        )
    }

    return <Navigate to="/login" replace />
}
