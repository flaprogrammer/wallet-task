import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { savePassword, selectDidAuth } from 'features/auth';
import { selectHasNetwork } from 'pages/wallets';
import { Button } from 'shared/button';

export function Auth() {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const didAuth = useAppSelector(selectDidAuth);
  const hasNetwork = useAppSelector(selectHasNetwork);
  const [showForm, setShowForm] = useState(false);

  if (didAuth || !hasNetwork) return null;

  if (showForm)
    return (
      <div>
        <Formik
          initialValues={{ password: '' }}
          onSubmit={async values => {
            dispatch(savePassword(values.password));
          }}
        >
          <Form>
            <FormattedMessage id="auth.enterPassword" />{' '}
            <Field name="password" type="text" data-testid="auth-password" />
            <Button
              label={intl.formatMessage({ id: 'auth.submit' })}
              type="submit"
              data-testid="auth-submit"
            />
          </Form>
        </Formik>
      </div>
    );
  else
    return (
      <Button
        label={intl.formatMessage({ id: 'auth.enterPassword' })}
        onClick={() => setShowForm(true)}
        data-testid="auth-enter-password"
      />
    );
}
