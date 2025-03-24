import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D111C] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#4C82FB] to-[#8C5FFF] bg-clip-text text-transparent">
              Trade tokens with
            </span>
            <br />
            <span className="text-white">
              lightning speed
            </span>
          </h1>
          
          <p className="text-[#5D6785] text-xl mb-12 max-w-2xl mx-auto">
            Experience the future of decentralized trading with HybridDEX. 
            Fast, secure, and efficient token swaps with minimal slippage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/swap"
              className="bg-gradient-to-r from-[#4C82FB] to-[#8C5FFF] hover:from-[#5B8AFF] hover:to-[#9D6FFF] text-white font-semibold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              Launch App
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            
            <a 
              href="https://docs.hybriddex.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B2131] hover:bg-[#2C3444] text-white font-semibold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Documentation
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="bg-[#1B2131]/50 backdrop-blur-xl p-6 rounded-2xl">
              <div className="w-12 h-12 bg-[#4C82FB]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#4C82FB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-[#5D6785]">Execute trades instantly with optimized routing and minimal latency.</p>
            </div>

            <div className="bg-[#1B2131]/50 backdrop-blur-xl p-6 rounded-2xl">
              <div className="w-12 h-12 bg-[#8C5FFF]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#8C5FFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-[#5D6785]">Built on battle-tested smart contracts with regular security audits.</p>
            </div>

            <div className="bg-[#1B2131]/50 backdrop-blur-xl p-6 rounded-2xl">
              <div className="w-12 h-12 bg-[#4C82FB]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#4C82FB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Best Rates</h3>
              <p className="text-[#5D6785]">Get the most competitive rates with advanced price optimization.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 