import { Utils } from 'alchemy-sdk';
import { Form, Outlet, redirect } from 'react-router-dom';

import './App.css';
import { alchemy } from './alchemyApi';

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface


function App() {


  return (
    <header className="App">
      <h1 className="title">Honour's Block Explorer</h1>
      <Form method='post' action='/'>
        <input
          name='searchItem'
          className="search-bar"
          placeholder="Address/Txn Hash/Block No./Block Hash"
        ></input>
        <button type='submit' className="search-button">Search</button>
      </Form>
      <Outlet />
    </header>
  );
}

export const navigationAction = async ({request}) => {
  
  const data = await request.formData();
  const searchItem = data.get("searchItem");

  if (Utils.hexDataLength(searchItem) === 20){

    return redirect(`wallet/${searchItem}`);
  }
  else if (Utils.hexDataLength(searchItem) < 20){

    return redirect(`block/${searchItem}`);
  }
  else {

    if (await alchemy.core.getTransactionReceipt(searchItem) === null) {
      return redirect(`block/${searchItem}`);
    }
    
    return redirect(`transaction/${searchItem}`);
  }
}

export default App;
