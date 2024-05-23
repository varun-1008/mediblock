import Navbar from "@/components/container/Navbar";
import { Sidebar } from "@/components/container/Sidebar";
import useWallet from "@/context/UseWallet";
import Header from "@/ui/Header";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const { role } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 0) {
      navigate("/register");
    }
  }, [role, navigate]);

  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="w-full p-10 bg-[#F6F6F6] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
