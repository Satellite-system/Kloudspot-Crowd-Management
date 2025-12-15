import { useState } from "react";
import axiosInstance from "../api/secureAxiosInstance";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        method,
        url,
        data,
        ...config,
      });
      // console.log("UseApi: ", response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getApi = (url, config) => request("get", url, null, config);
  const postApi = (url, data, config) => request("post", url, data, config);
  const putApi = (url, data, config) => request("put", url, data, config);
  const delApi = (url, config) => request("delete", url, null, config);

  return { getApi, postApi, putApi, delApi, loading, error };
};
