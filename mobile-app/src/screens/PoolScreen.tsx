import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAccount, useContractWrite, usePrepareContractWrite, useConnect } from 'wagmi';
import { POOL_ADDRESS, USDC_ADDRESS } from '../constants/addresses';
import { POOL_ABI, USDC_ABI } from '../constants/abis';
import { parseUnits } from 'viem';

export default function PoolScreen() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const [ethAmount, setEthAmount] = useState('');
  const [usdcAmount, setUsdcAmount] = useState('');

  // USDC Approve
  const { config: approveConfig } = usePrepareContractWrite({
    address: USDC_ADDRESS as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'approve',
    args: [POOL_ADDRESS as `0x${string}`, usdcAmount ? parseUnits(usdcAmount, 6) : 0n],
    enabled: Boolean(usdcAmount && address)
  });

  const { write: approve, isLoading: isApproving } = useContractWrite(approveConfig);

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
          <Text style={styles.title}>Add Liquidity</Text>
          
          {/* ETH Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ETH Amount</Text>
            <TextInput
              style={styles.input}
              value={ethAmount}
              onChangeText={setEthAmount}
              placeholder="0.0"
              placeholderTextColor="#5D6785"
              keyboardType="decimal-pad"
            />
          </View>

          {/* USDC Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>USDC Amount</Text>
            <TextInput
              style={styles.input}
              value={usdcAmount}
              onChangeText={setUsdcAmount}
              placeholder="0.0"
              placeholderTextColor="#5D6785"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Buttons */}
          <TouchableOpacity 
            style={[styles.button, !approve && styles.buttonDisabled]}
            onPress={() => approve?.()}
            disabled={!approve || isApproving}
          >
            <Text style={styles.buttonText}>
              {isApproving ? 'Approving...' : 'Approve USDC'}
            </Text>
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