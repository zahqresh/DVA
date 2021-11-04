import { connectWallet, mint } from "./script";



global.implement = ()=>{
    connectWallet();
}

global.mintnow = (amount)=>{
    mint(amount);
}