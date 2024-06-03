import { ArrowRight } from "lucide-react";
import { RecordBlock } from "./RecordBlock";

export const RecordTimeline = ({ linkRecords, address }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {linkRecords.map((record, recordIndex) => (
        <div key={recordIndex} className="flex items-center gap-1">
          <RecordBlock address={address} record={record} />
          {recordIndex !== linkRecords.length - 1 && (
            <ArrowRight size={20} className="text-zinc-500" />
          )}
        </div>
      ))}
    </div>
  );
};
