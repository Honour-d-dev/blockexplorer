import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { alchemy } from "../alchemyApi";
import { Utils } from "alchemy-sdk";

function Transaction (){
  const { transaction } = useParams();
  const [transactionInfo, setTransactionInfo] = useState();

  useEffect(() =>{
    async function getTransactionInfo(){
      setTransactionInfo( (await alchemy.transact.getTransaction(transaction)));
    }

    getTransactionInfo();
  },[transaction])

  return (
    <>
    <h1>Transaction: {transaction}</h1>
    <div className="content-block"> {transactionInfo && <>
      <div className="columns">
        <div>Block Hash:</div>
        <Link to={`/block/${transactionInfo.blockHash}`} className="link">{transactionInfo.blockHash} </Link>
      </div>
      <div className="columns">
        <div>Block Number:</div>
        <Link to={`/block/${transactionInfo.blockNumber}`} className="link">{transactionInfo.blockNumber} </Link>
      </div>
      <div className="columns">
        <div>Transaction Hash</div>
        <div>{transactionInfo.hash} </div>
      </div>
      <div className="columns">
        <div>From:</div>
        <Link to={`/wallet/${transactionInfo.from}`} className="link">{transactionInfo.from} </Link>
      </div>
      <div className="columns">
        <div>To:</div>
        <Link to={`wallet/${transactionInfo.to}`} className="link">{transactionInfo.to} </Link>
      </div>
      <div className="columns">
        <div>Amount:</div>
        <div>{`${Utils.formatEther(transactionInfo.value._hex)} ETH`} </div>
      </div> <div className="columns">
        <div>Gas Price:</div>
        <div> {`${Utils.formatUnits(transactionInfo.gasPrice._hex, 'gwei')} Gwei`} </div>
      </div>
      <div className="columns">
        <div>Gas Limit:</div>
        <div> {`${parseInt(transactionInfo.gasLimit._hex, 16)} Gas`} </div>
      </div>
      <div className="columns">
        <div>Timestamp:</div>
        <div> {`${transactionInfo.timestamp}`} </div>
      </div> 
      </>
    }
    </div>
    </>
  )

}

export default Transaction;