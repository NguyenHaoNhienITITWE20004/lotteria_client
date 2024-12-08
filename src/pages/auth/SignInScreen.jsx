import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../constant/modal';
import { closeModal, openModal } from '../../redux/slice/modal';
import { FaTimes } from 'react-icons/fa';

const SignInScreen = () => {
  const dispatch = useDispatch();

  const signInModal = useSelector(
    (state) => state.modal.modals[ModalTypes.SIGN_IN],
  );
  console.log('🚀 ~ SignInScreen ~ signInModal:', signInModal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    dispatch(openModal({ name: ModalTypes.SIGN_IN }));
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    console.log(123);
    dispatch(closeModal({ name: ModalTypes.SIGN_IN }));
  };
  return (
    <div>
      <Button type='primary' onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title='Basic Modal'
        open={signInModal.isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: true,
        }}
        cancelButtonProps={{
          disabled: true,
        }}
        width='600px'
      >
        <div className='flex'>
          <div>
            <h2 className='text-2xl font-bold text-center mb-6'>
              Đăng nhập hoặc tạo tài khoản
            </h2>
            <div className='mb-4'>
              <label htmlFor='phoneOrEmail' className='block text-gray-700'>
                Số điện thoại/Email
              </label>
              <input
                id='phoneOrEmail'
                type='text'
                placeholder='Nhập số điện thoại của bạn/Email'
                className='w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <button className='w-full bg-red-500 text-white p-2 rounded-lg mt-4 hover:bg-red-600'>
              Tiếp tục
            </button>

            <div className='flex justify-center mt-4'>
              <button className='bg-blue-500 text-white p-2 rounded-lg mx-2 hover:bg-blue-600'>
                Facebook
              </button>
              <button className='bg-gray-500 text-white p-2 rounded-lg mx-2 hover:bg-gray-600'>
                Google
              </button>
            </div>

            <div className='text-center mt-4'>
              <a href='#' className='text-gray-500 hover:text-gray-700'>
                Mua hàng không cần tài khoản
              </a>
            </div>
          </div>
          <div>
            <img
              src='https://www.lotteria.vn/grs-static/images/login-banner.jpg'
              alt=''
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SignInScreen;
