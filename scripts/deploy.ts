const { ethers } = require("hardhat");

async function deployHybridPool() {
  // Sepolia test ağındaki adresler
  const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; // ETH için özel adres
  const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // Sepolia USDC

  // HybridPool kontratını deploy et
  const HybridPool = await ethers.getContractFactory("HybridPool");
  const pool = await HybridPool.deploy(ETH_ADDRESS, USDC_ADDRESS);
  await pool.waitForDeployment();
  
  const poolAddress = await pool.getAddress();
  console.log("ETH-USDC HybridPool deployed to:", poolAddress);

  // Adresi kaydet
  const fs = require("fs");
  fs.writeFileSync(
    "./src/constants/addresses.ts",
    `export const POOL_ADDRESS = "${poolAddress}";
export const ETH_ADDRESS = "${ETH_ADDRESS}";
export const USDC_ADDRESS = "${USDC_ADDRESS}";`
  );
}

deployHybridPool()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 