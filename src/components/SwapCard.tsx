import React, { useState } from 'react';
import { ArrowsUpDownIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useSwap } from '../hooks/useSwap';

type TokenType = 'ETH' | 'USDC';

interface TokenInfo {
  symbol: string;
  name: string;
  icon: string;
  decimals: number;
}

const tokens: Record<TokenType, TokenInfo> = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: '/tokens/eth.png',
    decimals: 18
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '/tokens/usdc.png',
    decimals: 6
  }
};

interface TokenButtonProps {
  token: TokenType;
  onClick: () => void;
}

const TokenButton = ({ token, onClick }: TokenButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 bg-[#1B2131] hover:bg-[#2C3444] px-3 py-2 rounded-full transition-all"
    >
      <img 
        src={tokens[token].icon} 
        alt={tokens[token].name} 
        className="w-6 h-6 rounded-full"
      />
      <span className="text-white font-medium">{token}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#5D6785]">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

const SwapCard = () => {
  const [fromToken, setFromToken] = useState<TokenType>('ETH');
  const [toToken, setToToken] = useState<TokenType>('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const { swap, loading, error } = useSwap();

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!fromAmount) return;
    
    const success = await swap(
      fromToken,
      toToken,
      fromAmount,
      0.5 // 0.5% slippage
    );

    if (success) {
      setFromAmount('');
      setToAmount('');
    }
  };

  return (
    <div className="w-full max-w-[464px] mx-auto">
      <div className="bg-[#0D111C]/90 backdrop-blur-xl rounded-[32px] border border-[#1B2131] shadow-xl">
        <div className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between p-3 mb-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-white">Swap</h2>
              <span className="px-2 py-1 text-xs font-medium text-[#4C82FB] bg-[#4C82FB]/10 rounded-full">
                Best Price
              </span>
            </div>
            <button className="p-2 hover:bg-[#1B2131] rounded-xl transition-all duration-200">
              <Cog6ToothIcon className="w-5 h-5 text-[#5D6785]" />
            </button>
          </div>

          {/* Input Token */}
          <div className="p-3">
            <div className="bg-[#131A2A] rounded-2xl p-4 hover:bg-[#1B2131] transition-all duration-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[#5D6785]">You pay</span>
                <span className="text-sm text-[#5D6785]">Balance: 0.0</span>
              </div>
              <div className="flex items-center gap-4">
                <TokenButton token={fromToken} onClick={() => setFromToken(fromToken)} />
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent text-2xl font-medium text-white placeholder-[#5D6785] outline-none text-right"
                />
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button 
              onClick={handleSwapTokens}
              className="bg-[#131A2A] p-2 rounded-xl hover:bg-[#1B2131] transition-all duration-200 border border-[#1B2131] group"
            >
              <ArrowsUpDownIcon className="w-5 h-5 text-[#5D6785] group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Output Token */}
          <div className="p-3">
            <div className="bg-[#131A2A] rounded-2xl p-4 hover:bg-[#1B2131] transition-all duration-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[#5D6785]">You receive</span>
                <span className="text-sm text-[#5D6785]">Balance: 0.0</span>
              </div>
              <div className="flex items-center gap-4">
                <TokenButton token={toToken} onClick={() => setToToken(toToken)} />
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent text-2xl font-medium text-white placeholder-[#5D6785] outline-none text-right"
                />
              </div>
            </div>
          </div>

          {/* Connect Button */}
          <div className="p-3">
            <button 
              onClick={handleSwap}
              disabled={loading || !fromAmount}
              className="w-full bg-[#4C82FB] hover:bg-[#5B8AFF] text-white font-semibold h-14 rounded-2xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Swapping...' : 'Swap'}
            </button>
          </div>
        </div>
      </div>

      {/* Trade Route */}
      <div className="mt-3 bg-[#0D111C]/90 backdrop-blur-xl rounded-3xl border border-[#1B2131] p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#5D6785]">Route</span>
          <div className="flex items-center gap-2">
            <img src={tokens[fromToken].icon} alt={fromToken} className="w-4 h-4" />
            <span className="text-[#5D6785]">→</span>
            <img src={tokens[toToken].icon} alt={toToken} className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapCard; 