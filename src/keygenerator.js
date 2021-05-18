const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // And elliptic curve called secp251k1. This is the algorith that's also the basis of Bitcoin

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex')

console.log();
console.log('Private key: ', privateKey);

console.log();
console.log('Public key: ', publicKey);