# UniswapNodeJS

![DeFi](https://img.shields.io/badge/DeFi-Analytics-blue)
![Web3](https://img.shields.io/badge/Web3-Integration-green)
![Foundry](https://img.shields.io/badge/Foundry-Testing-orange)

## Recommended folder structure
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
## Benefits of this structure

Separation of responsibilities: *Each file has a single responsibility.*

Greater maintainability: *It's easier to update a specific part of the code.*

Better testability: *You can write unit tests for each service/controller.*

Scalability: *It's easier to add new endpoints or features.*

Readability: *The code is more readable and better organized.*

Reusability: *The Ethereum service can be reused in different parts of the application.*

## Consume Uniswap V3 from NodeJS API

### 1. Install Required Dependencies 
```bash
npm install express ethers@5.7.2

```

### 2. Configure Provider API Access
- Obtain an Alchemy or Infura API key
- Replace `MY_ALCHEMY_KEY` placeholder in your code
- Modify the RPC endpoint URL accordingly

## Development Environment Setup

### Local Testing with Foundry

#### Execution:
```bash
anvil --fork-url https://mainnet.infura.io/v3/MY_ALCHEMY_KEY
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
node server.js
```

## Endpoint Verification

### Browser Test
```
http://localhost:3000/api/AsielApiTest
```

### CLI Test
```bash
curl -X GET http://localhost:3000/api/AsielApiTest
```

## Recommended Practices
- Use environment variables for sensitive credentials
- Implement proper error handling
- Monitor API rate limits
- Consider adding API response caching

## Recommended Contract
Using the Uniswap V3 Factory contract, which will allow you to get information about liquidity pools, as well as some specific pool contracts to obtain data such as:

- Contract address  
- Token information  
- Pool liquidity  
- Trading statistics  
- Fees  
- Price ranges  

## Endpoint Implementation  
Here's how to implement the endpoint AsielApiTest in your *server.js* file:

## Setup Instructions  

1. Install required dependencies and dotenv
```bash
npm install express ethers@5.7.2
npm install dotenv
```
Advanced tooling for Uniswap V3 and multi-protocol DeFi analysis.

## Innovative Suggestions

### Endpoint Expansion for Specific Use Cases
- Add dedicated endpoints to query specific pools by their token pairs
- Develop a dashboard displaying historical and real-time metrics
- Implement WebSockets for real-time updates on prices and liquidity

### Foundry Integration for Advanced Testing
- Create Foundry scripts to simulate pool operations and analyze their impact
- Deploy test contracts that interact with pools to validate behaviors

### Advanced On-Chain Data Analytics
- Compute metrics like potential impermanent loss across pools with varying fee tiers
- Design endpoints to surface arbitrage opportunities between pools
- Implement volume and liquidity analysis to identify market trends

### Multi-Protocol DeFi Support
- Extend the API to include data from protocols like Aave, Compound, and Curve
- Build comparative analytics across protocols (e.g., APY ratios, liquidity depth)
