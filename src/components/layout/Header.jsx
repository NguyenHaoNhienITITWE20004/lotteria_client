import React, { useState } from 'react';
import logo from '../../assets/images/lotteria_logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Select, Dropdown, Space, Popconfirm } from 'antd';
import {
  accountMenu,
  navigateItems,
  profileItems,
} from '../../constant/header';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slice/modal';
import { ModalTypes } from '../../constant/modal';
import { DownOutlined } from '@ant-design/icons';
import { logoutSuccess } from '../../redux/slice/auth';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOpenModalSignIn = (id) => {
    if (id === 2) {
      dispatch(openModal({ name: ModalTypes.SIGN_IN, info: '' }));
    }
  };

  const handleChange = () => {};

  const handleClickDropDownItem = (e, item) => {
    console.log('Item clicked:', item);
    if (item.key === '1') {
      navigate('/profile');
    }
    if (item.key === '4') {
      setOpen(true);
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(logoutSuccess());
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <header className='bg-white shadow-md'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <div>
            <img src={logo} alt='Logo' width='67px' height='67px' />
          </div>
          <nav className='hidden md:flex space-x-6 ml-16'>
            {navigateItems.map((item) => (
              <div key={item.id}>
                <NavLink to={item.link}>
                  <p className='font-medium'>{item.title}</p>
                </NavLink>
              </div>
            ))}
          </nav>
        </div>
        <div>
          <div className='flex space-x-3'>
            <Select
              style={{ width: 120 }}
              defaultValue='vn'
              onChange={handleChange}
            >
              <Select.Option value='vn'>
                <div className='flex space-x-1'>
                  <img
                    src='https://www.lotteria.vn/grs-static/images/icon-vn.svg'
                    alt='vn'
                  />
                  <span>Tiếng Việt</span>
                </div>
              </Select.Option>
              <Select.Option value='en'>
                <div className='flex space-x-1'>
                  <img
                    src='https://www.lotteria.vn/grs-static/images/icon-en.svg'
                    alt='en'
                  />
                  <span>English</span>
                </div>
              </Select.Option>
            </Select>
            <div>
              <Button
                iconPosition='start'
                icon={
                  <img
                    src='https://www.lotteria.vn/grs-static/images/logo-l.svg'
                    alt=''
                  />
                }
                type='text'
                className='bg-red-500 text-white'
              >
                Download App
              </Button>
            </div>
          </div>
          <div className='flex space-x-4 mt-4 justify-between'>
            {accountMenu.map((item) => {
              if (item.id === 2 && isLogin) {
                return (
                  <div
                    key={item.id}
                    className='w-[20] h-10 text-red-500 rounded-full flex items-center justify-center cursor-pointer'
                  >
                    <Dropdown
                      menu={{
                        items: profileItems.map((profileItem) => ({
                          key: profileItem?.key,
                          type: profileItem?.type,
                          label: profileItem?.label,
                          icon: profileItem.icon,
                          onClick: (e) =>
                            handleClickDropDownItem(e, profileItem),
                        })),
                      }}
                    >
                      <div
                        onClick={(e) => {
                          console.log;
                          e.preventDefault();
                        }}
                      >
                        <Space>
                          Xin chào, {currentUser.username}
                          <DownOutlined />
                        </Space>
                      </div>
                    </Dropdown>
                    <Popconfirm
                      title='Bạn có chắc chắn muốn đăng xuất không'
                      open={open}
                      onConfirm={handleOk}
                      okButtonProps={{
                        loading: confirmLoading,
                        style: {
                          backgroundColor: 'red',
                          borderColor: 'red',
                        },
                      }}
                      icon={false}
                      onCancel={handleCancel}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    key={item.id}
                    onClick={() => handleOpenModalSignIn(item.id)}
                    className='w-10 h-10 border-[1px] rounded-full flex items-center justify-center cursor-pointer'
                  >
                    <img src={item.link} alt='' />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
