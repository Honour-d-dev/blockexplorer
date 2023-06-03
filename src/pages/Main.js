import { Utils } from 'alchemy-sdk';
import { alchemy } from '../alchemyApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Main() {

  const [blockNumber, setBlockNumber] = useState();
  const [blocks, setBlocks] = useState();
  const [transactions, setTransactions] = useState();


  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());

    }

    getBlockNumber();

  },[ ]);

  useEffect(()=>{
    async function getBlocks() {
      if(blockNumber){
        const temp = [];
        for(let i = 0; i < 5; i++){
          temp.push( (await alchemy.core.getBlock(blockNumber - i)));
        }
        setBlocks( temp );
      }
    }

    getBlocks();

  },[blockNumber]);

  useEffect(()=> {
    async function getTransactions(){
      if(blocks){
        const temp = [];
        const length = blocks[0].transactions.length;
        for(let i = 0; i< 5; i++){
          temp.push( (await alchemy.core.getTransactionReceipt(blocks[0].transactions[length-(i+1)])));
        }
        setTransactions(temp);
      }
      
    }

    getTransactions();

  },[blocks]);

    return (
    <>
      <div className="content-block">
        <h2 className='columns'>
          Latest Blocks
        </h2>
        <div className='columns'>
          <div>Block number</div>
          <div>Miner</div>
          <div>Gas Used</div>
        </div>
        <> {blocks && blocks.map((block)=>
        <div className='columns' key={block.number}>
          <Link to={`/block/${block.number}`} className='link'>{ `#${block.number}`}</Link>
          <Link to={`/wallet/${block.miner}`} className='link'>{ block.miner }</Link>
          <div>{`${parseFloat(Utils.formatEther(block.gasUsed._hex)*block.baseFeePerGas).toFixed(3)} ETH`}</div>
        </div>
        )}
        </>
      </div>
      <div className="content-block">
        <h3 className='columns'>
          Latest Transactions
        </h3>
        <div className='columns'>
          <div>From</div>
          <div>To</div>
          <div>Gas Used</div>
        </div>
        <> {transactions && transactions.map((transaction)=>
        <div className='columns' key={transaction.transactionHash}>
          <Link to={`/wallet/${transaction.from}`} className='link'>{ transaction.from }</Link>
          <Link to={`/wallet/${transaction.to}`} className='link'>{ transaction.to }</Link>
          <div>{ `${parseFloat(Utils.formatEther(transaction.gasUsed._hex)*transaction.effectiveGasPrice).toFixed(5)} ETH`}</div>
        </div>   
        )}
        </>
      </div>
    </>
    )    
}



export default Main;