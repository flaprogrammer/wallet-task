import { useEffect } from 'react';
import Web3 from 'web3';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectList, removeWallet, selectHasNetwork } from 'pages/wallets';
import { selectDidAuth } from 'features/auth';
import { Button } from 'shared/button';
import styles from './WalletsList.module.css';

export function WalletsList() {
  const dispatch = useAppDispatch();
  const walletsList = useAppSelector(selectList);
  const didAuth = useAppSelector(selectDidAuth);
  const hasNetwork = useAppSelector(selectHasNetwork);

  if (!hasNetwork) return null;

  if (!walletsList.length) return <div>List is empty</div>;

  return (
    <div>
      <table className={styles.table} cellSpacing="0">
        <thead>
          <tr>
            <th>Address</th>
            <th>Balance</th>
            {didAuth && (
              <>
                <th>Private Key</th>
                <th>Remove</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {walletsList.map(wallet => (
            <tr key={wallet.address}>
              <td>{wallet.address}</td>
              <td>{wallet.balance || 0}</td>
              {didAuth && (
                <>
                  <td>{wallet.privateKey}</td>
                  <td>
                    <Button label="Remove" onClick={() => dispatch(removeWallet(wallet.address))} />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
