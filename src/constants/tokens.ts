export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon: string;
  color?: string;
}

export const TOKENS: { [key: string]: Token } = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18,
    icon: '/images/tokens/eth.svg',
    color: '#627EEA'
  },
  WETH: {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    decimals: 18,
    icon: '/images/tokens/weth.svg',
    color: '#627EEA'
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    decimals: 6,
    icon: '/images/tokens/usdt.svg',
    color: '#26A17B'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 6,
    icon: '/tokens/usdc.png'
  },
  DAI: {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    decimals: 18,
    icon: '/images/tokens/dai.svg',
    color: '#F5AC37'
  }
};

export const POPULAR_PAIRS = [
  { from: 'WETH', to: 'USDT' },
  { from: 'WETH', to: 'USDC' },
  { from: 'USDC', to: 'USDT' },
  { from: 'DAI', to: 'USDC' }
]; 