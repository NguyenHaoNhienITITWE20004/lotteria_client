import React from 'react';
import logo from '../../assets/images/lotteria_logo.png';

const Footer = () => {
  const columnFooter = [
    {
      id: 1,
      title: 'THÔNG TIN',
      fields: [
        { id: 1, name: 'Tin tức' },
        { id: 2, name: 'Khuyến mãi' },
        { id: 3, name: 'Tuyển dụng' },
        { id: 4, name: 'Nhượng quyền' },
      ],
    },
    {
      id: 2,
      title: 'HỖ TRỢ',
      fields: [
        { id: 1, name: 'Điều khoản sử dụng' },
        { id: 2, name: 'Chính sách bảo mật' },
        { id: 3, name: 'Chính sách giao hàng' },
        { id: 4, name: 'Chăm sóc khách hàng' },
      ],
    },
    {
      id: 3,
      title: 'THEO DÕI',
      fields: [
        {
          id: 1,
          name: 'Facebook',
          icon: (
            <img
              src='https://www.lotteria.vn/grs-static/images/icon-fb-2.svg'
              alt='fb'
            />
          ),
        },
        {
          id: 2,
          name: 'Instagram',
          icon: (
            <img
              src='https://www.lotteria.vn/grs-static/images/icon-instagram.svg'
              alt='ig'
            />
          ),
        },
        {
          id: 3,
          name: 'Zalo',
          icon: (
            <img
              src='https://www.lotteria.vn/grs-static/images/icon-zalo.svg'
              alt=''
            />
          ),
        },
      ],
    },
  ];

  return (
    <div className='bg-[#FFEAE3] pt-10 '>
      <div className='container  mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
          <div className='col-span-2 flex flex-col items-center'>
            <img src={logo} alt='Logo Lotteria' width='85px' />
            <p className='text-lg font-medium pt-4'>
              ĐĂNG KÝ NHẬN THÔNG TIN KHUYẾN MÃI
            </p>
            <div className='relative'>
              <input
                placeholder='Nhập email của bạn'
                className='w-[150px] md:w-[250px] lg:w-[345px] py-3 px-2 mt-4 outline-none focus:border-footer-second border-[2px] rounded-md'
              />
              <button className='text-red-500 text-lg absolute top-7 right-5'>
                Gửi đi
              </button>
            </div>
          </div>
          {columnFooter.map((col) => (
            <div key={col.id}>
              <h3 className='text-xl text-black font-semibold mb-4'>
                {col.title}
              </h3>
              <ul className='space-y-[6px]'>
                {col.fields.map((field) => (
                  <li
                    key={field.id}
                    className={`${
                      field.icon ? 'flex space-x-2 items-center' : ''
                    }`}
                  >
                    <div>{field?.icon}</div>
                    <a href='#' className='text-black hover:text-white'>
                      {field.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='text-center mt-12 border-t  py-4 bg-footer-second'>
        <p className='text-black text-sm font-medium'>
          © 2022 Lotteria All Rights Reserved Site by LDCC
        </p>
      </div>
    </div>
  );
};

export default Footer;
