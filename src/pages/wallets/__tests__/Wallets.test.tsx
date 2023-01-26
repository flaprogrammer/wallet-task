import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { Wallets } from '../Wallets';

test('renders header img', () => {
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <Wallets />
    </Provider>
  );

  expect(getByRole('img')).toBeInTheDocument();
});

test('renders Connect button', () => {
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <Wallets />
    </Provider>
  );

  expect(getByText('Connect')).toBeInTheDocument();
});

test('displays empty list', () => {
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <Wallets />
    </Provider>
  );

  expect(getByText('Connect')).toBeInTheDocument();
});

