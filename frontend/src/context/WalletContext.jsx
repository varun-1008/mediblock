import { createContext, useCallback, useMemo, useState } from "react";
import { ethers } from "ethers";

import abi from "./../../constants/abi.json";
import contractAddresses from "./../../constants/contractAddresses.json";
import { getRole } from "../utils/getRole";

const WalletContext = createContext();

function WalletProvider({ children }) {
  const [signer, setSigner] = useState(null);
  const [role, setRole] = useState(0);

  const provider = useMemo(
    () => new ethers.BrowserProvider(window.ethereum),
    []
  );
  const contract = useMemo(() => {
    return new ethers.Contract(contractAddresses[31337], abi, provider);
  }, [provider]);

  const isConnected = signer === undefined || signer === null ? false : true;
  const address = signer?.address || null;

  const getSigner = useCallback(async () => {
    try {
      const metamaskSigner = await provider.getSigner();
      if (metamaskSigner) {
        const newRole = await getRole({address: metamaskSigner.address, contract});
        setRole(Number(newRole));
        setSigner(metamaskSigner);
      }
      else setSigner(null);
    } catch (err) {
      setSigner(null);
      throw new Error(err.message);
    }
  }, [provider, contract]);

  const valueObj = {
    // statess
    signer,
    role,

    //derived states
    provider,
    contract,
    isConnected,
    address,

    // functions
    getSigner,
    setRole,
  };

  return (
    <WalletContext.Provider value={valueObj}>{children}</WalletContext.Provider>
  );
}

export default WalletProvider;
export { WalletContext };
