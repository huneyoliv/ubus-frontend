import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

interface ProtectedRouteProps {
    allowedTypes: ('aluno' | 'motorista' | 'gestor')[]
}

export default function ProtectedRoute({ allowedTypes }: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAuthStore()

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    if (!allowedTypes.includes(user.type)) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
