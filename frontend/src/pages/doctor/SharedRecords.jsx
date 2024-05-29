import { LoadingState } from "@/components/LoadingState";
import { PatientCard } from "@/components/PatientCard";
import useWallet from "@/context/UseWallet";
import { ipfsDownload } from "@/utils/ipfs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SharedRecords() {
  const [patients, setPatients] = useState(null);

  const { signer, contract, address } = useWallet();
  const navigate = useNavigate();

  const handleViewRecords = (patientAddress, patientName) => {
    const params = new URLSearchParams();
    params.append("name", patientName);
    navigate(`${patientAddress}?${params.toString()}`);
  };

  const getPatientsWithAccess = async () => {
    try {
      const data = [];
      const patientAddresses = await contract.connect(signer).getPatients();
      for (const patientAddress of patientAddresses) {
        const records = await contract
          .connect(signer)
          .getRecordsWithAccess(patientAddress);
        const linkIndices = records[2];
        const length = records[0].length;

        let includePatient = false;

        for (let i = 0; i < length; ++i) {
          const hasRecordAccess = await contract
            .connect(signer)
            .hasAccess(patientAddress, address, linkIndices[i]);
          if (hasRecordAccess) {
            includePatient = true;
            break;
          }
        }
        if (includePatient) {
          const cid = await contract.getPatientInfo(patientAddress);
          const info = await ipfsDownload(cid);
          info.address = patientAddress;
          data.push(info);
        }
      }
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientsWithAccess();
  }, []);

  if (!patients) return <LoadingState />;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Shared Records</h1>
        <p className="text-sm text-zinc-400">
          List of all the patients who've shared their records with you
        </p>
      </div>
      {patients.length > 0 ? (
        <div className="w-full grid grid-cols-3 gap-10">
          {patients.map((patient, index) => (
            <PatientCard
              key={index}
              patient={patient}
              handleViewRecords={handleViewRecords}
            />
          ))}
        </div>
      ) : (
        <div className="h-44 flex items-center justify-center">
          <p className="text-zinc-400">
            Patients are not sharing their records with you currently
          </p>
        </div>
      )}
    </div>
  );
}

export default SharedRecords;
