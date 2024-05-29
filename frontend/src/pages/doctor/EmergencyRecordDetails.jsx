import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useWallet from "@/context/UseWallet";

import Record from "@/ui/Record";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoBackButton } from "@/components/GoBackButton";

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
        <ul className="flex flex-wrap gap-4 w-max">
          {records.map((record, index) => (
            <div
              key={index}
              className="border select-none bg-white rounded-lg overflow-hidden"
            >
              <div className="px-5 py-4 border-b w-full flex items-center justify-center">
                <p className="font-medium leading-none w-max">{record.title}</p>
              </div>
              <div className="flex w-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full rounded-none bg-blue-500 hover:bg-blue-500/90 h-max p-3">
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <div className="">
                      <h1 className="font-medium">Record Details</h1>
                      <p className="text-sm text-zinc-400">
                        Details of the selected record
                      </p>
                    </div>
                    <Record recordData={{ patientAddress, ...record }} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
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
