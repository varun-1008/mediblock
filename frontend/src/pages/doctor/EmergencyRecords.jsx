import { Button } from "@/components/ui/button";
import useWallet from "@/context/UseWallet";
import { ipfsDownload } from "@/utils/ipfs";
import { View } from "lucide-react";
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
    navigate(`${patientAddress}`, { state: { name: patientName } });
  };

  return (
    <div className="space-y-10">
      <h1>Emergency Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 place-content-between">
        {patients.map((patient, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border h-max max-w-sm w-full"
          >
            <div className="p-4 space-y-4">
              <div className="flex justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="rounded-full h-10 overflow-hidden aspect-square">
                    <img
                      src="/images/doctor.jpeg"
                      className="object-cover h-12 w-12"
                    />
                  </div>
                  <div className="h-full flex flex-col">
                    <span className="font-medium flex items-end gap-1">
                      <p>{patient.gender === "M" ? "Mr." : "Mrs."}</p>
                      <p>{patient.name}</p>
                    </span>
                    <span className="text-zinc-400">{patient.email}</span>
                  </div>
                </div>
                <div className="rounded hover:bg-zinc-100 transition flex items-center justify-center p-2 aspect-square cursor-pointer">
                  {patient.gender}
                </div>
              </div>
            </div>
            <div className="h-px bg-zinc-200" />
            <div className="w-full flex items-center gap-3 px-4 py-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 p-0 w-full"
                size="lg"
                onClick={() =>
                  handleViewAppointment(patient.address, patient.name)
                }
              >
                <View size={20} />
                <span>View</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
