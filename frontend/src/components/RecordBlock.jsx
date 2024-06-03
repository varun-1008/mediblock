import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Record from "@/ui/Record";
import { useEffect, useState } from "react";
import useWallet from "@/context/UseWallet";
import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useModal } from "@/hooks/ModalStore";

export const RecordBlock = ({ address, record }) => {
  const { signer, contract } = useWallet();
  const [isPatientRecord, setIsPatientRecord] = useState(false);
  const getRecordInfo = async () => {
    try {
      const isPatientRecord = await contract
        .connect(signer)
        .checkSelfRecord(
          address,
          parseInt(record.linkIndex),
          parseInt(record.recordIndex)
        );
      setIsPatientRecord(isPatientRecord);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecordInfo();
  }, []);

  const { onOpen } = useModal();

  return (
    <div className="border select-none bg-white rounded-lg overflow-hidden min-w-[150px]">
      <div className="px-5 py-4 border-b w-full flex items-center justify-center relative">
        <p className="font-medium leading-none w-max">{record.title}</p>
        {isPatientRecord && (
          <HoverCard>
            <HoverCardTrigger>
              <Info
                type="button"
                size={15}
                className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-500 transition cursor-pointer"
              />
            </HoverCardTrigger>
            <HoverCardContent>
              This record was added by the patient.
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <div className="flex w-full">
        <div className="w-full flex-1 flex justify-center items-center">
          <Button
            className="w-full rounded-none bg-blue-500 hover:bg-blue-500/90"
            onClick={() => onOpen("view-record", { record, address })}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};
