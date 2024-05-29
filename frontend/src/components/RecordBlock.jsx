import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Record from "@/ui/Record";

export const RecordBlock = ({ address, record }) => {
  return (
    <div className="border select-none bg-white rounded-lg overflow-hidden min-w-[150px]">
      <div className="px-5 py-4 border-b w-full flex items-center justify-center">
        <p className="font-medium leading-none w-max">{record.title}</p>
      </div>
      <div className="flex w-full">
        <div className="w-full flex-1 flex justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full rounded-none bg-blue-500 hover:bg-blue-500/90">
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
              <Record recordData={{ address, ...record }} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
