import { Stack } from 'expo-router';
import '../global.css';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="commands" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="quiz" options={{ headerShown: false }} />
      <Stack.Screen name="daily" options={{ headerShown: false }} />
    </Stack>
  );
}