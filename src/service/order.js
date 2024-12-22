import apiClient from '../config/axios.config';

const createOrder = async (orderData) => {
  try {
    const res = await apiClient.post('/api/order/', orderData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrders = async () => {
  try {
    const res = await apiClient.get('/api/order/');
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrderById = async (orderId) => {
  try {
    const res = await apiClient.get(`/api/order/${orderId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrderByUser = async (userId) => {
  try {
    const res = await apiClient.get(`/api/order/user/${userId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const updateOrder = async (orderData) => {
  try {
    const res = await apiClient.patch('/api/order/', orderData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { createOrder, getOrderById, getOrderByUser, getOrders, updateOrder };
