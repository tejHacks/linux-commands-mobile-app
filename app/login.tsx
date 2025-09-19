import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';

export default function Login() {
  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-white text-3xl mb-6 font-bold">Login</Text>
        <TextInput
          className="bg-white text-black w-full max-w-md h-14 px-6 py-4 rounded-lg mb-6 text-xl"
          placeholder="Email"
          placeholderTextColor="#6b7280"
        />
        <TextInput
          className="bg-white text-black w-full max-w-md h-14 px-6 py-4 rounded-lg mb-6 text-xl"
          placeholder="Password"
          placeholderTextColor="#6b7280"
          secureTextEntry
        />
        <TouchableOpacity 
          className="bg-blue-700 w-full max-w-md h-14 px-6 py-4 rounded-lg mb-6"
          onPress={() => router.push('/commands')} // Navigate to commands on press
        >
          <Text className="text-white text-xl font-semibold text-center">Login</Text>
        </TouchableOpacity>
        <Link href="/forgot-password" className="text-blue-300 text-xl underline mb-4">
          Forgot Password?
        </Link>
        <Link href="/signup" className="text-blue-300 text-xl underline">
          Don&apos;t have an account? Sign Up
        </Link>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}