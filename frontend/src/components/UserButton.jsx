import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useEffect, useState } from "react";
import useWallet from "@/context/UseWallet";
import { ipfsDownload } from "@/utils/ipfs";
import { patientInfoCid } from "@/utils/patient";
import { doctorInfoCid } from "@/utils/doctor";

export const UserButton = () => {
    const [data, setData] = useState(null);
    const {role, address, contract } = useWallet();
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
      console.log(data);
      if(!data){
        return null;
      }
  return (
    <div className="container shadow-sm border-l-4 border-transparent flex justify-between w-full">
        <div className='flex items-center gap-4 h-full'>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col h-full justify-between flex-1'>
                <p className='text-sm text-white font-light'>{data.name}</p>
                <p className="text-sm text-zinc-400 line-clamp-1 font-extralight hover:cursor-pointer">{address.substr(0,15)}...</p>
            </div>
        </div>
        <button className="text-white bg-transparent hover:text-zinc-500 transition">
            <LogOut size={"19"} />
        </button>
    </div>
  )
}