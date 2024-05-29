import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import useWallet from "@/context/UseWallet";
import { ipfsDownload } from "@/utils/ipfs";
import { LoadingState } from "./LoadingState";
import { DashboardSharedRecords } from "./DashboardSharedRecords";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RecordsShared = () => {
  const [patients, setPatients] = useState(null);

  const { contract, signer, address } = useWallet();

  const navigate = useNavigate();

  let showViewMore = false;

  const getPatientsWithSharedRecords = async () => {
    try {
      const data = [];
      const patientAddresses = await contract.connect(signer).getPatients();
      for (const patientAddress of patientAddresses) {
        if (data.length > 3) {
          showViewMore = true;
          break;
        }
        const records = await contract
          .connect(signer)
          .getRecordsWithAccess(patientAddress);
        const linkIndices = records[2];
        const length = records[0].length;

        let includePatient = false;

        for (let i = 0; i < length; ++i) {
          const hasRecordAccess = await contract
            .connect(signer)
            .hasAccess(patientAddress, address, linkIndices[i]);
          if (hasRecordAccess) {
            includePatient = true;
            break;
          }
        }
        if (includePatient) {
          const cid = await contract.getPatientInfo(patientAddress);
          const info = await ipfsDownload(cid);
          info.address = patientAddress;
          data.push(info);
        }
      }
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientsWithSharedRecords();
  }, []);

  if (!patients) return <LoadingState />;

  return (
    <div className="rounded-xl px-10 py-8 pb-14 bg-white space-y-5">
      <div className="w-full fle justify-between">
        <h1 className="font-medium">Shared Records</h1>
        {showViewMore && (
          <Button
            variant="outline"
            className="p-2 flex items-center gap-1"
            onClick={() => navigate("/doctor/shared-records")}
          >
            Go Back
            <ArrowRight size={20} />
          </Button>
        )}
      </div>
      {patients.length === 0 ? (
        <div className="h-32 flex items-center justify-center w-full">
          <p className="text-zinc-400 text-sm">
            Patients are not sharing their records with you currently
          </p>
        </div>
      ) : (
        <>
          <Accordion type="single" collapsible>
            {patients.map((patient, index) => {
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-normal">
                    <span className="">{patient.name}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <DashboardSharedRecords patient={patient} />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </>
      )}
    </div>
  );
};
