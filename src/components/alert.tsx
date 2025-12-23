import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Alert } from "@heroui/alert";
import { useRef } from "react";
import { useAlertStore } from "@/store/message";
import { MessageType, ColorType } from "@/types";

const TYPE = new Map<MessageType, ColorType>([
    ["default", "default"],
    ["success", "success"],
    ["error", "danger"]
  ]),
  bgType = new Map([
    ["default", "bg-default"],
    ["success", "bg-success"],
    ["error", "bg-error"]
  ]);
const AlertModal = () => {
  const targetRef = useRef(null),
    alertStore = useAlertStore();
  function handleClick(open: boolean) {
    alertStore.setStatue(open);
  }
  return (
    <>
      <Modal
        ref={targetRef}
        classNames={{
          base: `border-${bgType.get(alertStore.type)} bg-${bgType.get(alertStore.type)}`
        }}
        isOpen={alertStore.show}
        onOpenChange={handleClick}
        backdrop="blur">
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <Alert color={TYPE.get(alertStore.type)} title={alertStore.content} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AlertModal;
