import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App ,{ navigationAction} from './App';
import Main  from './pages/Main';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom';
import Wallet from './pages/Wallet';
import Block from './pages/Block';
import Transaction from './pages/Transaction';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} action={navigationAction} >
      <Route index element={<Main />} />
      <Route path='wallet/:wallet' element={ <Wallet />} />
      <Route path='block/:block' element ={ <Block />} />
      <Route path='transaction/:transaction' element = { <Transaction />} />
    </Route>  
  )
);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

