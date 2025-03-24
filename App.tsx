import { NavigationContainer } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './src/config/wagmi';
import PoolScreen from './src/screens/PoolScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Pool" component={PoolScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WagmiConfig>
  );
} 