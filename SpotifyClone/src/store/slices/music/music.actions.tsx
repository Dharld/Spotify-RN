import {createAsyncThunk} from '@reduxjs/toolkit';
import {musicService} from '../../../api/services/music.service';

export const fetchTopArtists = createAsyncThunk(
  'music/fetchTopArtists',
  async (_, {rejectWithValue}) => {
    try {
      const response = await musicService.getTopArtists();
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const fetchTopTracks = createAsyncThunk(
  'music/fetchTopTracks',
  async (_, {rejectWithValue}) => {
    try {
      const response = await musicService.getTopTracks();
      console.log(response);
      return response;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const searchTracks = createAsyncThunk(
  'music/searchTracks',
  async (query: string, {rejectWithValue}) => {
    try {
      const response = await musicService.searchTracks(query);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
