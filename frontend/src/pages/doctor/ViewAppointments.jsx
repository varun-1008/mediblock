import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import { ipfsDownload } from "../../utils/ipfs";
import { useNavigate } from "react-router-dom";
import { Phone, Trash, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/LoadingState";

function ViewAppointments() {
  const [patients, setPatients] = useState(null);
  const { signer, contract } = useWallet();
  const navigate = useNavigate();

  function handleViewAppointment(patientAddress) {
    console.log(patientAddress);
    navigate(`/doctor/viewAppointment/${patientAddress}`);
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

  if (patients === null) return <LoadingState />;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">View Appointments</h1>
        <p className="text-sm text-zinc-400">List of upcoming appointments</p>
      </div>
      {patients.length === 0 ? (
        <div className="h-44 flex items-center justify-center">
          <p className="text-zinc-400">No upcoming appointments found</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10 w-full">
          {patients.map((patient, i) => (
            <div key={i} className="bg-white rounded-lg border">
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
                      <span className="text-zinc-400 text-sm">
                        {patient.email}
                      </span>
                    </div>
                  </div>
                  <div className="rounded hover:bg-zinc-100 transition flex items-center justify-center h-max p-2 aspect-square cursor-pointer">
                    <Phone size={20} />
                  </div>
                </div>
              </div>
              <div className="h-px bg-zinc-200" />
              <div className="w-full flex items-center gap-3 px-4 py-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 p-0 flex-1"
                  size="lg"
                  onClick={() => handleViewAppointment(patient.address)}
                >
                  <View size={20} />
                  <span>View</span>
                </Button>
                <Button
                  className="flex items-center flex-1 p-0 gap-2 text-white bg-blue-500 hover:bg-blue-500/90"
                  size="lg"
                  type="submit"
                  onClick={() => handleRemove(patient.address)}
                >
                  <Trash size={20} />
                  <span>Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAppointments;
