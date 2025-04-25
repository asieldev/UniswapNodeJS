const ethereumService = require('../services/ethereumService');
const constants = require('../config/constants');

class UniswapController {
  async getPoolInfo(req, res) {
    try {
      console.log("Querying contract information on Ethereum...");
      
      const poolData = await ethereumService.getUniswapV3PoolData(
        constants.ADDRESSES.WETH,
        constants.ADDRESSES.USDC,
        constants.UNISWAP.DEFAULT_POOL_FEE
      );
      
      // Display data in the server console
      console.log("Uniswap V3 Pool Data:");
      console.log(JSON.stringify(poolData, null, 2));
      
      // Response
      res.json({
        success: true,
        message: "Uniswap V3 information obtained correctly",
        data: poolData
      });
    } catch (error) {
      console.error("Error when querying Ethereum information:", error);
      res.status(500).json({
        success: false,
        message: "Error when obtaining contract information on Ethereum",
        error: error.message
      });
    }
  }
}

module.exports = new UniswapController();