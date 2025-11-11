import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  // Allow automatic theme switching based on system preference
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ 
        contentStyle: { backgroundColor: '#FFFFFF' }
      }}>
        <Stack.Screen 
          name="login" 
          options={{ 
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' }
          }} 
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="add-vaccine" 
          options={{ 
            headerShown: false,
            presentation: 'card'
          }} 
        />
        <Stack.Screen 
          name="vaccination-info" 
          options={{ 
            headerShown: false,
            presentation: 'card'
          }} 
        />
        <Stack.Screen 
          name="view-records" 
          options={{ 
            headerShown: false,
            presentation: 'card'
          }} 
        />
        <Stack.Screen 
          name="manage-reminders" 
          options={{ 
            headerShown: false,
            presentation: 'card'
          }} 
        />
        <Stack.Screen 
          name="add-family-member" 
          options={{ 
            headerShown: false,
            presentation: 'card'
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            headerShown: false,
            presentation: 'card'
          }} 
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
