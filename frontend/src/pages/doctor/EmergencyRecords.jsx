import { PatientCard } from "@/components/PatientCard";
import { Button } from "@/components/ui/button";
import useWallet from "@/context/UseWallet";
import { ipfsDownload } from "@/utils/ipfs";
import { Phone, View } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fetchPatientsData = async (contract, signer, setPatients) => {
  const newData = [];
  try {
    const patientAddresses = await contract.connect(signer).getPatients();

    for (const patientAddress of patientAddresses) {
      const cid = await contract.getPatientInfo(patientAddress);
      const info = await ipfsDownload(cid);
      info.address = patientAddress;
      newData.push(info);
    }

    setPatients(newData);
  } catch (error) {
    console.error("Error fetching patient data:", error);
  }
};

export const EmergencyRecords = () => {
  const { signer, contract } = useWallet();
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (contract && signer) {
      fetchPatientsData(contract, signer, setPatients);
    }
  }, [contract, signer]);

  const handleViewAppointment = (patientAddress, patientName) => {
    const params = new URLSearchParams();
    params.append("name", patientName);
    navigate(`${patientAddress}?${params.toString()}`);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Emergency Records</h1>
        <p className="text-sm text-zinc-400">
          List of emergency records of the patients
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {patients.map((patient, i) => (
          <PatientCard
            key={i}
            patient={patient}
            handleViewAppointment={handleViewAppointment}
            emergency={true}
          />
        ))}
      </div>
    </div>
  );
};
