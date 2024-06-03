import useWallet from "@/context/UseWallet";
import { useEffect, useState } from "react";
import { Records } from "./Records";
import { LoadingState } from "@/components/LoadingState";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/ModalStore";

function RevokeAccess({ thinTitle }) {
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

  const onClick = (linkIndex) => {
    onOpen("view-doctors", { linkIndex });
  };

  if (!records) return <LoadingState />;

  return (
    <div
      className={cn(
        "rounded-xl px-10 py-8 bg-white space-y-5",
        records.length > 0 && "pb-14"
      )}
    >
      <h1 className="font-medium">Manage Access</h1>
      {records.length === 0 && (
        <div className="h-32 flex items-center justify-center w-full">
          <p className="text-zinc-400 text-sm">
            You are not sharing any records currently
          </p>
        </div>
      )}
      <Records
        address={address}
        records={records}
        elementFunction={onClick}
        thinTitle={thinTitle}
        type="view-doctors"
      />
    </div>
  );
}

export default RevokeAccess;
