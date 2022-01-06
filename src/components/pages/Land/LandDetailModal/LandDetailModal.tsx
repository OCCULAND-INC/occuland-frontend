import Modal, { ModalProps } from '~/components/global/Modal/Modal';

type Props = Omit<ModalProps, 'children'>;

function LandDetailModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      children
    </Modal>
  );
}

export default LandDetailModal;
