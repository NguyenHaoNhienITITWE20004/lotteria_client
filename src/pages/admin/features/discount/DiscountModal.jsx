import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../../../constant/modal';
import { closeModal } from '../../../../redux/slice/modal';
import moment from 'moment';
import { updateDiscount, createDiscount } from '../../../../service/discount';
import { users } from '../../../../service/user';
import { products } from '../../../../service/product';

const DiscountModal = ({ onOk }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const discountModal = useSelector(
    (state) => state.modal.modals[ModalTypes.DISCOUNT],
  );
  const { isOpen, content } = discountModal;

  const [userOptions, setUserOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    console.log(content);
    if (content) {
      form.setFieldsValue({
        title: content.title,
        discount_code: content.discount_code,
        value: content.value,
        start_date: moment(content.start_date),
        end_date: moment(content.end_date),
        type: content.type,
        user_ids: content.users || [],
        product_ids: content.products || [],
      });
    } else {
      form.resetFields();
    }

    const fetchUsersAndProducts = async () => {
      try {
        const userData = await users();
        if (userData.success) {
          setUserOptions(
            userData.users.map((user) => ({
              value: user.id,
              label: user.username,
            })),
          );
        }

        const productData = await products();
        if (productData.success) {
          setProductOptions(
            productData.data.map((product) => ({
              value: product.id,
              label: product.name,
            })),
          );
        }
      } catch (err) {
        console.error('Error fetching users or products:', err);
      }
    };

    fetchUsersAndProducts();
  }, [content, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      onOk(values);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Modal
      open={isOpen}
      title={content ? 'Edit Discount' : 'Add Discount'}
      onCancel={() => dispatch(closeModal({ name: ModalTypes.DISCOUNT }))}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='title'
          label='Discount Title'
          rules={[{ required: true, message: 'Please input discount title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='discount_code'
          label='Discount Code'
          rules={[{ required: true, message: 'Please input discount code!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='value'
          label='Discount Value'
          rules={[{ required: true, message: 'Please input discount value!' }]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          name='type'
          label='Discount Type'
          rules={[{ required: true, message: 'Please select discount type!' }]}
        >
          <Select>
            <Select.Option value='percent'>Percent</Select.Option>
            <Select.Option value='fixed'>Fixed Amount</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='start_date'
          label='Start Date'
          rules={[{ required: true, message: 'Please select start date!' }]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          name='end_date'
          label='End Date'
          rules={[{ required: true, message: 'Please select end date!' }]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          name='user_ids'
          label='Select Users'
          rules={[
            { required: true, message: 'Please select at least one user!' },
          ]}
        >
          <Select
            mode='multiple'
            placeholder='Select Users'
            options={userOptions}
          />
        </Form.Item>

        <Form.Item
          name='product_ids'
          label='Select Products'
          rules={[
            { required: true, message: 'Please select at least one product!' },
          ]}
        >
          <Select
            mode='multiple'
            placeholder='Select Products'
            options={productOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DiscountModal;
