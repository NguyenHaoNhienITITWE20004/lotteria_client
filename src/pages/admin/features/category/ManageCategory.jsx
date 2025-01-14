import React, { useEffect, useState } from 'react';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../../../../service/category';
import { products } from '../../../../service/product';
import { message, Table, Button, Popconfirm, Collapse, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryModal from './CategoryModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../../redux/slice/modal';
import { ModalTypes } from '../../../../constant/modal';

const { Panel } = Collapse;

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsByCategory, setProductsByCategory] = useState({});
  const dispatch = useDispatch();
  const categoryModal = useSelector(
    (state) => state.modal.modals[ModalTypes.CATEGORY],
  );
  const { content } = categoryModal;

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const categoryRes = await getCategories();
      if (categoryRes && categoryRes.success) {
        setCategories(
          categoryRes.data.map((category) => ({
            ...category,
            key: category.id,
          })),
        );
      }
    } catch (error) {
      message.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const productRes = await products(1, 10, '', categoryId);
      if (productRes && productRes.success) {
        setProductsByCategory((prev) => ({
          ...prev,
          [categoryId]: productRes.data,
        }));
      }
    } catch (error) {
      message.error('Failed to load products');
    }
  };

  const handleModalOK = async (category) => {
    try {
      if (content) {
        const updatedCategory = await updateCategory(content.id, category);
        if (updatedCategory.success) {
          message.success('Category updated successfully!');
        } else {
          message.error(
            updatedCategory.message ||
              'An error occurred while updating the category',
          );
        }
      } else {
        const newCategory = await createCategory(category);
        if (newCategory.success) {
          message.success('Category created successfully!');
        } else {
          message.error(
            newCategory.message ||
              'An error occurred while creating the category',
          );
        }
      }
      const categoryRes = await getCategories();
      if (categoryRes && categoryRes.success) {
        setCategories(
          categoryRes.data.map((category) => ({
            ...category,
            key: category.id,
          })),
        );
      }
      dispatch(closeModal({ name: ModalTypes.CATEGORY }));
      fetchCategory();
    } catch (error) {
      console.log(error);
      message.error('Có lỗi xảy ra');
    }
  };

  const handleAddCategory = () => {
    dispatch(openModal({ name: ModalTypes.CATEGORY, content: null }));
  };

  const handleEditCategory = (category) => {
    dispatch(openModal({ name: ModalTypes.CATEGORY, content: category }));
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);

      if (response.success) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId),
        );
        message.success('Category deleted successfully');
      } else {
        message.error('Failed to delete category');
      }
    } catch (error) {
      console.error(error);
      message.error('An error occurred while deleting the category');
    }
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className='flex space-x-2'>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record)}
            className='text-blue-500'
          />
          <Popconfirm
            title={
              <div>
                <p className='font-semibold text-red-600'>
                  Are you sure you want to delete this category?
                </p>
                <p className='text-sm text-gray-500'>
                  This category may contain products. Deleting it will also
                  remove all products within this category. This action cannot
                  be undone.
                </p>
              </div>
            }
            onConfirm={() => handleDeleteCategory(record.id)}
            okText='Yes, Delete'
            cancelText='Cancel'
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} className='text-red-500'>
              Delete Category
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Manage Categories</h2>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        rowKey='key'
        pagination={{ pageSize: 10 }}
        expandable={{
          expandedRowRender: (record) => {
            if (!productsByCategory[record.id]) {
              fetchProductsByCategory(record.id);
            }
            return (
              <Collapse>
                <Panel header='Products' key='1'>
                  <ul className='space-y-4'>
                    {productsByCategory[record.id] ? (
                      productsByCategory[record.id].map((product) => (
                        <li
                          key={product.id}
                          className='flex items-center space-x-4'
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className='w-20 h-20 object-cover'
                          />
                          <div>
                            <p className='font-semibold'>{product.name}</p>
                            <p className='text-gray-500'>
                              {product.description}
                            </p>
                            <p className='font-bold text-red-500'>{`₫${product.price.toLocaleString()}`}</p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <Spin />
                    )}
                  </ul>
                </Panel>
              </Collapse>
            );
          },
        }}
      />
      <CategoryModal onOk={handleModalOK} />
    </div>
  );
};

export default ManageCategory;
