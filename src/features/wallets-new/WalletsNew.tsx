import { useEffect } from 'react';
import Web3 from 'web3';
import { createWallet } from 'pages/wallets';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectDidAuth } from 'features/auth';
import { Button } from 'shared/button';

export function WalletsNew() {
  const dispatch = useAppDispatch();
  const didAuth = useAppSelector(selectDidAuth);

  if (!didAuth) return null;

  return (
    <div>
      <Button label="Create a new account" onClick={() => dispatch(createWallet())} />
    </div>
  );
}
