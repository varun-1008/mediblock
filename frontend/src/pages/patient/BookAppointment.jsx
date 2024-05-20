import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import { ipfsDownload } from "../../utils/ipfs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const { signer, contract } = useWallet();
  const navigate = useNavigate();

  function handleBook(address, name) {
    const params = new URLSearchParams();
    params.append("name", name);
    navigate({
      pathname: `${address}`,
      search: params.toString(),
    });
  }

  useEffect(() => {
    (async function () {
      const newData = [];

      const doctorsAddresses = await contract
        .connect(signer)
        .getNotAppointedDoctors();

      for (const doctorAddress of doctorsAddresses) {
        const cid = await contract.getDoctorInfo(doctorAddress);
        const info = await ipfsDownload(cid);
        info.address = doctorAddress;
        newData.push(info);
      }
      setDoctors(newData);
    })();
  }, [signer, contract]);

  if (doctors.length === 0) return <h1>Loading...</h1>;

  return (
    <div className="space-y-10">
      <h1 className="text-lg font-semibold">Book an Appointment</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {doctors.map((doctor) => (
          <div key={doctor.name} className="bg-[#F0F3F4] p-4">
            <p>Dr. {doctor.name}</p>
            <p>{doctor.speciality}</p>
            <p>{doctor.gender}</p>
            <p>{doctor.phone}</p>
            <Button
              onClick={() => handleBook(doctor.address, doctor.name)}
              className="mt-3 w-full rounded-none"
              size="sm"
            >
              Book
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookAppointment;
