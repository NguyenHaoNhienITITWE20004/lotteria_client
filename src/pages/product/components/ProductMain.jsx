import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../service/product';
import { Button, InputNumber, Skeleton, Row, Col, Card } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { formatCurrencyVND } from '../../../util/format';

const ProductMain = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRes = await getProductById(id);
      if (productRes && productRes.success) {
        setProduct(productRes.product);
      } else {
        setProduct(null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

<<<<<<< HEAD
  const handleOptionChange = (optionId, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  const calculatePrice = () => {
    let price = product.price;

    product.productOptions.forEach((option) => {
      const selectedValue = selectedOptions[option.option.id];
      if (selectedValue && option.option.value === selectedValue) {
        price += option.option.additional_price;
      }
    });

    return price;
  };

  const handleClick = () => {
    const price = calculatePrice();
    dispatch(
      addItemToCart({
        ...product,
        quantity,
        selectedOptions,
        price,
      }),
    );
  };

=======
>>>>>>> parent of c480a32 (feat : options)
  if (loading) {
    return (
      <div className='max-w-screen-xl mx-auto p-4'>
        <Skeleton active />
      </div>
    );
  }

  const groupedOptions = product.productOptions.reduce((acc, productOption) => {
    const optionName = productOption.option.name;
    if (!acc[optionName]) {
      acc[optionName] = [];
    }
    acc[optionName].push(productOption);
    return acc;
  }, {});

  return (
    <div className='container mx-auto my-[100px]'>
      <Row gutter={16}>
        <Col xs={24} md={12} className='flex flex-col h-full'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full  rounded-lg '
          />
        </Col>

        <Col xs={24} md={12} className='flex flex-col h-[50vh]'>
          <Card className='p-6 shadow-lg flex-grow'>
            <div className='text-3xl font-semibold text-gray-800'>
              {product.name}
            </div>
            <div className='mt-4 text-sm text-gray-600'>
              {product.description}
            </div>
            <div className='mt-4 text-xl font-semibold text-red-600'>
              {formatCurrencyVND(product.price)} VND
            </div>
            <div className='pt-10'>
              <div className='mb-2 text-sm font-semibold text-gray-700'>
                Số lượng
              </div>
              <div className='inline-flex items-center space-x-2'>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() =>
                    handleQuantityChange(Math.max(1, quantity - 1))
                  }
                  type='primary'
                  size='small'
                />
                <InputNumber
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className='w-24 mt-4'
                  style={{ marginBottom: 16 }}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() =>
                    handleQuantityChange(Math.min(product.stock, quantity + 1))
                  }
                  type='primary'
                  size='small'
                />
              </div>
            </div>
<<<<<<< HEAD
            {Object.keys(groupedOptions).map((optionName) => (
              <div key={optionName} className='mt-4'>
                <div className='mb-2 text-sm font-semibold text-gray-700'>
                  {optionName}
                </div>
                <Select
                  value={selectedOptions[optionName] || undefined}
                  onChange={(value) => handleOptionChange(optionName, value)}
                  className='w-full'
                >
                  {groupedOptions[optionName].map((productOption) => (
                    <Select.Option
                      key={productOption.option.id}
                      value={productOption.option.value}
                    >
                      {productOption.option.value} (+
                      {formatCurrency(
                        productOption.option.additional_price,
                      )}{' '}
                      VND)
                    </Select.Option>
                  ))}
                </Select>
              </div>
            ))}

=======
>>>>>>> parent of c480a32 (feat : options)
            <div className='px-[50px]'>
              <Button
                type='primary'
                size='large'
                className='w-full bg-red-500 hover:bg-red-600 text-white mt-12'
                onClick={() => {
                  console.log(
                    `Added ${quantity} item(s) of ${product.name} to the cart`,
                  );
                }}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                type='primary'
                size='large'
                className='w-full mt-5'
                onClick={() => {
                  console.log(
                    `Added ${quantity} item(s) of ${product.name} to the cart`,
                  );
                }}
              >
                Mua Ngay
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductMain;
