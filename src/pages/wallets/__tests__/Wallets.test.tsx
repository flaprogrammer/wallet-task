import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { Wallets } from '../Wallets';
import English from 'app/lang/en.json';

test('renders header img', () => {
  const { getByRole } = render(
    <IntlProvider locale="en" messages={English}>
      <Provider store={store}>
        <Wallets />
      </Provider>
    </IntlProvider>
  );

  expect(getByRole('img')).toBeInTheDocument();
});

test('renders Connect button', () => {
  const { getByText } = render(
    <IntlProvider locale="en" messages={English}>
      <Provider store={store}>
        <Wallets />
      </Provider>
    </IntlProvider>
  );

  expect(getByText('Connect')).toBeInTheDocument();
});

test('displays empty list', () => {
  const { getByText } = render(
    <IntlProvider locale="en" messages={English}>
      <Provider store={store}>
        <Wallets />
      </Provider>
    </IntlProvider>
  );

  expect(getByText('Connect')).toBeInTheDocument();
});
