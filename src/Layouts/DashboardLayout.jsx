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
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/favicon.png'
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false)
    return (
        <SidebarProvider className="font-Lato">
            <div className="flex">
            <Sidebar open={sidebarOpen} onOpenChange={setSideBarOpen} className="lg:block hidden">
                <div className="flex justify-end">
                <SidebarTrigger onClick={() => setSideBarOpen(!sidebarOpen)} className="bg-gray-800 md:hidden text-white p-5">
                </SidebarTrigger>
                </div>
                <SidebarContent  className="bg-gray-50 text-black w-64 p-5">
                    {/* header */}
                    <SidebarHeader className="rounded-md bg-white shadow-md text-black">
                    <Link to='/' className="flex gap-2 font-bebasNeue  text-3xl font-semibold items-center"><img className='w-12' src={logo} alt="" /><span className='tracking-wide'>SwiftParcel</span></Link>
                    </SidebarHeader>
                    <div className="divider mb-0"></div>
                    <div className="flex flex-col justify-between h-screen">
                        <div className="space-y-2">
                           <NavLink to='/dashboard/bookParcel' className="block px-3 py-2 rounded-md bg-slate-200">Book Parcel</NavLink>
                           <NavLink to="/dashboard/myParcel" className="block px-3 py-2 rounded-md bg-slate-200">My Parcel</NavLink>
                        </div>
                    {/* footer */}
                    <NavLink to='/dashboard/myProfile' className="bg-slate-200 block px-3 py-2 rounded-md">My Profile</NavLink>
                    </div>

                </SidebarContent>
            </Sidebar>
            <div className="p-2">
                <button onClick={() => setSideBarOpen(!sidebarOpen)} className="lg:hidden p-2 w-14"><GoSidebarExpand className="text-4xl"></GoSidebarExpand></button>
                <h2>I am habib</h2>
            </div>
        </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;