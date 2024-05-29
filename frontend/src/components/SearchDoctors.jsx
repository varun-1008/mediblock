import { Search } from "lucide-react";
import { Input } from "./ui/input";

export const SearchDoctors = ({ value, handleInputOnChange }) => {
  return (
    <div className="max-w-lg">
      <div className="rounded border flex gap-2 px-3 bg-white items-center">
        <Search size={20} className="text-zinc-400" />
        <Input
          placeholder="Search for Doctors or Specialisations"
          className="border-none rounded-none p-0 outline-none"
          value={value}
          onChange={handleInputOnChange}
        />
      </div>
    </div>
  );
};
