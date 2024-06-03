import { useModal } from "@/hooks/ModalStore";
import { Dialog, DialogContent } from "../ui/dialog";
import CreateRecord from "@/pages/doctor/CreateRecord";

export const CreateRecordModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "create-record";

  const { createType, linkIndex } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <CreateRecord createType={createType} linkIndex={linkIndex} />
      </DialogContent>
    </Dialog>
  );
};
