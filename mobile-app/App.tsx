import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './src/config/wagmi';
import HomeScreen from './src/screens/HomeScreen';
import PoolScreen from './src/screens/PoolScreen';
import SwapScreen from './src/screens/SwapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0D111C',
            },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Pool" component={PoolScreen} />
          <Stack.Screen name="Swap" component={SwapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WagmiConfig>
  );
} 