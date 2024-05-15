import { useForm } from "react-hook-form";
import { ipfsUpload } from "../utils/ipfs";
import useWallet from "../context/UseWallet";
import { registerDoctor } from "../utils/doctor";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterDoctor() {
  const { signer, contract, setRole } = useWallet();
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  async function onSubmit() {
    let values = getValues();
    values = JSON.stringify(values);

    toast.success("Creating IPFS hash");

    const data = await ipfsUpload(values);
    const cid = data.IpfsHash;

    toast.success("Registering as doctor");

    const registered = await registerDoctor({ cid, signer, contract });
    if (registered) {
      toast.success("Successfully registered");
      setRole(2);
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
      <h1>Register Doctor</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>Name</label>
        <input id="name" {...register("name")} />

        <label>Email</label>
        <input id="email" {...register("email")} />

        <label>Speciality</label>
        <input id="speciality" {...register("speciality")} />

        <label>License</label>
        <input id="license" {...register("license")} />

        <label>Phone</label>
        <input id="phone" {...register("phone")} />

        <label>Gender</label>
        <input id="gender" {...register("gender")} />

        <button>Submit</button>
      </form>
    </>
  );
}

export default RegisterDoctor;
