import Navbar from "@/components/container/Navbar";
import { Sidebar } from "@/components/container/Sidebar";
import useWallet from "@/context/UseWallet";
import { ModalProvider } from "@/providers/ModalProvider";
import Header from "@/ui/Header";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
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
    <div className="flex h-screen">
      <ModalProvider />
      <Sidebar />
      <div className="flex-1 overflow-y-auto h-screen">
        <Navbar />
        <div className="p-10 bg-[#F6F6F6] h-full">
          <Outlet />
        </div>
      </div>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </div>
  );
}
