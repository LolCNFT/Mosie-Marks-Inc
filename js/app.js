import * as S from "./@emurgo/cardano-serialization-lib-asmjs/cardano_serialization_lib.js"
import * as B from './buffer/index.js'

const Buffer = B.Buffer

let walletclient

window.onload = function() {
  const wallets = ["Nami", "Eternl"];
  var someVarName = localStorage.getItem("someVarKey");
  if (someVarName === 'nami') {
    console.log(someVarName);
    var someVarName = "";
    localStorage.setItem("someVarKey", someVarName);
    connectNami();
  }
  if (someVarName === 'eternl') {
    console.log(someVarName);
    var someVarName = "";
    localStorage.setItem("someVarKey", someVarName);
    connectEternl();
  };
  for (const wallet of wallets) {
    if (window.cardano[wallet]?.isEnabled()) {
      console.log(`${wallet} Wallet is enabled`);
    } else {
      console.log(`${wallet} Wallet is not enabled`);
    };
  };

  
};

window.connectNami = async () => {
  await connectNami();
}

window.connectEternl = async () => {
  await connectEternl();
}
var img = document.createElement("img");


async function connectNami() {

  if (window.cardano.nami) {
    try {
      walletclient = await window.cardano.nami.enable();
      if (walletclient) {
        const walletid = (await walletclient.getNetworkId());
        img.src = "/img/icon/nami.svg"
        img.style.cssText = 'width: 30px;margin-left:0rem;'
        if (walletid == 1){
          console.log(walletclient);
          const addressHex = (await walletclient.getUsedAddresses())[0];
          const address = S.Address.from_bytes(Buffer.from(addressHex, "hex")).to_bech32();
          const walletstring = `${address.substring(0, 5)}***${address.substring(address.length - 5)}`;
          console.log(address);

          document.getElementById('wallet').innerText = walletstring;
          var logoWallet = document.getElementById('wallet-icon-selected');
          logoWallet.appendChild(img);
          //onload autoconnect
          var someVarName = "nami";
          localStorage.setItem("someVarKey", someVarName);

          // const amount = (await walletclient.getBalance());
          // console.log(amount)
        }
        else {
          window.alert("You're on testnet");
        } 
      };
    } catch (e) {
      console.log(e);
    };
  }
};

async function connectEternl(){
  if (window.cardano.eternl) {
    try {
      walletclient = await window.cardano.eternl.enable();
      if (walletclient) {
        const walletid = (await walletclient.getNetworkId());
        //insert logo on connection
        img.src = "/img/icon/eternl.png"
        img.style.cssText = 'width: 30px;margin-left:0rem;'
        if (walletid == 1){
          console.log(walletclient);
          const addressHex = (await walletclient.getUsedAddresses())[0];
          const address = S.Address.from_bytes(Buffer.from(addressHex, "hex")).to_bech32();
          const walletstring = `${address.substring(0, 5)}***${address.substring(address.length - 5)}`;
          console.log(address);
           document.getElementById('wallet').innerText = walletstring;
           var logoWallet = document.getElementById('wallet-icon-selected');
           logoWallet.appendChild(img);
          document.getElementById('wallet').innerText = walletstring;
          //onload autoconnect
          var someVarName = "eternl";
          localStorage.setItem("someVarKey", someVarName);

          // const balance = (await walletclient.getBalance());
          // console.log(balance)
        }
        else {
          window.alert("You're on testnet");
        } 
      };
    } catch (e) {
      console.log(e);
    };
  }
};


  //   /**
  //    * Gets the current balance of in Lovelace in the user's wallet
  //    * This doesnt resturn the amounts of all other Tokens
  //    * For other tokens you need to look into the full UTXO list
  //    * @returns {Promise<void>}
  //    */
  //    getBalance = async () => {
  //     try {
  //         const balanceCBORHex = await this.API.getBalance();

  //         const balance = Value.from_bytes(Buffer.from(balanceCBORHex, "hex")).coin().to_str();
  //         this.setState({balance})
  //         console.log(balance)

  //     } catch (err) {
  //         console.log(err)
  //     }
  // }