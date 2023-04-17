import { useState } from "react";

const useFetch = ({ url, method, body, token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const options = {
      headers: {
        "Content-Type": "Application/json",
        ...(token && {
          authorization: token,
        }),
      },
      method: method,
      ...(body && {
        body: JSON.stringify(body),
      }),
    };
    try {
      const response = await fetch(`${url}`, options);
      const dataJson = await response.json();
      setData(dataJson);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, data, error, isLoading };
};

export default useFetch;
