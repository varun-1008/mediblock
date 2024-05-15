import { useContext } from "react";
import { WalletContext } from "./WalletContext";

function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined)
    throw new Error("WalletContext was used outside of WalletContextProvider");
  return context;
}

export default useWallet;
