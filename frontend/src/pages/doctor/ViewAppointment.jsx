import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWallet from "../../context/UseWallet";
import { Records } from "../../ui/Records";
import { Button } from "@/components/ui/button";
import CreateRecord from "./CreateRecord";
import { Plus, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { LoadingState } from "@/components/LoadingState";

export default function ViewAppointment() {
  const [records, setRecords] = useState(null);
  const [type, setType] = useState(null);
  const [linkIndex, setLinkIndex] = useState(null);

  const { signer, contract, address } = useWallet();
  const { patientAddress } = useParams();
  const patientName = new URLSearchParams(window.location.search).get("name");

  useEffect(() => {
    (async function () {
      const newData = [];

      let records = await contract
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
          linkIndex: Number(linkIndices[i]),
          recordIndex: Number(recordIndices[i]),
        };

        if (newData[linkIndices[i]] === undefined) newData[linkIndices[i]] = [];
        newData[linkIndices[i]].push(recordObj);
      }

      setRecords(newData);
    })();
  }, [patientAddress, signer, contract]);

  function handleSelect(linkIndex) {
    setType("existing");
    setLinkIndex(linkIndex);
  }

  if (records === null) return <LoadingState />;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">View Appointment</h1>
        <p className="text-zinc-400 text-sm">
          View appointment for {patientName}
        </p>
      </div>
      <Button
        onClick={() => setType("new")}
        className="bg-blue-500 flex items-center gap-2 font-normal"
      >
        <PlusCircle size={18} strokeWidth={1.5} />
        New Record Link
      </Button>
      <div className="w-full">
        <Records
          address={address}
          records={records}
          Element={Element}
          elementFunction={handleSelect}
        />
      </div>

      {type && (
        <CreateRecord type={type} setType={setType} linkIndex={linkIndex} />
      )}
    </div>
  );
}

function Element({ isSelected, linkIndex, elementFunction }) {
  return (
    <>
      <div className="flex items-center gap-2 select-none">
        <Button
          onClick={() => elementFunction(linkIndex)}
          className="font-normal flex items-center gap-2"
          variant="outline"
        >
          {/* {isSelected ? <Plus /> : <Plus />} */}
          <PlusCircle size={18} strokeWidth={1.5} />
          New Record to this Link
        </Button>
      </div>
    </>
  );
}
