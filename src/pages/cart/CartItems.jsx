/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  removeItemFromCart,
  updateItemQuantity,
  updateNote,
} from '../../redux/slice/cart';

const CartItems = ({ cartItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [note, setNote] = useState('');

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeItemFromCart(itemId));
    }
    dispatch(updateItemQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    dispatch(updateNote(newNote));
  };

  return (
    <div className='bg-white p-4 rounded shadow-md'>
      <div className='border-b pb-2 mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-semibold '>
          GIỎ HÀNG CỦA BẠN ({cartItems.length} sản phẩm)
        </h2>
        <div>
          <Button
            type='text'
            size='large'
            icon={<PlusOutlined />}
            onClick={() => navigate('/')}
            className='text-red-500'
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <div className='min-h-[300px] overflow-y-scroll'>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between space-y-10 mb-6'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-[120px] rounded'
            />
            <div className='flex-1 px-4 space-y-1'>
              <h3 className='font-medium text-base'>{item.name}</h3>
              <p className='text-red-500 text-base'>{item.price} ₫</p>
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                type='primary'
                icon={<MinusOutlined />}
                size='small'
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              />
              <Input
                size='small'
                className='w-[80px] py-[2px] text-center'
                min={1}
                value={item.quantity}
                type='number'
                onChange={(e) =>
                  handleUpdateQuantity(item.id, parseInt(e.target.value))
                }
              />
              <Button
                icon={<PlusOutlined />}
                size='small'
                type='primary'
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              />
            </div>
            <Button
              icon={<DeleteOutlined />}
              size='middle'
              type='text'
              className='mx-4'
              onClick={() => handleRemoveItem(item.id)}
            />
          </div>
        ))}
      </div>
      <div className='mt-6'>
        <Input.TextArea
          rows={2}
          value={note}
          onChange={handleNoteChange}
          placeholder='Ghi chú cho đơn hàng'
          className='rounded'
        />
      </div>
    </div>
  );
};

export default CartItems;
