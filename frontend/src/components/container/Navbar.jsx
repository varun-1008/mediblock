import useWallet from "@/context/UseWallet";
import { SearchInput } from "../SearchInput";
import { UserButton } from "../UserButton";
import { Button } from "../ui/button";
import { Link2 } from "lucide-react";

export default function Navbar() {
    const {role} = useWallet();
    const { getSigner } = useWallet();

    async function handleConnect() {
      await getSigner();
    }
    return (
        <nav className="w-full px-10 py-5 flex justify-between">
            <SearchInput />
            <div>
                {role !== 0 ? (
                    <UserButton />
                ) : (
                    <Button
                        onClick={handleConnect}
                        className="py-6 rounded-lg flex items-center gap-2 text-sm font-medium bg-blue-500 hover:bg-blue-500/90"
                    >
                        <Link2 size={18} />
                        Connect
                    </Button>
                )}
            </div>
        </nav>
    )
}