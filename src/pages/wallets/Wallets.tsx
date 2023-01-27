import { WalletsNew } from 'features/wallets-new';
import { WalletsList } from 'features/wallets-list';
import { Auth } from 'features/auth';
import { Network } from 'features/network';
import headerImage from './assets/header.jpeg';
import styles from './Wallets.module.css';

export function Wallets() {
  return (
    <div>
      <div>
        <img className={styles.header} src={headerImage} alt="Header" data-testid="header" />
      </div>

      <Network />

      <Auth />
      <WalletsList />

      <WalletsNew />
    </div>
  );
}
