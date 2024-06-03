import { useParams } from "react-router-dom";
import { useState } from "react";
import useWallet from "@/context/UseWallet";
import { ipfsUpload } from "@/utils/ipfs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Buffer from "buffer";
import { useNavigate } from "react-router-dom/dist";
import { useModal } from "@/hooks/ModalStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { getPublicKey } from "@/utils/supabase";

function CreateRecord({ createType, linkIndex }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const { patientAddress } = useParams();
  const navigate = useNavigate();
  const { signer, contract, address } = useWallet();

  const { onClose } = useModal();

  async function handleFileChange(e) {
    const file = e.target.files[0];
    const value = await file.arrayBuffer();
    const buffer = Buffer.Buffer.from(value);
    const img = buffer.toString("base64");
    setImage(img);
  }

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let recordData = {
        content,
        image,
      };

      recordData = JSON.stringify(recordData);
      const {key, encryptedData} = await encryptS(recordData);
      const publickey = await getPublicKey(patientAddress)
      const encryptedKey = await encryptA(key, publicKey)
      const ipfsData = await ipfsUpload(recordData);
      const cid = ipfsData.IpfsHash;
      const time = Date.now();
      let tx;
      if (createType === "new")
        tx = await contract
          .connect(signer)
          .addRecordNewLink(patientAddress, title, time.toString(), cid);
      else {
        if (patientAddress) {
          tx = await contract
            .connect(signer)
            .addRecordExistingLink(
              patientAddress,
              linkIndex,
              title,
              time.toString(),
              cid
            );
        } else {
          tx = await contract
            .connect(signer)
            .addRecordExistingLink(
              address,
              linkIndex,
              title,
              time.toString(),
              cid
            );
        }
      }
      await tx.wait();
      toast.success("Record created successfully");
      onClose();
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
            className="w-max cursor-pointer"
          />
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-500/90"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin mr-2" size={15} />}
            Add Record
          </Button>
        </div>
      </form>
    </>
  );
}

export default CreateRecord;
