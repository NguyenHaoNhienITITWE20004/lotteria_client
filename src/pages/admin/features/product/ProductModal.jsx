/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Input, message, Modal, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../../../constant/modal';
import { closeModal } from '../../../../redux/slice/modal';
import { getCategories } from '../../../../service/category';
import { Loading } from '../../../../components/loading';

const ProductModal = ({ onOk, loading }) => {
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const productModal = useSelector(
    (state) => state.modal.modals[ModalTypes.PRODUCT],
  );

  const { isOpen, content } = productModal;

  const fetchCategory = async () => {
    try {
      const categoryRes = await getCategories();
      if (categoryRes?.success) {
        setCategories(categoryRes.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message || 'Failed to fetch categories',
      );
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (content) {
      form.setFieldsValue({
        name: content.name,
        price: content.price,
        description: content.description,
        stock: content.stock,
        category: content.category_id,
      });

      if (content.image) {
        setFileList([
          {
            uid: '-1',
            name: `${content.name}.png`,
            status: 'done',
            thumbUrl: content.image,
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [content, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('stock', values.stock);
      formData.append('category_id', values.category);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }
      onOk(formData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <Modal
      open={isOpen}
      title={content ? 'Edit Product' : 'Add Product'}
      onCancel={() => dispatch(closeModal({ name: ModalTypes.PRODUCT }))}
      onOk={handleOk}
      className='mt-10 min-w-[500px]'
    >
      {loading && <Loading />}
      <Form form={form} layout='vertical' className='px-4'>
        <Form.Item
          label='Product Name'
          name='name'
          rules={[
            { required: true, message: 'Please input the product name!' },
          ]}
        >
          <Input placeholder='Enter product name' />
        </Form.Item>

        <Form.Item
          label='Price'
          name='price'
          rules={[
            { required: true, message: 'Please input the product price!' },
          ]}
        >
          <Input type='number' placeholder='Enter product price' />
        </Form.Item>

        <Form.Item
          label='Description'
          name='description'
          rules={[
            {
              required: true,
              message: 'Please input the product description!',
            },
          ]}
        >
          <Input.TextArea placeholder='Enter product description' />
        </Form.Item>

        <Form.Item
          label='Stock'
          name='stock'
          rules={[
            { required: true, message: 'Please input the stock quantity!' },
          ]}
        >
          <Input type='number' placeholder='Enter stock quantity' />
        </Form.Item>

        <Form.Item
          label='Category'
          name='category'
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder='Select a category'>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Image'
          name='image'
          rules={[
            {
              required: fileList.length === 0 && !content?.image,
              message: 'Please upload product image!',
            },
          ]}
        >
          <Upload
            listType='picture'
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleFileChange}
            maxCount={1}
          >
            <Button
              className='bg-blue-500 text-white'
              icon={<UploadOutlined />}
            >
              Upload Image
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
