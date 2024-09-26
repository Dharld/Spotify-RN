import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login, register, resendVerificationEmail} from './auth.actions';
import {User} from '../../../types/user.type';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.isAuthenticated = !!action.payload;
      state.user = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{user: User; token: string}>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        },
      )
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{user: User; token: string}>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        },
      )
      .addCase(resendVerificationEmail.fulfilled, () => {
        // Handle successful resend verification email
        // You can add any state updates or side effects here if needed
        // For now, we will just log a success message
        console.log('Verification email has been resent successfully.');
      });
  },
});

export const {setUser, logout} = authSlice.actions;

export default authSlice.reducer;
