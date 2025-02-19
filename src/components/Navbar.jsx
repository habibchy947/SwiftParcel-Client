import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/favicon.png'
import { Button } from './ui/button';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from '@/Hooks/useAuth';
import { Avatar, AvatarImage } from './ui/avatar';
import useRole from '@/Hooks/useRole';

const Navbar = () => {
    const { user, logOut } = useAuth()
    const [role] = useRole()
    // if(isLoading) {
    //     return <Loading></Loading>
    // }
    // theme
    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    const themeCheck = () => {
        if (userTheme === "dark" || (!userTheme && systemTheme)) {
            document.documentElement.classList.add("dark")
            return
        }
    }
    const themeSwitch = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
            return
        }
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
    }
    themeCheck()

    const links = <>
        <li><NavLink className={({ isActive }) => `text-lg ${isActive && 'text-red-600 font-bold'}`} to='/'>Home</NavLink></li>
        <li><NavLink className={({ isActive }) => `text-lg ${isActive && 'text-red-600 font-bold'}`} to='/support'>Contact</NavLink></li>
        <li><NavLink className={({ isActive }) => `text-lg ${isActive && 'text-red-600 font-bold'}`} to='/team'>Team</NavLink></li>
    </>
    return (
        // <div className="flex w-full  items-center px-3 md:px-14 mx-auto max-w-screen-2xl py-3 drop-shadow-md fixed z-20 border-b-4 border-l-4 border-r-4 bg-white  border-red-600">
        //     <div className="flex-1">
        //         <Link to='/' className="flex gap-2 font-bebasNeue  text-3xl font-semibold items-center"><img className='w-12' src={logo} alt="" /><span className='tracking-wide'>SwiftParcel</span></Link>
        //     </div>
        //     <div className="flex items-center gap-3">
        //         <li className='list-none font-medium text-lg'><NavLink className={({ isActive }) => `${isActive && 'text-red-600 underline'}`} to='/'>Home</NavLink></li>
        //         <button className="border-2 p-1 text-2xl rounded-full">
        //             <IoMdNotificationsOutline />
        //         </button>
        //         {
        //             user && user?.email ?
        //                 <>
        //                     <div>
        //                         <DropdownMenu>
        //                             <DropdownMenuTrigger asChild>
        //                                     <img className="object-cover h-10 w-10 rounded-full" referrer-policy="no-referrer" src={user?.photoURL} alt="user-profile" />
        //                             </DropdownMenuTrigger>
        //                             <DropdownMenuContent className="w-44 mr-5 md:mr-14">
        //                                 <DropdownMenuLabel className="flex justify-between">{user?.displayName}<FaRegUser /></DropdownMenuLabel>
        //                                 <DropdownMenuSeparator />
        //                                 <DropdownMenuGroup>
        //                                     <DropdownMenuItem>
        //                                         {user && role === 'user' && <Link to='/dashboard/myParcel'>Dashboard</Link>}
        //                                         {user && role === 'deliveryMen' && <Link to='/dashboard/myDeliveryList'>Dashboard</Link>}
        //                                         {user && role === 'admin' && <Link to='/dashboard/statistics'>Dashboard</Link>}
        //                                         <DropdownMenuShortcut><MdOutlineDashboard /></DropdownMenuShortcut>
        //                                     </DropdownMenuItem>
        //                                     <DropdownMenuItem onClick={logOut}>
        //                                         Logout
        //                                         <DropdownMenuShortcut><IoLogOutOutline /></DropdownMenuShortcut>
        //                                     </DropdownMenuItem>
        //                                 </DropdownMenuGroup>
        //                             </DropdownMenuContent>
        //                         </DropdownMenu>
        //                     </div>
        //                 </>
        //                 :
        //                 <>
        //                     <Button className='bg-red-600 font-semibold border-none '><Link to='/login'>Login</Link></Button>
        //                 </>
        //         }
        //     </div>
        // </div>
        <div className="navbar w-full px-3 md:px-14 mx-auto max-w-screen-2xl py-3 drop-shadow-md fixed z-20 border-b-4 border-l-4 border-r-4 bg-white dark:bg-neutral  border-red-600 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to='/' className="flex gap-2 font-bebasNeue  text-3xl font-semibold items-center"><img className='w-12' src={logo} alt="" /><span className='tracking-wide'>SwiftParcel</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-3 items-center">
                {/* theme controller */}
                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" className="theme-controller" value="synthwave" />

                    {/* sun icon */}
                    <svg
                        className="swap-off h-9 w-9 fill-current"
                        onClick={() => themeSwitch()}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        className="swap-on h-9 w-9 fill-current"
                        onClick={() => themeSwitch()}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
            {
                    user && user?.email ?
                        <>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                            <img className="object-cover cursor-pointer border border-red-500 h-11 w-11 rounded-full" referrer-policy="no-referrer" src={user?.photoURL} alt="user-profile" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-44 mr-5 md:mr-14">
                                        <DropdownMenuLabel className="flex justify-between">{user?.displayName}<FaRegUser /></DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                {user && role === 'user' && <Link to='/dashboard/myParcel'>Dashboard</Link>}
                                                {user && role === 'deliveryMen' && <Link to='/dashboard/myDeliveryList'>Dashboard</Link>}
                                                {user && role === 'admin' && <Link to='/dashboard/statistics'>Dashboard</Link>}
                                                <DropdownMenuShortcut><MdOutlineDashboard /></DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={logOut}>
                                                Logout
                                                <DropdownMenuShortcut><IoLogOutOutline /></DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </>
                        :
                        <>
                            <Button className='bg-red-600 font-semibold border-none '><Link to='/login'>Login</Link></Button>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;


