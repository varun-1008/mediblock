import { LoadingState } from "@/components/LoadingState";
import { UserDetails } from "@/components/UserDetails";
import useWallet from "@/context/UseWallet";
import { doctorInfoCid } from "@/utils/doctor";
import { decryptGA } from "@/utils/encryption";
import { ipfsDownload } from "@/utils/ipfs";
import { patientInfoCid } from "@/utils/patient";
import { useEffect, useState } from "react";

function ProfilePage() {
  const [data, setData] = useState(null);
  const { role, address, contract } = useWallet();

  useEffect(() => {
    (async function () {
      let cid;
      if (role === 1)
        cid = await patientInfoCid({ address, contract });
      if (role === 2)
        cid = await doctorInfoCid({ address, contract });

      const encryptedInfo = await ipfsDownload(cid);

      let info = await decryptGA(encryptedInfo);
      info = JSON.parse(info);

      setData(info);
    })();
  }, [address, contract, role]);

  if (!data) return <LoadingState />;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Profile</h1>
        <p className="text-sm text-zinc-400">Find your account details here</p>
      </div>
      <div className="max-w-2xl p-5 rounded-xl h-max bg-white grid grid-cols-2 gap-x-14 gap-y-5 text-sm">
        <UserDetails data={data} role={role} />
      </div>
    </div>
  );
}

export default ProfilePage;
