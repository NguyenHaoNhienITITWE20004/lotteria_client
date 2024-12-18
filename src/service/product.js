import apiClient from '../config/axios.config';

const products = async (page, limit, search, category) => {
  try {
    const params = {
      ...(page && { page }),
      ...(limit && { limit }),
      ...(search && { search }),
      ...(category && { category_id: category }),
    };

    const res = await apiClient.get('api/product', { params });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getProductById = async (productId) => {
  try {
    const res = await apiClient.get(`api/product/product-id/${productId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const createProduct = async (productData) => {
  try {
    const res = await apiClient.post('api/product', productData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
const editProduct = async (productId, productData) => {
  try {
    const res = await apiClient.patch(`api/product/${productId}`, productData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteProduct = async (productId) => {
  try {
    const res = await apiClient.delete(`api/product/${productId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
export { products, getProductById, createProduct, editProduct, deleteProduct };
