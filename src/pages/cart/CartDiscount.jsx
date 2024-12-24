import React from 'react';
import { Input, Button, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCart,
  removeDiscount,
  selectCartItems,
} from '../../redux/slice/cart';
import useAuth from '../../hook/useAuth';
import { applyDiscount } from '../../service/discount';

const CartDiscount = () => {
  const dispatch = useDispatch();
  const discountCode = useSelector((state) => state.cart.discount_code);
  const { currentUser } = useAuth();
  const userId = currentUser.id;
  const cartItems = useSelector(selectCartItems);

  const handleApplyDiscount = async (discountCode) => {
    const applyDiscountData = {
      discount_code: discountCode,
      cartItems,
      userId,
    };
    const applyDiscountRes = await applyDiscount(applyDiscountData);
    if (applyDiscountRes && applyDiscountRes.success) {
      dispatch(updateCart(applyDiscountRes.data));
      message.info(applyDiscountRes.message);
    } else {
      message.error('Mã giảm giá không hợp lệ.');
    }
  };

  const handleRemoveDiscount = () => {
    dispatch(removeDiscount());
    message.info('Mã giảm giá đã bị xóa.');
  };

  return (
    <div className='flex items-center justify-between mb-4'>
      {!discountCode ? (
        <div className='flex'>
          <Input
            size='large'
            placeholder='Nhập mã giảm giá'
            className='w-[200px]'
            onBlur={(e) => handleApplyDiscount(e.target.value)}
          />
          <Button
            type='primary'
            className='ml-2'
            onClick={() => handleApplyDiscount(discountCode)}
          >
            Áp dụng
          </Button>
        </div>
      ) : (
        <div className='flex items-center ml-4'>
          <span className='text-gray-600'>{discountCode}</span>
          <CloseOutlined
            onClick={handleRemoveDiscount}
            className='ml-2 text-red-500 cursor-pointer'
          />
        </div>
      )}
    </div>
  );
};

export default CartDiscount;
