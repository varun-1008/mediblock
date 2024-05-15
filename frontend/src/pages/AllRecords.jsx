import { useEffect, useState } from "react";
import useWallet from "../context/UseWallet";
import Records from "../ui/Records";

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
    <>
      <h1>All Records</h1>

      <Records recordsInfo={{address, records}}/>
    </>
  );
}

export default AllRecords;
