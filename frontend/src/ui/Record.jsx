import { useEffect, useState } from "react";
import { ipfsDownload } from "../utils/ipfs";
import useWallet from "../context/UseWallet";


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
    <>
      <div>
        <h1>{record.title}</h1>
        <p>{record.content}</p>
        {record.image && (
          <img
            src={`data:image/png;base64,${record.image}`}
            width="300px"
          ></img>
        )}
        {
          <button onClick={handleEmergency}>
            {record.isEmergency
              ? "Unmark as emergency record"
              : "mark as emergency record"}
          </button>
        }
      </div>
    </>
  );
}

export default Record;
