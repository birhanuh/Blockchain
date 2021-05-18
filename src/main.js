const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const secrets = require('../secrets.json');

// Initialize key
const myKey = ec.keyFromPrivate(secrets.private_key);
const myWalletAddress = myKey.getPublic('hex');

let birhanuCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10)
console.log('X : ', tx1.signTransaction(myKey));
tx1.signTransaction(myKey);
birhanuCoin.addTransaction(tx1);

// birhanuCoin.createTransaction(new Transaction('address1', 'address2', 100));
// birhanuCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
birhanuCoin.minePendingTransactions(myWalletAddress);
console.log('\n Blance of birham is', birhanuCoin.getBalanceOfAddress(myWalletAddress));

// Tamper a transaction
birhanuCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', birhanuCoin.isChainValid());

// console.log('\n Starting the miner again...');
// birhanuCoin.minePendingTransactions('birhams-address');
// console.log('\n Blance of birham is', birhanuCoin.getBalanceOfAddress('birhams-address'));

/**
console.log('Mining block 1...');
birhanuCoin.addBlock(new Block(1, '02/01/2021', { amount: 4 }));

console.log('Mining block 2 ...');
birhanuCoin.addBlock(new Block(2, '02/01/2021', { amount: 10 }));
*/

/**
// console.log(JSON.stringify('Print blockchain', birhanuCoin, null, 4));

console.log('Is blockchain valid', birhanuCoin.isChainValid());

// Tampering the block
birhanuCoin.chain[1].data = { amount: 100 }; // Change data
birhanuCoin.chain[1].hash = birhanuCoin.chain[1].calculateHash(); // Recalculate hash

console.log('Is blockchain valid', birhanuCoin.isChainValid());
*/