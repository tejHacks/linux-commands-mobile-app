import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function ForgotPassword() {
  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-white text-3xl mb-6">Forgot Password</Text>
        <Text className="text-white text-lg mb-4 text-center">
          Enter your email to receive a password reset link.
        </Text>
        <TextInput
          className="bg-white text-black w-full max-w-xs p-3 rounded-lg mb-6"
          placeholder="Email"
          placeholderTextColor="#6b7280"
        />
        <TouchableOpacity className="bg-blue-700 px-6 py-3 rounded-lg mb-4">
          <Text className="text-white text-lg font-semibold">Send Reset Link</Text>
        </TouchableOpacity>
        <Link href="/login" className="text-blue-300 text-lg underline">
          Back to Login
        </Link>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}