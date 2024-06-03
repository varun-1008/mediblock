import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useWallet from "@/context/UseWallet";

import Record from "@/ui/Record";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoBackButton } from "@/components/GoBackButton";
import { RecordBlock } from "@/components/RecordBlock";

const fetchEmergencyRecords = async (contract, patientAddress) => {
  try {
    const [titles, dates, linkIndices, recordIndices] =
      await contract.getEmergencyRecords(patientAddress);
    return titles.map((title, index) => ({
      title,
      date: dates[index],
      linkIndex: linkIndices[index],
      recordIndex: recordIndices[index],
    }));
  } catch (error) {
    console.error("Error fetching emergency records:", error);
    return [];
  }
};

export default function EmergencyRecordDetails() {
  const { contract } = useWallet();
  const { patientAddress } = useParams();
  const patientName = new URLSearchParams(window.location.search).get("name");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (contract && patientAddress) {
      fetchEmergencyRecords(contract, patientAddress).then(setRecords);
    }
  }, [contract, patientAddress]);

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <GoBackButton />
        <div>
          <h1 className="font-medium">Emergency Record Details</h1>
          <p className="text-zinc-400 text-sm">
            Emergency record details for {patientName}
          </p>
        </div>
      </div>
      {records.length > 0 ? (
        <ul className="grid grid-cols-5 gap-5">
          {records.map((record, index) => (
            <RecordBlock record={record} key={index} />
          ))}
        </ul>
      ) : (
        <div className="h-44 flex items-center justify-center">
          <p className="text-zinc-400">
            No emergency records found for this patient.
          </p>
        </div>
      )}
    </div>
  );
}
