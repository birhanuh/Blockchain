const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2021', 'Genesis block', "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      // Check if the hash is valid
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Check if previous hash is correct
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      return true;
    }
  }
}

let birhanuCoin = new Blockchain();

birhanuCoin.addBlock(new Block(1, '02/01/2021', { amount: 4 }));
birhanuCoin.addBlock(new Block(2, '02/01/2021', { amount: 10 }));

console.log('Is blockchain valid?', birhanuCoin.isChainValid());

// Tampering the block
birhanuCoin.chain[1].data = { amount: 100 }; // Change data
birhanuCoin.chain[1].hash = birhanuCoin.chain[1].calculateHash(); // Recalculate hash

console.log('Is blockchain valid?', birhanuCoin.isChainValid());

// console.log(JSON.stringify(birhanuCoin, null, 4));