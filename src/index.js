import {
  addWalletListener,
  connectWallet,
  metonymyHodlerMint,
  mint,
  mintPresale,
  mintPublic,
  onboard,
  supply,
  togglePresale,
  walletReset,
  walletState,
} from "./script";

//connect to the wallet
global.implementWallet = () => {
  connectWallet();
};

//minting for general public
global.mintPublic = (amount) => {
  mintPublic(amount);
};

//Presale mint
global.mintPresale = (amount) => {
  mintPresale(amount);
};

//wallet event listener
global.walletChanges = () => {
  addWalletListener();
};

//reset the wallet
global.walletReset = () => {
  walletReset();
};

//toggle presale

global.togglePresale = ()=>{
  togglePresale();
}

//toggle sale
global.toggleSale = ()=>{
  toggleSale();
}



global.state = walletState();
global.onboardObj = onboard;
