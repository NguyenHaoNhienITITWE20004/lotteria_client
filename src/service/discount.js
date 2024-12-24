import apiClient from '../config/axios.config';

const getDiscounts = async () => {
  try {
    const res = await apiClient.get('/api/discount');
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
const createDiscount = async (discountData) => {
  try {
    const res = await apiClient.post('/api/discount', discountData);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
const updateDiscount = async (discountId, discountData) => {
  try {
    const res = await apiClient.put(
      `/api/discount/${discountId}`,
      discountData,
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
const deleteDiscount = async (discountId) => {
  try {
    const res = await apiClient.delete(`/api/discount/${discountId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const applyDiscount = async (applyDiscountData) => {
  try {
    const res = await apiClient.post('/api/discount/apply', applyDiscountData);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export {
  getDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  applyDiscount,
};
