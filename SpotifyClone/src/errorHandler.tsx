import axios, {AxiosError} from 'axios';
import {ErrorResponse} from './types/error.type';

interface StandardError {
  message: string;
  status: number;
  error: any;
  code: string | null;
}

export function handleApiError(error: unknown): StandardError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        message:
          axiosError.response.data.message ||
          (typeof axiosError.response.data.error === 'string'
            ? axiosError.response.data.error
            : 'An error occurred'),
        status: axiosError.response?.status,
        error: axiosError.response?.data.error || null,
        code: axiosError.response?.data.code || null,
      };
    } else if (axiosError.request) {
      // The request was made but no response was received
      return {
        message: 'No response received from server',
        status: 0,
        error: null,
        code: null,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        message:
          axiosError.message ||
          'An error occurred while setting up the request',
        status: 0,
        error: null,
        code: null,
      };
    }
  } else {
    // Handle non-Axios errors
    return {
      message: 'An unexpected error occurred',
      status: 0,
      error: null,
      code: null,
    };
  }
}
