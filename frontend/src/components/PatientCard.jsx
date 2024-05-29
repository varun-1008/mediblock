import { Phone, View } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const PatientCard = ({
  patient,
  handleViewAppointment,
  handleViewRecords,
}) => {
  return (
    <div className="bg-white rounded-lg border h-max max-w-sm w-full">
      <div className="p-4 space-y-4">
        <div className="flex justify-between h-full items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-full h-10 overflow-hidden aspect-square">
              <img
                src={
                  patient.gender === "M"
                    ? "/images/patient-male.jpg"
                    : "/images/patient-female.jpg"
                }
                className="object-cover h-12 w-12"
              />
            </div>
            <div className="h-full flex flex-col">
              <span className="font-medium flex items-end gap-1">
                <p>{patient.gender === "M" ? "Mr." : "Mrs."}</p>
                <p>{patient.name}</p>
              </span>
              <span className="text-zinc-400 text-sm">{patient.email}</span>
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
          className="flex items-center gap-2 p-0 w-full"
          size="lg"
          onClick={() => {
            if (handleViewAppointment) {
              handleViewAppointment(patient.address, patient.name);
            } else {
              handleViewRecords(patient.address, patient.name);
            }
          }}
        >
          <View size={20} strokeWidth={1.5} />
          <span className="font-normal">View</span>
        </Button>
      </div>
    </div>
  );
};
