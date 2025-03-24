import { Dialog } from '@headlessui/react';
import { XMarkIcon, MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { TOKENS, Token } from '@/constants/tokens';

interface TokenSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: string) => void;
  selectedToken?: string;
}

export default function TokenSelectModal({
  isOpen,
  onClose,
  onSelect,
  selectedToken
}: TokenSelectModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'favorites'
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const filteredTokens = Object.entries(TOKENS).filter(([symbol, token]) =>
    (activeTab === 'all' || favorites.includes(symbol)) &&
    (symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-[#0D111C] rounded-3xl border border-[#1B2131] shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-xl font-semibold text-white">
                Select a token
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#1B2131] rounded-xl transition-all"
              >
                <XMarkIcon className="w-5 h-5 text-[#5D6785]" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#1B2131] text-white'
                    : 'text-[#5D6785] hover:text-white'
                }`}
              >
                All Tokens
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'favorites'
                    ? 'bg-[#1B2131] text-white'
                    : 'text-[#5D6785] hover:text-white'
                }`}
              >
                Favorites
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-[#5D6785]" />
              </div>
              <input
                type="text"
                placeholder="Search by name or paste address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131A2A] text-white pl-10 pr-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-[#4C82FB] placeholder-[#5D6785]"
              />
            </div>

            {/* Common Tokens */}
            {searchQuery === '' && activeTab === 'all' && (
              <div className="mb-4">
                <h3 className="text-sm text-[#5D6785] mb-2">Common tokens</h3>
                <div className="flex flex-wrap gap-2">
                  {['WETH', 'USDT', 'USDC', 'DAI'].map((symbol) => (
                    <button
                      key={symbol}
                      onClick={() => {
                        onSelect(symbol);
                        onClose();
                      }}
                      className="flex items-center gap-2 bg-[#1B2131]/50 hover:bg-[#2C3444] px-3 py-2 rounded-xl transition-all"
                    >
                      <img
                        src={TOKENS[symbol].icon}
                        alt={symbol}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-white">{symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Token List */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {filteredTokens.map(([symbol, token]) => (
                <div
                  key={symbol}
                  className={`flex items-center gap-4 p-3 rounded-2xl hover:bg-[#1B2131] transition-all ${
                    selectedToken === symbol ? 'bg-[#1B2131]' : ''
                  }`}
                >
                  <button
                    onClick={() => {
                      onSelect(symbol);
                      onClose();
                    }}
                    className="flex-1 flex items-center gap-4"
                  >
                    <img
                      src={token.icon}
                      alt={token.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-white font-medium">{symbol}</span>
                      <span className="text-sm text-[#5D6785]">{token.name}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => toggleFavorite(symbol)}
                    className="p-2 hover:bg-[#2C3444] rounded-xl transition-all"
                  >
                    {favorites.includes(symbol) ? (
                      <StarIconSolid className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <StarIcon className="w-5 h-5 text-[#5D6785]" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 