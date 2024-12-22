import React, { useState } from 'react';
import { Button, Modal, Input, notification, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../constant/modal';
import { closeModal, openModal } from '../../redux/slice/modal';
import { FaTimes } from 'react-icons/fa';
import { signUp } from '../../service/auth';
import { loginSuccess } from '../../redux/slice/auth';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const signUpModal = useSelector(
    (state) => state.modal.modals[ModalTypes.SIGN_UP],
  );

  const handleCancel = () => {
    dispatch(closeModal({ name: ModalTypes.SIGN_UP }));
  };

  const handleSignUp = async () => {
    try {
      const userSignUp = { username, email, phone, password };
      const result = await signUp(userSignUp);
      if (result && result.success) {
        console.log('result', result);
        notification.success({
          message: 'Đăng ký thành công',
          description: 'Bạn đã đăng ký tài khoản thành công!',
        });
        dispatch(closeModal({ name: ModalTypes.SIGN_UP }));
        dispatch(openModal({ name: ModalTypes.SIGN_IN }));
      }
    } catch (error) {
      console.log(error?.response);
      const messageError = error?.response?.data?.message || '';
      console.error('Lỗi đăng ký:', messageError);
      notification.error({
        message: 'Đăng ký thất bại',
        description: messageError,
      });
    }
  };

  return (
    <div>
      <Modal
        open={signUpModal.isOpen}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        width='800px'
        height={'100px'}
        className='custom-modal'
      >
        <div className='grid grid-cols-2 gap-3'>
          <div className='p-5'>
            <h2 className='text-2xl font-bold text-center mb-6'>Đăng Ký</h2>
            <div>
              <div className='mb-4'>
                <label
                  htmlFor='fullName'
                  className='text-base block text-gray-700'
                >
                  Họ và tên
                </label>
                <Input
                  placeholder='Nhập họ và tên'
                  className='focus:border-footer-second hover:border-footer-second h-10 mt-2 border-gray-300 border-2'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='phone'
                  className='text-base block text-gray-700'
                >
                  Số điện thoại
                </label>
                <Input
                  placeholder='Nhập số điện thoại'
                  className='focus:border-footer-second hover:border-footer-second h-10 mt-2 border-gray-300 border-2'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='text-base block text-gray-700'
                >
                  Email
                </label>
                <Input
                  placeholder='Nhập số điện thoại/email'
                  className='focus:border-footer-second hover:border-footer-second h-10 mt-2 border-gray-300 border-2'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='password'
                  className='text-base block text-gray-700'
                >
                  Mật khẩu
                </label>
                <Input
                  placeholder='Nhập mật khẩu'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='focus:border-footer-second hover:border-footer-second h-10 mt-2 border-gray-300 border-2'
                />
              </div>
            </div>

            <button
              onClick={handleSignUp}
              className='w-full bg-red-500 text-white p-2 rounded-lg mt-4 hover:bg-red-600'
            >
              Đăng ký
            </button>
            <div className='text-center mt-4'>
              <p
                className='text-red-500 text-base hover:text-gray-700'
                onClick={() => {
                  dispatch(closeModal({ name: ModalTypes.SIGN_UP }));
                  dispatch(
                    openModal({ name: ModalTypes.SIGN_IN, content: null }),
                  );
                }}
              >
                Đã có tài khoản? Đăng nhập
              </p>
            </div>
          </div>
          <div className='rounded-r-lg'>
            <img
              src='https://www.lotteria.vn/grs-static/images/login-banner.jpg'
              alt=''
              width='100%'
              className='rounded-r-lg'
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpScreen;
