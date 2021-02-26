const SHA256 = require('crypto-js/sha256')

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  maineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log('Block mined: ' + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block('01/01/2021', 'Genesis block', null)
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions)
    block.maineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      console.log('k. ', block)
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      return true;
    }
  }
}

let birhanuCoin = new Blockchain();

birhanuCoin.createTransaction(new Transaction('address1', 'address2', 100));
birhanuCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
birhanuCoin.minePendingTransactions('birhams-address');
console.log('\n Blance of birham is', birhanuCoin.getBalanceOfAddress('birhams-address'));

console.log('\n Starting the miner again...');
birhanuCoin.minePendingTransactions('birhams-address');
console.log('\n Blance of birham is', birhanuCoin.getBalanceOfAddress('birhams-address'));

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