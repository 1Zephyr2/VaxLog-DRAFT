import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import * as SystemUI from 'expo-system-ui';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Force the UI to use a light background
    SystemUI.setBackgroundColorAsync('#FFFFFF');
  }, []);

  function onLogin() {
    // Placeholder: replace with real auth logic.
    // Navigate to the main tabs after successful login.
    router.replace('/(tabs)');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={styles.inner}
        >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo} accessibilityRole="header">
              VaxLog
            </Text>
          </View>

          <View style={styles.form}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor="#9E9E9E"
            style={styles.input}
            returnKeyType="next"
            textContentType="username"
            accessibilityLabel="Username"
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#9E9E9E"
            style={styles.input}
            secureTextEntry
            textContentType="password"
            accessibilityLabel="Password"
          />

          <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={onLogin} accessibilityRole="button">
            <Text style={styles.buttonText}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logoContainer: {
    marginBottom: 60,
    paddingTop: 10,
  },
  logo: {
    textAlign: 'center',
    color: '#22733A',
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 60,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  input: {
    height: 52,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  button: {
    marginTop: 8,
    height: 52,
    backgroundColor: '#2D7E3A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
