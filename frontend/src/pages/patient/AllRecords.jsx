import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import { Records } from "@/ui/Records";

function AllRecords() {
  const [records, setRecords] = useState(null);
  const { signer, contract, address } = useWallet();

  useEffect(() => {
    (async function () {
      const newData = [];

      let records = await contract.connect(signer).getRecords();

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

      setRecords(newData);
    })();
  }, [signer, contract]);

  if (!records) return <h1>Loading</h1>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-base font-medium">All Records</h1>
        <p className="text-zinc-400 text-sm">
          List of all the secured records prescribed by the doctors.
        </p>
      </div>
      <Records address={address} records={records} />
    </div>
  );
}

export default AllRecords;
