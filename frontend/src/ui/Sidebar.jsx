
import MainNav from "./MainNav";
import useWallet from "../context/UseWallet";
import { useNavigate } from "react-router-dom";


function Sidebar() {
  const { address, contract } = useWallet();
  const navigate = useNavigate();

  async function handleClick() {
    if (!address) return;

    const role = await contract.role(address);
    if (role === 0) navigate("/register");
    else navigate("/dashboard");
  }

  return (
    <div>
      <p onClick={handleClick}>MediBlock Secure</p>
      <MainNav />
    </div>
  );
}

export default Sidebar;
