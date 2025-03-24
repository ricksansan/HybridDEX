import { Stack } from 'expo-router';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '../src/config/wagmi';

export default function Layout() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0D111C',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="home" 
          options={{ 
            title: 'HybridDEX',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="swap" 
          options={{ title: 'Swap' }} 
        />
        <Stack.Screen 
          name="pool" 
          options={{ title: 'Pool' }} 
        />
      </Stack>
    </WagmiConfig>
  );
}
