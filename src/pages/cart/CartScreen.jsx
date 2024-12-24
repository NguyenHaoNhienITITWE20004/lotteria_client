import React from 'react';
import { Steps, Button, Empty } from 'antd';
import CartItems from './CartItems';
import CartOptions from './CartOption';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalPrice } from '../../redux/slice/cart';
import { Link } from 'react-router-dom';
import emptyCartImage from '../../assets/images/empty-cart.png';

const CartScreen = () => {
  const cartItems = useSelector(selectCartItems);
  console.log('🚀 ~ CartScreen ~ cartItems:', cartItems);
  if (cartItems?.length === 0) {
    return (
      <div className='bg-pink-50'>
        <div className='col-span-12 flex flex-col items-center justify-center text-center py-10 h-[60vh]'>
          <Empty
            description='Giỏ hàng của bạn hiện tại đang trống'
            image={emptyCartImage}
            imageStyle={{ height: 250 }}
          />
          <Link to='/'>
            <Button size='large' type='primary' className='mt-4 text-xl'>
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-pink-50'>
      <div className='bg-pink-50 p-6 container'>
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

        <div className='grid grid-cols-12 gap-6 mt-6'>
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
