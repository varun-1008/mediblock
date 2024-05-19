
import { Sidebar } from "@/components/container/Sidebar";
import useWallet from "@/context/UseWallet";
import Header from "@/ui/Header";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
    const {role} = useWallet();
    const navigate = useNavigate();

    useEffect(() => {
        if(role === 0) {
            navigate("/register")
        }
    }, [role, navigate])

    return (    
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 h-full px-20 py-10 ">
                <Outlet />
            </div>
        </div>       
    )
}