import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWallet from "../../context/UseWallet";
import { Records } from "../../ui/Records";
import { Button } from "@/components/ui/button";

export default function ViewAppointment() {
  const { patientAddress } = useParams();
  const navigate = useNavigate();

  const [records, setRecords] = useState(null);
  const { signer, contract, address } = useWallet();

  function handleCreateNewRecord() {
    navigate(`/doctor/create/${patientAddress}?type=new`);
  }

  useEffect(() => {
    (async function () {
      const newData = [];

      let records = await contract
        .connect(signer)
        .getRecordsWithAccess(patientAddress);

      console.log(records);

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

  if (records === null) return <h1>Loading</h1>;

  return (
    <>
      <h1>View Appointment</h1>
      <Button onClick={handleCreateNewRecord}>Create a new record</Button>

      <Records
        address={address}
        records={records}
        // buttonFunction={handleSelect}
      />
    </>
  );
}
