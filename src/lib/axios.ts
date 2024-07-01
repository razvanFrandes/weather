import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: API_KEY,
  },
});

export const fetcher = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.response?.data.message || error.message}`);
    }
    throw error;
  }
};
