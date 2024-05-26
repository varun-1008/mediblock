import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWallet from "../../context/UseWallet";
import { Records } from "../../ui/Records";
import { Button } from "@/components/ui/button";
import CreateRecord from "./CreateRecord";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ViewAppointment() {
  const [records, setRecords] = useState(null);
  const [type, setType] = useState(null);
  const [linkIndex, setLinkIndex] = useState(null);

  const { signer, contract, address } = useWallet();
  const { patientAddress } = useParams();

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

      console.log(newData);
      setRecords(newData);
    })();
  }, [patientAddress, signer, contract]);

  function handleSelect(linkIndex) {
    setType('existing');
    setLinkIndex(linkIndex);
  }

  if (records === null) return <h1>Loading</h1>;

  return (
    <>
      <h1>View Appointment</h1>
      <Button onClick={() => setType("new")}>Create a new record</Button>

      <Records
        address={address}
        records={records}
        Element={Element}
        elementFunction={handleSelect}
      />

      {type && <CreateRecord type={type} setType={setType} linkIndex={linkIndex} />}
    </>
  );
}

function Element({ isSelected, linkIndex, elementFunction }) {
  return (
    <>
      <div className="flex items-center gap-2 select-none">
        <Button onClick={() => elementFunction(linkIndex)}>
          {isSelected ? <Plus /> : <Plus />}
        </Button>
        <Label className="flex items-center gap-2">Create record</Label>
      </div>
    </>
  );
}
