import { ActiveAppointments } from "@/components/ActiveAppointments";
import { RecordsShared } from "@/components/RecordsShared";
import { TotalAppointments } from "@/components/TotalAppointments";
import { TotalRecords } from "@/components/TotalRecords";
import useWallet from "@/context/UseWallet";
import RevokeAccess from "@/ui/RevokeAccess";
import { doctorInfoCid } from "@/utils/doctor";
import { decryptGA } from "@/utils/encryption";
import { ipfsDownload } from "@/utils/ipfs";
import { patientInfoCid } from "@/utils/patient";
import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState(null);
  const { role, address, contract, signer } = useWallet();

  useEffect(() => {
    (async function () {
      let infoCid;
      if (role === 1) infoCid = await patientInfoCid({ address, contract });
      if (role === 2) infoCid = await doctorInfoCid({ address, contract });

      if (infoCid) {
        const encryptedInfo = await ipfsDownload(infoCid);

        let data = await decryptGA(encryptedInfo);
        data = JSON.parse(data);

        if (role === 1) {
          data["numberOfRecords"] = Number(
            await contract.connect(signer).getNumberOfRecordsPatient()
          );
          data["numberOfAppointments"] = Number(
            await contract.connect(signer).getNumberOfAppointmentsPatient()
          );
          data["numberOfActiveAppointments"] = Number(
            await contract
              .connect(signer)
              .getNumberOfActiveAppointmentsPatient()
          );
        }

        if (role === 2) {
          data["numberOfRecords"] = Number(
            await contract.connect(signer).getNumberOfRecordsDoctor(address)
          );
          data["numberOfAppointments"] = Number(
            await contract
              .connect(signer)
              .getNumberOfAppointmentsDoctor(address)
          );
          data["numberOfActiveAppointments"] = Number(
            await contract.connect(signer).getNumberOfActiveAppointmentsDoctor()
          );
        }
        setData(data);
      }
    })();
  }, [address, contract, role, signer]);

  return (
    <div className="space-y-10">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-10">
        <TotalRecords data={data} role={role} />
        <TotalAppointments data={data} role={role} />
        <ActiveAppointments data={data} role={role} />
      </div>
      <div className="w-full">
        {role === 1 && <RevokeAccess thinTitle={true} />}
        {role === 2 && <RecordsShared />}
      </div>
    </div>
  );
}

export default Dashboard;
