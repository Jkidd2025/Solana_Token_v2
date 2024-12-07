// Token configuration
module.exports = {
  // Token details
  token: {
      name: "Solana _token_v2",
      symbol: "TOKEN",
      decimals: 9,
      initialSupply: 1000000000,
      mintAddress: 'H3hH6sQE1tizvgKrLYgvS6bJ7CzMHoK3HoWyJgdWit6e',
      tokenAccount: '74KGd4KJLXRWYBeudWR2JS27dQrhAZQTBVVJcwfXxULZ'
  },

  // Network configuration (using devnet for development)
  network: {
      endpoint: "https://api.devnet.solana.com",
      commitment: "confirmed"
  },

  // Metadata configuration
  metadata: {
      name: "Solana _token_v2",
      symbol: "TOKEN",
      description: "A Solana token with anti-whale and tax mechanisms",
      image: "", // Will add this later
      attributes: [],
      sellerFeeBasisPoints: 0, // No fees
  },

  // Security configurations
  security: {
      maxWalletBalance: 20_000_000 * (10 ** 9), // 2% of total supply
      maxTransactionAmount: 5_000_000 * (10 ** 9), // 0.5% of total supply
      taxRate: 0.03, // 3% tax
      liquidityShare: 0.70, // 70% of tax goes to liquidity
      marketingShare: 0.30, // 30% of tax goes to marketing wallet
      liquidityPoolAddress: 'FRntomypvRjRS2MgKZ4Fyq3rSn2JguNR4T2kuWHFPN1k',
      marketingWalletAddress: 'FRntomypvRjRS2MgKZ4Fyq3rSn2JguNR4T2kuWHFPN1k'
  }
};