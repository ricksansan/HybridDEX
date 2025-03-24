// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import { IWETH } from "./interfaces/IWETH.sol";

contract HybridPool is ReentrancyGuard, Ownable {
    using Math for uint256;
    IWETH public immutable WETH; // WETH interface'i kullan
    IERC20 public immutable USDC;
    
    uint256 public reserve0;
    uint256 public reserve1;
    
    uint256 public constant MINIMUM_LIQUIDITY = 1000;
    uint256 private constant FEE_DENOMINATOR = 1000;
    uint256 public swapFee = 3; // 0.3%
    
    mapping(address => uint256) public lpBalances;
    uint256 public totalLPTokens;

    event AddLiquidity(address indexed provider, uint256 amount0, uint256 amount1, uint256 lpTokens);
    event RemoveLiquidity(address indexed provider, uint256 amount0, uint256 amount1, uint256 lpTokens);
    event Swap(address indexed user, uint256 amountIn, uint256 amountOut, bool isToken0);

    constructor(address _weth, address _usdc) {
        _transferOwnership(msg.sender);
        WETH = IWETH(_weth);
        USDC = IERC20(_usdc);
    }

    // ETH ile likidite ekleme
    function addLiquidityETH(uint256 amount1Desired) external payable nonReentrant returns (uint256 lpTokens) {
        require(msg.value > 0 && amount1Desired > 0, "Invalid amounts");

        // ETH'yi WETH'e çevir
        WETH.deposit{value: msg.value}();

        // Normal likidite ekleme işlemi
        uint256 amount0 = msg.value;
        uint256 amount1;

        if (reserve0 == 0 && reserve1 == 0) {
            amount1 = amount1Desired;
            lpTokens = Math.sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY;
            _mint(address(0), MINIMUM_LIQUIDITY);
        } else {
            amount1 = (amount0 * reserve1) / reserve0;
            if (amount1 <= amount1Desired) {
                amount0 = msg.value;
            } else {
                amount0 = (amount1Desired * reserve0) / reserve1;
                amount1 = amount1Desired;
                // Fazla ETH'yi geri gönder
                payable(msg.sender).transfer(msg.value - amount0);
            }
            lpTokens = Math.min(
                (amount0 * totalLPTokens) / reserve0,
                (amount1 * totalLPTokens) / reserve1
            );
        }

        require(lpTokens > 0, "Insufficient liquidity minted");

        USDC.transferFrom(msg.sender, address(this), amount1);

        reserve0 += amount0;
        reserve1 += amount1;
        _mint(msg.sender, lpTokens);

        emit AddLiquidity(msg.sender, amount0, amount1, lpTokens);
    }

    // Likidite çekme
    function removeLiquidity(uint256 lpTokens) external nonReentrant returns (uint256 amount0, uint256 amount1) {
        require(lpTokens > 0, "Invalid LP tokens");
        require(lpBalances[msg.sender] >= lpTokens, "Insufficient LP balance");

        amount0 = (lpTokens * reserve0) / totalLPTokens;
        amount1 = (lpTokens * reserve1) / totalLPTokens;

        require(amount0 > 0 && amount1 > 0, "Insufficient liquidity");

        _burn(msg.sender, lpTokens);
        reserve0 -= amount0;
        reserve1 -= amount1;

        USDC.transfer(msg.sender, amount1);

        emit RemoveLiquidity(msg.sender, amount0, amount1, lpTokens);
    }

    // Token0'dan Token1'e swap
    function swapExactToken0ForToken1(uint256 amountIn, uint256 minAmountOut) external nonReentrant returns (uint256 amountOut) {
        require(amountIn > 0, "Invalid input amount");
        
        amountOut = getAmountOut(amountIn, reserve0, reserve1);
        require(amountOut >= minAmountOut, "Insufficient output amount");

        WETH.transferFrom(msg.sender, address(this), amountIn);
        USDC.transfer(msg.sender, amountOut);

        reserve0 += amountIn;
        reserve1 -= amountOut;

        emit Swap(msg.sender, amountIn, amountOut, true);
    }

    // Token1'den Token0'a swap
    function swapExactToken1ForToken0(uint256 amountIn, uint256 minAmountOut) external nonReentrant returns (uint256 amountOut) {
        require(amountIn > 0, "Invalid input amount");
        
        amountOut = getAmountOut(amountIn, reserve1, reserve0);
        require(amountOut >= minAmountOut, "Insufficient output amount");

        USDC.transferFrom(msg.sender, address(this), amountIn);
        WETH.transfer(msg.sender, amountOut);

        reserve1 += amountIn;
        reserve0 -= amountOut;

        emit Swap(msg.sender, amountIn, amountOut, false);
    }

    // Çıkış miktarını hesaplama
    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public view returns (uint256) {
        require(amountIn > 0, "Invalid input amount");
        require(reserveIn > 0 && reserveOut > 0, "Insufficient liquidity");

        uint256 amountInWithFee = amountIn * (FEE_DENOMINATOR - swapFee);
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * FEE_DENOMINATOR) + amountInWithFee;

        return numerator / denominator;
    }

    // LP token mint
    function _mint(address to, uint256 amount) private {
        lpBalances[to] += amount;
        totalLPTokens += amount;
    }

    // LP token burn
    function _burn(address from, uint256 amount) private {
        lpBalances[from] -= amount;
        totalLPTokens -= amount;
    }

    // Swap ücreti güncelleme (sadece owner)
    function setSwapFee(uint256 newFee) external onlyOwner {
        require(newFee <= 30, "Fee too high"); // Max 3%
        swapFee = newFee;
    }
} 