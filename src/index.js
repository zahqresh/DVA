import {
  addWalletListener,
  connectWallet,
  metonymyHodlerMint,
  mint,
  onboard,
  supply,
  walletReset,
  walletState,
} from "./script";

//connect to the wallet
global.implementWallet = () => {
  connectWallet();
};

//minting for general public
global.publicMint = (amount) => {
  metonymyHodlerMint(amount);
};

//Presale mint
global.presaleMint = (amount) => {
  mint(amount);
};

//wallet event listener
global.walletChanges = () => {
  addWalletListener();
};

//reset the wallet
global.walletReset = () => {
  walletReset();
};



global.state = walletState();
global.onboardObj = onboard;
