//import the modules
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { addresses } = require("./src/whiteListed");
//create arr of whitelisted addreses
const whitelistAddresses = addresses;

//convert all addrs to keccak256 hash
const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));

//create a merkle tree using our converted keccak addres hash providing the algo we used
const merkleTree = new MerkleTree(leafNodes, keccak256, {
  sortPairs: true,
  duplicateOdd: true,
});

//the above proccess is finshed we needed for generating a tree

//onclient side we get user address and converrt into keccak bacause addresses doesnt exists as the normal address
const claimingAddress = keccak256('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');

//get the proof for the whitelisted address
const hexProof = merkleTree.getHexProof(claimingAddress);

console.log(hexProof);
console.log(merkleTree.getHexRoot());

[
  "0xe18e03c2b6078361fd86e62474f326b51092a1e38dc1dcb4af42632420aadebf",
  "0x6488f6529e0d4ba595934bbdc63f299044717bfe97f7ed6de2bee7715e6a2cdc",
  "0x97522ffd2ab07cd8d8b64b01bff097efa0fc7f43b03fcec844212c47a5a18693",
  "0x9807a7094eef901f4149e1674c68ede4054e20a3b11a04d8717a06f54c1dc304",
  "0x67cdae980e5d5d6f2fd4a6ca6d791279122e277b700ad37b9138ec26ee538b79"
]