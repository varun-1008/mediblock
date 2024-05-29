export const UserDetails = ({ data, role }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="">User Type</p>
        <span className="bg-gray-100 p-2 rounded font-mono text-zinc-400">
          {role === 1 ? "Patient" : "Doctor"}
        </span>
      </div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className=" flex items-center justify-between">
          <p className="capitalize">{key}</p>
          <span className="bg-gray-100 p-2 rounded font-mono text-zinc-400">
            {value}
          </span>
        </div>
      ))}
    </>
  );
};
