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
  toggleSale,
  walletReset,
  walletState,
  withdraw,
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

global.toggle_presale = () => {
  togglePresale();
};

//toggle sale
global.toggle_sale = () => {
  toggleSale();
};

//withdraw
global.withdraw = () => {
  withdraw();
};

global.state = walletState();
global.onboardObj = onboard;
