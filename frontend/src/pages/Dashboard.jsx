import { useEffect, useState } from "react";
import useWallet from "../context/UseWallet";
import { ipfsDownload } from "../utils/ipfs";
import { patientInfoCid } from "../utils/patient";
import { doctorInfoCid } from "../utils/doctor";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const { role, address, contract } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      let infoCid;
      if (role === 1) infoCid = await patientInfoCid({ address, contract });
      if (role === 2) infoCid = await doctorInfoCid({ address, contract });

      if (infoCid) {
        const data = await ipfsDownload(infoCid);
        setData(data);
      }
    })();
  }, [role, address, contract, navigate]);

  if (data === null) return <h1>Loading</h1>;

  return (
    <>
      <h1>Dashboard</h1>
      {Object.entries(data).map(([key, value]) => {
        return (
          <div key={key}>
            <p>{key}</p>
            <p>{value}</p>
          </div>
        );
      })}
    </>
  );
}

export default Dashboard;
