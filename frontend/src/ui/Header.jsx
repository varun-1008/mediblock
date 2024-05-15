import useWallet from "./../context/UseWallet";

function Header() {
  const { address, getSigner } = useWallet();

  async function handleConnect() {
    await getSigner();
  }

  return (
    <>
      <button onClick={handleConnect}>{address || "Connect"}</button>
    </>
  );
}

export default Header;
