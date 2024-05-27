import { useParams } from "react-router-dom";
import { useState } from "react";
import useWallet from "@/context/UseWallet";
import { ipfsUpload } from "@/utils/ipfs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Buffer from "buffer";
import { useNavigate } from "react-router-dom/dist";

function CreateRecord({ type, setType, linkIndex }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const { patientAddress } = useParams();
  const navigate = useNavigate();
  const { signer, contract } = useWallet();

  async function handleFileChange(e) {
    const file = e.target.files[0];
    const value = await file.arrayBuffer();
    const buffer = Buffer.Buffer.from(value);
    const img = buffer.toString("base64");
    setImage(img);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let recordData = {
      content,
      image,
    };

    recordData = JSON.stringify(recordData);

    const ipfsData = await ipfsUpload(recordData);
    const cid = ipfsData.IpfsHash;

    const time = Date.now();
    let tx;

    if (type === "new")
      tx = await contract
        .connect(signer)
        .addRecordNewLink(patientAddress, title, time.toString(), cid);
    else
      tx = await contract
        .connect(signer)
        .addRecordExistingLink(
          patientAddress,
          linkIndex,
          title,
          time.toString(),
          cid
        );
    await tx.wait();

    navigate("/dashboard");
  }

  return (
    <>
      <Dialog open={true} onOpenChange={() => setType(null)}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between">
              <Input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                required
                className="w-max"
              />
              <Button type="submit">Add Record</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateRecord;
