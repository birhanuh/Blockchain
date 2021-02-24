const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
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
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2021', { name: 'Genesis block', owner: 'Me' }, null)
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.hash = newBlock.calculateHash();
    newBlock.maineBlock(this.difficulty);
    this.chain.push(newBlock);
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

console.log('Mining block 1...');
birhanuCoin.addBlock(new Block(1, '02/01/2021', { amount: 4 }));

console.log('Mining block 2 ...');
birhanuCoin.addBlock(new Block(2, '02/01/2021', { amount: 10 }));

/**
// console.log(JSON.stringify('Print blockchain', birhanuCoin, null, 4));

console.log('Is blockchain valid', birhanuCoin.isChainValid());

// Tampering the block
birhanuCoin.chain[1].data = { amount: 100 }; // Change data
birhanuCoin.chain[1].hash = birhanuCoin.chain[1].calculateHash(); // Recalculate hash

console.log('Is blockchain valid', birhanuCoin.isChainValid());
*/