import React from 'react'
import useWallet from '@/context/UseWallet';
import { Link, useResolvedPath } from 'react-router-dom';
import { Album, LayoutGrid, LibraryBig, LogOut, Newspaper, UserRound, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { UserButton } from '../UserButton';

export const Sidebar = () => {
  const { role } = useWallet();
  const pathname = useResolvedPath().pathname
  
   const navLinks = {
    0: [{ to: "/register", label: "Register", icon: <UserRound size={20} strokeWidth={2} />}],
    1: [
      { to: "/dashboard", label: "Dashboard", icon: <LayoutGrid size={20} strokeWidth={2} /> },
      { to: "/patient/bookAppointment", label: "Book appointment", icon: <Album size={20} strokeWidth={2} />},
      { to: "/patient/allAppointments", label: "All Appointments", icon: <Newspaper size={20} strokeWidth={2} />},
      { to: "/patient/allRecords", label: "All Records", icon: <LibraryBig size={20} strokeWidth={2} />},
      { to: "/patient/allEmergencyRecords", label: "All Emergency Records", icon: <Zap size={20} strokeWidth={2} />},
    ],
    2: [
      { to: "/dashboard", label: "Dashboard", icon: <LayoutGrid size={20} strokeWidth={2} />},
      { to: "/doctor/viewAppointments", label: "View Appointments", icon: <Newspaper size={20} strokeWidth={2} />},
    ],
  };
  return (
    <aside className="flex flex-col justify-between bg-[#333333] w-1/5 py-10">
        <div className='flex flex-col gap-10 items-center text-white'>
            <Link className='text-xl font-bold' to="dashboard">
                Mediblock
            </Link>
            <ul className='flex flex-col gap-3 w-full'>
                {navLinks[role].map((nav, i) => {
                    return  (
                        <li key={i} className={cn('text-zinc-400 border-l-4 border-transparent font-light', pathname === nav.to && "text-white border-l-4 border-blue-300 font-medium")}>
                            <Link to={nav.to} className='flex items-center gap-5 text-sm pl-12 py-3'>
                                {nav.icon}
                                {nav.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
        {role !== 0 && (     
            <UserButton />
        )}
    </aside>
  )
}
