import useWallet from "@/context/UseWallet";
import { useEffect, useState } from "react";
import { Records } from "./Records";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ipfsDownload } from "@/utils/ipfs";
import { ArrowRight, Loader2, Trash2, X } from "lucide-react";

function RevokeAccess({ thinTitle }) {
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
    <div className="rounded-xl px-10 py-8 pb-14 bg-white space-y-5">
      <h1 className="font-medium">Manage Access</h1>
      <Records
        address={address}
        records={records}
        Element={Element}
        elementFunction={handleDialog}
        thinTitle={thinTitle}
      />
      <Dialog open={dialog !== null} onOpenChange={() => setDialog(null)}>
        <DialogContent>
          <div className="space-y-5">
            <h1 className="font-medium">Authorised Doctors</h1>
            {doctors ? (
              doctors.map((doctor, index) => (
                <div
                  key={doctor.name}
                  className="w-full p-2 rounded-lg border flex items-center justify-between"
                >
                  <p className="font-medium">Dr. {doctor.name}</p>
                  <Button
                    variant="destructive"
                    className="font-normal"
                    onClick={() => handleRemoveAccess(doctor.address)}
                  >
                    <X size={15} className="mr-2" />
                    Remove Access
                  </Button>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center h-full items-center">
                <Loader2 className="animate-spin h-4 w-4" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RevokeAccess;

function Element({ linkIndex, elementFunction }) {
  return (
    <>
      <div className="flex items-center select-none">
        <Button
          variant="outline"
          onClick={() => elementFunction(linkIndex)}
          className="flex items-center gap-2 font-normal"
        >
          View Authorised Doctors
          <ArrowRight size={18} />
        </Button>
      </div>
    </>
  );
}
