import { UserDetails } from "@/components/UserDetails";

function Dashboard() {
  return (
    <div className="space-y-10">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <UserDetails />
      </div>
    </div>
  );
}

export default Dashboard;
