import React from 'react';
import { Divider, Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { menuItems } from '../../../../constant/sidebar';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={260} className=' text-white p-1'>
      <div className='flex justify-center items-center p-[18px]'>
        <h1 className='text-3xl font-semibold text-white'>Admin Panel</h1>
      </div>
      <Divider className='bg-white' />

      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['dashboard']}
        className='space-y-6 text-base font-medium'
      >
        {menuItems.map((item) =>
          item.children ? (
            <Menu.SubMenu
              key={item.key}
              icon={item.icon}
              title={item.label}
              className='text-gray-200 hover:bg-gray-800 leading-10'
            >
              {item.children.map((subItem) => (
                <Menu.Item
                  key={subItem.key}
                  icon={subItem.icon}
                  className='text-gray-200  custom-menu-item'
                >
                  <NavLink to={subItem.path} className='text-gray-200 '>
                    {subItem.label}
                  </NavLink>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              className='text-gray-200 hover:bg-indigo-700 hover:text-white'
            >
              <NavLink
                to={item.path}
                className='text-gray-200 hover:text-red-500'
              >
                {item.label}
              </NavLink>
            </Menu.Item>
          ),
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
