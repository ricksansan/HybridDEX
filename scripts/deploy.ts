async function deployHybridPool() {
  const hardhat = require("hardhat");
  const { ethers } = hardhat;

  const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"; // Sepolia WETH
  const USDC_ADDRESS = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"; // Sepolia USDC

  const HybridPool = await ethers.getContractFactory("HybridPool");
  const pool = await HybridPool.deploy(WETH_ADDRESS, USDC_ADDRESS);
  await pool.waitForDeployment();
  
  const poolAddress = await pool.getAddress();
  console.log("HybridPool deployed to:", poolAddress);
}

deployHybridPool().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 