import axiosInstance from '../axios';
import {ENDPOINTS} from '../endpoints';
import {handleApiError} from '../../errorHandler';

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
  register: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.REGISTER, {
        email,
        password,
        // name,
      });
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
  resendVerificationEmail: async () => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.RESEND_VERIFICATION_EMAIL,
      );
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
};
