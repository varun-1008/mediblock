import { UserDetails } from "@/components/UserDetails";
import useWallet from "@/context/UseWallet";
import { doctorInfoCid } from "@/utils/doctor";
import { ipfsDownload } from "@/utils/ipfs";
import { patientInfoCid } from "@/utils/patient";
import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState(null);
  const {role, address, contract} = useWallet();

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
  }, [])

  return (
    <div className="space-y-10">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-5">
        <UserDetails data={data} role={role} />
      </div>
    </div>
  );
}

export default Dashboard;
