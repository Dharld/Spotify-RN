import axiosInstance from '../axios';
import {ENDPOINTS} from '../endpoints';
import {handleApiError} from '../../errorHandler';

export const musicService = {
  getTopArtists: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.TOP_ARTISTS);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  getTopTracks: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.TOP_TRACKS);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  searchTracks: async (query: string) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.SEARCH_TRACKS, {
        params: {query},
      });
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
};
