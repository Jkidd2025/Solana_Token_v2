const web3 = require('@solana/web3.js');
const config = require('../../config/token.config.js');

class SecurityValidator {
    constructor(connection) {
        this.connection = connection;
        this.isPaused = false;
        
        // Token Details from config
        this.tokenMint = new web3.PublicKey(config.TOKEN_MINT);
        this.tokenAccount = new web3.PublicKey(config.TOKEN_ACCOUNT);
        this.decimals = config.DECIMALS;
        this.totalSupply = config.TOTAL_SUPPLY;
        
        // Emergency controls
        this.emergencyAdmin = new web3.PublicKey('FRntomypvRjRS2MgKZ4Fyq3rSn2JguNR4T2kuWHFPN1k');
        this.lastEmergencyAction = null;
        this.emergencyLogs = [];
    }

    // [Previous methods remain the same...]
}

module.exports = SecurityValidator;
