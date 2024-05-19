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
  Newspaper,
  SquareLibrary,
  UserRound,
  Zap,
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
      label: "All Emergency Records",
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

export const Sidebar = () => {
  const { role } = useWallet();
  const pathname = useResolvedPath().pathname;

  const { getSigner } = useWallet();

  async function handleConnect() {
    await getSigner();
  }

  return (
    <aside className="flex flex-col justify-between bg-neutral-800 w-1/5 py-10">
      <div className="flex flex-col gap-10 items-center text-white">
        <Link className="text-xl font-bold" to="dashboard">
          Mediblock
        </Link>
        <ul className="flex flex-col gap-3 w-full">
          {navLinks[role].map((nav, i) => {
            return (
              <li
                key={i}
                className={cn(
                  "text-zinc-400 border-l-4 border-transparent font-light",
                  pathname === nav.to &&
                    "text-white border-l-4 border-blue-400 font-medium"
                )}
              >
                <Link
                  to={nav.to}
                  className="flex items-center gap-5 text-sm pl-12 py-3"
                >
                  {nav.icon}
                  {nav.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {role !== 0 ? (
        <UserButton />
      ) : (
        <Button
          onClick={handleConnect}
          className="py-6 w-11/12 mx-auto rounded-xl flex items-center gap-2 text-sm font-medium bg-zinc-900 hover:bg-zinc-950"
        >
            <Link2 size={18} />
          Connect
        </Button>
      )}
    </aside>
  );
};
