const SECRET_KEY = process.env.REACT_APP_INFURA_SECRET_KEY;

export const networksList = [
  {
    label: 'ETH Sepolia',
    value: 'https://sepolia.infura.io/v3/' + SECRET_KEY
  },
  {
    label: 'ETH Mainnet',
    value: 'https://mainnet.infura.io/v3/' + SECRET_KEY
  },
  {
    label: 'ETH Goerli',
    value: 'https://goerli.infura.io/v3/' + SECRET_KEY
  }
]