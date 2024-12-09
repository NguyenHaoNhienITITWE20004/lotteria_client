import React from 'react';
import { Layout, Popover, Space, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const { Header } = Layout;

const HeaderAdmin = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const menu = (
    <Menu>
      <Menu.Item key='1' className='hover:bg-gray-700 text-white'>
        Profile
      </Menu.Item>
      <Menu.Item key='2' className='hover:bg-gray-700 text-white'>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className='bg-[#001529] h-[100px] text-white shadow-md p-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <NavLink to='/' className='text-xl font-bold text-white'>
          <img
            src='https://www.lotteria.vn/grs-static/images/logo-l.svg'
            alt=''
            width='70px'
          />
        </NavLink>
      </div>
      <Popover content={menu} trigger='click'>
        <Button
          type='text'
          className='text-white hover:text-red-500 flex items-center space-x-2'
        >
          <span className='font-semibold'>
            Xin chào, {currentUser.username}
          </span>
          <DownOutlined />
        </Button>
      </Popover>
    </Header>
  );
};

export default HeaderAdmin;
