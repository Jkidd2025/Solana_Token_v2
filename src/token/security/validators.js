const web3 = require('@solana/web3.js');

class SecurityValidator {
    constructor(connection) {
        this.connection = connection;
        this.isPaused = false;
        
        // Token Details from config
        this.tokenMint = new web3.PublicKey('ASb6zqowvuWXSn6sZAtBByhYXEu4BaNkkvn7nUvc8PJu');
        this.tokenAccount = new web3.PublicKey('DeAMCdKyZ5V1KG6W7qboFnv85ADWTNtUFS4aXxDcJz9P');
        this.decimals = 9;
        this.totalSupply = 1000000000;
        
        // Emergency controls
        this.emergencyAdmin = new web3.PublicKey('FRntomypvRjRS2MgKZ4Fyq3rSn2JguNR4T2kuWHFPN1k');
        this.lastEmergencyAction = null;
        this.emergencyLogs = [];
    }

    async isAdmin(pubkey, silent = false) {
        const isAdmin = pubkey.equals(this.emergencyAdmin);
        if (isAdmin) {
            if (!silent) this.logAction('Admin check passed', pubkey.toString());
            return true;
        }
        if (!silent) this.logAction('Admin check failed', pubkey.toString());
        return false;
    }

    async pauseTrading(pubkey) {
        if (await this.isAdmin(pubkey)) {
            this.isPaused = true;
            this.lastEmergencyAction = 'pause';
            this.logAction('Trading paused', pubkey.toString());
            return true;
        }
        return false;
    }

    async resumeTrading(pubkey) {
        if (await this.isAdmin(pubkey)) {
            this.isPaused = false;
            this.lastEmergencyAction = 'resume';
            this.logAction('Trading resumed', pubkey.toString());
            return true;
        }
        return false;
    }

    logAction(action, address) {
        const log = {
            timestamp: new Date().toISOString(),
            action: action,
            address: address
        };
        this.emergencyLogs.push(log);
        console.log(`Emergency Action: ${action} by ${address}`);
    }

    getEmergencyLogs() {
        return this.emergencyLogs;
    }

    async clearEmergencyLogs(pubkey) {
        // Use silent admin check to prevent logging failed attempts
        if (await this.isAdmin(pubkey, true)) {
            this.emergencyLogs = [];
            this.logAction('Logs cleared', pubkey.toString());
            return true;
        }
        return false;
    }
}

module.exports = SecurityValidator;
