import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { Column } from '@ant-design/charts';

const HomeAdminScreen = () => {
  // Dữ liệu mẫu cho các chart
  const orderData = [
    { month: 'Jan', value: 200 },
    { month: 'Feb', value: 450 },
    { month: 'Mar', value: 350 },
    { month: 'Apr', value: 500 },
    { month: 'May', value: 800 },
    { month: 'Jun', value: 300 },
  ];

  const productData = [
    { category: 'Electronics', value: 50 },
    { category: 'Clothing', value: 120 },
    { category: 'Toys', value: 80 },
    { category: 'Furniture', value: 45 },
    { category: 'Books', value: 90 },
  ];

  const userData = [
    { role: 'Admin', value: 5 },
    { role: 'Staff', value: 15 },
    { role: 'Customer', value: 200 },
  ];

  // Các cấu hình cho charts
  const orderChartConfig = {
    data: orderData,
    xField: 'month',
    yField: 'value',
    columnWidthRatio: 0.5,
    label: { visible: true, position: 'middle' },
    meta: {
      month: { alias: 'Month' },
      value: { alias: 'Orders' },
    },
  };

  const productChartConfig = {
    data: productData,
    xField: 'category',
    yField: 'value',
    columnWidthRatio: 0.5,
    label: { visible: true, position: 'middle' },
    meta: {
      category: { alias: 'Category' },
      value: { alias: 'Products' },
    },
  };

  const userChartConfig = {
    data: userData,
    xField: 'role',
    yField: 'value',
    columnWidthRatio: 0.5,
    label: { visible: true, position: 'middle' },
    meta: {
      role: { alias: 'Role' },
      value: { alias: 'Users' },
    },
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title='Số lượng đơn hàng'
            bordered={false}
            className='shadow-lg'
          >
            <Column {...orderChartConfig} />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title='Số lượng sản phẩm theo danh mục'
            bordered={false}
            className='shadow-lg'
          >
            <Column {...productChartConfig} />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title='Số lượng người dùng theo vai trò'
            bordered={false}
            className='shadow-lg'
          >
            <Column {...userChartConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomeAdminScreen;
