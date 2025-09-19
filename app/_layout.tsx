import { Stack } from 'expo-router';
import '../global.css';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="commands" options={{ headerShown: false }} />
      <Stack.Screen name="features" options={{ headerShown: false }} />
      <Stack.Screen name="contact" options={{ headerShown: false }} />
      <Stack.Screen name="services" options={{ headerShown: false }} />
    </Stack>
  );
}