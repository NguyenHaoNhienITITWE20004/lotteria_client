import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Tag, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import UserModal from './UserModal';
import {
  createUser,
  deleteUser,
  editUser,
  users,
} from '../../../../service/user';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../../redux/slice/modal';
import { ModalTypes } from '../../../../constant/modal';
import { formatDate } from '../../../../util/format';

const ManageUser = () => {
  const userModal = useSelector((state) => state.modal.modals[ModalTypes.USER]);
  const { content } = userModal;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userRes = await users();
      console.log(userRes);
      if (userRes.success && userRes) {
        const users = userRes.users;
        setData(
          users.map((user) => ({
            ...user,
            key: user.id,
          })),
        );
        setLoading(false);
      } else {
        setData([]);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleDelete = async (key) => {
    try {
      await deleteUser(key);
      message.success('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleEdit = (user) => {
    dispatch(openModal({ name: ModalTypes.USER, content: user }));
  };

  const handleCreate = () => {
    dispatch(openModal({ name: ModalTypes.USER, content: null }));
  };

  const handleModalOk = async (userData) => {
    try {
      setLoading(true);
      if (content) {
        const userEdit = await editUser(content.id, userData);
        if (userEdit.success) {
          message.success('User updated successfully!');
        } else {
          message.error(
            userEdit.message || 'An error occurred while updating the user',
          );
        }
      } else {
        const newUser = await createUser(userData);
        if (newUser.success) {
          message.success('User created successfully!');
        } else {
          message.error(
            newUser.message || 'An error occurred while creating the user',
          );
        }
      }
      dispatch(closeModal({ name: ModalTypes.USER }));
      fetchUsers();
    } catch (error) {
      console.log(error);
      message.error('Có gì đó sai sai');
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.username.toLowerCase().includes(value),
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text) => <span className='font-semibold'>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filteredValue: [searchText],
      onFilter: (value, record) => record.email.toLowerCase().includes(value),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role_id',
      key: 'role_id',
      render: (role_id) => {
        const roleMap = { 1: 'Customer', 2: 'Owner' };
        const color = role_id === 2 ? 'red' : 'blue';
        return <Tag color={color}>{roleMap[role_id]}</Tag>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => {
        return <div>{formatDate(created_at)}</div>;
      },
      filters: [
        { text: 'today', value: 'last1' },
        { text: 'Last 7 Days', value: 'last7' },
        { text: 'Last 30 Days', value: 'last30' },
        { text: 'This Month', value: 'thisMonth' },
        { text: 'Last Month', value: 'lastMonth' },
      ],
      sorter: (a, b) =>
        moment(a.created_at).unix() - moment(b.created_at).unix(),
      onFilter: (value, record) => {
        console.log(value);
        const createdAt = moment(record.created_at);
        switch (value) {
          case 'last1':
            console.log(123);
            return createdAt.isAfter(moment().subtract(1, 'days'));
          case 'last7':
            return createdAt.isAfter(moment().subtract(7, 'days'));
          case 'last30':
            return createdAt.isAfter(moment().subtract(30, 'days'));
          case 'thisMonth':
            return createdAt.isSame(moment(), 'month');
          case 'lastMonth':
            return createdAt.isSame(moment().subtract(1, 'month'), 'month');
          default:
            return true;
        }
      },
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
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Manage Users</h2>

      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Search by username or email'
          className='w-1/3'
          onChange={handleSearch}
        />
        <Button type='primary' icon={<PlusOutlined />} onClick={handleCreate}>
          Add User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data.filter(
          (item) =>
            item.username.toLowerCase().includes(searchText) ||
            item.email.toLowerCase().includes(searchText),
        )}
        pagination={{ pageSize: 5 }}
        loading={loading}
        rowKey={(record) => record.key}
      />

      <UserModal onOk={handleModalOk} />
    </div>
  );
};

export default ManageUser;
