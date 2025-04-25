const { ethers } = require('ethers');
const constants = require('../config/constants');
const uniswapV3FactoryABI = require('../abis/uniswapV3Factory.json');
const uniswapV3PoolABI = require('../abis/uniswapV3Pool.json');
const erc20ABI = require('../abis/erc20.json');

class EthereumService {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(constants.RPC.MAINNET);
  }

  async getUniswapV3PoolData(tokenA, tokenB, fee) {
    try {
      // Connect to Factory contract...
      const factoryContract = new ethers.Contract(
        constants.ADDRESSES.UNISWAP_V3_FACTORY,
        uniswapV3FactoryABI,
        this.provider
      );
      
      // Get the contract owner...
      const owner = await factoryContract.owner();
      
      // Get the pool address
      const poolAddress = await factoryContract.getPool(tokenA, tokenB, fee);
      
      // Connect to the pool contract
      const poolContract = new ethers.Contract(
        poolAddress,
        uniswapV3PoolABI,
        this.provider
      );
      
      // Get pool information
      const token0Address = await poolContract.token0();
      const token1Address = await poolContract.token1();
      const poolFee = await poolContract.fee();
      const liquidity = await poolContract.liquidity();
      const slot0 = await poolContract.slot0();
      
      // Connect to token contracts
      const token0Contract = new ethers.Contract(token0Address, erc20ABI, this.provider);
      const token1Contract = new ethers.Contract(token1Address, erc20ABI, this.provider);
      
      // Get information about the tokens
      const token0Symbol = await token0Contract.symbol();
      const token1Symbol = await token1Contract.symbol();
      const token0Decimals = await token0Contract.decimals();
      const token1Decimals = await token1Contract.decimals();
      
      // Calculate the current price based on sqrtPriceX96
      const sqrtPriceX96 = slot0.sqrtPriceX96;
      const price = (sqrtPriceX96 * sqrtPriceX96 * (10 ** (token1Decimals - token0Decimals))) / (2 ** 192);
      
      return {
        factoryAddress: constants.ADDRESSES.UNISWAP_V3_FACTORY,
        factoryOwner: owner,
        poolAddress: poolAddress,
        token0: {
          address: token0Address,
          symbol: token0Symbol,
          decimals: token0Decimals.toString()
        },
        token1: {
          address: token1Address,
          symbol: token1Symbol,
          decimals: token1Decimals.toString()
        },
        poolFee: `${poolFee.toString() / 10000}%`,
        liquidity: liquidity.toString(),
        tick: slot0.tick.toString(),
        sqrtPriceX96: slot0.sqrtPriceX96.toString(),
        price: price.toString()
      };
    } catch (error) {
      console.error("Error fetching Uniswap V3 pool data:", error);
      throw error;
    }
  }
}

module.exports = new EthereumService();