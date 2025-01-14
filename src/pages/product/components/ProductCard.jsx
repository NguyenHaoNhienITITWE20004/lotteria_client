/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Card, message, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { formatCurrencyVND } from '../../../util/format';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../redux/slice/cart';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { Meta } = Card;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItemToCart(product));
    message.success('Đã thêm sản phẩm vào giỏ hàng');
    console.log(123);
  };

  return (
    <div className='max-w-xs mx-auto my-4'>
      <Card
        hoverable
        onClick={handleClick}
        style={{ borderRadius: '15px' }}
        cover={
          <img
            alt={product.name}
            src={product.image}
            className='w-full h-48 object-cover rounded-lg'
          />
        }
      >
        <Meta
          title={<div className='text-xl font-semibold'>{product.name}</div>}
          description={
            <div className='mt-2 text-sm text-gray-600'>
              <div>{product.category.name}</div>
              <div className='flex items-center justify-between'>
                <div className='mt-1 text-lg font-semibold text-red-600'>
                  {formatCurrencyVND(product.price)} VND
                </div>
                <div className='mt-2'>
                  <Tooltip title='Thêm vào giỏ hàng'>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={(e) => handleAddToCart(e, product)}
                      className='bg-red-400 text-white hover:bg-red-600'
                      size='large'
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ProductCard;
