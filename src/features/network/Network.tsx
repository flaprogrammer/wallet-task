import { Formik, Field, Form } from 'formik';
import { useIntl } from 'react-intl';
import { useAppDispatch } from 'app/hooks';
import { connectToWeb3, fetchWallets } from 'pages/wallets';
import { Button } from 'shared/button';
import { networksList } from './config';
import styles from './Network.module.css';

export function Network() {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  return (
    <div className={styles.network}>
      <Formik
        initialValues={{ network: networksList[0].value }}
        onSubmit={async values => {
          dispatch(connectToWeb3(values.network));
          dispatch(fetchWallets());
        }}
      >
        <Form>
          <Field as="select" name="network">
            {networksList.map(network => (
              <option key={network.value} value={network.value}>
                {network.label}
              </option>
            ))}
          </Field>
          <Button label={intl.formatMessage({ id: 'network.connect' })} type="submit" />
        </Form>
      </Formik>
    </div>
  );
}
