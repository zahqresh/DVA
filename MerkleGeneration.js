//import the modules
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
//create arr of whitelisted addreses
const whitelistAddresses = [
  "0x7d52923Ca0135F59B15986FCADeC7107758BbeFd",
  "0x3bcF2Ec850E30Eb52d61D5a4Fc451436818F5a1e",
  "0x8277EeC6B3dfb115CC1663426DD738eB719cc19b",
  "0xA030ed6d2752a817747a30522B4f3F1b7f039c80",
];

//convert all addrs to keccak256 hash
const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));

//create a merkle tree using our converted keccak addres hash providing the algo we used
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

//the above proccess is finshed we needed for generating a tree

//onclient side we get user address and converrt into keccak bacause addresses doesnt exists as the normal address
const claimingAddress = leafNodes[1];

//get the proof for the whitelisted address
const hexProof = merkleTree.getHexProof(claimingAddress);

console.log(merkleTree.getHexRoot());
