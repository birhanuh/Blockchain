const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const secrets = require('../secrets.json');

// Your private key goes here
const myKey = ec.keyFromPrivate(secrets.private_key);

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const birhanuCoin = new Blockchain();

// Mine first block
birhanuCoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
birhanuCoin.addTransaction(tx1);

// Mine block
console.log('Starting the miner...');
birhanuCoin.minePendingTransactions(myWalletAddress);

console.log(`Balance of birhanu is ${birhanuCoin.getBalanceOfAddress(myWalletAddress)} \n`);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
birhanuCoin.addTransaction(tx2);

// Mine block
console.log('Starting the miner...');
birhanuCoin.minePendingTransactions(myWalletAddress);

console.log(`Balance of birhanu is ${birhanuCoin.getBalanceOfAddress(myWalletAddress)}`);

/**
Tamper a transaction
birhanuCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', birhanuCoin.isChainValid());

console.log('\n Starting the miner again...');
birhanuCoin.minePendingTransactions('birhams-address');
console.log('\n Blance of birham is', birhanuCoin.getBalanceOfAddress('birhams-address'));
*/

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