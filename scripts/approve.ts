async function approveTokens() {
  const hardhat = require("hardhat");
  const { ethers } = hardhat;

  const POOL_ADDRESS = "0x20Dbd563CB4d990a437396c5bd7242F039daB36C";
  const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
  const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

  const WETH_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)"
  ];

  const [signer] = await ethers.getSigners();
  const weth = new ethers.Contract(WETH_ADDRESS, WETH_ABI, signer);
  const usdc = new ethers.Contract(USDC_ADDRESS, WETH_ABI, signer);

  const amount0 = ethers.parseEther("0.005");
  const amount1 = ethers.parseUnits("18", 6);

  try {
    console.log("Approving WETH...");
    const tx1 = await weth.approve(POOL_ADDRESS, amount0);
    await tx1.wait();
    console.log("WETH approved!");

    console.log("Approving USDC...");
    const tx2 = await usdc.approve(POOL_ADDRESS, amount1);
    await tx2.wait();
    console.log("USDC approved!");
  } catch (error) {
    console.error("Error:", error);
  }
}

approveTokens().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 