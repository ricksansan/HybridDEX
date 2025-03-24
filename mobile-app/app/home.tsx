import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { sharedStyles } from '../src/styles/shared';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HybridDEX</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/swap')}
        >
          <Text style={styles.buttonText}>Swap</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/pool')}
        >
          <Text style={styles.buttonText}>Pool</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sharedStyles.colors.background,
    padding: sharedStyles.spacing.m,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: sharedStyles.colors.text,
    textAlign: 'center',
    marginBottom: sharedStyles.spacing.xl,
  },
  buttonContainer: {
    gap: sharedStyles.spacing.m,
  },
  button: {
    backgroundColor: sharedStyles.colors.card,
    borderRadius: 12,
    padding: sharedStyles.spacing.m,
    alignItems: 'center',
  },
  buttonText: {
    color: sharedStyles.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
}); 