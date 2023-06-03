import { Link, useParams } from "react-router-dom";
import { alchemy } from "../alchemyApi";
import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";

function Block (){
  const { block } = useParams();
  const [blockInfo, setBlockInfo] = useState();

  useEffect(() => {
    async function getBlockInfo(){

      if (Utils.isHexString(block)) {
        setBlockInfo( (await alchemy.core.getBlock(block))); 
      }
      else {
        setBlockInfo( (await alchemy.core.getBlock(parseInt(block))));
      }
    }

    getBlockInfo();
  
  },[block])

  return (
  <>
    <h2>{`Block: ${block}`}</h2>
    <div className="content-block"> {blockInfo && <>
      <div className="columns">
        <div>Hash:</div>
        <div>{blockInfo ? blockInfo.hash : 'loading'}</div>
      </div><div className="columns">
        <div>PrevHash:</div>
        <Link to={`/block/${blockInfo.parentHash}`} className="link">{blockInfo ? blockInfo.parentHash : 'loading'} </Link>
      </div><div className="columns">
        <div>Block Number:</div>
        <div>{blockInfo ? blockInfo.number : 'loading'} </div>
      </div><div className="columns">
        <div>Nonce:</div>
        <div> {blockInfo ? blockInfo.nonce : 'loading'} </div>
      </div><div className="columns">
        <div>Gas limit:</div>
        <div>{blockInfo ? `${parseInt(blockInfo.gasLimit._hex, 16)} Gas` : 'loading'} </div>
      </div><div className="columns">
        <div>Gas Used: </div>
        <div>{blockInfo ? `${parseInt(blockInfo.gasUsed._hex, 16)} Gas` : 'loading'} </div>
      </div><div className="columns">
        <div>Transactions:</div>
        <div>{blockInfo ? `${blockInfo.transactions.length} transactions` : 'loading'} </div>
      </div><div className="columns">
        <div>Miner:</div>
        <Link to={`/wallet/${blockInfo.miner}`} className="link">{blockInfo ? blockInfo.miner : 'loading'} </Link>
      </div><div className="columns">
        <div>Timestamp:</div>
        <div>{blockInfo ? blockInfo.timestamp : 'loading'} </div>
      </div><div className="columns">
        <div>Base Gas Fee:</div>
        <div>{blockInfo ? `${Utils.formatUnits(blockInfo.baseFeePerGas, 'gwei')} Gwei` : 'loading'} </div>
      </div>
      </>}
    </div> 
  </>   
  )

}

export default Block;