import apiClient from '../config/axios.config';

const signIn = async (userSignIn) => {
  const res = await apiClient.post('api/auth/sign-in', userSignIn);
  return res.data;
};

const signUp = async (userSignUp) => {
  try {
    const res = await apiClient.post('/api/auth/sign-up', userSignUp);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { signIn, signUp };
