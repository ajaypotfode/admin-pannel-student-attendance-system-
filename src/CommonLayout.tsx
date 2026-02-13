import { Outlet } from 'react-router-dom'
import AppSidebar from './components/AppSidebar'
import UseCommonData from './hooks/useCommonData'
import { SidebarOpen } from 'lucide-react'

const CommonLayout = () => {
    const { handleSidebar, sidebar } = UseCommonData()
    return (
        <div className="min-h-screen bg-gradient-to-bl to-gray-900 from-10% from-blue-950 to-40% w-full overflow-hidden">
            {
                !sidebar && <button className='absolute top-1 left-1 text-white z-30 active-icon ' onClick={handleSidebar} >
                    <SidebarOpen className='w-5 h-5' />
                </button>
            }
            <div className="pt-5 px-5 h-screen flex">
                <AppSidebar />
                <div className="bg-white/10 backdrop-blur-lg flex-1 rounded-t-3xl overflow-y-auto relative">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default CommonLayout