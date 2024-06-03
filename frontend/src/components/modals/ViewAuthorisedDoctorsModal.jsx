import { useModal } from "@/hooks/ModalStore";
import { Dialog, DialogContent } from "../ui/dialog";
import { ManageAccess } from "../ManageAccess";

export const ViewAuthorisedDoctorsModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "view-doctors";

  const { linkIndex } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <ManageAccess linkIndex={linkIndex} />
      </DialogContent>
    </Dialog>
  );
};
