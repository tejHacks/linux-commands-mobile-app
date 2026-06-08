import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Onboarding() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <StatusBar style="dark" />
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-white text-3xl mb-4">Welcome to Our App!</Text>
        <Text className="text-white text-lg mb-6 text-center">
          Discover amazing features and join our community today.
        </Text>
        <TouchableOpacity onPress={() => router.push("/commands")} className="bg-blue-700 px-6 py-3 rounded-lg">
          <Text className="text-white text-lg mb-6 text-center">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}