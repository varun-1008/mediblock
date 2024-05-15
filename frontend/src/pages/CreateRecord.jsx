import { useParams } from "react-router-dom";
import { useState } from "react";
import Buffer from "buffer";
import useWallet from "../context/UseWallet";
import { ipfsUpload } from "../utils/ipfs";

function CreateRecord() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const {signer, contract} = useWallet();
  const { patientAddress } = useParams();
//   let [searchParams] = useSearchParams();

  async function handleSubmit(e) {
    e.preventDefault();

    let recordData = {
        content,
        image,
    }

    recordData = JSON.stringify(recordData);

    const ipfsData = await ipfsUpload(recordData);
    const cid = ipfsData.IpfsHash;
    
    const time = new Date().getTime();
    const tx = await contract.connect(signer).addRecordNewLink(patientAddress, title, time.toString(), cid);
    await tx.wait();

  }

  return (
    <>
      <h1>Create Record</h1>
      <p>{patientAddress}</p>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files[0];
            const value = await file.arrayBuffer();
            const buffer = Buffer.Buffer.from(value);
            const img = buffer.toString("base64");
            setImage(img);
          }}
        />
        {image && (
            <img
              src={`data:image/png;base64,${image}`}
              width="300px"
            ></img>
        )}

        <button>Submit</button>
      </form>
    </>
  );
}

export default CreateRecord;
