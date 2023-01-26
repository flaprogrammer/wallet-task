import type { ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { decryptWallets } from 'pages/wallets';

export interface AuthModelState {
  password: string | null;
}

const initialState: AuthModelState = {
  password: null,
};

export const authModel = createSlice({
  name: 'auth',
  initialState: initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPassword: (state, action: PayloadAction<string | null>) => {
      state.password = action.payload;
    },
  },
});

export const savePassword = (
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return dispatch => {
    dispatch(authModel.actions.setPassword(password));
    const res = dispatch(decryptWallets(password));
    if (!res) {
      dispatch(authModel.actions.setPassword(null));
    }
  };
};

export const { setPassword } = authModel.actions;

export const selectPassword = (state: RootState) => state.auth.password;

export const selectDidAuth = (state: RootState) => !!state.auth.password;
