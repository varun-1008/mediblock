import { Link } from "react-router-dom";

export const TotalRecords = ({ data, role }) => {
  if (!data) return null;
  return (
    <Link
      to={role === 1 ? "/patient/allRecords" : ""}
      className="rounded-xl bg-white pl-10 py-10 flex items-center justify-start cursor-pointer"
    >
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="rounded-full h-16 aspect-square bg-[#FFE8E8] flex items-center justify-center">
            <img src="/icons/records.png" className="w-8" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-medium">{data.numberOfRecords}</h1>
            <p className="text-base text-zinc-400">Records</p>
          </div>
        </div>
        <div>
          <p className="text-sm">
            {role === 1 ? "You currently have" : "You have generated"}{" "}
            <span className="text-[#FE686B]">{data.numberOfRecords} </span>{" "}
            record
            {data.numberOfRecords !== 1 && "s"}
          </p>
        </div>
      </div>
    </Link>
  );
};
