import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../../../constant/modal';
import { closeModal } from '../../../../redux/slice/modal';

const CategoryModal = ({ onOk }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const categoryModal = useSelector(
    (state) => state.modal.modals[ModalTypes.CATEGORY],
  );
  const { isOpen, content } = categoryModal;
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
      onOk(values);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      open={isOpen}
      title={content ? 'Edit Category' : 'Add Category'}
      onCancel={() => dispatch(closeModal({ name: ModalTypes.CATEGORY }))}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Category Name'
          name='name'
          rules={[
            { required: true, message: 'Please input the category name!' },
          ]}
        >
          <Input placeholder='Enter category name' />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          rules={[
            {
              required: true,
              message: 'Please input the category description!',
            },
          ]}
        >
          <Input.TextArea placeholder='Enter category description' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
