import { useState } from 'react';
import { Formik, Field, Form } from 'formik';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { connectToWeb3, fetchWallets } from 'pages/wallets';
import { Button } from 'shared/button';
import styles from './Network.module.css';

export function Network() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.network}>
      <Formik
        initialValues={{ network: 'https://sepolia.infura.io/v3/d966b478f36c47d9a6b9ba35d7326d2b' }}
        onSubmit={async values => {
          dispatch(connectToWeb3(values.network));
          dispatch(fetchWallets());
        }}
      >
        <Form>
          <Field as="select" name="network">
            <option value="https://sepolia.infura.io/v3/d966b478f36c47d9a6b9ba35d7326d2b">
              ETH Sepolia
            </option>
            <option value="https://mainnet.infura.io/v3/d966b478f36c47d9a6b9ba35d7326d2b">
              ETH Mainnet
            </option>
            <option value="https://goerli.infura.io/v3/d966b478f36c47d9a6b9ba35d7326d2b">
              ETH Goerli
            </option>
          </Field>
          <Button label="Submit" type="submit" />
        </Form>
      </Formik>
    </div>
  );
}
