import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',  // Set this to your backend's base URL
  withCredentials: true,  // To send cookies
});

export default axiosInstance;
