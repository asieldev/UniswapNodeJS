// constants.js
require('dotenv').config();

module.exports = {
  ADDRESSES: {
    UNISWAP_V3_FACTORY: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  },

  RPC: {
    MAINNET: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  },

  UNISWAP: {
    DEFAULT_POOL_FEE: 3000 // 0.3%
  }
};
