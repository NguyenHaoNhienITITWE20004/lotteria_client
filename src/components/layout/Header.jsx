import React from 'react';
import logo from '../../assets/images/lotteria_logo.png';
import { NavLink } from 'react-router-dom';
import { Button, Select } from 'antd';

const Header = () => {
  const navigateItems = [
    {
      id: 1,
      title: 'BESTSELLER',
      link: '/',
    },
    {
      id: 2,
      title: 'ĐẶT HÀNG',
      link: '/',
    },
    {
      id: 3,
      title: 'KHUYẾN MÃI',
      link: '/',
    },
    {
      id: 4,
      title: 'CỬA HÀNG',
      link: '/',
    },
  ];
  const accountMenu = [
    {
      id: 1,
      link: 'https://www.lotteria.vn/grs-static/images/icon-pos-2.svg',
    },
    {
      id: 2,
      link: 'https://www.lotteria.vn/grs-static/images/icon-myaccount.svg',
    },
    {
      id: 3,
      link: 'https://www.lotteria.vn/grs-static/images/icon-notification.svg',
    },
    {
      id: 4,
      link: 'https://www.lotteria.vn/grs-static/images/icon-cart.svg',
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <header className='bg-white shadow-md '>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <div className='flex items-center '>
          <div>
            <img src={logo} alt='Logo' width='67px' height='67px' />
          </div>
          <nav className='hidden md:flex space-x-6 ml-16'>
            {navigateItems.map((item) => {
              return (
                <div key={item.id}>
                  <NavLink to={item.link}>
                    <p className='font-medium'>{item.title}</p>
                  </NavLink>
                </div>
              );
            })}
          </nav>
        </div>
        <div className=''>
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
                    alt='vn'
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
            {accountMenu.map((item) => (
              <div
                key={item.id}
                className='w-10 h-10 border-[1px] rounded-full flex items-center justify-center cursor-pointer'
              >
                <img src={item.link} alt='' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
