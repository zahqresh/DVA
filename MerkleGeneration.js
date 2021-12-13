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
const claimingAddress = leafNodes[1];

//get the proof for the whitelisted address
const hexProof = merkleTree.getHexProof(claimingAddress);

console.log(hexProof);
