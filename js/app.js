import * as S from "./@emurgo/cardano-serialization-lib-asmjs/cardano_serialization_lib.js"
import * as B from './buffer/index.js'
const Buffer = B.Buffer

let walletclient

window.onload = function() {
  const wallets = ["nami", "eternl"];
  var namiconnected = localStorage.getItem(namiconnected);
  var someVarName = localStorage.getItem("someVarKey");
  // if (namiconnected != null){
  //   console.log(namiconnected)
  // };
  if (someVarName == 'nami') {
    console.log(someVarName);
    connectNami();
  }
  if (someVarName == 'eternl') {
    console.log(someVarName);
    connectNami();
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

async function connectNami() {
  
  if (window.cardano.nami) {
    try {
      walletclient = await window.cardano.nami.enable();
      if (walletclient) {
        const walletid = (await walletclient.getNetworkId());
       
        
        if (walletid == 1){
          console.log(walletclient);
          const addressHex = (await walletclient.getUsedAddresses())[0];
          // const icon = (await window.cardano.nami.icon); //need icons
          const address = S.Address.from_bytes(Buffer.from(addressHex, "hex")).to_bech32();
          const walletstring = `${address.substring(0, 5)}***${address.substring(address.length - 5)}`;
          console.log(address);
          document.getElementById('wallet').innerText = walletstring;
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
        if (walletid == 1){
          console.log(walletclient);
          const addressHex = (await walletclient.getUsedAddresses())[0];
          const address = S.Address.from_bytes(Buffer.from(addressHex, "hex")).to_bech32();
          const walletstring = `${address.substring(0, 5)}***${address.substring(address.length - 5)}`;
          console.log(address);
          document.getElementById('wallet').innerText = walletstring;
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