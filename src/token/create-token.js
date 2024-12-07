const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
const config = require('./config');
const fs = require('fs');

async function createToken() {
    try {
        // Connect to the network
        const connection = new web3.Connection(
            config.network.endpoint,
            config.network.commitment
        );

        // Load the saved keypair
        const keypairData = JSON.parse(fs.readFileSync('keypair.json'));
        const secretKey = Uint8Array.from(keypairData.secretKey);
        const payer = web3.Keypair.fromSecretKey(secretKey);
        
        console.log('Using wallet address:', payer.publicKey.toString());

        // Check balance
        const balance = await connection.getBalance(payer.publicKey);
        console.log('Current balance:', balance / web3.LAMPORTS_PER_SOL, 'SOL');

        // Create token mint
        console.log('Creating token mint...');
        const mint = await splToken.createMint(
            connection,
            payer,
            payer.publicKey,
            payer.publicKey,
            config.token.decimals
        );

        console.log('Token mint created:', mint.toBase58());

        // Create associated token account
        const tokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            payer.publicKey
        );

        // Mint initial supply
        await splToken.mintTo(
            connection,
            payer,
            mint,
            tokenAccount.address,
            payer,
            config.token.initialSupply
        );

        console.log('Success! Token details:');
        console.log('Mint address:', mint.toBase58());
        console.log('Token account:', tokenAccount.address.toBase58());

    } catch (error) {
        console.error('Error:', error);
    }
}

createToken().then(() => process.exit());