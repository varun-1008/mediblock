import useWallet from '@/context/UseWallet';
import { doctorInfoCid } from '@/utils/doctor';
import { ipfsDownload } from '@/utils/ipfs';
import { patientInfoCid } from '@/utils/patient';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const UserDetails = () => {
    const [data, setData] = useState(null);
  const { role, address, contract } = useWallet();
  const navigate = useNavigate();

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
  }, [role, address, contract, navigate]);

  if(!data) return <h1>Loading...</h1>

  return (
    <div className="space-y-4 bg-[#F0F3F4] py-5 px-6 h-max">
        <h1 className='text-base font-medium'>{role === 1 ? "Patient Details" : "Doctor Details"}</h1>
        
        <div className='flex gap-5 text-sm'>
            <div className='w-max flex flex-col gap-y-1'>
                {Object.entries(data).map(([key]) => (
                    <div key={key} className="">
                        <p className="capitalize">{key}: </p> 
                    </div>
                ))}
            </div>
            <div className='w-max flex flex-col gap-y-1'>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="">
                        <p className="capitalize">{value} </p> 
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
