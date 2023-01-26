import type { Account } from 'web3-core/types';

type Wallets = {
  length: number;
  [key: number]: {
    address: string;
    privateKey: string;
  };
};

export const getWalletsMapped = (wallets: Wallets) => {
  const walletsMapped = [];
  for (let i = 0; i <= wallets.length; i++) {
    if (!wallets[i]) {
      continue;
    }
    walletsMapped.push({
      address: wallets[i].address.toLowerCase(),
      privateKey: wallets[i].privateKey,
    });
  }
  return walletsMapped;
};
