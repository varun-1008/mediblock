import { useForm } from "react-hook-form";
import { ipfsUpload } from "../utils/ipfs";
import useWallet from "../context/UseWallet";
import { registerDoctor } from "../utils/doctor";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function RegisterDoctor() {
  const { signer, contract, setRole } = useWallet();
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

      toast.success("Registering as doctor");

      await registerDoctor({ cid, signer, contract });

      toast.success("Successfully registered");
      setRole(2);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
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
          <Input id="email" {...register("email")} />
        </div>
        <div className="space-y-2">
          <label>Speciality</label>
          <Input id="speciality" {...register("speciality")} />
        </div>

        <div className="space-y-2">
          <label>License</label>
          <Input id="license" {...register("license")} />
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
          className="bg-blue-500 flex items-center gap-2 "
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin" size={20} />} Create
          Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterDoctor;
