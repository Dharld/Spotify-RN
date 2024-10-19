import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Platform} from 'react-native';

let BASE_URL = 'http://localhost:5000/api/'; // Base URL

if (Platform.OS === 'android') {
  BASE_URL = 'http://10.0.2.2:5000/api';
} else if (Platform.OS === 'ios') {
  // iOS simulator can use localhost
  BASE_URL = 'http://localhost:5000/api';
} else {
  // For physical devices, use your machine's local IP address
  // You'll need to replace this with your actual IP address
  BASE_URL = 'http://192.168.1.X:5000/api';
}

// Used for the different HTTP request
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken');
    // If a token is attached, we'll bind it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default axiosInstance;
