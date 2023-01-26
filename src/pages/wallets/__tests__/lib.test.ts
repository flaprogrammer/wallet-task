import { getWalletsMapped } from '../lib';

test('should return walletsMapped', () => {
  const wallets = {
    '0': {
      address: '0x111111111111111',
      privateKey: '0x22222222222222',
    },
    '1': {
      address: '0x3333333333333',
      privateKey: '0x444444444444',
    },
    length: 2,
  };
  expect(getWalletsMapped(wallets)).toEqual([
    {
      address: '0x111111111111111',
      privateKey: '0x22222222222222',
    },
    {
      address: '0x3333333333333',
      privateKey: '0x444444444444',
    },
  ]);
});
