import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  
  return (
    <nav className="flex items-center justify-between p-4 border-b border-[#1B2131]">
      <div className="flex items-center gap-8">
        <Link className="text-xl font-bold text-white" href="/">
          HybridDEX
        </Link>
        
        <div className="flex items-center gap-1">
          <Link 
            href="/swap"
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              router.pathname === '/swap' 
                ? 'text-white bg-[#1B2131]' 
                : 'text-[#5D6785] hover:text-white'
            }`}
          >
            Swap
          </Link>
          
          <Link 
            href="/pool"
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              router.pathname === '/pool' 
                ? 'text-white bg-[#1B2131]' 
                : 'text-[#5D6785] hover:text-white'
            }`}
          >
            Pool
          </Link>
          
          <Link 
            href="/docs"
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              router.pathname === '/docs' 
                ? 'text-white bg-[#1B2131]' 
                : 'text-[#5D6785] hover:text-white'
            }`}
          >
            Docs
          </Link>
        </div>
      </div>
      
      <ConnectButton />
    </nav>
  );
};

export default Navbar; 