# UniswapNodeJS

![DeFi](https://img.shields.io/badge/DeFi-Analytics-blue)
![Node.js API](https://img.shields.io/badge/Node.js-API-green)
![Web3](https://img.shields.io/badge/Web3-Integration-yellow)
![Foundry](https://img.shields.io/badge/Foundry-Testing-orange)

## Resume
This code defines a service (NodeJS-Express) that interacts with Uniswap V3 to fetch liquidity pool data. It uses the ethers.js library to connect to the Ethereum blockchain via an RPC provider. The service queries Uniswap V3's factory contract to locate a specific pool (based on tokenA/tokenB and fee parameters), then retrieves detailed information including token addresses, symbols, decimals, total liquidity, and current price (calculated from sqrtPriceX96). It returns the structured data in a JSON object. Ideal for integration into DeFi analytics APIs.

## Folder structure
```bash
├── config/
│   └── constants.js 
├── abis/
│   ├── uniswapV3Factory.json
│   ├── uniswapV3Pool.json
│   └── erc20.json
├── services/
│   └── ethereumService.js
├── controllers/
│   └── uniswapController.js
├── routes/
│   └── api.js
└── server.js
```

### 1. Install Required Dependencies 
```bash
npm install express ethers@5.7.2
npm install dotenv
npm install helmet 
npm install compression
npm install morgan
npm install cors
```

### Local Testing with Foundry

#### Execution:
```bash
anvil --fork-url https://base-sepolia.g.alchemy.com/v2/v3/MY_ALCHEMY_KEY
```
Update your provider configuration to:
```javascript
//constants.js 
RPC: {
    MAINNET: "http://localhost:8545"
},

//ethereumService.js
this.provider = new ethers.providers.JsonRpcProvider(constants.RPC.MAINNET);
```

## Application Execution
```bash
NODE_ENV=staging node server.js
```

## Endpoint Verification
```
http://localhost:3000/api/AsielApiTest
```

### CLI Test
```bash
curl -X GET http://localhost:3000/api/AsielApiTest
```
