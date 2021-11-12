import { useCallback, useState } from "react";

const useFetch = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!res.ok) {
        throw new Error("Request failed!");
      }

      const data = await res.json();
      if (applyData) {
        applyData(data);
      }
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  },[requestConfig, applyData]);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useFetch;
