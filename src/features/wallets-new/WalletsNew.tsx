import { useIntl } from 'react-intl';

import { createWallet } from 'pages/wallets';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectDidAuth } from 'features/auth';
import { Button } from 'shared/button';

export function WalletsNew() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const didAuth = useAppSelector(selectDidAuth);

  if (!didAuth) return null;

  return (
    <div>
      <Button
        label={intl.formatMessage({ id: 'walletsNew.create' })}
        onClick={() => dispatch(createWallet())}
      />
    </div>
  );
}
