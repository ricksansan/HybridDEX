require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const config = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_URL,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

module.exports = config; 