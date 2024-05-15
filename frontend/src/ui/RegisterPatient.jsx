import { useForm } from "react-hook-form";
import { ipfsUpload } from "../utils/ipfs";
import useWallet from "../context/UseWallet";
import { registerPatient } from "../utils/patient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    <>
      <h1>Register Patient</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>Name</label>
        <input id="name" {...register("name")} />

        <label>Email</label>
        <input id="email" {...register("email")} />

        <label>Phone</label>
        <input id="phone" {...register("phone")} />

        <label>Gender</label>
        <input id="gender" {...register("gender")} />

        <button>Submit</button>
      </form>
    </>
  );
}

export default RegisterPatient;
