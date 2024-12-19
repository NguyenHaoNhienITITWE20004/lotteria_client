// CartScreen.tsx
import React from 'react';
import { Steps, Button } from 'antd';
import CartItems from './CartItems';
import CartOptions from './CartOption';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalPrice } from '../../redux/slice/cart';

const CartScreen = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <div className='bg-pink-50'>
      <div className=' bg-pink-50 p-6 container'>
        <div className='flex justify-between items-center border-b border-red-200 pb-4'>
          <div>
            <Steps
              size='default'
              current={0}
              direction='horizontal'
              items={[{ title: 'Giỏ hàng' }, { title: 'Thanh toán' }]}
            />
          </div>
        </div>

        <div className='grid grid-cols-12 mt-6'>
          <div className='col-span-12 lg:col-span-8'>
            <CartItems cartItems={cartItems} />
          </div>

          <div className='col-span-12 lg:col-span-4'>
            <CartOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
