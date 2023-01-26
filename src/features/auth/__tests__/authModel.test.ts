import { configureStore } from '@reduxjs/toolkit';
import { setPassword, authModel, savePassword } from 'features/auth';
import { decryptWallets, walletsModel } from 'pages/wallets';

const initialState = {
  password: null,
};

describe('reducers', () => {
  test('should return the initial state', () => {
    expect(authModel.reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should setPassword', () => {
    expect(authModel.reducer(initialState, setPassword('123'))).toEqual({
      password: '123',
    });
  });
});
