import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Input, Space, Popconfirm, message } from 'antd';
import {
  createDiscount,
  deleteDiscount,
  getDiscounts,
  updateDiscount,
} from '../../../../service/discount';
import { closeModal, openModal } from '../../../../redux/slice/modal';
import { ModalTypes } from '../../../../constant/modal';
import { formatDate } from '../../../../util/format';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DiscountModal from './DiscountModal';

const ManageDiscount = () => {
  const dispatch = useDispatch();
  const [discounts, setDiscounts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const discountModal = useSelector(
    (state) => state.modal.modals[ModalTypes.DISCOUNT],
  );
  const { content } = discountModal;

  const fetchDiscounts = async () => {
    const discountRes = await getDiscounts();
    if (discountRes.success) {
      setDiscounts(discountRes.data);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredDiscounts = discounts.filter(
    (discount) =>
      discount.title.toLowerCase().includes(searchText.toLowerCase()) ||
      discount.discount_code.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleEdit = (discount) => {
    const products = discount.productDiscounts.map((item) => item.product_id);
    const users = discount.userDiscounts.map((item) => item.user_id);

    dispatch(
      openModal({
        name: ModalTypes.DISCOUNT,
        content: {
          ...discount,
          products,
          users,
        },
      }),
    );
  };
  const handleDelete = async (key) => {
    try {
      await deleteDiscount(key);
      message.success('User deleted successfully!');
      fetchDiscounts();
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleModalOk = async (discountData) => {
    console.log(discountData);
    try {
      if (content) {
        const updatedDiscount = await updateDiscount(content.id, discountData);
        if (updatedDiscount.success) {
          message.success('Discount updated successfully!');
          dispatch(closeModal({ name: ModalTypes.DISCOUNT }));
          fetchDiscounts();
        } else {
          message.error('Failed to update discount');
        }
      } else {
        const newDiscount = await createDiscount(discountData);
        if (newDiscount.success) {
          message.success('Discount added successfully!');
          fetchDiscounts();
        } else {
          message.error('Failed to add discount');
        }
      }
      dispatch(closeModal({ name: ModalTypes.DISCOUNT }));
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      title: 'No',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Discount Code',
      dataIndex: 'discount_code',
      key: 'discount_code',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (type === 'percent' ? 'Percentage' : 'Fixed Amount'),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (start_date) => (
        <div style={{ fontWeight: 'bold', color: '#007bff' }}>
          {formatDate(start_date)}
        </div>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (end_date) => (
        <div style={{ fontWeight: 'bold', color: '#e63946' }}>
          {formatDate(end_date)}
        </div>
      ),
    },
    {
      title: 'Products',
      key: 'products',
      render: (_, record) => (
        <div>
          {record.productDiscounts.map((product) => (
            <div key={product.id} className='flex items-center mb-2'>
              <img
                src={product.product.image}
                alt={product.product.name}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: 'cover',
                  marginRight: 10,
                }}
              />
              <div>
                <div>
                  <strong>{product.product.name}</strong>
                </div>
                <div>Price: {product.product.price.toLocaleString()} VND</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Users',
      key: 'users',
      render: (_, record) => (
        <div>
          {record.userDiscounts.map((user) => (
            <div key={user.id} className='mb-2'>
              <div>User Name: {user.user.username}</div>
            </div>
          ))}
        </div>
      ),
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
          <Popconfirm
            title='Are you sure you want to delete this user?'
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

  return (
    <div style={{ padding: '20px' }}>
      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Search by Title or Discount Code'
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '300px' }}
        />
        <Button
          type='primary'
          onClick={() =>
            dispatch(
              openModal({
                name: ModalTypes.DISCOUNT,
                content: {},
              }),
            )
          }
          icon={<PlusOutlined />}
        >
          Add Discount
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredDiscounts}
        rowKey='id'
        pagination={{ pageSize: 10 }}
        style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
      />
      <DiscountModal onOk={handleModalOk} />
    </div>
  );
};

export default ManageDiscount;
