import useWallet from "@/context/UseWallet";
import RevokeAccess from "@/ui/RevokeAccess";

function Settings() {
  const { role } = useWallet();
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Settings</h1>
        <p className="text-sm text-zinc-400">
          Manage your settings for MediBlock{" "}
        </p>
      </div>
      <div className="w-full">
        {role === 1 && <RevokeAccess thinTitle={true} />}
      </div>
    </div>
  );
}
export default Settings;
