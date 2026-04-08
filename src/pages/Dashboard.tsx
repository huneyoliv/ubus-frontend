import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import AppLayout from '@/components/layout/AppLayout'
import DriverLayout from '@/components/layout/DriverLayout'
import ManagerLayout from '@/components/layout/ManagerLayout'
import Home from '@/pages/Home'
import MotoristaDashboard from '@/pages/driver/MotoristaDashboard'
import ManagerDashboard from '@/pages/manager/ManagerDashboard'
import SuperAdminDashboard from '@/pages/manager/SuperAdminDashboard'

export default function Dashboard() {
    const { user, isAuthenticated } = useAuthStore()

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    if (user.role === 'STUDENT' || user.role === 'LIDER' || user.role === 'CARONISTA') {
        return (
            <AppLayout>
                <Home />
            </AppLayout>
        )
    }

    if (user.role === 'MOTORISTA') {
        return (
            <DriverLayout>
                <MotoristaDashboard />
            </DriverLayout>
        )
    }

    if (user.role === 'GESTOR' || user.role === 'SUPER_ADMIN') {
        return (
            <ManagerLayout>
                {user.role === 'SUPER_ADMIN' ? (
                    <SuperAdminDashboard />
                ) : (
                    <ManagerDashboard />
                )}
            </ManagerLayout>
        )
    }

    return <Navigate to="/login" replace />
}
