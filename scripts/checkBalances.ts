async function checkBalances() {
  const hardhat = require("hardhat");
  const { ethers } = hardhat;

  // Sepolia test ağı için doğru adresler
  const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";  // Sepolia WETH
  const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";  // Sepolia USDC

  // Minimal ABI - sadece balanceOf
  const MINIMAL_ABI = [
    "function balanceOf(address) view returns (uint256)"
  ];

  const [signer] = await ethers.getSigners();
  console.log("Checking balances for address:", signer.address);

  // ETH Balance
  const ethBalance = await ethers.provider.getBalance(signer.address);
  console.log("ETH Balance:", ethers.formatEther(ethBalance));

  try {
    // WETH Balance
    const weth = await ethers.getContractAt(MINIMAL_ABI, WETH_ADDRESS);
    const wethBalance = await weth.balanceOf(signer.address);
    console.log("WETH Balance:", ethers.formatEther(wethBalance));

    // USDC Balance
    const usdc = await ethers.getContractAt(MINIMAL_ABI, USDC_ADDRESS);
    const usdcBalance = await usdc.balanceOf(signer.address);
    console.log("USDC Balance:", ethers.formatUnits(usdcBalance, 6));
  } catch (error) {
    console.error("Error details:", error);
  }
}

checkBalances().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 