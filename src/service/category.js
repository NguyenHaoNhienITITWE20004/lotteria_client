import apiClient from '../config/axios.config';

const getCategories = async () => {
  try {
    const res = await apiClient.get('/api/category');
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const createCategory = async (categoryData) => {
  try {
    const res = await apiClient.post('/api/category', categoryData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
const updateCategory = async (categoryId, categoryData) => {
  try {
    const res = await apiClient.patch(
      `/api/category/${categoryId}`,
      categoryData,
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteCategory = async (categoryId) => {
  try {
    const res = await apiClient.delete(`/api/category/${categoryId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { getCategories, createCategory, updateCategory, deleteCategory };
