import {
  addWalletListener,
  connectWallet,
  metonymyHodlerMint,
  mint,
  onboard,
  walletReset,
  walletState,
} from "./script";

//connect to the wallet
global.implementWallet = () => {
  connectWallet();
};

//minting for holders
global.holdersMint = (amount) => {
  metonymyHodlerMint(amount);
};

//General minting
global.generalMint = (amount) => {
  mint(amount);
};

//wallet event listener
global.walletChanges = () => {
  addWalletListener();
};

global.walletReset = () => {
  walletReset();
};

global.state = walletState();
global.onboardObj = onboard;
