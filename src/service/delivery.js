import apiClient from '../config/axios.config';

const updateDelivery = async (deliveryId, deliveryData) => {
  try {
    const res = await apiClient.patch(
      `/api/delivery/${deliveryId}`,
      deliveryData,
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { updateDelivery };
