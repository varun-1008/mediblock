import { GoBackButton } from "@/components/GoBackButton";
import { LoadingState } from "@/components/LoadingState";
import { RecordBlock } from "@/components/RecordBlock";
import useWallet from "@/context/UseWallet";
import { Records } from "@/ui/Records";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PatientSharedRecords() {
  const { patientAddress } = useParams();
  const patientName = new URLSearchParams(window.location.search).get("name");

  const [records, setRecords] = useState(null);
  const { contract, signer, address } = useWallet();

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

        if (data[linkIndices[i]] === undefined) data[linkIndices[i]] = [];
        data[linkIndices[i]].push(recordObj);
      }
      setRecords(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientRecords();
  }, []);

  if (!records) return <LoadingState />;

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <GoBackButton />
        <div>
          <h1 className="font-medium">Shared Record Details</h1>
          <p className="text-sm text-zinc-400">
            The shared record details of {patientName}
          </p>
        </div>
      </div>
      {/* <div className="w-full grid grid-cols-5 gap-10">
        {records.map((record, index) => (
          <RecordBlock key={index} address={address} record={record} />
        ))}
      </div> */}
      <Records records={records} address={address} />
    </div>
  );
}

export default PatientSharedRecords;
