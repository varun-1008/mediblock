import { ArrowRight, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export const RecordFeatureButton = ({
  isSelected,
  linkIndex,
  elementFunction,
  type,
}) => {
  return (
    <>
      {type === "select-record" && (
        <div className="flex items-center gap-2 select-none">
          <Label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => elementFunction(linkIndex)}
            />
            {isSelected ? "Unselect" : "Select"}
          </Label>
        </div>
      )}
      {type === "create-record" && (
        <div className="flex items-center gap-2 select-none">
          <Button
            onClick={() => elementFunction(linkIndex)}
            className="font-normal flex items-center gap-2"
            variant="outline"
          >
            <PlusCircle size={18} strokeWidth={1.5} />
            New Record to this Link
          </Button>
        </div>
      )}
      {type === "view-doctors" && (
        <div className="flex items-center select-none">
          <Button
            variant="outline"
            onClick={() => elementFunction(linkIndex)}
            className="flex items-center gap-2 font-normal group"
          >
            View Authorised Doctors
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />
          </Button>
        </div>
      )}
    </>
  );
};
