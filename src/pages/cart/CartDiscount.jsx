/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { Input, Button, message } from 'antd';

const CartDiscount = ({ onApplyDiscount }) => {
  const [discountCode, setDiscountCode] = useState('');

  const handleApplyDiscount = () => {
    if (!discountCode) {
      message.error('Vui lòng nhập mã giảm giá');
      return;
    }
    onApplyDiscount(discountCode);
  };

  return (
    <div className='flex items-center justify-between mb-4'>
      <Input
        size='large'
        placeholder='Nhập mã giảm giá'
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        className='w-[200px]'
      />
      <Button type='primary' onClick={handleApplyDiscount} className='ml-2'>
        Áp dụng
      </Button>
    </div>
  );
};

export default CartDiscount;
