import { useCallback, useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Record from "@/ui/Record";

function AllEmergencyRecords() {
  const [emergencyRecords, setEmergencyRecords] = useState(null);
  const { signer, contract, address } = useWallet();

  const getData = useCallback(async () => {
    const newData = [];

      let records = await contract.connect(signer).getEmergencyRecords(address);

      const titles = records[0];
      const timestamps = records[1];
      const linkIndices = records[2];
      const recordIndices = records[3];
      const length = titles.length;

      for (let i = 0; i < length; ++i) {
        const recordObj = {
          title: titles[i],
          time: timestamps[i],
          linkIndex: linkIndices[i],
          recordIndex: recordIndices[i],
        };

        if (newData[linkIndices[i]] === undefined) newData[linkIndices[i]] = [];
        newData[linkIndices[i]].push(recordObj);
      }
      setEmergencyRecords(newData);
  }, [signer, contract, address])

  async function handleEmergencyChange() {
    await getData();
  }

  useEffect(() => {
    (async function () {
      getData()
    })();
  }, [getData]);

  if (!emergencyRecords) return <h1>Loading</h1>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Emergency Records</h1>
        {emergencyRecords.length === 0 ? (
          <p className="text-zinc-400 text-sm">
            No records are marked as emergency record
          </p>
        ) : (
          <p className="text-sm text-zinc-400">
            List of all the records you&apos;ve marked as emergency record
          </p>
        )}
      </div>
      <div className="w-full grid grid-cols-5 gap-10">
        {emergencyRecords.map((linkRecords) => {
          return linkRecords.map((record, index) => {
            return (
              <div
                key={index}
                className="border select-none bg-white rounded-lg overflow-hidden"
              >
                <div className="px-5 py-4 border-b w-full flex items-center justify-center">
                  <p className="font-medium leading-none w-max">
                    {record.title}
                  </p>
                </div>
                <div className="flex w-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full rounded-none bg-blue-500 hover:bg-blue-500/90 h-max p-3">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <div className="">
                        <h1 className="font-medium">Record Details</h1>
                        <p className="text-sm text-zinc-400">
                          Details of the selected record
                        </p>
                      </div>
                      <Record recordData={{ address, ...record }} handleEmergencyChange={handleEmergencyChange} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default AllEmergencyRecords;