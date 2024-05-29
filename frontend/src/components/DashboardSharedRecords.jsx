import useWallet from "@/context/UseWallet";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { RecordBlock } from "./RecordBlock";

export const DashboardSharedRecords = ({ patient }) => {
  const [records, setRecords] = useState(null);
  const { contract, signer, address } = useWallet();

  const patientAddress = patient.address;

  const getPatientRecords = async () => {
    try {
      const data = [];
      const records = await contract
        .connect(signer)
        .getRecordsWithAccess(patientAddress);

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

        data.push(recordObj);
      }
      setRecords(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientRecords();
  }, []);

  if (!records) {
    return (
      <div className="h-10 w-full flex items-center justify-center">
        <Loader2 size={20} className="animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="w-full flex gap-5 items-center">
      {records.map((record, i) => (
        <RecordBlock key={i} address={address} record={record} />
      ))}
    </div>
  );
};
