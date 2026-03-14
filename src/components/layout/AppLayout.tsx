import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function AppLayout({ children }: { children?: React.ReactNode }) {
    const location = useLocation()
    const hiddenNavRoutes = ['/bilhete']
    const showNav = !hiddenNavRoutes.includes(location.pathname)

    return (
        <div className="w-full max-w-md mx-auto h-[100dvh] relative overflow-hidden bg-bg-light flex flex-col">
            <div className="flex-1 overflow-y-auto pb-20">
                {children ?? <Outlet />}
            </div>
            {showNav && <BottomNav />}
        </div>
    )
}
