import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import type { RoleUsuario } from '@/types'

interface ProtectedRouteProps {
    allowedTypes: RoleUsuario[]
}

export default function ProtectedRoute({ allowedTypes }: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAuthStore()

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    if (!allowedTypes.includes(user.role)) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
