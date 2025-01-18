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
    const { user , logOut} = useAuth()
    const [role] = useRole()
    // if(isLoading) {
    //     return <Loading></Loading>
    // }
    return (
        <div className="flex w-full  items-center md:px-14 mx-auto max-w-screen-2xl py-3 drop-shadow-md fixed border-b-4 border-l-4 border-r-4 bg-white  border-red-600">
            <div className="flex-1">
                <Link to='/' className="flex gap-2 font-bebasNeue  text-3xl font-semibold items-center"><img className='w-12' src={logo} alt="" /><span className='tracking-wide'>SwiftParcel</span></Link>
            </div>
            <div className="flex items-center gap-3">
                <li className='list-none font-medium text-lg'><NavLink className={({ isActive }) => `${isActive && 'text-red-600 underline'}`} to='/'>Home</NavLink></li>
                <button className="border-2 p-1 text-2xl rounded-full">
                    <IoMdNotificationsOutline />
                </button>
                {
                    user && user?.email ?
                        <>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Avatar>
                                            <AvatarImage className="object-cover" referrer-policy="no-referrer" src={user?.photoURL} alt="user-profile" />
                                        </Avatar>
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


