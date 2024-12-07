// Security Configuration
module.exports = {
  maxTransactionLimit: 1_000_000 * (10 ** 9),
  emergencyPauseEnabled: true,
  multiSigRequired: true,
  minimumHoldTime: 24 * 3600,
  
  // Distribution Security Settings
  distributionSecurity: {
      publicSale: {
          maxWalletSize: 10_000_000 * (10 ** 9),
          antiWhale: true,
          transferLock: false
      },
      liquidity: {
          lockDuration: 365 * 24 * 3600,
          transferLock: true
      }
  }
};