import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWallet from "../../context/UseWallet";
import { Records } from "../../ui/Records";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader2, MessageCircleWarning } from "lucide-react";
import { Label } from "@/components/ui/label";
import { GoBackButton } from "@/components/GoBackButton";
import { LoadingState } from "@/components/LoadingState";

export default function BookAnAppointment() {
  const { doctorAddress } = useParams();
  const [records, setRecords] = useState(null);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const { signer, contract, address } = useWallet();
  const [hasAccess, setHasAccess] = useState(false);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const doctorName = queryParams.get("name");

  const handleSelect = (linkIndex) => {
    const isSelected = selected.find((el) => el === linkIndex);
    let newSelected = [...selected];
    if (isSelected !== undefined)
      newSelected = newSelected.filter((el) => el !== linkIndex);
    else newSelected.push(linkIndex);
    setSelected(newSelected);
  };

  async function handleBook() {
    try {
      setLoading(true);
      const tx = await contract
        .connect(signer)
        .addAppointment(doctorAddress, selected);
      await tx.wait();
      navigate("/patient/allAppointments");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async function () {
      const newData = [];

      let records = await contract.connect(signer).getRecords();

      const titles = records[0];
      const timestamps = records[1];
      const linkIndices = records[2];
      const recordIndices = records[3];
      const length = titles.length;

      for (let i = 0; i < length; ++i) {
        const recordObj = {
          title: titles[i],
          time: timestamps[i],
          linkIndex: Number(linkIndices[i]),
          recordIndex: Number(recordIndices[i]),
        };

        let access = await contract
          .connect(signer)
          .hasAccess(address, doctorAddress, linkIndices[i]);
        if (access) {
          setHasAccess(true);
          continue;
        }
        if (newData[linkIndices[i]] === undefined) newData[linkIndices[i]] = [];
        newData[linkIndices[i]].push(recordObj);
      }

      setRecords(newData);
    })();
  }, [signer, contract, doctorAddress]);

  if (records === null) return <LoadingState />;

  const allRecordsHaveAccess = records.length === 0 && hasAccess;

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <GoBackButton />
        <div className="">
          <h1 className="font-medium">Grant Access</h1>
          <p className="text-zinc-400 text-sm">
            Select a record/s to share with Dr. {doctorName}
          </p>
        </div>
      </div>
      {allRecordsHaveAccess ? (
        <div className="rounded-lg bg-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircleWarning size={20} className="text-blue-500" />
            <p className="text-zinc-400 text-sm">
              The doctor has access to all of your{" "}
              <span
                className="underline underline-offset-4 cursor-pointer"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                {" "}
                records
              </span>{" "}
              . Please book an appointment to continue.
            </p>
          </div>
          <Button
            onClick={handleBook}
            className="flex items-center gap-2 bg-blue-500"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />} Book
            Appointment
          </Button>
        </div>
      ) : (
        <>
          {hasAccess && (
            <div className="rounded-lg bg-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircleWarning size={20} className="text-blue-500" />
                <p className="text-zinc-400 text-sm">
                  The doctor has access to some of your records. Manage them{" "}
                  <span
                    className="underline cursor-pointer"
                    onClick={() => {
                      navigate("/settings");
                    }}
                  >
                    {" "}
                    here
                  </span>
                </p>
              </div>
            </div>
          )}
          <Records
            address={address}
            records={records}
            selected={selected}
            elementFunction={handleSelect}
            type="select-record"
          />
          <div className="w-full flex justify-end">
            <Button
              onClick={handleBook}
              className="flex items-center gap-2 bg-blue-500"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />} Book
              Appointment
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
