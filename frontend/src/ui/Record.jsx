import { useCallback, useEffect, useState } from "react";
import { ipfsDownload } from "../utils/ipfs";
import useWallet from "../context/UseWallet";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom/dist";
import { LoadingState } from "@/components/LoadingState";

function Record({ recordData, handleEmergencyChange }) {
  const [record, setRecord] = useState(null);

  const { patientAddress } = useParams();

  const { role, signer, contract } = useWallet();

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

    if (handleEmergencyChange) await handleEmergencyChange();

    await getData();
  }

  const getData = useCallback(async () => {
    const requiredAddress = role === 1 ? address : patientAddress;

    const data = await contract
      .connect(signer)
      .getRecord(requiredAddress, linkIndex, recordIndex);

    let isEmergency;
    if (role === 1)
      isEmergency = await contract
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
    };

    if (role === 1) dataObj["isEmergency"] = isEmergency;

    setRecord(dataObj);
  }, [role, signer, address, contract, linkIndex, patientAddress, recordIndex]);

  useEffect(() => {
    (async function () {
      await getData();
    })();
  }, [getData]);

  if (record === null) return <LoadingState />;

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
        {role === 1 && (
          <Button onClick={handleEmergency} className="w-full bg-destructive">
            {record.isEmergency
              ? "Remove from Emergency Record"
              : "Mark as an Emergency Record"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Record;
