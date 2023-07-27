import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(async (requestConfig, applyData = null) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: {
            'Content-Type': 'application/json',
          },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
  
      const data = await response.json();
      if (applyData) {
        applyData(data);
      }  


    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false); // Move this inside the try block's finally block
    }
  }, []);



  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;






