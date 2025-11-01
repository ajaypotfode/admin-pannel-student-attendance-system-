import { Link, NavLink } from 'react-router-dom';

import {
    LayoutDashboard,
    // BarChart,
    CalendarCheck,
    ClipboardList,
    CalendarRange,
    Users,
    // Upload,
    History,
    UserCheck,
    // ShieldCheck,
    Settings,
    // QrCode,
    Bell,
    LogOut,
    SidebarClose,
    // SidebarIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import UseAuth from '@/hooks/useAuth';
import UseCommonData from '@/hooks/useCommonData';


const sidebarGroups = [
    {
        group: "Dashboard",
        items: [
            { label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
            // { label: "Reports", icon: BarChart, path: "/dashboard/reports" },
        ],
    },
    {
        group: "Attendance",
        items: [
            { label: "Mark Attendance", icon: CalendarCheck, path: "/attendance/mark" },
            { label: "View Attendance", icon: ClipboardList, path: "/attendance/view" },
            { label: "Weekly Summary", icon: CalendarRange, path: "/attendance/summary" },
        ],
    },
    {
        group: "Students",
        items: [
            { label: "Student List", icon: Users, path: '/students/list' },
            { label: "Assign Class", icon: Users, path: '/students/assign-class' },
            // { label: "Import Students", icon: Upload, path: "/students/import" },
            { label: "Attendance History", icon: History, path: "/students/summary" },
        ],
    },
    {
        group: "Faculty",
        items: [
            // { label: "Faculty List", icon: UserCheck, path: "/faculty" },
            { label: "Add Trainers", icon: UserCheck, path: "/faculty/add" },
            { label: "Trainers List", icon: UserCheck, path: "/faculty/trainers" },
            // { label: "Assign Roles", icon: ShieldCheck, path: "/faculty/roles" },
        ],
    },
    {
        group: "Settings",
        items: [
            { label: "User Management", icon: Settings, path: "/settings/users" },
            { label: "Class Management", icon: Bell, path: "/settings/classes" },
            { label: "Registration", icon: Bell, path: "/settings/registration" },
            // { label: "QR Code Settings", icon: QrCode, path: "/settings/qr" },
            { label: "Notifications", icon: Bell, path: "/settings/notification" },
        ]
    }
]

const Sidebar = () => {
    const { getUserLogout, user } = UseAuth();
    const { handleSidebar, sidebar } = UseCommonData()
    return (
        <div className={`min-h-screen sidebar 2xl:w-60 xl:w-48 w-60 text-[] pr-0 pt-2 inline-block  transform  transition-transform duration-300 ease-in-out relative z-10  xl:bg-transparent xl:border-0 border-r  border-gray-600 bg-gray-800 xl:shadow-transparent  shadow-2xl shadow-black  ${sidebar ? "" : "inActive"} `}>
            <div className=" w-full text-white  border-gray-500 flex relative" >
                <div

                    className={` nav-items flex items-center px-3 sm:pb-3 pb-2 rounded-lg w-full transition-all duration-300 group cursor-pointer`}
                >
                    {/* <span className="nav-icons"></span> */}
                    <Avatar className='border w-8 h-8'>
                        <AvatarImage src="https://github.com/shadcn.png" className='border' alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex-1 pl-2 text-start'>
                        <p className='text-xs'>{user?.userName}</p>
                        {/* <p className='text-[10px] text-gray-300'>ajay@gmail.com</p> */}
                        <p className='text-[10px] text-gray-500'>{user?.role}</p>
                    </div>
                </div>
                <button className='absolute top-0 right-0 active-icon ' onClick={handleSidebar} >
                    <SidebarClose className='w-5 h-5' />
                </button>
            </div>
            <div className='flex flex-col  overflow-y-auto h-[80%] pl-6 pb-10 scrollbar-hidden '>
                {sidebarGroups.map((group, i) => (
                    <div key={i}>
                        <h4 className="smallsc1:text-md text-xs text-gray-400 uppercase mb-2">{group.group}</h4>
                        <ul className="space-y-1">
                            {group.items.map((item, idx) => {
                                // const isActive = pathname === item.path
                                return (
                                    <li key={idx}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 px-3 py-2 rounded-md smallsc1:text-sm text-[12px] text-white
                                               ${isActive ? "bg-gradient-to-bl from-gray-900 from-10% to-blue-950 to-60%" : ""}`
                                            }
                                        >
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="logout-btn-container  mb-5 w-full px-4  text-white  border-t border-gray-500 " >
                <button
                    onClick={getUserLogout}
                    className={` nav-items mt-2 flex items-center px-3 sm:py-3 py-2 rounded-lg w-full transition-all duration-300 group lg:hover:bg-black cursor-pointer`}
                >
                    {/* <span className="nav-icons"></span> */}
                    <LogOut className='w-5 h-5' />
                    <span className="navItem-text ml-3 smallsc1:text-md text-sm lg:group-hover:text-white ">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar
