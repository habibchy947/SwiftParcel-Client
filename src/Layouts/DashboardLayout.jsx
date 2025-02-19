
import { GoSidebarExpand } from "react-icons/go";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/favicon.png'
import parcel from '../assets/dashboard/package.png'
import { SiBookstack } from "react-icons/si";
import { FaRegUser } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { MdOutlineReviews } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { TbBrandDeliveroo } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { FaPersonBiking } from "react-icons/fa6";

import useRole from "@/Hooks/useRole";
import useAuth from "@/Hooks/useAuth";
import Loading from "@/components/ui/Loading";
const DashboardLayout = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false)
    const toggleDrawer = () => {
        setSideBarOpen(!sidebarOpen)
    }
    const {user, loading } = useAuth()
    const [role, isLoading] = useRole()

    if (loading || isLoading) {
        return <Loading />
    }
    return (
        <div className="">
            <div aria-label="close-sidebar" onClick={toggleDrawer} className={`fixed inset-0 z-40 bg-black transition-all duration-300 ${sidebarOpen ? 'opacity-50 visible' : 'opacity-0 invisible'}`}>
            </div>
            <div className={`fixed  top-0 z-50 left-0 w-68 p-4 h-full text-black shadow-lg bg-gray-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
                <button onClick={toggleDrawer} className="lg:hidden text-black ">close</button>
                <div className="rounded-md bg-white shadow-md text-black p-2">
                    <Link to='/' className="flex gap-2 font-bebasNeue  text-3xl font-semibold items-center"><img className='w-12' src={logo} alt="" /><span className='tracking-wide'>SwiftParcel</span></Link>
                </div>
                <div className="divider mb-0"></div>
                    <div className="space-y-2">
                        {user && role === 'user' && <>
                            <NavLink to='/dashboard/bookParcel' className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><SiBookstack />Book a Parcel</span></NavLink>
                            <NavLink to="/dashboard/myParcel" className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><img className="w-4" src={parcel} alt="" />My Parcel</span></NavLink>
                        </>}
                        {user && role === 'deliveryMen' && <>
                            <NavLink to='/dashboard/myDeliveryList' className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><FaListUl />My Delivery List</span></NavLink>
                            <NavLink to="/dashboard/myReviews" className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><MdOutlineReviews />My Reviews</span></NavLink>
                        </>}
                        {user && role === 'admin' && <>
                            <NavLink to='/dashboard/statistics' className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><FcStatistics />Statistics</span></NavLink>
                            <NavLink to="/dashboard/allParcels" className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><TbBrandDeliveroo />All Parcels</span></NavLink>
                            <NavLink to="/dashboard/allUsers" className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><FaUsers />All Users</span></NavLink>
                            <NavLink to="/dashboard/allDeliveryMen" className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><FaPersonBiking />All Delivery Men</span></NavLink>
                        </>}
                    {/* footer */}
                    {user && role === 'user' && <div>
                        <div className="divider mb-0"></div>
                        <NavLink to='/dashboard/myProfile' className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><FaRegUser />My Profile</span></NavLink>
                        <NavLink to='/' className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive && 'bg-slate-200'}`}><span className="flex items-center gap-4"><IoHomeOutline />Home</span></NavLink>
                    </div>}
                    </div>
            </div>
            {/* main contsan */}
            <div className={`flex-1 p-3 transition-transform duration-300 lg:ml-60 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
                    <button onClick={toggleDrawer}
                        className="p-2 text-black dark:text-white text-lg font-bold rounded-md lg:hidden"
                    >
                        <GoSidebarExpand />
                    </button>
                    {/* main page content */}
                    <div className=" lg:mt-0 min-h-screen">
                        <Outlet></Outlet>
                    </div>
            </div>
        </div>
    );
};

export default DashboardLayout;