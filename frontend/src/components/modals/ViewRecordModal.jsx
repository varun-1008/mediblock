import { useModal } from "@/hooks/ModalStore";
import { Dialog, DialogContent } from "../ui/dialog";
import Record from "@/ui/Record";

export const ViewRecordModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "view-record";
  const { record, address } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
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
  );
};
