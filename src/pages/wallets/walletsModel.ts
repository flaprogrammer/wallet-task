import type { ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import storejs from 'store';
import type { EncryptedKeystoreV3Json } from 'web3-core/types';

import { RootState } from 'app/store';
import { authModel } from 'features/auth';
import { getWalletsMapped } from './lib';

export const WALLET_KEY = 'web3js_wallet';
export let web3: Web3;

interface Wallet {
  address: string;
  balance?: string;
  privateKey?: string;
}

export interface WalletsModelState {
  network: string | null;
  list: Wallet[];
  balances: {
    [key in string]: string;
  };
}

const initialState: WalletsModelState = {
  network: null,
  list: [],
  balances: {},
};

export const walletsModel = createSlice({
  name: 'elements',
  initialState: initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<string | null>) => {
      state.network = action.payload;
    },
    setWallets: (state, action: PayloadAction<Wallet[]>) => {
      state.list = action.payload;
    },
    setBalance: (state, action: PayloadAction<{ address: string; balance: string }>) => {
      state.balances[action.payload.address] = action.payload.balance;
    },
  },
});

export const fetchWallets = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return dispatch => {
    const wallets: EncryptedKeystoreV3Json[] = storejs.get(WALLET_KEY, []);
    wallets.forEach(wallet => {
      wallet.address = '0x' + wallet.address;
    });
    dispatch(walletsModel.actions.setWallets(wallets));
    dispatch(fetchBalances(wallets));
  };
};

export const fetchBalances = (
  wallets: { address: string }[]
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return dispatch => {
    wallets.forEach(async wallet => {
      const balance = await web3.eth.getBalance(wallet.address);
      const balanceEther = Web3.utils.fromWei(balance, 'ether');
      dispatch(walletsModel.actions.setBalance({ address: wallet.address, balance: balanceEther }));
    });
  };
};

export const decryptWallets = (
  password: string
): ThunkAction<Boolean, RootState, unknown, AnyAction> => {
  return dispatch => {
    try {
      const decrypted = web3.eth.accounts.wallet.load(password, WALLET_KEY);
      const walletsMapped = getWalletsMapped(decrypted);
      dispatch(walletsModel.actions.setWallets(walletsMapped));
      return true;
    } catch (e) {
      toast.error('Password is incorrect, try again');
      return false;
    }
  };
};

export const createWallet = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const res = web3.eth.accounts.wallet.create(1);
    if (!res) {
      toast.error('Enable to create a wallet, try again');
      return;
    }
    const password = getState().auth.password;
    if (password) {
      web3.eth.accounts.wallet.save(password, WALLET_KEY);
      const walletsMapped = getWalletsMapped(web3.eth.accounts.wallet);
      dispatch(walletsModel.actions.setWallets(walletsMapped));
    }
  };
};

export const removeWallet = (address: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const res = web3.eth.accounts.wallet.remove(address);
    if (!res) {
      toast.error('Enable to remove the wallet, try again');
      return;
    }
    const password = getState().auth.password;
    if (password) {
      web3.eth.accounts.wallet.save(password, WALLET_KEY);
      const walletsMapped = getWalletsMapped(web3.eth.accounts.wallet);
      dispatch(walletsModel.actions.setWallets(walletsMapped));
    }
  };
};
export const connectToWeb3 = (
  providerUrl: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    web3 = new Web3(providerUrl);
    dispatch(walletsModel.actions.setNetwork(providerUrl));
    dispatch(authModel.actions.setPassword(null));
  };
};

export const { setNetwork, setWallets, setBalance } = walletsModel.actions;

export const selectHasNetwork = (state: RootState) => !!state.wallets.network;

export const selectList = createSelector(
  (state: RootState) => state.wallets.balances,
  (state: RootState) => state.wallets.list,
  (balances, list) => {
    return list.map(wallet => ({
      balance: balances[wallet.address],
      ...wallet,
    }));
  }
);
