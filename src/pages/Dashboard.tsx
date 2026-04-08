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

    return <Navigate to="/login" replace />
}
