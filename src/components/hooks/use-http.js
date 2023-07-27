import { useState, useCallback,useEffect } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [changed, setChanged] = useState(false); // Add a 'changed' state

  const sendRequest = useCallback(async (requestConfig, applyData = null) => {
    setIsLoading(true);
    setError(null);
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
      
      // Update the 'changed' state when the data changes
      setChanged(prevChanged => !prevChanged);

    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false); // Move this inside the try block's finally block
    }
  }, []);

  useEffect(() => {
    setChanged((prevChanged) => !prevChanged);
  }, [isLoading, error]);

  return {
    isLoading,
    error,
    sendRequest,
    changed,
  };
};

export default useHttp;






