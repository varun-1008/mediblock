import { useResolvedPath, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useWallet from "@/context/UseWallet";
import { format } from "date-fns";
import Record from "@/ui/Record";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const location = useLocation();
  const { name: patientName } = location.state || {};
  const patientAddress = useResolvedPath().pathname.split("/")[3];
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (contract && patientAddress) {
      fetchEmergencyRecords(contract, patientAddress).then(setRecords);
    }
  }, [contract, patientAddress]);

  return (
    <div className="space-y-10">
      <h1>Emergency Record Details for {patientName || patientAddress}</h1>
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
        <p>No emergency records found for this patient.</p>
      )}
    </div>
  );
}
