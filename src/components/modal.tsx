import {componentType} from '@/types';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from '@heroui/react';
import {useEffect} from 'react';

export const MyModal: componentType = ({
  children,
  title,
  btnText,
  closeHandle,
  actionHandle,
  className,
  style,
  show
}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure({defaultOpen: !!show});
  useEffect(() => {
    !!show && onOpen();
  }, [show]);
  return (
    <>
      <Button onPress={onOpen} className={className} style={style}>
        {btnText || 'Open Modal'}
      </Button>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop: 'bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  size="sm"
                  variant="light"
                  onPress={() => {
                    //onClose();
                    closeHandle();
                  }}
                >
                  Close
                </Button>
                <Button color="primary" className="text-white" size="sm" onPress={() => actionHandle()}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
