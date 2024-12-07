const web3 = require('@solana/web3.js');
const fs = require('fs');

// Generate a new keypair
const keypair = web3.Keypair.generate();

// Create the keypair data object
const keypairData = {
    publicKey: keypair.publicKey.toString(),
    secretKey: Array.from(keypair.secretKey)
};

// Save to keypair.json
fs.writeFileSync('keypair.json', JSON.stringify(keypairData));

console.log('Generated keypair and saved to keypair.json');
console.log('Public key:', keypair.publicKey.toString());