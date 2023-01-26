import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { Wallets } from '../Wallets';

test('renders learn react link', () => {
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <Wallets />
    </Provider>
  );

  expect(getByRole('img')).toBeInTheDocument();
});
