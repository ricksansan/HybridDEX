async function addLiquidityETH() {
  const hardhat = require("hardhat");
  const { ethers } = hardhat;

  const POOL_ADDRESS = "0x20Dbd563CB4d990a437396c5bd7242F039daB36C";

  const ABI = [
    "function addLiquidity(uint256,uint256) external returns (uint256)"
  ];

  const [signer] = await ethers.getSigners();
  const pool = new ethers.Contract(POOL_ADDRESS, ABI, signer);
  
  const amount0 = ethers.parseEther("0.005");
  const amount1 = ethers.parseUnits("18", 6);
  
  console.log("Adding liquidity...");
  console.log("Amount0:", ethers.formatEther(amount0), "ETH");
  console.log("Amount1:", ethers.formatUnits(amount1, 6), "USDC");

  try {
    const tx = await pool.addLiquidity(amount0, amount1);
    await tx.wait();
    console.log("Liquidity added! Transaction:", tx.hash);
  } catch (error) {
    console.error("Error details:", error);
  }
}

addLiquidityETH().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 