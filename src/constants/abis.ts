export const POOL_ABI = [
  "function swapExactToken0ForToken1(uint256 amountIn, uint256 minAmountOut) external returns (uint256)",
  "function swapExactToken1ForToken0(uint256 amountIn, uint256 minAmountOut) external returns (uint256)",
  "function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public view returns (uint256)",
  "function addLiquidity(uint256 amount0Desired, uint256 amount1Desired) external returns (uint256)",
  "function removeLiquidity(uint256 lpTokens) external returns (uint256, uint256)",
  "function reserve0() public view returns (uint256)",
  "function reserve1() public view returns (uint256)",
  "function lpBalances(address) public view returns (uint256)"
]; 