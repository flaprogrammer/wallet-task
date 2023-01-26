import { useEffect } from 'react';
import Web3 from 'web3';
import { ToastContainer } from 'react-toastify';
import { Wallets } from 'pages/wallets';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Wallets />
      <ToastContainer />
    </div>
  );
}

export default App;
