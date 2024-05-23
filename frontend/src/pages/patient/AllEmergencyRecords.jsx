import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import Modal from "../../ui/Modal";
import Record from "../../ui/Record";

function AllEmergencyRecords() {
  const [emergencyRecords, setEmergencyRecords] = useState(null);
  const [selected, setSeleted] = useState(null);
  const { signer, contract, address } = useWallet();

  function onClose() {
    setSeleted(null);
  }

  useEffect(() => {
    (async function () {
      const newData = [];

      let records = await contract.connect(signer).getEmergencyRecords(address);

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
      setEmergencyRecords(newData);
    })();
  }, [emergencyRecords, signer, contract]);
  if (!emergencyRecords) return <h1>Loading</h1>;
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Emergency Records</h1>
        {emergencyRecords.length === 0 ? (
          <p className="text-zinc-400 text-sm">
            No records are marked as emergency record
          </p>
        ) : (
          <p className="text-sm text-zinc-400">
            List of all the records you've marked as emergency record
          </p>
        )}
      </div>

      {emergencyRecords.map((linkRecords) => {
        return linkRecords.map((record) => {
          return (
            <div key={record.time} onClick={() => setSeleted(record)}>
              <p>{record.title}</p>
            </div>
          );
        });
      })}

      {selected && (
        <Modal onClose={onClose}>
          <Record recordData={{ address, ...selected }} />
        </Modal>
      )}
    </div>
  );
}

export default AllEmergencyRecords;
