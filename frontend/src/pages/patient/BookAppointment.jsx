import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import { ipfsDownload } from "../../utils/ipfs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, Mail, Phone } from "lucide-react";

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
        {doctors.map((doctor) => (
          <div key={doctor.name} className="bg-white rounded-lg border h-max">
            <div className="p-4 space-y-4">
              <div className="flex justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="rounded-full h-10 overflow-hidden aspect-square">
                    <img
                      src="/images/doctor.jpeg"
                      className="object-cover h-12 w-12"
                    />
                  </div>
                  <div className="h-full flex flex-col justify-between">
                    <span className="font-medium">Dr. {doctor.name}</span>
                    <span className="text-zinc-400">{doctor.speciality}</span>
                  </div>
                </div>
                <div className="rounded hover:bg-zinc-100 transition flex items-center justify-center p-2 aspect-square cursor-pointer">
                  <Phone strokeWidth={2} size={20} type="button" />
                </div>
              </div>
              <div className="h-px bg-zinc-200" />
              {/* Incomplete */}
              <div className="h-20 w-full flex items-center justify-center">
                <p className="">
                  Fill up with attributes such as working days, location
                </p>
              </div>
            </div>
            <div className="h-px bg-zinc-200" />
            <div className="w-full flex items-center gap-3 px-4 py-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 p-0 flex-1"
                size="lg"
              >
                <Mail size={20} />
                <span>Contact</span>
              </Button>
              <Button
                className="flex items-center flex-1 p-0 gap-2 text-white bg-blue-500 hover:bg-blue-500/90"
                size="lg"
                type="submit"
                onClick={() => handleBook(doctor.address, doctor.name)}
              >
                <ArrowRightCircle size={20} />
                <span>Book</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookAppointment;
