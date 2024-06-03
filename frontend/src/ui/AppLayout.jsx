import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import useWallet from "../context/UseWallet";
import { useEffect } from "react";

function AppLayout() {
  const {role} = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if(role === 0)
      navigate("/register");
  }, [role, navigate]);

  return (
    <div>
      <Header />
      <Sidebar />
      <Main>
          <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
