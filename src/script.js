import Onboard from "bnc-onboard";
import Web3 from "web3";
import { abi } from "./abi";
import $ from "jquery";
var WAValidator = require("wallet-validator");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
let web;

const FORTMATIC_KEY = "pk_live_7CFC103369096AD4";
const PORTIS_KEY = "Your Portis key here";
const INFURA_KEY = "5b3b303e5c124bdfb7029389b1a0d599";
const APP_URL = "https://www.kvltzombies.xyz/kvlt-zombies-minting-mobile";
const CONTACT_EMAIL = "muhammadhamza2965@gmail.com";
const RPC_URL = `https://mainnet.infura.io/v3/${INFURA_KEY}`;
const APP_NAME = "onboardjs";


//merkletree config
const whitelistAddresses = [
  "0x7d52923Ca0135F59B15986FCADeC7107758BbeFd",
  "0x4700B37362616085965e7B0AAD13A4f21Ec83b65",
  "0xA5c129E3EC80daB54F08C0f7D5B833f03D161007",
  "0xA030ed6d2752a817747a30522B4f3F1b7f039c80",
  "0xA030ed6d2752a817747a30522B4f3F1b7f039c81",
  "0xA030ed6d2752a817747a30522B4f3F1b7f039c82",
  "0xA030ed6d2752a817747a30522B4f3F1b7f039c83",
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
];

const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

//wallet options to provide to users
const wallets = [
  { walletName: "metamask", preferred: true },
  {
    walletName: "walletConnect",
    infuraKey: INFURA_KEY,
  },
  { walletName: "coinbase", preferred: true },
  {
    walletName: "ledger",
    rpcUrl: RPC_URL,
  },
  {
    walletName: "trezor",
    appUrl: APP_URL,
    email: CONTACT_EMAIL,
    rpcUrl: RPC_URL,
  },
  {
    walletName: "fortmatic",
    apiKey: FORTMATIC_KEY,
  },
  { walletName: "gnosis" },
];

export const onboard = Onboard({
  dappId: "e57157dd-aa3a-4b2a-a88d-36520d0193d9", // [String] The API key created by step one above
  networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      web = new Web3(wallet.provider);
    },
  },
  walletSelect: {
    wallets: wallets,
  },
});

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(
  "wss://eth-rinkeby.alchemyapi.io/v2/59kESS0j2TfE3vAK8-aCcoUggCc3WTaL"
);

const contractABI = abi;
const contractAddress = "0xC6DD5E4ecB97E31cAee4a10CC86B4AD5286fa2EC";

const theContract = new web3.eth.Contract(contractABI, contractAddress);

const price = "35000000000000000";
const presaleprice = "35000000000000000";

const loadCurrentSupply = async () => {
  const supply = await theContract.methods.totalSupply().call();

  return supply;
};

//Get the supply and attach
loadCurrentSupply()
  .then((val) => {
    $(".supply").text(`${5555 - val}/5.555`);
  })
  .catch((err) => {
    console.log(err);
    $(".supply").text("Sorry error occured!");
  });

const loadPreSaleStatus = async () => {
  const preSaleActive = await theContract.methods._preSaleIsActive
    .call()
    .call()
    .then(function (res) {
      return res.toString();
    });
  return preSaleActive;
};

const loadSaleStatus = async () => {
  const SaleActive = await theContract.methods._saleIsActive
    .call()
    .call()
    .then(function (res) {
      return res.toString();
    });
  return SaleActive;
};

const loadBalanceContract = async () => {
  const balanceContractWei = await web3.eth
    .getBalance(contractAddress)
    .then(function (res) {
      return res.toString();
    });
  const balanceContract = web3.utils.fromWei(balanceContractWei, "ether");
  return balanceContract;
};

export const connectWallet = async () => {
  await onboard.walletSelect();
  await onboard.walletCheck();

  //window.alert(onboard.getState().address);
  $(".metamask-button").text(
    `Disconnect ${onboard.getState().address.substring(0, 2)}...${onboard
      .getState()
      .address.slice(onboard.getState().address.length - 2)}`
  );
};

export const walletReset = () => {
  onboard.walletReset();
};

export const walletState = () => {
  const currentState = onboard.getState();

  console.log(currentState);
  return currentState;
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      $(".alert").text(`${err.message}`);
    }
  } else {
    $(".alert").text("Please connect a wallet");
  }
};

export const mint = async (amount) => {
  //create the merkletree
  //setup merkletreejs
  

  //console.log(merkleTree.getHexRoot())

  const claimingAddress = keccak256(onboard.getState().address);

  //get the root for the whitelisted address
  const hexProof = merkleTree.getHexProof(claimingAddress);

  //  window.contract = new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    from: onboard.getState().address,
    to: contractAddress,
    value: web3.utils.toHex(price * amount),
    data: theContract.methods
      .mintPresale(amount, hexProof)
      .encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    $(".alert").show();
    $(".alert").text(
      "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" +
        txHash
    );
  } catch (error) {
    if (error.code == 4001) {
      $(".alert").show();
      console.log(error.message);
      $(".alert").text(`Transacion have been Denied!.`);
    } else {
      $(".alert").show();
      console.log(error.message);
      $(".alert").text(
        `Please connect a wallet first, before you can mint a KVLT Zombie`
      );
    }
  }
};

export const metonymyHodlerMint = async (PreSaleAmount) => {
  //  window.contract = new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    from: onboard.getState().address,
    to: contractAddress,
    value: web3.utils.toHex(presaleprice * PreSaleAmount),
    data: theContract.methods.metonymyHodlerMint(PreSaleAmount).encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    $(".alert").show();
    $(".alert").html(
      "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" +
        txHash
    );
  } catch (error) {
    if (error.code == 4001) {
      $(".alert").show();
      console.log(error.message);
      $(".alert").text(`Transacion have been Denied!.`);
    } else {
      $(".alert").show();
      console.log(error.message);
      $(".alert").text(
        `Please connect a wallet first, before you can mint a KVLT Zombie`
      );
    }
  }
};

const preSaleStart = async () => {
  //  window.contract = new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    from: window.ethereum.selectedAddress,
    to: contractAddress,
    data: theContract.methods.preSaleStart().encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

const preSaleStop = async () => {
  //  window.contract = new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    from: window.ethereum.selectedAddress,
    to: contractAddress,
    data: theContract.methods.preSaleStop().encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

const saleStart = async () => {
  //  window.contract = new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    from: window.ethereum.selectedAddress,
    to: contractAddress,
    data: theContract.methods.saleStart().encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

const saleStop = async () => {
  //  window.contract = new web3.eth.Contract(contractABI, contractAddress);

  const transactionParameters = {
    from: window.ethereum.selectedAddress,
    to: contractAddress,
    data: theContract.methods.saleStop().encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

const withdrawAll = async () => {
  //  window.contract = new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    from: window.ethereum.selectedAddress,
    to: contractAddress,
    data: theContract.methods.withdrawAll().encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

//Account state listener
export const addWalletListener = () => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (addressArray) => {
      if (addressArray.length > 0) {
        //get the user address and display it to metamask-btn class
        let useraddress = `${addressArray[0].substring(
          0,
          2
        )}..${addressArray[0].slice(length - 2)}`;
        $(".alert").hide();
        //add alert to btn
        $(".metamask-button").text(`CONNECTED (${useraddress})`);
        console.log(useraddress);
      } else {
        $(".alert").text("Please connect a wallet");
      }
    });
  } else {
    $(".alert").text("Please connect a wallet");
  }
};

//check netowrk change if occurs
if (window.ethereum) {
  //check which netowrk user is connected to
  // detect Network account change
  window.ethereum.on("networkChanged", function (networkId) {
    console.log("networkChanged", networkId);
    if (Number(networkId) == 1) {
      console.log("This is mainnet");
      $(".net_version_alert").hide();
    }
    if (Number(networkId) != 1) {
      $(".net_version_alert").show();
      $(".net_version_alert").text("Please connect to mainnet");
      console.log("This is an unknown network.");
    }
  });
}
