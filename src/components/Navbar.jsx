import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/favicon.png'
import { Button } from './ui/button';
const Navbar = () => {
    return (
        <div className="navbar px-20 mx-auto max-w-screen-2xl py-3 drop-shadow-md fixed border-b-4 border-l-4 border-r-4 bg-white  border-red-600">
            <div className="flex-1">
                <Link to='/' className="flex gap-2 font-bebasNeue  text-3xl font-semibold items-center"><img className='w-12' src={logo} alt="" /><span className='tracking-wide'>SwiftParcel</span></Link>
            </div>
            <div className="flex-none gap-2">
                <li className='list-none font-medium text-lg'><NavLink className={({isActive})=> `${isActive && 'text-red-600 underline'}`} to='/'>Home</NavLink></li>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="badge badge-error indicator-item"></span>
                    </div>
                </button>
                <Button className='bg-red-600 font-semibold border-none '>Login</Button>
                {/* <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li> Profile</li>
                        <li><a>Dashboard</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
};

export default Navbar;