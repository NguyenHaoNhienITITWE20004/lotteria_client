import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  createProduct,
  deleteProduct,
  editProduct,
  products,
} from '../../../../service/product';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../../redux/slice/modal';
import { ModalTypes } from '../../../../constant/modal';
import moment from 'moment';
import ProductModal from './ProductModal';
import { formatCurrencyVND } from '../../../../util/format';

const ManageProduct = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const productModal = useSelector(
    (state) => state.modal.modals[ModalTypes.PRODUCT],
  );
  const { content } = productModal;
  const [searchText, setSearchText] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productRes = await products();
      if (productRes.success && productRes) {
        const productsData = productRes.data;
        setData(
          productsData.map((product) => ({
            ...product,
            key: product.id,
          })),
        );
      } else {
        setData([]);
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(data);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleCreate = () => {
    dispatch(openModal({ name: ModalTypes.PRODUCT, content: null }));
  };

  const handleEdit = async (product) => {
    dispatch(openModal({ name: ModalTypes.PRODUCT, content: product }));
  };

  const handleModalOk = async (formData) => {
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      setLoading(true);

      if (content) {
        const productEdit = await editProduct(content.id, formData);
        if (productEdit.success) {
          message.success(
            productEdit.message || 'product updated successfully!',
          );
        } else {
          message.error(
            productEdit.message ||
              'An error occurred while updating the product',
          );
        }
      } else {
        const imageFile = formData.get('image');
        if (!imageFile) {
          console.error('No image file selected');
          message.error('Vui lòng chọn ảnh sản phẩm!');
          return;
        }
        const newProduct = await createProduct(formData);
        if (newProduct.success) {
          message.success('Product created successfully!');
          setLoading(false);
        } else {
          message.error(
            newProduct.message ||
              'An error occurred while creating the product',
          );
        }
      }
      fetchProducts();
      dispatch(closeModal({ name: ModalTypes.PRODUCT }));
    } catch (error) {
      console.log(error);
      message.error('Có gì đó sai sai ');
    }
  };

  const handleDelete = async (key) => {
    try {
      await deleteProduct(key);
      message.success('User deleted successfully!');
      fetchProducts();
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const columns = [
    {
      title: 'No.',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) => record.name.toLowerCase().includes(value),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (imageUrl) => (
        <img src={imageUrl} alt='user image' className='w-20 object-cover' />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <p className='text-red-600 font-medium'>{formatCurrencyVND(price)}</p>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category_name',
      render: (category) => category?.name || 'N/A',
      sorter: (a, b) => a.category?.name.localeCompare(b.category?.name),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => {
        return <div>{moment(created_at).format('YYYY-MM-DD')}</div>;
      },
      sorter: (a, b) =>
        moment(a.created_at).unix() - moment(b.created_at).unix(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='small'>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className='text-blue-500'
          >
            Edit
          </Button>
          <Popconfirm
            title='Are you sure you want to delete this product?'
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
      <h2 className='text-2xl font-bold mb-4'>Manage Products</h2>

      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Search by product name or category'
          className='w-1/3'
          onChange={handleSearch}
        />
        <Button type='primary' icon={<PlusOutlined />} onClick={handleCreate}>
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchText) ||
            item.category.name.toLowerCase().includes(searchText)
          );
        })}
        pagination={{ pageSize: 10 }}
        loading={loading}
        rowKey={(record) => record.key}
      />
      <ProductModal loading={loading} onOk={handleModalOk} />
    </div>
  );
};

export default ManageProduct;
