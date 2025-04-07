import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { t } = useTranslation();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              HybridDEX
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/swap" className="text-gray-600 hover:text-gray-900">
              {t('swap')}
            </Link>
            <Link to="/pools" className="text-gray-600 hover:text-gray-900">
              {t('pools')}
            </Link>
            <Link to="/farms" className="text-gray-600 hover:text-gray-900">
              {t('farms')}
            </Link>
            <Link to="/bridge" className="text-gray-600 hover:text-gray-900">
              {t('bridge')}
            </Link>
            <Link to="/stats" className="text-gray-600 hover:text-gray-900">
              {t('stats')}
            </Link>
            <Link to="/docs" className="text-gray-600 hover:text-gray-900">
              {t('docs')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Connect Wallet Button - Desktop */}
          <div className="hidden lg:block">
            {isConnected ? (
              <button
                onClick={() => disconnect()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </button>
            ) : (
              <button
                onClick={() => open()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('connectWallet')}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/swap"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('swap')}
              </Link>
              <Link
                to="/pools"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('pools')}
              </Link>
              <Link
                to="/farms"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('farms')}
              </Link>
              <Link
                to="/bridge"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('bridge')}
              </Link>
              <Link
                to="/stats"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('stats')}
              </Link>
              <Link
                to="/docs"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('docs')}
              </Link>
              <div className="px-4">
                {isConnected ? (
                  <button
                    onClick={() => {
                      disconnect();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      open();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('connectWallet')}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 