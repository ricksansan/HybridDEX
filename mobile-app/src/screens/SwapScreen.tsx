import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAccount, useConnect } from 'wagmi';

export default function SwapScreen() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  return (
    <View style={styles.container}>
      {!address ? (
        <TouchableOpacity 
          style={styles.button}
          onPress={() => connect({ connector: connectors[0] })}
        >
          <Text style={styles.buttonText}>Connect Wallet</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Swap</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>From</Text>
            <TextInput
              style={styles.input}
              value={fromAmount}
              onChangeText={setFromAmount}
              placeholder="0.0"
              placeholderTextColor="#5D6785"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>To</Text>
            <TextInput
              style={styles.input}
              value={toAmount}
              onChangeText={setToAmount}
              placeholder="0.0"
              placeholderTextColor="#5D6785"
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Swap</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D111C',
    padding: 16,
  },
  card: {
    backgroundColor: '#1B2131',
    borderRadius: 24,
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#5D6785',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#131A2A',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#4C82FB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 