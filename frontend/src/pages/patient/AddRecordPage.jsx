import { LoadingState } from "@/components/LoadingState";
import useWallet from "@/context/UseWallet";
import { useModal } from "@/hooks/ModalStore";
import { Records } from "@/ui/Records";
import { useEffect, useState } from "react";

function AddRecordPage() {
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

  const { onOpen } = useModal();

  function elementFunction(linkIndex) {
    linkIndex = parseInt(linkIndex);
    onOpen("create-record", { createType: "existing", linkIndex: linkIndex });
  }

  if (!records) return <LoadingState />;
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Add a Record</h1>
        <p className="text-sm text-zinc-400">
          Add a record in an existing link as a patient
        </p>
      </div>
      {records.length === 0 && (
        <div className="h-40 flex items-center justify-center">
          <span className="text-zinc-400">No records found</span>
        </div>
      )}
      <Records
        address={address}
        records={records}
        type="create-record"
        elementFunction={elementFunction}
      />
    </div>
  );
}

export default AddRecordPage;
