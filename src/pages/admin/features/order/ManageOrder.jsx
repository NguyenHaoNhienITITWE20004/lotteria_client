import React, { useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Space, Table, Tag } from 'antd';
import { getOrders } from '../../../../service/order';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyVND } from '../../../../util/format';
import OrderModal from './OrderModal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../redux/slice/modal';
import { ModalTypes } from '../../../../constant/modal';

const ManageOrder = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const orderModal = useSelector(
    (state) => state.modal.modals[ModalTypes.ORDER],
  );
  const { content } = orderModal;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      const orderRes = await getOrders();
      if (orderRes && orderRes.success) {
        setOrders(orderRes.orders);
        setFilteredOrders(orderRes.orders);
      }
    };
    fetchOrders();
  }, []);

  const handleEdit = (order) => {
    dispatch(openModal({ name: ModalTypes.ORDER, content: order }));
  };

  const handleDelete = (key) => {};

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order.user?.username.toLowerCase().includes(query) ||
        order.user?.email.toLowerCase().includes(query),
    );
    setFilteredOrders(filtered);
  };

  const handleCreate = () => {
    dispatch(openModal({ name: ModalTypes.ORDER }));
  };

  const handleViewDetail = (id) => {
    navigate(`/admin/order/${id}`);
  };

  const columns = [
    {
      title: 'Order ID',
      width: 100,
      dataIndex: 'id',
      key: 'id',
      render: (id) => `#${id}`,
    },
    {
      title: 'Customer Name',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => record.user?.username || 'N/A',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => record.user?.phone || 'N/A',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => record.user?.email || 'N/A',
    },
    {
      title: 'Total Value',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => <div>{formatCurrencyVND(price)}</div>,
    },
    {
      title: 'Payment Status',
      width: 170,
      dataIndex: 'status',
      key: 'payments',
      render: (_, record) => {
        const color =
          record.payments[0].status === 'pending'
            ? 'yellow'
            : record.payments[0].status === 'failed'
            ? 'red'
            : 'green';
        return (
          <Tag color={color}>{record.payments[0]?.status.toUpperCase()}</Tag>
        );
      },
    },
    {
      title: 'Delivery Status',
      width: 170,
      dataIndex: 'status',
      key: 'payments',
      render: (_, record) => {
        const color =
          record.deliveries[0].status === 'delivering'
            ? 'yellow'
            : record.payments[0].status === 'cancelled'
            ? 'red'
            : 'green';
        return (
          <Tag color={color}>{record.deliveries[0].status.toUpperCase()}</Tag>
        );
      },
    },
    {
      title: 'Creation Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleString('en-US'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='link'
            icon={<EditOutlined />}
            className='text-blue-500'
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type='link'
            icon={<EyeOutlined />}
            className='text-green-500'
            onClick={() => handleViewDetail(record.id)}
          >
            View
          </Button>
          <Popconfirm
            title='Are you sure you want to delete this order?'
            onConfirm={() => handleDelete(record.key)}
            okText='Yes'
            cancelText='No'
          >
            <Button
              type='link'
              icon={<DeleteOutlined />}
              className='text-red-500'
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource = filteredOrders.map((order) => ({
    ...order,
    key: order.id,
  }));

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='bg-white p-4 shadow-md rounded-md'>
        <h1 className='text-xl font-semibold mb-4'>Manage Orders</h1>
        <div className='flex justify-between mb-4'>
          <Input
            placeholder='Search by username or email'
            className='w-1/3'
            onChange={handleSearch}
          />
          {/* <Button type='primary' icon={<PlusOutlined />} onClick={handleCreate}>
            Add Order
          </Button> */}
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={{ pageSize: 10 }}
        />
      </div>
      <OrderModal />
    </div>
  );
};

export default ManageOrder;
