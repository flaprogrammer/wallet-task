import { useIntl, FormattedMessage } from 'react-intl';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectList, removeWallet, selectHasNetwork } from 'pages/wallets';
import { selectDidAuth } from 'features/auth';
import { Button } from 'shared/button';
import styles from './WalletsList.module.css';

export function WalletsList() {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const walletsList = useAppSelector(selectList);
  const didAuth = useAppSelector(selectDidAuth);
  const hasNetwork = useAppSelector(selectHasNetwork);

  if (!hasNetwork) return null;

  if (!walletsList.length)
    return (
      <div>
        <FormattedMessage id="walletList.listIsEmpty" />
      </div>
    );

  return (
    <div>
      <table className={styles.table} cellSpacing="0" data-testid="wallets-table">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="walletList.address" />
            </th>
            <th>
              <FormattedMessage id="walletList.balance" />
            </th>
            {didAuth && (
              <>
                <th>
                  <FormattedMessage id="walletList.privateKey" />
                </th>
                <th>
                  <FormattedMessage id="walletList.remove" />
                </th>
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
                    <Button
                      label={intl.formatMessage({ id: 'walletList.remove' })}
                      onClick={() => dispatch(removeWallet(wallet.address))}
                      data-testid="wallets-remove"
                    />
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
