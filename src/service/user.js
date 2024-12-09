import apiClient from '../config/axios.config';

const users = async () => {
  try {
    const res = await apiClient.get('/api/user');
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (userData) => {
  try {
    const res = await apiClient.post('/api/user', userData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const editUser = async (userId, userData) => {
  try {
    const res = await apiClient.put(`/api/user/${userId}`, userData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUser = async (userId) => {
  try {
    const res = await apiClient.delete(`/api/user/${userId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { createUser, deleteUser, editUser, users };
