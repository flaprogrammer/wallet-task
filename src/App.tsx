import { ToastContainer } from 'react-toastify';
import { IntlProvider } from 'react-intl';
import { Wallets } from 'pages/wallets';
import 'react-toastify/dist/ReactToastify.css';
import English from 'app/lang/en.json';

function App() {
  return (
    <IntlProvider locale="en" messages={English}>
      <div>
        <Wallets />
        <ToastContainer />
      </div>
    </IntlProvider>
  );
}

export default App;
