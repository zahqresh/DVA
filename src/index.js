import { connectWallet, mint } from "./script";



connectWallet();

global.mintnow = (amount)=>{
    mint(amount);
}