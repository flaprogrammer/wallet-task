import { useState } from 'react';
import { Formik, Field, Form } from 'formik';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { savePassword, selectDidAuth } from 'features/auth';
import { selectHasNetwork } from 'pages/wallets';
import { Button } from 'shared/button';

export function Auth() {
  const dispatch = useAppDispatch();
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
            console.log(values);
            dispatch(savePassword(values.password));
          }}
        >
          <Form>
            Enter password <Field name="password" type="text" />
            <Button label="Submit" type="submit" />
          </Form>
        </Formik>
      </div>
    );
  else return <Button label="Enter password" onClick={() => setShowForm(true)} />;
}
