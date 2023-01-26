import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { walletsModel } from 'pages/wallets';
import { authModel } from 'features/auth';

export const store = configureStore({
  reducer: {
    wallets: walletsModel.reducer,
    auth: authModel.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
