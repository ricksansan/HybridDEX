import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { POOL_ADDRESS, USDC_ADDRESS } from '@/constants/addresses';
import { POOL_ABI, USDC_ABI } from '@/constants/abis';
import { parseUnits } from 'viem';

export default function Pool() {
  const { address } = useAccount();
  const [ethAmount, setEthAmount] = useState('');
  const [usdcAmount, setUsdcAmount] = useState('');

  // USDC Approve
  const { config: approveConfig } = usePrepareContractWrite({
    address: USDC_ADDRESS as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'approve',
    args: [POOL_ADDRESS as `0x${string}`, usdcAmount ? parseUnits(usdcAmount, 6) : 0n],
    enabled: Boolean(usdcAmount && address)
  });

  const { write: approve, isLoading: isApproving } = useContractWrite(approveConfig);

  // Add Liquidity
  const { config: addLiquidityConfig } = usePrepareContractWrite({
    address: POOL_ADDRESS as `0x${string}`,
    abi: POOL_ABI,
    functionName: 'addLiquidityETH',
    args: [usdcAmount ? parseUnits(usdcAmount, 6) : 0n],
    value: ethAmount ? parseUnits(ethAmount, 18) : 0n,
    enabled: Boolean(ethAmount && usdcAmount && address)
  });

  const { write: addLiquidity, isLoading: isAddingLiquidity } = useContractWrite(addLiquidityConfig);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Add Liquidity</h1>
          
          <div className="space-y-4">
            {/* ETH Input */}
            <div className="glass-panel p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-[#5D6785]">ETH Amount</span>
              </div>
              <input
                type="number"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-transparent text-2xl outline-none"
              />
            </div>

            {/* USDC Input */}
            <div className="glass-panel p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-[#5D6785]">USDC Amount</span>
              </div>
              <input
                type="number"
                value={usdcAmount}
                onChange={(e) => setUsdcAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-transparent text-2xl outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => approve?.()}
                disabled={!approve || isApproving}
              >
                {isApproving ? 'Approving...' : 'Approve USDC'}
              </Button>

              <Button
                className="w-full"
                onClick={() => addLiquidity?.()}
                disabled={!addLiquidity || isAddingLiquidity}
              >
                {isAddingLiquidity ? 'Adding Liquidity...' : 'Add Liquidity'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}