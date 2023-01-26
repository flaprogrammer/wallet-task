import { configureStore } from '@reduxjs/toolkit';
import {
  WALLET_KEY,
  web3,
  walletsModel,
  setNetwork,
  setWallets,
  setBalance,
  connectToWeb3,
  removeWallet,
  createWallet,
  fetchWallets,
} from '../walletsModel';
import { setPassword, authModel } from 'features/auth';

const initialState = {
  network: null,
  list: [],
  balances: {},
};

describe('reducers', () => {
  test('should return the initial state', () => {
    expect(walletsModel.reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should setNetwork', () => {
    const network = 'https://rpc.sepolia.dev';
    expect(walletsModel.reducer(initialState, setNetwork(network))).toEqual({
      network,
      list: [],
      balances: {},
    });
  });

  test('should setWallets', () => {
    const wallets = [
      {
        address: '0x124124a324235235235235253',
      },
    ];
    expect(walletsModel.reducer(initialState, setWallets(wallets))).toEqual({
      network: null,
      list: wallets,
      balances: {},
    });
  });

  test('should setBalance', () => {
    const balances = {
      address: '0x124124a324235235235235253',
      balance: '1.400',
    };
    expect(walletsModel.reducer(initialState, setBalance(balances))).toEqual({
      network: null,
      list: [],
      balances: {
        '0x124124a324235235235235253': '1.400',
      },
    });
  });
});

describe('thunk actions', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        wallets: walletsModel.reducer,
        auth: authModel.reducer,
      },
    });
    if (web3) {
      web3.eth.accounts.wallet.clear();
    }
  });
  test('should connectToWeb3', () => {
    const provider = 'https://rpc.sepolia.dev';
    store.dispatch(connectToWeb3(provider));
    expect(store.getState().wallets.network).toEqual(provider);
    expect(store.getState().auth.password).toEqual(null);
  });

  test('should createWallet', () => {
    store.dispatch(setPassword('123'));
    store.dispatch(createWallet());
    expect(store.getState().wallets.list.length).toEqual(1);
  });

  test('should removeWallet', () => {
    store.dispatch(setPassword('123'));
    store.dispatch(createWallet());
    const address = store.getState().wallets.list[0].address;
    store.dispatch(removeWallet(address));
    expect(store.getState().wallets.list.length).toEqual(0);
  });

  test('should fetchWallets', () => {
    localStorage.setItem(
      WALLET_KEY,
      JSON.stringify([
        {
          address: '881e1a8218dc868f1f0caa17a6098dc8cffdc7d0',
        },
      ])
    );
    store.dispatch(fetchWallets());
    expect(store.getState().wallets.list).toEqual([
      {
        address: '0x881e1a8218dc868f1f0caa17a6098dc8cffdc7d0',
      },
    ]);
  });
});
