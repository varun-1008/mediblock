import { useForm } from "react-hook-form";
import { ipfsUpload } from "../utils/ipfs";
import useWallet from "../context/UseWallet";
import { registerPatient } from "../utils/patient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { addKeyPair } from "@/utils/supabase";

function RegisterPatient() {
  const { signer, contract, setRole, address } = useWallet();
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      let values = getValues();
      values = JSON.stringify(values);

      toast.success("Creating IPFS hash");

      const data = await ipfsUpload(values);
      const cid = data.IpfsHash;

      toast.success("Registering as patient");

      await registerPatient({ cid, signer, contract });
      await addKeyPair(address);
      toast.success("Successfully registered");
      setRole(1);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  function onError() {
    // code
  }

  const [defaultValue, setDefaultValue] = useState(null);

  return (
    <div className="w-full text-sm">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col w-full space-y-5"
      >
        <div className="space-y-2">
          <label>Name</label>
          <Input id="name" {...register("name")} />
        </div>
        <div className="space-y-2">
          <label>Email</label>
          <Input type="email" id="email" {...register("email")} />
        </div>

        <div className="space-y-2">
          <label>Phone</label>
          <Input id="phone" {...register("phone")} />
        </div>

        <div className="flex flex-col gap-2">
          <label>Gender</label>
          <select
            id="gender"
            {...register("gender")}
            className={cn(
              "border rounded px-2 py-2 cursor-pointer",
              !defaultValue && "text-zinc-400"
            )}
            onChange={(e) => setDefaultValue(e.target.value)}
          >
            <option value="" hidden defaultChecked>
              Select Gender
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <Button
          className="w-full bg-blue-500 flex items-center gap-2"
          size="lg"
          disabled={loading}
        >
          {loading && <Loader2 size={20} className="animate-spin" />}
          Create Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterPatient;
