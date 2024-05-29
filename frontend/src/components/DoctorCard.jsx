import { ArrowRightCircle, Mail, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useWallet from "@/context/UseWallet";

const DoctorCard = ({ doctor, handleBook }) => {
  const { contract, signer } = useWallet();
  const [totalConsultations, setTotalConsultations] = useState(0);
  // fetch total consultations on mount
  useEffect(() => {
    (async function () {
      const consultations = Number(
        await contract
          .connect(signer)
          .getNumberOfAppointmentsDoctor(doctor.address)
      );
      setTotalConsultations(consultations);
    })();
  }, []);
  return (
    <div className="bg-white rounded-lg border h-max">
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
        <div className="w-full px-2">
          <p className="">
            {totalConsultations}{" "}
            <span className="text-zinc-400">
              consultation{totalConsultations !== 1 && "s"} completed
            </span>{" "}
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
  );
};

export default DoctorCard;