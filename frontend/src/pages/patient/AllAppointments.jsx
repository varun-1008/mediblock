import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import { ipfsDownload } from "../../utils/ipfs";
import { Mail, Phone, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          List of all the doctors with scheduled appointments
        </p>
      </div>
      {doctors.length === 0 ? (
        <Link
          to={"/patient/bookAppointment"}
          className="rounded-xl border border-dashed border-zinc-400 h-32 w-[250px] flex items-center justify-center"
        >
          <div className="flex flex-col gap-2 items-center">
            <PlusCircle className="text-zinc-400" strokeWidth={1.5} size={25} />
            <p className="text-sm text-zinc-400">Book an Appointment</p>
          </div>
        </Link>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {doctors.map((doctor) => (
            <div key={doctor.name} className="bg-white rounded-lg border h-max">
              <div className="p-4 space-y-4">
                <div className="flex justify-between h-full">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full h-10 overflow-hidden aspect-square">
                      <img
                        src={
                          doctor.gender === "M"
                            ? "/images/doctor-male.jpg"
                            : "/images/doctor-female.jpg"
                        }
                        className="object-cover h-12 w-12"
                      />
                    </div>
                    <div className="h-full flex flex-col justify-between text-sm">
                      <span className="font-medium">Dr. {doctor.name}</span>
                      <span className="text-zinc-400">{doctor.speciality}</span>
                    </div>
                  </div>
                  <div className="rounded hover:bg-zinc-100 transition flex items-center justify-center p-2 aspect-square cursor-pointer">
                    <Phone strokeWidth={2} size={20} type="button" />
                  </div>
                </div>
              </div>
              <div className="h-px bg-zinc-200" />
              <div className="w-full flex items-center gap-3 p-2">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-0 flex-1"
                  size="lg"
                >
                  <Mail size={20} />
                  <span>Contact</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllAppointments;
