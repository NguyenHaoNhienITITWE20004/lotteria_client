import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../../../constant/modal';
import { closeModal } from '../../../../redux/slice/modal';
import { createUser, editUser } from '../../../../service/user';

const { Option } = Select;

const OrderModal = ({ onOk }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const orderModal = useSelector(
    (state) => state.modal.modals[ModalTypes.ORDER],
  );
  const { isOpen, content } = orderModal;

  const deliveryStatusOptions = [
    'Pending',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  const paymentStatusOptions = [
    'Pending',
    'Completed',
    'Failed',
    'Refunded',
    'Cancelled',
  ];

  const isPaymentStatusDisabled =
    content?.payments?.[0]?.status === 'Completed' ||
    content?.payments?.[0]?.status === 'Cancelled';

  useEffect(() => {
    if (content) {
      form.setFieldsValue({
        ...content,
        status: content.deliveries?.[0]?.status || 'Pending',
        paymentStatus: content.payments?.[0]?.status || 'Pending',
      });
    } else {
      form.resetFields();
    }
  }, [content, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      open={isOpen}
      title={content ? 'Edit Order' : 'Add Order'}
      onCancel={() => dispatch(closeModal({ name: ModalTypes.ORDER }))}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Delivery Status'
          name='status'
          rules={[
            { required: true, message: 'Please select the delivery status' },
          ]}
        >
          <Select placeholder='Select delivery status'>
            {deliveryStatusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Payment Status'
          name='paymentStatus'
          rules={[
            { required: true, message: 'Please select the payment status' },
          ]}
        >
          <Select
            placeholder='Select payment status'
            disabled={isPaymentStatusDisabled}
          >
            {paymentStatusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrderModal;
