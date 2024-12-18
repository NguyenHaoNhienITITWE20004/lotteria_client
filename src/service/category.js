import apiClient from '../config/axios.config';

const getCategories = async () => {
  try {
    const res = await apiClient.get('/api/category');
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { getCategories };
