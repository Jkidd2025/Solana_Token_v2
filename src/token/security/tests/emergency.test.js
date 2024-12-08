const web3 = require('@solana/web3.js');
const SecurityValidator = require('../validators.js');

async function testEmergencyControls() {
    // Setup
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
    const validator = new SecurityValidator(connection);
    
    // Test keys
    const adminKey = new web3.PublicKey('FRntomypvRjRS2MgKZ4Fyq3rSn2JguNR4T2kuWHFPN1k');
    const fakeAdminKey = new web3.PublicKey('9tKxychM6es9r6x18ug3wNLb6Sgp7LCQtnWeqWbm9D2s');
    
    console.log('Testing Emergency Controls...\n');

    // Test 1: Valid Admin Pause
    console.log('Test 1: Valid Admin Pause');
    const pauseResult = await validator.pauseTrading(adminKey);
    console.log('Trading Paused:', pauseResult);
    console.log('Is Paused:', validator.isPaused);
    
    // Test 2: Invalid Admin Attempt
    console.log('\nTest 2: Invalid Admin Attempt');
    const invalidPauseResult = await validator.pauseTrading(fakeAdminKey);
    console.log('Invalid Pause Attempt:', invalidPauseResult);
    
    // Test 3: Check Logs
    console.log('\nTest 3: Emergency Logs');
    console.log(validator.getEmergencyLogs());
    
    // Test 4: Valid Admin Resume
    console.log('\nTest 4: Valid Admin Resume');
    const resumeResult = await validator.resumeTrading(adminKey);
    console.log('Trading Resumed:', resumeResult);
    console.log('Is Paused:', validator.isPaused);
    
    // Test 5: Invalid Admin Clear Logs
    console.log('\nTest 5: Invalid Admin Clear Logs');
    const logsBeforeClear = validator.getEmergencyLogs().length;
    const invalidClearResult = await validator.clearEmergencyLogs(fakeAdminKey);
    const logsAfterClear = validator.getEmergencyLogs().length;
    console.log('Invalid Clear Attempt:', invalidClearResult);
    console.log('Logs before clear:', logsBeforeClear);
    console.log('Logs after clear:', logsAfterClear);
    console.log('Logs preserved correctly:', logsBeforeClear === logsAfterClear);
}

testEmergencyControls().catch(console.error);
