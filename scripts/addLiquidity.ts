async function addInitialLiquidity() {
  const hardhat = require("hardhat");
  const { ethers } = hardhat;

  const POOL_ADDRESS = "0x9fDfA330a22F4dFA2D4465D8577B0CA07cE82601";

  const pool = await ethers.getContractAt("HybridPool", POOL_ADDRESS);
  
  const amount0 = ethers.parseEther("0.01");
  const amount1 = ethers.parseUnits("18", 6);
  
  await pool.addLiquidity(amount0, amount1);  
  console.log("Likidite eklendi");
}

addInitialLiquidity().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 