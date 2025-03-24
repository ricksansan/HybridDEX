async function wrapEth() {
  const hardhat = require("hardhat");
  const { ethers } = hardhat;

  const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
  const weth = await ethers.getContractAt("IWETH", WETH_ADDRESS);

  // 0.04 ETH'yi wrap et
  const amount = ethers.parseEther("0.005");
  await weth.deposit({ value: amount });
  console.log("0.04 ETH wrapped to WETH");
}

wrapEth().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 