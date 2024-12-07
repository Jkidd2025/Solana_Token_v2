const web3 = require('@solana/web3.js');
const { TOKEN_2022_PROGRAM_ID, getMint } = require('@solana/spl-token');
const { createInitializeInstruction, TokenMetadata } = require('@solana/spl-token-metadata');
const fs = require('fs');

async function addMetadata() {
    try {
        // Connect to network
        const connection = new web3.Connection(
            web3.clusterApiUrl('devnet'),
            'confirmed'
        );

        // Load the saved keypair
        const keypairData = JSON.parse(fs.readFileSync('keypair.json'));
        const secretKey = Uint8Array.from(keypairData.secretKey);
        const payer = web3.Keypair.fromSecretKey(secretKey);

        // Your token mint address
        const mint = new web3.PublicKey('ASb6zqowvuWXSn6sZAtBByhYXEu4BaNkkvn7nUvc8PJu');

        // Metadata to store
        const metadata = {
          updateAuthority: payer.publicKey,
          mint: mint,
          name: "Your Token Name",     // e.g., "MoneyMan"
          symbol: "SYMBOL",            // e.g., "MM"
          uri: "https://your-metadata-uri.json",
          additionalMetadata: [
              ["description", "Description of your token"],
              ["image", "https://..."],        // URL to your token's image/logo
              ["external_url", "https://..."], // Your project's website
              ["attributes", JSON.stringify([
                  {
                      "trait_type": "Category",
                      "value": "Your category"
                  }
              ])]
          ]
      };

        // Create initialize metadata instruction
        const initializeMetadataInstruction = createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            metadata: mint,
            updateAuthority: payer.publicKey,
            mint: mint,
            mintAuthority: payer.publicKey,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
        });

        // Create and send transaction
        const transaction = new web3.Transaction().add(initializeMetadataInstruction);
        
        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [payer]
        );

        console.log('Metadata added successfully!');
        console.log('Transaction signature:', signature);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

addMetadata().then(() => process.exit());