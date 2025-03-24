import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SparklesIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const router = useRouter();
  
  return (
    <nav className="border-b border-[#1B2131] bg-gradient-to-r from-[#0D111C] to-[#1a1f2e] backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 pl-2 group">
              <SparklesIcon className="w-8 h-8 text-[#4C82FB] animate-pulse" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4C82FB] to-[#8C5FFF] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                HybridDEX
              </h1>
            </Link>
            <div className="hidden md:flex items-center gap-6 bg-[#1B2131]/50 p-1 rounded-2xl backdrop-blur-lg">
              <Link 
                href="/swap"
                className={`px-4 py-2 rounded-xl transition-all ${
                  router.pathname === '/swap' 
                    ? 'bg-gradient-to-r from-[#4C82FB] to-[#8C5FFF] text-white shadow-lg' 
                    : 'text-[#5D6785] hover:text-white hover:bg-[#2C3444]'
                }`}
              >
                Swap
              </Link>
              <Link 
                href="/pool"
                className={`px-4 py-2 rounded-xl transition-all ${
                  router.pathname === '/pool' 
                    ? 'bg-gradient-to-r from-[#4C82FB] to-[#8C5FFF] text-white shadow-lg' 
                    : 'text-[#5D6785] hover:text-white hover:bg-[#2C3444]'
                }`}
              >
                Pool
              </Link>
            </div>
          </div>
          
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              return (
                <div
                  {...(!mounted && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!mounted || !account || !chain) {
                      return (
                        <button
                          onClick={openConnectModal}
                          className="bg-gradient-to-r from-[#4C82FB] to-[#8C5FFF] hover:from-[#5B8AFF] hover:to-[#9D6FFF] text-white font-semibold px-6 py-2.5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-6 py-2.5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          Wrong Network
                        </button>
                      );
                    }

                    return (
                      <div className="flex items-center gap-4">
                        <button
                          onClick={openChainModal}
                          className="flex items-center gap-2 bg-[#1B2131] hover:bg-[#2C3444] px-4 py-2.5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 border border-[#2C3444]"
                        >
                          {chain.hasIcon && (
                            <div className="w-5 h-5">
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  className="w-5 h-5"
                                />
                              )}
                            </div>
                          )}
                          <span className="text-white">{chain.name}</span>
                        </button>

                        <button
                          onClick={openAccountModal}
                          className="flex items-center gap-2 bg-gradient-to-r from-[#1B2131] to-[#2C3444] hover:from-[#2C3444] hover:to-[#3C4454] px-4 py-2.5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 border border-[#2C3444]"
                        >
                          <span className="text-white font-medium">
                            {account.displayName}
                          </span>
                          <span className="text-[#4C82FB] font-medium">
                            {account.displayBalance}
                          </span>
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 