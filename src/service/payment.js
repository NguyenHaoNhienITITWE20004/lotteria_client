import apiClient from '../config/axios.config';

const payment = async (paymentData) => {
  try {
    const res = await apiClient.post('/api/payment/process', paymentData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default payment;
