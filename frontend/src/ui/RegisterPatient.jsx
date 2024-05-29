import { useForm } from "react-hook-form";
import { ipfsUpload } from "../utils/ipfs";
import useWallet from "../context/UseWallet";
import { registerPatient } from "../utils/patient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function RegisterPatient() {
  const { signer, contract, setRole } = useWallet();
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  async function onSubmit() {
    let values = getValues();
    values = JSON.stringify(values);

    toast.success("Creating IPFS hash");

    const data = await ipfsUpload(values);
    const cid = data.IpfsHash;

    toast.success("Registering as patient");

    const registered = await registerPatient({ cid, signer, contract });

    if (registered) {
      toast.success("Successfully registered");
      setRole(1);
      navigate("/dashboard");
    } else {
      toast.error("Registration failed");
    }
  }
  function onError() {
    // code
  }

  return (
    <div className="w-full">
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
          <label>Phone</label>
          <Input id="phone" {...register("phone")} />
        </div>

        <div className="space-y-2">
          <label>Gender</label>
          <Input id="gender" {...register("gender")} />
        </div>

        <Button className="w-full bg-blue-500" size="lg">
          Create Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterPatient;
