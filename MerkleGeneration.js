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
const claimingAddress = keccak256('0xA030ed6d2752a817747a30522B4f3F1b7f039c80');

//get the proof for the whitelisted address
const hexProof = merkleTree.getHexProof(claimingAddress);

console.log(hexProof);
console.log(merkleTree.getHexRoot());

[
  "0x5931b4ed56ace4c46b68524cb5bcbf4195f1bbaacbe5228fbd090546c88dd229",
  "0x39a01635c6a38f8beb0adde454f205fffbb2157797bf1980f8f93a5f70c9f8e6",
  "0x00518f01337d9642f00fccd733b39c7db3cc6ed5d889ee0efe99dcb103584ea1"
]