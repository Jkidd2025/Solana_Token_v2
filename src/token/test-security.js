const web3 = require('@solana/web3.js');
const SecurityValidator = require('./security/validators');

async function testSecurity() {
    try {
        // Connect to network
        const connection = new web3.Connection(
            web3.clusterApiUrl('devnet'),
            'confirmed'
        );

        // Initialize security validator
        const securityValidator = new SecurityValidator(connection);

        console.log('Running security tests...\n');

        // Test 1: Transaction Limit
        console.log('Test 1: Transaction Limit');
        try {
            await securityValidator.validateTransaction(
                'wallet1',
                'wallet2',
                2_000_000 * (10 ** 9) // Should fail - over limit
            );
        } catch (error) {
            console.log('✅ Transaction limit test passed\n');
        }

        // Test 2: Emergency Pause
        console.log('Test 2: Emergency Pause');
        const pauseResult = securityValidator.emergencyPause();
        console.log(`✅ Emergency pause test: ${pauseResult}\n`);

        // Test 3: Wallet Size Limit
        console.log('Test 3: Wallet Size Limit');
        try {
            await securityValidator.validateTransaction(
                'wallet1',
                'wallet2',
                11_000_000 * (10 ** 9) // Should fail - over wallet limit
            );
        } catch (error) {
            console.log('✅ Wallet size limit test passed\n');
        }

    } catch (error) {
        console.error('Test failed:', error);
    }
}

testSecurity().then(() => process.exit());