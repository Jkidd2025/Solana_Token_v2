module.exports = {
    // Token Details
    TOKEN_MINT: 'H3hH6sQE1tizvgKrLYgvS6bJ7CzMHoK3HoWyJgdWit6e',
    TOKEN_ACCOUNT: '74KGd4KJLXRWYBeudWR2JS27dQrhAZQTBVVJcwfXxULZ',
    DECIMALS: 9,
    TOTAL_SUPPLY: 1000000000,
    NETWORK: 'devnet',
    MINT_AUTHORITY: 'FRntomypvRjRS2MgKZ4Fyq3rSn2JguNR4T2kuWHFPN1k',
    FREEZE_AUTHORITY: 'FRntomypvRjRS2MgKZ4Fyq3rSn2JguNR4T2kuWHFPN1k',

    // Distribution Accounts (Final)
    DISTRIBUTION: {
        PUBLIC_SALE: {
            address: '4BtyxJFLE8vhKMaDXYxp2BFVY2BqKuUvUMfp3RBAQi8r',
            amount: 400000000,  // 40%
        },
        LIQUIDITY_POOL: {
            address: 'HQR488MrDvMPk6khLUfogu5QM5uqN1BrXK2fiKSUKZww',
            amount: 300000000,  // 30%
        },
        COMMUNITY_REWARDS: {
            address: '6XwH7qiwe9KKWLUvAeFeuJ4bBw33Xd4Re6aHnzDdEtFo',
            amount: 150000000,  // 15%
        },
        TEAM_DEV: {
            address: 'GFA8LQkKZvjdS6ncJPUKqKMCYyNxMv3fYABVXQRAGFLh',
            amount: 100000000,  // 10%
        },
        MARKETING: {
            address: '9tKxychM6es9r6x18ug3wNLb6Sgp7LCQtnWeqWbm9D2s',
            amount: 50000000,   // 5%
        }
    }
};
