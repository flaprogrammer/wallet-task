import { useEffect } from 'react';
import Web3 from 'web3';
import { useAppSelector, useAppDispatch } from 'app/hooks';

import { WalletsNew } from 'features/wallets-new';
import { WalletsList } from 'features/wallets-list';
import { Auth } from 'features/auth';
import { Network } from 'features/network';
import { connectToWeb3, fetchWallets } from './walletsModel';
import headerImage from './assets/header.jpeg';
import styles from './Wallets.module.css';

export function Wallets() {

  return (
    <div>
      <div>
        <img className={styles.header} src={headerImage} alt="header" />
      </div>

      <Network />

      <Auth />
      <WalletsList />

      <WalletsNew />
    </div>
  );
}
