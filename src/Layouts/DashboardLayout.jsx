import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { GoSidebarExpand } from "react-icons/go";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/favicon.png'
import parcel from '../assets/dashboard/package.png'
import { SiBookstack } from "react-icons/si";
import { FaRegUser } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
const DashboardLayout = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false)
    return (
        <SidebarProvider className="font-Lato">
            <div className="flex flex-1">
                <Sidebar open={sidebarOpen} onOpenChange={setSideBarOpen} className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 lg:block hidden bg-gray-100 shadow-lg`}>
                    <div className="flex justify-end">
                        <SidebarTrigger onClick={() => setSideBarOpen(!sidebarOpen)} className="bg-gray-800 md:hidden text-white p-5">
                        </SidebarTrigger>
                    </div>
                    <SidebarContent className=" text-black w-64 p-5">
                        {/* header */}
                        <SidebarHeader className="rounded-md bg-white shadow-md text-black">
                            <Link to='/' className="flex gap-2 font-bebasNeue  text-3xl font-semibold items-center"><img className='w-12' src={logo} alt="" /><span className='tracking-wide'>SwiftParcel</span></Link>
                        </SidebarHeader>
                        <div className="divider mb-0"></div>
                        <div className="flex flex-col justify-between h-screen">
                            <div className="space-y-2">
                                <NavLink to='/dashboard/bookParcel' className="block px-3 py-2  gap-3 rounded-md bg-slate-200"><span className="flex items-center gap-4"><SiBookstack />Book a Parcel</span></NavLink>
                                <NavLink to="/dashboard/myParcel" className="block px-3 py-2 rounded-md bg-slate-200"><span className="flex items-center gap-4"><img className="w-4" src={parcel} alt="" />My Parcel</span></NavLink>
                            </div>
                            {/* footer */}
                            <div>
                                <div className="divider mb-0"></div>
                                <NavLink to='/dashboard/myProfile' className="bg-slate-200 mb-2 block px-3 py-2 rounded-md"><span className="flex items-center gap-4"><FaRegUser />My Profile</span></NavLink>
                                <NavLink to='/' className="bg-slate-200 block px-3 py-2 rounded-md"><span className="flex items-center gap-4"><IoHomeOutline />Home</span></NavLink>
                            </div>
                        </div>

                    </SidebarContent>
                </Sidebar>
                <div className="flex-1 border-l-2 border-gray-50 shadow-md">
                    <button onClick={() => setSideBarOpen(!sidebarOpen)} className="md:hidden p-1 text-4xl"><GoSidebarExpand className="text-4xl"></GoSidebarExpand></button>
                    <div className=" w-full">
                    <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;