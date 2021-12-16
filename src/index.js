import {
  addWalletListener,
  connectWallet,
  mintPresale,
  mintPublic,
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

global.state = walletState();
global.onboardObj = onboard;
