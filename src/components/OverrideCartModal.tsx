import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  headerTitle: string;
  bodyText?: string;
  confirmBtnText?: string;
  onClose: () => void;
  handleAction: () => void;
}

const OverrideCartModal = ({
  isOpen = false,
  headerTitle = 'Header Title',
  bodyText,
  confirmBtnText,
  onClose,
  handleAction,
}: ModalProps) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  return (
    <Modal isCentered isOpen={open} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{bodyText}</ModalBody>

        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={() => onClose()}>
            Close
          </Button>
          {confirmBtnText && (
            <Button colorScheme='red' onClick={() => handleAction()}>
              {confirmBtnText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OverrideCartModal;
