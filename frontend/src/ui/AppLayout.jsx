import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

import styled from "styled-components";
import Sidebar from "./Sidebar";
import useWallet from "../context/UseWallet";
import { useEffect } from "react";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
`;

function AppLayout() {
  const {role} = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if(role === 0)
      navigate("/register");
  }, [role, navigate]);

  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
          <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
