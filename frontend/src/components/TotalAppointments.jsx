import React from "react";
import { Link } from "react-router-dom";

export const TotalAppointments = ({ data, role }) => {
  if (!data) return null;
  return (
    <Link
      to="/dashboard"
      className="rounded-xl bg-white py-8 px-12 flex items-center justify-start cursor-pointer"
    >
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="rounded-full h-16 aspect-square bg-[#DDF4F6] flex items-center justify-center">
            <img src="/icons/appointments.png" className="w-8" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-medium">
              {data.numberOfAppointments}
            </h1>
            <p className="text-base text-zinc-400">
              {role === 1 ? "Appointment" : "Consultation"}
              {data.numberOfAppointments > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm">
            {role === 1 ? "You have completed" : "You have completed"}{" "}
            <span className="text-[#FE686B]">{data.numberOfAppointments} </span>{" "}
            {role === 1 ? "appointment" : "consultation"}
            {data.numberOfAppointments !== 1 && "s"}
          </p>
        </div>
      </div>
    </Link>
  );
};
