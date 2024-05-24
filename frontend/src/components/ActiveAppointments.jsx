import { Link } from "react-router-dom";

export const ActiveAppointments = ({ data, role }) => {
  if (!data) return null;
  return (
    <Link
      to="/patient/allAppointments"
      className="rounded-xl bg-white p-10 flex items-center justify-start cursor-pointer"
    >
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="rounded-full h-16 aspect-square bg-[#FFEDDD] flex items-center justify-center">
            <img src="/icons/activeappointments.png" className="w-8" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-medium">
              {data.numberOfActiveAppointments}
            </h1>
            <p className="text-base text-zinc-400">
              Active {role === 1 ? "Appointment" : "Consultation"}
              {data.numberOfActiveAppointments > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm">
            You have{" "}
            <span className="text-[#FE686B]">{data.numberOfAppointments} </span>{" "}
            active {role === 1 ? "appointment" : "consultation"}
            {data.numberOfAppointments !== 1 && "s"}
          </p>
        </div>
      </div>
    </Link>
  );
};
