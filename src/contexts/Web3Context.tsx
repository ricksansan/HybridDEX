import { createContext } from 'react';

export const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  return (
    <Web3Context.Provider value={null}>
      {children}
    </Web3Context.Provider>
  );
}; 