import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const LoadingState = ({ height }) => {
  return (
    <div className={cn("h-44 flex items-center justify-center", height)}>
      <Loader2 className="animate-spin text-zinc-400" size={25} />
    </div>
  );
};
