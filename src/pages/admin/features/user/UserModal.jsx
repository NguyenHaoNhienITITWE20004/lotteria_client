import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../../../constant/modal';
import { closeModal } from '../../../../redux/slice/modal';
import { createUser, editUser } from '../../../../service/user';

const UserModal = ({ onOk }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userModal = useSelector((state) => state.modal.modals[ModalTypes.USER]);
  const { isOpen, content } = userModal;

  useEffect(() => {
    if (content) {
      form.setFieldsValue(content);
    } else {
      form.resetFields();
    }
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
      title={content ? 'Edit User' : 'Add User'}
      onCancel={() => dispatch(closeModal({ name: ModalTypes.USER }))}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
          <Input placeholder='Enter username' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'Invalid email format!' },
          ]}
        >
          <Input placeholder='Enter email' />
        </Form.Item>
        <Form.Item
          label='Phone'
          name='phone'
          rules={[
            { required: true, message: 'Please input the phone number!' },
          ]}
        >
          <Input placeholder='Enter phone' />
        </Form.Item>
        <Form.Item
          type='password'
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input placeholder='Enter phone' />
        </Form.Item>

        <Form.Item
          label='Role'
          name='roleId'
          rules={[{ required: true, message: 'Please select the role!' }]}
        >
          <Select>
            <Select.Option value={1}>Customer</Select.Option>
            <Select.Option value={2}>Owner</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
