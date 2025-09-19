import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function Onboarding() {
  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-white text-3xl mb-4">Welcome to Our App!</Text>
        <Text className="text-white text-lg mb-6 text-center">
          Discover amazing features and join our community today.
        </Text>
        <TouchableOpacity className="bg-blue-700 px-6 py-3 rounded-lg">
          <Link href="/signup" className="text-white text-lg font-semibold">
            Get Started
          </Link>
        </TouchableOpacity>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}