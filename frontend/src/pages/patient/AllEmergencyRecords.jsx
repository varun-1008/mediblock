import { useCallback, useEffect, useState } from "react";
import useWallet from "@/context/UseWallet";
import { LoadingState } from "@/components/LoadingState";
import { RecordBlock } from "@/components/RecordBlock";

function AllEmergencyRecords() {
  const [emergencyRecords, setEmergencyRecords] = useState(null);
  const { signer, contract, address } = useWallet();

  const getData = useCallback(async () => {
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
  }, [signer, contract, address]);

  async function handleEmergencyChange() {
    await getData();
  }

  useEffect(() => {
    (async function () {
      getData();
    })();
  }, [getData]);

  if (!emergencyRecords) return <LoadingState />;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Emergency Records</h1>
        <p className="text-sm text-zinc-400">
          List of all the records you&apos;ve marked as an emergency record
        </p>
      </div>
      {emergencyRecords.length === 0 ? (
        <div className="h-44 flex items-center justify-center">
          <p className="text-zinc-400">No emergency records found</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-5 gap-5">
          {emergencyRecords.map((linkRecords) => {
            return linkRecords.map((record, index) => {
              return (
                <RecordBlock key={index} address={address} record={record} />
              );
            });
          })}
        </div>
      )}
    </div>
  );
}

export default AllEmergencyRecords;
