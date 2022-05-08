import * as S from "./@emurgo/cardano-serialization-lib-asmjs/cardano_serialization_lib.js"
import * as B from './buffer/index.js'
const Buffer = B.Buffer

let walletclient

window.onload = function() {
  const wallets = ["nami", "eternl"];
  var namiconnected = localStorage.getItem(namiconnected);
  var someVarName = localStorage.getItem("someVarKey");
  if (someVarName === 'nami') {
    console.log(someVarName);
    connectNami();
  }
  if (someVarName === 'eternl') {
    console.log(someVarName);
    connectEternl();
  };
  for (const wallet of wallets) {
    if (window.cardano[wallet]?.isEnabled()) {
      console.log(`${wallet} wallet is enabled`);
    } else {
      console.log(`${wallet} wallet is not enabled`);
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