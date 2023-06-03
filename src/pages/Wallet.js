import { useEffect, useState } from 'react';
import { alchemy } from '../alchemyApi';
import { Link, useParams } from "react-router-dom";
import { SortingOrder, Utils } from 'alchemy-sdk';

function Wallet (){
  const {wallet} = useParams();
  const  [balance, setBalance] = useState();
  const [transfersFrom, setTransfersFrom] = useState();
  const [transfersTo, setTransfersTo] = useState();
  const [count, setCount] = useState();
  
  useEffect(()=>{
    async function getBalance(){
     setBalance( (await alchemy.core.getBalance(wallet))._hex);
     setCount( await alchemy.core.getTransactionCount(wallet))
     setTransfersFrom( (await alchemy.core.getAssetTransfers({
      fromAddress: wallet,
      order: SortingOrder.DESCENDING,
      maxCount: 5,
      category: [ 'external', 'internal', 'erc20'],
      withMetadata: true,
     })).transfers);
     setTransfersTo( (await alchemy.core.getAssetTransfers({
      toAddress: wallet,
      order: SortingOrder.DESCENDING,
      maxCount: 5,
      category: [ 'external', 'internal','erc20'],
      withMetadata: true,
     })).transfers); 
 
    }

    getBalance();

  }, [wallet]);


  return (
  <>
  <h2>Wallet: {wallet} </h2>
  <div className='content-block'>
    <div className='columns'>
      <div>Balance</div>
      <div>{balance ? `${Utils.formatEther(balance)} ETH` : 'loading...'}</div>
    </div>
    <div className='columns'>
      <div>Total Transactions</div>
      <div>{`${count} txns`}</div>
    </div>
    <h2>Recent Transactions</h2>
    <h3>Out Transactions</h3>
    <div className='columns'>
      <div>from</div>
      <div>to</div>
      <div>ETH</div>
    </div>
    <> { transfersFrom && transfersFrom.map((transferFrom) =>
    <div className='columns'  key={transferFrom.hash}>
      <Link to={`/wallet/${transferFrom.from}`} className='link'>{transferFrom.from }</Link>
      <Link to={`/wallet/${transferFrom.to}`} className='link'>{transferFrom.to }</Link>
      <div>{ `${transferFrom.value} ETH`} </div>
    </div>
    )}
    </>
    <h3>In Transactions</h3>
    <div className='columns'>
      <div>from</div>
      <div>to</div>
      <div>ETH</div>
    </div>
    <> { transfersTo && transfersTo.map((transferTo) =>
    <div className='columns'  key={transferTo.hash}>
      <Link to={`/wallet/${transferTo.from}`} className='link'>{transferTo.from }</Link>
      <Link to={`/wallet/${transferTo.to}`} className='link'>{transferTo.to }</Link>
      <div>{ `${transferTo.value} ETH`} </div>
    </div>
    )}
    </>

  </div>
  </>
  );

}

export default Wallet;