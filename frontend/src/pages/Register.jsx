import { useEffect, useState } from "react";
import RegisterPatient from "../ui/RegisterPatient";
import RegisterDoctor from "../ui/RegisterDoctor";
import useWallet from "../context/UseWallet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Register() {
  const [registerAsPatient, setRegisterAsPatient] = useState(true);
  const { role } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      if (role !== 0) navigate("/dashboard");
    })();
  }, [role, navigate]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className=" px-8 py-5 rounded space-y-5">
        <div>
          <h1 className="text-lg font-semibold">Create Account</h1>
          <p className="text-zinc-400">Fill the form to create an account</p>
          
        </div>
        <div className="flex items-center justify-center">
          {registerAsPatient ? <RegisterPatient /> : <RegisterDoctor />}
        </div>
        <div>
          {registerAsPatient ? <span className="text-zinc-400">You are registering as a patient. <span className="cursor-pointer underline text-black" onClick={() => setRegisterAsPatient(false)}>Switch to doctor</span> </span> : <span className="text-zinc-400">You are registering as a doctor. <span className="cursor-pointer underline text-black" onClick={() => setRegisterAsPatient(true)}>Switch to patient</span></span>}
        </div>
      </div>
       
    </div>
  );
}

export default Register;
