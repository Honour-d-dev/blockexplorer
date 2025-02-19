import { Alchemy, Network} from 'alchemy-sdk';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.


const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  export const alchemy = new Alchemy(settings);