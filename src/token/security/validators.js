const web3 = require('@solana/web3.js');

class SecurityValidator {
    constructor(connection) {
        this.connection = connection;
        this.isPaused = false;
        
        // Token mint address
        this.tokenMint = new web3.PublicKey('H3hH6sQE1tizvgKrLYgvS6bJ7CzMHoK3HoWyJgdWit6e');
        
        // Anti-whale configurations
        this.maxWalletBalance = 20_000_000 * (10 ** 9); // 2% of total supply
        this.maxTransactionAmount = 5_000_000 * (10 ** 9); // 0.5% of total supply
        
        // Transaction tax configurations
        this.taxRate = 0.03; // 3% tax
        this.liquidityShare = 0.70; // 70% of tax goes to liquidity
        this.marketingShare = 0.30; // 30% of tax goes to marketing wallet
        
        // Updated addresses
        this.liquidityPoolAddress = new web3.PublicKey('HQR488MrDvMPk6khLUfogu5QM5uqN1BrXK2fiKSUKZww');
        this.marketingWalletAddress = new web3.PublicKey('9tKxychM6es9r6x18ug3wNLb6Sgp7LCQtnWeqWbm9D2s');
    }
}

module.exports = SecurityValidator;
