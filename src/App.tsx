import { ToastContainer } from 'react-toastify';
import { IntlProvider } from 'react-intl';
import { Wallets } from 'pages/wallets';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import English from 'app/lang/en.json';

console.log(English);

function App() {
  return (
    <IntlProvider locale="en" messages={English}>
      <div className="App">
        <Wallets />
        <ToastContainer />
      </div>
    </IntlProvider>
  );
}

export default App;
