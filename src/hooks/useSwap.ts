import { ethers } from 'ethers';
import { useState, useCallback } from 'react';
import { POOL_ABI } from '../constants/abis';
import { POOL_ADDRESS } from '../constants/addresses';

export const useSwap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const swap = useCallback(async (
    fromToken: string,
    toToken: string,
    amount: string,
    slippage: number = 0.5 // 0.5% default slippage
  ) => {
    try {
      setLoading(true);
      setError(null);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const pool = new ethers.Contract(POOL_ADDRESS, POOL_ABI, signer);

      const amountIn = ethers.utils.parseUnits(amount, fromToken === 'ETH' ? 18 : 6);
      const expectedOut = await pool.getAmountOut(amountIn, fromToken === 'ETH');
      const minAmountOut = expectedOut.mul(1000 - slippage * 10).div(1000);

      const tx = fromToken === 'ETH' 
        ? await pool.swapExactToken0ForToken1(amountIn, minAmountOut)
        : await pool.swapExactToken1ForToken0(amountIn, minAmountOut);

      await tx.wait();
      
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  }, []);

  return { swap, loading, error };
}; 