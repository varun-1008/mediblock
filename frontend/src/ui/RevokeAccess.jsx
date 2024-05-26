import useWallet from "@/context/UseWallet";
import { useEffect, useState } from "react";
import { Records } from "./Records";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ipfsDownload } from "@/utils/ipfs";

function RevokeAccess() {
  const [records, setRecords] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [dialog, setDialog] = useState(null);
  const { signer, contract, address } = useWallet();

  useEffect(() => {
    (async function () {
      const newData = [];

      let records = await contract.connect(signer).getRecords();

      const titles = records[0];
      const timestamps = records[1];
      const linkIndices = records[2];
      const recordIndices = records[3];
      const length = titles.length;

      for (let i = 0; i < length; ++i) {
        const recordObj = {
          title: titles[i],
          time: timestamps[i],
          linkIndex: linkIndices[i],
          recordIndex: recordIndices[i],
        };

        if (newData[linkIndices[i]] === undefined) newData[linkIndices[i]] = [];
        newData[linkIndices[i]].push(recordObj);
      }

      setRecords(newData);
    })();
  }, [signer, contract]);

  async function getDoctors(linkIndex) {
    const doctorsAddresses = await contract
      .connect(signer)
      .getDoctorListWithLinkAccess(linkIndex);

    let doctorsInfo = [];
    for (const doctorAddress of doctorsAddresses) {
      const doctorCid = await contract
        .connect(signer)
        .getDoctorInfo(doctorAddress);
      const doctorInfo = await ipfsDownload(doctorCid);
      doctorInfo["address"] = doctorAddress;

      doctorsInfo.push(doctorInfo);
    }

    setDoctors(doctorsInfo);
  }

  async function handleDialog(linkIndex) {
    await getDoctors(linkIndex);
    setDialog(linkIndex);
  }

  async function handleRemoveAccess(address) {
    console.log(address);
    const tx = await contract.connect(signer).revokeAccess(dialog, address);
    await tx.wait();

    await getDoctors(dialog);
  }

  if (!records) return <h1>Loading</h1>;

  return (
    <>
      <Records
        address={address}
        records={records}
        Element={Element}
        elementFunction={handleDialog}
      />
      <Dialog open={dialog !== null} onOpenChange={() => setDialog(null)}>
        <DialogContent>
          {doctors ? (
            doctors.map((doctor) => (
              <div key={doctor.name}>
                <p>{doctor.name}</p>
                <Button onClick={() => handleRemoveAccess(doctor.address)}>
                  Remove Access
                </Button>
              </div>
            ))
          ) : (
            <h1>Loading</h1>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RevokeAccess;

function Element({ linkIndex, elementFunction }) {
  return (
    <>
      <div className="flex items-center gap-2 select-none">
        <Button onClick={() => elementFunction(linkIndex)}>View Access</Button>
      </div>
    </>
  );
}
