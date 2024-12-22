import { useState, useEffect } from 'react';
import apiClient from '../config/axios.config';

const useAxios = ({
  url,
  method = 'GET',
  body = null,
  autoFetch = true,
  headers = {},
  fetchFunction = null,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await (fetchFunction || apiClient)({
        url,
        method,
        data: body,
        headers,
      });
      setData(response.data);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [url, method, body, autoFetch]);

  return { data, loading, error, isSuccess, fetchData };
};

export default useAxios;
