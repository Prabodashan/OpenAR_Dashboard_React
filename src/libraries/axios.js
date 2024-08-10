import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3301/api";

// Custom hook for API calls with request cancellation and interceptors
const useAxios = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: BASE_URL, // Replace with your actual base URL
    headers: { "Content-Type": "application/json" },
  });

  // Set up request and response interceptors
  axiosInstance.interceptors.request.use(
    (config) => {
      // Log or modify request here
      console.log("Sending request to:", config.url);
      return config;
    },
    (error) => {
      // Handle request error here
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // Log or modify response here
      console.log("Received response from:", response.config.url);
      return response;
    },
    (error) => {
      // Handle response error here
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    return () => {
      // Cancel the request when the component unmounts
      source.cancel("Component unmounted: Request cancelled.");
    };
  }, []);

  // Making the API call with cancellation support
  const fetchData = async ({
    url,
    method,
    data = {},
    params = {},
    requestConfig = {},
  }) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        data: method.toLowerCase() === "get" ? undefined : data, // Only include data for non-GET requests
        params: method.toLowerCase() === "get" ? data : params, // For GET requests, use data as query params
        headers: requestConfig,
        cancelToken: axios.CancelToken.source().token,
      });

      return result.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
      } else {
        setError(error.response ? error.response.data : error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Expose the state and the fetchData function
  return { error, loading, fetchData };
};

export default useAxios;
