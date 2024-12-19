import React from 'react';
import { Button, Input, Switch } from 'antd';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice } from '../../redux/slice/cart';
import { formatCurrencyVND } from '../../util/format';
import CartDiscount from './CartDiscount';

const CartOptions = () => {
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <div className='w-full bg-white p-6 rounded-lg shadow-lg mt-6 lg:mt-0 lg:ml-6'>
      <h3 className='text-xl font-semibold text-gray-700 mb-3'>
        Thông tin giao hàng
      </h3>

      <div className='mb-6'>
        <div className='space-y-2 mb-2'>
          <label className='block text-md font-medium text-gray-600'>
            Địa chỉ giao hàng
          </label>
          <Input.TextArea
            rows={2}
            placeholder='Nhập địa chỉ giao hàng của bạn...'
            className='rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-md font-medium text-gray-600'>
            Số điện thoại nhận hàng
          </label>
          <Input
            placeholder='Nhập số điện thoại của bạn...'
            className='rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>
      <div className='border-t border-red-300 my-6'></div>
      <div className='mb-3'>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-md text-gray-600'>Lấy dụng cụ ăn uống</span>
            <Switch defaultChecked />
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-md text-gray-600'>Lấy tương cà</span>
            <Switch defaultChecked size='' />
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-md text-gray-600'>Lấy tương ớt</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
      <div className='border-t border-red-300 my-6'></div>
      <div>
        <div className='mt-6'>
          <CartDiscount />
        </div>
        <div className='flex justify-between text-lg text-gray-700'>
          <span>Tạm tính:</span>
          <span className='font-semibold'>{formatCurrencyVND(totalPrice)}</span>
        </div>
        <div className='flex justify-between text-xl font-semibold text-gray-800 mt-2'>
          <span>Tổng cộng:</span>
          <span className='text-red-600'>{formatCurrencyVND(totalPrice)}</span>
        </div>

        <Button
          type='primary'
          className='w-full mt-6 py-3 text-lg font-semibold bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300'
          size='large'
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default CartOptions;
