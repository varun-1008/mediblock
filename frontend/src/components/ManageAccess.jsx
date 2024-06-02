import useWallet from "@/context/UseWallet";
import { useEffect, useState, useTransition } from "react";
import { LoadingState } from "./LoadingState";
import { ipfsDownload } from "@/utils/ipfs";
import { Button } from "./ui/button";
import { Loader, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

export const ManageAccess = ({ linkIndex }) => {
  const { contract, signer } = useWallet();
  const [doctors, setDoctors] = useState(null);

  async function getDoctors(linkIndex) {
    const doctorsAddresses = await contract
      .connect(signer)
      .getDoctorListWithLinkAccess(linkIndex);

    let doctorsInfo = [];
    for (const doctorAddress of doctorsAddresses) {
      const doctorCid = await contract
        .connect(signer)
        .getDoctorInfo(doctorAddress);
      const doctorInfo = await ipfsDownload(doctorCid);
      doctorInfo["address"] = doctorAddress;

      doctorsInfo.push(doctorInfo);
    }

    setDoctors(doctorsInfo);
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveAccess = async (address) => {
    try {
      setIsLoading(true);
      const tx = await contract
        .connect(signer)
        .revokeAccess(linkIndex, address);
      await tx.wait();
      toast.success("Removed successfully");
      await getDoctors(linkIndex);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDoctors(linkIndex);
  }, []);

  return (
    <div className="space-y-5">
      <h1 className="font-medium">Authorised Doctors</h1>
      <div className="space-y-2">
        {doctors ? (
          doctors.map((doctor, index) => (
            <div
              key={index}
              className="w-full px-2 pl-5 py-2 rounded-lg border flex items-center justify-between"
            >
              <p className="text-sm">Dr. {doctor.name}</p>
              <Button
                variant="destructive"
                className="font-normal"
                onClick={() => handleRemoveAccess(doctor.address)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 size={15} className="animate-spin mr-2" />
                ) : (
                  <X size={15} className="mr-2" />
                )}
                Remove Access
              </Button>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center h-full items-center">
            <Loader2 className="animate-spin h-4 w-4" />
          </div>
        )}
        {doctors && doctors.length === 0 && (
          <div className="w-full flex justify-center h-full items-center">
            <p className="text-sm text-zinc-400">
              You are currently not sharing this record chain with any doctor
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
