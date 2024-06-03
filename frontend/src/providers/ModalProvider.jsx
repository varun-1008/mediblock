import { CreateRecordModal } from "@/components/modals/CreateRecordModal";
import { ViewAuthorisedDoctorsModal } from "@/components/modals/ViewAuthorisedDoctorsModal";
import { ViewRecordModal } from "@/components/modals/ViewRecordModal";

export const ModalProvider = () => {
  return (
    <>
      <CreateRecordModal />
      <ViewRecordModal />
      <ViewAuthorisedDoctorsModal />
    </>
  );
};
