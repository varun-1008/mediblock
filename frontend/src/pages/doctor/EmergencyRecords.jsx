import { PatientCard } from "@/components/PatientCard";
import { SearchEmergencyInput } from "@/components/SearchEmergencyInput";
import useWallet from "@/context/UseWallet";
import { ipfsDownload } from "@/utils/ipfs";
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

  const [searchQuery, setSearchQuery] = useState("");
  const handleInputOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const filterPatients = (patients, searchQuery) => {
    let filteredData = patients;
    if (searchQuery) {
      filteredData = filteredData.filter(
        (patient) =>
          patient.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    }
    return filteredData;
  };

  const finalPatients = filterPatients(patients, searchQuery);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Emergency Records</h1>
        <p className="text-sm text-zinc-400">
          List of emergency records of the patients
        </p>
      </div>
      <div className="space-y-5">
        <SearchEmergencyInput
          value={searchQuery}
          handleInputOnChange={handleInputOnChange}
        />
        {finalPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {finalPatients.map((patient, i) => (
              <PatientCard
                key={i}
                patient={patient}
                handleViewAppointment={handleViewAppointment}
                emergency={true}
              />
            ))}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center">
            <p className="text-zinc-400">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};
