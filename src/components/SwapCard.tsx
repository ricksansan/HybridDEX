import React, { useState } from 'react';
import { ArrowsUpDownIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useSwap } from '@/hooks/useSwap';
import { TOKENS } from '@/constants/tokens';
import TokenSelectModal from './TokenSelectModal';

interface TokenButtonProps {
  token: string;
  onClick: () => void;
}

const TokenButton = ({ token, onClick }: TokenButtonProps) => {
  const tokenInfo = TOKENS[token];
  
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 bg-[#1B2131] hover:bg-[#2C3444] px-3 py-2 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
      style={{ background: `linear-gradient(135deg, ${tokenInfo.color}15, transparent)` }}
    >
      <img 
        src={tokenInfo.icon} 
        alt={tokenInfo.name} 
        className="w-6 h-6"
      />
      <span className="text-white font-medium">{token}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#5D6785]">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

const SwapCard = () => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDT');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSelectingFrom, setIsSelectingFrom] = useState(false);
  const [isSelectingTo, setIsSelectingTo] = useState(false);

  const { swap, loading, error } = useSwap();

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
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
                <TokenButton 
                  token={fromToken} 
                  onClick={() => setIsSelectingFrom(true)} 
                />
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
          <div className="px-3 py-1">
            <button
              onClick={handleSwapTokens}
              className="w-full bg-[#131A2A] hover:bg-[#1B2131] rounded-2xl p-2 transition-all"
            >
              <ArrowsUpDownIcon className="w-6 h-6 text-[#5D6785] mx-auto" />
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
                <TokenButton 
                  token={toToken} 
                  onClick={() => setIsSelectingTo(true)} 
                />
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

          {/* Swap Button */}
          <div className="p-3">
            <button
              onClick={() => swap(fromToken, toToken, fromAmount)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4C82FB] to-[#8C5FFF] hover:from-[#5B8AFF] hover:to-[#9D6FFF] text-white font-semibold px-6 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Swapping...' : 'Swap'}
            </button>
          </div>

          {error && (
            <div className="px-3">
              <div className="text-red-500 text-sm">{error}</div>
            </div>
          )}
        </div>
      </div>

      {/* Token Seçim Modalları */}
      <TokenSelectModal
        isOpen={isSelectingFrom}
        onClose={() => setIsSelectingFrom(false)}
        onSelect={setFromToken}
        selectedToken={fromToken}
      />
      <TokenSelectModal
        isOpen={isSelectingTo}
        onClose={() => setIsSelectingTo(false)}
        onSelect={setToToken}
        selectedToken={toToken}
      />
    </div>
  );
};

export default SwapCard; 