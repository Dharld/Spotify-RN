import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {musicService} from '../../../api/services/music.service';
import {fetchTopArtists, fetchTopTracks} from './music.actions';

export const searchTracks = createAsyncThunk(
  'music/searchTracks',
  async (query: string) => {
    return await musicService.searchTracks(query);
  },
);

interface MusicState {
  topArtists: any[];
  topTracks: any[];
  searchResults: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MusicState = {
  topArtists: [],
  topTracks: [],
  searchResults: [],
  status: 'idle',
  error: null,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopArtists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topArtists = action.payload;
      })
      .addCase(fetchTopTracks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topTracks = action.payload;
      })
      .addCase(searchTracks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      });
    builder
      // General pending reducer
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.status = 'loading';
          state.error = null;
        },
      )
      // General rejected reducer
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.status = 'failed';
          state.error = action.payload;
        },
      );
    // Specific fulfilled cases
  },
});

export default musicSlice.reducer;
