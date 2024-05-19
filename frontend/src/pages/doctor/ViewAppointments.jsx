import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import { ipfsDownload } from "../../utils/ipfs";
import { useNavigate } from "react-router-dom";



function ViewAppointments() {
  const [patients, setPatients] = useState(null);
  const { signer, contract } = useWallet();
  const navigate = useNavigate();

  function handleClick(patietntAddress) {
    navigate(patietntAddress);
  }

  async function handleRemove(patientAddress) {
    const tx = await contract.connect(signer).removeAppointment(patientAddress);
    await tx;
    setPatients(null);
  }

  useEffect(() => {
    (async function () {
      const newData = [];

      const patientAddresses = await contract
        .connect(signer)
        .getAppointedPatients();

      for (const patientAddress of patientAddresses) {
        const cid = await contract.getPatientInfo(patientAddress);
        const info = await ipfsDownload(cid);
        info.address = patientAddress;
        newData.push(info);
      }
      setPatients(newData);
    })();
  }, [patients, signer, contract]);

  if (patients === null) return <h1>Loading</h1>;

  return (
    <>
      <h1>View Appointments</h1>
      {patients.map((patient) => {
        return (
          <div key={patient.name}>
            <p>{patient.name}</p>
            <p>{patient.email}</p>
            <p>{patient.gender}</p>
            <p>{patient.phone}</p>
            <button onClick={() => handleClick(patient.address)}>View</button>
            <button onClick={() => handleRemove(patient.address)}>
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
}

export default ViewAppointments;
