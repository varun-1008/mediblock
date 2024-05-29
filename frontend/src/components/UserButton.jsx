import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import useWallet from "@/context/UseWallet";
import { ipfsDownload } from "@/utils/ipfs";
import { patientInfoCid } from "@/utils/patient";
import { doctorInfoCid } from "@/utils/doctor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";

export const UserButton = () => {
  const [data, setData] = useState(null);
  const { role, address, contract } = useWallet();

  useEffect(() => {
    (async function () {
      let infoCid;
      if (role === 1) infoCid = await patientInfoCid({ address, contract });
      if (role === 2) infoCid = await doctorInfoCid({ address, contract });
      if (infoCid) {
        const data = await ipfsDownload(infoCid);
        setData(data);
      }
    })();
  }, [role, address, contract]);

  const abbreviatedAddress = `${address.slice(0, 8)}...${address.slice(-6)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address).then(
      () => {
        toast.success("Address copied to clipboard!");
      },
      (err) => {
        toast.error("Could not copy text: ", err);
      }
    );
  };

  if (!data) {
    return null;
  }

  let imageSrc = "";
  if (role === 1) {
    if (data.gender === "M") imageSrc = "/images/patient-male.jpg";
    else imageSrc = "/images/patient-female.jpg";
  } else if (role === 2) {
    if (data.gender === "M") imageSrc = "/images/doctor-male.jpg";
    else imageSrc = "/images/doctor-female.jpg";
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-3 h-full">
        <Avatar className="flex items-center justify-center text-white">
          <img src={imageSrc} className="object-cover aspect-square" />
        </Avatar>
        <div className="flex flex-col h-full justify-between flex-1">
          <p className="text-sm font-medium">
            {role === 2 && "Dr."} {data.name}
          </p>
          <TooltipProvider>
            <Tooltip>
              <div className="flex items-center gap-4">
                <TooltipTrigger
                  className="text-sm text-zinc-400 line-clamp-1 font-light hover:cursor-pointer"
                  onClick={copyToClipboard}
                >
                  {abbreviatedAddress}
                </TooltipTrigger>
              </div>
              <TooltipContent className="text-white bg-neutral-800">
                {address}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
