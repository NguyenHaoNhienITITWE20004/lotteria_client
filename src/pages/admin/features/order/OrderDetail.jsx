import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../../service/order';
import {
  Card,
  Descriptions,
  Button,
  Row,
  Col,
  Tag,
  Select,
  message,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { formatCurrencyVND } from '../../../../util/format';
import { updateDelivery } from '../../../../service/delivery';

const { Option } = Select;

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [deliveryId, setDeliveryId] = useState('');

  const fetchOrder = useCallback(async () => {
    try {
      const orderRes = await getOrderById(id);
      if (orderRes && orderRes.success) {
        setOrder(orderRes.order);
        if (orderRes.order.deliveries && orderRes.order.deliveries[0]) {
          setDeliveryStatus(orderRes.order.deliveries[0].status);
          setDeliveryId(orderRes.order.deliveries[0].id);
        }
        if (orderRes.order.payments && orderRes.order.payments[0]) {
          setPaymentStatus(orderRes.order.payments[0].status);
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleStatusChange = async (type, value) => {
    console.log(type, value);
    const updatedOrder = {
      status: value,
    };
    console.log(updatedOrder);
    const deliveryRes = await updateDelivery(deliveryId, updatedOrder);
    if (deliveryRes.success) {
      message.success('Order status updated successfully!');
      setDeliveryStatus(deliveryRes.status);
      fetchOrder();
    } else {
      message.error('Failed to update order status!');
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <Card title='Order Details' bordered={false} className='shadow-md'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <Descriptions title='Order Information' column={1} bordered>
              <Descriptions.Item label='Order ID'>
                #{order.id}
              </Descriptions.Item>
              <Descriptions.Item label='User'>
                {order.user?.username}
              </Descriptions.Item>
              <Descriptions.Item label='Phone'>
                {order.user?.phone}
              </Descriptions.Item>
              <Descriptions.Item label='Email'>
                {order.user?.email}
              </Descriptions.Item>
              <Descriptions.Item label='Total Price'>
                <p className='text-red-500 text-base'>
                  {order.total_price?.toLocaleString()} VND
                </p>
              </Descriptions.Item>
              <Descriptions.Item label='Status'>
                <Tag color={order.status === 'pending' ? 'yellow' : 'green'}>
                  {order.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label='Delivery Status'>
                <Select
                  value={deliveryStatus}
                  onChange={(value) =>
                    handleStatusChange('delivery_status', value)
                  }
                >
                  <Option value='pending'>Pending</Option>
                  <Option value='delivering'>Delivering</Option>
                  <Option value='delivered'>Delivered</Option>
                  <Option value='canceled'>Canceled</Option>
                </Select>
              </Descriptions.Item>
              <Descriptions.Item label='Payment Status'>
                <Select
                  value={paymentStatus}
                  onChange={(value) =>
                    handleStatusChange('payment_status', value)
                  }
                >
                  <Option value='paid'>Paid</Option>
                  <Option value='unpaid'>Unpaid</Option>
                </Select>
              </Descriptions.Item>
            </Descriptions>
            <Button type='primary' icon={<EditOutlined />} className='mt-4'>
              Edit Order
            </Button>
          </div>

          <div className='space-y-6'>
            <h3 className='text-xl font-semibold'>Products in this Order</h3>
            {order.orderDetails?.map((item) => (
              <Card key={item.id} className='shadow-lg p-4'>
                <Row gutter={16}>
                  <Col span={6}>
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className='w-32 object-cover rounded-md'
                    />
                  </Col>
                  <Col span={18}>
                    <h4 className='text-lg font-bold'>{item.product?.name}</h4>
                    <p>{item.product?.description}</p>
                    <Row gutter={8} className='mt-2'>
                      <Col>
                        <strong>Quantity: </strong>
                        {item.quantity}
                      </Col>
                    </Row>
                    <Row className='mt-2'>
                      <Col>
                        <strong>Total: </strong>
                        <span className='text-red-500 text-base'>
                          {formatCurrencyVND(item.price)}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;
