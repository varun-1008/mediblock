import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import { ipfsDownload } from "../../utils/ipfs";

function AllAppointments() {
  const { signer, contract } = useWallet();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    (async function () {
      const newData = [];

      const doctorsAddresses = await contract
        .connect(signer)
        .getAppointedDoctors();

      for (const [index, doctorAddress] of doctorsAddresses.entries()) {
        const cid = await contract.getDoctorInfo(doctorAddress);
        const info = await ipfsDownload(cid);
        info.index = index;
        info.address = doctorAddress;
        newData.push(info);
      }
      setDoctors(newData);
    })();
  }, [doctors, signer, contract]);
  return (
    <div className="space-y-10">
      <div className="">
        <h1 className="font-medium">All Appointments</h1>
        <p className="text-sm text-zinc-400">
          List of all the active appointments
        </p>
      </div>
      <div className="grid grid-cols-4">
        {doctors.map((doctor) => (
          <div key={doctor.name} className="border bg-white rounded-lg">
            <p>{doctor.name}</p>
            <p>{doctor.speciality}</p>
            <p>{doctor.gender}</p>
            <p>{doctor.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppointments;
