import React from "react";
import useWallet from "@/context/UseWallet";
import { Link, useResolvedPath } from "react-router-dom";
import {
  Album,
  Ambulance,
  ClipboardPlus,
  FileClock,
  LayoutGrid,
  LayoutPanelLeft,
  LibraryBig,
  Link2,
  LogOut,
  Newspaper,
  Settings,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { UserButton } from "../UserButton";

const navLinks = {
  0: [
    {
      to: "/register",
      label: "Register",
      icon: <UserRound size={20} strokeWidth={2} />,
    },
  ],
  1: [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutPanelLeft size={20} strokeWidth={2} />,
    },
    {
      to: "/patient/bookAppointment",
      label: "Book Appointment",
      icon: <ClipboardPlus size={20} strokeWidth={2} />,
    },
    {
      to: "/patient/allAppointments",
      label: "All Appointments",
      icon: <FileClock size={20} strokeWidth={2} />,
    },
    {
      to: "/patient/allRecords",
      label: "All Records",
      icon: <LibraryBig size={20} strokeWidth={2} />,
    },
    {
      to: "/patient/allEmergencyRecords",
      label: "Emergency Records",
      icon: <Ambulance size={20} strokeWidth={2} />,
    },
  ],
  2: [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutGrid size={20} strokeWidth={2} />,
    },
    {
      to: "/doctor/viewAppointments",
      label: "View Appointments",
      icon: <Newspaper size={20} strokeWidth={2} />,
    },
  ],
};

const profileLinks = [
  {
    to: "/settings",
    label: "Settings",
    icon: <Settings size={20} strokeWidth={2} />,
  },
];

export const Sidebar = () => {
  const { role } = useWallet();
  const pathname = useResolvedPath().pathname;

  return (
    <aside className="flex flex-col justify-between items-center w-1/5 py-10 overflow-y-auto">
      <div className="flex flex-col gap-14 items-center w-9/12 h-full">
        <Link className="text-2xl font-semibold leading-none" to="dashboard">
          MediBlock
        </Link>
        <div className="space-y-5 w-full">
          <ul className="flex flex-col gap-1 w-full">
            {navLinks[role].map((nav, i) => {
              const isActive = pathname === nav.to || pathname.includes(nav.to);
              return (
                <li
                  key={i}
                  className={cn(
                    "text-zinc-400 rounded-lg transition",
                    isActive && "text-white font-medium bg-blue-500",
                    !isActive && "hover:bg-zinc-100 hover:text-zinc-500"
                  )}
                >
                  <Link
                    to={nav.to}
                    className="flex items-center gap-3 text-sm px-5 py-4"
                  >
                    {nav.icon}
                    {nav.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {role !== 0 && (
        <div className="w-9/12">
          <ul className="flex flex-col gap-1 w-full">
            {profileLinks.map((nav, i) => {
              const isActive = pathname === nav.to || pathname.includes(nav.to);
              return (
                <li
                  key={i}
                  className={cn(
                    "text-zinc-400 rounded-lg transition",
                    isActive && "text-white font-medium bg-blue-500",
                    !isActive && "hover:bg-zinc-100 hover:text-zinc-500"
                  )}
                >
                  <Link
                    to={nav.to}
                    className="flex items-center gap-3 text-sm px-5 py-4"
                  >
                    {nav.icon}
                    {nav.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Button
                variant="ghost"
                className="flex justify-start gap-3 text-sm px-5 py-4 w-full text-zinc-400 h-max hover:bg-zinc-100 hover:text-zinc-500"
                size="lg"
              >
                <LogOut size={20} /> Logout
              </Button>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};
