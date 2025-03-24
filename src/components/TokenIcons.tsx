export const TokenIcons = {
  ETH: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#627EEA"/>
      <path d="M12.373 3v6.652l5.623 2.513L12.373 3z" fill="#fff" fillOpacity=".6"/>
      <path d="M12.373 3L6.75 12.165l5.623-2.513V3z" fill="#fff"/>
      <path d="M12.373 16.476v4.52L18 13.212l-5.627 3.264z" fill="#fff" fillOpacity=".6"/>
      <path d="M12.373 20.996v-4.52L6.75 13.212l5.623 7.784z" fill="#fff"/>
      <path d="M12.373 15.43l5.623-3.265-5.623-2.513v5.778z" fill="#fff" fillOpacity=".2"/>
      <path d="M6.75 12.165l5.623 3.265V9.652L6.75 12.165z" fill="#fff" fillOpacity=".6"/>
    </svg>
  ),
  USDC: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#2775CA"/>
      <path d="M15.09 8.808c-.36-.183-.75-.33-1.17-.435a8.376 8.376 0 00-2.61-.373v-3H9.69V5c-.87 0-1.71.12-2.52.36-.81.24-1.56.57-2.25.99l1.2 2.07c.48-.3.99-.54 1.53-.72.54-.18 1.11-.27 1.71-.27.72 0 1.29.15 1.71.45.42.3.63.75.63 1.35v.63h-1.98c-1.44 0-2.55.27-3.33.81-.78.54-1.17 1.35-1.17 2.43 0 .9.3 1.62.9 2.16.6.54 1.41.81 2.43.81.75 0 1.41-.12 1.98-.36.57-.24 1.05-.6 1.44-1.08h.09v1.26h1.62v-6.21c0-1.02-.27-1.83-.81-2.43-.54-.6-1.32-.99-2.34-1.17zm-1.17 7.47c-.36.3-.84.45-1.44.45-.54 0-.96-.12-1.26-.36-.3-.24-.45-.57-.45-.99 0-.48.18-.84.54-1.08.36-.24.9-.36 1.62-.36h1.98v1.35c-.15.42-.45.75-.9.99z" fill="#fff"/>
    </svg>
  ),
  // Diğer token SVGleri...
};

// Kullanımı:
const TokenButton = ({ token, onClick }: { token: string; onClick: () => void }) => {
  const Icon = TokenIcons[token];
  
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 bg-[#1B2131] hover:bg-[#2C3444] px-3 py-2 rounded-full transition-all"
    >
      <Icon />
      <span className="text-white font-medium">{token}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#5D6785]">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}; 