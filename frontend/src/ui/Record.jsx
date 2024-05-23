import { useEffect, useState } from "react";
import { ipfsDownload } from "../utils/ipfs";
import useWallet from "../context/UseWallet";
import { Button } from "@/components/ui/button";

function Record({ recordData }) {
  const [record, setRecord] = useState(null);

  const { signer, contract } = useWallet();

  const { address, linkIndex, recordIndex } = recordData;

  async function handleEmergency() {
    let tx;
    if (record.isEmergency)
      tx = await contract
        .connect(signer)
        .removeEmergencyRecord(linkIndex, recordIndex);
    else
      tx = await contract
        .connect(signer)
        .addEmergencyRecord(linkIndex, recordIndex);

    await tx.wait();

    setRecord(null);
  }

  useEffect(() => {
    (async function () {
      const data = await contract
        .connect(signer)
        .getRecord(address, linkIndex, recordIndex);

      const isEmergency = await contract
        .connect(signer)
        .isEmergencyRecord(linkIndex, recordIndex);

      const title = data[0];
      const time = data[1];
      const cid = data[2];

      const { content, image } = await ipfsDownload(cid);

      const dataObj = {
        title,
        time,
        content,
        image,
        isEmergency,
      };

      record;

      setRecord(dataObj);
    })();
  }, []);

  if (record === null) return <h1>Loading</h1>;

  return (
    <div>
      <div className="space-y-2 text-sm">
        <h1 className="font-medium text-base">{record.title}</h1>
        <div className="space-y-0">
          <p className="italic">Notes:</p>
          <p>{record.content}</p>
        </div>
        {record.image && (
          <img src={`data:image/png;base64,${record.image}`}></img>
        )}
        {
          <Button onClick={handleEmergency} className="w-full bg-destructive">
            {record.isEmergency
              ? "Remove from Emergency Record"
              : "Mark as an Emergency Record"}
          </Button>
        }
      </div>
    </div>
  );
}

export default Record;
