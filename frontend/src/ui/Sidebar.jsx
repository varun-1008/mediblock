import styled from "styled-components";
import MainNav from "./MainNav";
import useWallet from "../context/UseWallet";
import { useNavigate } from "react-router-dom";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  const { address, contract } = useWallet();
  const navigate = useNavigate();

  async function handleClick() {
    if (!address) return;

    const role = await contract.role(address);
    if (role === 0n) navigate("/register");
    else navigate("/dashboard");
  }

  return (
    <StyledSidebar>
      <p onClick={handleClick}>MediBlock Secure</p>
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
