/This is where I try to sign the transaction on my client side

import { Lucid, Blockfrost } from "https://unpkg.com/lucid-cardano@0.7.7/web/mod.js"
import axios from 'axios'



async function connect(){
  const data = await axios.get('http://localhost:4000/blockfrost').then((res) => {
  }).catch((err) => {
    console.log(err)
  })

  const lucid = await Lucid.new(data,
    "Testnet",
   );
  
    const api = await window.cardano.nami.enable();
    lucid.selectWallet(api);

    const tx = await lucid.newTx()
    .payToAddress("addr...", { lovelace: 5000000n })
    .complete();

    const signedTx = await tx.sign().complete();

    const txHash = await signedTx.submit();

    console.log(txHash);

}

//This is where i connect to blockfrost

const axios = require('axios')
require('dotenv').config()

axios.defaults.headers.common = {
    "project_id": process.env.BLOCKFROST_KEY,
  };

async function connect(){
    const data = await axios.get('https://cardano-testnet.blockfrost.io/api/v0')
    return data.data
}

module.exports = {connect}
 

export default connect

//This is the error I get
mod.js:2 Uncaught (in promise) Error: expected instance of u_
    at c (mod.js:2:535)
    at j_.new (mod.js:2:157455)
    at new cn (mod.js:4:35867)
    at ln.newTx (mod.js:4:52734)
    at connect (makeTransaction.js:20:1)

----

https://github.com/GGAlanSmithee/cardano-lucid-blockfrost-proxy-example

----


https://developers.cardano.org/docs/integrate-cardano/user-wallet-authentication/

---