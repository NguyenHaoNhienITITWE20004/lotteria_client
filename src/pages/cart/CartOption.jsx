import React, { useState } from 'react';
import { Button, Input, message, Select, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartDiscountedTotalPrice,
  selectCartItems,
  selectCartNote,
  selectCartTotalPrice,
  updateCart,
} from '../../redux/slice/cart';
import { formatCurrency } from '../../util/format';
import CartDiscount from './CartDiscount';
import { createOrder } from '../../service/order';
import payment from '../../service/payment';
import useAuth from '../../hook/useAuth';

const CartOptions = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const userId = currentUser.id;
  const cartItems = useSelector(selectCartItems);
  console.log('🚀 ~ CartOptions ~ cartItems :', cartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const discountedTotalPrice = useSelector(selectCartDiscountedTotalPrice);
  const note = useSelector(selectCartNote);
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('vnpay');

  const handleContinue = async () => {
    if (!cartItems || cartItems.length === 0) {
      return message.error('Giỏ hàng không có sản phẩm.');
    }
    if (!shippingAddress || !phone || !paymentMethod) {
      return message.error('Vui lòng nhập đầy đủ thông tin.');
    }
    const final_price =
      discountedTotalPrice > totalPrice ? totalPrice : discountedTotalPrice;
    const orderData = {
      userId,
      totalPrice: final_price * 25000,
      orderDetails: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.discounted_price,
      })),
      shippingAddress,
      phone,
      paymentMethod,
      note,
    };

    try {
      const orderRes = await createOrder(orderData);
      if (orderRes && orderRes.success && orderRes.order) {
        const orderCreated = orderRes.order;
        const paymentData = {
          paymentId: orderCreated.payment_id,
          totalPrice: orderCreated.total_price,
          returnUrl: 'http://localhost:5173/payment/vnpay-return',
        };

        const paymentRes = await payment(paymentData);
        if (paymentRes && paymentRes.success) {
          window.location.href = paymentRes.paymentUrl;
        } else {
          message.error('Thanh toán không thành công, vui lòng thử lại.');
        }
      } else {
        message.error('Tạo đơn hàng không thành công, vui lòng thử lại.');
      }
    } catch (error) {
      message.error('Đặt hàng thất bại, vui lòng thử lại.');
    }
  };

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
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className='rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-md font-medium text-gray-600'>
            Số điện thoại nhận hàng
          </label>
          <Input
            placeholder='Nhập số điện thoại của bạn...'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
        <div className='mb-6'>
          <label className='block text-md font-medium text-gray-600'>
            Chọn phương thức thanh toán
          </label>
          <Select
            value={paymentMethod}
            onChange={setPaymentMethod}
            defaultValue='credit_card'
            className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
            placeholder='Chọn phương thức thanh toán'
          >
            <Select.Option value='vnpay'>Ví VNPay</Select.Option>
            <Select.Option value='cod'>Thanh toán khi nhận hàng</Select.Option>
          </Select>
        </div>
        <div className='flex justify-between text-lg text-gray-700'>
          <span>Tạm tính:</span>
          <span
            className={`font-semibold ${
              discountedTotalPrice < totalPrice
                ? 'line-through text-gray-500'
                : ''
            }`}
          >
            {formatCurrency(totalPrice)}
          </span>
        </div>
        <div className='flex justify-between text-xl font-semibold text-gray-800 mt-2'>
          <span>Tổng cộng:</span>
          {discountedTotalPrice < totalPrice ? (
            <span className='text-red-600'>
              {formatCurrency(discountedTotalPrice || totalPrice)}
            </span>
          ) : (
            <span className='text-red-600'>{formatCurrency(totalPrice)}</span>
          )}
        </div>

        <Button
          type='primary'
          className='w-full mt-6 py-3 text-lg font-semibold bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300'
          size='large'
          onClick={handleContinue}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default CartOptions;
