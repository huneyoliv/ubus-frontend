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

    console.log('[Dashboard] isAuthenticated:', isAuthenticated)
    console.log('[Dashboard] user:', user)
    console.log('[Dashboard] user.role:', user?.role)

    if (!isAuthenticated || !user) {
        console.log('[Dashboard] Não autenticado, redirecionando para /login')
        return <Navigate to="/login" replace />
    }

    if (user.role === 'STUDENT' || user.role === 'LEADER' || user.role === 'RIDE_SHARE') {
        return (
            <AppLayout>
                <Home />
            </AppLayout>
        )
    }

    if (user.role === 'DRIVER') {
        return (
            <DriverLayout>
                <MotoristaDashboard />
            </DriverLayout>
        )
    }

    if (user.role === 'MANAGER' || user.role === 'SUPER_ADMIN') {
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

    console.log('[Dashboard] Role não reconhecida:', user.role, '- usando fallback para AppLayout')
    return (
        <AppLayout>
            <Home />
        </AppLayout>
    )
}
