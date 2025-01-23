import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useApi = (fn: any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response as never[]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => fetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, refetch };
};
