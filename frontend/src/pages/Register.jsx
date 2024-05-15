import { useEffect, useState } from "react";
import RegisterPatient from "../ui/RegisterPatient";
import RegisterDoctor from "../ui/RegisterDoctor";
import useWallet from "../context/UseWallet";
import { useNavigate } from "react-router-dom";

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
    <>
      <h1>Register</h1>
      <button onClick={() => setRegisterAsPatient(true)}>
        Register as a Patient
      </button>
      <button onClick={() => setRegisterAsPatient(false)}>
        Register as a Doctor
      </button>

      {registerAsPatient ? <RegisterPatient /> : <RegisterDoctor />}
    </>
  );
}

export default Register;
