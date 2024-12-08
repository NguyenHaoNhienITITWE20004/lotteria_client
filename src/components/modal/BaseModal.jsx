import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slice/modal';

const BaseModal = () => {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modal.modals);

  return (
    <>
      {Array.from(modals.entries()).map(([modalName, modal]) => (
        <Modal
          key={modalName}
          title={modalName}
          open={modal.isOpen}
          onCancel={() => dispatch(closeModal({ name: modalName }))}
          onOk={() => dispatch(closeModal({ name: modalName }))}
        >
          {modal.info}
        </Modal>
      ))}
    </>
  );
};

export default BaseModal;
