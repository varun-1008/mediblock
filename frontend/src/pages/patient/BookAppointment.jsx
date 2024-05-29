import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import { ipfsDownload } from "../../utils/ipfs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, Mail, Phone } from "lucide-react";
import DoctorCard from "@/components/DoctorCard";

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
      <div>
        <h1 className="font-medium">Book an Appointment</h1>
        <p className="text-sm text-zinc-400">
          Select a doctor to book an appointment with.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {doctors.map((doctor) => {
          return (
            <DoctorCard
              doctor={doctor}
              key={doctor.address}
              handleBook={handleBook}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BookAppointment;
